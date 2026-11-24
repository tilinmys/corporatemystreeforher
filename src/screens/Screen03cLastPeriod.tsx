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

  // Parse initial selected date safely
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

  // Weekdays (Monday-first to match wireframe M T W T F S S)
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

  // Calendar math
  const firstDayOfMonth = startOfMonth(viewMonth)
  const daysInMonth = getDaysInMonth(viewMonth)
  // Monday = 0, Sunday = 6
  const emptyDaysPrefix = (firstDayOfMonth.getDay() + 6) % 7
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  const handlePrevMonth = () => {
    setViewMonth((m) => subMonths(m, 1))
  }

  const handleNextMonth = () => {
    const next = addMonths(viewMonth, 1)
    if (!isAfter(startOfMonth(next), today)) {
      setViewMonth(next)
    }
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
      
      {/* 
        TOP HEADER:
        - Back arrow <
        - Title "Step 1 of 3 · Cycle setup"
        - Skip button
        - 3-segment progress bar
        Matching exact Wireframe 03c
      */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <header className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('03')}
              aria-label="Back to Verify"
              className={cn(
                'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
                focusRing,
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <h1 className="font-display text-xs font-bold text-slate-900 tracking-tight">
              Step 1 of 3 · Cycle setup
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className={cn(
              'text-xs font-semibold text-slate-500 hover:text-slate-900 px-2 py-1 rounded-md transition-colors',
              focusRing,
            )}
          >
            Skip
          </button>
        </header>

        {/* 3-segment Progress Bar: Bar 1 active */}
        <div className="grid grid-cols-3 gap-1.5 px-4 pb-2.5">
          <div className="h-1 rounded-full bg-[#2A0E1A]" />
          <div className="h-1 rounded-full bg-slate-200" />
          <div className="h-1 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* Editorial Heading */}
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug">
            When did your last period start?
          </h2>
          <p className="text-xs text-slate-500">
            Pick the first day of your most recent period.
          </p>
        </div>

        {/* Interactive Calendar Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          {/* Month Header with < > buttons */}
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold text-slate-900">
              {format(viewMonth, 'MMMM yyyy')}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous month"
                className="grid size-7 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={isCurrentMonthFuture}
                aria-label="Next month"
                className="grid size-7 place-items-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Weekday Row (M T W T F S S) */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400">
            {weekDays.map((d, i) => (
              <span key={i} className="py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-center tabular-nums">
            {Array.from({ length: emptyDaysPrefix }).map((_, i) => (
              <span key={`empty-${i}`} className="size-9" />
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
                    'grid size-9 mx-auto place-items-center rounded-full text-xs font-medium transition-all',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white font-bold shadow-xs scale-105'
                      : isFuture
                        ? 'text-slate-300 cursor-not-allowed'
                        : 'text-slate-800 hover:bg-rose-50 hover:text-rose-950',
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Checkbox: I don't remember */}
        <label className="flex items-center gap-2.5 px-1 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={dontRemember}
            onChange={handleToggleDontRemember}
            className="size-4 rounded border-slate-300 text-rose-950 focus:ring-rose-200"
          />
          <span className="text-xs font-medium text-slate-700">
            I don't remember
          </span>
        </label>

        {/* Privacy Note Box */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 space-y-1 shadow-2xs">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Lock className="size-3 text-rose-900" strokeWidth={1.5} />
            <p className="text-[11px] leading-relaxed">
              Your answers are private. {companyName} never sees your cycle data.
            </p>
          </div>
        </div>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Next" button docked at bottom
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5]">
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Next
        </button>
      </div>

    </div>
  )
}
