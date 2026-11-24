// Demo clinical & corporate data for Her Corporate Care (MyStree)

export const PLAN_NAME = "Women's Health Plus"

export interface Benefit {
  label: string
  used: number
  total: number
}

export const BENEFITS: Benefit[] = [
  { label: 'Specialist consults', used: 2, total: 6 },
  { label: 'Lab panels', used: 1, total: 4 },
  { label: 'Pelvic physiotherapy & lactation', used: 0, total: 2 },
  { label: 'Nutrition & mental health', used: 0, total: 3 },
]

export interface Company {
  id: string
  name: string
  tagline: string
  plan: string
  allowance: string
  consultsCount: number
  logoText: string
  badgeColor: string
}

export const COMPANIES: Company[] = [
  {
    id: 'acme',
    name: 'Acme Tech',
    tagline: 'Enterprise Care Tier · 2,400+ employees',
    plan: "Women's Health Plus",
    allowance: '₹15,000 / yr',
    consultsCount: 6,
    logoText: 'ACME',
    badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  },
  {
    id: 'stripe',
    name: 'Stripe India',
    tagline: 'Global Executive Care · Active',
    plan: 'Comprehensive Care Tier',
    allowance: '₹25,000 / yr',
    consultsCount: 8,
    logoText: 'STRIPE',
    badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    tagline: 'Associate Wellness Program · Active',
    plan: 'Primary Women’s Care',
    allowance: '₹12,000 / yr',
    consultsCount: 6,
    logoText: 'FK',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    tagline: 'Fintech Health Benefit · Active',
    plan: 'Fintech Care Tier',
    allowance: '₹18,000 / yr',
    consultsCount: 8,
    logoText: 'RZP',
    badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
  },
  {
    id: 'swiggy',
    name: 'Swiggy',
    tagline: 'Corporate Pulse Health · Active',
    plan: 'Maternity & Gynaecology Tier',
    allowance: '₹15,000 / yr',
    consultsCount: 6,
    logoText: 'SWIGGY',
    badgeColor: 'bg-orange-50 text-orange-800 border-orange-200',
  },
  {
    id: 'zerodha',
    name: 'Zerodha',
    tagline: 'Nudge Wellness Tier · Active',
    plan: 'Holistic Health Tier',
    allowance: '₹20,000 / yr',
    consultsCount: 8,
    logoText: 'ZERODHA',
    badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
  },
]

export type LabStatus = 'normal' | 'low' | 'high'

export interface LabResult {
  id: string
  test: string
  value: string
  unit: string
  range: string
  status: LabStatus
  interpretation?: string
}

export const LAB_RESULTS: LabResult[] = [
  {
    id: 'tsh',
    test: 'TSH (Thyroid Stimulating Hormone)',
    value: '2.10',
    unit: 'mIU/L',
    range: '0.40 – 4.00',
    status: 'normal',
    interpretation: 'Optimal euthyroid function. Metabolic clearance is balanced.',
  },
  {
    id: 'hb',
    test: 'Haemoglobin (CBC)',
    value: '11.6',
    unit: 'g/dL',
    range: '12.0 – 15.5',
    status: 'low',
    interpretation: 'Mild microcytic anemia. Iron supplementation advised.',
  },
  {
    id: 'vitd',
    test: 'Total 25-OH Vitamin D',
    value: '18.2',
    unit: 'ng/mL',
    range: '30.0 – 100.0',
    status: 'low',
    interpretation: 'Deficiency noted. High-dose oral cholecalciferol course indicated.',
  },
  {
    id: 'ferritin',
    test: 'Serum Ferritin',
    value: '42.0',
    unit: 'ng/mL',
    range: '15.0 – 150.0',
    status: 'normal',
    interpretation: 'Within normal baseline reserves; iron absorption therapy will stabilize.',
  },
  {
    id: 'hba1c',
    test: 'HbA1c (Glycated Haemoglobin)',
    value: '5.4',
    unit: '%',
    range: '< 5.7',
    status: 'normal',
    interpretation: 'Normal glycemic control over last 90 days. Non-diabetic range.',
  },
  {
    id: 'lh-fsh',
    test: 'LH / FSH Ratio',
    value: '1.10',
    unit: 'ratio',
    range: '1.00 – 1.50',
    status: 'normal',
    interpretation: 'Balanced follicular endocrine profile. No evidence of PCOS hyperandrogenism.',
  },
  {
    id: 'insulin',
    test: 'Fasting Serum Insulin',
    value: '8.4',
    unit: 'μIU/mL',
    range: '2.6 – 24.9',
    status: 'normal',
    interpretation: 'Normal insulin sensitivity index (HOMA-IR < 2.0).',
  },
]

export interface BloodTestItem {
  id: string
  title: string
  description: string
  originalPrice: number
  covered: boolean
  fastingRequired: boolean
  sampleType: string
}

export const AVAILABLE_BLOOD_TESTS: BloodTestItem[] = [
  {
    id: 'hormone-panel',
    title: "Women's Hormone & Thyroid Panel",
    description: 'TSH, FT3, FT4, LH, FSH, Prolactin, Estradiol',
    originalPrice: 1200,
    covered: true,
    fastingRequired: true,
    sampleType: 'Serum 5ml',
  },
  {
    id: 'iron-vitd',
    title: 'Vitamin D3 & Iron Deficit Panel',
    description: '25-OH Vitamin D, Serum Ferritin, Complete Blood Count (CBC)',
    originalPrice: 800,
    covered: true,
    fastingRequired: false,
    sampleType: 'Whole Blood EDTA',
  },
  {
    id: 'metabolic-insulin',
    title: 'Metabolic & Fasting Insulin Screen',
    description: 'HbA1c, Fasting Blood Sugar, Fasting Insulin, Lipid Profile',
    originalPrice: 400,
    covered: true,
    fastingRequired: true,
    sampleType: 'Fluoride / Serum',
  },
]

export interface PrescriptionData {
  rxId: string
  date: string
  doctorName: string
  doctorSpecialty: string
  doctorReg: string
  doctorCredentials: string
  patientName: string
  patientEmpId: string
  patientAge: number
  patientGender: string
  diagnosis: string
  icd10: string
  medications: {
    name: string
    dosage: string
    frequency: string // e.g. 1-0-1
    timing: string // after food
    duration: string
    instructions: string
  }[]
  advisedTests: string[]
  lifestyleNotes: string
}

export const SAMPLE_PRESCRIPTION: PrescriptionData = {
  rxId: 'RX-2026-9812',
  date: '24 Nov 2026',
  doctorName: 'Dr. Surbhi Sinha',
  doctorSpecialty: 'Gynaecology & High-Risk Obstetrics',
  doctorReg: 'KMC Reg. 84920 / NMC-2015',
  doctorCredentials: 'MBBS, MS (OBG), DNB, MRCOG (UK), FRM',
  patientName: 'Priya Sharma',
  patientEmpId: 'EMP-89214 · Acme Tech',
  patientAge: 28,
  patientGender: 'Female',
  diagnosis: 'Spasmodic Dysmenorrhea with Vitamin D Deficiency & Microcytic Anemia',
  icd10: 'N94.6 / E55.9',
  medications: [
    {
      name: 'Tab. Dydrogesterone',
      dosage: '10 mg',
      frequency: '1 - 0 - 1',
      timing: 'After food',
      duration: '10 days (Day 15–25)',
      instructions: 'Progestogenic luteal support for cycle regulation.',
    },
    {
      name: 'Tab. Cholecalciferol (Vitamin D3)',
      dosage: '60,000 IU',
      frequency: '1 - 0 - 0 (Once weekly)',
      timing: 'With full glass of milk',
      duration: '8 weeks',
      instructions: 'High-potency replenishment for bone and hormonal modulation.',
    },
    {
      name: 'Tab. Ferrous Ascorbate + Folic Acid',
      dosage: '100 mg / 1.5 mg',
      frequency: '0 - 1 - 0',
      timing: 'Post lunch',
      duration: '30 days',
      instructions: 'Do not take with tea or dairy products.',
    },
    {
      name: 'Tab. Mefenamic Acid + Drotaverine',
      dosage: '250 mg / 80 mg',
      frequency: 'SOS (As needed)',
      timing: 'When cramp severity > 4/10',
      duration: 'Max 3 days',
      instructions: 'Take with warm water during acute pelvic pain episode.',
    },
  ],
  advisedTests: [
    "Women's Hormone & Thyroid Panel (TSH, FT3, FT4, LH, FSH)",
    'Vitamin D3 & Iron Deficit Panel (25-OH Vit D, Ferritin, CBC)',
    'Pelvic Ultrasound (USG) with Doppler review in 3 weeks',
  ],
  lifestyleNotes:
    'Maintain adequate hydration (2.5L/day), magnesium-rich diet (spinach, pumpkin seeds, dark chocolate), and pelvic stretching during the late luteal phase.',
}

export const SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
].map((time, i) => ({ time, available: ![2, 6, 9].includes(i) }))
