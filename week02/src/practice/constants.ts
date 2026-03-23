import type { Note } from "@/practice/note.ts";

export const STORAGE_KEY = "week02-practice-notes";

export const DEFAULTS: Note[] = [
  {
    id: "1",
    title: "2주차 학습 메모",
    content: "useReducer: action 기반으로 상태 변경을 표현\nContext: Provider가 하위 컴포넌트에 state/dispatch 공급\n훅 합성: 작은 훅을 조합해 더 큰 훅 만들기",
    updatedAt: Date.now(),
  },
  {
    id: "2",
    title: "훅 합성 구조",
    content: "usePersistentNotes\n├ useNotes (useReducer)\n├ useLocalStorage\n└ useDebounce",
    updatedAt: Date.now() - 60000,
  },
];