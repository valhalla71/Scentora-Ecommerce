import type { ApiClient } from "./client";
import type { ApiEnvelope } from "./contracts";
import { unwrapEnvelope } from "./contracts";

export type UserProfile = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  status: string;
  preferences: {
    language: string;
    theme: string;
    emailNotifications: boolean;
  } | null;
  roles: Array<{ role: { name: string } }>;
};

export function createUsersApi(client: ApiClient) {
  return {
    async getProfile(): Promise<UserProfile> {
      const response = await client.get<ApiEnvelope<UserProfile>>("/users/profile/me", {
        auth: true,
      });
      return unwrapEnvelope(response);
    },
  };
}
