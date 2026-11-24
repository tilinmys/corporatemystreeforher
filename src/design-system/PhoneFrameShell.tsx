import {
  Battery,
  RotateCcw,
  Smartphone,
  Wifi,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'
import { NotificationToast } from './NotificationToast'

const SCREENS = [
  { id: '00', label: '00', title: '00 Splash' },
  { id: '01', label: '01', title: '01 Welcome' },
  { id: '02', label: '02', title: '02 Select Company' },
  { id: '03', label: '03', title: '03 Verify Employee' },
  { id: '03b', label: '03b', title: '03b Settings' },
  { id: '03c', label: '03c', title: '03c Period Start' },
  { id: '03d', label: '03d', title: '03d Period Length' },
  { id: '03e', label: '03e', title: '03e Cycle Length' },
  { id: '03f', label: '03f', title: '03f Setup Done' },
  { id: '04', label: '04', title: '04 Home' },
  { id: '05', label: '05', title: '05 Doctors' },
  { id: '06', label: '06', title: '06 Doctor Profile' },
  { id: '07', label: '07', title: '07 Pre-Consult' },
  { id: '08', label: '08', title: '08 Confirmed' },
  { id: '09', label: '09', title: '09 Waiting Room' },
  { id: '10', label: '10', title: '10 Video Call' },
  { id: '11', label: '11', title: '11 Call Ended' },
  { id: '12', label: '12', title: '12 Prescription' },
  { id: '13', label: '13', title: '13 Blood Test' },
  { id: '14', label: '14', title: '14 Test Booked' },
  { id: '15', label: '15', title: '15 Lab Report' },
  { id: '16', label: '16', title: '16 Notifications' },
]

type PhoneSize = 'iphone' | 'iphone-max' | 'comfort'

export function PhoneFrameShell({ children }: { children: ReactNode }) {
  const activeScreen = useHerCorporateStore((s) => s.activeScreen)
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const resetDemo = useHerCorporateStore((s) => s.resetDemo)
  const [time, setTime] = useState('9:41')
  const [phoneSize, setPhoneSize] = useState<PhoneSize>('iphone')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours() % 12 || 12
      const minutes = now.getMinutes().toString().padStart(2, '0')
      setTime(`${hours}:${minutes}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-dvh w-full bg-[#FAF7F5] sm:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] sm:from-[#FDF2F4] sm:via-[#FAF7F5] sm:to-[#F3EAE6] text-slate-800 flex flex-col items-center justify-center sm:py-3 sm:px-4 antialiased selection:bg-rose-100 selection:text-rose-950">
      
      {/* Top Desktop Floating Toolbar (Hidden on real mobile devices) */}
      <aside className="w-full max-w-4xl mb-2 hidden sm:flex items-center justify-between px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E8DFDC] shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-900 font-semibold text-xs border border-rose-200">
            <Smartphone className="size-3.5 text-rose-700" strokeWidth={1.5} />
            Her iPhone
          </span>
          <span className="text-xs text-slate-300 font-medium">·</span>
          <span className="text-xs text-slate-500 font-medium">
            {phoneSize === 'iphone' ? 'iPhone (412px)' : phoneSize === 'iphone-max' ? 'iPhone Max (440px)' : 'Comfort (520px)'}
          </span>
        </div>

        <div className="flex items-center gap-2 max-w-xl px-1">
          <select
            value={activeScreen}
            onChange={(e) => setActiveScreen(e.target.value)}
            className="h-7.5 min-w-[130px] text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5 focus:border-[#2A0E1A] focus:outline-hidden cursor-pointer"
            title="Jump to screen"
          >
            {SCREENS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
            {SCREENS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveScreen(s.id)}
                title={s.title}
                className={cn(
                  'px-2 py-0.5 text-[11px] font-semibold rounded-lg transition-all whitespace-nowrap tabular-nums',
                  activeScreen === s.id
                    ? 'bg-[#2A0E1A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 text-[11px] font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => setPhoneSize('iphone')}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                phoneSize === 'iphone' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900',
              )}
            >
              iPhone
            </button>
            <button
              type="button"
              onClick={() => setPhoneSize('iphone-max')}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                phoneSize === 'iphone-max' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900',
              )}
            >
              Max
            </button>
            <button
              type="button"
              onClick={() => setPhoneSize('comfort')}
              className={cn(
                'px-2 py-0.5 rounded-md transition-all',
                phoneSize === 'comfort' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900',
              )}
            >
              520px
            </button>
          </div>

          <button
            type="button"
            onClick={resetDemo}
            title="Reset back to Splash with default state"
            className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-900 hover:bg-rose-50 border border-slate-200 transition-colors"
          >
            <RotateCcw className="size-3.5" strokeWidth={1.5} />
            <span>Reset</span>
          </button>
        </div>
      </aside>

      {/* 
        RESPONSIVE CONTAINER:
        - Mobile (< 640px): True edge-to-edge full-screen native web app (NO fake notch, NO outer phone frame).
        - Desktop (>= 640px): Realistic compact iPhone chassis (412px standard).
      */}
      <div
        className={cn(
          'w-full h-dvh flex flex-col sm:rounded-[48px] sm:p-[10px] sm:bg-[#181615] sm:shadow-[0_25px_60px_-15px_rgba(42,14,26,0.35),0_0_0_1px_rgba(255,255,255,0.1),0_0_0_6px_#272422,0_0_0_8px_#3E3936] relative transition-all duration-300',
          phoneSize === 'iphone'
            ? 'sm:w-[412px] sm:h-[874px] sm:max-h-[94vh]'
            : phoneSize === 'iphone-max'
            ? 'sm:w-[440px] sm:h-[910px] sm:max-h-[96vh]'
            : 'sm:w-[520px] sm:h-[960px] sm:max-h-[96vh]',
        )}
      >
        {/* Physical Button Accents (Desktop only) */}
        <div className="hidden sm:block absolute -left-[10px] top-24 w-[2.5px] h-7 bg-[#3E3936] rounded-l-xs" />
        <div className="hidden sm:block absolute -left-[10px] top-35 w-[2.5px] h-11 bg-[#3E3936] rounded-l-xs" />
        <div className="hidden sm:block absolute -left-[10px] top-49 w-[2.5px] h-11 bg-[#3E3936] rounded-l-xs" />
        <div className="hidden sm:block absolute -right-[10px] top-32 w-[2.5px] h-15 bg-[#3E3936] rounded-r-xs" />

        {/* Inner Phone Screen Container */}
        <div className="relative flex flex-col flex-1 w-full h-full min-h-0 bg-[#FAF7F5] sm:rounded-[38px] overflow-hidden sm:shadow-inner">
          
          {/* Simulated iOS Status Bar & Dynamic Island (Desktop preview ONLY — hidden on real mobile!) */}
          <div className="hidden sm:flex relative z-40 items-center justify-between px-6 pt-3 pb-1 bg-transparent select-none shrink-0">
            <span className="font-semibold text-xs tracking-tight text-slate-900 pl-1 tabular-nums">
              {time}
            </span>

            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 flex items-center justify-between w-26 h-6 px-2 bg-black rounded-full shadow-inner pointer-events-none">
              <span className="size-2.5 rounded-full bg-[#0a0a0a] ring-1 ring-white/10" />
              <span className="size-1.5 rounded-full bg-[#111] ring-1 ring-emerald-500/30" />
            </div>

            <div className="flex items-center gap-1.5 text-slate-800 pr-1">
              <span className="flex items-end gap-[1.5px] h-2.5">
                <span className="w-[2.5px] h-1 bg-slate-800 rounded-2xs" />
                <span className="w-[2.5px] h-1.5 bg-slate-800 rounded-2xs" />
                <span className="w-[2.5px] h-2 bg-slate-800 rounded-2xs" />
                <span className="w-[2.5px] h-2.5 bg-slate-800 rounded-2xs" />
              </span>
              <Wifi className="size-3 text-slate-800" strokeWidth={2} />
              <Battery className="size-3.5 text-slate-800 fill-slate-800" strokeWidth={1.5} />
            </div>
          </div>

          {/* 
            Main App Content Viewport:
            Edge-to-edge on real mobile (pt-safe pb-safe), smooth scroll in desktop mockup
          */}
          <div className="relative flex-1 w-full min-h-0 overflow-y-auto overflow-x-hidden flex flex-col touch-pan-y scrollbar-none pt-safe pb-safe sm:pt-0 sm:pb-0">
            {children}
            <NotificationToast />
          </div>

          {/* Simulated iOS Home Indicator Bar (Desktop preview ONLY — hidden on real mobile!) */}
          <div className="hidden sm:flex relative z-40 w-full py-1.5 justify-center bg-transparent pointer-events-none shrink-0">
            <div className="w-32 h-1 bg-slate-400/50 rounded-full" />
          </div>

        </div>
      </div>

    </div>
  )
}
