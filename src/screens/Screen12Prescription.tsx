import { ChevronLeft, Download, Share2 } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

const MEDICINES = [
  {
    name: 'Myo-Inositol & D-Chiro-Inositol 500 mg',
    dosage: '1-0-1 · After food',
    duration: '30 days',
  },
  {
    name: 'Cholecalciferol (Vitamin D3) 60K IU',
    dosage: 'Once a week · After food',
    duration: '8 weeks',
  },
  {
    name: 'Ferrous Ascorbate & Folic Acid',
    dosage: '0-0-1 · Bedtime',
    duration: '15 days',
  },
]

const RECOMMENDED_TESTS = ['CBC', 'Thyroid (TSH)', 'Vitamin D', 'HbA1c']

export function Screen12Prescription() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const companyName = employeeLink?.company || 'Acme Tech'

  const handleDownload = () => {
    alert('Prescription PDF downloaded to device.')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Her Corporate Health Prescription',
        text: 'Prescription from Dr. Ananya Rao for Priya S.',
      }).catch(() => {})
    } else {
      alert('Prescription link copied to clipboard.')
    }
  }

  const handleBookTests = () => {
    setActiveScreen('13')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow <
        - Title "Prescription"
        - Download icon
        Matching exact Wireframe 12
      */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveScreen('11')}
            aria-label="Back to Consultation Complete"
            className={cn(
              'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
              focusRing,
            )}
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <h1 className="font-display text-base font-bold text-slate-900 tracking-tight">
            Prescription
          </h1>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          aria-label="Download Prescription PDF"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all',
            focusRing,
          )}
        >
          <Download className="size-4.5" strokeWidth={1.5} />
        </button>
      </header>

      {/* MAIN PRESCRIPTION LETTERHEAD CONTENT */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* DOCTOR & PATIENT CLINICAL LETTERHEAD CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-display text-xs font-bold text-rose-900 shrink-0">
                Her
              </div>
              <div>
                <h2 className="font-display text-sm font-bold text-slate-900">
                  Dr. Ananya Rao
                </h2>
                <p className="text-[11px] text-slate-500">
                  MBBS, MS (OBG) · Reg. No. 58392
                </p>
              </div>
            </div>

            <span className="text-[11px] font-medium text-slate-400 tabular-nums">
              23 Nov 2026
            </span>
          </div>

          <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between text-xs text-slate-600">
            <span>Patient: <strong>Priya S.</strong> · 29 F</span>
            <span className="text-emerald-700 font-semibold">{companyName}</span>
          </div>
        </div>

        {/* SECTION: DIAGNOSIS & NOTES */}
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Diagnosis & notes
          </h3>
          <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-2xs text-xs text-slate-600 leading-relaxed">
            Mild Dysmenorrhea & Hormonal Imbalance (suspected early PCOS). Advised balanced low-GI nutrition, hydration, and diagnostic blood panel.
          </div>
        </div>

        {/* SECTION: MEDICINES */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Medicines
          </h3>

          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {MEDICINES.map((med, idx) => (
              <div key={idx} className="p-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">
                    {med.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {med.dosage}
                  </p>
                </div>

                <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 tabular-nums shrink-0">
                  {med.duration}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: RECOMMENDED TESTS */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Recommended tests
          </h3>

          <div className="flex items-center gap-2 flex-wrap">
            {RECOMMENDED_TESTS.map((test) => (
              <span
                key={test}
                className="h-8 px-3 rounded-full border border-slate-300 bg-white text-xs font-semibold text-slate-800 flex items-center shadow-2xs"
              >
                {test}
              </span>
            ))}
          </div>
        </div>

        {/* SECTION: FOLLOW-UP & ACTIONS */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-800">Follow-up</span>
            <span className="text-emerald-700 font-semibold">In 4 weeks · Free</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleDownload}
              className={cn(
                'h-10 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-1.5',
                focusRing,
              )}
            >
              <Download className="size-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className={cn(
                'h-10 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-1.5',
                focusRing,
              )}
            >
              <Share2 className="size-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Book these tests" button
        Matching exact Wireframe 12
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-slate-100">
        <button
          type="button"
          onClick={handleBookTests}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Book these tests
        </button>
      </div>

    </div>
  )
}
