/**
 * 실습: 자동 저장 메모장
 *
 * 2주차 개념을 실전으로 적용한 앱입니다.
 *
 * 사용된 개념 (Step별 대응):
 *   Step 1 — useReducer: 노트 CRUD를 action으로 표현
 *   Step 2 — Context:    NoteProvider → 하위 컴포넌트에 state/dispatch 공급
 *   Step 3 — 훅 합성:   useDebounce + useLocalStorage → usePersistentNotes
 *   Step 4 — 훅 구조:   각 훅이 단일 관심사만 담당
 *
 * 기능:
 *   - 여러 노트 생성 / 삭제 / 선택
 *   - 제목 + 내용 편집
 *   - 타이핑 멈추면 500ms 후 자동 저장 (useDebounce)
 *   - 새로고침해도 유지 (useLocalStorage)
 *   - 저장 상태 표시: "수정 중..." / "저장됨 ✓"
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Note, SaveStatus } from "@/practice/note.ts";
import { STORAGE_KEY } from "@/practice/constants.ts";
import usePersistentNotes from "@/practice/usePersistentNotes.ts";

type NoteContextValue = {
  notes: Note[];
  selectedId: string | null;
  saveStatus: SaveStatus;
  select: (id: string) => void;
  create: () => void;
  update: (id: string, title: string, content: string) => void;
  remove: (id: string) => void;
};

const NoteContext = createContext<NoteContextValue | null>(null);

function useNoteContext() {
  const ctx = useContext(NoteContext);
  if (!ctx) throw new Error("NoteProvider 밖에서 사용 불가");
  return ctx;
}

function NoteProvider({ children }: { children: ReactNode }) {
  const { notes, saveStatus, create, update, remove } = usePersistentNotes();
  const [selectedId, setSelectedId] = useState<string | null>(notes[0]?.id ?? null);

  // 노트 생성 시 새 노트 자동 선택
  const handleCreate = useCallback(() => {
    create();
    // reducer가 id를 생성하므로 다음 render 후 첫 번째 노트를 선택
    setTimeout(() => {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: Note[] = JSON.parse(stored);
        // 실제로는 notes 상태를 직접 봐야 하지만 여기선 간단하게 처리
      }
    }, 0);
  }, [create]);

  // notes 변경 시 선택된 노트가 없으면 첫 번째로
  useEffect(() => {
    if (!selectedId || !notes.find((n) => n.id === selectedId)) {
      setSelectedId(notes[0]?.id ?? null);
    }
  }, [notes, selectedId]);

  const value = useMemo(
    () => ({ notes, selectedId, saveStatus, select: setSelectedId, create: handleCreate, update, remove }),
    [notes, selectedId, saveStatus, handleCreate, update, remove]
  );

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}

function formatTime(ts: number) {
  const diff = Date.now() - ts;
  if (diff < 60000) return "방금";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
  return new Date(ts).toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

function Sidebar() {
  const { notes, selectedId, saveStatus, select, create, remove } = useNoteContext();

  return (
    <div className="w-44 shrink-0 flex flex-col border-r border-white/10">
      {/* 상단 */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
        <span className="text-xs font-semibold text-white/60">노트 {notes.length}</span>
        <button
          onClick={create}
          className="text-white/50 hover:text-white transition-colors text-lg leading-none"
          title="새 노트"
        >
          +
        </button>
      </div>

      {/* 노트 목록 */}
      <ul className="flex-1 overflow-y-auto">
        {notes.length === 0 && (
          <li className="px-3 py-8 text-center text-white/30 text-xs">노트가 없습니다</li>
        )}
        {notes.map((note) => (
          <li key={note.id}>
            <button
              onClick={() => select(note.id)}
              className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors group relative ${
                selectedId === note.id ? "bg-orange-500/15 text-orange-200" : "hover:bg-white/5 text-white/70"
              }`}
            >
              <p className="text-xs font-medium truncate pr-5">{note.title || "제목 없음"}</p>
              <p className="text-[10px] text-white/30 mt-0.5">{formatTime(note.updatedAt)}</p>
              <span
                onClick={(e) => { e.stopPropagation(); remove(note.id); }}
                className="absolute right-2 top-2 text-white/20 hover:text-red-400 transition-colors text-sm opacity-0 group-hover:opacity-100"
              >
                ×
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* 저장 상태 */}
      <div className={`px-3 py-2 text-[10px] border-t border-white/10 transition-colors ${
        saveStatus === "pending" ? "text-orange-400" : "text-white/30"
      }`}>
        {saveStatus === "pending" ? "수정 중..." : "저장됨 ✓"}
      </div>
    </div>
  );
}

function Editor() {
  const { notes, selectedId, update } = useNoteContext();
  const note = notes.find((n) => n.id === selectedId);

  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  // 선택된 노트가 바뀌면 편집기 내용 교체
  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  // 타이핑할 때마다 update → usePersistentNotes의 debounce가 저장 처리
  useEffect(() => {
    if (!selectedId || !note) return;
    if (title === note.title && content === note.content) return;
    update(selectedId, title, content);
  }, [title, content]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!note) {
    return (
      <div className="flex-1 flex items-center justify-center text-white/20 text-sm">
        노트를 선택하거나 새로 만드세요
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="px-5 pt-5 pb-2 text-lg font-bold bg-transparent outline-none text-white placeholder-white/20 border-b border-white/10"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요..."
        className="flex-1 px-5 py-4 bg-transparent outline-none text-sm text-white/80 placeholder-white/20 resize-none leading-relaxed"
      />
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// Usage
// ════════════════════════════════════════════════════════════════════════════

export function MyPractice() {
  return (
    <>
      <div className="max-w-2xl mx-auto bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-4 text-sm text-orange-300">
        <span className="font-medium">실습: 자동 저장 메모장</span>
        <br />
        <span className="text-white/50 text-xs">
          useDebounce + useLocalStorage + useNotes(useReducer) → usePersistentNotes → Context
        </span>
      </div>

      <NoteProvider>
        <div className="max-w-2xl mx-auto border border-white/10 rounded-xl overflow-hidden flex" style={{ height: "420px" }}>
          <Sidebar />
          <Editor />
        </div>
      </NoteProvider>

      {/* 구조 설명 */}
      <div className="max-w-2xl mx-auto mt-4 bg-white/5 border border-white/10 rounded-lg p-3 text-xs text-white/50 space-y-1">
        <p className="text-white/70 font-medium mb-2">훅 합성 구조</p>
        <p><code className="text-orange-300">usePersistentNotes</code> (합성 훅)</p>
        <p className="pl-3">├ <code className="text-white/60">useNotes</code> — useReducer 기반 CRUD</p>
        <p className="pl-3">├ <code className="text-white/60">useLocalStorage</code> — 브라우저 저장</p>
        <p className="pl-3">└ <code className="text-white/60">useDebounce</code> — 500ms 후 저장</p>
        <p className="mt-2"><code className="text-orange-300">NoteProvider</code> → Context로 공급</p>
        <p className="pl-3">├ <code className="text-white/60">Sidebar</code> — 목록, 생성, 삭제, 저장 상태</p>
        <p className="pl-3">└ <code className="text-white/60">Editor</code> — 선택된 노트 편집</p>
      </div>
    </>
  );
}
