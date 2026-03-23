import { useEffect, useRef, useState } from "react";
import type { Note, SaveStatus } from "@/practice/note.ts";
import useNotes from "@/practice/useNotes.ts";
import useDebounce from "@/practice/useDebounce.ts";
import useLocalStorage from "@/practice/useLocalStorage.ts";
import { DEFAULTS, STORAGE_KEY } from "@/practice/constants.ts";

function usePersistentNotes() {
  const [stored, saveToStorage] = useLocalStorage<Note[]>(STORAGE_KEY, DEFAULTS);
  const { notes, create, update, remove, load } = useNotes(stored);

  // 첫 마운트 시 저장된 값을 reducer에 로드
  const initialized = useRef(false);
  useEffect(() => {
    if (!initialized.current) {
      load(stored);
      initialized.current = true;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 저장 상태 추적
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");

  // notes가 바뀌면 "수정 중" 표시
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setSaveStatus("pending");
  }, [notes]);

  // 500ms 디바운스 후 localStorage에 저장
  const debouncedNotes = useDebounce(notes, 500);
  useEffect(() => {
    if (isFirstRender.current) return;
    saveToStorage(debouncedNotes);
    setSaveStatus("saved");
  }, [debouncedNotes, saveToStorage]);

  return { notes, saveStatus, create, update, remove };
}

export default usePersistentNotes;