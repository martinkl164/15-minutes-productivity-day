import { parseTime, formatTime, SLOT_MINUTES, startOfDay } from './time'

export interface Slot {
  index: number
  start: string
  end: string
  startMinutes: number
  endMinutes: number
}

export interface SlotWithNote extends Slot {
  note: string
}

/**
 * Compute 15-minute slots between dayStart and dayEnd (e.g. "08:00", "18:00").
 */
export function getSlotsForDay(
  _dateKey: string,
  dayStartTime: string,
  dayEndTime: string
): Slot[] {
  const startM = parseTime(dayStartTime)
  const endM = parseTime(dayEndTime)
  const slots: Slot[] = []
  for (let m = startM; m < endM; m += SLOT_MINUTES) {
    slots.push({
      index: slots.length,
      start: formatTime(m),
      end: formatTime(m + SLOT_MINUTES),
      startMinutes: m,
      endMinutes: m + SLOT_MINUTES,
    })
  }
  return slots
}

/**
 * Get the slot index for the current time within a day's range (or -1 if outside).
 */
export function getCurrentSlotIndex(
  dayStartTime: string,
  dayEndTime: string,
  now: Date = new Date()
): number {
  const startM = parseTime(dayStartTime)
  const endM = parseTime(dayEndTime)
  const currentM = now.getHours() * 60 + now.getMinutes()
  if (currentM < startM || currentM >= endM) return -1
  const index = Math.floor((currentM - startM) / SLOT_MINUTES)
  return index
}

/**
 * True if the slot's start is not more than 30 minutes in the future.
 * Used to disallow starting a timer for slots too far ahead.
 */
export function isSlotWithinNext30Min(
  slot: Slot,
  dayStartTime: string,
  dayEndTime: string,
  now: Date = new Date()
): boolean {
  const startM = parseTime(dayStartTime)
  const endM = parseTime(dayEndTime)
  const currentM = now.getHours() * 60 + now.getMinutes()
  if (currentM < startM || currentM >= endM) return false
  return slot.startMinutes <= currentM + 30
}

/**
 * Current time as a fractional slot index (e.g. 2.5 = halfway through slot 2).
 * Used to position the "current time" line.
 */
export function getCurrentSlotFraction(
  dayStartTime: string,
  dayEndTime: string,
  now: Date = new Date()
): number {
  const startM = parseTime(dayStartTime)
  const endM = parseTime(dayEndTime)
  const currentM = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60
  if (currentM < startM || currentM >= endM) return -1
  return (currentM - startM) / SLOT_MINUTES
}

/**
 * Timestamp (ms) for the start of a slot on a given date.
 */
export function getSlotStartMs(dateKey: string, slot: Slot): number {
  const dayStart = startOfDay(dateKey)
  const ms = (slot.startMinutes * 60) * 1000
  return dayStart.getTime() + ms
}
