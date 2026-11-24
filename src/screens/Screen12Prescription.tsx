import { Calendar, ChevronLeft, Download, FlaskConical, Moon, Pill, Share2, Stethoscope, Sun, Utensils } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

interface RxMedicine {
  name: string
  timing: 'morning-night' | 'weekly' | 'night'
  timingLabel: string
  mealNote: string
  duration: string
}

const MEDICINES: RxMedicine[] = [
  {
    name: 'Myo-Inositol 500 mg',
    timing: 'morning-night',
    timingLabel: 'Morning & Night',
    mealNote: 'After food',
    duration: '30 days',
  },
  {
    name: 'Vitamin D3 60K IU',
    timing: 'weekly',
    timingLabel: 'Once weekly',
    mealNote: 'After food',
    duration: '8 weeks',
  },
  {
    name: 'Iron & Folic Acid',
    timing: 'night',
    timingLabel: 'Bedtime',
    mealNote: 'After dinner',
    duration: '15 days',
  },
]

const RECOMMENDED_TESTS = ['CBC', 'TSH', 'Vitamin D', 'HbA1c']

export function Screen12Prescription() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const selectedDoctorId = useHerCorporateStore((s) => s.selectedDoctorId)
  const confirmedBooking = useHerCorporateStore((s) => s.confirmedBooking)
  const pushBanner = useHerCorporateStore((s) => s.pushBanner)

  const doc =
    PANEL_DOCTORS.find((d) => d.id === (confirmedBooking?.doctorId || selectedDoctorId)) ??
    PANEL_DOCTORS[0]

  const handleDownload = () => {
    pushBanner({
      title: 'Prescription saved',
      body: `Rx from ${doc.name} saved to your device.`,
      targetScreen: '12',
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Her Prescription',
          text: `Prescription from ${doc.name} for Priya S.`,
        })
        .catch(() => {})
    } else {
      pushBanner({
        title: 'Link copied',
        body: 'Encrypted prescription link copied.',
        targetScreen: '12',
      })
    }
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-12 px-4 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <div className="flex items-center gap-2">
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
          <h1 className="font-display text-base font-bold text-slate-900 tracking-tight">
            My prescription
          </h1>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share Prescription"
            className="grid size-8 place-items-center rounded-lg text-slate-600 hover:bg-rose-50 hover:text-[#2A0E1A] transition-colors"
          >
            <Share2 className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            aria-label="Download Prescription PDF"
            className="grid size-8 place-items-center rounded-lg text-slate-600 hover:bg-rose-50 hover:text-[#2A0E1A] transition-colors"
          >
            <Download className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* CLEAN SCANNABLE PRESCRIPTION BODY */}
      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        {/* COMPACT DOCTOR & DIAGNOSIS HEADER */}
        <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-[#FFF0F5] to-white p-3.5 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="size-10 rounded-xl bg-white border border-rose-200 flex items-center justify-center font-display text-xs font-bold text-[#2A0E1A] shrink-0">
                {doc.initials}
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-sm font-bold text-slate-900 truncate">
                  {doc.name}
                </h2>
                <p className="text-[11px] text-slate-500 truncate">
                  {doc.role} · 23 Nov 2026
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
              {employeeLink ? employeeLink.company : 'Verified Rx'}
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-white/90 border border-rose-100 px-3 py-2 text-xs text-slate-800">
            <Stethoscope className="size-3.5 text-rose-600 shrink-0" />
            <span className="font-semibold truncate">Mild PCOS & hormonal balance</span>
          </div>
        </div>

        {/* MEDICINES LIST: Primary Focus with Intuitive React Icons */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <Pill className="size-3.5 text-rose-600" />
              <span>Medicines (3)</span>
            </h3>
            <span className="text-[11px] font-medium text-slate-500">Priya S.</span>
          </div>

          <div className="space-y-2">
            {MEDICINES.map((med, idx) => (
              <div
                key={med.name}
                className={cn(
                  'rounded-2xl border p-3.5 shadow-2xs space-y-2',
                  idx % 2 === 0
                    ? 'bg-white border-rose-100'
                    : 'bg-[#FFF8FA] border-rose-200/70',
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="size-8 rounded-xl bg-rose-100 text-[#2A0E1A] flex items-center justify-center shrink-0">
                      <Pill className="size-4 text-rose-700" strokeWidth={1.8} />
                    </span>
                    <p className="font-display text-sm font-bold text-slate-900 truncate">
                      {med.name}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-900 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full shrink-0 tabular-nums">
                    <Calendar className="size-2.5 text-rose-600" />
                    {med.duration}
                  </span>
                </div>

                {/* Clear Visual Icon Schedule Chips */}
                <div className="flex items-center gap-1.5 flex-wrap pl-10">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-rose-100 text-[11px] font-semibold text-slate-700">
                    {med.timing === 'morning-night' && (
                      <>
                        <Sun className="size-3 text-amber-500" />
                        <Moon className="size-3 text-rose-600" />
                      </>
                    )}
                    {med.timing === 'weekly' && <Calendar className="size-3 text-rose-600" />}
                    {med.timing === 'night' && <Moon className="size-3 text-rose-700" />}
                    <span>{med.timingLabel}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-white border border-rose-100 text-[11px] font-medium text-slate-600">
                    <Utensils className="size-3 text-emerald-600" />
                    <span>{med.mealNote}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECOMMENDED LAB TESTS (1-Tap to Book) */}
        <div className="rounded-2xl border border-rose-100 bg-white p-3.5 space-y-2 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="size-3.5 text-rose-600" />
              <span>Advised blood tests</span>
            </h3>
            <span className="text-[10px] font-bold text-emerald-700">₹0 wallet</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {RECOMMENDED_TESTS.map((test) => (
              <button
                key={test}
                type="button"
                onClick={() => setActiveScreen('13')}
                className="h-7.5 px-3 rounded-full border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-[11px] font-semibold text-[#2A0E1A] transition-colors"
              >
                {test}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM STICKY ACTION */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-rose-100 flex items-center gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className={cn(
            'h-11 px-4 rounded-xl border border-rose-200 bg-white text-xs font-semibold text-[#2A0E1A] hover:bg-rose-50 active:scale-95 transition-all flex items-center justify-center gap-1.5 shrink-0',
            focusRing,
          )}
        >
          <Download className="size-4" />
          <span>PDF</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('13')}
          className={cn(
            'flex-1 flex h-11 items-center justify-center gap-1.5 rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          <FlaskConical className="size-3.5 text-rose-200" />
          <span>Book blood tests (₹0)</span>
        </button>
      </div>
    </div>
  )
}
