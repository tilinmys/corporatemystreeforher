/**
 * One lab value. Container-responsive:
 *  < @md  two lines: test + status chip / value + reference range
 *  ≥ @md  single row: test | value | reference range | status
 */
import type { LabResult, LabStatus } from '../data/demo'
import { cn } from '../lib/cn'

const STATUS: Record<LabStatus, { label: string; cls: string }> = {
  normal: { label: 'In range', cls: 'bg-[#e7f3ee] text-covered' },
  low: { label: 'Low', cls: 'bg-amber-50 text-amber-800' },
  high: { label: 'High', cls: 'bg-burgundy-50 text-burgundy' },
}

export function LabResultRow({ result }: { result: LabResult }) {
  const s = STATUS[result.status]
  return (
    <li className="@container">
      <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3 @md:grid-cols-[minmax(0,1.6fr)_1fr_1fr_auto] @md:gap-x-4 @md:py-3.5">
        <p className="min-w-0 truncate text-sm font-semibold">{result.test}</p>
        <span className={cn('justify-self-end rounded-full px-2.5 py-1 text-xs font-semibold @md:order-last', s.cls)}>
          {s.label}
        </span>
        <p className="text-sm tabular-nums">
          <span className="font-semibold">{result.value}</span> <span className="text-xs text-muted">{result.unit}</span>
        </p>
        <p className="justify-self-end text-xs text-muted tabular-nums @md:justify-self-start">
          <span className="@md:hidden">Ref </span>
          {result.range}
        </p>
      </div>
    </li>
  )
}
