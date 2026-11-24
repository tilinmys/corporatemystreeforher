import { motion } from 'framer-motion'
import { ChevronLeft, Droplets, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const DAY_OPTIONS = [2, 3, 4, 5, 6, 7, 8, 9]

export function Screen03dPeriodLength() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const storedPeriodLength = useHerCorporateStore((s) => s.period_length)
  const setPeriodLength = useHerCorporateStore((s) => s.setPeriodLength)
  const setCycleSetupSkipped = useHerCorporateStore((s) => s.setCycleSetupSkipped)

  const [days, setDays] = useState<number>(storedPeriodLength || 5)

  const handleSkip = () => {
    setCycleSetupSkipped(true)
    setActiveScreen('04')
  }

  const handleNotSure = () => {
    setPeriodLength(5)
    setActiveScreen('03e')
  }

  const handleNext = () => {
    setPeriodLength(days)
    setActiveScreen('03e')
  }

  const flowInsight =
    days <= 2
      ? 'Light / short duration'
      : days <= 7
        ? 'Typical healthy flow (3–7 days)'
        : 'Extended duration — track comfortably'

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <header className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('03c')}
              aria-label="Back to Step 1"
              className={cn(
                'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#2A0E1A] active:scale-95 transition-all -ml-1',
                focusRing,
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <h1 className="font-display text-xs font-bold text-slate-900 tracking-tight">
              Step 2 of 3 · Cycle setup
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className={cn(
              'text-xs font-semibold text-slate-500 hover:text-[#2A0E1A] px-2 py-1 rounded-md transition-colors',
              focusRing,
            )}
          >
            Skip
          </button>
        </header>

        {/* 3-segment Progress Bar (Pink + Burgundy) */}
        <div className="grid grid-cols-3 gap-1.5 px-4 pb-2.5">
          <div className="h-1.5 rounded-full bg-[#2A0E1A]" />
          <div className="h-1.5 rounded-full bg-rose-500" />
          <div className="h-1.5 rounded-full bg-rose-100" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-4 flex flex-col justify-between space-y-4">
        
        {/* Heading */}
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug">
            How many days does your period usually last?
          </h2>
          <p className="text-xs text-slate-500">
            Tap a day or use the steppers to match your flow.
          </p>
        </div>

        {/* TACTILE PINK & WHITE HERO CARD */}
        <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFE4EC] p-5 shadow-xs space-y-5">
          
          {/* Stepper + Central Animated Number */}
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(2, d - 1))}
              disabled={days <= 2}
              aria-label="Decrease period days"
              className={cn(
                'grid size-11 place-items-center rounded-2xl border border-rose-200 bg-white text-[#2A0E1A] shadow-2xs hover:bg-rose-50 disabled:opacity-35 active:scale-95 transition-all',
                focusRing,
              )}
            >
              <Minus className="size-4.5" strokeWidth={2.2} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-semibold mb-1">
                <Droplets className="size-3 text-rose-600" />
                <span>Bleeding days</span>
              </div>
              <motion.div
                key={days}
                initial={{ scale: 0.88, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="flex items-baseline gap-1.5"
              >
                <span className="font-display text-5xl font-bold text-[#2A0E1A] tabular-nums">
                  {days}
                </span>
                <span className="text-sm font-semibold text-rose-800">days</span>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setDays((d) => Math.min(9, d + 1))}
              disabled={days >= 9}
              aria-label="Increase period days"
              className={cn(
                'grid size-11 place-items-center rounded-2xl border border-rose-200 bg-white text-[#2A0E1A] shadow-2xs hover:bg-rose-50 disabled:opacity-35 active:scale-95 transition-all',
                focusRing,
              )}
            >
              <Plus className="size-4.5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Interactive Visual Week Strip (Highlights days 1..N in pink) */}
          <div className="space-y-1.5">
            <div className="grid grid-cols-9 gap-1.5">
              {Array.from({ length: 9 }, (_, idx) => {
                const dayNum = idx + 1
                const isActive = dayNum <= days
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setDays(Math.max(2, dayNum))}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.92,
                        backgroundColor: isActive
                          ? dayNum <= 2
                            ? '#BE123C'
                            : dayNum <= 5
                              ? '#E11D48'
                              : '#FB7185'
                          : '#FFFFFF',
                      }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        'w-full h-9 rounded-xl border flex items-center justify-center text-[11px] font-bold tabular-nums transition-colors',
                        isActive
                          ? 'border-rose-400 text-white shadow-2xs'
                          : 'border-rose-100 text-slate-400 group-hover:border-rose-300',
                      )}
                    >
                      D{dayNum}
                    </motion.div>
                  </button>
                )
              })}
            </div>
            <p className="text-center text-[11px] font-semibold text-rose-900/80 pt-1">
              {flowInsight}
            </p>
          </div>
        </div>

        {/* Quick Preset Pills */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-slate-500 text-center">
            Quick select
          </p>
          <div className="flex items-center justify-center gap-1.5 flex-wrap">
            {DAY_OPTIONS.map((num) => {
              const isSelected = num === days
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={cn(
                    'h-9 min-w-[40px] px-3 rounded-xl text-xs font-bold tabular-nums transition-all active:scale-95',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-xs'
                      : 'bg-white border border-rose-200 text-slate-700 hover:bg-rose-50',
                    focusRing,
                  )}
                >
                  {num}
                </button>
              )
            })}
          </div>
        </div>

        {/* Not sure button */}
        <div className="text-center pb-1">
          <button
            type="button"
            onClick={handleNotSure}
            className="text-xs font-semibold text-rose-800 hover:text-[#2A0E1A] hover:underline"
          >
            Not sure? Start with 5 days →
          </button>
        </div>
      </div>

      {/* BOTTOM STICKY ACTION */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5]">
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            'flex h-11.5 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Next
        </button>
      </div>
    </div>
  )
}
