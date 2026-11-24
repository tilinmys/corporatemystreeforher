import { useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

/**
 * 4-Step Deconstructed Splash Sequence (Framer Motion useAnimate GPU-only transforms):
 * - Phase 1 (0ms – 550ms): Logo entrance + elastic spring settle
 * - Phase 2 (550ms – 1300ms): Concentric radial halo pulse + staggered wordmark reveal
 * - Phase 3 (1350ms – 1900ms): Center aperture portal zoom + seamless #FAF7F5 portal expansion
 * - Phase 4 (1920ms): Direct handoff to Welcome / Login ('01'), no Skip button
 */
export function Screen00Splash() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const [scope, animate] = useAnimate()

  useEffect(() => {
    let cancelled = false

    async function runSequence() {
      // Phase 1: Logo Entrance & Elastic Spring Settle (0ms -> 550ms)
      await animate(
        '#splash-logo',
        { scale: [0.3, 1.08, 1], opacity: [0, 1, 1], rotate: [-8, 2, 0] },
        { duration: 0.55, times: [0, 0.65, 1], ease: [0.22, 1, 0.36, 1] },
      )
      if (cancelled) return
      navigator.vibrate?.(10)

      // Phase 2: Radial Halo Pulse + Wordmark Stagger (550ms -> 1300ms)
      const ring1 = animate(
        '#splash-ring-1',
        { scale: [0.85, 2.3], opacity: [0.65, 0] },
        { duration: 0.65, ease: 'easeOut' },
      )
      const ring2 = animate(
        '#splash-ring-2',
        { scale: [0.85, 1.85], opacity: [0.5, 0] },
        { duration: 0.55, delay: 0.12, ease: 'easeOut' },
      )
      const wordmark = animate(
        '#splash-text',
        { opacity: [0, 1], y: [20, 0] },
        { duration: 0.42, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
      )
      await Promise.all([ring1, ring2, wordmark])
      if (cancelled) return

      // Brief readable hold (~250ms)
      await new Promise((r) => setTimeout(r, 240))
      if (cancelled) return

      // Phase 3: Portal Zoom into Logo Center & Seamless #FAF7F5 Dissolve (1350ms -> 1900ms)
      animate(
        '#splash-text',
        { opacity: 0, y: -8 },
        { duration: 0.18, ease: 'easeIn' },
      )
      animate(
        '#splash-logo',
        { scale: [1, 18], opacity: [1, 0] },
        { duration: 0.48, times: [0, 1], ease: [0.7, 0, 0.84, 0] },
      )
      await animate(
        '#splash-portal',
        { scale: [0.05, 26], opacity: [0, 1, 1] },
        { duration: 0.48, delay: 0.12, times: [0, 0.25, 1], ease: [0.65, 0, 0.85, 0] },
      )
      if (cancelled) return

      // Phase 4: Clean Handoff into Welcome / Login
      navigator.vibrate?.([8, 25, 12])
      setActiveScreen('01')
    }

    runSequence()
    return () => {
      cancelled = true
    }
  }, [animate, setActiveScreen])

  return (
    <div
      ref={scope}
      className="relative flex-1 flex flex-col items-center justify-center min-h-full bg-gradient-to-b from-[#1E0826] via-[#2E0B38] to-[#19051F] text-white overflow-hidden select-none"
    >
      {/* Subtle Ambient Radial Glow */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.22)_0%,_rgba(225,29,72,0.12)_45%,_transparent_75%)] pointer-events-none"
      />

      {/* Stage Center: Anchors Logo, Rings, and Portal Expand at exact same origin */}
      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center size-24">
          {/* Concentric Pulse Rings */}
          <div
            id="splash-ring-1"
            aria-hidden
            style={{ opacity: 0 }}
            className="absolute inset-0 rounded-full border-2 border-purple-400 pointer-events-none"
          />
          <div
            id="splash-ring-2"
            aria-hidden
            style={{ opacity: 0 }}
            className="absolute inset-0 rounded-full border border-rose-400 pointer-events-none"
          />

          {/* Official Crimson Emblem */}
          <div
            id="splash-logo"
            style={{ opacity: 0, transformOrigin: '50% 50%' }}
            className="relative z-10 size-24 rounded-full overflow-hidden bg-[#80000D] border-2 border-white/40 shadow-[0_14px_40px_-6px_rgba(168,85,247,0.55)] flex items-center justify-center p-1"
          >
            <img
              src="/her-logo.png"
              alt="Her"
              className="size-full object-contain rounded-full"
            />
          </div>

          {/* Center Portal Circle that expands smoothly into #FAF7F5 Welcome canvas */}
          <div
            id="splash-portal"
            aria-hidden
            style={{ opacity: 0, transformOrigin: '50% 50%' }}
            className="absolute z-20 size-12 rounded-full bg-[#FAF7F5] pointer-events-none"
          />
        </div>

        {/* Staggered Wordmark */}
        <div
          id="splash-text"
          style={{ opacity: 0 }}
          className="mt-5 flex flex-col items-center text-center z-10 pointer-events-none"
        >
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">
            Her
          </h1>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[1.8px] text-purple-200">
            WOMEN&apos;S CORPORATE CARE
          </p>
        </div>
      </div>
    </div>
  )
}
