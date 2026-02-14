const SETTINGS_KEY = '15min-settings'

export type ThemeId = 'dark' | 'light' | 'sepia' | 'ocean'

export interface Settings {
  dayStartTime: string
  dayEndTime: string
  theme: ThemeId
}

const DEFAULT_SETTINGS: Settings = {
  dayStartTime: '08:00',
  dayEndTime: '18:00',
  theme: 'dark',
}

export function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS } as Settings
    const parsed = JSON.parse(raw) as Partial<Settings>
    const theme = parsed.theme ?? DEFAULT_SETTINGS.theme
    const validTheme: ThemeId = ['dark', 'light', 'sepia', 'ocean'].includes(theme) ? theme : 'dark'
    return {
      dayStartTime: parsed.dayStartTime ?? DEFAULT_SETTINGS.dayStartTime,
      dayEndTime: parsed.dayEndTime ?? DEFAULT_SETTINGS.dayEndTime,
      theme: validTheme,
    }
  } catch {
    return { ...DEFAULT_SETTINGS } as Settings
  }
}

export function saveSettings(settings: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

/**
 * Notes keyed by "dateKey-slotIndex", e.g. "2025-02-14-0".
 */
export function getNoteKey(dateKey: string, slotIndex: number): string {
  return `${dateKey}-${slotIndex}`
}

export function loadNote(dateKey: string, slotIndex: number): string {
  const key = getNoteKey(dateKey, slotIndex)
  return localStorage.getItem(key) ?? ''
}

export function saveNote(dateKey: string, slotIndex: number, note: string): void {
  const key = getNoteKey(dateKey, slotIndex)
  if (note.trim()) {
    localStorage.setItem(key, note.trim())
  } else {
    localStorage.removeItem(key)
  }
}

/**
 * Get count of slots with notes for a date.
 */
export function getNoteCountForDate(dateKey: string): number {
  let count = 0
  const prefix = dateKey + '-'
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)
    if (k?.startsWith(prefix) && /^\d{4}-\d{2}-\d{2}-\d+$/.test(k)) count++
  }
  return count
}
