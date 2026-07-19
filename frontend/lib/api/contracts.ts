export type ApiEnvelope<T> = {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
};

export function unwrapEnvelope<T>(response: ApiEnvelope<T>): T {
  return response.data;
}
