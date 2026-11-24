import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen00Splash() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const [stage, setStage] = useState<'intro' | 'glow' | 'reveal' | 'ready'>('intro')

  // Carefully orchestrated splash animation timeline (2.4s total)
  useEffect(() => {
    const t1 = setTimeout(() => setStage('glow'), 400)
    const t2 = setTimeout(() => setStage('reveal'), 900)
    const t3 = setTimeout(() => setStage('ready'), 1600)
    const t4 = setTimeout(() => {
      setActiveScreen('01')
    }, 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [setActiveScreen])

  const handleSkipOrProceed = () => {
    setActiveScreen('01')
  }

  return (
    <div
      onClick={handleSkipOrProceed}
      className="relative flex flex-col items-center justify-between min-h-full px-6 py-10 bg-gradient-to-b from-[#25050C] via-[#3D0B14] to-[#1A0308] text-white selection:bg-rose-900 cursor-pointer overflow-hidden select-none"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.18)_0%,_transparent_70%)] pointer-events-none" />

      {/* Top subtle skip indicator */}
      <div className="w-full flex justify-end shrink-0 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleSkipOrProceed()
          }}
          className="text-xs font-medium text-white/50 hover:text-white px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Cinematic Animated Logo & Wordmark */}
      <div className="my-auto flex flex-col items-center text-center space-y-5 z-10">
        
        {/* Animated Crimson Emblem with Breathing Glow */}
        <div
          className={cn(
            'relative transition-all duration-1000 ease-out transform',
            stage === 'intro' && 'scale-75 opacity-0 blur-md',
            stage === 'glow' && 'scale-105 opacity-90 blur-0',
            (stage === 'reveal' || stage === 'ready') && 'scale-100 opacity-100',
          )}
        >
          {/* Pulsing Luminous Aura */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-rose-600/40 via-rose-400/20 to-amber-300/10 blur-xl animate-pulse" />
          
          <div className="relative size-24 sm:size-28 rounded-full overflow-hidden shadow-[0_16px_45px_-8px_rgba(225,29,72,0.6)] border-2 border-white/40 flex items-center justify-center p-1 bg-[#80000D]">
            <img
              src="/her-logo.png"
              alt="Her"
              className="size-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Title Reveal */}
        <div
          className={cn(
            'transition-all duration-700 ease-out transform space-y-1.5',
            stage === 'intro' && 'translate-y-4 opacity-0',
            stage === 'glow' && 'translate-y-2 opacity-50',
            (stage === 'reveal' || stage === 'ready') && 'translate-y-0 opacity-100',
          )}
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-md">
            Her
          </h1>

          <p
            className={cn(
              'text-xs sm:text-sm text-rose-100/80 font-medium tracking-wide transition-all duration-700 delay-200 max-w-xs',
              stage === 'ready' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
            )}
          >
            Personal care, backed by your workplace.
          </p>
        </div>

      </div>

      {/* Bottom Loading Progress Bar */}
      <div className="w-full max-w-[200px] flex flex-col items-center space-y-2 shrink-0 z-20">
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full bg-gradient-to-r from-rose-400 to-amber-200 rounded-full transition-all duration-[2400ms] ease-out',
              stage === 'intro' && 'w-0',
              stage !== 'intro' && 'w-full',
            )}
          />
        </div>
        <span className="text-[10px] text-white/40 font-medium tracking-wider uppercase">
          Launching App
        </span>
      </div>

    </div>
  )
}
