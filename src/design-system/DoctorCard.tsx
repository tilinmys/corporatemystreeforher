/**
 * Container-responsive doctor card. Adapts to its parent column, not the screen.
 *
 *  < @lg (512px)  compact: [88px portrait | details]
 *                 full-width bottom bar: Next slot (left) · ₹0 Covered (right)
 *                 whole card is the tap target (≥44px)
 *  ≥ @lg          wide: [116px portrait | credentials & languages | slot + ₹0 + "Book slot →"]
 */
import type { Doctor } from '../data/doctors'
import { cardHover, cardSurface, cn, focusRing } from '../lib/cn'
import { FiArrowRight, FiClock, RiShieldCheckLine } from './icons'

function Portrait({ doctor }: { doctor: Doctor }) {
  if (doctor.portrait) {
    return (
      <img
        src={doctor.portrait}
        alt={`Portrait of ${doctor.name}`}
        loading="lazy"
        decoding="async"
        className="aspect-[4/5] w-full rounded-xl bg-burgundy-50 object-cover object-top"
      />
    )
  }
  const initials = doctor.name
    .replace(/^Dr\.?\s*/, '')
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
  return (
    <div
      role="img"
      aria-label={`${doctor.name} (placeholder portrait)`}
      className="grid aspect-[4/5] w-full place-items-center rounded-xl bg-[linear-gradient(160deg,#f4e9ec,#d9aeb9)] font-display text-2xl font-semibold text-burgundy @lg:text-3xl"
    >
      {initials}
    </div>
  )
}

export function DoctorCard({
  doctor,
  selected = false,
  onBook,
}: {
  doctor: Doctor
  selected?: boolean
  onBook: (doctor: Doctor) => void
}) {
  const bookLabel = `Book ${doctor.name}, next slot ${doctor.nextSlot}`

  return (
    <article className="@container">
      <div
        className={cn(
          cardSurface,
          cardHover,
          'relative grid grid-cols-[88px_1fr] gap-x-3 gap-y-3 p-3.5',
          '@lg:grid-cols-[116px_1fr_auto] @lg:gap-x-5 @lg:p-4',
          selected && 'border-burgundy ring-2 ring-burgundy hover:border-burgundy bg-burgundy-50/20',
        )}
      >
        <Portrait doctor={doctor} />

        {/* Details */}
        <div className="min-w-0 self-center">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-display text-[1.05rem] leading-snug font-semibold text-ink @lg:text-xl">
              {doctor.name}
            </h3>
          </div>
          <p className="mt-0.5 text-[13px] font-medium text-burgundy">{doctor.specialty}</p>
          <p className="mt-1 hidden text-xs text-muted @lg:block">{doctor.credentials}</p>
          <p className="mt-1 text-xs text-muted/90 truncate">
            {doctor.hospitalAffiliation || `${doctor.years} yrs experience`}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
            <span className="truncate">
              {doctor.years} yrs · {doctor.languages.join(', ')}
            </span>
          </p>
        </div>

        {/* Slot / coverage: full-width bottom bar when narrow, right column when wide */}
        <div
          className={cn(
            'col-span-2 flex items-center justify-between gap-3 border-t border-hairline pt-3',
            '@lg:col-span-1 @lg:w-[160px] @lg:flex-col @lg:items-end @lg:justify-center @lg:gap-2.5 @lg:border-t-0 @lg:border-l @lg:pt-0 @lg:pl-5',
          )}
        >
          <div className="flex items-center gap-1.5 text-xs text-muted @lg:flex-col @lg:items-end @lg:gap-0 @lg:text-right">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <FiClock className="size-3 shrink-0" aria-hidden />
              Next slot
            </span>
            <span className="font-semibold text-ink text-xs @lg:text-sm">{doctor.nextSlot}</span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e7f3ee] px-2.5 py-1 text-xs font-semibold text-covered border border-[#cbe4d8]">
            <RiShieldCheckLine className="size-3.5" aria-hidden />
            ₹0 Covered
          </span>
          <button
            type="button"
            onClick={() => onBook(doctor)}
            aria-label={bookLabel}
            className={cn(
              'hidden min-h-11 items-center gap-1.5 rounded-xl bg-burgundy px-4 text-sm font-semibold whitespace-nowrap text-white transition-colors hover:bg-burgundy-700 active:scale-[0.99] @lg:inline-flex',
              focusRing,
            )}
          >
            Book slot <FiArrowRight className="size-4" aria-hidden />
          </button>
        </div>

        {/* Narrow layout: the whole card is the tap target */}
        <button
          type="button"
          onClick={() => onBook(doctor)}
          aria-label={bookLabel}
          className={cn('absolute inset-0 rounded-2xl @lg:hidden', focusRing)}
        />
      </div>
    </article>
  )
}
