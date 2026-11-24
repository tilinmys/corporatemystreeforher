import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, type ComponentType } from 'react'
import { PhoneFrameShell } from './design-system/PhoneFrameShell'
import { Screen00Splash } from './screens/Screen00Splash'
import { Screen01Welcome } from './screens/Screen01Welcome'
import { Screen02SelectCompany } from './screens/Screen02SelectCompany'
import { Screen03VerifyEmployee } from './screens/Screen03VerifyEmployee'
import { Screen03bCorporateSettings } from './screens/Screen03bCorporateSettings'
import { Screen03cLastPeriod } from './screens/Screen03cLastPeriod'
import { Screen03dPeriodLength } from './screens/Screen03dPeriodLength'
import { Screen03eCycleLength } from './screens/Screen03eCycleLength'
import { Screen03fSetupDone } from './screens/Screen03fSetupDone'
import { Screen04Home } from './screens/Screen04Home'
import { Screen05DoctorList } from './screens/Screen05DoctorList'
import { Screen06DoctorProfile } from './screens/Screen06DoctorProfile'
import { Screen07PreConsult } from './screens/Screen07PreConsult'
import { Screen08BookingConfirmed } from './screens/Screen08BookingConfirmed'
import { Screen09WaitingRoom } from './screens/Screen09WaitingRoom'
import { Screen10VideoCall } from './screens/Screen10VideoCall'
import { Screen11CallEnded } from './screens/Screen11CallEnded'
import { Screen12Prescription } from './screens/Screen12Prescription'
import { Screen13BookBloodTest } from './screens/Screen13BookBloodTest'
import { Screen14TestBooked } from './screens/Screen14TestBooked'
import { Screen15LabReport } from './screens/Screen15LabReport'
import { Screen16Notifications } from './screens/Screen16Notifications'
import { useApp, type Screen } from './store/app'
import { useHerCorporateStore } from './store/useHerCorporateStore'

const SCREEN_ID_TO_LEGACY: Record<string, Screen> = {
  '01': 'welcome',
  '02': 'select-company',
  '03': 'verify-employee',
  '03b': 'corporate-settings',
  '03c': 'cycle-q1',
  '03d': 'cycle-q2',
  '03e': 'cycle-q3',
  '03f': 'setup-done',
  '04': 'today',
  '05': 'doctors',
  '06': 'doctor-profile',
  '07': 'pre-consult',
  '08': 'booking-confirmed',
  '09': 'waiting-room',
  '10': 'video-call',
  '11': 'call-ended',
  '12': 'prescription',
  '13': 'book-blood-test',
  '14': 'test-booked',
  '15': 'lab-report',
  '16': 'notifications',
}

const COMPONENT_REGISTRY: Record<string, ComponentType> = {
  '00': Screen00Splash,
  splash: Screen00Splash,
  '01': Screen01Welcome,
  welcome: Screen01Welcome,
  '02': Screen02SelectCompany,
  'select-company': Screen02SelectCompany,
  '03': Screen03VerifyEmployee,
  'verify-employee': Screen03VerifyEmployee,
  '03b': Screen03bCorporateSettings,
  'corporate-settings': Screen03bCorporateSettings,
  profile: Screen03bCorporateSettings,
  '03c': Screen03cLastPeriod,
  'cycle-q1': Screen03cLastPeriod,
  '03d': Screen03dPeriodLength,
  'cycle-q2': Screen03dPeriodLength,
  '03e': Screen03eCycleLength,
  'cycle-q3': Screen03eCycleLength,
  '03f': Screen03fSetupDone,
  'setup-done': Screen03fSetupDone,
  '04': Screen04Home,
  today: Screen04Home,
  '05': Screen05DoctorList,
  doctors: Screen05DoctorList,
  calendar: Screen03fSetupDone,
  '06': Screen06DoctorProfile,
  'doctor-profile': Screen06DoctorProfile,
  '07': Screen07PreConsult,
  'pre-consult': Screen07PreConsult,
  '08': Screen08BookingConfirmed,
  'booking-confirmed': Screen08BookingConfirmed,
  '09': Screen09WaitingRoom,
  'waiting-room': Screen09WaitingRoom,
  '10': Screen10VideoCall,
  'video-call': Screen10VideoCall,
  '11': Screen11CallEnded,
  'call-ended': Screen11CallEnded,
  '12': Screen12Prescription,
  prescription: Screen12Prescription,
  '13': Screen13BookBloodTest,
  'book-blood-test': Screen13BookBloodTest,
  '14': Screen14TestBooked,
  'test-booked': Screen14TestBooked,
  '15': Screen15LabReport,
  'lab-report': Screen15LabReport,
  care: Screen05DoctorList,
  '16': Screen16Notifications,
  notifications: Screen16Notifications,
}

export default function App() {
  const activeScreen = useHerCorporateStore((s) => s.activeScreen)
  const legacyScreen = useApp((s) => s.screen)
  const setLegacyScreen = useApp((s) => s.setScreen)

  useEffect(() => {
    const mapped = SCREEN_ID_TO_LEGACY[activeScreen]
    if (mapped && useApp.getState().screen !== mapped) {
      setLegacyScreen(mapped)
    }
  }, [activeScreen, setLegacyScreen])

  const ActivePage =
    COMPONENT_REGISTRY[activeScreen] ?? COMPONENT_REGISTRY[legacyScreen] ?? Screen01Welcome

  return (
    <PhoneFrameShell>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 flex flex-col min-h-full"
        >
          <ActivePage />
        </motion.div>
      </AnimatePresence>
    </PhoneFrameShell>
  )
}
