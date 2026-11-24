import {
  AlertTriangle,
  Building2,
  ChevronLeft,
  Lock,
} from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen03bCorporateSettings() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const unlinkCompany = useHerCorporateStore((s) => s.unlinkCompany)
  const linkCompany = useHerCorporateStore((s) => s.linkCompany)
  const setShowCorporateCareOnHome = useHerCorporateStore((s) => s.setShowCorporateCareOnHome)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [forceState, setForceState] = useState<'auto' | 'stateA' | 'stateB'>('auto')

  // Resolve which state to show
  const isLinked = forceState === 'stateB' ? true : forceState === 'stateA' ? false : Boolean(employeeLink)

  const showCorporateCare = employeeLink?.showCorporateCareOnHome ?? true

  const handleToggleHome = () => {
    setShowCorporateCareOnHome(!showCorporateCare)
  }

  const handleConfirmUnlink = () => {
    unlinkCompany()
    setShowConfirmModal(false)
    setForceState('stateA')
  }

  const handleQuickLinkDemo = () => {
    linkCompany({
      company: 'Acme Tech',
      email: 'priya@acmetech.com',
      employeeId: 'ACM-2291',
    })
    setForceState('stateB')
  }

  return (
    <div className="flex flex-col min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 04 / Profile)
        - Title "Corporate settings"
        Matching exact Wireframe 03b
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('04')}
          aria-label="Back to Profile"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
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
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* Breadcrumb Line & Demo State Switcher */}
        <div className="flex items-center justify-between text-xs">
          <p className="text-slate-500 font-medium">
            Profile <span className="text-slate-400">›</span> Corporate settings
          </p>

          {/* Quick Demo Switcher */}
          <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg text-[10px] font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setForceState('stateA')}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                !isLinked ? 'bg-white text-[#2A0E1A] shadow-2xs' : 'hover:text-slate-900',
              )}
            >
              State A
            </button>
            <button
              type="button"
              onClick={() => setForceState('stateB')}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                isLinked ? 'bg-white text-[#2A0E1A] shadow-2xs' : 'hover:text-slate-900',
              )}
            >
              State B
            </button>
          </div>
        </div>

        {/* 
          ─────────────────────────────────────────────────────────────
          STATE A: NO COMPANY LINKED
          Dashed border box with "Get care covered by your employer"
          ─────────────────────────────────────────────────────────────
        */}
        {!isLinked && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>State A · No company linked</span>
            </div>

            <div className="rounded-2xl border-2 border-dashed border-rose-200 bg-white p-5 text-center space-y-3 shadow-2xs">
              <div className="mx-auto size-12 rounded-2xl bg-rose-50 text-rose-950 border border-rose-200 flex items-center justify-center">
                <Building2 className="size-6" strokeWidth={1.5} />
              </div>

              <div className="space-y-1">
                <h2 className="font-display text-base font-bold text-slate-900">
                  Get care covered by your employer
                </h2>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  Free consults, blood tests and prescriptions if your company partners with MyStree.
                </p>
              </div>

              {/* Solid Button: Link my company */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setActiveScreen('02')}
                  className={cn(
                    'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
                    focusRing,
                  )}
                >
                  Link my company
                </button>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleQuickLinkDemo}
                  className="text-[11px] font-medium text-rose-900 hover:underline"
                >
                  Fast link demo: Activate Acme Tech
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 
          ─────────────────────────────────────────────────────────────
          STATE B: COMPANY LINKED
          Ledger card, show on home toggle, privacy box, and unlink box
          ─────────────────────────────────────────────────────────────
        */}
        {isLinked && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>State B · Company linked</span>
            </div>

            {/* Corporate Ledger Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3.5 shadow-2xs">
              {/* Header with Logo + Active tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center font-display text-xs font-bold text-rose-950 shadow-2xs">
                    AT
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-slate-900 leading-tight">
                      {employeeLink?.company || 'Acme Tech'}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Verified · {employeeLink?.email || 'priya@acmetech.com'}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Active
                </span>
              </div>

              {/* Clinical Details List */}
              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Employee ID</span>
                  <span className="font-semibold text-slate-900 font-mono text-xs">
                    {employeeLink?.employeeId || 'ACM-2291'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Plan valid till</span>
                  <span className="font-semibold text-slate-900">
                    {employeeLink?.planValidity || '31 Mar 2027'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Benefits left</span>
                  <span className="font-semibold text-rose-950 tabular-nums">
                    3 consults · ₹2,000 tests
                  </span>
                </div>
              </div>
            </div>

            {/* Toggle: Show corporate care on Home */}
            <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-center justify-between shadow-2xs">
              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Show corporate care on Home
                </p>
                <p className="text-[10px] text-slate-400">
                  Display employer covered badges on dashboard
                </p>
              </div>

              <button
                type="button"
                onClick={handleToggleHome}
                role="switch"
                aria-checked={showCorporateCare}
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors focus:outline-hidden',
                  showCorporateCare ? 'bg-rose-950' : 'bg-slate-300',
                )}
              >
                <span
                  className={cn(
                    'inline-block size-5 transform rounded-full bg-white shadow-xs transition-transform',
                    showCorporateCare ? 'translate-x-5' : 'translate-x-0.5',
                  )}
                />
              </button>
            </div>

            {/* Your Privacy Card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-1.5 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Lock className="size-3.5 text-rose-900" strokeWidth={1.5} />
                <span>Your privacy</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {employeeLink?.company || 'Acme Tech'} never sees your cycle data, consults or reports. HR only sees anonymous usage numbers.
              </p>
            </div>

            {/* Unlink Company Box */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className={cn(
                  'flex h-11 w-full items-center justify-center rounded-xl border border-rose-300 bg-white hover:bg-rose-50/50 active:bg-rose-100 text-xs font-semibold text-rose-700 shadow-2xs active:scale-[0.99] transition-all',
                  focusRing,
                )}
              >
                Unlink company
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Unlink Confirmation Modal */}
      {showConfirmModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xs rounded-2xl bg-white p-5 space-y-4 shadow-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200 shrink-0">
                <AlertTriangle className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">Unlink company?</h3>
                <p className="text-xs text-slate-500">Corporate benefits will be paused.</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              You will lose access to ₹0 specialist consults and sponsored diagnostic panels until re-verified.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="h-9 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmUnlink}
                className="h-9 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-semibold text-white shadow-2xs"
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
