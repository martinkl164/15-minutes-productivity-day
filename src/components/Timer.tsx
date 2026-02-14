import { SLOT_SECONDS } from '../lib/time'

interface TimerProps {
  display: string
  running: boolean
  onStart: () => void
  onPause: () => void
  onReset: (seconds?: number) => void
  onComplete: () => void
}

export function Timer({
  display,
  running,
  onStart,
  onPause,
  onReset,
  onComplete,
}: TimerProps) {
  return (
    <div className="timer-card">
      <div className="timer-display" aria-live="polite">
        {display}
      </div>
      <div className="timer-actions">
        {running ? (
          <button type="button" className="btn-primary" onClick={onPause}>
            Pause
          </button>
        ) : (
          <button type="button" className="btn-primary" onClick={onStart}>
            Start
          </button>
        )}
        <button type="button" className="btn-secondary" onClick={() => onReset(SLOT_SECONDS)}>
          Reset
        </button>
        <button type="button" className="btn-complete" onClick={onComplete}>
          Complete & log
        </button>
      </div>
    </div>
  )
}
