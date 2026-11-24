import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const LONG_PRESS_MS = 1500

interface HerLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero'
  animated?: boolean
  className?: string
  showText?: boolean
}

export function HerLogo({
  size = 'md',
  animated = true,
  className,
  showText = false,
}: HerLogoProps) {
  const resetDemo = useHerCorporateStore((s) => s.resetDemo)
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const timer = useRef<number | undefined>(undefined)
  const fired = useRef(false)
  const [pressing, setPressing] = useState(false)

  const sizeClasses = {
    sm: 'size-8',
    md: 'size-11',
    lg: 'size-16',
    hero: 'size-24 sm:size-28',
  }[size]

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const start = (e: PointerEvent) => {
    if (e.button !== 0) return
    fired.current = false
    setPressing(true)
    timer.current = window.setTimeout(() => {
      fired.current = true
      setPressing(false)
      navigator.vibrate?.(30)
      resetDemo()
    }, LONG_PRESS_MS)
  }

  const cancel = () => {
    window.clearTimeout(timer.current)
    setPressing(false)
  }

  const onClick = (e: MouseEvent) => {
    if (fired.current) {
      fired.current = false
      return
    }
    if (e.shiftKey) {
      resetDemo()
    } else {
      setActiveScreen('04')
    }
  }

  return (
    <div className={cn('inline-flex flex-col items-center select-none', className)}>
      <button
        type="button"
        onPointerDown={start}
        onPointerUp={cancel}
        onPointerLeave={cancel}
        onPointerCancel={cancel}
        onContextMenu={(e) => e.preventDefault()}
        onClick={onClick}
        aria-label="Her Logo, go to Home"
        title="Her · Shift+Click or hold 1.5s to reset demo"
        className={cn(
          'group relative rounded-full touch-manipulation transition-all duration-300 focus:outline-hidden',
          sizeClasses,
          animated && 'hover:scale-105 active:scale-95',
          focusRing,
        )}
      >
        {/* Ambient Animated Glow Aura */}
        {animated && (
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#820C1C]/40 to-rose-400/20 blur-md opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" />
        )}

        {/* The Official Crimson Her Logo Circle */}
        <div className="relative size-full rounded-full overflow-hidden bg-[#80000D] shadow-[0_8px_24px_-4px_rgba(128,0,13,0.5)] border border-white/30 flex items-center justify-center">
          {/* Official Clean Circular Emblem */}
          <img
            src="/her-logo.png"
            alt="Her"
            className="size-full object-contain rounded-full select-none"
          />
        </div>

        {/* Press progress indicator */}
        <span
          aria-hidden
          className={cn(
            'absolute -bottom-1 left-1/4 right-1/4 h-0.5 scale-x-0 rounded-full bg-rose-500',
            pressing && 'scale-x-100 transition-transform duration-[1500ms] ease-linear',
          )}
        />
      </button>

      {showText && (
        <span className="mt-2 font-display text-2xl font-bold tracking-tight text-slate-900">
          Her
        </span>
      )}
    </div>
  )
}
