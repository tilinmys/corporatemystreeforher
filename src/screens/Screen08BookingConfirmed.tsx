import { Bell, Check } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen08BookingConfirmed() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const companyName = employeeLink?.company || 'Acme Tech'

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800 p-4">
      
      {/* 
        MAIN CONTENT BODY:
        - Top Push Notification card
        - Checkmark crest
        - Receipt ledger
        - Calendar & Reschedule actions
        Matching exact Wireframe 08
      */}
      <div className="space-y-4">
        
        {/* Top Simulated Push Notification Card */}
        <div className="rounded-2xl border border-slate-300 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
            <Bell className="size-4" strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-slate-900">
              Push notification
            </p>
            <p className="text-[11px] text-slate-600 leading-tight">
              Consultation confirmed with Dr. Ananya Rao, Mon 4:30 PM
            </p>
          </div>
        </div>

        {/* Center Checkmark Crest & Title */}
        <div className="flex flex-col items-center text-center py-2 space-y-2">
          <div className="size-16 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-900 shadow-2xs">
            <Check className="size-7" strokeWidth={2.5} />
          </div>

          <div className="space-y-1">
            <h1 className="font-display text-xl font-bold text-slate-900 tracking-tight">
              Consultation booked
            </h1>
            <p className="text-xs text-slate-500">
              You'll get a reminder 24 hrs and 15 min before
            </p>
          </div>
        </div>

        {/* Clinical Receipt Ticket Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-2xs text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Doctor</span>
            <span className="font-bold text-slate-900">Dr. Ananya Rao</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Date & time</span>
            <span className="font-semibold text-slate-900">Mon 23 Nov, 4:30 PM</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Type</span>
            <span className="font-semibold text-slate-900">Video consult</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Paid</span>
            <span className="font-bold text-emerald-700">₹0 · {companyName}</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Booking ID</span>
            <span className="font-mono font-semibold text-slate-900">MS-10482</span>
          </div>
        </div>

        {/* Action Buttons: Add to calendar & Reschedule */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => alert('Consultation added to calendar!')}
              className={cn(
                'h-10 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all',
                focusRing,
              )}
            >
              Add to calendar
            </button>

            <button
              type="button"
              onClick={() => setActiveScreen('06')}
              className={cn(
                'h-10 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all',
                focusRing,
              )}
            >
              Reschedule
            </button>
          </div>

          <button
            type="button"
            onClick={() => setActiveScreen('05')}
            className="w-full text-center text-xs text-slate-400 hover:text-rose-600 transition-colors py-1 hover:underline"
          >
            Cancel booking
          </button>
        </div>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Go to Home" button docked at bottom
      */}
      <div className="pt-4 pb-2">
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
