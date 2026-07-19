const LOCAL_API_BASE_URL = "http://localhost:3001/api/v1";

function normalizeBaseUrl(value: string): string {
  return value.replace(/\/+$/, "");
}

export const API_BASE_URL = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || LOCAL_API_BASE_URL,
);
