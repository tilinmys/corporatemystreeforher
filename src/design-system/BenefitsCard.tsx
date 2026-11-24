/**
 * Corporate benefits usage. Container-responsive:
 *  < @md  stacked meters
 *  ≥ @md  meters side by side in three columns
 */
import type { Benefit } from '../data/demo'
import { cardSurface, cn } from '../lib/cn'
import { RiShieldCheckLine } from './icons'

export function BenefitsCard({ company, plan, benefits }: { company: string | null; plan: string; benefits: Benefit[] }) {
  return (
    <div className="@container">
      <div className={cn(cardSurface, 'p-4 @md:p-5')}>
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-burgundy-50 text-burgundy">
            <RiShieldCheckLine className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{plan}</p>
            <p className="text-xs text-muted">{company ? `Sponsored by ${company}` : 'No company linked'}</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-[#e7f3ee] px-2.5 py-1 text-xs font-semibold text-covered border border-[#cbe4d8]">
            ₹0 per visit
          </span>
        </div>
        <ul className="mt-4 grid gap-3 @md:grid-cols-2 lg:grid-cols-4 @md:gap-4">
          {benefits.map((b) => {
            const left = b.total - b.used
            const pct = Math.min(100, Math.round((b.used / b.total) * 100))
            return (
              <li key={b.label} className="bg-porcelain/60 rounded-xl p-3 border border-hairline/60">
                <div className="flex items-baseline justify-between gap-2 text-xs">
                  <span className="font-medium text-ink truncate">{b.label}</span>
                  <span className="text-muted tabular-nums text-[11px]">
                    {left} of {b.total} left
                  </span>
                </div>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-burgundy-50"
                  role="meter"
                  aria-label={`${b.label} used`}
                  aria-valuemin={0}
                  aria-valuemax={b.total}
                  aria-valuenow={b.used}
                >
                  <div className="h-full rounded-full bg-burgundy transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
