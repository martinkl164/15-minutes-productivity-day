import { toDateKey } from '../lib/time'
import { getNoteCountForDate } from '../lib/storage'

interface WeekViewProps {
  weekStart: Date
  onSelectDay: (dateKey: string) => void
  onPrevWeek: () => void
  onNextWeek: () => void
  locale: string
}

export function WeekView({ weekStart, onSelectDay, onPrevWeek, onNextWeek, locale }: WeekViewProps) {
  const days: Date[] = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    days.push(d)
  }
  const optsShort = { day: 'numeric' as const, month: 'short' as const }
  const optsLong = { day: 'numeric' as const, month: 'short' as const, year: 'numeric' as const }
  const label = `${weekStart.toLocaleDateString(locale, optsShort)} – ${days[6].toLocaleDateString(locale, optsLong)}`

  return (
    <div className="week-view">
      <div className="day-nav">
        <button type="button" className="btn-nav" onClick={onPrevWeek} aria-label="Previous week">‹</button>
        <span className="day-nav__label">{label}</span>
        <button type="button" className="btn-nav" onClick={onNextWeek} aria-label="Next week">›</button>
      </div>
      <div className="week-grid">
        {days.map((d) => {
          const dateKey = toDateKey(d)
          const count = getNoteCountForDate(dateKey)
          const label = d.toLocaleDateString(locale, { weekday: 'short', day: 'numeric' })
          return (
            <button
              key={dateKey}
              type="button"
              className="week-day"
              onClick={() => onSelectDay(dateKey)}
            >
              <span className="week-day__label">{label}</span>
              <span className="week-day__count" aria-label={`${count} slots with notes`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
