import { ChevronLeft, Plus } from 'lucide-react'
import { useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore } from '../store/useHerCorporateStore'

interface DiagnosticTest {
  id: string
  name: string
  price: number
  selected: boolean
}

const INITIAL_TESTS: DiagnosticTest[] = [
  { id: 'cbc', name: 'CBC (Complete Blood Count)', price: 400, selected: true },
  { id: 'tsh', name: 'Thyroid (TSH)', price: 500, selected: true },
  { id: 'vitd', name: 'Vitamin D (25-OH)', price: 1100, selected: true },
  { id: 'hba1c', name: 'HbA1c (Glycated Haemoglobin)', price: 400, selected: true },
]

const DATES = ['Tue 24', 'Wed 25', 'Thu 26', 'Fri 27']
const SLOTS = ['7–9 AM', '9–11 AM', '11–1 PM']

export function Screen13BookBloodTest() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const employeeLink = useHerCorporateStore((s) => s.employeeLink)
  const companyName = employeeLink?.company || 'Acme Tech'

  const [tests, setTests] = useState<DiagnosticTest[]>(INITIAL_TESTS)
  const [collectionType, setCollectionType] = useState<'home' | 'lab'>('home')
  const [address, setAddress] = useState('12th Main, Indiranagar, Bengaluru')
  const [selectedDate, setSelectedDate] = useState('Tue 24')
  const [selectedSlot, setSelectedSlot] = useState('7–9 AM')
  const [isEditingAddress, setIsEditingAddress] = useState(false)

  const toggleTest = (id: string) => {
    setTests(
      tests.map((t) => (t.id === id ? { ...t, selected: !t.selected } : t)),
    )
  }

  const selectedTests = tests.filter((t) => t.selected)
  const totalPrice = selectedTests.reduce((sum, t) => sum + t.price, 0)

  const handleConfirm = () => {
    setActiveScreen('14')
  }

  return (
    <div className="flex flex-col justify-between min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 12)
        - Title "Book blood test"
        Matching exact Wireframe 13
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('12')}
          aria-label="Back to Prescription"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Book blood test
        </h1>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* PRESCRIPTION TESTS CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs space-y-3">
          <p className="text-xs text-slate-500 font-medium">
            From your prescription · Dr. Ananya Rao
          </p>

          <div className="space-y-2.5">
            {tests.map((test) => (
              <label
                key={test.id}
                className="flex items-center justify-between text-xs cursor-pointer select-none py-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={test.selected}
                    onChange={() => toggleTest(test.id)}
                    className="size-4 rounded border-slate-300 text-rose-950 focus:ring-rose-200 cursor-pointer"
                  />
                  <span className={cn('font-semibold', test.selected ? 'text-slate-900' : 'text-slate-400')}>
                    {test.name}
                  </span>
                </div>

                <span className="font-semibold text-slate-700 tabular-nums">
                  ₹{test.price}
                </span>
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={() => alert('Additional specialized test packages can be added from the diagnostics catalog.')}
            className="flex items-center gap-1 text-xs font-semibold text-rose-950 hover:underline pt-1"
          >
            <Plus className="size-3.5" />
            <span>Add more tests</span>
          </button>
        </div>

        {/* SECTION: COLLECTION TYPE */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Collection type
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCollectionType('home')}
              className={cn(
                'h-9 px-4 rounded-full text-xs font-semibold transition-all',
                collectionType === 'home'
                  ? 'bg-[#2A0E1A] text-white shadow-2xs'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                focusRing,
              )}
            >
              Home sample collection
            </button>
            <button
              type="button"
              onClick={() => setCollectionType('lab')}
              className={cn(
                'h-9 px-4 rounded-full text-xs font-semibold transition-all',
                collectionType === 'lab'
                  ? 'bg-[#2A0E1A] text-white shadow-2xs'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50',
                focusRing,
              )}
            >
              Visit lab
            </button>
          </div>
        </div>

        {/* ADDRESS CARD */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3.5 flex items-center justify-between shadow-2xs">
          <div className="space-y-0.5">
            <h4 className="font-bold text-xs text-slate-900">
              {collectionType === 'home' ? 'Home' : 'Partner Diagnostic Center'}
            </h4>
            {isEditingAddress ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onBlur={() => setIsEditingAddress(false)}
                className="text-xs border border-rose-300 rounded-md p-1 w-full"
                autoFocus
              />
            ) : (
              <p className="text-xs text-slate-500">
                {address}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsEditingAddress(!isEditingAddress)}
            className="text-xs font-semibold text-rose-950 hover:underline px-2 py-1"
          >
            {isEditingAddress ? 'Save' : 'Change'}
          </button>
        </div>

        {/* SECTION: DATE */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Date
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {DATES.map((d) => {
              const isSelected = selectedDate === d

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  className={cn(
                    'h-10 rounded-xl text-xs font-semibold transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
                    focusRing,
                  )}
                >
                  {d}
                </button>
              )
            })}
          </div>
        </div>

        {/* SECTION: TIME SLOT */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Time slot
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {SLOTS.map((s) => {
              const isSelected = selectedSlot === s

              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSlot(s)}
                  className={cn(
                    'h-10 rounded-xl text-xs font-semibold transition-all select-none',
                    isSelected
                      ? 'bg-[#2A0E1A] text-white shadow-2xs'
                      : 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50',
                    focusRing,
                  )}
                >
                  {s}
                </button>
              )
            })}
          </div>
          <p className="text-[11px] text-slate-400">
            Fast for 10–12 hours before collection.
          </p>
        </div>

      </div>

      {/* 
        BOTTOM TOTAL LEDGER & CONFIRM ACTION:
        Total: ~~₹2,400~~ ₹0
        Paid from Acme Tech test wallet
        Matching exact Wireframe 13
      */}
      <div className="p-4 pt-3 pb-3 bg-white border-t border-[#E8DFDC] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-slate-700">Total</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 line-through tabular-nums">₹{totalPrice}</span>
            <span className="font-bold text-slate-900 tabular-nums">₹0</span>
          </div>
        </div>

        <p className="text-[10px] text-emerald-700 font-medium">
          Paid from {companyName} test wallet (₹2,000 allowance applied)
        </p>

        <button
          type="button"
          disabled={selectedTests.length === 0}
          onClick={handleConfirm}
          className={cn(
            'flex h-11 w-full items-center justify-center rounded-xl bg-[#2A0E1A] hover:bg-[#3D0E18] active:bg-[#1C0526] px-4 text-xs font-semibold text-white shadow-sm disabled:opacity-50 active:scale-[0.99] transition-all',
            focusRing,
          )}
        >
          Confirm booking
        </button>
      </div>

    </div>
  )
}
