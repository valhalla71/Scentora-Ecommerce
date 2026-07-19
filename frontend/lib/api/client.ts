import { API_BASE_URL } from "./config";
import { ApiError } from "./error";

export type AccessTokenProvider = () => string | null | Promise<string | null>;
export type UnauthorizedRecovery = () => Promise<string | null>;

export type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
  auth?: boolean;
  body?: unknown;
  headers?: HeadersInit;
  retryOnUnauthorized?: boolean;
};

export type ApiClientOptions = {
  baseUrl?: string;
  getAccessToken?: AccessTokenProvider;
  onUnauthorized?: UnauthorizedRecovery;
};

async function readResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) {
    return undefined;
  }

  const text = await response.text();

  if (!text) {
    return undefined;
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    try {
      return JSON.parse(text) as unknown;
    } catch {
      throw new ApiError("The server returned invalid JSON", {
        status: response.status,
        code: "INVALID_RESPONSE",
      });
    }
  }

  return text;
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly getAccessToken?: AccessTokenProvider;
  private readonly onUnauthorized?: UnauthorizedRecovery;
  private recoveryPromise: Promise<string | null> | null = null;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? API_BASE_URL).replace(/\/+$/, "");
    this.getAccessToken = options.getAccessToken;
    this.onUnauthorized = options.onUnauthorized;
  }

  async request<T>(
    path: string,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    try {
      return await this.execute<T>(path, options, false);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError("Unable to reach the API", {
        status: 0,
        code: "NETWORK_ERROR",
      });
    }
  }

  get<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  put<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  patch<T>(
    path: string,
    body?: unknown,
    options: ApiRequestOptions = {},
  ): Promise<T> {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }

  delete<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  private async execute<T>(
    path: string,
    options: ApiRequestOptions,
    hasRetried: boolean,
  ): Promise<T> {
    const {
      auth = false,
      body,
      headers: initialHeaders,
      retryOnUnauthorized = true,
      ...requestInit
    } = options;
    const headers = new Headers(initialHeaders);
    const token = auth ? await this.getAccessToken?.() : null;
    const isFormData =
      typeof FormData !== "undefined" && body instanceof FormData;

    headers.set("Accept", "application/json");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (body !== undefined && !isFormData && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(
      `${this.baseUrl}/${path.replace(/^\/+/, "")}`,
      {
        ...requestInit,
        headers,
        body:
          body === undefined
            ? undefined
            : isFormData
              ? (body as FormData)
              : JSON.stringify(body),
      },
    );

    if (
      response.status === 401 &&
      auth &&
      retryOnUnauthorized &&
      !hasRetried &&
      this.onUnauthorized
    ) {
      const recoveredToken = await this.recoverAccessToken();

      if (recoveredToken) {
        return this.execute<T>(path, options, true);
      }
    }

    const responseBody = await readResponseBody(response);

    if (!response.ok) {
      const errorBody =
        typeof responseBody === "object" && responseBody !== null
          ? responseBody
          : null;
      throw ApiError.fromResponse(response, errorBody);
    }

    return responseBody as T;
  }

  private recoverAccessToken(): Promise<string | null> {
    if (!this.onUnauthorized) {
      return Promise.resolve(null);
    }

    if (!this.recoveryPromise) {
      this.recoveryPromise = this.onUnauthorized().finally(() => {
        this.recoveryPromise = null;
      });
    }

    return this.recoveryPromise;
  }
}
