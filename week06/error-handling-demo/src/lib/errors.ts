export type PredictableErrorCode =
  | "VALIDATION_ERROR"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "CONFLICT"
  | "RATE_LIMITED";

export class AppError extends Error {
  code: PredictableErrorCode | "UNKNOWN";
  status?: number;
  causeDetail?: unknown;

  constructor(
    code: PredictableErrorCode | "UNKNOWN",
    message: string,
    status?: number,
    causeDetail?: unknown,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
    this.causeDetail = causeDetail;
  }
}

export function mapHttpError(status: number, serverCode?: string): AppError {
  if (status === 400 || serverCode === "VALIDATION_ERROR") {
    return new AppError("VALIDATION_ERROR", "입력값이 올바르지 않습니다.", 400);
  }
  if (status === 401) return new AppError("UNAUTHORIZED", "로그인이 필요합니다.", 401);
  if (status === 403) return new AppError("FORBIDDEN", "권한이 없습니다.", 403);
  if (status === 404) return new AppError("NOT_FOUND", "대상을 찾을 수 없습니다.", 404);
  if (status === 409) return new AppError("CONFLICT", "요청 충돌이 발생했습니다.", 409);
  if (status === 429) return new AppError("RATE_LIMITED", "요청이 너무 많습니다.", 429);

  return new AppError("UNKNOWN", "알 수 없는 서버 오류가 발생했습니다.", status);
}
