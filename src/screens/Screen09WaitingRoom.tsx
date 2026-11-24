import {
  Bell,
  ChevronLeft,
  Mic,
  MicOff,
  RefreshCw,
  Video,
  VideoOff,
} from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { PANEL_DOCTORS, useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen09WaitingRoom() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const confirmedBooking = useHerCorporateStore((s) => s.confirmedBooking)
  const selectedDoctorId = useHerCorporateStore((s) => s.selectedDoctorId)

  const doc =
    PANEL_DOCTORS.find((d) => d.id === (confirmedBooking?.doctorId || selectedDoctorId)) ??
    PANEL_DOCTORS[0]

  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('front')

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
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
          Waiting room
        </h1>
      </header>

      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        <div className="rounded-2xl border border-rose-200/70 bg-rose-50/70 p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="size-8 rounded-full bg-white border border-rose-200 text-rose-700 flex items-center justify-center shrink-0">
            <Bell className="size-4" strokeWidth={1.75} />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-slate-900">
              Push · 15 min before
            </p>
            <p className="text-[11px] text-slate-600 leading-tight">
              Your consult starts soon. Tap below to join.
            </p>
          </div>
        </div>

        {/* CAMERA PREVIEW */}
        <div className="rounded-3xl border border-rose-200/80 bg-gradient-to-b from-rose-50 via-white to-rose-100/60 aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-4 text-center">
          {cameraOn ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="size-16 rounded-full bg-white border border-rose-200 flex items-center justify-center shadow-xs">
                <span className="font-display text-base font-bold text-[#2A0E1A]">
                  You
                </span>
              </div>
              <p className="font-medium text-xs text-slate-600">
                Camera preview ({cameraFacing})
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-1.5 text-slate-400">
              <VideoOff className="size-8" />
              <p className="text-xs font-medium">Camera turned off</p>
            </div>
          )}

          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-md border border-rose-100 text-[10px] font-semibold text-slate-700 shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Ready
          </div>
        </div>

        <p className="text-center text-xs font-medium text-slate-600 flex items-center justify-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>Camera {cameraOn ? 'on' : 'off'}</span>
          <span>·</span>
          <span>Mic {micOn ? 'on' : 'off'}</span>
          <span>·</span>
          <span>Network good</span>
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setMicOn(!micOn)}
            className={cn(
              'h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-2xs active:scale-95',
              micOn
                ? 'border border-rose-200 bg-white text-slate-800 hover:bg-rose-50'
                : 'border border-rose-300 bg-rose-100 text-rose-800',
              focusRing,
            )}
          >
            {micOn ? <Mic className="size-4" /> : <MicOff className="size-4" />}
            <span>Mic</span>
          </button>

          <button
            type="button"
            onClick={() => setCameraOn(!cameraOn)}
            className={cn(
              'h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-2xs active:scale-95',
              cameraOn
                ? 'border border-rose-200 bg-white text-slate-800 hover:bg-rose-50'
                : 'border border-rose-300 bg-rose-100 text-rose-800',
              focusRing,
            )}
          >
            {cameraOn ? <Video className="size-4" /> : <VideoOff className="size-4" />}
            <span>Camera</span>
          </button>

          <button
            type="button"
            onClick={() => setCameraFacing(cameraFacing === 'front' ? 'back' : 'front')}
            className={cn(
              'h-11 rounded-xl border border-rose-200 bg-white text-slate-800 hover:bg-rose-50 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-2xs active:scale-95',
              focusRing,
            )}
          >
            <RefreshCw className="size-3.5" />
            <span>Switch</span>
          </button>
        </div>

        <div className="rounded-2xl border border-rose-100 bg-white p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="size-10 rounded-xl bg-rose-100 text-[#2A0E1A] font-display text-xs font-bold flex items-center justify-center shrink-0">
            {doc.initials}
          </div>
          <div className="space-y-0.5">
            <h2 className="font-semibold text-xs text-slate-900">
              {doc.name} will join shortly
            </h2>
            <p className="text-[11px] text-slate-500">
              Scheduled {confirmedBooking?.slotTime || '4:30 PM'} · Video consult
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-rose-100">
        <button
          type="button"
          onClick={() => setActiveScreen('10')}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Join consultation
        </button>
      </div>
    </div>
  )
}
