
// React Hooks
import { useEffect, useState } from "react";

// Custom Hook: useLocalStorage
// This hook syncs React state with browser localStorage
// so data persists even after page refresh.
export function useLocalStorage<T>(key: string, initialValue: T) {

  // =========================================================
  // STATE INITIALIZATION
  // =========================================================
  // On first render:
  // - Try to read existing value from localStorage
  // - If not found or error → fallback to initialValue
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // =========================================================
  // SIDE EFFECT: Sync state → localStorage
  // =========================================================
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // =========================================================
  // RETURN VALUE
  // =========================================================
  return [value, setValue] as const;
}