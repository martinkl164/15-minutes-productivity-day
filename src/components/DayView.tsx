import { useState, useRef, useEffect } from 'react'
import { SLOT_SECONDS, formatTimeLocale } from '../lib/time'
import { toDateKey } from '../lib/time'
import { useSlots, useSlotNote } from '../hooks/useSlots'
import { getCurrentSlotIndex, getCurrentSlotFraction, isSlotWithinNext30Min, type Slot } from '../lib/slots'
import { SlotCard } from './SlotCard'
import { useTimer } from '../hooks/useTimer'

const SLOT_ROW_HEIGHT = 32

interface DayViewProps {
  dateKey: string
  dayStartTime: string
  dayEndTime: string
  onPrevDay: () => void
  onNextDay: () => void
  locale: string
}

export function DayView({
  dateKey,
  dayStartTime,
  dayEndTime,
  onPrevDay,
  onNextDay,
  locale,
}: DayViewProps) {
  const slots = useSlots(dateKey, dayStartTime, dayEndTime)
  const currentIndex = getCurrentSlotIndex(dayStartTime, dayEndTime)
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null)
  const activeSlotRef = useRef<number | null>(null)
  activeSlotRef.current = activeSlotIndex

  const handleTimerComplete = () => {
    const idx = activeSlotRef.current
    setActiveSlotIndex(null)
    pauseTimer()
    resetTimer(SLOT_SECONDS)
    if (idx != null) {
      setTimeout(() => document.getElementById(`slot-note-${idx}`)?.focus(), 0)
    }
  }

  const [, startTimer, pauseTimer, resetTimer, display] = useTimer(
    SLOT_SECONDS,
    handleTimerComplete
  )

  const handleStartSlot = (index: number) => {
    if (activeSlotIndex === index) {
      setActiveSlotIndex(null)
      pauseTimer()
      resetTimer(0)
      return
    }
    setActiveSlotIndex(index)
    resetTimer(SLOT_SECONDS)
    startTimer()
  }

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(t)
  }, [])

  const isToday = dateKey === toDateKey(new Date())
  const isPastDay = dateKey < toDateKey(new Date())

  const canStartTimerForSlot = (slot: Slot) => {
    if (activeSlotIndex === slot.index) return true
    if (activeSlotIndex !== null) return false
    if (isPastDay) return true
    if (!isToday) return false
    return isSlotWithinNext30Min(slot, dayStartTime, dayEndTime, now)
  }

  const currentFraction = getCurrentSlotFraction(dayStartTime, dayEndTime, now)
  const showTimeLine = isToday && currentFraction >= 0 && currentFraction < slots.length
  const timeLineTop = showTimeLine ? currentFraction * SLOT_ROW_HEIGHT : 0

  const date = new Date(dateKey + 'T12:00:00')
  const dayLabel = isToday
    ? 'TODAY'
    : date.toLocaleDateString(locale, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })

  return (
    <div className="day-view">
      <div className="day-nav">
        <button type="button" className="btn-nav" onClick={onPrevDay} aria-label="Previous day">
          ‹
        </button>
        <time className="day-nav__label" dateTime={dateKey}>{dayLabel}</time>
        <button type="button" className="btn-nav" onClick={onNextDay} aria-label="Next day">
          ›
        </button>
      </div>

      <div
        className="day-view__slots-wrap"
        style={
          {
            '--slot-h': `${SLOT_ROW_HEIGHT}px`,
            '--current-fraction': String(currentFraction),
          } as React.CSSProperties
        }
      >
        {showTimeLine && (
          <div
            className="day-view__now-line"
            style={{ top: timeLineTop }}
            aria-hidden
          />
        )}
        <ol className="slot-list">
          {slots.map((slot) => (
            <li key={slot.index}>
              <SlotWithNote
                slot={slot}
                dateKey={dateKey}
                isActive={slot.index === currentIndex}
                onStartTimer={() => handleStartSlot(slot.index)}
                canStartTimer={canStartTimerForSlot(slot)}
                isTimerActive={activeSlotIndex === slot.index}
                countdownDisplay={activeSlotIndex === slot.index ? display : undefined}
                locale={locale}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function SlotWithNote({
  slot,
  dateKey,
  isActive,
  onStartTimer,
  canStartTimer,
  isTimerActive,
  countdownDisplay,
  locale,
}: {
  slot: Slot
  dateKey: string
  isActive: boolean
  onStartTimer?: () => void
  canStartTimer: boolean
  isTimerActive?: boolean
  countdownDisplay?: string
  locale: string
}) {
  const [note, setNote] = useSlotNote(dateKey, slot.index)
  const timeLabel = formatTimeLocale(slot.startMinutes, locale)
  return (
    <SlotCard
      slot={slot}
      timeLabel={timeLabel}
      note={note}
      onNoteChange={setNote}
      isActive={isActive}
      onStartTimer={onStartTimer}
      canStartTimer={canStartTimer}
      showCountdown={isTimerActive}
      countdownDisplay={countdownDisplay}
    />
  )
}
