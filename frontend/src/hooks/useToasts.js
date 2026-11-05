import { useCallback, useState } from 'react'

let nextId = 1

export function useToasts(duration = 4000) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => setToasts((prev) => prev.filter((t) => t.id !== id)), [])

  const notify = useCallback(
    (message, type = 'success') => {
      const id = nextId++
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => dismiss(id), duration)
    },
    [dismiss, duration],
  )

  return { toasts, notify, dismiss }
}
