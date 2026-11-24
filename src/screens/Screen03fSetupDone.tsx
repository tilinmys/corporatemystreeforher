import { ArrowRight } from 'lucide-react'
import { useMemo } from 'react'
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

  // Call computeCycleMetrics using live store values
  const metrics = useMemo(() => {
    return computeCycleMetrics(lastPeriodStart, periodLength, cycleLength)
  }, [lastPeriodStart, periodLength, cycleLength])

  // SVG Geometry for Cycle Ring
  const radius = 64
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (metrics.cycleDay / metrics.cycleLength) * circumference

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        MAIN SCROLLABLE BODY:
        - Heading: "You're all set, Priya"
        - Sub: "Here's your first prediction"
        - Cycle Ring Widget
        - Prediction Ledger Card
        - Sub-caption
        - Covered Gynaecologist Card
        Matching exact Wireframe 03f
      */}
      <div className="flex-1 px-4 py-5 space-y-4">
        
        {/* Editorial Heading */}
        <div className="text-center space-y-1 pt-1">
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900">
            You're all set, Priya
          </h1>
          <p className="text-xs text-slate-500">
            Here's your first prediction
          </p>
        </div>

        {/* 
          CYCLE RING WIDGET:
          Circular progress ring with Day count in center
          Matching exact wireframe:
          "Day 15"
          "of 28"
        */}
        <div className="py-2 flex items-center justify-center">
          <div className="relative size-44 flex items-center justify-center">
            <svg viewBox="0 0 160 160" className="size-full -rotate-90">
              {/* Background Ring */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#E8DFDC"
                strokeWidth="10"
                fill="none"
              />

              {/* Progress Arc in rich plum/burgundy */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="#2A0E1A"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Day & Total */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-display text-2xl font-bold text-slate-900 tabular-nums">
                Day {metrics.cycleDay}
              </span>
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                of {metrics.cycleLength}
              </span>
              <span className="mt-1 text-[10px] font-semibold text-rose-950 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {metrics.phaseLabel}
              </span>
            </div>
          </div>
        </div>

        {/* 
          PREDICTION CARD:
          - Next period
          - Fertile window
          - Period length
          Matching exact wireframe layout
        */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-2xs text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Next period</span>
            <span className="font-bold text-slate-900 tabular-nums">
              ~ {metrics.nextPeriodFormatted} (in {metrics.daysUntilNextPeriod} days)
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Fertile window</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {metrics.fertileWindowFormatted}
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Period length</span>
            <span className="font-bold text-slate-900 tabular-nums">
              {metrics.periodLength} days
            </span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-[11px] text-slate-400">
          Predictions get better each time you log a period.
        </p>

        {/* 
          COVERED BY EMPLOYER CONSULT PROMO CARD:
          Tag: COVERED BY ACME TECH
          Text: Questions about your cycle? Talk to a gynaecologist for free ->
        */}
        <button
          type="button"
          onClick={() => setActiveScreen('05')}
          className={cn(
            'w-full text-left rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50/80 to-rose-50/50 p-3.5 shadow-2xs hover:border-rose-400 hover:shadow-xs transition-all active:scale-[0.99] group',
            focusRing,
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-wider text-rose-950 uppercase">
              Covered by {companyName}
            </span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              ₹0 Copay
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-900 group-hover:text-[#2A0E1A] flex items-center justify-between">
            <span>Questions about your cycle? Talk to a gynaecologist for free</span>
            <ArrowRight className="size-3.5 text-rose-900 shrink-0 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </p>
        </button>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Go to Home" button docked at bottom
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5]">
        <button
          type="button"
          onClick={() => setActiveScreen('04')}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Go to Home
        </button>
      </div>

    </div>
  )
}
