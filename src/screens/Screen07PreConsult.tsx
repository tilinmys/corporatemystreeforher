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
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

const QUICK_TAGS = ['Irregular periods', 'PCOS', 'Pregnancy', 'Pain', 'Other']

export function Screen07PreConsult() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const setLastPeriodStart = useHerCorporateStore((s) => s.setLastPeriodStart)
  const bookingDraft = useHerCorporateStore((s) => s.bookingDraft)
  const setBookingDraft = useHerCorporateStore((s) => s.setBookingDraft)
  const confirmBooking = useHerCorporateStore((s) => s.confirmBooking)

  const doc = PANEL_DOCTORS.find((d) => d.id === bookingDraft.doctorId) ?? PANEL_DOCTORS[0]
  const companyName = employeeLink?.company || 'Acme Tech'
  const consultsLeft = employeeLink?.consultsLeft ?? 3

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
    return today
  }, [lastPeriodStart, today])

  const [concern, setConcern] = useState(bookingDraft.concern || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Irregular periods'])
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(initialDate))
  const [showCalendar, setShowCalendar] = useState(false)
  const [medicines, setMedicines] = useState(bookingDraft.medicines || '')
  const [consent, setConsent] = useState(true)

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
      if (!concern) {
        setConcern(tag)
      } else if (!concern.includes(tag)) {
        setConcern(`${concern}, ${tag}`)
      }
    }
  }

  const handlePickDate = (day: number) => {
    const picked = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
    if (!isAfter(startOfDay(picked), today)) {
      const normalized = startOfDay(picked)
      setSelectedDate(normalized)
      setLastPeriodStart(format(normalized, 'yyyy-MM-dd'))
      setShowCalendar(false)
    }
  }

  const handleConfirm = () => {
    setBookingDraft({ concern, medicines })
    confirmBooking()
  }

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const firstDayOfMonth = startOfMonth(viewMonth)
  const daysInMonth = getDaysInMonth(viewMonth)
  const emptyDaysPrefix = (firstDayOfMonth.getDay() + 6) % 7
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const isNextMonthDisabled = isAfter(startOfMonth(addMonths(viewMonth, 1)), today)

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      <header className="sticky top-0 z-30 flex items-center h-11.5 px-4 bg-white/95 backdrop-blur-md border-b border-purple-100 shrink-0">
        <button
          type="button"
          onClick={() => setActiveScreen('06')}
          aria-label="Back to Doctor Profile"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-purple-50 hover:text-[#3B0764] active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-sm font-bold text-slate-900 tracking-tight">
          Pre-consult notes
        </h1>
      </header>

      <div className="flex-1 px-4 py-3 space-y-3">
        
        {/* DOCTOR SUMMARY */}
        <div className="rounded-2xl border border-purple-200 bg-purple-50/60 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-[#4C1D95] text-white font-display text-xs font-bold flex items-center justify-center shrink-0">
              {doc.initials}
            </div>
            <div>
              <h2 className="font-display text-xs font-bold text-slate-900">
                {doc.name} · {bookingDraft.consultType === 'video' ? 'Video' : 'Clinic'}
              </h2>
              <p className="text-[11px] text-purple-800 font-medium">
                {bookingDraft.dateLabel} · {bookingDraft.slotTime}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('06')}
            className="text-xs font-bold text-[#4C1D95] hover:underline px-2 py-1"
          >
            Edit
          </button>
        </div>

        {/* CONCERN + QUICK TAGS */}
        <div className="space-y-2">
          <label htmlFor="concern-text" className="block text-xs font-bold text-slate-800">
            Concern
          </label>
          <textarea
            id="concern-text"
            rows={2}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="Briefly describe symptoms"
            className={cn(
              'block w-full rounded-xl border border-purple-200 bg-white p-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/50 resize-none',
              focusRing,
            )}
          />

          <div className="flex items-center gap-1.5 flex-wrap">
            {QUICK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleTag(tag)}
                  className={cn(
                    'h-7 px-2.5 rounded-full text-[11px] font-semibold transition-all',
                    isSelected
                      ? 'bg-[#4C1D95] text-white'
                      : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* LAST PERIOD DATE — INTERACTIVE CALENDAR PICKER */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-800">
            Last period start date
          </label>

          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-xl border border-rose-200 bg-[#FFF5F8] px-3.5 text-xs font-semibold text-[#3B0764] hover:border-rose-400 transition-colors',
              focusRing,
            )}
          >
            <span>{format(selectedDate, 'dd MMM yyyy')}</span>
            <CalendarDays className="size-4 text-rose-600" />
          </button>

          {showCalendar && (
            <div className="rounded-2xl border-2 border-purple-200 bg-white p-3 shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-display text-xs font-bold text-[#3B0764]">
                  {format(viewMonth, 'MMMM yyyy')}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setViewMonth((m) => subMonths(m, 1))}
                    className="grid size-6.5 place-items-center rounded-md hover:bg-purple-50 text-purple-800"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isNextMonthDisabled}
                    onClick={() => setViewMonth((m) => addMonths(m, 1))}
                    className="grid size-6.5 place-items-center rounded-md hover:bg-purple-50 text-purple-800 disabled:opacity-30"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-rose-500">
                {weekDays.map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center tabular-nums">
                {Array.from({ length: emptyDaysPrefix }).map((_, i) => (
                  <span key={`e-${i}`} className="size-7" />
                ))}
                {daysArray.map((day) => {
                  const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), day)
                  const isFuture = isAfter(startOfDay(date), today)
                  const isSel = isSameDay(date, selectedDate)
                  return (
                    <button
                      key={day}
                      type="button"
                      disabled={isFuture}
                      onClick={() => handlePickDate(day)}
                      className={cn(
                        'grid size-7 mx-auto place-items-center rounded-full text-[11px] font-semibold transition-all',
                        isSel
                          ? 'bg-[#4C1D95] text-white font-bold'
                          : isFuture
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'text-slate-800 hover:bg-rose-100',
                      )}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* CURRENT MEDICINES */}
        <div className="space-y-1">
          <label htmlFor="medicines-input" className="block text-xs font-bold text-slate-800">
            Current medicines (optional)
          </label>
          <input
            id="medicines-input"
            type="text"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="e.g. None"
            className={cn(
              'block h-9.5 w-full rounded-xl border border-purple-200 bg-white px-3 text-xs text-slate-900 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/50',
              focusRing,
            )}
          />
        </div>

        {/* UPLOAD PAST REPORTS */}
        <button
          type="button"
          className="w-full h-10 rounded-xl border border-dashed border-purple-300 bg-white hover:bg-purple-50/40 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#4C1D95] transition-colors"
        >
          <Plus className="size-4" />
          <span>Upload past reports</span>
        </button>

        {/* CONSENT */}
        <label className="flex items-center gap-2 px-0.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="size-4 rounded border-purple-300 text-[#4C1D95] focus:ring-purple-200"
          />
          <span className="text-[11px] text-slate-600">
            Share securely with {doc.name}
          </span>
        </label>

      </div>

      {/* FEE FOOTER */}
      <div className="p-4 pt-2.5 pb-3 bg-white border-t border-purple-100 space-y-2 shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">
            {employeeLink ? `${companyName} · ${Math.max(0, consultsLeft - 1)} free left` : 'Consultation fee'}
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 line-through tabular-nums">₹600</span>
            <span className="font-bold text-emerald-700 tabular-nums">₹0</span>
          </div>
        </div>

        <button
          type="button"
          disabled={!consent}
          onClick={handleConfirm}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#4C1D95] hover:bg-[#3B0764] px-4 text-xs font-semibold text-white shadow-sm disabled:opacity-50 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Confirm booking
        </button>
      </div>
    </div>
  )
}
