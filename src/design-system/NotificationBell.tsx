import { formatDistanceToNowStrict } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useApp } from '../store/app'
import { FiBell, FiChevronRight } from './icons'

export function NotificationBell() {
  const notifications = useApp((s) => s.notifications)
  const openNotification = useApp((s) => s.openNotification)
  const markAllRead = useApp((s) => s.markAllRead)
  const setScreen = useApp((s) => s.setScreen)
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const unread = notifications.filter((n) => !n.read).length

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={unread ? `Notifications, ${unread} unread` : 'Notifications'}
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'relative grid size-11 place-items-center rounded-xl text-ink/80 transition-colors hover:bg-porcelain hover:text-ink lg:size-10',
          focusRing,
        )}
      >
        <FiBell className="size-5" aria-hidden />
        {unread > 0 && (
          <span
            className="absolute top-2.5 right-2.5 size-2.5 rounded-full bg-burgundy ring-2 ring-surface animate-pulse"
            aria-hidden
          />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="fixed inset-x-3 top-[calc(var(--header-h)+env(safe-area-inset-top)+0.5rem)] z-50 overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl lg:absolute lg:inset-x-auto lg:top-full lg:right-0 lg:mt-2 lg:w-[380px]"
        >
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3 bg-porcelain/50">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">Notifications</p>
              {unread > 0 && (
                <span className="rounded-full bg-burgundy-50 px-2 py-0.5 text-[11px] font-semibold text-burgundy">
                  {unread} new
                </span>
              )}
            </div>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className={cn('rounded-lg px-2 text-xs font-medium text-burgundy hover:underline', focusRing)}
              >
                Mark all read
              </button>
            )}
          </div>
          <ul className="max-h-[60dvh] divide-y divide-hairline overflow-y-auto">
            {notifications.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => {
                    openNotification(n.id)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full gap-3 px-4 py-3 text-left transition-colors hover:bg-porcelain/70',
                    !n.read && 'bg-burgundy-50/15',
                    focusRing,
                    'focus-visible:ring-inset focus-visible:ring-offset-0',
                  )}
                >
                  <span
                    className={cn(
                      'mt-1.5 size-2 shrink-0 rounded-full',
                      n.read ? 'bg-transparent' : 'bg-burgundy ring-2 ring-burgundy/20',
                    )}
                    aria-hidden
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">{n.title}</span>
                    <span className="block text-xs text-muted leading-relaxed mt-0.5">{n.body}</span>
                    <span className="mt-1 block text-[11px] text-muted/70">
                      {formatDistanceToNowStrict(n.at, { addSuffix: true })}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-hairline p-2.5 bg-porcelain/30">
            <button
              type="button"
              onClick={() => {
                setScreen('notifications')
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold text-burgundy hover:bg-burgundy-50 transition-colors',
                focusRing,
              )}
            >
              Open Full Notifications Inbox (Screen 16) <FiChevronRight className="size-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
