import { motion } from 'framer-motion'
import {
  Activity,
  Bell,
  Building2,
  CalendarDays,
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
  const upcomingDoctor =
    PANEL_DOCTORS.find((d) => d.id === confirmedBooking?.doctorId) ?? PANEL_DOCTORS[0]

  const firstName = user.name.split(' ')[0] || 'Priya'
  const showCorpCard = Boolean(employeeLink && employeeLink.showCorporateCareOnHome)

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* HEADER: Clean Greeting + Employer Pill + Bell */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-12.5 px-4 bg-white/95 backdrop-blur-md border-b border-purple-100 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setActiveScreen('03b')}
            className="size-8.5 rounded-full bg-gradient-to-br from-purple-100 to-rose-100 border border-purple-300/70 flex items-center justify-center font-display text-sm font-bold text-[#3B0764]"
          >
            {user.avatar}
          </button>
          <div>
            <h1 className="font-display text-sm font-bold text-slate-900 leading-tight">
              Hi, {firstName}
            </h1>
            <p className="text-[10px] font-semibold text-purple-800">
              {employeeLink ? employeeLink.company : 'Her Care'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveScreen('16')}
          aria-label="Notifications"
          className={cn(
            'grid size-8 place-items-center rounded-xl bg-purple-50 text-[#4C1D95] hover:bg-purple-100 active:scale-95 transition-all relative',
            focusRing,
          )}
        >
          <Bell className="size-4" strokeWidth={1.9} />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-600 ring-2 ring-white" />
        </button>
      </header>

      {/* MAIN BODY — ZERO SCROLL COMPACT PERSONA GRID */}
      <div className="flex-1 px-3.5 py-2.5 flex flex-col justify-between gap-2.5">
        
        {/* 1. CYCLE & OVULATORY WINDOW CARD (Distinct Pink + Purple Contrast) */}
        <div className="rounded-2xl border-2 border-rose-300/80 bg-gradient-to-br from-[#FFE4EC] via-[#FDF2F8] to-[#F3E8FF] p-3 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="size-11.5 rounded-xl bg-gradient-to-br from-[#BE123C] to-[#581C87] text-white flex flex-col items-center justify-center shadow-xs shrink-0">
                <span className="text-[8px] font-bold uppercase tracking-wider opacity-85 leading-none">
                  Day
                </span>
                <span className="font-display text-base font-bold leading-tight tabular-nums">
                  {metrics.cycleDay}
                </span>
              </div>

              <div>
                <h2 className="font-display text-sm font-bold text-[#3B0764] leading-tight">
                  {metrics.phaseLabel}
                </h2>
                <p className="text-[11px] font-semibold text-rose-800">
                  Next period in {metrics.daysUntilNextPeriod} days
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveScreen('03c')}
              className={cn(
                'inline-flex items-center gap-1 h-7.5 px-3 rounded-full bg-white border border-purple-200 text-[11px] font-bold text-[#4C1D95] hover:bg-purple-50 active:scale-95 transition-all shadow-2xs',
                focusRing,
              )}
            >
              <CalendarDays className="size-3" />
              <span>Log</span>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
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
                    'h-5.5 rounded-md text-[10px] font-bold tabular-nums flex items-center justify-center transition-all',
                    isToday
                      ? 'bg-[#3B0764] text-white shadow-2xs'
                      : isFertileZone
                        ? 'bg-rose-200/90 text-rose-950'
                        : 'bg-white/85 text-slate-500 border border-purple-100',
                  )}
                >
                  {offsetDay > 0 ? offsetDay : offsetDay + metrics.cycleLength}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. PERSONA-FIRST PRIORITY GRID (Color-separated by click priority) */}
        <div className="grid grid-cols-2 gap-2">
          {/* #1 Highest Click Persona: Consult Specialist (Deep Royal Purple) */}
          <button
            type="button"
            onClick={() => setActiveScreen('05')}
            className={cn(
              'rounded-2xl border-2 border-[#3B0764] bg-gradient-to-br from-[#4C1D95] to-[#6B21A8] p-3 flex items-center gap-2.5 text-left text-white shadow-sm hover:brightness-110 active:scale-[0.98] transition-all',
              focusRing,
            )}
          >
            <span className="size-8.5 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <Stethoscope className="size-4 text-rose-200" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-bold leading-tight truncate">Book Doctor</span>
              <span className="block text-[10px] text-purple-200 truncate">₹0 Consult</span>
            </div>
          </button>

          {/* #2 High Priority: Lab Reports (Distinct Pink Alert Surface) */}
          <button
            type="button"
            onClick={() => setActiveScreen('15')}
            className={cn(
              'rounded-2xl border-2 border-rose-300 bg-[#FFF0F5] p-3 flex items-center gap-2.5 text-left hover:border-rose-400 active:scale-[0.98] transition-all relative',
              focusRing,
            )}
          >
            <span className="size-8.5 rounded-xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center shrink-0">
              <Activity className="size-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-[#881337] leading-tight truncate">Lab Reports</span>
              <span className="block text-[10px] font-bold text-rose-600 truncate">2 Low alerts</span>
            </div>
          </button>

          {/* #3: My Prescriptions (Crisp White + Purple Border) */}
          <button
            type="button"
            onClick={() => setActiveScreen('12')}
            className={cn(
              'rounded-2xl border-2 border-purple-200 bg-white p-3 flex items-center gap-2.5 text-left hover:border-purple-400 active:scale-[0.98] transition-all',
              focusRing,
            )}
          >
            <span className="size-8.5 rounded-xl bg-purple-50 border border-purple-100 text-[#581C87] flex items-center justify-center shrink-0">
              <FileText className="size-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-slate-900 leading-tight truncate">Prescriptions</span>
              <span className="block text-[10px] text-slate-500 truncate">3 Medicines</span>
            </div>
          </button>

          {/* #4: Blood Test Pickup (Soft Lilac + Purple Border) */}
          <button
            type="button"
            onClick={() => setActiveScreen('13')}
            className={cn(
              'rounded-2xl border-2 border-purple-200 bg-[#F5F3FF] p-3 flex items-center gap-2.5 text-left hover:border-purple-400 active:scale-[0.98] transition-all',
              focusRing,
            )}
          >
            <span className="size-8.5 rounded-xl bg-white border border-purple-200 text-[#581C87] flex items-center justify-center shrink-0">
              <FlaskConical className="size-4" strokeWidth={2} />
            </span>
            <div className="min-w-0">
              <span className="block text-xs font-bold text-[#3B0764] leading-tight truncate">Blood Test</span>
              <span className="block text-[10px] text-purple-700 truncate">Home pickup</span>
            </div>
          </button>
        </div>

        {/* 3. GLASSMORPHIC ANIMATED CONSULTATION BOOKING CARD */}
        {confirmedBooking ? (
          <div className="relative rounded-2xl overflow-hidden p-3.5 bg-gradient-to-br from-[#3B0764]/95 via-[#581C87]/90 to-[#9D174D]/90 backdrop-blur-xl border border-white/30 text-white shadow-[0_14px_32px_-10px_rgba(88,28,135,0.48)]">
            {/* Ambient animated glow blobs inside glass */}
            <motion.div
              aria-hidden
              animate={{ x: [-12, 16, -12], y: [-6, 10, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 size-28 rounded-full bg-rose-400/35 blur-2xl pointer-events-none"
            />
            <motion.div
              aria-hidden
              animate={{ x: [10, -14, 10] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-8 -left-6 size-28 rounded-full bg-purple-400/30 blur-2xl pointer-events-none"
            />

            {/* Sweeping diagonal liquid glass light shimmer */}
            <motion.div
              aria-hidden
              initial={{ x: '-140%' }}
              animate={{ x: '260%' }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none"
            />

            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-purple-100">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Upcoming Consult
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/15 backdrop-blur-md border border-white/20 px-2 py-0.5 rounded-full">
                  <Video className="size-2.5 text-rose-200" />
                  {confirmedBooking.dateLabel}, {confirmedBooking.slotTime}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
                    {upcomingDoctor.initials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-sm font-bold text-white truncate">
                      {upcomingDoctor.name}
                    </h3>
                    <p className="text-[11px] text-purple-100/85 truncate">
                      {upcomingDoctor.role}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveScreen('09')}
                  className={cn(
                    'h-8.5 px-4 rounded-xl bg-white text-[#3B0764] hover:bg-rose-50 text-xs font-bold shadow-sm active:scale-95 transition-all shrink-0',
                    focusRing,
                  )}
                >
                  Join call
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setActiveScreen('05')}
            className="w-full rounded-2xl border-2 border-purple-200 bg-white p-3 flex items-center justify-between text-left hover:bg-purple-50/40"
          >
            <span className="text-xs font-bold text-slate-900">Book a specialist slot</span>
            <span className="px-3 py-1 rounded-xl bg-[#4C1D95] text-white text-xs font-semibold">
              Book
            </span>
          </button>
        )}

        {/* 4. COMPACT CORPORATE CREDITS STRIP (Distinct White & Purple Border) */}
        {showCorpCard && employeeLink ? (
          <button
            type="button"
            onClick={() => setActiveScreen('03b')}
            className="w-full rounded-2xl border border-purple-200 bg-white px-3 py-2.5 grid grid-cols-3 text-center divide-x divide-purple-100 shadow-2xs hover:border-purple-300 transition-colors"
          >
            <div>
              <span className="font-display text-sm font-bold text-[#3B0764] tabular-nums">
                {employeeLink.consultsLeft}/{employeeLink.consultsTotal}
              </span>
              <p className="text-[10px] text-slate-500">Consults</p>
            </div>
            <div>
              <span className="font-display text-sm font-bold text-[#3B0764] tabular-nums">
                {employeeLink.healthChecksLeft}/{employeeLink.healthChecksTotal}
              </span>
              <p className="text-[10px] text-slate-500">Checkup</p>
            </div>
            <div>
              <span className="font-display text-sm font-bold text-rose-700 tabular-nums">
                ₹{employeeLink.walletLeft.toLocaleString('en-IN')}
              </span>
              <p className="text-[10px] text-slate-500">Test wallet</p>
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setActiveScreen('02')}
            className="w-full rounded-2xl border border-dashed border-purple-300 bg-white px-3.5 py-2.5 flex items-center justify-between text-xs hover:bg-purple-50/40 transition-colors"
          >
            <span className="font-semibold text-[#3B0764] flex items-center gap-1.5">
              <Building2 className="size-3.5 text-purple-700" />
              Link employer for ₹0 care
            </span>
            <span className="font-bold text-rose-700">Link →</span>
          </button>
        )}

      </div>

      {/* DOCKED NAVBAR */}
      <BottomNav active="today" />
    </div>
  )
}
