import { Bell, ChevronLeft } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

interface NotificationItem {
  id: string
  title: string
  body: string
  time: string
  targetScreen: string
}

const TODAY_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Your blood test report is ready',
    body: 'Tap to view results',
    time: '2m',
    targetScreen: '15',
  },
  {
    id: 'n2',
    title: 'Sample collector is on the way',
    body: 'Arriving 7:15 AM',
    time: '3h',
    targetScreen: '14',
  },
]

const EARLIER_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n3',
    title: 'Your prescription is ready',
    body: 'From Dr. Ananya Rao',
    time: 'Mon',
    targetScreen: '12',
  },
  {
    id: 'n4',
    title: 'Dr. Ananya Rao is waiting for you',
    body: 'Join your video consult',
    time: 'Mon',
    targetScreen: '09',
  },
  {
    id: 'n5',
    title: 'Your consult starts in 15 mins',
    body: 'Tap to join',
    time: 'Mon',
    targetScreen: '09',
  },
  {
    id: 'n6',
    title: 'Consultation confirmed',
    body: 'Mon 23 Nov, 4:30 PM',
    time: 'Sun',
    targetScreen: '08',
  },
  {
    id: 'n7',
    title: 'Acme Tech linked to Her',
    body: 'Your corporate benefits are active',
    time: 'Sun',
    targetScreen: '03b',
  },
]

export function Screen16Notifications() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const handleNotificationClick = (targetScreen: string) => {
    setActiveScreen(targetScreen)
  }

  return (
    <div className="flex flex-col min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 04)
        - Title "Notifications"
        Matching exact Wireframe 16
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
          Notifications
        </h1>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* SECTION: TODAY */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Today
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {TODAY_NOTIFICATIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNotificationClick(item.targetScreen)}
                className={cn(
                  'w-full p-3 flex items-start gap-3 text-left hover:bg-slate-50 transition-colors',
                  focusRing,
                )}
              >
                <div className="size-9 rounded-full bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="size-4" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-bold text-xs text-slate-900 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {item.body}
                  </p>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 tabular-nums shrink-0 pt-0.5">
                  {item.time}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* SECTION: EARLIER */}
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Earlier
          </h2>

          <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 shadow-2xs overflow-hidden">
            {EARLIER_NOTIFICATIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNotificationClick(item.targetScreen)}
                className={cn(
                  'w-full p-3 flex items-start gap-3 text-left hover:bg-slate-50 transition-colors',
                  focusRing,
                )}
              >
                <div className="size-9 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bell className="size-4" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0 space-y-0.5">
                  <p className="font-semibold text-xs text-slate-900 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {item.body}
                  </p>
                </div>
                <span className="text-[10px] font-medium text-slate-400 tabular-nums shrink-0 pt-0.5">
                  {item.time}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}
