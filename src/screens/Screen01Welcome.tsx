import { Check, X } from 'lucide-react'
import { useState } from 'react'
import { HerLogo } from '../design-system/HerLogo'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen01Welcome() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const loginUser = useHerCorporateStore((s) => s.loginUser)

  const [showLoginModal, setShowLoginModal] = useState(false)
  const [phoneInput, setPhoneInput] = useState('+91 98765 43210')
  const [otpDigits, setOtpDigits] = useState(['1', '2', '3', '4', '5', '6'])
  const [otpSent, setOtpSent] = useState(false)

  const handlePersonalLogin = () => {
    loginUser(phoneInput, 'personal')
    setShowLoginModal(false)
    setActiveScreen('04')
  }

  return (
    <div className="relative flex flex-col justify-between min-h-full px-5 py-4 bg-[#FAF7F5] text-slate-800 selection:bg-rose-100">
      
      {/* 
        TOP HEADER SECTION:
        - Positioned comfortably below the Dynamic Island status bar
        - Clean circular crimson Her logo with ambient breathing glow
        - Editorial serif "Her" title
        - Zero extra cluttered text
      */}
      <div className="flex flex-col items-center pt-2 pb-1 shrink-0 animate-fadeIn duration-700">
        <HerLogo size="lg" animated showText />
      </div>

      {/* 
        MIDDLE SECTION: Single Hero AI Generated Image Card
        - One single, high-resolution serene editorial wellness artwork card in the center
        - Deep rose gold and velvet burgundy ambient light
        - Soft rounded corners, delicate border, and deep ambient warmth
      */}
      <div className="my-auto py-2 w-full animate-fadeIn duration-700 delay-150">
        <div className="relative w-full aspect-[16/10.2] rounded-3xl overflow-hidden bg-gradient-to-br from-[#3D0E18] to-[#2A0E1A] shadow-[0_16px_36px_-10px_rgba(42,14,26,0.25)] border border-rose-200/50">
          <img
            src="/welcome-ai-hero.jpg"
            alt="Her Serene Wellness"
            className="size-full object-cover object-center transition-transform duration-700 hover:scale-105"
            loading="eager"
            onError={(e) => {
              // Fallback to png if needed
              ;(e.currentTarget as HTMLImageElement).src = '/welcome-hero.png'
            }}
          />
          {/* Subtle bottom gradient glaze with editorial caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20 shadow-xs">
              <span className="size-1.5 rounded-full bg-rose-400 animate-pulse" />
              Personal care, backed by your workplace
            </span>
          </div>
        </div>
      </div>

      {/* 
        BOTTOM ACTION STACK:
        - "Log in / Sign up" (clean white card button with subtle border)
        - "Corporate login" (rich velvet burgundy button, covered care entry)
        - Subtitle: "Corporate login = care covered by your employer"
        Matching exact Wireframe 1
      */}
      <div className="space-y-2.5 pb-1 shrink-0 animate-fadeIn duration-700 delay-300">
        <button
          type="button"
          onClick={() => setShowLoginModal(true)}
          className={cn(
            'flex h-11.5 w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-800 shadow-2xs hover:bg-rose-50/40 hover:border-rose-200 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Log in / Sign up
        </button>

        <button
          type="button"
          onClick={() => setActiveScreen('02')}
          className={cn(
            'flex h-11.5 w-full items-center justify-center rounded-2xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1E0812] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Corporate login
        </button>

        <p className="text-center text-[11px] text-slate-500 font-normal pt-0.5">
          Corporate login = care covered by your employer
        </p>
      </div>

      {/* 
        COMPACT AUTHENTIC MOBILE LOGIN SHEET:
        Tight, sleek, and streamlined for compact iPhone screen
      */}
      {showLoginModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex flex-col justify-end p-2.5 animate-fadeIn">
          <div className="w-full bg-white rounded-3xl p-4 shadow-2xl border border-rose-100 space-y-3 animate-slideUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="space-y-0.5">
                <h3 className="font-display text-sm font-bold text-slate-900 leading-tight">
                  Log in to Her
                </h3>
                <p className="text-[11px] text-slate-500">
                  Access your personal health and cycle records
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="grid size-7 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors -mr-1"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Mobile / Email Input */}
            <div className="space-y-1">
              <label htmlFor="phone-input" className="block text-[11px] font-semibold text-slate-700">
                Mobile number or Email
              </label>
              <div className="relative flex items-center">
                <input
                  id="phone-input"
                  type="text"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  className={cn(
                    'block h-9.5 w-full rounded-xl border border-slate-300 bg-white pl-3 pr-20 text-xs font-medium text-slate-900 focus:border-rose-600 focus:ring-2 focus:ring-rose-200 transition-colors',
                    focusRing,
                  )}
                />
                <button
                  type="button"
                  onClick={() => setOtpSent(true)}
                  className="absolute right-1 top-1 h-7.5 px-2 rounded-lg text-[11px] font-semibold bg-rose-50 text-rose-900 border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  {otpSent ? 'Sent' : 'Send OTP'}
                </button>
              </div>
            </div>

            {/* OTP Code Row */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-700">
                  6-digit Verification Code
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="size-3" /> Auto-filled
                </span>
              </div>

              <div className="grid grid-cols-6 gap-1">
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    type="text"
                    value={d}
                    onChange={(e) => {
                      const next = [...otpDigits]
                      next[i] = e.target.value.slice(-1)
                      setOtpDigits(next)
                    }}
                    maxLength={1}
                    className="h-8.5 text-center font-bold text-xs text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:bg-white focus:border-rose-600 focus:ring-1 focus:ring-rose-500 tabular-nums"
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
                  'flex h-10 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1E0812] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
                  focusRing,
                )}
              >
                Sign in to private account
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false)
                  setActiveScreen('02')
                }}
                className="w-full text-center text-[11px] font-semibold text-rose-900 hover:underline pt-0.5"
              >
                Switch to Corporate login instead
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
