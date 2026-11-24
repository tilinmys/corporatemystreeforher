import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

export function TopNavHeader({
  title,
  subtitle,
  onBack,
  backTarget,
  rightElement,
  className,
}: {
  title: string
  subtitle?: string
  onBack?: () => void
  backTarget?: string
  rightElement?: ReactNode
  className?: string
}) {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else if (backTarget) {
      setActiveScreen(backTarget)
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#E8DFDC] bg-white/95 px-4 backdrop-blur-md lg:h-16 lg:px-8',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {(onBack || backTarget) && (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className={cn(
              'grid size-9 place-items-center rounded-xl text-ink transition-colors hover:bg-porcelain hover:text-burgundy',
              focusRing,
            )}
          >
            <ArrowLeft className="size-4.5" strokeWidth={1.5} aria-hidden />
          </button>
        )}
        <div>
          <h1 className="font-display text-base font-bold tracking-tight text-ink lg:text-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] text-muted leading-none hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {rightElement && <div className="flex items-center gap-2">{rightElement}</div>}
    </header>
  )
}
