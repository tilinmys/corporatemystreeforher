import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const DATES = [
  { dayNum: 23, dayName: 'Mon' },
  { dayNum: 24, dayName: 'Tue' },
  { dayNum: 25, dayName: 'Wed' },
  { dayNum: 26, dayName: 'Thu' },
  { dayNum: 27, dayName: 'Fri' },
]

const SLOTS = [
  { time: '10:00 AM', available: true },
  { time: '11:30 AM', available: true },
  { time: '2:00 PM', available: true },
  { time: '4:30 PM', available: true },
  { time: '5:00 PM', available: true },
  { time: '6:30 PM', available: false }, // Dashed / unavailable
]

export function Screen06DoctorProfile() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const companyName = employeeLink?.company || 'Acme Tech'

  const [consultType, setConsultType] = useState<'video' | 'inclinic'>('video')
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState('4:30 PM')

  const selectedDate = DATES[selectedDateIndex]

  const handleContinue = () => {
    setActiveScreen('07')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 05)
        - Title "Doctor profile"
        Matching exact Wireframe 06
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('05')}
          aria-label="Back to Doctor List"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Doctor profile
        </h1>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* DOCTOR INFO CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="size-16 rounded-xl bg-rose-100 text-rose-950 font-display text-sm font-bold flex items-center justify-center shadow-2xs shrink-0">
              AR
            </div>
            <div className="space-y-0.5">
              <h2 className="font-display text-base font-bold text-slate-900">
                Dr. Ananya Rao
              </h2>
              <p className="text-xs text-slate-600">
                Gynaecologist · MBBS, MS (OBG)
              </p>
              <p className="text-[11px] text-slate-400">
                12 yrs · English, Hindi, Kannada
              </p>
            </div>
          </div>

          <div className="inline-block border border-slate-300 rounded-md px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-50">
            Covered by {companyName} · ₹0
          </div>
        </div>

        {/* SECTION: ABOUT */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            About
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-white rounded-xl border border-slate-200 p-3 shadow-2xs">
            Senior specialist with over 12 years of clinical practice in women's health, menstrual disorders, PCOS management, and preconception care. Trained at Manipal Hospital and St. John's Medical College.
          </p>
        </div>

        {/* SECTION: CONSULTATION TYPE */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Consultation type
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConsultType('video')}
              className={cn(
                'h-9 px-4 rounded-full text-xs font-semibold transition-all',
                consultType === 'video'
                  ? 'bg-[#2A0E1A] text-white shadow-2xs'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                focusRing,
              )}
            >
              Video consult
            </button>
            <button
              type="button"
              onClick={() => setConsultType('inclinic')}
              className={cn(
                'h-9 px-4 rounded-full text-xs font-semibold transition-all',
                consultType === 'inclinic'
                  ? 'bg-[#2A0E1A] text-white shadow-2xs'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                focusRing,
              )}
            >
              In-clinic visit
            </button>
          </div>
        </div>

        {/* SECTION: SELECT DATE */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Select date
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {DATES.map((item, idx) => {
              const isSelected = selectedDateIndex === idx

              return (
                <button
                  key={item.dayNum}
                  type="button"
                  onClick={() => setSelectedDateIndex(idx)}
                  className={cn(
                    'h-14 rounded-xl flex flex-col items-center justify-center transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                    focusRing,
                  )}
                >
                  <span className="font-display text-sm font-bold tabular-nums">
                    {item.dayNum}
                  </span>
                  <span className="text-[10px] font-medium opacity-80">
                    {item.dayName}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION: AVAILABLE SLOTS */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Available slots
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot.time && slot.available

              if (!slot.available) {
                return (
                  <div
                    key={slot.time}
                    className="h-10 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 flex items-center justify-center text-xs text-slate-400 cursor-not-allowed select-none"
                  >
                    {slot.time}
                  </div>
                )
              }

              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => setSelectedSlot(slot.time)}
                  className={cn(
                    'h-10 rounded-xl text-xs font-semibold transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
                    focusRing,
                  )}
                >
                  {slot.time}
                </button>
              )
            })}
          </div>
          <p className="text-[11px] text-slate-400">
            Dashed = booked / unavailable
          </p>
        </div>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Continue · Mon 23, 4:30 PM" button
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-slate-100">
        <button
          type="button"
          onClick={handleContinue}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Continue · {selectedDate.dayName} {selectedDate.dayNum}, {selectedSlot}
        </button>
      </div>

    </div>
  )
}
