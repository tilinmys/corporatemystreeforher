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
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen09WaitingRoom() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const [micOn, setMicOn] = useState(true)
  const [cameraOn, setCameraOn] = useState(true)
  const [cameraFacing, setCameraFacing] = useState<'front' | 'back'>('front')

  const handleJoin = () => {
    setActiveScreen('10')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 04 / 08)
        - Title "Waiting room"
        Matching exact Wireframe 09
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('04')}
          aria-label="Back to Home"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Waiting room
        </h1>
      </header>

      {/* MAIN CONTENT BODY */}
      <div className="flex-1 px-4 py-3.5 space-y-3.5">
        
        {/* TOP PUSH TOAST CARD: Push · 15 min before */}
        <div className="rounded-2xl border border-slate-300 bg-white p-3 flex items-start gap-2.5 shadow-2xs">
          <div className="size-8 rounded-full bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center shrink-0">
            <Bell className="size-4" strokeWidth={1.5} />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-xs text-slate-900">
              Push · 15 min before
            </p>
            <p className="text-[11px] text-slate-500 leading-tight">
              Your consult starts in 15 mins. Tap to join.
            </p>
          </div>
        </div>

        {/* 
          CAMERA PREVIEW BOX:
          Self camera simulation with pink & white subtle tones
        */}
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-100 via-rose-50/20 to-slate-100 aspect-[4/3] flex flex-col items-center justify-center relative overflow-hidden shadow-inner p-4 text-center">
          {cameraOn ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="size-16 rounded-full bg-white/80 border border-rose-200 flex items-center justify-center shadow-xs">
                <span className="font-display text-base font-bold text-rose-900">
                  You
                </span>
              </div>
              <p className="font-medium text-xs text-slate-600">
                Your camera preview
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-1.5 text-slate-400">
              <VideoOff className="size-8" />
              <p className="text-xs font-medium">Camera is turned off</p>
            </div>
          )}

          {/* Live indicator badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-semibold text-slate-700 shadow-2xs">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>

        {/* HARDWARE STATUS LINE */}
        <p className="text-center text-xs font-medium text-slate-600 flex items-center justify-center gap-2">
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <span>Camera {cameraOn ? 'on' : 'off'}</span>
          <span>·</span>
          <span>Mic {micOn ? 'on' : 'off'}</span>
          <span>·</span>
          <span>Network good</span>
        </p>

        {/* 
          3 CONTROL BUTTONS:
          [ Mic ]  [ Camera ]  [ Switch ]
          Matching exact wireframe
        */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setMicOn(!micOn)}
            className={cn(
              'h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-2xs active:scale-95',
              micOn
                ? 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                : 'border border-rose-300 bg-rose-50 text-rose-700',
              focusRing,
            )}
          >
            {micOn ? <Mic className="size-4 text-slate-700" /> : <MicOff className="size-4 text-rose-600" />}
            <span>Mic</span>
          </button>

          <button
            type="button"
            onClick={() => setCameraOn(!cameraOn)}
            className={cn(
              'h-11 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-2xs active:scale-95',
              cameraOn
                ? 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                : 'border border-rose-300 bg-rose-50 text-rose-700',
              focusRing,
            )}
          >
            {cameraOn ? <Video className="size-4 text-slate-700" /> : <VideoOff className="size-4 text-rose-600" />}
            <span>Camera</span>
          </button>

          <button
            type="button"
            onClick={() => setCameraFacing(cameraFacing === 'front' ? 'back' : 'front')}
            className={cn(
              'h-11 rounded-xl border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 flex items-center justify-center gap-1.5 text-xs font-semibold transition-all shadow-2xs active:scale-95',
              focusRing,
            )}
          >
            <RefreshCw className="size-3.5 text-slate-700" />
            <span>Switch</span>
          </button>
        </div>

        {/* 
          DOCTOR STATUS CARD:
          Dr. Ananya Rao will join shortly · Scheduled 4:30 PM · Video consult
        */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-center gap-3 shadow-2xs">
          <div className="size-10 rounded-full bg-rose-50 border border-rose-200 text-rose-900 font-display text-xs font-bold flex items-center justify-center shrink-0">
            Dr
          </div>
          <div className="space-y-0.5">
            <h2 className="font-semibold text-xs text-slate-900">
              Dr. Ananya Rao will join shortly
            </h2>
            <p className="text-[11px] text-slate-500">
              Scheduled 4:30 PM · Video consult
            </p>
          </div>
        </div>

      </div>

      {/* 
        BOTTOM STICKY ACTION:
        Solid "Join consultation" button
      */}
      <div className="p-4 pt-2 pb-3 bg-[#FAF7F5] border-t border-slate-100">
        <button
          type="button"
          onClick={handleJoin}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Join consultation
        </button>
      </div>

    </div>
  )
}
