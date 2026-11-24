import { CalendarDays, Home, Stethoscope, User } from 'lucide-react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

type TabId = 'today' | 'calendar' | 'care' | 'profile'

const TABS: {
  id: TabId
  label: string
  targetScreen: string
  icon: typeof Home
}[] = [
  { id: 'today', label: 'Today', targetScreen: '04', icon: Home },
  { id: 'calendar', label: 'Cycle', targetScreen: '03f', icon: CalendarDays },
  { id: 'care', label: 'Care', targetScreen: '05', icon: Stethoscope },
  { id: 'profile', label: 'Profile', targetScreen: '03b', icon: User },
]

export function BottomNav({ active }: { active: TabId }) {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  return (
    <nav
      aria-label="Primary app navigation"
      className="sticky bottom-0 z-30 flex items-center justify-around h-14 bg-white/95 backdrop-blur-md border-t border-purple-100 px-2 shrink-0 pb-safe sm:pb-0 shadow-[0_-4px_20px_-8px_rgba(88,28,135,0.08)]"
    >
      {TABS.map((tab) => {
        const Icon = tab.icon
        const isActive = active === tab.id

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveScreen(tab.targetScreen)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 flex-1 py-1 rounded-xl transition-all active:scale-95',
              isActive
                ? 'text-[#3B0764] font-bold'
                : 'text-slate-400 hover:text-purple-700 font-medium',
              focusRing,
            )}
          >
            <span
              className={cn(
                'flex items-center justify-center w-11 h-6.5 rounded-full transition-colors',
                isActive ? 'bg-purple-100 text-[#4C1D95]' : 'bg-transparent',
              )}
            >
              <Icon className="size-4" strokeWidth={isActive ? 2.2 : 1.75} aria-hidden />
            </span>
            <span className="text-[10px] leading-none">{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
