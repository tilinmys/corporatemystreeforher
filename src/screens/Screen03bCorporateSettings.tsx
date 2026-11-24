import {
  AlertTriangle,
  Building2,
  ChevronLeft,
  Lock,
} from 'lucide-react'
import { useState } from 'react'
import { BottomNav } from '../design-system/BottomNav'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen03bCorporateSettings() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const unlinkCompany = useHerCorporateStore((s) => s.unlinkCompany)
  const linkCompany = useHerCorporateStore((s) => s.linkCompany)
  const setShowCorporateCareOnHome = useHerCorporateStore((s) => s.setShowCorporateCareOnHome)

  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const isLinked = Boolean(employeeLink)
  const showCorporateCare = employeeLink?.showCorporateCareOnHome ?? true

  const handleToggleHome = () => {
    setShowCorporateCareOnHome(!showCorporateCare)
  }

  const handleConfirmUnlink = () => {
    unlinkCompany()
    setShowConfirmModal(false)
  }

  const handleQuickLinkDemo = () => {
    linkCompany({
      company: 'Acme Tech',
      email: 'priya@acmetech.com',
      employeeId: 'ACM-2291',
    })
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800 relative">
      
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-rose-100">
        <button
          type="button"
          onClick={() => setActiveScreen('04')}
          aria-label="Back to Home"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-rose-50 hover:text-[#2A0E1A] active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Corporate settings
        </h1>
      </header>

      {/* MAIN BODY */}
      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        {/* Breadcrumb + Live State Switcher */}
        <div className="flex items-center justify-between text-xs">
          <p className="text-slate-500 font-medium">
            Profile <span className="text-rose-300">›</span> Corporate settings
          </p>

          <div className="flex items-center gap-1 bg-rose-100/70 p-0.5 rounded-lg text-[10px] font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => isLinked && setShowConfirmModal(true)}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                !isLinked ? 'bg-white text-[#2A0E1A] shadow-2xs' : 'hover:text-slate-900',
              )}
            >
              Unlinked
            </button>
            <button
              type="button"
              onClick={() => !isLinked && handleQuickLinkDemo()}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                isLinked ? 'bg-white text-[#2A0E1A] shadow-2xs' : 'hover:text-slate-900',
              )}
            >
              Linked
            </button>
          </div>
        </div>

        {/* STATE A: NO COMPANY LINKED */}
        {!isLinked && (
          <div className="rounded-3xl border-2 border-dashed border-rose-200 bg-gradient-to-b from-[#FFF5F7] to-white p-5 text-center space-y-3 shadow-2xs">
            <div className="mx-auto size-12 rounded-2xl bg-rose-100 text-[#2A0E1A] border border-rose-200 flex items-center justify-center">
              <Building2 className="size-6" strokeWidth={1.6} />
            </div>

            <div className="space-y-1">
              <h2 className="font-display text-base font-bold text-slate-900">
                Get care covered by your employer
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Free consults, blood tests and prescriptions if your company partners with Her.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveScreen('02')}
              className={cn(
                'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
                focusRing,
              )}
            >
              Link my company
            </button>

            <button
              type="button"
              onClick={handleQuickLinkDemo}
              className="text-[11px] font-semibold text-rose-800 hover:underline"
            >
              Quick demo: Activate Acme Tech →
            </button>
          </div>
        )}

        {/* STATE B: COMPANY LINKED */}
        {isLinked && employeeLink && (
          <div className="space-y-3">
            {/* Corporate Ledger Card */}
            <div className="rounded-2xl border border-rose-200/80 bg-white p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-display text-xs font-bold text-[#2A0E1A]">
                    {employeeLink.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 leading-tight">
                      {employeeLink.company}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Verified · {employeeLink.email}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Active
                </span>
              </div>

              <div className="space-y-2 border-t border-rose-50 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Employee ID</span>
                  <span className="font-semibold text-slate-900 font-mono text-xs">
                    {employeeLink.employeeId}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Plan valid till</span>
                  <span className="font-semibold text-slate-900">
                    {employeeLink.planValidity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Benefits left</span>
                  <span className="font-semibold text-rose-800 tabular-nums">
                    {employeeLink.consultsLeft} consults · ₹{employeeLink.walletLeft.toLocaleString('en-IN')} tests
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle: Show corporate care on Home */}
            <div className="rounded-2xl border border-rose-100 bg-white p-3.5 flex items-center justify-between shadow-2xs">
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Show corporate care on Home
                </p>
                <p className="text-[11px] text-slate-500">
                  Display covered benefits widget
                </p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={showCorporateCare}
                onClick={handleToggleHome}
                className={cn(
                  'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                  showCorporateCare ? 'bg-[#2A0E1A]' : 'bg-slate-200',
                  focusRing,
                )}
              >
                <span
                  className={cn(
                    'pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out',
                    showCorporateCare ? 'translate-x-5' : 'translate-x-0',
                  )}
                />
              </button>
            </div>

            {/* Privacy Note */}
            <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-3.5 space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2A0E1A]">
                <Lock className="size-3.5 text-rose-700" strokeWidth={1.75} />
                <span>Your privacy</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {employeeLink.company} never sees your cycle data, consults or reports. HR only sees anonymous usage numbers.
              </p>
            </div>

            {/* Unlink Button */}
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className={cn(
                'flex h-11 w-full items-center justify-center rounded-xl border border-rose-200 bg-white px-4 text-xs font-semibold text-rose-700 hover:bg-rose-50 active:scale-[0.99] transition-all shadow-2xs',
                focusRing,
              )}
            >
              Unlink company
            </button>
          </div>
        )}

      </div>

      {/* SHARED DOCKED BOTTOM NAVBAR */}
      <BottomNav active="profile" />

      {/* UNLINK CONFIRMATION DIALOG */}
      {showConfirmModal && (
        <div className="absolute inset-0 z-50 bg-[#2A0E1A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 shadow-xl border border-rose-100 space-y-4 text-center">
            <div className="mx-auto size-11 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
              <AlertTriangle className="size-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display text-base font-bold text-slate-900">
                Unlink {employeeLink?.company}?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your free employer credits will pause. Your private Her health records remain intact.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 h-10 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Keep link
              </button>
              <button
                type="button"
                onClick={handleConfirmUnlink}
                className="flex-1 h-10 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 shadow-xs"
              >
                Unlink
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
