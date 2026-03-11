import { useState, useMemo, useEffect } from 'react'
import {
  Search, GraduationCap, Users, TrendingUp, School, SlidersHorizontal, X,
  LayoutGrid, List, ArrowLeft, MapPin, Calendar, BookOpen, ChevronLeft, ChevronRight,
} from 'lucide-react'
import { schoolsData } from '../data/mockData'

const PAGE_SIZE = 6
const TYPE_OPTIONS   = ['All', 'Primary', 'Secondary', 'Technical', 'Vocational']
const STATUS_OPTIONS = ['All', 'Active', 'Inactive']
const COMPLIANCE_OPTIONS = [
  { label: 'All',         min: 0,  max: 100 },
  { label: '≥ 85% High',  min: 85, max: 100 },
  { label: '75–84% Med',  min: 75, max: 84  },
  { label: '< 75% Low',   min: 0,  max: 74  },
]

const typeColors = {
  Primary:    { bg: 'rgba(37,99,235,0.09)',  color: '#2563EB' },
  Secondary:  { bg: 'rgba(0,35,51,0.08)',    color: '#002333' },
  Technical:  { bg: 'rgba(124,58,237,0.09)', color: '#7C3AED' },
  Vocational: { bg: 'rgba(245,158,11,0.09)', color: '#D97706' },
}

function SchoolLogo({ name, size = 40 }) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  return (
    <img src={`https://picsum.photos/seed/${slug}/${size * 2}/${size * 2}`} alt={name}
      className="rounded-xl object-cover flex-shrink-0" style={{ width: size, height: size }} />
  )
}

function FilterLabel({ children }) {
  return <p className="text-[10px] font-black uppercase tracking-widest text-[#002333] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>{children}</p>
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full text-sm rounded-lg px-3 py-2 outline-none appearance-none"
      style={{ background: '#F4F6F8', color: '#374151', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', fontWeight: 500 }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const range = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: '1px solid #F4F6F8' }}>
      <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => onPage(page - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          <ChevronLeft size={13} strokeWidth={2.5} /> Prev
        </button>
        {range.map(p => (
          <button key={p} onClick={() => onPage(p)}
            className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
            style={{ background: page === p ? '#002333' : '#F4F6F8', color: page === p ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
            {p}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => onPage(page + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-40"
          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          Next <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

// ── School Detail Page ────────────────────────────────────────────────────────
function SchoolDetail({ school, onBack }) {
  const [principalErr, setPrincipalErr] = useState(false)
  const tc = typeColors[school.type] || { bg: '#F4F6F8', color: '#666' }
  const enrollPct = Math.round((school.enrollment / school.capacity) * 100)
  const compColor  = school.compliance >= 85 ? '#0367A0' : school.compliance >= 75 ? '#D97706' : '#A60003'
  const enrollColor = enrollPct >= 85 ? '#0367A0' : enrollPct >= 70 ? '#D97706' : '#A60003'
  const principalUrl = `https://randomuser.me/api/portraits/${school.principal.gender}/${school.principal.photoId}.jpg`
  const pInitials = school.principal.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={13} strokeWidth={2.5} style={{ color: '#9CA3AF' }} />}
        <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
    </div>
  )

  return (
    <div className="max-w-[900px] space-y-5">
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-[#002333]"
        style={{ fontFamily: 'Lato, sans-serif' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#0367A0' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#002333' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Schools
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
        <div style={{ height: 6, background: 'linear-gradient(90deg, #002333 0%, #0367A0 100%)' }} />
        <div className="px-7 py-6 flex items-center gap-6">
          <SchoolLogo name={school.name} size={88} />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.name}</h1>
              <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                style={{ background: tc.bg, color: tc.color, fontFamily: 'Lato, sans-serif' }}>{school.type}</span>
              <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                style={{ background: school.status === 'Active' ? '#0367A0' : '#A60003', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
                {school.status}
              </span>
            </div>
            <p className="text-sm font-mono font-bold text-[#4B5563] mt-1">{school.code}</p>
            <p className="text-sm font-semibold text-[#374151] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
              {school.district} · Est. {school.established}
            </p>
          </div>
          <div className="text-center bg-[#F8FAFC] rounded-xl px-6 py-4 flex-shrink-0" style={{ border: '1px solid #EEF0F3' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Compliance</p>
            <p className="text-3xl font-black" style={{ fontFamily: 'Sora, sans-serif', color: compColor }}>{school.compliance}%</p>
            <p className="text-[10px] text-[#9CA3AF] font-semibold mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
              {school.compliance >= 85 ? 'High' : school.compliance >= 75 ? 'Medium' : 'Low'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Location & Info */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>Location & Info</h3>
          <InfoRow label="District"    value={school.district}    icon={MapPin} />
          <InfoRow label="County"      value={school.county}      icon={MapPin} />
          <InfoRow label="School Type" value={school.type}        icon={School} />
          <InfoRow label="Established" value={school.established} icon={Calendar} />
          <InfoRow label="Teachers"    value={`${school.teachers} assigned`} icon={Users} />
        </div>

        {/* Leadership */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>School Leadership</h3>
          <div className="flex items-center gap-4 p-4 rounded-xl mb-3" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            {principalErr ? (
              <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#002333' }}>
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>{pInitials}</span>
              </div>
            ) : (
              <img src={principalUrl} alt={school.principal.name}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                style={{ border: '2px solid #EEF0F3' }}
                onError={() => setPrincipalErr(true)} />
            )}
            <div>
              <p className="text-base font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.principal.name}</p>
              <p className="text-xs font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>School Principal</p>
              <p className="text-xs text-[#9CA3AF] mt-1 font-mono">
                {school.principal.name.split(' ')[0].toLowerCase()}.{school.principal.name.split(' ').slice(-1)[0].toLowerCase()}@moe.gov.lr
              </p>
            </div>
          </div>
          <InfoRow label="Accreditation" value="MoE Approved" icon={BookOpen} />
        </div>
      </div>

      {/* Enrollment & Compliance bars */}
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
        <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>Enrollment & Compliance</h3>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>Enrollment Rate</span>
              <span className="text-sm font-black" style={{ color: enrollColor, fontFamily: 'Sora, sans-serif' }}>{enrollPct}%</span>
            </div>
            <div className="h-3 rounded-full mb-2" style={{ background: '#EEF0F3' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${enrollPct}%`, background: enrollColor }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.enrollment.toLocaleString()}</span>
              <span className="text-xs text-[#9CA3AF] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>of {school.capacity.toLocaleString()} capacity</span>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>MoE Compliance</span>
              <span className="text-sm font-black" style={{ color: compColor, fontFamily: 'Sora, sans-serif' }}>{school.compliance}%</span>
            </div>
            <div className="h-3 rounded-full mb-2" style={{ background: '#EEF0F3' }}>
              <div className="h-full rounded-full transition-all" style={{ width: `${school.compliance}%`, background: compColor }} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black" style={{ color: compColor, fontFamily: 'Sora, sans-serif' }}>
                {school.compliance >= 85 ? 'High' : school.compliance >= 75 ? 'Medium' : 'Low'} Standing
              </span>
              <span className="text-xs text-[#9CA3AF] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>Standard: 85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Schools Page ─────────────────────────────────────────────────────────
export default function Schools() {
  const [search, setSearch]               = useState('')
  const [typeFilter, setTypeFilter]       = useState('All')
  const [statusFilter, setStatusFilter]   = useState('All')
  const [complianceFilter, setComplianceFilter] = useState('All')
  const [selected, setSelected]           = useState(null)
  const [viewMode, setViewMode]           = useState('grid')
  const [page, setPage]                   = useState(1)

  const complianceOpt = COMPLIANCE_OPTIONS.find(o => o.label === complianceFilter) || COMPLIANCE_OPTIONS[0]

  const filtered = useMemo(() =>
    schoolsData.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.district.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase())
      const matchType   = typeFilter === 'All'   || s.type   === typeFilter
      const matchStatus = statusFilter === 'All' || s.status === statusFilter
      const matchComp   = s.compliance >= complianceOpt.min && s.compliance <= complianceOpt.max
      return matchSearch && matchType && matchStatus && matchComp
    }), [search, typeFilter, statusFilter, complianceFilter])

  useEffect(() => { setPage(1) }, [search, typeFilter, statusFilter, complianceFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalEnrollment = schoolsData.reduce((s, sc) => s + sc.enrollment, 0)
  const avgCompliance   = Math.round(schoolsData.reduce((s, sc) => s + sc.compliance, 0) / schoolsData.length)
  const activeCount     = schoolsData.filter((s) => s.status === 'Active').length

  const hasActiveFilter = search || typeFilter !== 'All' || statusFilter !== 'All' || complianceFilter !== 'All'
  const clearFilters    = () => { setSearch(''); setTypeFilter('All'); setStatusFilter('All'); setComplianceFilter('All') }

  if (selected) {
    return <SchoolDetail school={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Schools',    value: '30',                             icon: School,        color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Total Enrollment', value: totalEnrollment.toLocaleString(), icon: GraduationCap, color: '#0367A0', bg: 'rgba(3,103,160,0.08)' },
          { label: 'Avg Compliance',   value: avgCompliance + '%',              icon: TrendingUp,    color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Active Schools',   value: activeCount.toString(),           icon: Users,         color: '#0367A0', bg: 'rgba(3,103,160,0.08)' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                <p className="text-2xl font-bold mt-1.5" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={20} strokeWidth={2.5} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Body: Sidebar + Cards/Table */}
      <div className="flex gap-5 items-start">

        {/* Filter Sidebar */}
        <div className="w-[210px] flex-shrink-0 bg-white rounded-xl p-4 sticky top-[88px]"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} strokeWidth={2.5} className="text-[#002333]" />
              <span className="text-[13px] font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</span>
            </div>
            {hasActiveFilter && (
              <button onClick={clearFilters} className="text-[11px] font-semibold text-[#A60003] hover:underline" style={{ fontFamily: 'Lato, sans-serif' }}>Clear</button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <FilterLabel>Search</FilterLabel>
              <div className="relative">
                <Search size={13} strokeWidth={2.5} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, code, district…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: '#F4F6F8', color: '#374151', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', fontWeight: 500 }} />
              </div>
            </div>
            <div>
              <FilterLabel>School Type</FilterLabel>
              <div className="flex flex-col gap-1">
                {TYPE_OPTIONS.map(t => (
                  <button key={t} onClick={() => setTypeFilter(t)}
                    className="text-left text-sm px-3 py-1.5 rounded-lg font-medium transition-colors"
                    style={{ fontFamily: 'Lato, sans-serif', background: typeFilter === t ? '#002333' : 'transparent', color: typeFilter === t ? '#fff' : '#4B5563' }}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
            </div>
            <div>
              <FilterLabel>Compliance</FilterLabel>
              <FilterSelect value={complianceFilter} onChange={setComplianceFilter} options={COMPLIANCE_OPTIONS.map(o => o.label)} />
            </div>
          </div>
        </div>

        {/* Cards / Table Panel */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length} school{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              {hasActiveFilter && (
                <button onClick={clearFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#002333] transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif' }}>
                  <X size={12} strokeWidth={2.5} /> Clear filters
                </button>
              )}
              <div className="flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
                {[{ mode: 'grid', Icon: LayoutGrid, label: 'Grid' }, { mode: 'table', Icon: List, label: 'Table' }].map(({ mode, Icon, label }) => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                    style={{ background: viewMode === mode ? '#002333' : 'transparent', color: viewMode === mode ? '#fff' : '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                    <Icon size={13} strokeWidth={2.5} />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Grid View ── */}
          {viewMode === 'grid' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {paginated.map((school) => {
                  const tc = typeColors[school.type] || { bg: '#F4F6F8', color: '#666' }
                  return (
                    <div key={school.id}
                      className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                      style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
                      onClick={() => setSelected(school)}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div className="px-5 pt-4 pb-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                        <div className="flex items-center gap-3">
                          <SchoolLogo name={school.name} size={40} />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{school.name}</p>
                            <p className="text-[11px] font-black text-[#374151] font-mono">{school.code}</p>
                          </div>
                          <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold flex-shrink-0"
                            style={{ background: tc.bg, color: tc.color, fontFamily: 'Lato, sans-serif' }}>{school.type}</span>
                        </div>
                      </div>
                      <div className="px-5 py-3 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>District</p>
                          <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.district.replace(' District', '')}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Enrolled</p>
                          <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.enrollment.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="px-5 py-2.5 flex items-center justify-between" style={{ borderTop: '1px solid #F4F6F8' }}>
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{ background: school.status === 'Active' ? '#0367A0' : '#A60003', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
                          {school.status}
                        </span>
                        <span className="text-xs font-black text-[#0367A0]" style={{ fontFamily: 'Lato, sans-serif' }}>
                          View School →
                        </span>
                      </div>
                    </div>
                  )
                })}
                {filtered.length === 0 && (
                  <div className="col-span-2 py-16 text-center">
                    <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No schools match your filter</p>
                  </div>
                )}
              </div>
              <Pagination page={page} totalPages={totalPages} onPage={setPage} />
            </>
          )}

          {/* ── Table View ── */}
          {viewMode === 'table' && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#FAFBFC' }}>
                      {['School', 'District', 'Type', 'Principal', 'Enrollment', 'Est.', 'Compliance', 'Status', ''].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
                          style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((school) => {
                      const tc = typeColors[school.type] || { bg: '#F4F6F8', color: '#666' }
                      return (
                        <tr key={school.id} className="transition-colors cursor-pointer" style={{ borderTop: '1px solid #F4F6F8' }}
                          onClick={() => setSelected(school)}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              <SchoolLogo name={school.name} size={36} />
                              <div>
                                <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif', maxWidth: 190 }}>{school.name}</p>
                                <span className="text-[11px] font-black text-[#374151] font-mono">{school.code}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.district}</td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                              style={{ background: tc.bg, color: tc.color, fontFamily: 'Lato, sans-serif' }}>{school.type}</span>
                          </td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.principal.name}</td>
                          <td className="px-4 py-3.5">
                            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.enrollment.toLocaleString()}</p>
                            <p className="text-xs text-[#9CA3AF]">of {school.capacity.toLocaleString()}</p>
                          </td>
                          <td className="px-4 py-3.5 text-sm font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.established}</td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full"
                                style={{ background: school.compliance >= 85 ? '#0367A0' : school.compliance >= 75 ? '#D97706' : '#A60003' }} />
                              <span className="text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif',
                                color: school.compliance >= 85 ? '#0367A0' : school.compliance >= 75 ? '#D97706' : '#A60003' }}>
                                {school.compliance}%
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                              style={{ background: school.status === 'Active' ? '#0367A0' : '#A60003', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
                              {school.status}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs font-black text-[#0367A0]" style={{ fontFamily: 'Lato, sans-serif' }}>View →</span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-16 text-center">
                    <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No schools match your filter</p>
                  </div>
                )}
              </div>
              <Pagination page={page} totalPages={totalPages} onPage={setPage} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
