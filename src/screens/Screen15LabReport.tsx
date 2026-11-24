import { AlertCircle, CheckCircle2, ChevronLeft, Download, Stethoscope } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

interface LabResult {
  parameter: string
  range: string
  value: string
  status: 'Normal' | 'Low'
}

const ATTENTION_RESULTS: LabResult[] = [
  { parameter: 'Haemoglobin', range: '12–15', value: '11.2 g/dL', status: 'Low' },
  { parameter: 'Vitamin D', range: '30–100', value: '18 ng/mL', status: 'Low' },
]

const NORMAL_RESULTS: LabResult[] = [
  { parameter: 'TSH', range: '0.4–4.0', value: '3.1 µIU/mL', status: 'Normal' },
  { parameter: 'HbA1c', range: '< 5.7%', value: '5.3 %', status: 'Normal' },
]

export function Screen15LabReport() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const confirmedBooking = useHerCorporateStore((s) => s.confirmedBooking)
  const selectedDoctorId = useHerCorporateStore((s) => s.selectedDoctorId)
  const pushBanner = useHerCorporateStore((s) => s.pushBanner)

  const doc =
    PANEL_DOCTORS.find((d) => d.id === (confirmedBooking?.doctorId || selectedDoctorId)) ??
    PANEL_DOCTORS[0]

  const handleDownload = () => {
    pushBanner({
      title: 'Report saved',
      body: 'Verified blood report PDF saved.',
      targetScreen: '15',
    })
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* HEADER */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-11.5 px-4 bg-white/95 backdrop-blur-md border-b border-purple-100 shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveScreen('04')}
            aria-label="Back to Home"
            className={cn(
              'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-purple-50 hover:text-[#3B0764] active:scale-95 transition-all -ml-1',
              focusRing,
            )}
          >
            <ChevronLeft className="size-5" strokeWidth={2} />
          </button>
          <h1 className="font-display text-sm font-bold text-slate-900 tracking-tight">
            Lab report
          </h1>
        </div>

        <span className="text-[10px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
          25 Nov · Neuberg Lab
        </span>
      </header>

      {/* RANKED TRIAGE BODY — ZERO SCROLL WITH DISTINCT COLOR & BORDER SEPARATION */}
      <div className="flex-1 px-4 py-3 flex flex-col justify-between gap-2.5">
        
        {/* PRIORITY #1 GRID: ATTENTION NEEDED (High-Contrast Pink/Crimson Border & Surface) */}
        <div className="rounded-2xl border-2 border-rose-400 bg-gradient-to-br from-[#FFF0F5] via-[#FFE4EC] to-white p-3.5 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-rose-800">
              <AlertCircle className="size-3.5 text-rose-600" />
              Attention needed (2)
            </span>
            <span className="text-[10px] font-bold bg-rose-600 text-white px-2 py-0.5 rounded-full">
              Low
            </span>
          </div>

          <div className="space-y-2">
            {ATTENTION_RESULTS.map((res) => (
              <div
                key={res.parameter}
                className="rounded-xl border border-rose-200 bg-white px-3 py-2.5 flex items-center justify-between"
              >
                <div>
                  <p className="font-display text-xs font-bold text-slate-900">
                    {res.parameter}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Target {res.range}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-rose-700 tabular-nums">
                    {res.value}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-200">
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRIORITY #2 GRID: DOCTOR'S NOTE (Distinct Royal Purple Contrast) */}
        <div className="rounded-2xl border-2 border-purple-300 bg-[#F5F3FF] p-3.5 shadow-2xs space-y-1.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#4C1D95] flex items-center gap-1.5">
              <Stethoscope className="size-3.5 text-purple-700" />
              {doc.name} · Note
            </h2>
          </div>
          <p className="text-xs text-[#2E1065] leading-relaxed font-medium">
            Mild iron & Vitamin D deficiency. Start supplements; retest CBC in 8 weeks.
          </p>
        </div>

        {/* PRIORITY #3 GRID: NORMAL MARKERS (Separated Calm 2-Column White/Emerald Grid) */}
        <div className="rounded-2xl border border-emerald-200 bg-white p-3.5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              Normal range (2)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {NORMAL_RESULTS.map((res) => (
              <div
                key={res.parameter}
                className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-2.5 space-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-bold text-slate-900">
                    {res.parameter}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700">Normal</span>
                </div>
                <p className="font-bold text-xs text-emerald-900 tabular-nums">{res.value}</p>
                <p className="text-[10px] text-slate-500">Ref {res.range}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* BOTTOM ACTIONS */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-purple-100 flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleDownload}
          className={cn(
            'h-11 px-4 rounded-xl border border-purple-200 bg-white hover:bg-purple-50 text-xs font-semibold text-[#4C1D95] flex items-center justify-center gap-1.5 shrink-0',
            focusRing,
          )}
        >
          <Download className="size-4" />
          <span>PDF</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('05')}
          className={cn(
            'flex-1 flex h-11 items-center justify-center rounded-xl bg-[#4C1D95] hover:bg-[#3B0764] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Book free follow-up
        </button>
      </div>
    </div>
  )
}
