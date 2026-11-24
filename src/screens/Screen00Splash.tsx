import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen00Splash() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  // Native-feeling launch sequence (~2.2s, auto-advances smoothly to Welcome)
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveScreen('01')
    }, 2200)
    return () => clearTimeout(timer)
  }, [setActiveScreen])

  return (
    <div
      onClick={() => setActiveScreen('01')}
      className="relative flex flex-col items-center justify-between min-h-full px-6 py-8 bg-gradient-to-b from-[#2A0E1A] via-[#4A1228] to-[#1D0711] text-white cursor-pointer overflow-hidden select-none"
    >
      {/* Floating ambient pink silk orbs */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.25, 0.45, 0.3], scale: [0.95, 1.15, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 -left-16 size-72 rounded-full bg-rose-500/25 blur-3xl pointer-events-none"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0.2, 0.38, 0.25], scale: [1, 1.2, 0.98] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        className="absolute bottom-1/4 -right-16 size-72 rounded-full bg-pink-400/20 blur-3xl pointer-events-none"
      />

      {/* Top Skip Action */}
      <div className="w-full flex justify-end shrink-0 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            setActiveScreen('01')
          }}
          className="text-[11px] font-semibold text-rose-100/80 hover:text-white px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Center Animated Logo & Wordmark */}
      <div className="my-auto flex flex-col items-center text-center space-y-5 z-10">
        <div className="relative flex items-center justify-center">
          {/* Expanding outer orbital pulse ring */}
          <motion.div
            aria-hidden
            initial={{ scale: 0.85, opacity: 0.6 }}
            animate={{ scale: 1.55, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
            className="absolute size-24 rounded-full border border-rose-300/50"
          />
          {/* Secondary inner pulse ring */}
          <motion.div
            aria-hidden
            initial={{ scale: 0.9, opacity: 0.45 }}
            animate={{ scale: 1.32, opacity: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.55 }}
            className="absolute size-24 rounded-full border border-pink-200/40"
          />

          {/* Soft glow aura */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-rose-500/45 via-pink-400/25 to-white/15 blur-xl" />

          {/* Official Crimson Emblem with Spring Pop-In */}
          <motion.div
            initial={{ scale: 0.55, opacity: 0, rotate: -6 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18, mass: 0.9 }}
            className="relative size-24 sm:size-26 rounded-full overflow-hidden shadow-[0_16px_45px_-6px_rgba(244,63,94,0.65)] border-2 border-white/40 flex items-center justify-center p-1 bg-[#80000D]"
          >
            <img
              src="/her-logo.png"
              alt="Her"
              className="size-full object-contain rounded-full"
            />
          </motion.div>
        </div>

        {/* Brand Wordmark & Tagline */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-sm"
          >
            Her
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.52, ease: 'easeOut' }}
            className="text-xs sm:text-sm text-rose-100/90 font-medium tracking-wide max-w-[230px]"
          >
            Personal care, backed by your workplace.
          </motion.p>
        </div>
      </div>

      {/* Bottom Silky Progress Indicator */}
      <div className="w-full max-w-[180px] flex flex-col items-center space-y-2 shrink-0 z-20">
        <div className="w-full h-1 bg-white/15 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.0, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-rose-300 via-pink-200 to-white rounded-full"
          />
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ delay: 0.35 }}
          className="text-[10px] text-rose-100 font-medium tracking-widest uppercase"
        >
          Your private health space
        </motion.span>
      </div>
    </div>
  )
}
