import { useCallback, useState } from "react"

export default function useToggle(boolean = false) {
  const [state, setState] = useState(boolean)
  const toggleState = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return [state, toggleState]
}
