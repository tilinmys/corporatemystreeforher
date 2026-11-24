import { ChevronLeft, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn, focusRing } from '../lib/cn'
import { useHerCorporateStore, type Company } from '../store/useHerCorporateStore'

// Company logo accent colors for a luxury clinical aesthetic
const BRAND_ACCENTS: Record<string, { bg: string; text: string; border: string }> = {
  acme: { bg: 'bg-rose-50', text: 'text-rose-950', border: 'border-rose-200' },
  northwind: { bg: 'bg-teal-50', text: 'text-teal-900', border: 'border-teal-200' },
  globex: { bg: 'bg-blue-50', text: 'text-blue-900', border: 'border-blue-200' },
  initech: { bg: 'bg-emerald-50', text: 'text-emerald-900', border: 'border-emerald-200' },
  zenith: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
  orbit: { bg: 'bg-rose-50', text: 'text-rose-900', border: 'border-rose-200' },
  stripe: { bg: 'bg-indigo-50', text: 'text-indigo-900', border: 'border-indigo-200' },
  flipkart: { bg: 'bg-yellow-50', text: 'text-yellow-900', border: 'border-yellow-200' },
}

export function Screen02SelectCompany() {
  const setActiveScreen = useHerCorporateStore((s) => s.setActiveScreen)
  const setSelectedCompany = useHerCorporateStore((s) => s.setSelectedCompany)
  const companies = useHerCorporateStore((s) => s.companies)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCompanies = useMemo(() => {
    if (!searchTerm.trim()) return companies
    const q = searchTerm.toLowerCase()
    return companies.filter((c) => c.name.toLowerCase().includes(q))
  }, [companies, searchTerm])

  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company)
    setActiveScreen('03')
  }

  return (
    <div className="flex flex-col min-h-full bg-[#FAF7F5] text-slate-800">
      
      {/* 
        TOP HEADER:
        - Back arrow < (navigates to 01)
        - Title "Select your company"
        - Hairline bottom border
        Matching exact Wireframe 2 header
      */}
      <header className="sticky top-0 z-30 flex items-center h-12 px-4 bg-white/95 backdrop-blur-md border-b border-[#E8DFDC]">
        <button
          type="button"
          onClick={() => setActiveScreen('01')}
          aria-label="Back to Welcome"
          className={cn(
            'grid size-8 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition-all -ml-1',
            focusRing,
          )}
        >
          <ChevronLeft className="size-5" strokeWidth={2} />
        </button>
        <h1 className="ml-2 font-display text-base font-bold text-slate-900 tracking-tight">
          Select your company
        </h1>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 px-4 py-3.5 space-y-4">
        
        {/* SEARCH SECTION */}
        <div className="space-y-1.5">
          <label htmlFor="company-search" className="block text-xs font-semibold text-slate-600">
            Search
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-3 size-4 text-slate-400" strokeWidth={1.5} />
            <input
              id="company-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search company name"
              className={cn(
                'block h-10 w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 hover:border-rose-400 focus:border-rose-700 focus:ring-2 focus:ring-rose-200/50 transition-colors shadow-2xs',
                focusRing,
              )}
            />
          </div>
        </div>

        {/* PARTNER COMPANIES SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Partner companies
            </span>
            <span className="text-[11px] font-medium text-rose-900">
              {filteredCompanies.length} available
            </span>
          </div>

          {/* 
            2-COLUMN GRID:
            grid grid-cols-2 gap-2.5
            Matching exact wireframe layout with centered logo pill on top and company name below
          */}
          <div className="grid grid-cols-2 gap-2.5">
            {filteredCompanies.map((comp) => {
              const accent = BRAND_ACCENTS[comp.id] || {
                bg: 'bg-rose-50',
                text: 'text-rose-950',
                border: 'border-rose-200',
              }

              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => handleSelectCompany(comp)}
                  className={cn(
                    'group relative rounded-2xl border border-slate-200 bg-white p-3.5 flex flex-col items-center justify-center text-center shadow-2xs hover:border-rose-700 hover:shadow-md transition-all active:scale-[0.98]',
                    focusRing,
                  )}
                >
                  {/* Top Centered Logo Box */}
                  <div
                    className={cn(
                      'size-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-105 shadow-2xs',
                      accent.bg,
                      accent.border,
                    )}
                  >
                    <span className={cn('font-display text-sm font-bold tracking-tight', accent.text)}>
                      {comp.initials}
                    </span>
                  </div>

                  {/* Company Name */}
                  <span className="mt-2 text-xs font-semibold text-slate-900 group-hover:text-rose-950 transition-colors truncate max-w-full">
                    {comp.name}
                  </span>

                  {/* Coverage Pill */}
                  <span className="mt-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    ₹0 Copay
                  </span>
                </button>
              )
            })}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center bg-white/60">
              <p className="text-xs font-medium text-slate-700">No partner company found matching "{searchTerm}"</p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-2 text-xs font-semibold text-rose-900 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* BOTTOM FOOTER NOTE */}
        <div className="pt-2 pb-4 text-center">
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Can't find your company? Ask your HR to contact MyStree.
          </p>
        </div>

      </div>

    </div>
  )
}
