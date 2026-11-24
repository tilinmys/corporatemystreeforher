import type { ReactNode } from 'react'
import { cn, focusRing } from '../lib/cn'
import { FiCheck } from './icons'

export function PrimaryButton({
  children,
  disabled,
  onClick,
  variant = 'solid',
  className,
  type = 'button',
}: {
  children: ReactNode
  disabled?: boolean
  onClick?: () => void
  variant?: 'solid' | 'light' | 'outline' | 'danger'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all disabled:cursor-not-allowed',
        variant === 'solid' && 'bg-burgundy text-white hover:bg-burgundy-700 disabled:bg-burgundy-200 shadow-sm active:scale-[0.99]',
        variant === 'light' && 'bg-white text-burgundy hover:bg-burgundy-50 border border-white/20 active:scale-[0.99]',
        variant === 'outline' && 'border border-hairline bg-surface text-ink hover:border-burgundy/40 hover:bg-porcelain/50',
        variant === 'danger' && 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:scale-[0.99]',
        focusRing,
        className,
      )}
    >
      {children}
    </button>
  )
}

/** 44px-tall slot buttons; 3 columns in narrow containers, 4 from @md. */
export function SlotMatrix({
  slots,
  selected,
  onSelect,
}: {
  slots: { time: string; available: boolean }[]
  selected?: string
  onSelect: (time: string) => void
}) {
  return (
    <div className="@container">
      <div role="group" aria-label="Available time slots" className="grid grid-cols-3 gap-2 @md:grid-cols-4">
        {slots.map(({ time, available }) => {
          const isSelected = time === selected
          return (
            <button
              key={time}
              type="button"
              disabled={!available}
              aria-pressed={isSelected}
              onClick={() => onSelect(time)}
              className={cn(
                'flex h-11 items-center justify-center gap-1.5 rounded-xl border text-sm font-medium tabular-nums transition-colors',
                isSelected
                  ? 'border-burgundy bg-burgundy text-white font-semibold shadow-sm'
                  : 'border-hairline bg-surface hover:border-burgundy/40 hover:bg-burgundy-50 text-ink',
                'disabled:cursor-not-allowed disabled:border-dashed disabled:bg-porcelain disabled:text-muted/40 disabled:line-through',
                focusRing,
              )}
            >
              {isSelected && <FiCheck className="size-3.5" aria-hidden />}
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Primary action. Below lg it pins above the bottom tab bar (with a spacer so
 * content isn't covered); on desktop it sits inline in the sticky rail.
 */
export function StickyCTA({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="h-20 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-tabbar z-30 border-t border-hairline bg-surface/95 px-4 py-3 backdrop-blur sm:px-6 lg:static lg:z-auto lg:border-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
        <div className="mx-auto max-w-xl lg:max-w-none">{children}</div>
      </div>
    </>
  )
}
