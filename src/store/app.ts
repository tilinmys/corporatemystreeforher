import { create } from 'zustand'

export type Screen =
  | 'welcome' // 01 Welcome
  | 'select-company' // 02 Select Company
  | 'verify-employee' // 03 Verify Employee
  | 'corporate-settings' // 03b Corporate Settings
  | 'cycle-q1' // 03c Cycle Q1
  | 'cycle-q2' // 03d Cycle Q2
  | 'cycle-q3' // 03e Cycle Q3
  | 'setup-done' // 03f Setup Done
  | 'today' // 04 Home + Corporate (Bento Dashboard)
  | 'doctors' // 05 Doctor List
  | 'doctor-profile' // 06 Doctor Profile + Slot
  | 'pre-consult' // 07 Pre-consult + Confirm
  | 'booking-confirmed' // 08 Booking Confirmed
  | 'waiting-room' // 09 Waiting Room
  | 'video-call' // 10 Video Call
  | 'call-ended' // 11 Call Ended
  | 'prescription' // 12 Prescription
  | 'book-blood-test' // 13 Book Blood Test
  | 'test-booked' // 14 Test Booked
  | 'lab-report' // 15 Lab Report
  | 'notifications' // 16 Notifications
  | 'calendar' // alias to doctors
  | 'care' // alias to lab-report
  | 'profile' // alias to corporate-settings

export type NameMode = 'real' | 'spec'
export type ViewportMode = 'fluid' | 'phone'

export interface AppNotification {
  id: string
  title: string
  body: string
  targetScreen: Screen
  read: boolean
  at: number
  category?: 'clinical' | 'booking' | 'corporate' | 'lab'
}

export interface Booking {
  doctorId: string
  day: string
  slot: string
  mode: 'video' | 'audio'
  bookingId: string
  patientName: string
  patientEmpId: string
  createdAt: number
}

const params = new URLSearchParams(window.location.search)
/** True when rendered inside the "390px Phone" preview iframe. */
export const IS_EMBED = params.get('embed') === '1'

let seq = 0
const nextId = () => `n${Date.now().toString(36)}${(seq++).toString(36)}`

const seedNotifications = (): AppNotification[] => [
  {
    id: 'n-welcome',
    title: 'Acme Tech Plan Activated',
    body: 'Your ₹15,000 corporate outpatient allowance is active. Specialist consults and lab tests are covered at ₹0.',
    targetScreen: 'corporate-settings',
    read: true,
    at: Date.now() - 4 * 3600 * 1000,
    category: 'corporate',
  },
  {
    id: 'n-rx',
    title: 'New Digital Prescription Ready',
    body: 'Dr. Surbhi Sinha issued Rx #RX-2026-9812 with prescribed tests and medications.',
    targetScreen: 'prescription',
    read: false,
    at: Date.now() - 45 * 60 * 1000,
    category: 'clinical',
  },
  {
    id: 'n-lab',
    title: 'Verified Lab Results Ready',
    body: 'Your hormone & thyroid panel results have been reviewed by Dr. Arvind Mehta, MD.',
    targetScreen: 'lab-report',
    read: false,
    at: Date.now() - 15 * 60 * 1000,
    category: 'lab',
  },
]

const demoState = () => ({
  screen: 'today' as Screen,
  linkedCompany: 'Acme Tech' as string | null,
  companyEmail: 'priya.sharma@acmetech.example',
  otpValue: '842195',
  dpdpFirewallActive: true,
  autoCoverApply: true,
  discreetDelivery: true,
  calendarSync: true,

  // Cycle tracking state
  lastPeriodDate: '10 Nov 2026',
  cycleLength: 28,
  flowIntensity: 'medium' as 'light' | 'medium' | 'heavy',
  regularity: 'regular' as 'regular' | 'irregular' | 'varies',
  symptoms: ['Period cramps', 'Fatigue', 'Hormonal acne'],
  primaryGoal: 'PCOS & Cramp Management',

  // Doctor & Booking state
  selectedDoctorId: 'surbhi' as string,
  selectedDayIdx: 0,
  selectedSlot: '16:30' as string,
  consultMode: 'video' as 'video' | 'audio',
  clinicalConcern: 'Severe spasmodic pelvic cramps for the past 2 cycles accompanied by fatigue and irregular spotting.',
  symptomDuration: '1–6 months',
  consentTelemed: true,
  booking: {
    doctorId: 'surbhi',
    day: 'Today',
    slot: '4:30 PM',
    mode: 'video',
    bookingId: 'MYSTREE-8492',
    patientName: 'Priya Sharma',
    patientEmpId: 'EMP-89214',
    createdAt: Date.now() - 20 * 60 * 1000,
  } as Booking | null,

  // Video call & Telehealth state
  micEnabled: true,
  cameraEnabled: true,
  callDuration: 8 * 60 + 24, // 08:24
  feedbackRating: 5,
  feedbackTags: ['Thorough explanation', 'Empathetic listener', 'Clear next steps'],
  rxMorphDone: false,

  // Blood tests & Diagnostic state
  selectedLabTests: ['hormone-panel', 'iron-vitd'],
  collectionMode: 'home' as 'home' | 'lab',
  collectionAddress: 'Flat 402, Lotus Orchid, Indiranagar, Bengaluru - 560038',
  collectionSlot: '07:30 AM',
  labStage: 2 as 1 | 2 | 3 | 4, // 1: Phlebotomist Assigned, 2: Sample Collected, 3: Transit, 4: Report Ready

  // Notifications & Toast
  notifications: seedNotifications(),
  toast: null as AppNotification | null,
  notificationFilter: 'all' as 'all' | 'unread',
})

interface AppState extends ReturnType<typeof demoState> {
  nameMode: NameMode
  viewport: ViewportMode
  epoch: number

  setScreen: (screen: Screen) => void
  setNameMode: (mode: NameMode) => void
  setViewport: (mode: ViewportMode) => void
  selectDoctor: (id: string) => void
  setSelectedDayIdx: (idx: number) => void
  setSelectedSlot: (slot: string) => void
  setConsultMode: (mode: 'video' | 'audio') => void
  setClinicalConcern: (concern: string) => void
  setSymptomDuration: (dur: string) => void
  setConsentTelemed: (consent: boolean) => void

  confirmBooking: (booking: Booking, doctorName: string) => void
  cancelBooking: () => void

  linkCompany: (name: string) => void
  unlinkCompany: () => void
  setCompanyEmail: (email: string) => void
  setOtpValue: (otp: string) => void
  toggleDPDP: () => void

  setCycleLength: (len: number) => void
  setFlowIntensity: (flow: 'light' | 'medium' | 'heavy') => void
  setRegularity: (reg: 'regular' | 'irregular' | 'varies') => void
  toggleSymptom: (sym: string) => void
  setPrimaryGoal: (goal: string) => void

  setMicEnabled: (v: boolean) => void
  setCameraEnabled: (v: boolean) => void
  setFeedbackRating: (r: number) => void
  toggleFeedbackTag: (t: string) => void
  setRxMorphDone: (done: boolean) => void

  toggleLabTest: (id: string) => void
  setCollectionMode: (mode: 'home' | 'lab') => void
  setCollectionAddress: (addr: string) => void
  setCollectionSlot: (slot: string) => void
  advanceLabStage: () => void
  setLabStage: (stage: 1 | 2 | 3 | 4) => void

  push: (n: Pick<AppNotification, 'title' | 'body' | 'targetScreen' | 'category'>) => void
  openNotification: (id: string) => void
  dismissToast: () => void
  markAllRead: () => void
  setNotificationFilter: (filter: 'all' | 'unread') => void
  resetDemo: () => void
}

export const useApp = create<AppState>()((set, get) => ({
  ...demoState(),
  nameMode: params.get('names') === 'spec' ? 'spec' : 'real',
  viewport: 'fluid',
  epoch: 0,

  setScreen: (screen) => set({ screen }),
  setNameMode: (nameMode) => set({ nameMode }),
  setViewport: (viewport) => set({ viewport }),
  selectDoctor: (selectedDoctorId) => set({ selectedDoctorId }),
  setSelectedDayIdx: (selectedDayIdx) => set({ selectedDayIdx }),
  setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
  setConsultMode: (consultMode) => set({ consultMode }),
  setClinicalConcern: (clinicalConcern) => set({ clinicalConcern }),
  setSymptomDuration: (symptomDuration) => set({ symptomDuration }),
  setConsentTelemed: (consentTelemed) => set({ consentTelemed }),

  confirmBooking: (booking, doctorName) => {
    set({ booking })
    get().push({
      title: 'Appointment confirmed',
      body: `${doctorName} · ${booking.day}, ${booking.slot}. Covered by ${get().linkedCompany ?? 'Corporate Plan'}.`,
      targetScreen: 'booking-confirmed',
      category: 'booking',
    })
  },
  cancelBooking: () => set({ booking: null }),

  linkCompany: (linkedCompany) => set({ linkedCompany }),
  unlinkCompany: () => set({ linkedCompany: null }),
  setCompanyEmail: (companyEmail) => set({ companyEmail }),
  setOtpValue: (otpValue) => set({ otpValue }),
  toggleDPDP: () => set((s) => ({ dpdpFirewallActive: !s.dpdpFirewallActive })),

  setCycleLength: (cycleLength) => set({ cycleLength }),
  setFlowIntensity: (flowIntensity) => set({ flowIntensity }),
  setRegularity: (regularity) => set({ regularity }),
  toggleSymptom: (sym) =>
    set((s) => ({
      symptoms: s.symptoms.includes(sym) ? s.symptoms.filter((x) => x !== sym) : [...s.symptoms, sym],
    })),
  setPrimaryGoal: (primaryGoal) => set({ primaryGoal }),

  setMicEnabled: (micEnabled) => set({ micEnabled }),
  setCameraEnabled: (cameraEnabled) => set({ cameraEnabled }),
  setFeedbackRating: (feedbackRating) => set({ feedbackRating }),
  toggleFeedbackTag: (tag) =>
    set((s) => ({
      feedbackTags: s.feedbackTags.includes(tag)
        ? s.feedbackTags.filter((x) => x !== tag)
        : [...s.feedbackTags, tag],
    })),
  setRxMorphDone: (rxMorphDone) => set({ rxMorphDone }),

  toggleLabTest: (id) =>
    set((s) => ({
      selectedLabTests: s.selectedLabTests.includes(id)
        ? s.selectedLabTests.filter((x) => x !== id)
        : [...s.selectedLabTests, id],
    })),
  setCollectionMode: (collectionMode) => set({ collectionMode }),
  setCollectionAddress: (collectionAddress) => set({ collectionAddress }),
  setCollectionSlot: (collectionSlot) => set({ collectionSlot }),
  advanceLabStage: () =>
    set((s) => ({
      labStage: (s.labStage >= 4 ? 1 : ((s.labStage + 1) as 1 | 2 | 3 | 4)),
    })),
  setLabStage: (labStage) => set({ labStage }),

  push: (n) => {
    const notice: AppNotification = { ...n, id: nextId(), read: false, at: Date.now() }
    set((s) => ({ notifications: [notice, ...s.notifications], toast: notice }))
  },

  openNotification: (id) => {
    const n = get().notifications.find((x) => x.id === id) ?? get().toast
    if (!n) return
    set((s) => ({
      screen: n.targetScreen,
      toast: null,
      notifications: s.notifications.map((x) => (x.id === id ? { ...x, read: true } : x)),
    }))
  },

  dismissToast: () => set({ toast: null }),
  markAllRead: () =>
    set((s) => ({ notifications: s.notifications.map((x) => ({ ...x, read: true })) })),
  setNotificationFilter: (notificationFilter) => set({ notificationFilter }),

  resetDemo: () =>
    set((s) => ({
      ...demoState(),
      epoch: s.epoch + 1,
      toast: {
        id: 'reset',
        title: 'Demo Reset',
        body: 'All clinical screens and states have been reset to starting state.',
        targetScreen: 'today',
        read: true,
        at: Date.now(),
        category: 'corporate',
      },
    })),
}))

/** Inside the phone-preview iframe, follow the presenter's name toggle. */
if (IS_EMBED) {
  window.addEventListener('message', (e) => {
    if (e.origin !== window.location.origin) return
    const data = e.data as { type?: string; nameMode?: NameMode; reset?: boolean }
    if (data?.type !== 'her-demo') return
    if (data.nameMode) useApp.getState().setNameMode(data.nameMode)
  })
}
