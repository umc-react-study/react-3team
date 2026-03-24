import { useCallback, useReducer } from "react";
import type { Note } from "@/practice/note.ts";

type NoteAction =
  | { type: "CREATE" }
  | { type: "UPDATE"; id: string; title: string; content: string }
  | { type: "DELETE"; id: string }
  | { type: "LOAD"; notes: Note[] };

function notesReducer(notes: Note[], action: NoteAction): Note[] {
  switch (action.type) {
    case "CREATE": {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: "제목 없음",
        content: "",
        updatedAt: Date.now(),
      };
      return [newNote, ...notes];
    }
    case "UPDATE":
      return notes.map((n) =>
        n.id === action.id
          ? { ...n, title: action.title, content: action.content, updatedAt: Date.now() }
          : n
      );
    case "DELETE":
      return notes.filter((n) => n.id !== action.id);
    case "LOAD":
      return action.notes;
  }
}

function useNotes(initial: Note[]) {
  const [notes, dispatch] = useReducer(notesReducer, initial);

  const create = useCallback(() => dispatch({ type: "CREATE" }), []);
  const update = useCallback((id: string, title: string, content: string) =>
    dispatch({ type: "UPDATE", id, title, content }), []);
  const remove = useCallback((id: string) => dispatch({ type: "DELETE", id }), []);
  const load = useCallback((notes: Note[]) => dispatch({ type: "LOAD", notes }), []);

  return { notes, create, update, remove, load };
}

export default useNotes;