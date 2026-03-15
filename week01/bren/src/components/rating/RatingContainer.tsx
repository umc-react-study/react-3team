import { useState } from "react";
/**
 * 실습 2: Presentational & Container Pattern
 */

// Presentational: 화면에 별점 숫자만 보여줌
const RatingDisplay = ({ value, max }: { value: number; max: number }) => (
  <div style={{ fontSize: "18px", marginBottom: "10px" }}>
    현재 점수: <strong>{value}</strong> / {max}
  </div>
);

// Presentational: 별 아이콘 버튼 하나만 담당
const StarButton = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    style={{
      fontSize: "30px",
      cursor: "pointer",
      background: "none",
      border: "none",
      color: filled ? "#ffc107" : "#e4e5e9",
    }}
  >
    ★
  </button>
);

// Container: 전체 로직(상태 관리)을 담당
export default function RatingContainer({ max = 5 }) {
  const [rating, setRating] = useState(0); // 데이터(상태)는 여기서만 관리

  return (
    <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
      <RatingDisplay value={rating} max={max} />
      <div>
        {[...Array(max)].map((_, i) => (
          <StarButton key={i} filled={i + 1 <= rating} onClick={() => setRating(i + 1)} />
        ))}
      </div>
    </div>
  );
}
