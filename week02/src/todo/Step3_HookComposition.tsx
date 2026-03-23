/**
 * Step 3: 훅 합성 (Hook Composition)
 *
 * Step 2에 영속 저장 + 자동 저장 기능 추가
 * → useDebounce + useLocalStorage + useNotes 를 합성
 *
 * 기능: 목록 / 추가 / 삭제 / 편집 + 자동 저장 + 새로고침 후에도 유지
 *
 * 핵심 개념:
 *   - useDebounce: 타이핑 멈추면 N ms 후 반응 (저장 타이밍 제어)
 *   - useLocalStorage: React 상태 ↔ localStorage 동기화
 *   - useNotes: useReducer 기반 CRUD (저장소를 모름)
 *   - usePersistentNotes: 세 훅을 합성 → "자동 저장되는 메모장"
 *
 * 각 훅이 단일 관심사만 담당하기 때문에:
 *   - useDebounce는 노트를 전혀 모름 (어떤 타입이든 받음)
 *   - useLocalStorage도 노트를 전혀 모름
 *   - useNotes는 저장소를 전혀 모름
 *   → 조합 방식을 바꾸기 쉬움 (localStorage → API 저장으로 교체 가능)
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Note = { id: string; title: string; content: string; updatedAt: number };
type SaveStatus = "saved" | "pending";

// ════════════════════════════════════════════════════════════════════════════
// Hook 1: useDebounce
// 관심사: 값이 변할 때마다 즉시 반응하지 않고 N ms 후에 반응
// ════════════════════════════════════════════════════════════════════════════

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// ════════════════════════════════════════════════════════════════════════════
// Hook 2: useLocalStorage
// 관심사: React 상태 ↔ localStorage 동기화 (Note를 전혀 모름)
// ════════════════════════════════════════════════════════════════════════════

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = useCallback((next: T) => {
    setValue(next);
    localStorage.setItem(key, JSON.stringify(next));
  }, [key]);

  return [value, save] as const;
}

// ════════════════════════════════════════════════════════════════════════════
// Hook 3: useNotes (useReducer 기반 CRUD)
// 관심사: 노트 목록의 생성 / 수정 / 삭제 (저장소를 전혀 모름)
// ════════════════════════════════════════════════════════════════════════════

type NoteAction =
  | { type: "ADD"; title: string }
  | { type: "SELECT"; id: string }
  | { type: "UPDATE"; id: string; field: "title" | "content"; value: string }
  | { type: "DELETE"; id: string }
  | { type: "LOAD"; notes: Note[]; selectedId: string | null };

type NoteState = { notes: Note[]; selectedId: string | null };

function notesReducer(state: NoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case "ADD": {
      const title = action.title.trim();
      if (!title) return state;
      const n: Note = { id: crypto.randomUUID(), title, content: "", updatedAt: Date.now() };
      return { notes: [n, ...state.notes], selectedId: n.id };
    }
    case "SELECT":
      return { ...state, selectedId: action.id };
    case "UPDATE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.id ? { ...n, [action.field]: action.value, updatedAt: Date.now() } : n
        ),
      };
    case "DELETE": {
      const remaining = state.notes.filter((n) => n.id !== action.id);
      return {
        notes: remaining,
        selectedId: state.selectedId === action.id ? (remaining[0]?.id ?? null) : state.selectedId,
      };
    }
    case "LOAD":
      return { notes: action.notes, selectedId: action.selectedId };
  }
}

function useNotes(initial: NoteState) {
  const [state, dispatch] = useReducer(notesReducer, initial);
  const add    = useCallback((title: string) => dispatch({ type: "ADD", title }), []);
  const select = useCallback((id: string) => dispatch({ type: "SELECT", id }), []);
  const update = useCallback((id: string, field: "title" | "content", value: string) =>
    dispatch({ type: "UPDATE", id, field, value }), []);
  const remove = useCallback((id: string) => dispatch({ type: "DELETE", id }), []);
  const load   = useCallback((notes: Note[], selectedId: string | null) =>
    dispatch({ type: "LOAD", notes, selectedId }), []);
  return { ...state, add, select, update, remove, load };
}

// ════════════════════════════════════════════════════════════════════════════
// Hook 4: usePersistentNotes — 훅 합성
// = useNotes + useLocalStorage + useDebounce
// ════════════════════════════════════════════════════════════════════════════

const STORAGE_KEY = "week02-step3-notes";
const DEFAULTS: Note[] = [
  { id: "a", title: "훅 합성 학습", content: "useDebounce + useLocalStorage + useNotes\n→ usePersistentNotes", updatedAt: Date.now() },
  { id: "b", title: "타이핑해보세요", content: "500ms 후 자동으로 저장됩니다.\n새로고침해도 내용이 유지됩니다.", updatedAt: Date.now() - 60000 },
];

function usePersistentNotes() {
  const [stored, saveToStorage] = useLocalStorage<{ notes: Note[]; selectedId: string | null }>(
    STORAGE_KEY,
    { notes: DEFAULTS, selectedId: DEFAULTS[0].id }
  );

  const { notes, selectedId, add, select, update, remove, load } = useNotes(stored);

  // 첫 마운트: localStorage 값을 reducer에 로드
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      load(stored.notes, stored.selectedId);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 저장 상태
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setSaveStatus("pending");
  }, [notes]);

  // 500ms 디바운스 후 localStorage에 저장
  const debouncedNotes = useDebounce(notes, 500);
  useEffect(() => {
    if (!mounted.current) return;
    saveToStorage({ notes: debouncedNotes, selectedId });
    setSaveStatus("saved");
  }, [debouncedNotes]); // eslint-disable-line react-hooks/exhaustive-deps

  return { notes, selectedId, saveStatus, add, select, update, remove };
}

// ─── Context ─────────────────────────────────────────────────────────────────

type CtxValue = ReturnType<typeof usePersistentNotes> & { input: string; setInput: (v: string) => void };
const NoteCtx = createContext<CtxValue | null>(null);
const useNoteCtx = () => { const c = useContext(NoteCtx); if (!c) throw new Error(""); return c; };

function NoteProvider({ children }: { children: ReactNode }) {
  const noteState = usePersistentNotes();
  const [input, setInput] = useState("");
  const value = useMemo(() => ({ ...noteState, input, setInput }), [noteState, input]);
  return <NoteCtx.Provider value={value}>{children}</NoteCtx.Provider>;
}

// ─── UI ──────────────────────────────────────────────────────────────────────

function formatTime(ts: number) {
  const d = Date.now() - ts;
  if (d < 60000) return "방금";
  if (d < 3600000) return `${Math.floor(d / 60000)}분 전`;
  return new Date(ts).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

function Sidebar() {
  const { notes, selectedId, saveStatus, input, setInput, add, select, remove } = useNoteCtx();

  function handleAdd() { if (input.trim()) { add(input); setInput(""); } }

  return (
    <div className="w-44 shrink-0 flex flex-col border-r border-white/10">
      <div className="p-2 border-b border-white/10">
        <div className="flex gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="노트 제목..."
            className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs outline-none focus:border-green-500/50"
          />
          <button onClick={handleAdd} className="bg-green-600 hover:bg-green-500 px-2 py-1.5 rounded text-xs font-medium transition-colors">+</button>
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {notes.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => select(note.id)}
              className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors group relative ${
                selectedId === note.id ? "bg-green-500/15 text-green-200" : "hover:bg-white/5 text-white/60"
              }`}
            >
              <p className="text-xs font-medium truncate pr-5">{note.title}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{formatTime(note.updatedAt)}</p>
              <span
                onClick={(e) => { e.stopPropagation(); remove(note.id); }}
                className="absolute right-2 top-2 text-white/20 hover:text-red-400 text-sm opacity-0 group-hover:opacity-100 transition-colors"
              >×</span>
            </button>
          </li>
        ))}
      </ul>

      <div className={`px-3 py-2 text-[10px] border-t border-white/10 transition-colors ${saveStatus === "pending" ? "text-green-400" : "text-white/30"}`}>
        {saveStatus === "pending" ? "저장 중..." : "저장됨 ✓"}
      </div>
    </div>
  );
}

function Editor() {
  const { notes, selectedId, update } = useNoteCtx();
  const note = notes.find((n) => n.id === selectedId) ?? null;
  if (!note) return <div className="flex-1 flex items-center justify-center text-white/30 text-sm">노트를 선택하세요</div>;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <input
        value={note.title}
        onChange={(e) => update(note.id, "title", e.target.value)}
        className="px-5 pt-5 pb-2 text-base font-bold bg-transparent outline-none text-white border-b border-white/10"
      />
      <textarea
        value={note.content}
        onChange={(e) => update(note.id, "content", e.target.value)}
        placeholder="내용을 입력하세요..."
        className="flex-1 px-5 py-4 bg-transparent outline-none text-sm text-white/80 placeholder-white/20 resize-none leading-relaxed"
      />
    </div>
  );
}

// ─── Usage ────────────────────────────────────────────────────────────────────

export function Step3_HookComposition() {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4 text-sm text-green-300">
        <span className="font-medium">훅 합성</span>: 3개의 훅을 조합해 자동 저장 기능을 완성합니다.
        <br />
        <span className="text-white/50 text-xs">타이핑 후 멈추면 500ms 뒤 저장됩니다. 새로고침해도 내용이 유지됩니다.</span>
      </div>

      <NoteProvider>
        <div className="max-w-2xl mx-auto border border-white/10 rounded-xl overflow-hidden flex" style={{ height: "380px" }}>
          <Sidebar />
          <Editor />
        </div>
      </NoteProvider>

      <div className="max-w-2xl mx-auto mt-3 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/50 space-y-1">
        <p className="text-white/70 font-medium mb-1.5">훅 합성 구조</p>
        <p><code className="text-green-300">usePersistentNotes</code></p>
        <p className="pl-3">├ <code className="text-white/60">useNotes</code> — useReducer CRUD (저장소 모름)</p>
        <p className="pl-3">├ <code className="text-white/60">useLocalStorage</code> — 브라우저 저장 (Note 모름)</p>
        <p className="pl-3">└ <code className="text-white/60">useDebounce</code> — 저장 타이밍 제어 (Note 모름)</p>
      </div>
    </>
  );
}
