import { ApiClient } from "./client";
import type { ApiEnvelope } from "./contracts";
import { unwrapEnvelope } from "./contracts";
import { ApiError } from "./error";

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
};

export type AuthUser = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  roles?: string[];
};

export type AuthResponse = {
  user: AuthUser;
  token: AuthTokens;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = LoginInput & {
  firstName: string;
  lastName: string;
};

export type AuthSessionStore = {
  clear(): void;
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setTokens(tokens: AuthTokens): void;
  subscribe(listener: () => void): () => void;
};

export function createMemoryAuthSessionStore(): AuthSessionStore {
  let tokens: AuthTokens | null = null;
  const listeners = new Set<() => void>();

  return {
    clear() {
      tokens = null;
      listeners.forEach((listener) => listener());
    },
    getAccessToken() {
      return tokens?.accessToken ?? null;
    },
    getRefreshToken() {
      return tokens?.refreshToken ?? null;
    },
    setTokens(nextTokens) {
      tokens = nextTokens;
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const SESSION_KEY = "scentora.auth.tokens";

// Frontend-only compromise for the backend's JSON refresh-token contract.
// Session scope limits persistence, but JavaScript-readable tokens remain exposed to XSS.
export function createSessionAuthSessionStore(): AuthSessionStore {
  const memory = createMemoryAuthSessionStore();
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((listener) => listener());

  const read = (): AuthTokens | null => {
    if (typeof window === "undefined") return null;
    const value = window.sessionStorage.getItem(SESSION_KEY);
    if (!value) return null;
    try {
      return JSON.parse(value) as AuthTokens;
    } catch {
      window.sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
  };

  return {
    clear() {
      memory.clear();
      if (typeof window !== "undefined") window.sessionStorage.removeItem(SESSION_KEY);
      notify();
    },
    getAccessToken() {
      return memory.getAccessToken() ?? read()?.accessToken ?? null;
    },
    getRefreshToken() {
      return memory.getRefreshToken() ?? read()?.refreshToken ?? null;
    },
    setTokens(tokens) {
      memory.setTokens(tokens);
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(tokens));
      }
      notify();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export function createAuthApi(
  client: ApiClient,
  session: AuthSessionStore,
) {
  let refreshPromise: Promise<AuthTokens | null> | null = null;

  const performRefresh = async (): Promise<AuthTokens | null> => {
    const refreshToken = session.getRefreshToken();

    if (!refreshToken) {
      return null;
    }

    try {
      const response = await client.post<ApiEnvelope<AuthTokens>>(
        "/auth/refresh",
        { refreshToken },
        { auth: false, retryOnUnauthorized: false },
      );
      const tokens = unwrapEnvelope(response);
      if (session.getRefreshToken() !== refreshToken) {
        return null;
      }
      session.setTokens(tokens);
      return tokens;
    } catch (error) {
      if (session.getRefreshToken() === refreshToken) {
        session.clear();
      }
      throw error;
    }
  };

  const refresh = (): Promise<AuthTokens | null> => {
    if (!refreshPromise) {
      refreshPromise = performRefresh().finally(() => {
        refreshPromise = null;
      });
    }
    return refreshPromise;
  };

  return {
    async login(input: LoginInput): Promise<AuthResponse> {
      const envelope = await client.post<ApiEnvelope<AuthResponse>>("/auth/login", input, {
        auth: false,
        retryOnUnauthorized: false,
      });
      const response = unwrapEnvelope(envelope);
      session.setTokens(response.token);
      return response;
    },

    async register(input: RegisterInput): Promise<AuthResponse> {
      const envelope = await client.post<ApiEnvelope<AuthResponse>>(
        "/auth/register",
        input,
        { auth: false, retryOnUnauthorized: false },
      );
      const response = unwrapEnvelope(envelope);
      session.setTokens(response.token);
      return response;
    },

    refresh,

    async logout(): Promise<void> {
      try {
        if (refreshPromise) {
          await refreshPromise.catch(() => null);
        }

        let refreshToken = session.getRefreshToken();
        if (refreshToken) {
          try {
            await client.post<void>(
              "/auth/logout",
              { refreshToken },
              { auth: true, retryOnUnauthorized: false },
            );
          } catch (error) {
            if (!(error instanceof ApiError) || error.status !== 401) {
              throw error;
            }

            const tokens = await refresh();
            refreshToken = tokens?.refreshToken ?? null;
            if (refreshToken) {
              await client.post<void>(
                "/auth/logout",
                { refreshToken },
                { auth: true, retryOnUnauthorized: false },
              );
            }
          }
        }
      } finally {
        session.clear();
      }
    },
  };
}

export type AuthApi = ReturnType<typeof createAuthApi>;

export function createUnauthorizedRecovery(authApi: AuthApi) {
  return async (): Promise<string | null> => {
    const tokens = await authApi.refresh();
    return tokens?.accessToken ?? null;
  };
}
