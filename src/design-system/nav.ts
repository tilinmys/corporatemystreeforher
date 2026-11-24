import type { IconType } from 'react-icons'
import type { Screen } from '../store/app'
import {
  FiHome,
  RiBuilding4Line,
  RiStethoscopeLine,
  RiTestTubeLine,
} from './icons'

export interface NavItem {
  id: Screen
  label: string
  icon: IconType
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'today', label: 'Today', icon: FiHome },
  { id: 'doctors', label: 'Specialists', icon: RiStethoscopeLine },
  { id: 'lab-report', label: 'Care & Labs', icon: RiTestTubeLine },
  { id: 'corporate-settings', label: 'Plan & DPDP', icon: RiBuilding4Line },
]

export const ALL_SCREENS_LIST: { id: Screen; label: string; number: string; category: string }[] = [
  { id: 'welcome', label: 'Welcome Hero & Auth', number: '01', category: 'Onboarding' },
  { id: 'select-company', label: 'Select Company', number: '02', category: 'Onboarding' },
  { id: 'verify-employee', label: 'Verify Employee (OTP)', number: '03', category: 'Onboarding' },
  { id: 'corporate-settings', label: 'Corporate Settings & DPDP', number: '03b', category: 'Corporate' },
  { id: 'cycle-q1', label: 'Cycle Q1: Baseline Date', number: '03c', category: 'Cycle Care' },
  { id: 'cycle-q2', label: 'Cycle Q2: Rhythm & Length', number: '03d', category: 'Cycle Care' },
  { id: 'cycle-q3', label: 'Cycle Q3: Symptoms & Goals', number: '03e', category: 'Cycle Care' },
  { id: 'setup-done', label: 'Setup Done & Cycle Ring', number: '03f', category: 'Cycle Care' },
  { id: 'today', label: 'Home + Corporate Dashboard', number: '04', category: 'Dashboard' },
  { id: 'doctors', label: 'Doctor Specialist Directory', number: '05', category: 'Clinical Consult' },
  { id: 'doctor-profile', label: 'Doctor Profile & Mode', number: '06', category: 'Clinical Consult' },
  { id: 'pre-consult', label: 'Clinical Intake & ₹0 Ledger', number: '07', category: 'Clinical Consult' },
  { id: 'booking-confirmed', label: 'Booking Confirmed Ticket', number: '08', category: 'Clinical Consult' },
  { id: 'waiting-room', label: 'Clinical Waiting Room', number: '09', category: 'Telehealth' },
  { id: 'video-call', label: 'Live Video Consultation', number: '10', category: 'Telehealth' },
  { id: 'call-ended', label: 'Call Ended & 5s Morph Rx', number: '11', category: 'Telehealth' },
  { id: 'prescription', label: 'Official Medical Rx (PDF)', number: '12', category: 'Pharmacy & Rx' },
  { id: 'book-blood-test', label: 'Book Prescribed Blood Test', number: '13', category: 'Diagnostics' },
  { id: 'test-booked', label: 'Test Booked (4-Stage)', number: '14', category: 'Diagnostics' },
  { id: 'lab-report', label: '4-Col Clinical Lab Report', number: '15', category: 'Diagnostics' },
  { id: 'notifications', label: 'Notifications & Demo Triggers', number: '16', category: 'System' },
]

export const screenLabel = (id: Screen): string => {
  if (id === 'calendar') return 'Book Consultation'
  if (id === 'care') return 'Care & Lab Results'
  if (id === 'profile') return 'Corporate Plan'
  const match = ALL_SCREENS_LIST.find((s) => s.id === id)
  return match ? `${match.number} ${match.label}` : id
}
