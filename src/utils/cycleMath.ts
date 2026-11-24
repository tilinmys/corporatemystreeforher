import { addDays, differenceInCalendarDays, format, isValid, parseISO, startOfDay } from 'date-fns'

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export interface CycleMetrics {
  cycleDay: number
  cycleLength: number
  periodLength: number
  phase: CyclePhase
  phaseLabel: string
  phaseDescription: string
  nextPeriodDate: Date
  nextPeriodFormatted: string
  daysUntilNextPeriod: number
  fertileWindowStart: Date
  fertileWindowEnd: Date
  fertileWindowFormatted: string
  progressPercent: number
  hormoneSummary: string
  isOvulationDay: boolean
}

/**
 * Computes clinical cycle metrics based on user inputs.
 * Uses clinical gynaecological standards:
 * - Menstrual Phase: Days 1 to periodLength
 * - Follicular Phase: Day (periodLength + 1) to (ovulation - 2)
 * - Ovulatory Window: Ovulation day (cycleLength - 14) ± 2 days
 * - Luteal Phase: Post-ovulation to cycleLength
 */
export function computeCycleMetrics(
  lastPeriodStart: string | Date,
  periodLength: number = 5,
  cycleLength: number = 28,
  referenceDate: Date = new Date(),
): CycleMetrics {
  // Normalize date
  let start: Date
  if (typeof lastPeriodStart === 'string') {
    start = parseISO(lastPeriodStart)
    if (!isValid(start)) {
      start = addDays(startOfDay(referenceDate), -10)
    }
  } else if (isValid(lastPeriodStart)) {
    start = lastPeriodStart
  } else {
    start = addDays(startOfDay(referenceDate), -10)
  }

  const today = startOfDay(referenceDate)
  const diffDays = Math.max(0, differenceInCalendarDays(today, startOfDay(start)))

  // Cycle day is 1-indexed: Day 1 to cycleLength
  const cycleDay = (diffDays % cycleLength) + 1

  // Ovulation typically occurs 14 days before next cycle
  const estimatedOvulationDay = Math.max(periodLength + 2, cycleLength - 14)
  const fertileStartDay = Math.max(periodLength + 1, estimatedOvulationDay - 4)
  const fertileEndDay = Math.min(cycleLength, estimatedOvulationDay + 1)

  // Determine current phase
  let phase: CyclePhase
  let phaseLabel: string
  let phaseDescription: string
  let hormoneSummary: string

  if (cycleDay <= periodLength) {
    phase = 'menstrual'
    phaseLabel = 'Menstrual Phase'
    phaseDescription = 'Progesterone & estrogen drop; uterine shedding occurs.'
    hormoneSummary = 'Low hormone levels. Prioritize rest, hydration, and iron.'
  } else if (cycleDay < fertileStartDay) {
    phase = 'follicular'
    phaseLabel = 'Follicular Phase'
    phaseDescription = 'FSH and estrogen rise to mature follicle.'
    hormoneSummary = 'Rising estrogen promotes high mental focus and energy.'
  } else if (cycleDay <= fertileEndDay) {
    phase = 'ovulation'
    phaseLabel = 'Ovulatory Window'
    phaseDescription = 'LH surge triggers release of mature egg.'
    hormoneSummary = 'Peak estrogen & testosterone. Peak physical stamina.'
  } else {
    phase = 'luteal'
    phaseLabel = 'Luteal Phase'
    phaseDescription = 'Corpus luteum releases progesterone.'
    hormoneSummary = 'Progesterone dominates. Calming state; track PMS signs.'
  }

  // Calculate Next Period Date
  const currentCycleNumber = Math.floor(diffDays / cycleLength)
  const nextPeriodDate = addDays(start, (currentCycleNumber + 1) * cycleLength)
  const daysUntilNextPeriod = Math.max(0, differenceInCalendarDays(nextPeriodDate, today))
  const nextPeriodFormatted = format(nextPeriodDate, 'd MMM yyyy')

  // Calculate Fertile Window relative to current cycle
  const currentCycleStart = addDays(start, currentCycleNumber * cycleLength)
  const fertileWindowStart = addDays(currentCycleStart, fertileStartDay - 1)
  const fertileWindowEnd = addDays(currentCycleStart, fertileEndDay - 1)
  const fertileWindowFormatted = `${format(fertileWindowStart, 'd MMM')} – ${format(fertileWindowEnd, 'd MMM')}`

  const progressPercent = Math.min(100, Math.round((cycleDay / cycleLength) * 100))
  const isOvulationDay = cycleDay === estimatedOvulationDay

  return {
    cycleDay,
    cycleLength,
    periodLength,
    phase,
    phaseLabel,
    phaseDescription,
    nextPeriodDate,
    nextPeriodFormatted,
    daysUntilNextPeriod,
    fertileWindowStart,
    fertileWindowEnd,
    fertileWindowFormatted,
    progressPercent,
    hormoneSummary,
    isOvulationDay,
  }
}
