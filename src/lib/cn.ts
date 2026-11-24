import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names and resolve Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Desktop keyboard focus ring (burgundy). Use on every interactive element. */
export const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-burgundy focus-visible:ring-offset-2 focus-visible:ring-offset-porcelain'

/** Base clinical card surface with the subtle desktop hover border. */
export const cardSurface = 'rounded-2xl border border-hairline bg-surface'
export const cardHover = 'transition-[border-color,box-shadow] hover:border-burgundy/40 hover:shadow-[0_8px_24px_-12px_rgb(100_30_43/0.25)]'
