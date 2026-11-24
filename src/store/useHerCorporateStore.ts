import { create } from 'zustand'

export interface Company {
  id: string
  name: string
  initials: string
  domain: string
  plan: string
  allowance: string
  consultsCount: number
  healthChecksCount: number
  walletAmount: number
}

export interface PanelDoctor {
  id: string
  name: string
  role: string
  specialtyTag: 'Gynaecology' | 'PCOS' | 'Fertility' | 'Menopause'
  credentials: string
  experience: string
  languages: string
  nextSlot: string
  initials: string
  about: string
}

export const PANEL_DOCTORS: PanelDoctor[] = [
  {
    id: 'dr-ananya',
    name: 'Dr. Ananya Rao',
    role: 'Gynaecologist',
    specialtyTag: 'Gynaecology',
    credentials: 'MBBS, MS (OBG)',
    experience: '12 yrs',
    languages: 'English, Hindi, Kannada',
    nextSlot: 'Today, 4:30 PM',
    initials: 'AR',
    about:
      "Senior specialist with over 12 years of clinical practice in women's health, menstrual care, PCOS management, and preconception wellness.",
  },
  {
    id: 'dr-meera',
    name: 'Dr. Meera Iyer',
    role: 'PCOS & Endocrinology',
    specialtyTag: 'PCOS',
    credentials: 'MBBS, MD, DNB',
    experience: '9 yrs',
    languages: 'English, Tamil',
    nextSlot: 'Today, 6:00 PM',
    initials: 'MI',
    about:
      'Endocrine & PCOS specialist focused on hormonal balance, insulin resistance, thyroid wellness, and sustainable cycle regulation.',
  },
  {
    id: 'dr-kavya',
    name: 'Dr. Kavya Nair',
    role: 'Fertility Specialist',
    specialtyTag: 'Fertility',
    credentials: 'MBBS, MS, FRM',
    experience: '15 yrs',
    languages: 'English, Malayalam',
    nextSlot: 'Tomorrow, 10:00 AM',
    initials: 'KN',
    about:
      'Fertility & reproductive medicine consultant guiding preconception care, ovulation tracking, and gentle clinical diagnostics.',
  },
  {
    id: 'dr-aditi',
    name: 'Dr. Aditi Deshmukh',
    role: 'Menopause & Hormonal Care',
    specialtyTag: 'Menopause',
    credentials: 'MBBS, DGO',
    experience: '14 yrs',
    languages: 'English, Marathi, Hindi',
    nextSlot: 'Tomorrow, 12:00 PM',
    initials: 'AD',
    about:
      'Dedicated clinician for perimenopause, bone & metabolic health, sleep quality, and midlife women’s preventive wellness.',
  },
]

export interface EmployeeLink {
  company: string
  email: string
  employeeId: string
  planValidity: string
  consultsLeft: number
  consultsTotal: number
  healthChecksLeft: number
  healthChecksTotal: number
  walletLeft: number
  walletTotal: number
  showCorporateCareOnHome: boolean
  linkedAt: number
}

export interface BookingDraft {
  doctorId: string
  consultType: 'video' | 'inclinic'
  dateLabel: string
  slotTime: string
  concern: string
  medicines: string
}

export interface ConfirmedBooking {
  bookingId: string
  doctorId: string
  consultType: 'video' | 'inclinic'
  dateLabel: string
  slotTime: string
}

export interface BloodTestBooking {
  bookingId: string
  testsSummary: string
  collectionType: 'home' | 'lab'
  address: string
  dateLabel: string
  slotTime: string
}

export interface NotificationBanner {
  id: string
  title: string
  body: string
  targetScreen?: string
  at: number
}

export const SEEDED_COMPANIES: Company[] = [
  {
    id: 'acme',
    name: 'Acme Tech',
    initials: 'AT',
    domain: 'acmetech.com',
    plan: "Women's Health Plus",
    allowance: '₹15,000 / yr',
    consultsCount: 6,
    healthChecksCount: 4,
    walletAmount: 15000,
  },
  {
    id: 'northwind',
    name: 'Northwind',
    initials: 'NW',
    domain: 'northwind.com',
    plan: 'Premier Health Plan',
    allowance: '₹18,000 / yr',
    consultsCount: 8,
    healthChecksCount: 4,
    walletAmount: 18000,
  },
  {
    id: 'globex',
    name: 'Globex',
    initials: 'GX',
    domain: 'globex.com',
    plan: 'Total Wellness Suite',
    allowance: '₹20,000 / yr',
    consultsCount: 8,
    healthChecksCount: 5,
    walletAmount: 20000,
  },
  {
    id: 'initech',
    name: 'Initech',
    initials: 'IN',
    domain: 'initech.com',
    plan: 'Core Health Benefits',
    allowance: '₹12,000 / yr',
    consultsCount: 6,
    healthChecksCount: 4,
    walletAmount: 12000,
  },
  {
    id: 'zenith',
    name: 'Zenith Bank',
    initials: 'ZB',
    domain: 'zenithbank.com',
    plan: 'Executive Care Plan',
    allowance: '₹25,000 / yr',
    consultsCount: 10,
    healthChecksCount: 6,
    walletAmount: 25000,
  },
  {
    id: 'orbit',
    name: 'Orbit Labs',
    initials: 'OL',
    domain: 'orbitlabs.io',
    plan: 'Bio-Tech Complete Care',
    allowance: '₹16,000 / yr',
    consultsCount: 6,
    healthChecksCount: 4,
    walletAmount: 16000,
  },
  {
    id: 'stripe',
    name: 'Stripe India',
    initials: 'SI',
    domain: 'stripe.com',
    plan: 'Global Executive Health',
    allowance: '₹25,000 / yr',
    consultsCount: 8,
    healthChecksCount: 6,
    walletAmount: 25000,
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    initials: 'FK',
    domain: 'flipkart.com',
    plan: 'Associate Care Tier',
    allowance: '₹12,000 / yr',
    consultsCount: 6,
    healthChecksCount: 4,
    walletAmount: 12000,
  },
]

export const DEFAULT_LINKED_STATE: EmployeeLink = {
  company: 'Acme Tech',
  email: 'priya@acmetech.com',
  employeeId: 'ACM-2291',
  planValidity: '31 Mar 2027',
  consultsLeft: 3,
  consultsTotal: 4,
  healthChecksLeft: 1,
  healthChecksTotal: 1,
  walletLeft: 2000,
  walletTotal: 2000,
  showCorporateCareOnHome: true,
  linkedAt: Date.now() - 3600 * 1000,
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  avatar: string
}

export const DEFAULT_USER: UserProfile = {
  name: 'Priya Sharma',
  email: 'priya@acmetech.com',
  phone: '+91 98765 43210',
  avatar: 'P',
}

interface HerCorporateState {
  activeScreen: string
  selectedCompany: Company | null
  employeeLink: EmployeeLink | null
  companies: Company[]
  banner: NotificationBanner | null
  user: UserProfile
  isAuthenticated: boolean
  isAuthModalOpen: boolean

  // Cycle tracking baseline (Screens 03c–03f)
  last_period_start: string
  period_length: number
  cycle_length: number
  cycleSetupSkipped: boolean

  // Consult & Test State
  selectedDoctorId: string
  bookingDraft: BookingDraft
  confirmedBooking: ConfirmedBooking | null
  bloodTestBooking: BloodTestBooking | null

  // Actions
  setActiveScreen: (screen: string) => void
  setSelectedCompany: (company: Company | null) => void
  setAuthModalOpen: (open: boolean) => void
  loginUser: (phoneOrEmail: string, mode?: 'personal' | 'corporate') => void
  logoutUser: () => void
  linkCompany: (data?: Partial<EmployeeLink>) => void
  unlinkCompany: () => void
  setShowCorporateCareOnHome: (show: boolean) => void
  setLastPeriodStart: (date: string) => void
  setPeriodLength: (days: number) => void
  setCycleLength: (days: number) => void
  setCycleSetupSkipped: (skipped: boolean) => void
  setSelectedDoctorId: (id: string) => void
  setBookingDraft: (patch: Partial<BookingDraft>) => void
  confirmBooking: () => void
  cancelBooking: () => void
  confirmBloodTest: (data: Omit<BloodTestBooking, 'bookingId'>) => void
  dismissBanner: () => void
  pushBanner: (n: { title: string; body: string; targetScreen?: string }) => void
  resetDemo: () => void
}

function getDefaultLastPeriodDate(): string {
  const d = new Date()
  d.setDate(d.getDate() - 13)
  return d.toISOString().slice(0, 10)
}

const DEFAULT_BOOKING_DRAFT: BookingDraft = {
  doctorId: 'dr-ananya',
  consultType: 'video',
  dateLabel: 'Today, 24 Nov',
  slotTime: '4:30 PM',
  concern: '',
  medicines: '',
}

const DEFAULT_CONFIRMED_BOOKING: ConfirmedBooking = {
  bookingId: 'MS-10482',
  doctorId: 'dr-ananya',
  consultType: 'video',
  dateLabel: 'Today',
  slotTime: '4:30 PM',
}

export const useHerCorporateStore = create<HerCorporateState>()((set, get) => ({
  activeScreen: '00',
  selectedCompany: SEEDED_COMPANIES[0],
  employeeLink: null,
  companies: SEEDED_COMPANIES,
  banner: null,
  user: DEFAULT_USER,
  isAuthenticated: false,
  isAuthModalOpen: false,

  // Cycle defaults (Day 14 — Ovulatory window by default so pink grid shines!)
  last_period_start: getDefaultLastPeriodDate(),
  period_length: 5,
  cycle_length: 28,
  cycleSetupSkipped: false,

  selectedDoctorId: 'dr-ananya',
  bookingDraft: DEFAULT_BOOKING_DRAFT,
  confirmedBooking: DEFAULT_CONFIRMED_BOOKING,
  bloodTestBooking: null,

  setActiveScreen: (activeScreen) => set({ activeScreen }),

  setSelectedCompany: (selectedCompany) => set({ selectedCompany }),
  setAuthModalOpen: (isAuthModalOpen) => set({ isAuthModalOpen }),

  loginUser: (phoneOrEmail) => {
    set({
      isAuthenticated: true,
      isAuthModalOpen: false,
      user: {
        ...DEFAULT_USER,
        email: phoneOrEmail.includes('@') ? phoneOrEmail : DEFAULT_USER.email,
        phone: phoneOrEmail.includes('@') ? DEFAULT_USER.phone : phoneOrEmail,
      },
    })
    get().pushBanner({
      title: 'Welcome back, Priya',
      body: 'Signed into your private Her health space.',
      targetScreen: '04',
    })
  },

  logoutUser: () =>
    set({
      isAuthenticated: false,
      employeeLink: null,
      activeScreen: '01',
    }),

  setLastPeriodStart: (last_period_start) => set({ last_period_start }),
  setPeriodLength: (period_length) => set({ period_length }),
  setCycleLength: (cycle_length) => set({ cycle_length }),
  setCycleSetupSkipped: (cycleSetupSkipped) => set({ cycleSetupSkipped }),

  setSelectedDoctorId: (selectedDoctorId) =>
    set((s) => ({
      selectedDoctorId,
      bookingDraft: { ...s.bookingDraft, doctorId: selectedDoctorId },
    })),

  setBookingDraft: (patch) =>
    set((s) => ({
      bookingDraft: { ...s.bookingDraft, ...patch },
    })),

  confirmBooking: () => {
    const draft = get().bookingDraft
    const link = get().employeeLink
    const confirmed: ConfirmedBooking = {
      bookingId: `MS-${Math.floor(10000 + Math.random() * 89999)}`,
      doctorId: draft.doctorId,
      consultType: draft.consultType,
      dateLabel: draft.dateLabel,
      slotTime: draft.slotTime,
    }
    set({
      confirmedBooking: confirmed,
      employeeLink: link
        ? { ...link, consultsLeft: Math.max(0, link.consultsLeft - 1) }
        : null,
      activeScreen: '08',
    })
  },

  cancelBooking: () => {
    set({ confirmedBooking: null, activeScreen: '05' })
  },

  confirmBloodTest: (data) => {
    const link = get().employeeLink
    set({
      bloodTestBooking: {
        bookingId: `LB-${Math.floor(50000 + Math.random() * 49999)}`,
        ...data,
      },
      employeeLink: link
        ? { ...link, walletLeft: Math.max(0, link.walletLeft - 2400) }
        : null,
      activeScreen: '14',
    })
  },

  linkCompany: (data) => {
    const comp = get().selectedCompany || SEEDED_COMPANIES[0]
    const newLink: EmployeeLink = {
      company: comp.name,
      email: data?.email || `priya@${comp.domain}`,
      employeeId: data?.employeeId || 'ACM-2291',
      planValidity: '31 Mar 2027',
      consultsLeft: 3,
      consultsTotal: 4,
      healthChecksLeft: 1,
      healthChecksTotal: 1,
      walletLeft: 2000,
      walletTotal: 2000,
      showCorporateCareOnHome: true,
      linkedAt: Date.now(),
      ...data,
    }

    set({ employeeLink: newLink })

    get().pushBanner({
      title: 'Company linked',
      body: `${newLink.company} plan active · ₹0 copay enabled.`,
      targetScreen: '04',
    })
  },

  unlinkCompany: () => {
    const prev = get().employeeLink?.company
    set({ employeeLink: null })
    get().pushBanner({
      title: 'Company unlinked',
      body: prev
        ? `${prev} plan paused. Your private Her data stays safe.`
        : 'Corporate plan unlinked.',
      targetScreen: '03b',
    })
  },

  setShowCorporateCareOnHome: (show) =>
    set((s) => ({
      employeeLink: s.employeeLink
        ? { ...s.employeeLink, showCorporateCareOnHome: show }
        : null,
    })),

  dismissBanner: () => set({ banner: null }),

  pushBanner: ({ title, body, targetScreen }) => {
    const notice: NotificationBanner = {
      id: `banner-${Date.now()}`,
      title,
      body,
      targetScreen,
      at: Date.now(),
    }
    set({ banner: notice })
  },

  resetDemo: () =>
    set({
      activeScreen: '00',
      selectedCompany: SEEDED_COMPANIES[0],
      employeeLink: null,
      user: DEFAULT_USER,
      isAuthenticated: false,
      isAuthModalOpen: false,
      last_period_start: getDefaultLastPeriodDate(),
      period_length: 5,
      cycle_length: 28,
      cycleSetupSkipped: false,
      selectedDoctorId: 'dr-ananya',
      bookingDraft: DEFAULT_BOOKING_DRAFT,
      confirmedBooking: DEFAULT_CONFIRMED_BOOKING,
      bloodTestBooking: null,
      banner: {
        id: 'reset',
        title: 'Demo Reset',
        body: 'Returned to launch sequence with clean default state.',
        targetScreen: '01',
        at: Date.now(),
      },
    }),
}))
