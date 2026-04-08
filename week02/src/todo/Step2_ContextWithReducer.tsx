/**
 * Step 2: useReducer + Context
 *
 * Step 1의 reducer를 Context 안으로 이동
 * + 노트 내용을 직접 편집할 수 있는 기능 추가
 *
 * 기능: 노트 목록 / 추가 / 삭제 / 선택 / 내용 편집
 *
 * 핵심 개념:
 *   - NoteProvider가 reducer를 소유하고 state + dispatch를 Context로 공급
 *   - State Context / Dispatch Context 분리
 *     → dispatch는 절대 바뀌지 않으므로, dispatch만 쓰는 컴포넌트는
 *       state 변경 시 리렌더되지 않음
 *   - 각 컴포넌트가 필요한 Context만 구독
 *
 * Step 1과의 차이:
 *   - 로직(reducer + state)이 Provider 안으로 완전히 이동
 *   - 컴포넌트들은 prop 없이 Context만으로 통신
 *   - UPDATE_NOTE action 추가 → 인라인 편집 가능
 */

import { createContext, useContext, useReducer, type ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Note = { id: number; title: string; content: string };

type State = { notes: Note[]; selectedId: number | null; input: string };

type Action =
  | { type: "SET_INPUT"; payload: string }
  | { type: "ADD_NOTE" }
  | { type: "SELECT_NOTE"; payload: number }
  | { type: "UPDATE_NOTE"; id: number; field: "title" | "content"; value: string } // ← NEW
  | { type: "DELETE_NOTE"; payload: number };

// ─── Reducer ─────────────────────────────────────────────────────────────────

function noteReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "ADD_NOTE": {
      const title = state.input.trim();
      if (!title) return state;
      const n: Note = { id: Date.now(), title, content: "" };
      return { notes: [n, ...state.notes], selectedId: n.id, input: "" };
    }
    case "SELECT_NOTE":
      return { ...state, selectedId: action.payload };
    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.id ? { ...n, [action.field]: action.value } : n
        ),
      };
    case "DELETE_NOTE": {
      const remaining = state.notes.filter((n) => n.id !== action.payload);
      return {
        ...state,
        notes: remaining,
        selectedId: state.selectedId === action.payload ? (remaining[0]?.id ?? null) : state.selectedId,
      };
    }
  }
}

// ─── Context (State / Dispatch 분리) ─────────────────────────────────────────

const NoteStateContext = createContext<State | null>(null);
const NoteDispatchContext = createContext<React.Dispatch<Action> | null>(null);

function useNoteState() {
  const ctx = useContext(NoteStateContext);
  if (!ctx) throw new Error("NoteProvider 밖에서 사용 불가");
  return ctx;
}

function useNoteDispatch() {
  const ctx = useContext(NoteDispatchContext);
  if (!ctx) throw new Error("NoteProvider 밖에서 사용 불가");
  return ctx;
}

// ─── Provider ────────────────────────────────────────────────────────────────

const INITIAL: State = {
  notes: [
    { id: 1, title: "Context 학습", content: "State Context와 Dispatch Context를 분리하면\ndispatch만 쓰는 컴포넌트가 state 변경에 리렌더되지 않는다." },
    { id: 2, title: "오늘 할 일", content: "Step2 편집 기능 써보기" },
  ],
  selectedId: 1,
  input: "",
};

function NoteProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(noteReducer, INITIAL);
  return (
    <NoteStateContext.Provider value={state}>
      <NoteDispatchContext.Provider value={dispatch}>
        {children}
      </NoteDispatchContext.Provider>
    </NoteStateContext.Provider>
  );
}

// ─── UI Components ────────────────────────────────────────────────────────────

// Sidebar: state(목록) + dispatch(선택/삭제/추가)
function Sidebar() {
  const { notes, selectedId, input } = useNoteState();
  const dispatch = useNoteDispatch();

  return (
    <div className="w-44 shrink-0 flex flex-col border-r border-white/10">
      <div className="p-2 border-b border-white/10">
        <div className="flex gap-1">
          <input
            value={input}
            onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
            onKeyDown={(e) => e.key === "Enter" && dispatch({ type: "ADD_NOTE" })}
            placeholder="노트 제목..."
            className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs outline-none focus:border-blue-500/50"
          />
          <button
            onClick={() => dispatch({ type: "ADD_NOTE" })}
            className="bg-blue-600 hover:bg-blue-500 px-2 py-1.5 rounded text-xs font-medium transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => dispatch({ type: "SELECT_NOTE", payload: note.id })}
              className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors group relative ${
                selectedId === note.id ? "bg-blue-500/15 text-blue-200" : "hover:bg-white/5 text-white/60"
              }`}
            >
              <p className="text-xs font-medium truncate pr-5">{note.title}</p>
              <span
                onClick={(e) => { e.stopPropagation(); dispatch({ type: "DELETE_NOTE", payload: note.id }); }}
                className="absolute right-2 top-2 text-white/20 hover:text-red-400 transition-colors text-sm opacity-0 group-hover:opacity-100"
              >
                ×
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Editor: state(선택된 노트) + dispatch(내용 수정)
function Editor() {
  const { notes, selectedId } = useNoteState();
  const dispatch = useNoteDispatch();
  const note = notes.find((n) => n.id === selectedId) ?? null;

  if (!note) return <div className="flex-1 flex items-center justify-center text-white/30 text-sm">노트를 선택하세요</div>;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <input
        value={note.title}
        onChange={(e) => dispatch({ type: "UPDATE_NOTE", id: note.id, field: "title", value: e.target.value })}
        className="px-5 pt-5 pb-2 text-base font-bold bg-transparent outline-none text-white border-b border-white/10"
      />
      <textarea
        value={note.content}
        onChange={(e) => dispatch({ type: "UPDATE_NOTE", id: note.id, field: "content", value: e.target.value })}
        placeholder="내용을 입력하세요..."
        className="flex-1 px-5 py-4 bg-transparent outline-none text-sm text-white/80 placeholder-white/20 resize-none leading-relaxed"
      />
    </div>
  );
}

// ─── Usage ────────────────────────────────────────────────────────────────────

export function Step2_ContextWithReducer() {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4 text-sm text-blue-300">
        <code className="bg-white/10 px-1 rounded">NoteProvider</code>가 reducer를 소유하고 Context로 공급합니다.
        <br />
        <span className="text-white/50 text-xs">
          제목과 내용을 직접 편집할 수 있습니다. State / Dispatch Context를 분리해 불필요한 리렌더를 방지합니다.
        </span>
      </div>

      <NoteProvider>
        <div className="max-w-2xl mx-auto border border-white/10 rounded-xl overflow-hidden flex" style={{ height: "380px" }}>
          <Sidebar />
          <Editor />
        </div>
      </NoteProvider>

      <div className="max-w-2xl mx-auto mt-3 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/50 space-y-1">
        <p className="text-white/70 font-medium mb-1.5">Context 구독 현황</p>
        <p><code className="text-blue-300">Sidebar</code> — StateContext(목록·input) + DispatchContext</p>
        <p><code className="text-blue-300">Editor</code> — StateContext(선택된 노트) + DispatchContext</p>
        <p className="text-white/30">dispatch는 안정적 참조 → DispatchContext만 쓰는 컴포넌트는 state 변경 시 리렌더 안 됨</p>
      </div>
    </>
  );
}
