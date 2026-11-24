import {
  FileText,
  MessageSquare,
  Mic,
  MicOff,
  PhoneOff,
  Video,
  VideoOff,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function Screen10VideoCall() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const [seconds, setSeconds] = useState(522) // starts around 08:42
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [showChatModal, setShowChatModal] = useState(false)
  const [showReportsModal, setShowReportsModal] = useState(false)

  // Live timer countdown / count-up
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60).toString().padStart(2, '0')
    const secs = (totalSec % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  const handleEndCall = () => {
    setActiveScreen('11')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-white text-slate-800 relative">
      
      {/* 
        TOP VIDEO CALL HEADER:
        - Doctor info: "Dr. Ananya Rao", "Gynaecologist"
        - Timer pill: [ 08:42 ]
        Matching exact Wireframe 10
      */}
      <header className="flex items-center justify-between h-14 px-4 bg-white border-b border-[#E8DFDC] shrink-0">
        <div>
          <h1 className="font-display text-sm font-bold text-slate-900 leading-tight">
            Dr. Ananya Rao
          </h1>
          <p className="text-xs text-slate-500">
            Gynaecologist
          </p>
        </div>

        <div className="border border-slate-300 rounded-md px-2 py-0.5 text-xs font-mono font-semibold text-slate-700 bg-slate-50 tabular-nums">
          {formatTimer(seconds)}
        </div>
      </header>

      {/* 
        MAIN FULL-SCREEN VIDEO VIEWPORT:
        Doctor's incoming video + Top-Right PiP ("You")
      */}
      <div className="flex-1 p-3 flex flex-col min-h-0">
        <div className="relative flex-1 w-full rounded-3xl bg-gradient-to-b from-[#1C1417] via-[#2A1820] to-[#120B0E] border border-slate-300/40 shadow-inner flex flex-col items-center justify-center text-white overflow-hidden p-4">
          
          {/* Subtle clinical background animation / wave */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,63,94,0.12)_0%,_transparent_70%)]" />

          {/* Doctor Video Avatar & Visual representation */}
          <div className="relative flex flex-col items-center space-y-3 z-10 text-center">
            <div className="size-20 rounded-full bg-rose-950/80 border-2 border-rose-400/40 flex items-center justify-center shadow-lg relative">
              <span className="font-display text-2xl font-bold text-rose-200">
                AR
              </span>
              <span className="absolute bottom-1 right-1 size-3.5 rounded-full bg-emerald-500 border-2 border-[#1C1417]" />
            </div>

            <div className="space-y-1">
              <p className="font-medium text-xs text-rose-100/90">
                Doctor's video (full screen)
              </p>
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/60">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected · High Definition Audio</span>
              </div>
            </div>
          </div>

          {/* 
            TOP-RIGHT PiP (Picture-in-Picture) WINDOW:
            Self-preview box labeled "You"
          */}
          <div className="absolute top-3 right-3 w-22 h-30 rounded-2xl bg-[#2A0E1A]/85 backdrop-blur-md border border-white/30 shadow-md flex flex-col items-center justify-center text-white select-none">
            {isVideoOff ? (
              <VideoOff className="size-5 text-rose-300" />
            ) : (
              <div className="size-10 rounded-full bg-white/20 flex items-center justify-center font-display text-xs font-bold text-rose-200">
                You
              </div>
            )}
            <span className="text-[10px] font-medium text-white/80 mt-1">
              You
            </span>
          </div>

        </div>
      </div>

      {/* 
        BOTTOM CALL CONTROL DOCK:
        ( M ) Mute · ( C ) Camera · ( C ) Chat · ( R ) Reports · ( E ) End
        Matching exact Wireframe 10 layout
      */}
      <div className="px-3 py-3 bg-white border-t border-[#E8DFDC] shrink-0">
        <div className="grid grid-cols-5 gap-1.5 text-center">
          
          {/* Mute Button */}
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={cn(
                'size-11 rounded-full flex items-center justify-center transition-all shadow-2xs',
                isMuted
                  ? 'bg-rose-100 text-rose-700 border border-rose-300'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200',
              )}
            >
              {isMuted ? <MicOff className="size-4" /> : <Mic className="size-4" />}
            </div>
            <span className="text-[10px] font-semibold text-slate-600">
              {isMuted ? 'Unmute' : 'Mute'}
            </span>
          </button>

          {/* Camera Button */}
          <button
            type="button"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="flex flex-col items-center gap-1 group"
          >
            <div
              className={cn(
                'size-11 rounded-full flex items-center justify-center transition-all shadow-2xs',
                isVideoOff
                  ? 'bg-rose-100 text-rose-700 border border-rose-300'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200',
              )}
            >
              {isVideoOff ? <VideoOff className="size-4" /> : <Video className="size-4" />}
            </div>
            <span className="text-[10px] font-semibold text-slate-600">
              Camera
            </span>
          </button>

          {/* Chat Button */}
          <button
            type="button"
            onClick={() => setShowChatModal(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="size-11 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-all shadow-2xs">
              <MessageSquare className="size-4" />
            </div>
            <span className="text-[10px] font-semibold text-slate-600">
              Chat
            </span>
          </button>

          {/* Reports Button */}
          <button
            type="button"
            onClick={() => setShowReportsModal(true)}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="size-11 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-all shadow-2xs">
              <FileText className="size-4" />
            </div>
            <span className="text-[10px] font-semibold text-slate-600">
              Reports
            </span>
          </button>

          {/* End Call Button */}
          <button
            type="button"
            onClick={handleEndCall}
            className="flex flex-col items-center gap-1 group"
          >
            <div className="size-11 rounded-full bg-rose-700 hover:bg-rose-800 active:bg-rose-900 text-white flex items-center justify-center transition-all shadow-xs active:scale-95">
              <PhoneOff className="size-4" />
            </div>
            <span className="text-[10px] font-semibold text-rose-700">
              End
            </span>
          </button>

        </div>
      </div>

      {/* Chat Drawer Modal */}
      {showChatModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-4 space-y-3 max-h-[60%] flex flex-col shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-semibold text-xs text-slate-900">In-Call Clinical Chat</h3>
              <button
                type="button"
                onClick={() => setShowChatModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 text-xs">
              <div className="bg-rose-50 text-rose-950 p-2.5 rounded-xl border border-rose-200">
                <strong>Dr. Ananya:</strong> Hello Priya, I have reviewed your last period date. Let us discuss your cycle regularity.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reports Drawer Modal */}
      {showReportsModal && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-4 space-y-3 max-h-[60%] flex flex-col shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="font-semibold text-xs text-slate-900">Patient Diagnostic Records</h3>
              <button
                type="button"
                onClick={() => setShowReportsModal(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                Close
              </button>
            </div>
            <div className="text-xs text-slate-600 p-2 space-y-2">
              <p>• Baseline Hormone Panel (Verified Nov 2026)</p>
              <p>• Thyroid & Vitamin Profile (100% Covered by Acme Tech)</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
