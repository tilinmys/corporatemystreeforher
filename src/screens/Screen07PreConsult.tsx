import { ChevronLeft, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

const QUICK_TAGS = ['Irregular periods', 'PCOS', 'Pregnancy', 'Pain', 'Other']

export function Screen07PreConsult() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const bookingDraft = useHerCorporateStore((s) => s.bookingDraft)
  const setBookingDraft = useHerCorporateStore((s) => s.setBookingDraft)
  const confirmBooking = useHerCorporateStore((s) => s.confirmBooking)

  const doc = PANEL_DOCTORS.find((d) => d.id === bookingDraft.doctorId) ?? PANEL_DOCTORS[0]
  const companyName = employeeLink?.company || 'Acme Tech'
  const consultsLeft = employeeLink?.consultsLeft ?? 3

  const [concern, setConcern] = useState(bookingDraft.concern || '')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Irregular periods'])
  const [periodDate, setPeriodDate] = useState(lastPeriodStart || '2026-11-11')
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

  const handleConfirm = () => {
    setBookingDraft({ concern, medicines })
    confirmBooking()
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <button
          type="button"
          onClick={() => setActiveScreen('06')}
          aria-label="Back to Doctor Profile"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#2A0E1A] active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Before your consult
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        {/* DOCTOR SUMMARY CARD */}
        <div className="rounded-2xl border border-rose-200/70 bg-rose-50/50 p-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white border border-rose-200 text-[#2A0E1A] font-display text-xs font-bold flex items-center justify-center shrink-0">
              {doc.initials}
            </div>
            <div>
              <h2 className="font-display text-xs font-bold text-slate-900">
                {doc.name} · {bookingDraft.consultType === 'video' ? 'Video' : 'Clinic'}
              </h2>
              <p className="text-[11px] text-slate-500">
                {bookingDraft.dateLabel} · {bookingDraft.slotTime}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('06')}
            className={cn(
              'text-xs font-semibold text-rose-800 hover:underline px-2 py-1',
              focusRing,
            )}
          >
            Edit
          </button>
        </div>

        {/* SECTION 1: CONCERN */}
        <div className="space-y-2">
          <label htmlFor="concern-text" className="block text-xs font-semibold text-slate-800">
            What would you like to discuss?
          </label>
          <textarea
            id="concern-text"
            rows={3}
            value={concern}
            onChange={(e) => setConcern(e.target.value)}
            placeholder="Describe your concern"
            className={cn(
              'block w-full rounded-xl border border-rose-200/80 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs resize-none',
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
                    'h-7 px-3 rounded-full text-[11px] font-semibold transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
                    focusRing,
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* LAST PERIOD START DATE */}
        <div className="space-y-1">
          <label htmlFor="period-date" className="block text-xs font-semibold text-slate-800">
            Last period start date
          </label>
          <input
            id="period-date"
            type="text"
            value={periodDate}
            onChange={(e) => setPeriodDate(e.target.value)}
            placeholder="YYYY-MM-DD"
            className={cn(
              'block h-10 w-full rounded-xl border border-rose-200/80 bg-white px-3.5 text-xs text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
              focusRing,
            )}
          />
        </div>

        {/* CURRENT MEDICINES */}
        <div className="space-y-1">
          <label htmlFor="medicines-input" className="block text-xs font-semibold text-slate-800">
            Current medicines (optional)
          </label>
          <input
            id="medicines-input"
            type="text"
            value={medicines}
            onChange={(e) => setMedicines(e.target.value)}
            placeholder="e.g. none"
            className={cn(
              'block h-10 w-full rounded-xl border border-rose-200/80 bg-white px-3.5 text-xs text-slate-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
              focusRing,
            )}
          />
        </div>

        {/* UPLOAD PAST REPORTS */}
        <button
          type="button"
          className={cn(
            'w-full h-11 rounded-xl border-2 border-dashed border-rose-200 bg-white/80 hover:bg-white flex items-center justify-center gap-1.5 text-xs font-semibold text-rose-900 hover:border-rose-400 transition-all active:scale-[0.99]',
            focusRing,
          )}
        >
          <Plus className="size-4" />
          <span>Upload past reports (optional)</span>
        </button>

        {/* CONSENT CHECKBOX */}
        <label className="flex items-start gap-2.5 px-0.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="size-4 mt-0.5 rounded border-rose-300 text-[#2A0E1A] focus:ring-rose-200"
          />
          <span className="text-[11px] text-slate-600 leading-tight">
            I consent to share these details with {doc.name}
          </span>
        </label>

      </div>

      {/* BOTTOM FEE LEDGER & CONFIRM BUTTON */}
      <div className="p-4 pt-3 pb-3 bg-white border-t border-rose-100 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Consultation fee</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 line-through tabular-nums">₹600</span>
            <span className="font-bold text-slate-900 tabular-nums">₹0</span>
          </div>
        </div>

        <p className="text-[10px] text-emerald-700 font-medium">
          {employeeLink
            ? `Covered by ${companyName} · ${Math.max(0, consultsLeft - 1)} free consults left after this`
            : 'Complimentary first specialist consult applied'}
        </p>

        <button
          type="button"
          disabled={!consent}
          onClick={handleConfirm}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm disabled:opacity-50 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Confirm booking
        </button>
      </div>
    </div>
  )
}
