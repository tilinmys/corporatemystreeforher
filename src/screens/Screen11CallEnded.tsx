import { Bell, Check, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen11CallEnded() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')

  const handleViewPrescription = () => {
    setActiveScreen('12')
  }

  const handleBackToHome = () => {
    setActiveScreen('04')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800 p-4">
      
      {/* 
        MAIN CONTENT BODY:
        - Checkmark crest
        - "Consultation complete"
        - Card 1: Prescription is being prepared
        - Card 2: Push + WhatsApp alert
        - Rating & Feedback (Clean numerical scale, NO star icons)
        Matching exact Wireframe 11
      */}
      <div className="space-y-4">
        
        {/* Center Checkmark Crest & Title */}
        <div className="flex flex-col items-center text-center pt-2 space-y-2">
          <div className="size-16 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-900 shadow-2xs">
            <Check className="size-7" strokeWidth={2.5} />
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-xl font-bold text-slate-900 tracking-tight">
              Consultation complete
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Dr. Ananya Rao · 14 min
            </p>
          </div>
        </div>

        {/* CARD 1: PRESCRIPTION IS BEING PREPARED */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="size-9 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-800 shrink-0">
            <Loader2 className="size-4 animate-spin text-rose-700" />
          </div>
          <div className="space-y-0.5">
            <h2 className="font-semibold text-xs text-slate-900">
              Your prescription is being prepared
            </h2>
            <p className="text-[11px] text-slate-500 leading-tight">
              Usually ready in 5–10 minutes. We'll notify you.
            </p>
          </div>
        </div>

        {/* CARD 2: PUSH + WHATSAPP NOTIFICATION ALERT */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="size-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
            <Bell className="size-4" strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <h2 className="font-semibold text-xs text-slate-900">
              Push + WhatsApp (when ready)
            </h2>
            <p className="text-[11px] text-slate-500 leading-tight">
              Your prescription from Dr. Ananya Rao is ready
            </p>
          </div>
        </div>

        {/* FEEDBACK & RATING SECTION: Clean clinical numerical scale, NO star icons */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs text-center">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xs text-slate-800">
              Rate your consultation experience
            </h3>
            <span className="text-[11px] font-semibold text-rose-900 tabular-nums">
              {rating} / 5
            </span>
          </div>

          {/* Numerical Rating Pills 1 to 5 */}
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setRating(val)}
                className={cn(
                  'h-9 rounded-xl text-xs font-semibold tabular-nums transition-all select-none',
                  rating === val
                    ? 'bg-[#2A0E1A] text-white shadow-2xs scale-[1.02]'
                    : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
                  focusRing,
                )}
              >
                {val}
              </button>
            ))}
          </div>

          {/* Feedback Input (Optional) */}
          <div className="space-y-1.5 text-left pt-1">
            <label htmlFor="feedback-input" className="block text-xs font-medium text-slate-500">
              Feedback (optional)
            </label>
            <input
              id="feedback-input"
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us about your experience"
              className={cn(
                'block h-10 w-full rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-300 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
                focusRing,
              )}
            />
          </div>
        </div>

      </div>

      {/* 
        BOTTOM ACTION BUTTONS:
        - View prescription
        - Back to Home
      */}
      <div className="space-y-2 pt-4 pb-2">
        <button
          type="button"
          onClick={handleViewPrescription}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          View prescription
        </button>

        <button
          type="button"
          onClick={handleBackToHome}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 text-xs font-semibold text-slate-800 shadow-2xs active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Back to Home
        </button>
      </div>

    </div>
  )
}
