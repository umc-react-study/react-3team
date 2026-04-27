import { AppError, mapHttpError } from "./errors";

export async function request<T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<T> {
  try {
    const res = await fetch(url, init);

    if (!res.ok) {
      let body: { code?: string } | null = null;
      try {
        body = (await res.json()) as { code?: string };
      } catch {
        body = null;
      }
      throw mapHttpError(res.status, body?.code);
    }

    const contentType = res.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return undefined as T;
    }

    return (await res.json()) as T;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("UNKNOWN", "네트워크/시스템 오류가 발생했습니다.", undefined, error);
  }
}
