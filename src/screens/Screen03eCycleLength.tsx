import { motion } from 'framer-motion'
import { CalendarHeart, ChevronLeft, Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const CYCLE_PRESETS = [24, 26, 27, 28, 29, 30, 32, 34]

export function Screen03eCycleLength() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const storedCycleLength = useHerCorporateStore((s) => s.cycle_length)
  const storedPeriodLength = useHerCorporateStore((s) => s.period_length)
  const setCycleLength = useHerCorporateStore((s) => s.setCycleLength)
  const setCycleSetupSkipped = useHerCorporateStore((s) => s.setCycleSetupSkipped)

  const [days, setDays] = useState<number>(storedCycleLength || 28)

  const handleSkip = () => {
    setCycleSetupSkipped(true)
    setActiveScreen('04')
  }

  const handleNotSure = () => {
    setCycleLength(28)
    setActiveScreen('03f')
  }

  const handleNext = () => {
    setCycleLength(days)
    setActiveScreen('03f')
  }

  // Dynamic phase preview percentages based on chosen cycle length
  const periodDays = Math.min(storedPeriodLength || 5, Math.floor(days * 0.25))
  const ovulationDay = Math.max(periodDays + 3, days - 14)
  const fertileDays = 5
  const follicularDays = Math.max(2, ovulationDay - 2 - periodDays)
  const lutealDays = Math.max(8, days - (periodDays + follicularDays + fertileDays))

  const periodPct = (periodDays / days) * 100
  const follicularPct = (follicularDays / days) * 100
  const fertilePct = (fertileDays / days) * 100
  const lutealPct = (lutealDays / days) * 100

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <header className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('03d')}
              aria-label="Back to Step 2"
              className={cn(
                'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#2A0E1A] active:scale-95 transition-all -ml-1',
                focusRing,
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <h1 className="font-display text-xs font-bold text-slate-900 tracking-tight">
              Step 3 of 3 · Cycle setup
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

        {/* 3-segment Progress Bar (All 3 filled) */}
        <div className="grid grid-cols-3 gap-1.5 px-4 pb-2.5">
          <div className="h-1.5 rounded-full bg-[#2A0E1A]" />
          <div className="h-1.5 rounded-full bg-[#2A0E1A]" />
          <div className="h-1.5 rounded-full bg-rose-500" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-4 flex flex-col justify-between space-y-4">
        
        {/* Heading */}
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug">
            How long is your full cycle?
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Day 1 of one period to the day before your next.
          </p>
        </div>

        {/* MODERN INTERACTIVE CYCLE TIMELINE CARD */}
        <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFE4EC] p-5 shadow-xs space-y-5">
          
          {/* Interactive Stepper Readout */}
          <div className="flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(21, d - 1))}
              disabled={days <= 21}
              aria-label="Decrease cycle length"
              className={cn(
                'grid size-11 place-items-center rounded-2xl border border-rose-200 bg-white text-[#2A0E1A] shadow-2xs hover:bg-rose-50 disabled:opacity-35 active:scale-95 transition-all',
                focusRing,
              )}
            >
              <Minus className="size-4.5" strokeWidth={2.2} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-semibold mb-1">
                <CalendarHeart className="size-3 text-rose-600" />
                <span>Full cycle</span>
              </div>
              <motion.div
                key={days}
                initial={{ scale: 0.9, opacity: 0.7 }}
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
              onClick={() => setDays((d) => Math.min(38, d + 1))}
              disabled={days >= 38}
              aria-label="Increase cycle length"
              className={cn(
                'grid size-11 place-items-center rounded-2xl border border-rose-200 bg-white text-[#2A0E1A] shadow-2xs hover:bg-rose-50 disabled:opacity-35 active:scale-95 transition-all',
                focusRing,
              )}
            >
              <Plus className="size-4.5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Live Dynamic Phase Bar */}
          <div className="space-y-2.5 bg-white/90 rounded-2xl p-3 border border-rose-100">
            <div className="flex items-center justify-between text-[11px] font-semibold">
              <span className="text-slate-600">Live cycle map</span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 tabular-nums">
                Ovulation ~ Day {ovulationDay}
              </span>
            </div>

            <div className="h-3.5 w-full rounded-full overflow-hidden flex gap-0.5 bg-slate-100 p-0.5">
              <motion.div
                layout
                style={{ width: `${periodPct}%` }}
                className="h-full rounded-l-full bg-[#9F1239]"
                title="Period"
              />
              <motion.div
                layout
                style={{ width: `${follicularPct}%` }}
                className="h-full bg-rose-200"
                title="Follicular"
              />
              <motion.div
                layout
                style={{ width: `${fertilePct}%` }}
                className="h-full bg-pink-500"
                title="Ovulatory window"
              />
              <motion.div
                layout
                style={{ width: `${lutealPct}%` }}
                className="h-full rounded-r-full bg-rose-100"
                title="Luteal"
              />
            </div>

            <div className="grid grid-cols-4 gap-1 text-[10px] font-medium text-slate-600 pt-0.5">
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-[#9F1239]" /> Period
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-rose-200" /> Follicular
              </span>
              <span className="flex items-center gap-1 font-semibold text-pink-700">
                <span className="size-2 rounded-full bg-pink-500" /> Ovulation
              </span>
              <span className="flex items-center gap-1">
                <span className="size-2 rounded-full bg-rose-100 border border-rose-200" /> Luteal
              </span>
            </div>
          </div>
        </div>

        {/* Range Slider + Preset Chips */}
        <div className="space-y-3 bg-white rounded-2xl p-3.5 border border-rose-100 shadow-2xs">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
            <span>21 days</span>
            <span className="text-rose-800">Slide or pick preset</span>
            <span>38 days</span>
          </div>
          <input
            type="range"
            min={21}
            max={38}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            aria-label="Cycle length slider"
            className="w-full accent-rose-600 cursor-pointer h-1.5 bg-rose-100 rounded-lg"
          />
          <div className="flex items-center justify-between gap-1 pt-0.5 overflow-x-auto scrollbar-none">
            {CYCLE_PRESETS.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setDays(num)}
                className={cn(
                  'h-8 px-2.5 rounded-lg text-xs font-bold tabular-nums transition-all shrink-0',
                  days === num
                    ? 'bg-[#2A0E1A] text-white shadow-2xs'
                    : 'bg-rose-50/70 text-slate-700 hover:bg-rose-100',
                  focusRing,
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Not sure button */}
        <div className="text-center pb-1">
          <button
            type="button"
            onClick={handleNotSure}
            className="text-xs font-semibold text-rose-800 hover:text-[#2A0E1A] hover:underline"
          >
            Not sure? Use standard 28 days →
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
          See my prediction
        </button>
      </div>
    </div>
  )
}
