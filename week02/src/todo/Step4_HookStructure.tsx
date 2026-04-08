/**
 * Step 4: 훅 구조와 관심사 분리
 *
 * Step 3에 검색 + 글자 수 통계 기능 추가
 * → useNoteSearch, useNoteStats 훅을 별도로 설계
 *
 * 기능: 목록 / 추가 / 삭제 / 편집 / 자동 저장 / 검색 / 통계
 *
 * 핵심 개념:
 *   - 기능이 늘어날수록 훅을 파일로 분리할 필요성이 생김
 *   - 파생 상태(통계)는 useMemo 훅으로 분리 → 컴포넌트가 직접 계산 안 함
 *   - 검색은 원본 notes를 건드리지 않고 필터링만
 *   - "언제 Context, 언제 prop?"
 *     → 이 앱처럼 여러 컴포넌트가 같은 상태를 공유하면 Context
 *     → 부모-자식 1단계 관계면 prop으로 충분
 *
 * 실제 파일 분리 구조 (주석으로 표시):
 *   hooks/
 *     useNotes.ts       ← useReducer CRUD
 *     useDebounce.ts    ← 디바운스
 *     useLocalStorage.ts← 저장소
 *     useNoteSearch.ts  ← 검색 필터
 *     useNoteStats.ts   ← 파생 상태 (통계)
 *   context/
 *     NoteContext.tsx   ← Provider + usePersistentNotes 합성
 *   types.ts
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

// ─── types.ts ─────────────────────────────────────────────────────────────────

type Note = { id: string; title: string; content: string; updatedAt: number; pinned: boolean };
type SaveStatus = "saved" | "pending";

// ─── hooks/useDebounce.ts ─────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ─── hooks/useLocalStorage.ts ─────────────────────────────────────────────────

function useLocalStorage<T>(key: string, init: T) {
  const [value, setValue] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  const save = useCallback((v: T) => { setValue(v); localStorage.setItem(key, JSON.stringify(v)); }, [key]);
  return [value, save] as const;
}

// ─── hooks/useNotes.ts ────────────────────────────────────────────────────────

type NoteAction =
  | { type: "ADD"; title: string }
  | { type: "SELECT"; id: string }
  | { type: "UPDATE"; id: string; field: "title" | "content"; value: string }
  | { type: "DELETE"; id: string }
  | { type: "TOGGLE_PIN"; id: string }
  | { type: "LOAD"; notes: Note[]; selectedId: string | null };

type NoteState = { notes: Note[]; selectedId: string | null };

function notesReducer(state: NoteState, action: NoteAction): NoteState {
  switch (action.type) {
    case "ADD": {
      const title = action.title.trim();
      if (!title) return state;
      const n: Note = { id: crypto.randomUUID(), title, content: "", updatedAt: Date.now(), pinned: false };
      return { notes: [n, ...state.notes], selectedId: n.id };
    }
    case "SELECT": return { ...state, selectedId: action.id };
    case "UPDATE":
      return { ...state, notes: state.notes.map((n) => n.id === action.id ? { ...n, [action.field]: action.value, updatedAt: Date.now() } : n) };
    case "DELETE": {
      const rest = state.notes.filter((n) => n.id !== action.id);
      return { notes: rest, selectedId: state.selectedId === action.id ? (rest[0]?.id ?? null) : state.selectedId };
    }
    case "TOGGLE_PIN":
      return { ...state, notes: state.notes.map((n) => n.id === action.id ? { ...n, pinned: !n.pinned } : n) };
    case "LOAD": return { notes: action.notes, selectedId: action.selectedId };
  }
}

function useNotes(initial: NoteState) {
  const [state, dispatch] = useReducer(notesReducer, initial);
  return {
    ...state,
    add:       useCallback((title: string) => dispatch({ type: "ADD", title }), []),
    select:    useCallback((id: string) => dispatch({ type: "SELECT", id }), []),
    update:    useCallback((id: string, field: "title" | "content", value: string) => dispatch({ type: "UPDATE", id, field, value }), []),
    remove:    useCallback((id: string) => dispatch({ type: "DELETE", id }), []),
    togglePin: useCallback((id: string) => dispatch({ type: "TOGGLE_PIN", id }), []),
    load:      useCallback((notes: Note[], selectedId: string | null) => dispatch({ type: "LOAD", notes, selectedId }), []),
  };
}

// ─── hooks/useNoteSearch.ts ───────────────────────────────────────────────────
// 관심사: 검색어 상태 + 검색 결과 필터링 (원본 notes 변경 없음)

function useNoteSearch(notes: Note[]) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  }, [notes, query]);
  return { query, setQuery, filtered };
}

// ─── hooks/useNoteStats.ts ────────────────────────────────────────────────────
// 관심사: 파생 상태 계산 — 컴포넌트가 직접 계산하지 않아도 됨

function useNoteStats(notes: Note[], selectedNote: Note | null) {
  return useMemo(() => ({
    total: notes.length,
    pinned: notes.filter((n) => n.pinned).length,
    charCount: selectedNote ? selectedNote.content.length : 0,
    wordCount: selectedNote ? selectedNote.content.trim().split(/\s+/).filter(Boolean).length : 0,
  }), [notes, selectedNote]);
}

// ─── context/NoteContext.tsx ──────────────────────────────────────────────────

const STORAGE_KEY = "week02-step4-notes";
const DEFAULTS: Note[] = [
  { id: "a", title: "훅 구조 학습", content: "기능이 많아질수록 훅을 파일로 분리해야 합니다.\n각 훅이 단일 관심사만 담당하면 테스트와 재사용이 쉬워집니다.", updatedAt: Date.now(), pinned: true },
  { id: "b", title: "새로운 기능", content: "📌 고정 기능: 노트 옆 핀 버튼을 눌러보세요.\n🔍 검색: 상단 검색창에서 제목/내용을 검색할 수 있습니다.", updatedAt: Date.now() - 60000, pinned: false },
  { id: "c", title: "아이디어 메모", content: "여기에 뭔가 적어보세요.", updatedAt: Date.now() - 120000, pinned: false },
];

type CtxValue = {
  notes: Note[]; filtered: Note[]; selectedId: string | null; selectedNote: Note | null;
  stats: ReturnType<typeof useNoteStats>; saveStatus: SaveStatus;
  query: string; setQuery: (q: string) => void;
  input: string; setInput: (v: string) => void;
  add: (title: string) => void; select: (id: string) => void;
  update: (id: string, field: "title" | "content", value: string) => void;
  remove: (id: string) => void; togglePin: (id: string) => void;
};

const NoteCtx = createContext<CtxValue | null>(null);
const useNoteCtx = () => { const c = useContext(NoteCtx); if (!c) throw new Error(""); return c; };

function NoteProvider({ children }: { children: ReactNode }) {
  const [stored, saveToStorage] = useLocalStorage<{ notes: Note[]; selectedId: string | null }>(
    STORAGE_KEY, { notes: DEFAULTS, selectedId: DEFAULTS[0].id }
  );

  const { notes, selectedId, add, select, update, remove, togglePin, load } = useNotes(stored);

  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) { mounted.current = true; load(stored.notes, stored.selectedId); }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    setSaveStatus("pending");
  }, [notes]);

  const debouncedNotes = useDebounce(notes, 500);
  useEffect(() => {
    if (!mounted.current) return;
    saveToStorage({ notes: debouncedNotes, selectedId });
    setSaveStatus("saved");
  }, [debouncedNotes]); // eslint-disable-line react-hooks/exhaustive-deps

  const { query, setQuery, filtered } = useNoteSearch(notes);
  const selectedNote = notes.find((n) => n.id === selectedId) ?? null;
  const stats = useNoteStats(notes, selectedNote);

  const [input, setInput] = useState("");

  // 고정 노트를 목록 상단으로
  const sortedFiltered = useMemo(
    () => [...filtered].sort((a, b) => Number(b.pinned) - Number(a.pinned)),
    [filtered]
  );

  const value = useMemo(() => ({
    notes, filtered: sortedFiltered, selectedId, selectedNote, stats, saveStatus,
    query, setQuery, input, setInput, add, select, update, remove, togglePin,
  }), [notes, sortedFiltered, selectedId, selectedNote, stats, saveStatus, query, input, add, select, update, remove, togglePin]);

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
  const { filtered, selectedId, saveStatus, query, setQuery, input, setInput, add, select, remove, togglePin } = useNoteCtx();

  function handleAdd() { if (input.trim()) { add(input); setInput(""); } }

  return (
    <div className="w-48 shrink-0 flex flex-col border-r border-white/10">
      {/* 검색 */}
      <div className="p-2 border-b border-white/10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색..."
          className="w-full bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs outline-none focus:border-purple-500/50"
        />
      </div>

      {/* 추가 */}
      <div className="p-2 border-b border-white/10">
        <div className="flex gap-1">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="새 노트..."
            className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded px-2 py-1.5 text-xs outline-none focus:border-purple-500/50"
          />
          <button onClick={handleAdd} className="bg-purple-600 hover:bg-purple-500 px-2 py-1.5 rounded text-xs font-medium transition-colors">+</button>
        </div>
      </div>

      {/* 목록 */}
      <ul className="flex-1 overflow-y-auto">
        {filtered.length === 0 && <li className="px-3 py-6 text-center text-white/30 text-xs">검색 결과 없음</li>}
        {filtered.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => select(note.id)}
              className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors group relative ${
                selectedId === note.id ? "bg-purple-500/15 text-purple-200" : "hover:bg-white/5 text-white/60"
              }`}
            >
              {note.pinned && <span className="absolute left-1 top-2.5 text-[9px] text-purple-400">📌</span>}
              <p className={`text-xs font-medium truncate pr-10 ${note.pinned ? "pl-3" : ""}`}>{note.title}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{formatTime(note.updatedAt)}</p>
              <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <span onClick={(e) => { e.stopPropagation(); togglePin(note.id); }} className="text-white/30 hover:text-purple-400 text-xs transition-colors">📌</span>
                <span onClick={(e) => { e.stopPropagation(); remove(note.id); }} className="text-white/30 hover:text-red-400 text-sm transition-colors">×</span>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className={`px-3 py-2 text-[10px] border-t border-white/10 transition-colors ${saveStatus === "pending" ? "text-purple-400" : "text-white/30"}`}>
        {saveStatus === "pending" ? "저장 중..." : "저장됨 ✓"}
      </div>
    </div>
  );
}

function Editor() {
  const { selectedNote, stats, update } = useNoteCtx();
  if (!selectedNote) return <div className="flex-1 flex items-center justify-center text-white/30 text-sm">노트를 선택하세요</div>;

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <input
        value={selectedNote.title}
        onChange={(e) => update(selectedNote.id, "title", e.target.value)}
        className="px-5 pt-5 pb-2 text-base font-bold bg-transparent outline-none text-white border-b border-white/10"
      />
      <textarea
        value={selectedNote.content}
        onChange={(e) => update(selectedNote.id, "content", e.target.value)}
        placeholder="내용을 입력하세요..."
        className="flex-1 px-5 py-4 bg-transparent outline-none text-sm text-white/80 placeholder-white/20 resize-none leading-relaxed"
      />
      {/* useNoteStats 파생 상태 */}
      <div className="px-5 py-2 border-t border-white/10 flex gap-4 text-[10px] text-white/30">
        <span>{stats.charCount}자</span>
        <span>{stats.wordCount}단어</span>
        <span>전체 {stats.total}개 노트 · 고정 {stats.pinned}개</span>
      </div>
    </div>
  );
}

// ─── Usage ────────────────────────────────────────────────────────────────────

export function Step4_HookStructure() {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-4 text-sm text-purple-300">
        <span className="font-medium">훅 구조 분리</span>: 검색·통계 기능을 각자의 훅으로 분리했습니다.
        <br />
        <span className="text-white/50 text-xs">📌 핀 고정 / 🔍 검색 / 글자 수 통계가 추가됐습니다.</span>
      </div>

      <NoteProvider>
        <div className="max-w-2xl mx-auto border border-white/10 rounded-xl overflow-hidden flex" style={{ height: "420px" }}>
          <Sidebar />
          <Editor />
        </div>
      </NoteProvider>

      <div className="max-w-2xl mx-auto mt-3 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/50 space-y-1">
        <p className="text-white/70 font-medium mb-1.5">이 파일의 실제 분리 구조</p>
        <p><code className="text-purple-300">hooks/useNotes.ts</code> — useReducer CRUD + TOGGLE_PIN action</p>
        <p><code className="text-purple-300">hooks/useNoteSearch.ts</code> — 검색어 + 필터링 (원본 변경 없음)</p>
        <p><code className="text-purple-300">hooks/useNoteStats.ts</code> — 파생 상태: 글자 수, 단어 수, 통계</p>
        <p><code className="text-purple-300">hooks/useLocalStorage.ts</code> · <code className="text-purple-300">hooks/useDebounce.ts</code></p>
        <p><code className="text-purple-300">context/NoteContext.tsx</code> — 위 훅들을 합성해 Provider로 공급</p>
      </div>
    </>
  );
}
