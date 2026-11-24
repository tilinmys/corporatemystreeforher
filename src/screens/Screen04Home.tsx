import {
  Activity,
  Bell,
  FileText,
  FlaskConical,
  Stethoscope,
} from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'
import { computeCycleMetrics } from '../utils/cycleMath'

export function Screen04Home() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const periodLength = useHerCorporateStore((s) => s.period_length)
  const cycleLength = useHerCorporateStore((s) => s.cycle_length)

  const companyName = employeeLink?.company || 'Acme Tech'
  const metrics = computeCycleMetrics(lastPeriodStart, periodLength, cycleLength)

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        User avatar 'P' + "Hi, Priya" + "Her · Acme Tech linked" + Bell icon
        Matching exact Wireframe 04
      */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center font-display text-sm font-bold text-slate-800">
            P
          </div>
          <div>
            <h1 className="font-display text-sm font-bold text-slate-900 leading-tight">
              Hi, Priya
            </h1>
            <p className="text-[11px] text-slate-500">
              Her · {companyName} linked
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveScreen('16')}
          aria-label="Notifications"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all relative',
            focusRing,
          )}
        >
          <Bell className="size-4.5" strokeWidth={1.5} />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-600 ring-2 ring-white" />
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        {/* 
          CARD 1: EXISTING HER CYCLE TRACKER
          Day 14 circle + "Ovulation window" + "Log" button
        */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-slate-100 border border-slate-200 flex flex-col items-center justify-center font-display text-xs font-bold text-slate-800 shrink-0">
              <span>Day {metrics.cycleDay}</span>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Existing Her Cycle Tracker
              </p>
              <h2 className="font-display text-sm font-bold text-slate-900 leading-tight">
                {metrics.phaseLabel}
              </h2>
              <p className="text-[11px] text-slate-500">
                Next period in {metrics.daysUntilNextPeriod} days
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('03c')}
            className={cn(
              'h-8 px-3 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-2xs',
              focusRing,
            )}
          >
            Log
          </button>
        </div>

        {/* 
          SECTION 2: CORPORATE CARE
          Header with Company pill + Benefits ledger + 2x2 Bento grid
        */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-slate-900">
              Corporate care
            </h2>
            <button
              type="button"
              onClick={() => setActiveScreen('03b')}
              className="text-[11px] font-semibold text-slate-700 bg-white border border-slate-300 rounded-md px-2 py-0.5 shadow-2xs hover:border-slate-400"
            >
              {companyName}
            </button>
          </div>

          {/* Benefits Ledger Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-2xs">
            <div className="grid grid-cols-3 text-center divide-x divide-slate-100">
              <div className="px-1">
                <span className="font-display text-base font-bold text-slate-900 tabular-nums">
                  3 / 4
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Free consults</p>
              </div>
              <div className="px-1">
                <span className="font-display text-base font-bold text-slate-900 tabular-nums">
                  1 / 1
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Health check</p>
              </div>
              <div className="px-1">
                <span className="font-display text-base font-bold text-slate-900 tabular-nums">
                  ₹2,000
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">Test wallet</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 text-center pt-2 border-t border-slate-100">
              Valid till 31 Mar 2027
            </p>
          </div>

          {/* 
            2x2 ACTION GRID:
            - Book consultation -> 05
            - Book blood test -> 13
            - My prescriptions -> 12
            - My reports -> 15
          */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveScreen('05')}
              className={cn(
                'h-13 rounded-2xl border border-slate-200 bg-white p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-600 hover:shadow-xs transition-all active:scale-[0.98] text-left group',
                focusRing,
              )}
            >
              <div className="size-8 rounded-xl bg-rose-50 text-rose-950 flex items-center justify-center shrink-0 border border-rose-200 group-hover:scale-105 transition-transform">
                <Stethoscope className="size-4" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-slate-900 group-hover:text-[#2A0E1A] truncate">
                Book consultation
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen('13')}
              className={cn(
                'h-13 rounded-2xl border border-slate-200 bg-white p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-600 hover:shadow-xs transition-all active:scale-[0.98] text-left group',
                focusRing,
              )}
            >
              <div className="size-8 rounded-xl bg-rose-50 text-rose-900 flex items-center justify-center shrink-0 border border-rose-200 group-hover:scale-105 transition-transform">
                <FlaskConical className="size-4" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-slate-900 group-hover:text-[#2A0E1A] truncate">
                Book blood test
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen('12')}
              className={cn(
                'h-13 rounded-2xl border border-slate-200 bg-white p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-600 hover:shadow-xs transition-all active:scale-[0.98] text-left group',
                focusRing,
              )}
            >
              <div className="size-8 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 border border-blue-200 group-hover:scale-105 transition-transform">
                <FileText className="size-4" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-slate-900 group-hover:text-[#2A0E1A] truncate">
                My prescriptions
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen('15')}
              className={cn(
                'h-13 rounded-2xl border border-slate-200 bg-white p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-600 hover:shadow-xs transition-all active:scale-[0.98] text-left group',
                focusRing,
              )}
            >
              <div className="size-8 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center shrink-0 border border-emerald-200 group-hover:scale-105 transition-transform">
                <Activity className="size-4" strokeWidth={1.5} />
              </div>
              <span className="text-xs font-semibold text-slate-900 group-hover:text-[#2A0E1A] truncate">
                My reports
              </span>
            </button>
          </div>
        </div>

        {/* 
          CARD 3: UPCOMING CONSULTATION
          Dr. Ananya Rao + "Join call" button
        */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs">
          <p className="text-[11px] font-semibold text-slate-500">
            Upcoming consultation
          </p>

          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-rose-50 border border-rose-200 text-rose-950 font-bold text-xs flex items-center justify-center shrink-0">
              Dr
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-slate-900 leading-tight">
                Dr. Ananya Rao
              </h3>
              <p className="text-[11px] text-slate-500">
                Gynaecologist · Video · Today, 4:30 PM
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('09')}
            className={cn(
              'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
              focusRing,
            )}
          >
            Join call
          </button>
        </div>

      </div>

      {/* 
        BOTTOM DOCKED TAB BAR:
        Today (active) · Calendar · Care · Profile
        Matching exact Wireframe 04
      */}
      <nav className="sticky bottom-0 z-30 flex items-center justify-around h-14 bg-white/95 backdrop-blur-md border-t border-[#E8DFDC] px-2 shrink-0">
        <button
          type="button"
          onClick={() => setActiveScreen('04')}
          className="flex flex-col items-center gap-1 text-[#2A0E1A] font-bold text-[10px]"
        >
          <span className="size-2 rounded-full bg-[#2A0E1A]" />
          <span>Today</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('05')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 font-medium text-[10px] transition-colors"
        >
          <span className="size-2 rounded-full bg-slate-300" />
          <span>Calendar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('15')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 font-medium text-[10px] transition-colors"
        >
          <span className="size-2 rounded-full bg-slate-300" />
          <span>Care</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('03b')}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 font-medium text-[10px] transition-colors"
        >
          <span className="size-2 rounded-full bg-slate-300" />
          <span>Profile</span>
        </button>
      </nav>

    </div>
  )
}
