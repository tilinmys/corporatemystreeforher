import { ChevronLeft, Info } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen03dPeriodLength() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const storedPeriodLength = useHerCorporateStore((s) => s.period_length)
  const setPeriodLength = useHerCorporateStore((s) => s.setPeriodLength)
  const setCycleSetupSkipped = useHerCorporateStore((s) => s.setCycleSetupSkipped)

  const [days, setDays] = useState<number>(storedPeriodLength || 5)

  const handleSkip = () => {
    setCycleSetupSkipped(true)
    setActiveScreen('04')
  }

  const handleNotSure = () => {
    setPeriodLength(5)
    setActiveScreen('03e')
  }

  const handleNext = () => {
    setPeriodLength(days)
    setActiveScreen('03e')
  }

  // Common options displayed in the horizontal strip matching wireframe: [3] [4] [5] [6] [7]
  const options = [2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow <
        - Title "Step 2 of 3 · Cycle setup"
        - Skip button
        - 3-segment progress bar (2 filled)
        Matching exact Wireframe 03d
      */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <header className="flex items-center justify-between h-12 px-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveScreen('03c')}
              aria-label="Back to Step 1"
              className={cn(
                'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
                focusRing,
              )}
            >
              <ChevronLeft className="size-5" strokeWidth={2} />
            </button>
            <h1 className="font-display text-xs font-bold text-slate-900 tracking-tight">
              Step 2 of 3 · Cycle setup
            </h1>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className={cn(
              'text-xs font-semibold text-slate-500 hover:text-slate-900 px-2 py-1 rounded-md transition-colors',
              focusRing,
            )}
          >
            Skip
          </button>
        </header>

        {/* 3-segment Progress Bar: Bars 1 & 2 active */}
        <div className="grid grid-cols-3 gap-1.5 px-4 pb-2.5">
          <div className="h-1 rounded-full bg-[#2A0E1A]" />
          <div className="h-1 rounded-full bg-[#2A0E1A]" />
          <div className="h-1 rounded-full bg-slate-200" />
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-5 flex flex-col justify-between space-y-6">
        
        {/* Editorial Heading */}
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-tight text-slate-900 leading-snug">
            How many days does your period usually last?
          </h2>
          <p className="text-xs text-slate-500">
            Count the days of bleeding. Swipe to change.
          </p>
        </div>

        {/* 
          HORIZONTAL NUMBER PICKER:
          Matching exact wireframe: [3] [4] [5] [6] [7] with prominent selected dark pill
        */}
        <div className="my-auto py-4 space-y-4 text-center">
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-2 px-1 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {options.map((num) => {
              const isSelected = num === days

              return (
                <button
                  key={num}
                  type="button"
                  onClick={() => setDays(num)}
                  className={cn(
                    'transition-all duration-200 flex flex-col items-center justify-center select-none active:scale-95',
                    isSelected
                      ? 'w-16 h-22 rounded-2xl bg-[#2A0E1A] text-white shadow-md scale-105 ring-2 ring-rose-950/30'
                      : 'w-13 h-18 rounded-2xl border border-slate-300 bg-white text-slate-800 hover:border-rose-300 hover:bg-rose-50/50 shadow-2xs',
                    focusRing,
                  )}
                >
                  <span
                    className={cn(
                      'font-display font-bold tabular-nums',
                      isSelected ? 'text-3xl' : 'text-lg',
                    )}
                  >
                    {num}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Subtitle "days" */}
          <p className="text-xs font-semibold text-slate-500">
            days
          </p>

          {/* Outline Button: Not sure */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleNotSure}
              className={cn(
                'inline-flex h-10 items-center justify-center rounded-full border border-slate-300 bg-white px-8 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:border-rose-300 active:scale-95 transition-all',
                focusRing,
              )}
            >
              Not sure
            </button>
          </div>
        </div>

        {/* Clinical Context Card to eliminate dead whitespace */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-start gap-2.5 shadow-2xs">
          <Info className="size-4 text-rose-900 shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Menstrual bleeding between 3 and 7 days is considered normal by the American College of Obstetricians and Gynecologists (ACOG).
          </p>
        </div>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Next" button docked at bottom
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5]">
        <button
          type="button"
          onClick={handleNext}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Next
        </button>
      </div>

    </div>
  )
}
