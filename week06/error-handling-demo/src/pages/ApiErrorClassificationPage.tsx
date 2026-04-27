import { useState } from "react";
import { mapHttpError } from "../lib/errors";

const statuses = [400, 401, 403, 404, 409, 429, 500];

export function ApiErrorClassificationPage() {
  const [status, setStatus] = useState<number | null>(null);

  const mappedError = status ? mapHttpError(status) : null;

  return (
    <article className="card surface">
      <header className="section-head">
        <h2>API 에러 분류 (예측 가능/불가능)</h2>
        <span className="badge subtle">Error Taxonomy</span>
      </header>
      <p className="muted">
        HTTP 상태값을 예측 가능한 코드로 매핑하고, 나머지는 UNKNOWN으로 분류합니다.
      </p>

      <div className="button-group">
        {statuses.map((s) => (
          <button key={s} type="button" onClick={() => setStatus(s)}>
            {s} 테스트
          </button>
        ))}
      </div>

      {!mappedError && <p className="result">상태 코드를 선택해 분류 결과를 확인하세요.</p>}
      {mappedError && (
        <div className="result">
          <p className="result-label">분류 결과</p>
          <div>입력 status: {status}</div>
          <div>분류 code: {mappedError.code}</div>
          <div>메시지: {mappedError.message}</div>
        </div>
      )}
    </article>
  );
}
