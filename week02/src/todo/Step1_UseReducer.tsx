/**
 * Step 1: useReducer
 *
 * 여러 개의 useState → useReducer 하나로 전환
 *
 * 기능: 노트 목록 / 추가 / 삭제 / 선택해서 내용 보기
 *
 * 핵심 개념:
 *   - action 기반 상태 변경: "무엇이 일어났는가"를 명시적으로 표현
 *   - reducer는 순수 함수 → 테스트하기 쉽고, 상태 전이가 예측 가능
 *   - 여러 상태가 함께 변해야 할 때 (노트 추가 + 자동 선택) useReducer가 깔끔
 *
 * useState였다면:
 *   const [notes, setNotes] = useState(...)
 *   const [selectedId, setSelectedId] = useState(...)
 *   const [input, setInput] = useState(...)
 *   → ADD 할 때 세 개를 동시에 업데이트해야 함
 */

import { useReducer } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Note = { id: number; title: string; content: string };

type State = {
  notes: Note[];
  selectedId: number | null;
  input: string;
};

type Action =
  | { type: "SET_INPUT"; payload: string }
  | { type: "ADD_NOTE" }           // 추가 + 자동 선택을 한 번에
  | { type: "SELECT_NOTE"; payload: number }
  | { type: "DELETE_NOTE"; payload: number };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function noteReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };

    case "ADD_NOTE": {
      const title = state.input.trim();
      if (!title) return state;
      const newNote: Note = { id: Date.now(), title, content: "" };
      return {
        notes: [newNote, ...state.notes],
        selectedId: newNote.id, // 추가와 동시에 선택 — useState면 두 번 호출 필요
        input: "",
      };
    }

    case "SELECT_NOTE":
      return { ...state, selectedId: action.payload };

    case "DELETE_NOTE": {
      const remaining = state.notes.filter((n) => n.id !== action.payload);
      const nextSelected =
        state.selectedId === action.payload
          ? (remaining[0]?.id ?? null)
          : state.selectedId;
      return { ...state, notes: remaining, selectedId: nextSelected };
    }
  }
}

// ─── Initial State ────────────────────────────────────────────────────────────

const INITIAL_STATE: State = {
  notes: [
    { id: 1, title: "useReducer 학습", content: "action 기반으로 상태를 변경한다." },
    { id: 2, title: "오늘 할 일", content: "Step1 ~ Step4 전부 해보기" },
  ],
  selectedId: 1,
  input: "",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function Step1_UseReducer() {
  const [state, dispatch] = useReducer(noteReducer, INITIAL_STATE);
  const { notes, selectedId, input } = state;
  const selected = notes.find((n) => n.id === selectedId) ?? null;

  return (
    <>
      <div className="max-w-2xl mx-auto bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-4 text-sm text-yellow-300">
        <code className="bg-white/10 px-1 rounded">useReducer</code>로 노트 상태를 action 하나로 관리합니다.
        <br />
        <span className="text-white/50 text-xs">
          "노트 추가 + 자동 선택" 처럼 여러 상태가 함께 바뀔 때 atomic하게 처리됩니다.
        </span>
      </div>

      <div className="max-w-2xl mx-auto border border-white/10 rounded-xl overflow-hidden flex" style={{ height: "380px" }}>
        {/* 사이드바 */}
        <div className="w-44 shrink-0 flex flex-col border-r border-white/10">
          {/* 입력 */}
          <div className="p-2 border-b border-white/10">
            <div className="flex gap-1">
              <input
                value={input}
                onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && dispatch({ type: "ADD_NOTE" })}
                placeholder="노트 제목..."
                className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs outline-none focus:border-yellow-500/50"
              />
              <button
                onClick={() => dispatch({ type: "ADD_NOTE" })}
                className="bg-yellow-600 hover:bg-yellow-500 px-2 py-1.5 rounded text-xs font-medium transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* 목록 */}
          <ul className="flex-1 overflow-y-auto">
            {notes.map((note) => (
              <li key={note.id}>
                <button
                  onClick={() => dispatch({ type: "SELECT_NOTE", payload: note.id })}
                  className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors group relative ${
                    selectedId === note.id
                      ? "bg-yellow-500/15 text-yellow-200"
                      : "hover:bg-white/5 text-white/60"
                  }`}
                >
                  <p className="text-xs font-medium truncate pr-5">{note.title}</p>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch({ type: "DELETE_NOTE", payload: note.id });
                    }}
                    className="absolute right-2 top-2 text-white/20 hover:text-red-400 transition-colors text-sm opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 내용 */}
        <div className="flex-1 p-5 overflow-y-auto">
          {selected ? (
            <>
              <h3 className="font-bold text-white mb-3">{selected.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap">
                {selected.content || <span className="text-white/30 italic">내용 없음</span>}
              </p>
            </>
          ) : (
            <p className="text-white/30 text-sm text-center mt-16">노트를 선택하세요</p>
          )}
        </div>
      </div>

      {/* dispatch 시각화 */}
      <div className="max-w-2xl mx-auto mt-3 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/50 space-y-1">
        <p className="text-white/70 font-medium mb-1.5">이 앱의 Action 목록</p>
        <p><code className="text-yellow-300">SET_INPUT</code> · <code className="text-yellow-300">ADD_NOTE</code> · <code className="text-yellow-300">SELECT_NOTE</code> · <code className="text-yellow-300">DELETE_NOTE</code></p>
        <p className="text-white/30">ADD_NOTE는 notes 추가 + selectedId 변경 + input 초기화를 한 번에 처리합니다.</p>
      </div>
    </>
  );
}
