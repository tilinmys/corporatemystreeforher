import { ChevronLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const SPECIALTIES = ['All', 'Gynaecology', 'PCOS', 'Fertility', 'Menopause']

interface Doctor {
  id: string
  name: string
  specialty: string
  experience: string
  languages: string
  nextSlot: string
  initials: string
  avatarColor: string
}

const DOCTORS: Doctor[] = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Rao',
    specialty: 'Gynaecologist · 12 yrs',
    experience: '12 yrs',
    languages: 'English, Hindi, Kannada',
    nextSlot: 'Today, 4:30 PM',
    initials: 'AR',
    avatarColor: 'bg-rose-100 text-rose-950',
  },
  {
    id: 'dr-meera',
    name: 'Dr. Meera Iyer',
    specialty: 'PCOS & Endocrinology · 9 yrs',
    experience: '9 yrs',
    languages: 'English, Tamil',
    nextSlot: 'Today, 6:00 PM',
    initials: 'MI',
    avatarColor: 'bg-rose-100 text-rose-900',
  },
  {
    id: 'dr-kavya',
    name: 'Dr. Kavya Nair',
    specialty: 'Fertility specialist · 15 yrs',
    experience: '15 yrs',
    languages: 'English, Malayalam',
    nextSlot: 'Tomorrow, 10:00 AM',
    initials: 'KN',
    avatarColor: 'bg-emerald-100 text-emerald-900',
  },
]

export function Screen05DoctorList() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const companyName = employeeLink?.company || 'Acme Tech'

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('Gynaecology')

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialty =
        selectedSpecialty === 'All' ||
        doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
      return matchesSearch && matchesSpecialty
    })
  }, [searchQuery, selectedSpecialty])

  const handleBookDoctor = () => {
    setActiveScreen('06')
  }

  return (
    <div className="flex flex-col min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 04)
        - Title "Book a consultation"
        Matching exact Wireframe 05
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('04')}
          aria-label="Back to Home"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Book a consultation
        </h1>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* SEARCH SECTION */}
        <div className="space-y-1.5">
          <label htmlFor="doctor-search" className="block text-xs font-semibold text-slate-600">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-slate-400" strokeWidth={1.5} />
            <input
              id="doctor-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctor, specialty or concern"
              className={cn(
                'block h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
                focusRing,
              )}
            />
          </div>
        </div>

        {/* SPECIALTY FILTER CHIPS (Horizontal row matching wireframe) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SPECIALTIES.map((spec) => {
            const isSelected = selectedSpecialty === spec

            return (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={cn(
                  'h-8 px-3.5 rounded-full text-xs font-semibold transition-all shrink-0',
                  isSelected
                    ? 'bg-[#2A0E1A] text-white shadow-2xs'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                  focusRing,
                )}
              >
                {spec}
              </button>
            )
          })}
        </div>

        {/* DOCTOR LIST SECTION */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-600">
            Doctors on your {companyName} panel
          </p>

          <div className="space-y-3">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3 shadow-2xs hover:border-rose-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Doctor Photo Box */}
                    <div className={cn('size-16 rounded-xl flex items-center justify-center font-display text-sm font-bold shadow-2xs shrink-0', doc.avatarColor)}>
                      {doc.initials}
                    </div>

                    <div className="space-y-0.5">
                      <h3 className="font-display text-sm font-bold text-slate-900">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-slate-600">
                        {doc.specialty}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {doc.languages}
                      </p>
                    </div>
                  </div>

                  {/* Covered Badge */}
                  <span className="text-[10px] font-semibold text-slate-700 bg-slate-50 border border-slate-300 rounded-md px-2 py-0.5 shadow-2xs">
                    Covered
                  </span>
                </div>

                {/* Bottom Row: Next slot + Book button */}
                <div className="flex items-center justify-between border-t border-slate-100 pt-2.5">
                  <span className="text-xs text-slate-500">
                    Next slot: <strong className="text-slate-800">{doc.nextSlot}</strong>
                  </span>

                  <button
                    type="button"
                    onClick={handleBookDoctor}
                    className={cn(
                      'h-8 px-4 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 hover:bg-[#2A0E1A] hover:text-white active:scale-95 transition-all shadow-2xs',
                      focusRing,
                    )}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}

            {filteredDoctors.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center bg-white/60">
                <p className="text-xs font-medium text-slate-600">No doctors found for "{searchQuery}"</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedSpecialty('All')
                  }}
                  className="mt-2 text-xs font-semibold text-rose-950 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  )
}
