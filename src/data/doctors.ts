import { useApp } from '../store/app'

export interface Doctor {
  id: string
  name: string
  specialty: string
  credentials: string
  years: number
  languages: string[]
  portrait?: string
  nextSlot: string
  rating: number
  reviewsCount: number
  bio: string
  hospitalAffiliation: string
  regNo: string
}

type Clinical = Omit<Doctor, 'name' | 'portrait'>

const CLINICAL: Clinical[] = [
  {
    id: 'surbhi',
    specialty: 'Gynaecology & Fertility',
    credentials: 'MBBS, MS, DNB, MRCOG (UK), FRM',
    years: 10,
    languages: ['English', 'Hindi'],
    nextSlot: 'Today, 4:30 PM',
    rating: 4.9,
    reviewsCount: 1420,
    bio: 'Specialist in adolescent gynaecology, PCOS endocrinology, fertility optimization, and laparoscopic surgery with over a decade of clinical care at leading tertiary hospitals.',
    hospitalAffiliation: 'Manipal Hospital & MyStree Center of Excellence',
    regNo: 'KMC Reg. 84920',
  },
  {
    id: 'smitha',
    specialty: 'High-risk Obstetrics & Fertility',
    credentials: 'MBBS, MS, DNB (OBG), FFM, FRM',
    years: 23,
    languages: ['English', 'Kannada', 'Tamil'],
    nextSlot: 'Today, 5:30 PM',
    rating: 4.95,
    reviewsCount: 2840,
    bio: 'Senior consultant specializing in complex high-risk maternal-fetal medicine, recurrent pregnancy loss, advanced ultrasound diagnostics and reproductive endocrinology.',
    hospitalAffiliation: 'Cloudnine Hospitals & MyStree Clinical Lead',
    regNo: 'KMC Reg. 47219',
  },
  {
    id: 'chaitra',
    specialty: 'Reproductive Endocrinology (PCOS)',
    credentials: 'MBBS, MS (OBG), FNB (Reproductive Medicine)',
    years: 24,
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    nextSlot: 'Tomorrow, 10:00 AM',
    rating: 4.88,
    reviewsCount: 1980,
    bio: 'Pioneer in metabolic endocrine protocols for women, insulin resistance management, hypothalamic amenorrhea, and evidence-based preconception health.',
    hospitalAffiliation: 'Aster CMI Hospital & MyStree Endocrine Board',
    regNo: 'KMC Reg. 39184',
  },
  {
    id: 'jasmine',
    specialty: 'Pelvic Physiotherapy & Lactation',
    credentials: 'MPT – OBG Physiotherapy, IBCLC Lactation Specialist',
    years: 21,
    languages: ['English', 'Kannada'],
    nextSlot: 'Tomorrow, 11:30 AM',
    rating: 4.92,
    reviewsCount: 1650,
    bio: 'Clinical specialist in pelvic floor rehabilitation, postpartum diastasis recti, dyspareunia, antenatal conditioning, and evidence-based lactation counseling.',
    hospitalAffiliation: 'Apollo Cradle & MyStree Pelvic Health Lead',
    regNo: 'IAP Reg. 12948',
  },
]

/** "Real MyStree": names and portraits from the MyStree website (Experts section). */
const REAL: Record<string, Pick<Doctor, 'name' | 'portrait'>> = {
  surbhi: { name: 'Dr. Surbhi Sinha', portrait: '/doctors/surbhi.webp' },
  smitha: { name: 'Dr. Smitha A.P.', portrait: '/doctors/smitha.webp' },
  chaitra: { name: 'Dr. Chaitra Nayak', portrait: '/doctors/chaitra.webp' },
  jasmine: { name: 'Dr. Jasmine Flora', portrait: '/doctors/jasmine.webp' },
}

/** "Spec Names": fictional names with monogram portraits, for spec reviews. */
const SPEC: Record<string, Pick<Doctor, 'name'>> = {
  surbhi: { name: 'Dr. Meera Kulkarni' },
  smitha: { name: 'Dr. Ananya Rao' },
  chaitra: { name: 'Dr. Kavya Iyer' },
  jasmine: { name: 'Dr. Leela Thomas' },
}

export function getDoctors(mode: 'real' | 'spec'): Doctor[] {
  return CLINICAL.map((c) => ({ ...c, ...(mode === 'real' ? REAL[c.id] : SPEC[c.id]) }))
}

const realDoctors = getDoctors('real')
const specDoctors = getDoctors('spec')

/** Doctors list that follows the presenter's Real/Spec toggle. */
export function useDoctors(): Doctor[] {
  return useApp((s) => (s.nameMode === 'real' ? realDoctors : specDoctors))
}
