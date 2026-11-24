import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Building2,
  CalendarHeart,
  Check,
  FlaskConical,
  Lock,
  Stethoscope,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { HerLogo } from '../design-system/HerLogo'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen01Welcome() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const loginUser = useHerCorporateStore((s) => s.loginUser)
  const linkCompany = useHerCorporateStore((s) => s.linkCompany)

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

  const handleQuickExplore = () => {
    linkCompany()
    setActiveScreen('04')
  }

  return (
    <div className="relative flex flex-col justify-between min-h-full px-5 py-4 bg-gradient-to-b from-[#FFF5F7] via-[#FAF7F5] to-white text-slate-800 selection:bg-rose-100">
      
      {/* TOP HEADER: Emblem + Title + Concise Value Pill */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="flex flex-col items-center pt-1 pb-1 shrink-0 space-y-1.5"
      >
        <HerLogo size="lg" animated showText />
        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100/80 border border-rose-200/80 text-[10px] font-semibold text-rose-900 tracking-wide">
          Private · Zero-judgement women's care
        </span>
      </motion.div>

      {/* MIDDLE HERO CARD: AI Wellness Visual + Icon Micro-Strip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="my-auto py-2 space-y-2.5 w-full"
      >
        <div className="relative w-full aspect-[16/9.8] rounded-3xl overflow-hidden bg-gradient-to-br from-[#3D0E18] to-[#2A0E1A] shadow-[0_16px_34px_-10px_rgba(190,18,60,0.22)] border border-rose-200/70">
          <img
            src="/welcome-ai-hero.jpg"
            alt="Her Serene Wellness"
            className="size-full object-cover object-center transition-transform duration-700 hover:scale-105"
            loading="eager"
            onError={(e) => {
              ;(e.currentTarget as HTMLImageElement).src = '/welcome-hero.png'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E1A]/80 via-[#2A0E1A]/15 to-transparent flex items-end p-3.5 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white border border-white/25 shadow-xs">
              <span className="size-1.5 rounded-full bg-rose-300 animate-pulse" />
              Personal care, backed by your workplace
            </span>
          </div>
        </div>

        {/* Concise Pink & White Feature Trio (Icons, minimal words) */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-2xl bg-white border border-rose-100 px-2 py-2 flex flex-col items-center text-center shadow-2xs">
            <span className="size-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-1">
              <Stethoscope className="size-3.5" strokeWidth={1.8} />
            </span>
            <span className="text-[10px] font-semibold text-slate-800 leading-tight">Gynaecologists</span>
          </div>
          <div className="rounded-2xl bg-rose-50/70 border border-rose-200/70 px-2 py-2 flex flex-col items-center text-center shadow-2xs">
            <span className="size-7 rounded-lg bg-white text-rose-700 flex items-center justify-center mb-1 border border-rose-100">
              <CalendarHeart className="size-3.5" strokeWidth={1.8} />
            </span>
            <span className="text-[10px] font-semibold text-slate-800 leading-tight">Cycle Insights</span>
          </div>
          <div className="rounded-2xl bg-white border border-rose-100 px-2 py-2 flex flex-col items-center text-center shadow-2xs">
            <span className="size-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center mb-1">
              <FlaskConical className="size-3.5" strokeWidth={1.8} />
            </span>
            <span className="text-[10px] font-semibold text-slate-800 leading-tight">Home Blood Tests</span>
          </div>
        </div>
      </motion.div>

      {/* BOTTOM HUMAN-CENTRIC ACTION STACK */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="space-y-2 pb-1 shrink-0"
      >
        <button
          type="button"
          onClick={() => setActiveScreen('02')}
          className={cn(
            'flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1E0812] px-4 text-xs font-semibold text-white shadow-md shadow-rose-950/15 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          <Building2 className="size-4 text-rose-200" strokeWidth={1.75} />
          <span>Corporate login (₹0 employer care)</span>
          <ArrowRight className="size-3.5 text-rose-200" />
        </button>

        <button
          type="button"
          onClick={() => setShowLoginModal(true)}
          className={cn(
            'flex h-11.5 w-full items-center justify-center rounded-2xl border border-rose-200 bg-white px-4 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-rose-50/60 hover:border-rose-300 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Log in / Sign up personally
        </button>

        <button
          type="button"
          onClick={handleQuickExplore}
          className="w-full py-1 text-center text-[11px] font-semibold text-rose-800 hover:text-[#2A0E1A] transition-colors"
        >
          Quick preview as Priya (Acme Tech) →
        </button>
      </motion.div>

      {/* HUMAN-CENTRIC COMPACT LOGIN MODAL SHEET */}
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
              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-rose-100 pb-2.5">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                    <Lock className="size-2.5" /> Private account
                  </div>
                  <h3 className="font-display text-base font-bold text-slate-900 leading-tight">
                    Welcome back to Her
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

              {/* Method Segmented Switch */}
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
                  Mobile Number
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

              {/* Contact Input */}
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

              {/* OTP Code Row */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-700">
                    Verification code
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <Check className="size-3" /> Demo OTP ready
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

              {/* Action Buttons */}
              <div className="pt-0.5 space-y-2">
                <button
                  type="button"
                  onClick={handlePersonalLogin}
                  className={cn(
                    'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1E0812] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
                    focusRing,
                  )}
                >
                  Sign in securely
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false)
                    setActiveScreen('02')
                  }}
                  className="w-full text-center text-[11px] font-semibold text-rose-800 hover:underline pt-0.5"
                >
                  Use employer benefits instead →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
