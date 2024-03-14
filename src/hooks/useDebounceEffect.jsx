/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback } from 'react'

const useDebounceEffect = (effect, dependencies, delay) => {
  const callback = useCallback(effect, dependencies)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

export default useDebounceEffect