import { ChevronLeft, Clock, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { BottomNav } from '../design-system/BottomNav'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

const SPECIALTIES = ['All', 'Gynaecology', 'PCOS', 'Fertility', 'Menopause'] as const

export function Screen05DoctorList() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const setSelectedDoctorId = useHerCorporateStore((s) => s.setSelectedDoctorId)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const companyName = employeeLink?.company || 'Acme Tech'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All')

  const filteredDoctors = useMemo(() => {
    return PANEL_DOCTORS.filter((doc) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        doc.name.toLowerCase().includes(q) ||
        doc.role.toLowerCase().includes(q) ||
        doc.specialtyTag.toLowerCase().includes(q)
      const matchesSpecialty =
        selectedSpecialty === 'All' || doc.specialtyTag === selectedSpecialty
      return matchesSearch && matchesSpecialty
    })
  }, [searchQuery, selectedSpecialty])

  const handleBookDoctor = (id: string) => {
    setSelectedDoctorId(id)
    setActiveScreen('06')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-12 px-4 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setActiveScreen('04')}
            aria-label="Back to Home"
            className={cn(
              'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#2A0E1A] active:scale-95 transition-all -ml-1',
              focusRing,
            )}
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
            Specialists
          </h1>
        </div>
        {employeeLink && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {employeeLink.consultsLeft} free left
          </span>
        )}
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 px-4 py-3 space-y-3">
        
        {/* SEARCH INPUT */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-2.5 size-4 text-rose-400" strokeWidth={1.8} />
          <input
            id="doctor-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search doctor or concern"
            className={cn(
              'block h-9.5 w-full rounded-xl border border-rose-200/80 bg-white pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200/60 transition-colors shadow-2xs',
              focusRing,
            )}
          />
        </div>

        {/* SPECIALTY FILTER CHIPS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {SPECIALTIES.map((spec) => {
            const isSelected = selectedSpecialty === spec
            return (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={cn(
                  'h-7.5 px-3 rounded-full text-[11px] font-semibold transition-all shrink-0',
                  isSelected
                    ? 'bg-[#2A0E1A] text-white shadow-2xs'
                    : 'border border-rose-200 bg-white text-slate-700 hover:bg-rose-50',
                  focusRing,
                )}
              >
                {spec}
              </button>
            )
          })}
        </div>

        {/* COMPACT LOOPED DOCTOR LIST */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-rose-900/75 uppercase tracking-wider">
            {employeeLink ? `${companyName} Panel` : 'Available Doctors'}
          </p>

          <div className="space-y-2">
            {filteredDoctors.map((doc, idx) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleBookDoctor(doc.id)}
                className={cn(
                  'w-full text-left rounded-2xl border p-3 shadow-2xs transition-all active:scale-[0.99] flex items-center justify-between gap-2.5 group',
                  idx % 2 === 0
                    ? 'bg-white border-rose-100 hover:border-rose-300'
                    : 'bg-[#FFF7F9] border-rose-200/70 hover:border-rose-400',
                  focusRing,
                )}
              >
                {/* Left: Avatar + Compact Details */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="size-12 rounded-xl bg-gradient-to-br from-rose-100 to-rose-200 text-[#2A0E1A] border border-rose-200 flex items-center justify-center font-display text-sm font-bold shrink-0 group-hover:scale-105 transition-transform">
                    {doc.initials}
                  </div>

                  <div className="min-w-0 space-y-0.5">
                    <h3 className="font-display text-sm font-bold text-slate-900 truncate leading-tight">
                      {doc.name}
                    </h3>
                    <p className="text-[11px] font-medium text-slate-600 truncate">
                      {doc.role} · {doc.experience}
                    </p>
                    <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700">
                      <Clock className="size-2.5" />
                      <span>{doc.nextSlot}</span>
                    </p>
                  </div>
                </div>

                {/* Right: Covered Tag + Book Pill */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                    {employeeLink ? '₹0 Covered' : 'Available'}
                  </span>
                  <span className="h-7 px-3 rounded-full bg-[#2A0E1A] group-hover:bg-rose-700 text-white text-[11px] font-semibold flex items-center justify-center transition-colors">
                    Book
                  </span>
                </div>
              </button>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="rounded-2xl border border-dashed border-rose-200 p-5 text-center bg-white">
                <p className="text-xs font-medium text-slate-600">No doctors match "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedSpecialty('All')
                  }}
                  className="mt-1.5 text-xs font-semibold text-rose-800 hover:underline"
                >
                  Show all doctors
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SHARED DOCKED BOTTOM NAVBAR */}
      <BottomNav active="care" />
    </div>
  )
}
