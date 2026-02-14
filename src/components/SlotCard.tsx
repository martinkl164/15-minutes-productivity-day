import type { Slot } from '../lib/slots'

interface SlotCardProps {
  slot: Slot
  timeLabel: string
  note: string
  onNoteChange: (note: string) => void
  isActive?: boolean
  onStartTimer?: () => void
  canStartTimer?: boolean
  showCountdown?: boolean
  countdownDisplay?: string
}

export function SlotCard({
  slot,
  timeLabel,
  note,
  onNoteChange,
  isActive,
  onStartTimer,
  canStartTimer = true,
  showCountdown,
  countdownDisplay,
}: SlotCardProps) {
  return (
    <article className={`slot ${isActive ? 'slot--active' : ''}`}>
      <span className="slot__time" aria-hidden>{timeLabel}</span>
      <span className="slot__timer-cell">
        {onStartTimer != null && (
          <button
            type="button"
            className="slot__btn"
            onClick={canStartTimer ? onStartTimer : undefined}
            disabled={!canStartTimer}
            title={showCountdown ? 'Stop and reset' : canStartTimer ? 'Start 15 min' : 'Unavailable (another timer running or slot too far ahead)'}
          >
            ▶
          </button>
        )}
        {showCountdown && countdownDisplay != null && (
          <span className="slot__countdown" aria-live="polite">{countdownDisplay}</span>
        )}
      </span>
      <input
        id={`slot-note-${slot.index}`}
        type="text"
        className="slot__note"
        aria-label="What did you do?"
        placeholder="Note…"
        value={note}
        onChange={(e) => onNoteChange(e.target.value)}
      />
    </article>
  )
}
