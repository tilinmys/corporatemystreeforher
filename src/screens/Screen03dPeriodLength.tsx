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

  const handleNext = () => {
    setPeriodLength(days)
    setActiveScreen('03e')
  }

  const flowInsight =
    days <= 2 ? 'Short duration' : days <= 7 ? 'Typical range (3–7 days)' : 'Extended duration'

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shrink-0">
        <header className="flex items-center justify-between h-11.5 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('03c')}
              aria-label="Back to Step 1"
              className={cn(
                'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-purple-50 hover:text-[#3B0764] active:scale-95 transition-all -ml-1',
                focusRing,
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <h1 className="font-display text-xs font-bold text-slate-900 tracking-tight">
              Step 2 of 3
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className={cn(
              'text-xs font-semibold text-slate-500 hover:text-[#3B0764] px-2 py-1 rounded-md transition-colors',
              focusRing,
            )}
          >
            Skip
          </button>
        </header>

        <div className="grid grid-cols-3 gap-1.5 px-4 pb-2">
          <div className="h-1.5 rounded-full bg-[#4C1D95]" />
          <div className="h-1.5 rounded-full bg-rose-500" />
          <div className="h-1.5 rounded-full bg-purple-100" />
        </div>
      </div>

      {/* MAIN CONTENT — ZERO SCROLL */}
      <div className="flex-1 px-4 py-3 flex flex-col justify-between gap-3">
        
        <div className="space-y-0.5">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug">
            Period length
          </h2>
          <p className="text-xs text-slate-500">
            How many days does bleeding last?
          </p>
        </div>

        {/* PINK & PURPLE TACTILE CARD */}
        <div className="rounded-3xl border-2 border-rose-200 bg-gradient-to-br from-[#FFF0F5] via-white to-[#F3E8FF] p-4 shadow-2xs space-y-4">
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(2, d - 1))}
              disabled={days <= 2}
              aria-label="Decrease period days"
              className={cn(
                'grid size-11 place-items-center rounded-2xl border border-purple-200 bg-white text-[#4C1D95] shadow-2xs hover:bg-purple-50 disabled:opacity-35 active:scale-95 transition-all',
                focusRing,
              )}
            >
              <Minus className="size-4.5" strokeWidth={2.2} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold mb-1">
                <Droplets className="size-3 text-rose-600" />
                <span>{flowInsight}</span>
              </div>
              <motion.div
                key={days}
                initial={{ scale: 0.88, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                className="flex items-baseline gap-1.5"
              >
                <span className="font-display text-5xl font-bold text-[#3B0764] tabular-nums">
                  {days}
                </span>
                <span className="text-sm font-semibold text-rose-700">days</span>
              </motion.div>
            </div>

            <button
              type="button"
              onClick={() => setDays((d) => Math.min(9, d + 1))}
              disabled={days >= 9}
              aria-label="Increase period days"
              className={cn(
                'grid size-11 place-items-center rounded-2xl border border-purple-200 bg-white text-[#4C1D95] shadow-2xs hover:bg-purple-50 disabled:opacity-35 active:scale-95 transition-all',
                focusRing,
              )}
            >
              <Plus className="size-4.5" strokeWidth={2.2} />
            </button>
          </div>

          {/* 9-Day Visual Flow Bar */}
          <div className="grid grid-cols-9 gap-1">
            {Array.from({ length: 9 }, (_, idx) => {
              const dayNum = idx + 1
              const isActive = dayNum <= days
              return (
                <button
                  key={dayNum}
                  type="button"
                  onClick={() => setDays(Math.max(2, dayNum))}
                  className="group"
                >
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.94,
                      backgroundColor: isActive
                        ? dayNum <= 2
                          ? '#9F1239'
                          : dayNum <= 5
                            ? '#E11D48'
                            : '#FB7185'
                        : '#FFFFFF',
                    }}
                    transition={{ duration: 0.18 }}
                    className={cn(
                      'w-full h-8.5 rounded-lg border flex items-center justify-center text-[10px] font-bold tabular-nums',
                      isActive
                        ? 'border-rose-400 text-white shadow-2xs'
                        : 'border-purple-100 text-slate-400 group-hover:border-rose-300',
                    )}
                  >
                    D{dayNum}
                  </motion.div>
                </button>
              )
            })}
          </div>
        </div>

        {/* SYMMETRIC 4x2 QUICK SELECT GRID (Zero Orphan 9!) */}
        <div className="rounded-2xl border border-purple-200 bg-white p-3 space-y-2 shadow-2xs">
          <p className="text-[11px] font-bold text-purple-900 uppercase tracking-wider text-center">
            Quick select
          </p>
          <div className="grid grid-cols-4 gap-2">
            {DAY_OPTIONS.map((num) => {
              const isSelected = num === days
              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={cn(
                    'h-10 rounded-xl text-xs font-bold tabular-nums transition-all active:scale-95',
                    isSelected
                      ? 'bg-[#4C1D95] text-white shadow-xs'
                      : 'bg-rose-50/70 border border-rose-200/80 text-slate-800 hover:bg-rose-100',
                    focusRing,
                  )}
                >
                  {num} days
                </button>
              )
            })}
          </div>
        </div>

      </div>

      {/* BOTTOM ACTION */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] shrink-0">
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            'flex h-11.5 w-full items-center justify-center rounded-xl bg-[#4C1D95] hover:bg-[#3B0764] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Next
        </button>
      </div>
    </div>
  )
}
