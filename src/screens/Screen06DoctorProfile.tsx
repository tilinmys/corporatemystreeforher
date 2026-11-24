import { ChevronLeft, Video, Building2 } from 'lucide-react'
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
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-11.5 px-4 bg-white/95 backdrop-blur-md border-b border-purple-100 shrink-0">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setActiveScreen('05')}
            aria-label="Back to Doctor List"
            className={cn(
              'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-purple-50 hover:text-[#3B0764] active:scale-95 transition-all -ml-1',
              focusRing,
            )}
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <h1 className="ml-2 font-display text-sm font-bold text-slate-900 tracking-tight">
            Book slot
          </h1>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          {employeeLink ? `${companyName} · ₹0` : 'Available'}
        </span>
      </header>

      {/* COMPACT ZERO-SCROLL BODY */}
      <div className="flex-1 px-4 py-2.5 flex flex-col justify-between gap-2.5">
        
        {/* GRID 1: DOCTOR HERO + COMPACT ABOUT INSIDE FIRST GRID */}
        <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-[#F5F3FF] via-white to-[#FFF0F5] p-3.5 shadow-2xs space-y-2.5">
          <div className="flex items-center gap-3">
            <div className="size-13 rounded-xl bg-gradient-to-br from-[#4C1D95] to-[#9D174D] text-white font-display text-sm font-bold flex items-center justify-center shadow-xs shrink-0">
              {doc.initials}
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-base font-bold text-slate-900 truncate">
                {doc.name}
              </h2>
              <p className="text-xs font-semibold text-purple-800 truncate">
                {doc.role} · {doc.credentials}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {doc.experience} · {doc.languages}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-600 leading-relaxed border-t border-purple-100 pt-2 line-clamp-2">
            {doc.about}
          </p>
        </div>

        {/* GRID 2: CONSULTATION MODE (Pink & White Grid) */}
        <div className="rounded-2xl border border-rose-200/80 bg-[#FFF5F8] p-3 space-y-2">
          <h3 className="text-[11px] font-bold text-rose-900 uppercase tracking-wider">
            Mode
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setConsultType('video')}
              className={cn(
                'h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all',
                consultType === 'video'
                  ? 'bg-[#4C1D95] text-white shadow-2xs'
                  : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
                focusRing,
              )}
            >
              <Video className="size-3.5" />
              <span>Video consult</span>
            </button>
            <button
              type="button"
              onClick={() => setConsultType('inclinic')}
              className={cn(
                'h-9 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all',
                consultType === 'inclinic'
                  ? 'bg-[#4C1D95] text-white shadow-2xs'
                  : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
                focusRing,
              )}
            >
              <Building2 className="size-3.5" />
              <span>In-clinic</span>
            </button>
          </div>
        </div>

        {/* GRID 3: DATE + TIME SLOTS (Crisp White + Purple Border) */}
        <div className="rounded-2xl border border-purple-200 bg-white p-3 space-y-2.5 shadow-2xs">
          <h3 className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">
            Date & Time
          </h3>

          <div className="grid grid-cols-5 gap-1.5">
            {DATES.map((item, idx) => {
              const isSelected = selectedDateIndex === idx
              return (
                <button
                  key={item.dayNum}
                  type="button"
                  onClick={() => setSelectedDateIndex(idx)}
                  className={cn(
                    'h-12 rounded-xl flex flex-col items-center justify-center transition-all select-none',
                    isSelected
                      ? 'bg-[#4C1D95] text-white shadow-2xs'
                      : 'border border-purple-100 bg-purple-50/50 text-slate-700 hover:bg-purple-100/70',
                    focusRing,
                  )}
                >
                  <span className="font-display text-sm font-bold tabular-nums leading-none">
                    {item.dayNum}
                  </span>
                  <span className="text-[10px] font-medium opacity-85 mt-0.5">
                    {item.dayName}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-3 gap-1.5 pt-0.5">
            {SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot.time && slot.available
              if (!slot.available) {
                return (
                  <div
                    key={slot.time}
                    className="h-9 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center text-[11px] text-slate-400 cursor-not-allowed"
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
                    'h-9 rounded-xl text-[11px] font-semibold transition-all select-none',
                    isSelected
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'border border-rose-200/80 bg-[#FFF7F9] text-slate-800 hover:bg-rose-100/70',
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

      {/* BOTTOM ACTION */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-purple-100 shrink-0">
        <button
          type="button"
          onClick={handleContinue}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#4C1D95] hover:bg-[#3B0764] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Continue · {selectedDate.dayName} {selectedDate.dayNum}, {selectedSlot}
        </button>
      </div>
    </div>
  )
}
