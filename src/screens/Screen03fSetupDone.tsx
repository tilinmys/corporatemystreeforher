import { ArrowRight, CalendarDays, Edit3 } from 'lucide-react'
import { useMemo } from 'react'
import { BottomNav } from '../design-system/BottomNav'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'
import { computeCycleMetrics } from '../utils/cycleMath'

export function Screen03fSetupDone() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const periodLength = useHerCorporateStore((s) => s.period_length)
  const cycleLength = useHerCorporateStore((s) => s.cycle_length)

  const companyName = employeeLink?.company || 'Acme Tech'

  const metrics = useMemo(() => {
    return computeCycleMetrics(lastPeriodStart, periodLength, cycleLength)
  }, [lastPeriodStart, periodLength, cycleLength])

  const radius = 64
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (metrics.cycleDay / metrics.cycleLength) * circumference

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* MAIN BODY */}
      <div className="flex-1 px-4 py-4 space-y-3.5">
        
        {/* Top Row: Heading + 1-tap Edit */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-slate-900">
              Your cycle overview
            </h1>
            <p className="text-xs text-slate-500">
              Live predictions for Priya
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveScreen('03c')}
            className={cn(
              'inline-flex items-center gap-1 h-8 px-3 rounded-full bg-rose-50 border border-rose-200 text-[11px] font-semibold text-rose-900 hover:bg-rose-100 transition-colors',
              focusRing,
            )}
          >
            <Edit3 className="size-3" />
            <span>Edit dates</span>
          </button>
        </div>

        {/* PINK & WHITE CYCLE RING CARD */}
        <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-br from-[#FFF0F5] via-white to-[#FFE4EC] p-4 shadow-xs flex flex-col items-center">
          <div className="relative size-42 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="size-full -rotate-90">
              <defs>
                <linearGradient id="herPinkRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E11D48" />
                  <stop offset="100%" stopColor="#881337" />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#FCE7F3"
                strokeWidth="11"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#herPinkRing)"
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-2xl font-bold text-[#2A0E1A] tabular-nums">
                Day {metrics.cycleDay}
              </span>
              <span className="text-[11px] text-rose-800/80 font-medium tabular-nums">
                of {metrics.cycleLength} days
              </span>
              <span className="mt-1.5 text-[10px] font-bold text-rose-900 bg-rose-100 px-2.5 py-0.5 rounded-full border border-rose-200">
                {metrics.phaseLabel}
              </span>
            </div>
          </div>
        </div>

        {/* PREDICTION GRID (Pink & White separated rows) */}
        <div className="rounded-2xl border border-rose-100 bg-white p-3.5 space-y-2.5 shadow-2xs text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-rose-500" /> Next period
            </span>
            <span className="font-bold text-slate-900 tabular-nums">
              {metrics.nextPeriodFormatted} · {metrics.daysUntilNextPeriod}d left
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-rose-50 pt-2">
            <span className="text-slate-500">Ovulatory window</span>
            <span className="font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md tabular-nums">
              {metrics.fertileWindowFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-rose-50 pt-2">
            <span className="text-slate-500">Period length</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {metrics.periodLength} days
            </span>
          </div>
        </div>

        {/* COVERED BY EMPLOYER CONSULT CARD */}
        <button
          type="button"
          onClick={() => setActiveScreen('05')}
          className={cn(
            'w-full text-left rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#FFF0F5] to-white p-3.5 shadow-2xs hover:border-rose-400 transition-all active:scale-[0.99] group',
            focusRing,
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-rose-900 uppercase">
              {employeeLink ? `Covered by ${companyName}` : 'Her Specialist Care'}
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              {employeeLink ? '₹0 Copay' : 'Book now'}
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-900 flex items-center justify-between">
            <span>Questions about your cycle? Talk to a doctor</span>
            <ArrowRight className="size-3.5 text-rose-700 shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </button>

      </div>

      {/* SHARED DOCKED BOTTOM NAVBAR */}
      <BottomNav active="calendar" />
    </div>
  )
}
