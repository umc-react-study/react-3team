import { useState } from "react";
import { AppError } from "../lib/errors";

async function saveProfileMock() {
  await new Promise((resolve) => setTimeout(resolve, 600));
  throw new AppError("CONFLICT", "동시에 수정되어 저장에 실패했습니다.", 409);
}

export function ImperativeTryCatchPage() {
  const [message, setMessage] = useState("아직 요청 전");

  const handleSave = async () => {
    setMessage("저장 시도 중...");
    try {
      await saveProfileMock();
      setMessage("저장 완료");
    } catch (error) {
      if (error instanceof AppError) {
        setMessage(`저장 실패: ${error.message} (${error.code})`);
        return;
      }
      setMessage("저장 실패: 알 수 없는 오류");
    }
  };

  return (
    <article className="card surface">
      <header className="section-head">
        <h2>try/catch (명령적 처리)</h2>
        <span className="badge subtle">Action Handler</span>
      </header>
      <p className="muted">
        클릭 이벤트처럼 액션 중심 흐름은 try/catch가 가장 직접적입니다.
      </p>
      <div className="action-row">
        <button type="button" onClick={handleSave}>
          저장 시뮬레이션
        </button>
      </div>
      <div className="result">
        <p className="result-label">처리 결과</p>
        <p>{message}</p>
      </div>
    </article>
  );
}
