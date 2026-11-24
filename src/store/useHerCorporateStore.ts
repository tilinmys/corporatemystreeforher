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
  activeScreen: string // '01', '02', '03', '03b', '03c', '04', etc.
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
  dismissBanner: () => void
  pushBanner: (n: { title: string; body: string; targetScreen?: string }) => void
  resetDemo: () => void
}

function getDefaultLastPeriodDate(): string {
  const d = new Date()
  d.setDate(d.getDate() - 10)
  return d.toISOString().slice(0, 10)
}

export const useHerCorporateStore = create<HerCorporateState>()((set, get) => ({
  activeScreen: '01',
  selectedCompany: SEEDED_COMPANIES[0],
  employeeLink: null, // Starts unlinked so user can experience Screen 01 -> 02 -> 03 flow, or State A in 03b
  companies: SEEDED_COMPANIES,
  banner: null,
  user: DEFAULT_USER,
  isAuthenticated: false,
  isAuthModalOpen: false,

  // Cycle defaults
  last_period_start: getDefaultLastPeriodDate(),
  period_length: 5,
  cycle_length: 28,
  cycleSetupSkipped: false,

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
      body: 'You are signed into your private Her health account.',
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

  linkCompany: (data) => {
    const comp = get().selectedCompany || SEEDED_COMPANIES[0]
    const newLink: EmployeeLink = {
      company: comp.name,
      email: data?.email || 'priya@acmetech.com',
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

    // Fire push banner
    get().pushBanner({
      title: 'Company verified & linked',
      body: `Your ${newLink.company} healthcare plan is now active. ₹0 copay on specialist consults.`,
      targetScreen: '04',
    })
  },

  unlinkCompany: () => {
    const prev = get().employeeLink?.company
    set({ employeeLink: null })
    get().pushBanner({
      title: 'Company unlinked',
      body: prev
        ? `${prev} plan paused. Your private Her health and cycle records remain 100% intact.`
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
      activeScreen: '01',
      selectedCompany: SEEDED_COMPANIES[0],
      employeeLink: null,
      user: DEFAULT_USER,
      isAuthenticated: false,
      isAuthModalOpen: false,
      last_period_start: getDefaultLastPeriodDate(),
      period_length: 5,
      cycle_length: 28,
      cycleSetupSkipped: false,
      banner: {
        id: 'reset',
        title: 'Demo Reset',
        body: 'Screens, inputs, and corporate link returned to initial state.',
        targetScreen: '01',
        at: Date.now(),
      },
    }),
}))
