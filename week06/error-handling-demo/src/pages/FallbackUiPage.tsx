import { useMemo, useState } from "react";
import { ErrorFallback } from "../components/common/ErrorFallback";
import { AppError, type PredictableErrorCode } from "../lib/errors";

type Option = {
  label: string;
  code: PredictableErrorCode | "UNKNOWN";
  message: string;
  status?: number;
};

const options: Option[] = [
  { label: "UNAUTHORIZED", code: "UNAUTHORIZED", message: "로그인이 필요합니다.", status: 401 },
  { label: "FORBIDDEN", code: "FORBIDDEN", message: "권한이 없습니다.", status: 403 },
  { label: "NOT_FOUND", code: "NOT_FOUND", message: "데이터가 없습니다.", status: 404 },
  { label: "VALIDATION_ERROR", code: "VALIDATION_ERROR", message: "입력값 오류입니다.", status: 400 },
  { label: "UNKNOWN", code: "UNKNOWN", message: "예상치 못한 오류입니다." },
];

export function FallbackUiPage() {
  const [selected, setSelected] = useState<Option>(options[0]);
  const [version, setVersion] = useState(0);

  const error = useMemo(
    () => new AppError(selected.code, selected.message, selected.status),
    [selected, version],
  );

  return (
    <article className="card surface">
      <header className="section-head">
        <h2>Fallback UI</h2>
        <span className="badge subtle">Recovery Experience</span>
      </header>
      <p className="muted">
        같은 에러라도 코드별로 안내 문구/행동(재시도)을 다르게 제공할 수 있습니다.
      </p>

      <div className="button-group">
        {options.map((option) => (
          <button key={option.code} type="button" onClick={() => setSelected(option)}>
            {option.label}
          </button>
        ))}
      </div>

      <div className="result">
        <p className="result-label">현재 선택</p>
        <div>{selected.code}</div>
      </div>

      <ErrorFallback error={error} onRetry={() => setVersion((prev) => prev + 1)} />
    </article>
  );
}
