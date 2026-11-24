import { AnimatePresence, motion } from 'framer-motion'
import { Check, Lock, X } from 'lucide-react'
import { useState } from 'react'
import { HerLogo } from '../design-system/HerLogo'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen01Welcome() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const loginUser = useHerCorporateStore((s) => s.loginUser)

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone')
  const [contactInput, setContactInput] = useState('+91 98765 43210')
  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4', '5', '6'])
  const [otpSent, setOtpSent] = useState(true)

  const handleSwitchMethod = (method: 'phone' | 'email') => {
    setLoginMethod(method)
    setContactInput(method === 'phone' ? '+91 98765 43210' : 'priya@acmetech.com')
  }

  const handlePersonalLogin = () => {
    loginUser(contactInput, 'personal')
    setShowLoginModal(false)
    setActiveScreen('04')
  }

  return (
    <div className="relative flex flex-col justify-between min-h-full px-6 py-6 bg-gradient-to-b from-[#FFF6F8] via-[#FAF7F5] to-white text-slate-800 selection:bg-rose-100">
      
      {/* TOP: Clean Brand Emblem & Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center pt-3 shrink-0"
      >
        <HerLogo size="lg" animated showText />
      </motion.div>

      {/* CENTER: Single Clean Editorial Hero Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.08 }}
        className="my-auto py-4 w-full"
      >
        <div className="relative w-full aspect-[4/3.1] rounded-3xl overflow-hidden bg-[#2A0E1A] shadow-[0_20px_44px_-14px_rgba(42,14,26,0.22)] border border-rose-200/60">
          <img
            src="/welcome-ai-hero.jpg"
            alt="Her Wellness"
            className="size-full object-cover object-center"
            loading="eager"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = '/welcome-hero.png'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E1A]/75 via-[#2A0E1A]/10 to-transparent flex items-end p-5 pointer-events-none">
            <p className="font-display text-lg font-semibold text-white tracking-tight leading-snug">
              Personal care, backed by your workplace.
            </p>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM: Minimal Two-Button Action Stack */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.16 }}
        className="space-y-3 pb-2 shrink-0"
      >
        <button
          type="button"
          onClick={() => setActiveScreen('02')}
          className={cn(
            'flex h-12.5 w-full items-center justify-center rounded-2xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1E0812] px-4 text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Corporate login
        </button>

        <button
          type="button"
          onClick={() => setShowLoginModal(true)}
          className={cn(
            'flex h-12.5 w-full items-center justify-center rounded-2xl border border-rose-200 bg-white px-4 text-sm font-semibold text-slate-800 shadow-2xs hover:bg-rose-50/50 hover:border-rose-300 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Log in / Sign up
        </button>

        <p className="text-center text-[11px] text-slate-400 font-medium pt-0.5">
          Free care when covered by your employer
        </p>
      </motion.div>

      {/* COMPACT LOGIN MODAL SHEET */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#2A0E1A]/45 backdrop-blur-xs flex flex-col justify-end p-2.5"
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="w-full bg-white rounded-3xl p-4 shadow-2xl border border-rose-100 space-y-3"
            >
              <div className="flex items-start justify-between border-b border-rose-100 pb-2.5">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                    <Lock className="size-2.5" /> Private account
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                    Sign in to Her
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  aria-label="Close login modal"
                  className="grid size-7 place-items-center rounded-full bg-rose-50/70 text-slate-500 hover:bg-rose-100 hover:text-slate-800 transition-colors"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-rose-50/70 border border-rose-100">
                <button
                  type="button"
                  onClick={() => handleSwitchMethod('phone')}
                  className={cn(
                    'h-7.5 rounded-lg text-[11px] font-semibold transition-all',
                    loginMethod === 'phone'
                      ? 'bg-white text-[#2A0E1A] shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800',
                  )}
                >
                  Mobile
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchMethod('email')}
                  className={cn(
                    'h-7.5 rounded-lg text-[11px] font-semibold transition-all',
                    loginMethod === 'email'
                      ? 'bg-white text-[#2A0E1A] shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800',
                  )}
                >
                  Email
                </button>
              </div>

              <div className="relative flex items-center">
                <input
                  id="phone-input"
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  className={cn(
                    'block h-10 w-full rounded-xl border border-slate-300 bg-white pl-3 pr-22 text-xs font-medium text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 transition-colors',
                    focusRing,
                  )}
                />
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="absolute right-1.5 top-1.5 h-7 px-2.5 rounded-lg text-[11px] font-semibold bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  {otpSent ? 'Sent' : 'Send OTP'}
                </button>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-700">
                    Verification code
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="size-3" /> Auto-filled
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5">
                  {otpDigits.map((d, i) => (
                    <input
                      key={i}
                      type="text"
                      inputMode="numeric"
                      value={d}
                      onChange={(e) => {
                        const next = [...otpDigits]
                        next[i] = e.target.value.slice(-1)
                        setOtpDigits(next)
                      }}
                      maxLength={1}
                      className="h-9 text-center font-bold text-xs text-[#2A0E1A] border border-rose-200 rounded-lg bg-rose-50/40 focus:bg-white focus:border-rose-600 focus:ring-1 focus:ring-rose-500 tabular-nums"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handlePersonalLogin}
                className={cn(
                  'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1E0812] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
                  focusRing,
                )}
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
