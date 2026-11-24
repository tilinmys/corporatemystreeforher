import { ChevronLeft, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const QUICK_TAGS = ['Irregular periods', 'PCOS', 'Pregnancy', 'Pain', 'Other']

export function Screen07PreConsult() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const lastPeriodStart = useHerCorporateStore((s) => s.last_period_start)
  const companyName = employeeLink?.company || 'Acme Tech'

  const [concern, setConcern] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>(['Irregular periods'])
  const [periodDate, setPeriodDate] = useState(lastPeriodStart || '14/11/2026')
  const [medicines, setMedicines] = useState('')
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
    setActiveScreen('08')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 06)
        - Title "Before your consult"
        Matching exact Wireframe 07
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('06')}
          aria-label="Back to Doctor Profile"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Before your consult
        </h1>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* DOCTOR SUMMARY CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-rose-50 border border-rose-200 text-rose-950 font-display text-xs font-bold flex items-center justify-center shrink-0">
              Dr
            </div>
            <div>
              <h2 className="font-display text-xs font-bold text-slate-900">
                Dr. Ananya Rao · Video
              </h2>
              <p className="text-[11px] text-slate-500">
                Mon, 23 Nov · 4:30 PM
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('06')}
            className={cn(
              'text-xs font-semibold text-rose-950 hover:underline px-2 py-1',
              focusRing,
            )}
          >
            Edit
          </button>
        </div>

        {/* SECTION 1: WHAT WOULD YOU LIKE TO DISCUSS? */}
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
              'block w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs resize-none',
              focusRing,
            )}
          />

          {/* Quick Tag Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
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
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                    focusRing,
                  )}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION 2: LAST PERIOD START DATE */}
        <div className="space-y-1.5">
          <label htmlFor="period-date" className="block text-xs font-semibold text-slate-800">
            Last period start date
          </label>
          <input
            id="period-date"
            type="text"
            value={periodDate}
            onChange={(e) => setPeriodDate(e.target.value)}
            placeholder="DD / MM / YYYY"
            className={cn(
              'block h-10 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
              focusRing,
            )}
          />
        </div>

        {/* SECTION 3: CURRENT MEDICINES */}
        <div className="space-y-1.5">
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
              'block h-10 w-full rounded-xl border border-slate-300 bg-white px-3.5 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
              focusRing,
            )}
          />
        </div>

        {/* SECTION 4: UPLOAD PAST REPORTS */}
        <button
          type="button"
          className={cn(
            'w-full h-12 rounded-xl border-2 border-dashed border-slate-300 bg-white/70 hover:bg-white flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 hover:border-rose-400 hover:text-rose-950 transition-all active:scale-[0.99]',
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
            className="size-4 mt-0.5 rounded border-slate-300 text-rose-950 focus:ring-rose-200"
          />
          <span className="text-[11px] text-slate-600 leading-tight">
            I consent to share these details with the doctor
          </span>
        </label>

      </div>

      {/* 
        BOTTOM FEE LEDGER & CONFIRM BUTTON:
        Consultation fee: ~~₹600~~ ₹0
        Covered by Acme Tech · 3 free consults left after this: 2
        Matching exact Wireframe 07 bottom layout
      */}
      <div className="p-4 pt-3 pb-3 bg-white border-t border-[#E8DFDC] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-medium">Consultation fee</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 line-through tabular-nums">₹600</span>
            <span className="font-bold text-slate-900 tabular-nums">₹0</span>
          </div>
        </div>

        <p className="text-[10px] text-emerald-700 font-medium">
          Covered by {companyName} · 3 free consults left after this: 2
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
