import React, { useState, useRef } from 'react'

export function useStateRef<T>(value: T): [
  T,
  React.MutableRefObject<T>,
  React.Dispatch<React.SetStateAction<T>>,
] {
  const [state, setState] = useState<T>(value)
  const stateRef = useRef<T>(state)
  stateRef.current = state
  return [state, stateRef, setState]
}
