import { useEffect, useMemo, useState } from "react";

export function useLocalStorage<T>(initialValue: T, key: string): [T, (newValue: T) => void] {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const item = localStorage.getItem(key)

    if (item) {
      setValue(JSON.parse(item) as T)
    }
  }, [key])

  return useMemo(() => [
    value,
    (newValue: T) => {
      setValue(newValue)
      localStorage.setItem(key, JSON.stringify(newValue))
    }
  ], [key, value])
}
