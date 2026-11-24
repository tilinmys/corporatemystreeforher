# Her Corporate Care (Corporate MyStree for Her)

A mobile smartphone healthcare application designed for women's corporate health benefits, cycle tracking, specialist doctor consultations, and diagnostic blood testing.

Framed in an authentic, compact **iPhone chassis (412px standard)** with Dynamic Island, physical button accents, and iOS status bar.

---

## ✨ Features

- **Realistic Compact iPhone Chassis**:
  - 412px width default viewport emulating iPhone 16 / 15 Pro proportions.
  - Interactive device size toggle: `iPhone (412px)`, `iPhone Max (440px)`, and `Comfort (520px)`.
  - Authentic Dynamic Island, hardware side buttons, and iOS Home Indicator bar.
- **AI-Generated Wellness Artwork**:
  - Centerpiece high-resolution editorial wellness artwork on the Welcome screen (`welcome-ai-hero.jpg`).
  - Frosted glassmorphism badge: *"Personal care, backed by your workplace"*.
- **Unified Luxury Pink & White Palette**:
  - Warm porcelain background (`#FAF7F5`), pure crisp white cards (`#FFFFFF`), blush pink accents (`rose-50`, `rose-100`, `rose-800`), and deep velvet burgundy (`#2A0E1A`).
- **Strict Typographic Hierarchy**:
  - Editorial serif titles (`Fraunces`), clean sans-serif subheadings (`Plus Jakarta Sans`), and clear tabular numerals.
- **Comprehensive State Management (Zustand)**:
  - Corporate linking with Acme Tech (State A: unlinked vs State B: verified benefits ledger).
  - Cycle tracker setup (start date, period length, cycle length, interactive SVG ring).
  - Doctor consultation booking, live video call simulation, prescription generation, blood test ordering with ₹2,000 corporate wallet, and clinical laboratory reports.
- **Clean Healthcare UX**:
  - Zero star icons (clinical 1–5 numerical scale).
  - Zero technical clutter or distracting framework labels in the user interface.

---

## 📱 Complete 17-Screen Architecture

| Screen ID | Name | Description |
|---|---|---|
| `00` | **Splash** | Cinematic launch sequence, animated crimson Her logo, pulsing glow, auto-advance |
| `01` | **Welcome** | Circular Her emblem, AI wellness hero card, Login/Sign up, Corporate login, compact OTP sheet |
| `02` | **Select Company** | Search bar, 2-column partner companies grid with ₹0 Copay badges |
| `03` | **Verify Employee** | Employer header, email/employee ID toggle, inline OTP verification with auto-fill |
| `03b` | **Corporate Settings** | State A (unlinked) and State B (verified Acme Tech ledger, Home toggle, privacy guarantee) |
| `03c` | **Last Period Start** | Step 1 of 3 cycle setup, calendar date picker, privacy note |
| `03d` | **Period Length** | Step 2 of 3 horizontal pill selector (`[3..7]` days) with stepper |
| `03e` | **Cycle Length** | Step 3 of 3 horizontal pill selector (`[26..30]` days) with stepper |
| `03f` | **Setup Complete** | Interactive SVG cycle ring (*Day 10 of 28*), metrics ledger, free corporate consult banner |
| `04` | **Home Dashboard** | Cycle tracker card, corporate care benefits ledger, 2x2 Bento grid, upcoming doctor appointment |
| `05` | **Doctor List** | Search input, specialty filter pills (Gynaecology, PCOS, Fertility, Menopause), doctor cards |
| `06` | **Doctor Profile** | Consultation mode toggle (Video / Clinic), 5-day slot strip, appointment booking CTA |
| `07` | **Pre-Consult Form** | Doctor summary, symptom tag selector, period date picker, report upload, covered fee ledger |
| `08` | **Booking Confirmed** | Push notification alert, checkmark crest, receipt ticket, calendar integration CTA |
| `09` | **Waiting Room** | 15-min push reminder, 16:10 camera preview with live badge, hardware checks, doctor status |
| `10` | **Video Call** | Live consultation timer, full-screen doctor video, patient picture-in-picture, call controls |
| `11` | **Call Ended** | Checkmark crest, prescription preparation spinner, numerical rating scale (no star icons) |
| `12` | **Prescription** | Clinical letterhead, diagnosis notes, prescribed medicines with duration pills, lab test tags |
| `13` | **Book Blood Test** | Prescription checklist, collection type toggle,Indiranagar address card, date & slot pills |
| `14` | **Test Booked** | 4-stage vertical stepper, summary card, morning-of-test push reminder |
| `15` | **Lab Report** | Neuberg Anand partner card, 4 clinical biometric rows (Haemoglobin, TSH, Vit D, HbA1c), doctor's note |
| `16` | **Notifications** | Categorized push notification feed (Today & Earlier) with direct navigation links |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Store**: [Zustand](https://github.com/pmndrs/zustand)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: `@fontsource/fraunces` & `@fontsource/plus-jakarta-sans`
- **Linting**: [Oxlint](https://oxc.rs/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 20 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/tilinmys/corporatemystreeforher.git

# Navigate into the project directory
cd corporatemystreeforher

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The production output will be generated in the `dist/` directory.
