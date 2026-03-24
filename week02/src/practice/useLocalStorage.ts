import { useCallback, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = useCallback(
    (next: T) => {
      setValue(next);
      localStorage.setItem(key, JSON.stringify(next));
    },
    [key]
  );

  return [value, save] as const;
}

export default useLocalStorage;