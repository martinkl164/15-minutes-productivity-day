import { useState, useEffect, useCallback } from 'react'
import { loadSettings, saveSettings, type Settings } from '../lib/storage'

export function useSettings(): [Settings, (s: Settings) => void] {
  const [settings, setSettingsState] = useState<Settings>(() => loadSettings())

  useEffect(() => {
    setSettingsState(loadSettings())
  }, [])

  const setSettings = useCallback((next: Settings) => {
    saveSettings(next)
    setSettingsState(next)
  }, [])

  return [settings, setSettings]
}
