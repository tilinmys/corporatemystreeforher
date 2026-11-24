import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useApp } from '../store/app'
import { FiBell, FiX } from './icons'

const AUTO_DISMISS_MS = 6000

/**
 * Push notification banner.
 *  - Phone (<1024px): top-centre banner under the status bar.
 *  - Desktop: top-right enterprise floating toast, max 380px wide.
 * Clicking the body navigates to the notification's targetScreen.
 */
export function NotificationToast() {
  const toast = useApp((s) => s.toast)
  const openNotification = useApp((s) => s.openNotification)
  const dismiss = useApp((s) => s.dismissToast)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(dismiss, AUTO_DISMISS_MS)
    return () => window.clearTimeout(t)
  }, [toast, dismiss])

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-3 top-safe z-[60] flex justify-center lg:inset-x-auto lg:top-20 lg:right-6 lg:justify-end"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            role="status"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-1 rounded-2xl border border-hairline bg-surface/95 p-1.5 shadow-[0_16px_40px_-16px_rgb(46_12_19/0.35)] backdrop-blur lg:w-[380px] lg:max-w-[380px]"
          >
            <button
              type="button"
              onClick={() => openNotification(toast.id)}
              className={cn(
                'flex min-w-0 flex-1 items-start gap-3 rounded-xl p-2 text-left hover:bg-porcelain transition-colors',
                focusRing,
              )}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-burgundy-50 text-burgundy">
                <FiBell className="size-4.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{toast.title}</span>
                <span className="block text-xs text-muted leading-relaxed mt-0.5">{toast.body}</span>
              </span>
            </button>
            <button
              type="button"
              aria-label="Dismiss notification"
              onClick={dismiss}
              className={cn(
                'grid size-11 shrink-0 place-items-center rounded-xl text-muted hover:bg-porcelain hover:text-ink lg:size-9 transition-colors',
                focusRing,
              )}
            >
              <FiX className="size-4" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
