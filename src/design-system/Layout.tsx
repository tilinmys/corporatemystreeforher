/**
 * Layout primitives. See CLAUDE.md → "Container-sensitive grid rules".
 *  - ReadingColumn: single-column reading/setup flows, max 560px, centred.
 *  - SplitGrid + Rail: multi-part clinical workflows → 12-col asymmetric split
 *    on desktop with a sticky right-hand summary/action rail. Stacks below lg.
 */
import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}

export function ReadingColumn({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[560px]', className)}>{children}</div>
}

const SPLITS = {
  '8/4': ['lg:col-span-8', 'lg:col-span-4'],
  '7/5': ['lg:col-span-7', 'lg:col-span-5'],
} as const

export function SplitGrid({
  layout,
  main,
  rail,
  railLabel,
  railId,
}: {
  layout: keyof typeof SPLITS
  main: ReactNode
  rail: ReactNode
  railLabel: string
  railId?: string
}) {
  const [mainSpan, railSpan] = SPLITS[layout]
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className={cn('min-w-0', mainSpan)}>{main}</div>
      <aside
        id={railId}
        aria-label={railLabel}
        className={cn('min-w-0 scroll-mt-20 lg:sticky lg:top-24 lg:self-start', railSpan)}
      >
        {rail}
      </aside>
    </div>
  )
}

export function PageHeader({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-5 sm:mb-6 lg:mb-8">
      {eyebrow && <p className="text-xs font-medium tracking-wide text-muted uppercase">{eyebrow}</p>}
      <h1 className="mt-1 font-display text-[1.75rem] leading-tight font-semibold tracking-tight sm:text-3xl">{title}</h1>
      {description && <p className="mt-1.5 max-w-prose text-sm text-muted sm:text-base">{description}</p>}
    </div>
  )
}

export function Section({
  title,
  action,
  children,
  className,
}: {
  title: string
  action?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section className={cn('space-y-3', className)}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-base font-semibold sm:text-lg">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
