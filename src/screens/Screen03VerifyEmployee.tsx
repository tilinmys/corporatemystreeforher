import { Check, ChevronLeft, RefreshCw } from 'lucide-react'
import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen03VerifyEmployee() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const selectedCompany = useHerCorporateStore((s) => s.selectedCompany)
  const linkCompany = useHerCorporateStore((s) => s.linkCompany)

  const companyName = selectedCompany?.name || 'Acme Tech'
  const companyDomain = selectedCompany?.domain || 'acmetech.com'
  const companyInitials = selectedCompany?.initials || 'AT'

  // Input states
  const [authMode, setAuthMode] = useState<'email' | 'empId'>('email')
  const [emailInput, setEmailInput] = useState(`name@${companyDomain}`)
  const [empIdInput, setEmpIdInput] = useState('ACM-2291')
  const [otpSent, setOtpSent] = useState(false)

  // OTP 6-digit state
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(30)
  const [error, setError] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // 30s countdown timer
  useEffect(() => {
    if (!otpSent || timer <= 0) return
    const id = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(id)
  }, [otpSent, timer])

  // Compact inline Send OTP handler
  const handleSendOtp = () => {
    setError('')
    setOtpSent(true)
    setTimer(30)
    setTimeout(() => {
      inputRefs.current[0]?.focus()
    }, 100)
  }

  // Handle single digit entry
  const handleDigitChange = (index: number, val: string) => {
    const clean = val.replace(/\D/g, '')
    if (!clean) {
      const next = [...digits]
      next[index] = ''
      setDigits(next)
      return
    }
    const lastChar = clean.slice(-1)
    const next = [...digits]
    next[index] = lastChar
    setDigits(next)
    setError('')

    // Auto-advance
    if (index < 5 && lastChar) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Handle full 6-digit paste
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    const next = [...digits]
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || ''
    }
    setDigits(next)
    setError('')
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  // Quick fill for demo
  const fillDemoOtp = () => {
    setDigits(['1', '2', '3', '4', '5', '6'])
    setError('')
    setOtpSent(true)
  }

  // Verify and Continue
  const handleVerify = () => {
    const fullOtp = digits.join('')
    if (fullOtp.length < 6) {
      setError('Please enter all 6 digits of the OTP.')
      return
    }

    // Accept demo code 123456 or 842195, or any 6 digits in demo mode
    linkCompany({
      company: companyName,
      email: authMode === 'email' ? emailInput : `priya@${companyDomain}`,
      employeeId: authMode === 'empId' ? empIdInput : 'ACM-2291',
    })
    setActiveScreen('03c')
  }

  // Skip directly to Home
  const handleSkipToHome = () => {
    linkCompany({
      company: companyName,
      email: emailInput,
      employeeId: empIdInput,
    })
    setActiveScreen('04')
  }

  return (
    <div className="flex flex-col min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 02)
        - Title "Verify you work here"
        - Hairline bottom border
        Matching exact Wireframe 3 header
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('02')}
          aria-label="Back to Select Company"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Verify you work here
        </h1>
      </header>

      {/* MAIN FORM BODY */}
      <div className="flex-1 flex flex-col justify-between px-4 py-4 space-y-4">
        
        <div className="space-y-4">
          {/* 
            SELECTED COMPANY CARD:
            Rounded container, Logo badge on left + Company Name, "Change" on right
            Matching exact Wireframe 3
          */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-display text-xs font-bold text-rose-950 shadow-2xs">
                {companyInitials}
              </div>
              <div>
                <p className="font-semibold text-xs text-slate-900">{companyName}</p>
                <p className="text-[10px] text-emerald-700 font-medium">₹0 Copay Outpatient Care</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveScreen('02')}
              className={cn(
                'text-xs font-semibold text-rose-900 hover:text-[#2A0E1A] hover:underline px-2 py-1 rounded-md transition-colors',
                focusRing,
              )}
            >
              Change
            </button>
          </div>

          {/* 
            INPUT FIELD WITH COMPACT INLINE "SEND OTP" BUTTON:
            User requirement: "make the buttons compact in send otp give it inside the main button , dont build that much big send otp button which is very bad"
          */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="auth-input" className="block text-xs font-semibold text-slate-700">
                {authMode === 'email' ? 'Work email' : 'Corporate Employee ID'}
              </label>
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'email' ? 'empId' : 'email')}
                className="text-[11px] font-medium text-rose-900 hover:text-[#2A0E1A] hover:underline"
              >
                {authMode === 'email' ? 'Use Employee ID instead' : 'Use Work email instead'}
              </button>
            </div>

            {/* Input with embedded compact Send OTP button */}
            <div className="relative flex items-center">
              <input
                id="auth-input"
                type={authMode === 'email' ? 'email' : 'text'}
                value={authMode === 'email' ? emailInput : empIdInput}
                onChange={(e) =>
                  authMode === 'email' ? setEmailInput(e.target.value) : setEmpIdInput(e.target.value)
                }
                placeholder={authMode === 'email' ? `name@${companyDomain}` : 'ACM-2291'}
                className={cn(
                  'block h-11 w-full rounded-xl border border-slate-300 bg-white pl-3.5 pr-26 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
                  focusRing,
                )}
              />

              {/* Compact Send OTP Pill Button inside the Input */}
              <button
                type="button"
                onClick={handleSendOtp}
                className={cn(
                  'absolute right-1.5 top-1.5 h-8 px-3 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-2xs active:scale-95',
                  otpSent
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                    : 'bg-rose-950 text-white hover:bg-[#2A0E1A]',
                  focusRing,
                )}
              >
                {otpSent ? (
                  <>
                    <Check className="size-3 text-emerald-600" strokeWidth={2.5} />
                    <span>Sent</span>
                  </>
                ) : (
                  <span>Send OTP</span>
                )}
              </button>
            </div>

            {/* Demo Helper Pill */}
            {!otpSent && (
              <p className="text-[10px] text-slate-400 pl-0.5">
                We'll send a 6-digit verification code to confirm corporate coverage.
              </p>
            )}
          </div>

          {/* 
            ENTER 6-DIGIT OTP SECTION:
            Matching exact wireframe layout:
            Label "Enter 6-digit OTP", 6 square boxes, "Resend OTP in 0:30"
          */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Enter 6-digit OTP
              </label>
              <button
                type="button"
                onClick={fillDemoOtp}
                className="text-[11px] font-semibold text-rose-900 hover:underline flex items-center gap-1"
                title="Autofill 123456"
              >
                Auto-fill 123456
              </button>
            </div>

            {/* 6 OTP Boxes */}
            <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
              {digits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  aria-label={`Digit ${idx + 1}`}
                  className={cn(
                    'h-11 w-full rounded-xl border text-center font-display text-base font-bold tabular-nums transition-all shadow-2xs',
                    digit
                      ? 'border-rose-700 bg-rose-50/40 text-[#2A0E1A] ring-1 ring-rose-600'
                      : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200',
                    error && 'border-rose-400 bg-rose-50/30 ring-1 ring-rose-400',
                    focusRing,
                  )}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-rose-600 font-medium pl-0.5">{error}</p>
            )}

            {/* Resend Countdown Line */}
            <div className="pt-0.5">
              {timer > 0 ? (
                <p className="text-xs text-slate-400 tabular-nums">
                  Resend OTP in 0:{timer.toString().padStart(2, '0')}
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-xs font-semibold text-rose-900 hover:text-[#2A0E1A] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="size-3" strokeWidth={1.5} /> Resend OTP
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 
          BOTTOM STICKY BUTTON:
          - Solid "Verify & continue" button
          - Subtitle link: "Demo: existing Her user → skip to Home"
          Matching exact Wireframe 3 bottom layout
        */}
        <div className="space-y-2.5 pt-4 pb-2">
          <button
            type="button"
            onClick={handleVerify}
            className={cn(
              'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-sm font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
              focusRing,
            )}
          >
            Verify & continue
          </button>

          <button
            type="button"
            onClick={handleSkipToHome}
            className="w-full text-center text-xs text-slate-500 hover:text-slate-800 transition-colors py-1 hover:underline"
          >
            Already verified? Continue to Home →
          </button>
        </div>

      </div>

    </div>
  )
}
