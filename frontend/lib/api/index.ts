import {
  createAuthApi,
  createMemoryAuthSessionStore,
  createUnauthorizedRecovery,
  type AuthSessionStore,
} from "./auth";
import { ApiClient, type ApiClientOptions } from "./client";

export { API_BASE_URL } from "./config";
export { ApiError } from "./error";
export { createCommerceApi, mapProduct, type Category, type CommerceApi } from "./commerce";
export { type ApiEnvelope, unwrapEnvelope } from "./contracts";
export { createUsersApi, type UserProfile } from "./users";
export {
  ApiClient,
  type AccessTokenProvider,
  type ApiClientOptions,
  type ApiRequestOptions,
  type UnauthorizedRecovery,
} from "./client";
export {
  createAuthApi,
  createMemoryAuthSessionStore,
  createSessionAuthSessionStore,
  createUnauthorizedRecovery,
  type AuthApi,
  type AuthResponse,
  type AuthSessionStore,
  type AuthTokens,
  type AuthUser,
  type LoginInput,
  type RegisterInput,
} from "./auth";

export function createApiFoundation(
  options: Omit<ApiClientOptions, "getAccessToken" | "onUnauthorized"> & {
    session?: AuthSessionStore;
  } = {},
) {
  const { session = createMemoryAuthSessionStore(), ...clientOptions } = options;
  const authClient = new ApiClient({
    ...clientOptions,
    getAccessToken: () => session.getAccessToken(),
  });
  const auth = createAuthApi(authClient, session);
  const client = new ApiClient({
    ...clientOptions,
    getAccessToken: () => session.getAccessToken(),
    onUnauthorized: createUnauthorizedRecovery(auth),
  });

  return { auth, client, session };
}
