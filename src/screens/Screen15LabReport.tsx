import { Bell, ChevronLeft, Download } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

interface LabResult {
  parameter: string
  range: string
  value: string
  status: 'Normal' | 'Low' | 'High'
}

const RESULTS: LabResult[] = [
  { parameter: 'Haemoglobin', range: 'Range 12–15', value: '11.2 g/dL', status: 'Low' },
  { parameter: 'TSH', range: 'Range 0.4–4.0', value: '3.1 µIU/mL', status: 'Normal' },
  { parameter: 'Vitamin D', range: 'Range 30–100', value: '18 ng/mL', status: 'Low' },
  { parameter: 'HbA1c', range: 'Range < 5.7', value: '5.3 %', status: 'Normal' },
]

export function Screen15LabReport() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const handleDownload = () => {
    alert('Verified Clinical Lab Report PDF downloaded.')
  }

  const handleFollowUp = () => {
    setActiveScreen('05')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow <
        - Title "Lab report"
        - Download icon
        Matching exact Wireframe 15
      */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <div className="flex items-center gap-2">
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
          <h1 className="font-display text-base font-bold text-slate-900 tracking-tight">
            Lab report
          </h1>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          aria-label="Download PDF report"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all',
            focusRing,
          )}
        >
          <Download className="size-4.5" strokeWidth={1.5} />
        </button>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* PUSH NOTIFICATION CARD */}
        <div className="rounded-2xl border border-slate-300 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-700">
            <Bell className="size-4" strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-slate-900">
              Push notification
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Your blood test report is ready
            </p>
          </div>
        </div>

        {/* LAB DETAILS CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-2.5">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-display text-xs font-bold text-rose-950 shrink-0">
              Lab
            </div>
            <div className="space-y-0.5">
              <h2 className="font-display text-xs font-bold text-slate-900">
                Neuberg Anand Reference Laboratory
              </h2>
              <p className="text-[11px] text-slate-400">
                Collected 24 Nov · Reported 25 Nov
              </p>
            </div>
          </div>

          <div className="border border-slate-300 rounded-md px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-50 w-fit">
            Reviewed by Dr. Ananya Rao
          </div>
        </div>

        {/* RESULTS SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
            <span>Results</span>
            <span className="text-[10px] text-slate-400 lowercase font-normal">(sample values for demo)</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {RESULTS.map((res) => (
              <div key={res.parameter} className="p-3 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <p className="font-bold text-slate-900">
                    {res.parameter}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {res.range}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 tabular-nums">
                    {res.value}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-semibold px-2 py-0.5 rounded-md border tabular-nums',
                      res.status === 'Normal'
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
                        : 'text-rose-700 bg-rose-50 border-rose-200',
                    )}
                  >
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DOCTOR'S NOTE BOX */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-1.5">
          <h3 className="font-bold text-xs text-slate-900">
            Doctor's note
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mild iron-deficiency anaemia and vitamin D insufficiency detected. Thyroid and glucose regulation within normal limits. Start prescribed supplements and repeat CBC in 8 weeks.
          </p>
        </div>

      </div>

      {/* 
        BOTTOM ACTION BUTTONS:
        - Book free follow-up
        - Download PDF
        Matching exact Wireframe 15
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-slate-100 space-y-2">
        <button
          type="button"
          onClick={handleFollowUp}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Book free follow-up
        </button>

        <button
          type="button"
          onClick={handleDownload}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl border border-slate-300 bg-white hover:bg-slate-50 px-4 text-xs font-semibold text-slate-800 shadow-2xs active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Download PDF
        </button>
      </div>

    </div>
  )
}
