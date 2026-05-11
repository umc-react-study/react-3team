import { AppError } from "../../lib/errors";

type ErrorFallbackProps = {
  error: unknown;
  onRetry?: () => void;
};

export function ErrorFallback({ error, onRetry }: ErrorFallbackProps) {
  if (error instanceof AppError) {
    const actionButton = onRetry ? (
      <button type="button" onClick={onRetry}>
        다시 시도
      </button>
    ) : null;

    switch (error.code) {
      case "UNAUTHORIZED":
        return (
          <div className="alert-card warn">
            <p className="alert-title">인증 필요</p>
            <p className="error">로그인이 필요합니다.</p>
            {actionButton}
          </div>
        );
      case "FORBIDDEN":
        return (
          <div className="alert-card warn">
            <p className="alert-title">권한 부족</p>
            <p className="error">접근 권한이 없습니다.</p>
            {actionButton}
          </div>
        );
      case "NOT_FOUND":
        return (
          <div className="alert-card">
            <p className="alert-title">데이터 없음</p>
            <p className="error">요청한 데이터를 찾을 수 없습니다.</p>
            {actionButton}
          </div>
        );
      case "VALIDATION_ERROR":
        return (
          <div className="alert-card">
            <p className="alert-title">입력 검증 실패</p>
            <p className="error">입력값을 확인해주세요.</p>
            {actionButton}
          </div>
        );
      default:
        return (
          <div className="alert-card danger">
            <p className="alert-title">처리 실패</p>
            <p className="error">요청 처리 중 문제가 발생했습니다.</p>
            {actionButton}
          </div>
        );
    }
  }

  return (
    <div className="alert-card danger">
      <p className="alert-title">예상치 못한 오류</p>
      <p className="error">예상치 못한 오류가 발생했습니다.</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          새로 시도
        </button>
      )}
    </div>
  );
}
