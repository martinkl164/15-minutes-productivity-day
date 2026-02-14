import { useState, useEffect } from 'react'
import { toDateKey } from './lib/time'
import { useSettings } from './hooks/useSettings'
import { useLocale } from './hooks/useLocale'
import { Layout } from './components/Layout'
import { Settings } from './components/Settings'
import { DayView } from './components/DayView'
import { WeekView } from './components/WeekView'
import { MonthView } from './components/MonthView'

type ViewMode = 'day' | 'week' | 'month'

function getWeekStart(d: Date): Date {
  const day = d.getDay()
  const diff = (day + 6) % 7
  const start = new Date(d)
  start.setDate(d.getDate() - diff)
  start.setHours(0, 0, 0, 0)
  return start
}

export default function App() {
  const [settings, setSettings] = useSettings()
  const locale = useLocale()
  const [viewMode, setViewMode] = useState<ViewMode>('day')
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme)
  }, [settings.theme])

  const dateKey = toDateKey(selectedDate)
  const weekStart = getWeekStart(selectedDate)

  const selectDay = (key: string) => {
    setSelectedDate(new Date(key + 'T12:00:00'))
    setViewMode('day')
  }

  const onPrevDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() - 1)
    setSelectedDate(d)
  }
  const onNextDay = () => {
    const d = new Date(selectedDate)
    d.setDate(d.getDate() + 1)
    setSelectedDate(d)
  }

  const onPrevWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() - 7)
    setSelectedDate(d)
  }
  const onNextWeek = () => {
    const d = new Date(weekStart)
    d.setDate(d.getDate() + 7)
    setSelectedDate(d)
  }
  const onPrevMonth = () => {
    const d = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    setSelectedDate(d)
  }
  const onNextMonth = () => {
    const d = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    setSelectedDate(d)
  }

  return (
    <>
      <Layout
        viewMode={viewMode}
        onViewChange={setViewMode}
        onOpenSettings={() => setShowSettings(true)}
      >
        {viewMode === 'day' && (
          <DayView
            dateKey={dateKey}
            dayStartTime={settings.dayStartTime}
            dayEndTime={settings.dayEndTime}
            onPrevDay={onPrevDay}
            onNextDay={onNextDay}
            locale={locale}
          />
        )}
        {viewMode === 'week' && (
          <WeekView
            weekStart={weekStart}
            onSelectDay={selectDay}
            onPrevWeek={onPrevWeek}
            onNextWeek={onNextWeek}
            locale={locale}
          />
        )}
        {viewMode === 'month' && (
          <MonthView
            year={selectedDate.getFullYear()}
            month={selectedDate.getMonth()}
            onSelectDay={selectDay}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            locale={locale}
          />
        )}
      </Layout>
      {showSettings && (
        <Settings
          settings={settings}
          onSave={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </>
  )
}
