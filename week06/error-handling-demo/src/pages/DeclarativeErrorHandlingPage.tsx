import { useState } from "react";
import { ErrorFallback } from "../components/common/ErrorFallback";
import { AppError } from "../lib/errors";

type User = {
  id: number;
  name: string;
  email: string;
};

async function fetchUserMock(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  const shouldFail = Math.random() < 0.5;
  if (shouldFail) {
    throw new AppError("NOT_FOUND", "유저를 찾지 못했습니다.", 404);
  }

  return { id: 1, name: "Duck User", email: "duck@example.com" };
}

export function DeclarativeErrorHandlingPage() {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const loadUser = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const user = await fetchUserMock();
      setData(user);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="card surface">
      <header className="section-head">
        <h2>선언적 에러 처리</h2>
        <span className="badge subtle">State Driven UI</span>
      </header>
      <p className="muted">
        상태값에 맞춰 UI를 분기하면 로딩/실패/성공 흐름이 명확해집니다.
      </p>
      <div className="action-row">
        <button type="button" onClick={loadUser}>
          유저 불러오기 (성공/실패 랜덤)
        </button>
      </div>

      {isLoading && <p className="result">로딩 중...</p>}
      {!isLoading && !!error && <ErrorFallback error={error} onRetry={loadUser} />}
      {!isLoading && !error && data && (
        <div className="result">
          <p className="result-label">요청 성공</p>
          <div>이름: {data.name}</div>
          <div>이메일: {data.email}</div>
        </div>
      )}
    </article>
  );
}
