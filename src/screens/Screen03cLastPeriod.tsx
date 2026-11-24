import {
  addMonths,
  format,
  getDaysInMonth,
  isAfter,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
  subMonths,
} from 'date-fns'
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen03cLastPeriod() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const setLastPeriodStart = useHerCorporateStore((s) => s.setLastPeriodStart)
  const setCycleSetupSkipped = useHerCorporateStore((s) => s.setCycleSetupSkipped)
  const companyName = useHerCorporateStore((s) => s.selectedCompany?.name || 'Acme Tech')

  const today = useMemo(() => startOfDay(new Date()), [])

  const initialDate = useMemo(() => {
    try {
      const parsed = parseISO(lastPeriodStart)
      if (!isNaN(parsed.getTime()) && !isAfter(startOfDay(parsed), today)) {
        return startOfDay(parsed)
      }
    } catch {
      // fallback
    }
    const d = new Date()
    d.setDate(d.getDate() - 10)
    return startOfDay(d)
  }, [lastPeriodStart, today])

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(initialDate))
  const [dontRemember, setDontRemember] = useState(false)

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  const firstDayOfMonth = startOfMonth(viewMonth)
  const daysInMonth = getDaysInMonth(viewMonth)
  const emptyDaysPrefix = (firstDayOfMonth.getDay() + 6) % 7
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handlePrevMonth = () => setViewMonth((m) => subMonths(m, 1))
  const handleNextMonth = () => {
    const next = addMonths(viewMonth, 1)
    if (!isAfter(startOfMonth(next), today)) setViewMonth(next)
  }

  const handleSelectDay = (day: number) => {
    const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
    if (!isAfter(startOfDay(date), today)) {
      setSelectedDate(startOfDay(date))
      setDontRemember(false)
    }
  }

  const handleToggleDontRemember = () => {
    const nextState = !dontRemember
    setDontRemember(nextState)
    if (nextState) {
      const fallback = new Date()
      fallback.setDate(fallback.getDate() - 10)
      setSelectedDate(startOfDay(fallback))
    }
  }

  const handleSkip = () => {
    setCycleSetupSkipped(true)
    setActiveScreen('04')
  }

  const handleNext = () => {
    setLastPeriodStart(format(selectedDate, 'yyyy-MM-dd'))
    setActiveScreen('03d')
  }

  const isCurrentMonthFuture = isAfter(startOfMonth(addMonths(viewMonth, 1)), today)

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-purple-100 shrink-0">
        <header className="flex items-center justify-between h-11.5 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('04')}
              aria-label="Back"
              className={cn(
                'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-purple-50 hover:text-[#3B0764] active:scale-95 transition-all -ml-1',
                focusRing,
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <h1 className="font-display text-xs font-bold text-slate-900 tracking-tight">
              Step 1 of 3
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="text-xs font-semibold text-slate-500 hover:text-[#3B0764] px-2 py-1 rounded-md transition-colors"
          >
            Skip
          </button>
        </header>

        <div className="grid grid-cols-3 gap-1.5 px-4 pb-2">
          <div className="h-1.5 rounded-full bg-[#4C1D95]" />
          <div className="h-1.5 rounded-full bg-purple-100" />
          <div className="h-1.5 rounded-full bg-purple-100" />
        </div>
      </div>

      {/* COMPACT ZERO-SCROLL CALENDAR BODY */}
      <div className="flex-1 px-4 py-3 flex flex-col justify-between gap-2.5">
        
        <div className="space-y-0.5">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug">
            Last period start date
          </h2>
          <p className="text-xs text-slate-500">
            Tap the first day of your recent period.
          </p>
        </div>

        {/* Calendar Card */}
        <div className="rounded-2xl border-2 border-purple-200/80 bg-white p-3.5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold text-[#3B0764]">
              {format(viewMonth, 'MMMM yyyy')}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="grid size-7 place-items-center rounded-lg text-purple-800 hover:bg-purple-50 active:scale-95 transition-all"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={isCurrentMonthFuture}
                aria-label="Next month"
                className="grid size-7 place-items-center rounded-lg text-purple-800 hover:bg-purple-50 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-[11px] font-bold text-rose-500">
            {weekDays.map((d, i) => (
              <span key={i} className="py-0.5">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center tabular-nums">
            {Array.from({ length: emptyDaysPrefix }).map((_, i) => (
              <span key={`empty-${i}`} className="size-8" />
            ))}

            {daysArray.map((day) => {
              const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
              const isFuture = isAfter(startOfDay(date), today)
              const isSelected = !dontRemember && isSameDay(date, selectedDate)

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isFuture}
                  onClick={() => handleSelectDay(day)}
                  className={cn(
                    'grid size-8 mx-auto place-items-center rounded-full text-xs font-semibold transition-all',
                    isSelected
                      ? 'bg-[#4C1D95] text-white font-bold shadow-xs scale-105 ring-2 ring-rose-300'
                      : isFuture
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-800 hover:bg-rose-50 hover:text-rose-800',
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        <label className="flex items-center gap-2.5 px-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={dontRemember}
            onChange={handleToggleDontRemember}
            className="size-4 rounded border-purple-300 text-[#4C1D95] focus:ring-purple-200"
          />
          <span className="text-xs font-medium text-slate-700">
            I don't remember exact date
          </span>
        </label>

        <div className="rounded-xl border border-purple-100 bg-purple-50/70 px-3 py-2 flex items-center gap-2 text-[11px] text-purple-900">
          <Lock className="size-3.5 text-purple-700 shrink-0" />
          <span>Private · {companyName} never sees your cycle data.</span>
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
