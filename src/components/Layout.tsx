import { type ReactNode } from 'react'

type ViewMode = 'day' | 'week' | 'month'

interface LayoutProps {
  viewMode: ViewMode
  onViewChange: (v: ViewMode) => void
  onOpenSettings: () => void
  children: ReactNode
  title?: string
}

export function Layout({
  viewMode,
  onViewChange,
  onOpenSettings,
  children,
  title,
}: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <h1 className="header-title">{title ?? '15-Min Productivity'}</h1>
        <button
          type="button"
          className="btn-icon"
          onClick={onOpenSettings}
          aria-label="Settings"
        >
          ⚙
        </button>
      </header>
      <nav className="view-nav" aria-label="View mode">
        <button
          type="button"
          className={viewMode === 'day' ? 'active' : ''}
          onClick={() => onViewChange('day')}
        >
          Day
        </button>
        <button
          type="button"
          className={viewMode === 'week' ? 'active' : ''}
          onClick={() => onViewChange('week')}
        >
          Week
        </button>
        <button
          type="button"
          className={viewMode === 'month' ? 'active' : ''}
          onClick={() => onViewChange('month')}
        >
          Month
        </button>
      </nav>
      <main className="main">{children}</main>
    </div>
  )
}
