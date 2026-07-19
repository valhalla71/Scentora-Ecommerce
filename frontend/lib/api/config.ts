const LOCAL_DEV_API_BASE_URL = "http://localhost:3001/api/v1";

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

function getApiBaseUrl(): string {
  const envValue = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  // If environment variable is set, use it
  if (envValue) {
    return normalizeBaseUrl(envValue);
  }

  // In production, API base URL must be configured
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_API_BASE_URL must be set in production. " +
      "Check your environment configuration."
    );
  }

  // Development fallback
  return normalizeBaseUrl(LOCAL_DEV_API_BASE_URL);
}

export const API_BASE_URL = getApiBaseUrl();
