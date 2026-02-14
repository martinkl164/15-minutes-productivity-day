import { useState, useEffect } from 'react'

/**
 * Browser/client locale for date and time formatting.
 */
export function useLocale(): string {
  const [locale, setLocale] = useState(() => navigator.language || 'en')

  useEffect(() => {
    const onLangChange = () => setLocale(navigator.language || 'en')
    navigator.language && setLocale(navigator.language)
    window.addEventListener('languagechange', onLangChange)
    return () => window.removeEventListener('languagechange', onLangChange)
  }, [])

  return locale
}
