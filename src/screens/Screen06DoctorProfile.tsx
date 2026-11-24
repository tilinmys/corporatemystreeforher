import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

const DATES = [
  { dayNum: 24, dayName: 'Tue' },
  { dayNum: 25, dayName: 'Wed' },
  { dayNum: 26, dayName: 'Thu' },
  { dayNum: 27, dayName: 'Fri' },
  { dayNum: 28, dayName: 'Sat' },
]

const SLOTS = [
  { time: '10:00 AM', available: true },
  { time: '11:30 AM', available: true },
  { time: '2:00 PM', available: true },
  { time: '4:30 PM', available: true },
  { time: '5:00 PM', available: true },
  { time: '6:30 PM', available: false },
]

export function Screen06DoctorProfile() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const selectedDoctorId = useHerCorporateStore((s) => s.selectedDoctorId)
  const setBookingDraft = useHerCorporateStore((s) => s.setBookingDraft)

  const doc = PANEL_DOCTORS.find((d) => d.id === selectedDoctorId) ?? PANEL_DOCTORS[0]
  const companyName = employeeLink?.company || 'Acme Tech'

  const [consultType, setConsultType] = useState<'video' | 'inclinic'>('video')
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState('4:30 PM')

  const selectedDate = DATES[selectedDateIndex]

  const handleContinue = () => {
    setBookingDraft({
      doctorId: doc.id,
      consultType,
      dateLabel: `${selectedDate.dayName} ${selectedDate.dayNum} Nov`,
      slotTime: selectedSlot,
    })
    setActiveScreen('07')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <button
          type="button"
          onClick={() => setActiveScreen('05')}
          aria-label="Back to Doctor List"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#2A0E1A] active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Doctor profile
        </h1>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        {/* DOCTOR INFO CARD */}
        <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-br from-[#FFF0F5] via-white to-white p-4 shadow-2xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="size-15 rounded-xl bg-rose-100 text-[#2A0E1A] border border-rose-200 font-display text-base font-bold flex items-center justify-center shadow-2xs shrink-0">
              {doc.initials}
            </div>
            <div className="space-y-0.5">
              <h2 className="font-display text-base font-bold text-slate-900">
                {doc.name}
              </h2>
              <p className="text-xs font-medium text-rose-800">
                {doc.role} · {doc.credentials}
              </p>
              <p className="text-[11px] text-slate-500">
                {doc.experience} · {doc.languages}
              </p>
            </div>
          </div>

          <div className="inline-block border border-emerald-200 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50">
            {employeeLink ? `Covered by ${companyName} · ₹0` : 'Specialist consultation'}
          </div>
        </div>

        {/* ABOUT */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
            About
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed bg-white rounded-xl border border-rose-100 p-3 shadow-2xs">
            {doc.about}
          </p>
        </div>

        {/* CONSULTATION TYPE */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
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
                  : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
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
                  : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
                focusRing,
              )}
            >
              In-clinic visit
            </button>
          </div>
        </div>

        {/* SELECT DATE */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
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
                    'h-13 rounded-xl flex flex-col items-center justify-center transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-rose-100 bg-white text-slate-700 hover:bg-rose-50',
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

        {/* AVAILABLE SLOTS */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
            Available slots
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot.time && slot.available

              if (!slot.available) {
                return (
                  <div
                    key={slot.time}
                    className="h-9.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 flex items-center justify-center text-xs text-slate-400 cursor-not-allowed select-none"
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
                    'h-9.5 rounded-xl text-xs font-semibold transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-rose-100 bg-white text-slate-800 hover:bg-rose-50',
                    focusRing,
                  )}
                >
                  {slot.time}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM STICKY ACTION */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-rose-100">
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
