import { toDateKey } from '../lib/time'
import { getNoteCountForDate } from '../lib/storage'

interface MonthViewProps {
  year: number
  month: number
  onSelectDay: (dateKey: string) => void
  onPrevMonth: () => void
  onNextMonth: () => void
  locale: string
}

export function MonthView({ year, month, onSelectDay, onPrevMonth, onNextMonth, locale }: MonthViewProps) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = last.getDate()
  const cells: (string | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(toDateKey(new Date(year, month, d)))
  }

  const weekDays: string[] = []
  for (let i = 1; i <= 7; i++) {
    const d = new Date(2024, 0, i)
    weekDays.push(d.toLocaleDateString(locale, { weekday: 'short' }))
  }
  const monthLabel = new Date(year, month).toLocaleDateString(locale, {
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="month-view">
      <div className="day-nav">
        <button type="button" className="btn-nav" onClick={onPrevMonth} aria-label="Previous month">‹</button>
        <h2 className="month-view__title" style={{ margin: 0 }}>{monthLabel}</h2>
        <button type="button" className="btn-nav" onClick={onNextMonth} aria-label="Next month">›</button>
      </div>
      <div className="month-grid">
        {weekDays.map((w) => (
          <div key={w} className="month-grid__head">{w}</div>
        ))}
        {cells.map((dateKey, i) =>
          dateKey ? (
            <button
              key={dateKey}
              type="button"
              className="month-cell"
              onClick={() => onSelectDay(dateKey)}
            >
              <span className="month-cell__day">{new Date(dateKey).getDate()}</span>
              {getNoteCountForDate(dateKey) > 0 && (
                <span className="month-cell__dot" aria-hidden />
              )}
            </button>
          ) : (
            <div key={`empty-${i}`} className="month-cell month-cell--empty" />
          )
        )}
      </div>
    </div>
  )
}
