import { useState, useMemo } from 'react'
import { Search, Eye, GraduationCap, Users, TrendingUp, School, SlidersHorizontal, X } from 'lucide-react'
import { schoolsData } from '../data/mockData'

const TYPE_OPTIONS  = ['All', 'Primary', 'Secondary', 'Technical', 'Vocational']
const STATUS_OPTIONS = ['All', 'Active', 'Inactive']
const COMPLIANCE_OPTIONS = [
  { label: 'All',         min: 0,  max: 100 },
  { label: '≥ 85% High',  min: 85, max: 100 },
  { label: '75–84% Med',  min: 75, max: 84  },
  { label: '< 75% Low',   min: 0,  max: 74  },
]

const typeColors = {
  Primary:    { bg: 'rgba(37,99,235,0.09)',   color: '#2563EB' },
  Secondary:  { bg: 'rgba(0,35,51,0.08)',     color: '#002333' },
  Technical:  { bg: 'rgba(124,58,237,0.09)',  color: '#7C3AED' },
  Vocational: { bg: 'rgba(245,158,11,0.09)',  color: '#D97706' },
}

function SchoolLogo({ name, color, size = 40 }) {
  const initials = name.split(' ').filter(w => w.length > 2).map(w => w[0]).join('').slice(0, 3).toUpperCase() ||
    name.split(' ').map(w => w[0]).join('').slice(0, 3).toUpperCase()
  const hex = (color || '#002333').replace('#', '')
  const src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${hex}&color=ffffff&size=128&bold=true&font-size=0.45`
  return (
    <img
      src={src}
      alt={name}
      className="rounded-xl object-cover flex-shrink-0"
      style={{ width: size, height: size }}
    />
  )
}

function ComplianceDot({ value }) {
  const color = value >= 85 ? '#48D08C' : value >= 75 ? '#F59E0B' : '#A60003'
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full" style={{ background: color }} />
      <span className="text-sm font-medium" style={{ color, fontFamily: 'Lato, sans-serif' }}>{value}%</span>
    </div>
  )
}

function FilterLabel({ children }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-widest text-[#002333] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
      {children}
    </p>
  )
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm rounded-lg px-3 py-2 outline-none appearance-none"
      style={{
        background: '#F4F6F8',
        color: '#374151',
        border: '1px solid #EEF0F3',
        fontFamily: 'Lato, sans-serif',
        fontWeight: 500,
      }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export default function Schools() {
  const [search, setSearch]         = useState('')
  const [typeFilter, setTypeFilter]   = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [complianceFilter, setComplianceFilter] = useState('All')
  const [imgErrors, setImgErrors]   = useState({})
  const [selected, setSelected]     = useState(null)

  const complianceOpt = COMPLIANCE_OPTIONS.find(o => o.label === complianceFilter) || COMPLIANCE_OPTIONS[0]

  const filtered = useMemo(() =>
    schoolsData.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.district.toLowerCase().includes(search.toLowerCase()) ||
        s.code.toLowerCase().includes(search.toLowerCase())
      const matchType   = typeFilter === 'All' || s.type === typeFilter
      const matchStatus = statusFilter === 'All' || s.status === statusFilter
      const matchComp   = s.compliance >= complianceOpt.min && s.compliance <= complianceOpt.max
      return matchSearch && matchType && matchStatus && matchComp
    }), [search, typeFilter, statusFilter, complianceFilter])

  const totalEnrollment = schoolsData.reduce((s, sc) => s + sc.enrollment, 0)
  const avgCompliance   = Math.round(schoolsData.reduce((s, sc) => s + sc.compliance, 0) / schoolsData.length)
  const activeCount     = schoolsData.filter((s) => s.status === 'Active').length

  const hasActiveFilter = search || typeFilter !== 'All' || statusFilter !== 'All' || complianceFilter !== 'All'

  const clearFilters = () => {
    setSearch('')
    setTypeFilter('All')
    setStatusFilter('All')
    setComplianceFilter('All')
  }

  const handleImgError = (id) => setImgErrors((p) => ({ ...p, [id]: true }))

  return (
    <div className="space-y-5 max-w-[1200px]">
      <div>
        <h2 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Schools Registry</h2>
        <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
          Full directory of 30 registered schools with enrollment data, locations, and compliance status
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Schools',    value: '30',                            icon: School,       color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Total Enrollment', value: totalEnrollment.toLocaleString(), icon: GraduationCap, color: '#48D08C', bg: 'rgba(72,208,140,0.10)' },
          { label: 'Avg Compliance',   value: avgCompliance + '%',             icon: TrendingUp,   color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
          { label: 'Active Schools',   value: activeCount.toString(),          icon: Users,        color: '#16A34A', bg: 'rgba(22,163,74,0.09)' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
          >
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

      {/* Body: Sidebar + Table */}
      <div className="flex gap-5 items-start">

        {/* ── Filter Sidebar ── */}
        <div
          className="w-[210px] flex-shrink-0 bg-white rounded-xl p-4 sticky top-[88px]"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} strokeWidth={2.5} className="text-[#002333]" />
              <span className="text-[13px] font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</span>
            </div>
            {hasActiveFilter && (
              <button
                onClick={clearFilters}
                className="text-[11px] font-semibold text-[#A60003] hover:underline"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Clear
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Search */}
            <div>
              <FilterLabel>Search</FilterLabel>
              <div className="relative">
                <Search size={13} strokeWidth={2.5} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Name, code, district…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: '#F4F6F8',
                    color: '#374151',
                    border: '1px solid #EEF0F3',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: 500,
                  }}
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <FilterLabel>School Type</FilterLabel>
              <div className="flex flex-col gap-1">
                {TYPE_OPTIONS.map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className="text-left text-sm px-3 py-1.5 rounded-lg font-medium transition-colors"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      background: typeFilter === t ? '#002333' : 'transparent',
                      color: typeFilter === t ? '#fff' : '#4B5563',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect value={statusFilter} onChange={setStatusFilter} options={STATUS_OPTIONS} />
            </div>

            {/* Compliance */}
            <div>
              <FilterLabel>Compliance</FilterLabel>
              <FilterSelect
                value={complianceFilter}
                onChange={setComplianceFilter}
                options={COMPLIANCE_OPTIONS.map(o => o.label)}
              />
            </div>
          </div>
        </div>

        {/* ── Table Panel ── */}
        <div
          className="flex-1 bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
        >
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length} school{filtered.length !== 1 ? 's' : ''} found
            </p>
            {hasActiveFilter && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#002333] transition-colors"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                <X size={12} strokeWidth={2.5} /> Clear filters
              </button>
            )}
          </div>

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
                {filtered.map((school) => {
                  const tc = typeColors[school.type] || { bg: '#F4F6F8', color: '#666' }
                  const principalUrl = `https://randomuser.me/api/portraits/${school.principal.gender}/${school.principal.photoId}.jpg`
                  const pInitials = school.principal.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

                  return (
                    <tr
                      key={school.id}
                      className="transition-colors"
                      style={{ borderTop: '1px solid #F4F6F8' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                    >
                      {/* School */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <SchoolLogo name={school.name} color={school.logoColor} size={36} />
                          <div>
                            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif', maxWidth: 190 }}>{school.name}</p>
                            <span className="text-[10px] text-[#6B7280] font-mono">{school.code}</span>
                          </div>
                        </div>
                      </td>

                      {/* District */}
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.district}</p>
                        <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.county}</p>
                      </td>

                      {/* Type */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{ background: tc.bg, color: tc.color, fontFamily: 'Lato, sans-serif' }}>
                          {school.type}
                        </span>
                      </td>

                      {/* Principal */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          {imgErrors[`p-${school.id}`] ? (
                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: '#002333' }}>
                              <span className="text-white font-bold" style={{ fontSize: 9, fontFamily: 'Sora, sans-serif' }}>{pInitials}</span>
                            </div>
                          ) : (
                            <img src={principalUrl} alt={school.principal.name}
                              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                              style={{ border: '1.5px solid #EEF0F3' }}
                              onError={() => handleImgError(`p-${school.id}`)} />
                          )}
                          <p className="text-sm font-medium text-[#4B5563] whitespace-nowrap" style={{ fontFamily: 'Lato, sans-serif' }}>{school.principal.name}</p>
                        </div>
                      </td>

                      {/* Enrollment */}
                      <td className="px-4 py-3.5">
                        <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
                          {school.enrollment.toLocaleString()}
                        </p>
                        <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                          of {school.capacity.toLocaleString()}
                        </p>
                      </td>

                      {/* Established */}
                      <td className="px-4 py-3.5 text-sm font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{school.established}</td>

                      {/* Compliance */}
                      <td className="px-4 py-3.5"><ComplianceDot value={school.compliance} /></td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{
                            background: school.status === 'Active' ? 'rgba(72,208,140,0.10)' : 'rgba(166,0,3,0.09)',
                            color: school.status === 'Active' ? '#16A34A' : '#A60003',
                            fontFamily: 'Lato, sans-serif',
                          }}>
                          {school.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => setSelected(school)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF0F3' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F6F8' }}
                        >
                          <Eye size={12} strokeWidth={2.5} /> View
                        </button>
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
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.20)' }}
            onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-5">
              <SchoolLogo name={selected.name} color={selected.logoColor} size={48} />
              <div>
                <h3 className="font-bold text-[#002333] text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>{selected.name}</h3>
                <p className="text-xs text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{selected.code} · Est. {selected.established}</p>
              </div>
            </div>
            <div className="space-y-0">
              {[
                { label: 'District',    value: selected.district },
                { label: 'County',      value: selected.county },
                { label: 'Type',        value: selected.type },
                { label: 'Principal',   value: selected.principal.name },
                { label: 'Enrollment',  value: `${selected.enrollment.toLocaleString()} / ${selected.capacity.toLocaleString()} capacity` },
                { label: 'Teachers',    value: selected.teachers },
                { label: 'Compliance',  value: `${selected.compliance}%` },
                { label: 'Status',      value: selected.status },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
                  <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setSelected(null)}
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#002333', fontFamily: 'Lato, sans-serif' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
