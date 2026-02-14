/**
 * Parse "HH:mm" to minutes since midnight.
 */
export function parseTime(timeStr: string): number {
  const [h, m] = timeStr.split(':').map(Number)
  return (h ?? 0) * 60 + (m ?? 0)
}

/**
 * Format minutes since midnight to "HH:mm".
 */
export function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

/**
 * Format seconds as "MM:SS".
 */
export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export const SLOT_MINUTES = 15
export const SLOT_SECONDS = SLOT_MINUTES * 60

/**
 * Date string YYYY-MM-DD for a given Date.
 */
export function toDateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

/**
 * Start of day in local time as Date.
 */
export function startOfDay(dateKey: string): Date {
  const d = new Date(dateKey + 'T00:00:00')
  return d
}

/**
 * Format minutes since midnight using browser/client locale (12h/24h, etc.).
 */
export function formatTimeLocale(minutes: number, locale?: string): string {
  const d = new Date(2000, 0, 1, Math.floor(minutes / 60), minutes % 60)
  return d.toLocaleTimeString(locale ?? undefined, { hour: 'numeric', minute: '2-digit', hour12: undefined })
}
