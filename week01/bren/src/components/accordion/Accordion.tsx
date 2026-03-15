import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * [실습 3: Compound Component Pattern]
 */

// 1. Context: 현재 열린 아이템의 ID를 공유하기 위한 저장소
const AccordionContext = createContext<{
  openId: string | null;
  toggle: (id: string) => void;
} | null>(null);

// Context를 안전하게 쓰기 위한 커스텀 훅
function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion 컴포넌트는 Root 안에서만 사용 가능합니다.");
  return ctx;
}

// 2. Root: 상태 관리 및 데이터 공급
function Root({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <AccordionContext.Provider value={{ openId, toggle }}>
      <div style={{ border: "1px solid #ddd", borderRadius: "4px" }}>{children}</div>
    </AccordionContext.Provider>
  );
}

// 3. Item: 각 항목의 영역 (밸류값 부여)
function Item({ value, children }: { value: string; children: ReactNode }) {
  return <div style={{ borderBottom: "1px solid #eee" }}>{children}</div>;
}

// 4. Trigger: 클릭 시 열고 닫는 버튼
function Trigger({ value, children }: { value: string; children: ReactNode }) {
  const { openId, toggle } = useAccordionContext();
  return (
    <button
      onClick={() => toggle(value)}
      style={{
        width: "100%",
        padding: "10px",
        textAlign: "left",
        background: "#f9f9f9",
        border: "none",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children} <span>{openId === value ? "−" : "+"}</span>
    </button>
  );
}

// 5. Panel: 선택된 항목만 화면에 노출
function Panel({ value, children }: { value: string; children: ReactNode }) {
  const { openId } = useAccordionContext();
  if (openId !== value) return null;
  return <div style={{ padding: "15px", backgroundColor: "#fff" }}>{children}</div>;
}

// 외부에서 사용하기 쉽게 묶어서 내보내기
export const Accordion = { Root, Item, Trigger, Panel };
