import { useState, useEffect, useCallback, useRef } from 'react'
import { formatCountdown, SLOT_SECONDS } from '../lib/time'

export interface TimerState {
  running: boolean
  remainingSeconds: number
}

export function useTimer(
  initialSeconds: number = SLOT_SECONDS,
  onComplete?: () => void
): [TimerState, () => void, () => void, (seconds?: number) => void, string] {
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  const start = useCallback(() => {
    setRunning(true)
  }, [])

  const pause = useCallback(() => {
    setRunning(false)
  }, [])

  const reset = useCallback((seconds: number = initialSeconds) => {
    setRunning(false)
    setRemainingSeconds(seconds)
  }, [initialSeconds])

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          setRunning(false)
          onCompleteRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const display = formatCountdown(remainingSeconds)
  return [{ running, remainingSeconds }, start, pause, reset, display]
}
