import { useMemo, useState, useCallback, useEffect } from 'react'
import { getSlotsForDay, type Slot } from '../lib/slots'
import { loadNote, saveNote } from '../lib/storage'

export function useSlots(
  dateKey: string,
  dayStartTime: string,
  dayEndTime: string
): Slot[] {
  return useMemo(
    () => getSlotsForDay(dateKey, dayStartTime, dayEndTime),
    [dateKey, dayStartTime, dayEndTime]
  )
}

export function useSlotNote(
  dateKey: string,
  slotIndex: number
): [string, (note: string) => void] {
  const [note, setNoteState] = useState(() => loadNote(dateKey, slotIndex))

  useEffect(() => {
    setNoteState(loadNote(dateKey, slotIndex))
  }, [dateKey, slotIndex])

  const setNote = useCallback(
    (value: string) => {
      saveNote(dateKey, slotIndex, value)
      setNoteState(value)
    },
    [dateKey, slotIndex]
  )

  return [note, setNote]
}
