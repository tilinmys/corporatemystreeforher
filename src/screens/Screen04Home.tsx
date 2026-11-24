import {
  Activity,
  ArrowRight,
  Bell,
  Building2,
  Droplets,
  FileText,
  FlaskConical,
  Stethoscope,
  Video,
} from 'lucide-react'
import { BottomNav } from '../design-system/BottomNav'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'
import { computeCycleMetrics } from '../utils/cycleMath'

export function Screen04Home() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const periodLength = useHerCorporateStore((s) => s.period_length)
  const cycleLength = useHerCorporateStore((s) => s.cycle_length)
  const confirmedBooking = useHerCorporateStore((s) => s.confirmedBooking)
  const user = useHerCorporateStore((s) => s.user)

  const metrics = computeCycleMetrics(lastPeriodStart, periodLength, cycleLength)
  const isOvulatory =
    metrics.phaseLabel.toLowerCase().includes('ovul') ||
    metrics.phaseLabel.toLowerCase().includes('fertile')

  const upcomingDoctor =
    PANEL_DOCTORS.find((d) => d.id === confirmedBooking?.doctorId) ?? PANEL_DOCTORS[0]

  const firstName = user.name.split(' ')[0] || 'Priya'
  const showCorpCard = Boolean(employeeLink && employeeLink.showCorporateCareOnHome)

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-13 px-4 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveScreen('03b')}
            className="size-9 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 border border-rose-300/60 flex items-center justify-center font-display text-sm font-bold text-[#2A0E1A] shadow-2xs"
          >
            {user.avatar}
          </button>
          <div>
            <h1 className="font-display text-sm font-bold text-slate-900 leading-tight">
              Hi, {firstName}
            </h1>
            <p className="text-[11px] font-medium text-rose-800/80">
              {employeeLink ? `Her · ${employeeLink.company} linked` : 'Her · Personal space'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveScreen('16')}
          aria-label="Notifications"
          className={cn(
            'grid size-8.5 place-items-center rounded-xl bg-rose-50/70 text-rose-900 hover:bg-rose-100 active:scale-95 transition-all relative',
            focusRing,
          )}
        >
          <Bell className="size-4" strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-600 ring-2 ring-white" />
        </button>
      </header>

      {/* MAIN CONTENT BODY */}
      <div className="flex-1 px-4 py-3 space-y-3">
        
        {/* CARD 1: OVULATORY WINDOW / CYCLE TRACKER (Rich Pink & White Grid Card) */}
        <div className="rounded-3xl border border-rose-200/90 bg-gradient-to-br from-[#FFE4EC] via-[#FFF4F7] to-white p-3.5 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Glowing Pink Day Badge */}
              <div className="size-13 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-600 to-[#881337] text-white flex flex-col items-center justify-center shadow-sm shrink-0 border border-rose-300/40">
                <span className="text-[9px] font-semibold uppercase tracking-wider opacity-90 leading-none">
                  Day
                </span>
                <span className="font-display text-lg font-bold leading-tight tabular-nums">
                  {metrics.cycleDay}
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700">
                  <Droplets className="size-3 text-rose-500" />
                  {isOvulatory ? 'Peak Fertility' : 'Cycle Tracker'}
                </span>
                <h2 className="font-display text-base font-bold text-[#2A0E1A] leading-tight">
                  {metrics.phaseLabel}
                </h2>
                <p className="text-[11px] font-medium text-rose-900/75">
                  Next period in {metrics.daysUntilNextPeriod} days
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveScreen('03c')}
              className={cn(
                'h-8 px-3.5 rounded-full bg-white border border-rose-200 text-xs font-bold text-[#2A0E1A] hover:bg-rose-50 active:scale-95 transition-all shadow-2xs shrink-0',
                focusRing,
              )}
            >
              Log
            </button>
          </div>

          {/* Pink Mini Phase Bar inside Card */}
          <div className="grid grid-cols-7 gap-1 pt-0.5">
            {Array.from({ length: 7 }, (_, i) => {
              const offsetDay = metrics.cycleDay - 3 + i
              const isToday = i === 3
              const isFertileZone = offsetDay >= 11 && offsetDay <= 16
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveScreen('03f')}
                  className={cn(
                    'h-6 rounded-lg text-[10px] font-bold tabular-nums flex items-center justify-center transition-all',
                    isToday
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : isFertileZone
                        ? 'bg-rose-200/80 text-rose-950'
                        : 'bg-white/80 text-slate-500 border border-rose-100',
                  )}
                >
                  {offsetDay > 0 ? offsetDay : offsetDay + metrics.cycleLength}
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION 2: CORPORATE CARE LEDGER */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xs font-bold uppercase tracking-wider text-rose-900/80">
              {employeeLink ? 'Corporate benefits' : 'Health benefits'}
            </h2>
            <button
              type="button"
              onClick={() => setActiveScreen('03b')}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2A0E1A] bg-rose-50 border border-rose-200 rounded-full px-2.5 py-0.5 hover:bg-rose-100 transition-colors"
            >
              <Building2 className="size-3 text-rose-700" />
              <span>{employeeLink ? employeeLink.company : 'Link company'}</span>
            </button>
          </div>

          {showCorpCard && employeeLink ? (
            <div className="rounded-2xl border border-rose-100 bg-white p-3.5 shadow-2xs">
              <div className="grid grid-cols-3 text-center divide-x divide-rose-100">
                <div className="px-1">
                  <span className="font-display text-base font-bold text-[#2A0E1A] tabular-nums">
                    {employeeLink.consultsLeft} / {employeeLink.consultsTotal}
                  </span>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5">Free consults</p>
                </div>
                <div className="px-1">
                  <span className="font-display text-base font-bold text-[#2A0E1A] tabular-nums">
                    {employeeLink.healthChecksLeft} / {employeeLink.healthChecksTotal}
                  </span>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5">Health check</p>
                </div>
                <div className="px-1">
                  <span className="font-display text-base font-bold text-rose-700 tabular-nums">
                    ₹{employeeLink.walletLeft.toLocaleString('en-IN')}
                  </span>
                  <p className="text-[10px] font-medium text-slate-500 mt-0.5">Test wallet</p>
                </div>
              </div>
            </div>
          ) : employeeLink ? (
            <button
              type="button"
              onClick={() => setActiveScreen('03b')}
              className="w-full rounded-2xl border border-rose-100 bg-white px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-600 hover:bg-rose-50/40"
            >
              <span>Corporate benefits hidden on Home</span>
              <span className="font-semibold text-rose-800">Show →</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveScreen('02')}
              className="w-full rounded-2xl border border-dashed border-rose-300 bg-rose-50/60 px-3.5 py-3 flex items-center justify-between text-left hover:bg-rose-50 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-[#2A0E1A]">Unlock ₹0 employer benefits</p>
                <p className="text-[11px] text-slate-600">Free consults & blood tests via HR</p>
              </div>
              <ArrowRight className="size-4 text-rose-700 shrink-0" />
            </button>
          )}
        </div>

        {/* SECTION 3: 2x2 PINK & WHITE SEPARATED ACTION GRID */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setActiveScreen('05')}
            className={cn(
              'rounded-2xl border border-rose-200/80 bg-rose-50/75 p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-400 hover:bg-rose-100/70 transition-all active:scale-[0.98] text-left group',
              focusRing,
            )}
          >
            <div className="size-9 rounded-xl bg-white text-rose-700 flex items-center justify-center shrink-0 border border-rose-200/70 shadow-2xs group-hover:scale-105 transition-transform">
              <Stethoscope className="size-4.5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-[#2A0E1A] truncate">Book consult</span>
              <span className="block text-[10px] text-rose-800/80 truncate">Video / Clinic</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen('13')}
            className={cn(
              'rounded-2xl border border-rose-100 bg-white p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-300 hover:bg-rose-50/40 transition-all active:scale-[0.98] text-left group',
              focusRing,
            )}
          >
            <div className="size-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-105 transition-transform">
              <FlaskConical className="size-4.5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-900 truncate">Blood test</span>
              <span className="block text-[10px] text-slate-500 truncate">Home pickup</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen('12')}
            className={cn(
              'rounded-2xl border border-rose-100 bg-white p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-300 hover:bg-rose-50/40 transition-all active:scale-[0.98] text-left group',
              focusRing,
            )}
          >
            <div className="size-9 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center shrink-0 border border-rose-100 group-hover:scale-105 transition-transform">
              <FileText className="size-4.5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-900 truncate">Prescriptions</span>
              <span className="block text-[10px] text-slate-500 truncate">View medicines</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setActiveScreen('15')}
            className={cn(
              'rounded-2xl border border-rose-200/80 bg-rose-50/75 p-3 flex items-center gap-2.5 shadow-2xs hover:border-rose-400 hover:bg-rose-100/70 transition-all active:scale-[0.98] text-left group',
              focusRing,
            )}
          >
            <div className="size-9 rounded-xl bg-white text-rose-700 flex items-center justify-center shrink-0 border border-rose-200/70 shadow-2xs group-hover:scale-105 transition-transform">
              <Activity className="size-4.5" strokeWidth={1.8} />
            </div>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-[#2A0E1A] truncate">Lab reports</span>
              <span className="block text-[10px] text-rose-800/80 truncate">2 insights</span>
            </div>
          </button>
        </div>

        {/* CARD 4: UPCOMING CONSULTATION (Live from Zustand store) */}
        {confirmedBooking ? (
          <div className="rounded-2xl border border-rose-200/70 bg-white p-3.5 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800">
                Upcoming consult
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                <Video className="size-2.5" /> {confirmedBooking.dateLabel}, {confirmedBooking.slotTime}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-10 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 text-[#2A0E1A] font-display font-bold text-xs flex items-center justify-center shrink-0">
                  {upcomingDoctor.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-sm font-bold text-slate-900 truncate">
                    {upcomingDoctor.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 truncate">
                    {upcomingDoctor.role} · {confirmedBooking.consultType === 'video' ? 'Video' : 'In-clinic'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveScreen('09')}
                className={cn(
                  'h-9 px-4 rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] text-xs font-semibold text-white shadow-2xs active:scale-95 transition-all shrink-0',
                  focusRing,
                )}
              >
                Join call
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setActiveScreen('05')}
            className="w-full rounded-2xl border border-rose-100 bg-white p-3.5 flex items-center justify-between text-left hover:bg-rose-50/40"
          >
            <div>
              <p className="text-xs font-bold text-slate-900">No upcoming consults</p>
              <p className="text-[11px] text-slate-500">Tap to pick a specialist slot</p>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-[#2A0E1A] text-white text-xs font-semibold">
              Book
            </span>
          </button>
        )}

      </div>

      {/* DOCKED BOTTOM NAVBAR WITH ICONS */}
      <BottomNav active="today" />
    </div>
  )
}
