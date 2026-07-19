type BackendErrorBody = {
  code?: unknown;
  error?: unknown;
  message?: unknown;
  details?: unknown;
};

function getMessage(body: BackendErrorBody | null, fallback: string): string {
  if (typeof body?.message === "string" && body.message.trim()) {
    return body.message;
  }

  if (Array.isArray(body?.message)) {
    const messages = body.message.filter(
      (message): message is string => typeof message === "string",
    );

    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  return fallback;
}

function getCode(body: BackendErrorBody | null): string | undefined {
  if (typeof body?.code === "string") {
    return body.code;
  }

  if (typeof body?.error === "string") {
    return body.error;
  }

  return undefined;
}

export class ApiError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      code?: string;
      details?: unknown;
    },
  ) {
    super(message);
    this.name = "ApiError";
    this.status = options.status;
    this.code = options.code;
    this.details = options.details;
  }

  static fromResponse(
    response: Response,
    body: BackendErrorBody | null,
  ): ApiError {
    return new ApiError(
      getMessage(body, response.statusText || "Request failed"),
      {
        status: response.status,
        code: getCode(body),
        details: body?.details,
      },
    );
  }
}
