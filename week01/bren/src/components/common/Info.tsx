/**
 * 실습 1: SRP (Single Responsibility Principle)
 * 각 컴포넌트는 하나의 역할만 수행
 */

// 라벨만 담당하는 컴포넌트
export function InfoLabel({ text }: { text: string }) {
  return <span style={{ fontWeight: "bold", marginRight: "8px", color: "#666" }}>{text} :</span>;
}

// 데이터 값만 담당하는 컴포넌트
export function InfoValue({ text }: { text: string }) {
  return <span style={{ color: "#333" }}>{text}</span>;
}
