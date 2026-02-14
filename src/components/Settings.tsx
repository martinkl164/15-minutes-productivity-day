import { useState } from 'react'
import type { Settings as SettingsType, ThemeId } from '../lib/storage'

const THEMES: { id: ThemeId; label: string; icon: string }[] = [
  { id: 'dark', label: 'Dark', icon: '🌙' },
  { id: 'light', label: 'Light', icon: '☀️' },
  { id: 'sepia', label: 'Sepia', icon: '📜' },
  { id: 'ocean', label: 'Ocean', icon: '🌊' },
]

interface SettingsProps {
  settings: SettingsType
  onSave: (s: SettingsType) => void
  onClose: () => void
}

export function Settings({ settings, onSave, onClose }: SettingsProps) {
  const [start, setStart] = useState(settings.dayStartTime)
  const [end, setEnd] = useState(settings.dayEndTime)
  const [theme, setTheme] = useState<ThemeId>(settings.theme)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ dayStartTime: start, dayEndTime: end, theme })
    onClose()
  }

  return (
    <div className="settings-panel">
      <div className="settings-header">
        <h2>Settings</h2>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>
      <form onSubmit={handleSubmit} className="settings-form">
        <fieldset className="settings-fieldset">
          <legend>Theme</legend>
          <div className="settings-themes">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`settings-theme-btn ${theme === t.id ? 'settings-theme-btn--active' : ''}`}
                onClick={() => setTheme(t.id)}
                title={t.label}
                aria-pressed={theme === t.id}
              >
                <span className="settings-theme-icon" aria-hidden>{t.icon}</span>
                <span className="settings-theme-label">{t.label}</span>
              </button>
            ))}
          </div>
        </fieldset>
        <label>
          Day start
          <input
            type="time"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </label>
        <label>
          Day end
          <input
            type="time"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </label>
        <p className="settings-hint">Time and date format follow your browser language.</p>
        <button type="submit" className="btn-primary">Save</button>
      </form>
    </div>
  )
}
