import { Bell, Check } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen14TestBooked() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const handleGoHome = () => {
    setActiveScreen('04')
  }

  const handleDemoReport = () => {
    setActiveScreen('15')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800 p-4">
      
      {/* 
        MAIN CONTENT BODY:
        - Checkmark crest
        - "Blood test booked"
        - Booking summary card
        - 4-Stage vertical stepper
        - Morning of test push reminder
        Matching exact Wireframe 14
      */}
      <div className="space-y-4">
        
        {/* Top Checkmark Crest & Title */}
        <div className="flex flex-col items-center text-center pt-2 space-y-2">
          <div className="size-16 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-900 shadow-2xs">
            <Check className="size-7" strokeWidth={2.5} />
          </div>

          <div className="space-y-0.5">
            <h1 className="font-display text-xl font-bold text-slate-900 tracking-tight">
              Blood test booked
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Booking ID LB-55210
            </p>
          </div>
        </div>

        {/* Booking Summary Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2.5 shadow-2xs text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Tests</span>
            <span className="font-bold text-slate-900">CBC, TSH, Vit D, HbA1c</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Collection</span>
            <span className="font-semibold text-slate-900">Home · Tue 24, 7–9 AM</span>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 pt-2">
            <span className="text-slate-500">Paid</span>
            <span className="font-bold text-emerald-700">₹0 · Test wallet</span>
          </div>
        </div>

        {/* 
          STATUS SECTION:
          Vertical 4-Stage Stepper matching wireframe
        */}
        <div className="space-y-3">
          <h2 className="font-bold text-xs text-slate-900 uppercase tracking-wider">
            Status
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-4">
            
            {/* Stage 1: Booked (Completed) */}
            <div className="flex items-start gap-3">
              <div className="size-5 rounded-full bg-[#2A0E1A] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Check className="size-3" strokeWidth={3} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-xs text-slate-900">Booked</p>
                <p className="text-[11px] text-slate-500">Tue 24 Nov, 7–9 AM</p>
              </div>
            </div>

            {/* Connecting line */}
            <div className="ml-2.5 -my-2 w-0.5 h-4 bg-slate-200" />

            {/* Stage 2: Collector assigned */}
            <div className="flex items-start gap-3">
              <div className="size-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-xs text-slate-800">Collector assigned</p>
                <p className="text-[11px] text-slate-400">Name & phone shown here</p>
              </div>
            </div>

            {/* Connecting line */}
            <div className="ml-2.5 -my-2 w-0.5 h-4 bg-slate-200" />

            {/* Stage 3: Sample collected */}
            <div className="flex items-start gap-3">
              <div className="size-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-xs text-slate-800">Sample collected</p>
              </div>
            </div>

            {/* Connecting line */}
            <div className="ml-2.5 -my-2 w-0.5 h-4 bg-slate-200" />

            {/* Stage 4: Report ready */}
            <div className="flex items-start gap-3">
              <div className="size-5 rounded-full border-2 border-slate-300 bg-white flex items-center justify-center shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-xs text-slate-800">Report ready</p>
                <p className="text-[11px] text-slate-400">Usually within 24–48 hrs</p>
              </div>
            </div>

          </div>
        </div>

        {/* Simulated Notification Card: Push · morning of test */}
        <div className="rounded-2xl border border-slate-300 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
            <Bell className="size-4" strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-slate-900">
              Push · morning of test
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Your sample collector is on the way
            </p>
          </div>
        </div>

      </div>

      {/* 
        BOTTOM ACTION BUTTONS:
        - Go to Home
        - Demo: view report
      */}
      <div className="space-y-2 pt-4 pb-2">
        <button
          type="button"
          onClick={handleGoHome}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Go to Home
        </button>

        <button
          type="button"
          onClick={handleDemoReport}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 text-xs font-semibold text-slate-800 shadow-2xs active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Demo: view report
        </button>
      </div>

    </div>
  )
}
