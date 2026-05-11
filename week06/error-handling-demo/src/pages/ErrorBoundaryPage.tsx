import { useState } from "react";
import { AppErrorBoundary } from "../components/common/AppErrorBoundary";

function CrashWidget() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("CrashWidget 렌더링 중 예외");
  }

  return (
    <button type="button" onClick={() => setShouldCrash(true)}>
      위젯 강제 크래시
    </button>
  );
}

export function ErrorBoundaryPage() {
  return (
    <article className="card surface">
      <header className="section-head">
        <h2>Error Boundary</h2>
        <span className="badge subtle">렌더링 안전장치</span>
      </header>
      <p className="muted">
        렌더링 에러를 경계로 격리해 앱 전체가 죽지 않도록 보호합니다.
      </p>
      <AppErrorBoundary>
        <div className="demo-box">
          <p>아래 버튼 클릭 시 자식 위젯만 실패하고, 페이지는 대체 UI로 복구됩니다.</p>
          <CrashWidget />
        </div>
      </AppErrorBoundary>
    </article>
  );
}
