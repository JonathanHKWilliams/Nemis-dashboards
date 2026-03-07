import { useState, useMemo } from 'react'
import {
  Search, SlidersHorizontal, GraduationCap, TrendingUp, TrendingDown,
  Minus, Users, BarChart2, AlertTriangle, X, Download, LayoutGrid, List,
} from 'lucide-react'
import { enrollmentData } from '../data/mockData'

const DISTRICT_OPTIONS  = ['All Districts', ...Array.from(new Set(enrollmentData.map(e => e.district)))]
const TYPE_OPTIONS      = ['All Types', 'Primary', 'Secondary', 'Technical', 'Vocational']
const STATUS_OPTIONS    = ['All', 'On Track', 'At Risk', 'Critical']
const TREND_OPTIONS     = ['All', 'up', 'stable', 'down']
const YEAR_OPTIONS      = ['2025/2026', '2024/2025', '2023/2024']

const statusConfig = {
  'On Track': { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A' },
  'At Risk':  { bg: 'rgba(245,158,11,0.12)',  color: '#D97706' },
  'Critical': { bg: 'rgba(166,0,3,0.10)',     color: '#A60003' },
}

const typeConfig = {
  Primary:    { bg: 'rgba(37,99,235,0.09)',   color: '#2563EB' },
  Secondary:  { bg: 'rgba(0,35,51,0.07)',     color: '#002333' },
  Technical:  { bg: 'rgba(124,58,237,0.09)',  color: '#7C3AED' },
  Vocational: { bg: 'rgba(245,158,11,0.09)',  color: '#D97706' },
}

function SchoolPhoto({ name, size = 40 }) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  return (
    <img
      src={`https://picsum.photos/seed/${slug}/${size * 2}/${size * 2}`}
      alt={name}
      className="rounded-xl object-cover flex-shrink-0"
      style={{ width: size, height: size }}
    />
  )
}

function StatusBadge({ status }) {
  const s = statusConfig[status] || {}
  return (
    <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold"
      style={{ background: s.bg, color: s.color, fontFamily: 'Lato, sans-serif' }}>
      {status}
    </span>
  )
}

function TypeBadge({ type }) {
  const t = typeConfig[type] || {}
  return (
    <span className="px-2.5 py-[3px] rounded-full text-[11px] font-bold"
      style={{ background: t.bg, color: t.color, fontFamily: 'Lato, sans-serif' }}>
      {type}
    </span>
  )
}

function TrendIcon({ trend }) {
  if (trend === 'up')     return <TrendingUp  size={14} strokeWidth={2.5} style={{ color: '#16A34A' }} />
  if (trend === 'down')   return <TrendingDown size={14} strokeWidth={2.5} style={{ color: '#A60003' }} />
  return <Minus size={14} strokeWidth={2.5} style={{ color: '#D97706' }} />
}

function RateBar({ enrolled, capacity }) {
  const pct = Math.round((enrolled / capacity) * 100)
  const color = pct >= 85 ? '#16A34A' : pct >= 65 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3', maxWidth: 80 }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[11px] font-bold" style={{ color, fontFamily: 'Lato, sans-serif' }}>{pct}%</span>
    </div>
  )
}

function FilterLabel({ children }) {
  return <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>{children}</p>
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#374151] cursor-pointer"
      style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3', background: '#FAFBFC', fontWeight: 500 }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

// ── Detail Panel ───────────────────────────────────────────────────────────────
function DetailPanel({ record, onClose }) {
  const rate = Math.round((record.enrolled / record.capacity) * 100)
  const maleRate = record.enrolled > 0 ? Math.round((record.male / record.enrolled) * 100) : 0
  const femaleRate = 100 - maleRate
  const sc = statusConfig[record.status] || {}

  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1" />
      <div
        className="w-[440px] h-full bg-white flex flex-col overflow-hidden"
        style={{ boxShadow: '-8px 0 40px rgba(0,35,51,0.14)', borderLeft: '1px solid #EEF0F3' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 flex items-start gap-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #F4F6F8', background: '#F8FAFC' }}>
          <SchoolPhoto name={record.school} size={52} />
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold text-[#002333] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{record.school}</p>
            <p className="text-xs text-[#6B7280] font-semibold mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{record.code} · {record.district}</p>
            <div className="flex items-center gap-2 mt-2">
              <TypeBadge type={record.type} />
              <StatusBadge status={record.status} />
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 transition-colors"
            style={{ background: '#EEF0F3' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E2E8F0' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#EEF0F3' }}>
            <X size={14} strokeWidth={2.5} className="text-[#6B7280]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* Academic Year */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Academic Year</p>
            <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{record.academicYear}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Total Enrolled', value: record.enrolled.toLocaleString(), color: '#002333', bg: 'rgba(0,35,51,0.06)' },
              { label: 'Capacity',       value: record.capacity.toLocaleString(),  color: '#374151', bg: '#F4F6F8' },
              { label: 'New Enrollments',value: `+${record.newEnrollments}`,       color: '#16A34A', bg: 'rgba(72,208,140,0.10)' },
              { label: 'Withdrawn',      value: `-${record.withdrawn}`,            color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
            ].map(s => (
              <div key={s.label} className="rounded-xl p-3.5" style={{ background: s.bg }}>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                <p className="text-xl font-bold mt-1" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Capacity Rate */}
          <div className="rounded-xl p-4" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Enrollment Rate</p>
              <div className="flex items-center gap-1.5">
                <TrendIcon trend={record.trend} />
                <span className="text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif', color: sc.color }}>{rate}%</span>
              </div>
            </div>
            <div className="h-2.5 rounded-full w-full" style={{ background: '#EEF0F3' }}>
              <div className="h-full rounded-full"
                style={{ width: `${rate}%`, background: rate >= 85 ? '#48D08C' : rate >= 65 ? '#F59E0B' : '#A60003' }} />
            </div>
            <p className="text-[10px] text-[#9CA3AF] mt-1.5 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
              {record.enrolled.toLocaleString()} of {record.capacity.toLocaleString()} students
            </p>
          </div>

          {/* Gender Split */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#6B7280] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>Gender Distribution</p>
            <div className="flex rounded-lg overflow-hidden h-4" style={{ border: '1px solid #EEF0F3' }}>
              <div style={{ width: `${maleRate}%`, background: '#0367A0' }} title={`Male: ${record.male}`} />
              <div style={{ width: `${femaleRate}%`, background: '#C084FC' }} title={`Female: ${record.female}`} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#0367A0' }} />
                <span className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>Male — {record.male.toLocaleString()} ({maleRate}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: '#C084FC' }} />
                <span className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>Female — {record.female.toLocaleString()} ({femaleRate}%)</span>
              </div>
            </div>
          </div>

          {/* Grade Breakdown */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#6B7280] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>Enrollment by Grade</p>
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F4F6F8' }}>
                    <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>Grade</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>Students</th>
                    <th className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>Share</th>
                  </tr>
                </thead>
                <tbody>
                  {record.grades.map((g, i) => {
                    const pct = Math.round((g.count / record.enrolled) * 100)
                    return (
                      <tr key={g.grade} style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                        <td className="px-4 py-2.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{g.grade}</td>
                        <td className="px-4 py-2.5 text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{g.count}</td>
                        <td className="px-4 py-2.5">
                          <div className="flex items-center gap-2">
                            <div className="h-1.5 rounded-full" style={{ width: 50, background: '#EEF0F3' }}>
                              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#0367A0' }} />
                            </div>
                            <span className="text-[11px] font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{pct}%</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Meta */}
          <div className="rounded-xl p-4 space-y-2.5" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            {[
              { label: 'District Officer', value: record.officer },
              { label: 'Last Updated',     value: record.lastUpdated },
              { label: 'County',           value: record.county },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{m.label}</p>
                <p className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex gap-3 flex-shrink-0" style={{ borderTop: '1px solid #F4F6F8' }}>
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: '#0367A0', color: '#fff', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#024f80' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0367A0' }}>
            <Download size={14} strokeWidth={2.5} />
            Export Report
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Enrollment() {
  const [search,   setSearch]   = useState('')
  const [district, setDistrict] = useState('All Districts')
  const [type,     setType]     = useState('All Types')
  const [status,   setStatus]   = useState('All')
  const [trend,    setTrend]    = useState('All')
  const [year,     setYear]     = useState('2025/2026')
  const [viewMode, setViewMode] = useState('cards')
  const [selected, setSelected] = useState(null)

  const filtered = useMemo(() =>
    enrollmentData.filter(e => {
      const matchSearch   = e.school.toLowerCase().includes(search.toLowerCase()) || e.code.toLowerCase().includes(search.toLowerCase())
      const matchDistrict = district === 'All Districts' || e.district === district
      const matchType     = type === 'All Types' || e.type === type
      const matchStatus   = status === 'All' || e.status === status
      const matchTrend    = trend === 'All' || e.trend === trend
      return matchSearch && matchDistrict && matchType && matchStatus && matchTrend
    }), [search, district, type, status, trend])

  const totalEnrolled    = enrollmentData.reduce((s, e) => s + e.enrolled, 0)
  const totalNew         = enrollmentData.reduce((s, e) => s + e.newEnrollments, 0)
  const totalWithdrawn   = enrollmentData.reduce((s, e) => s + e.withdrawn, 0)
  const totalCapacity    = enrollmentData.reduce((s, e) => s + e.capacity, 0)
  const overallRate      = Math.round((totalEnrolled / totalCapacity) * 100)
  const atRiskCount      = enrollmentData.filter(e => e.status !== 'On Track').length

  const hasFilters = search || district !== 'All Districts' || type !== 'All Types' || status !== 'All' || trend !== 'All'
  const clearAll   = () => { setSearch(''); setDistrict('All Districts'); setType('All Types'); setStatus('All'); setTrend('All') }

  return (
    <div className="flex gap-6 max-w-[1200px]">
      {/* ── Filter Sidebar ── */}
      <div className="w-[210px] flex-shrink-0">
        <div className="bg-white rounded-xl overflow-hidden sticky top-6"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="px-4 py-3.5 flex items-center justify-between" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} strokeWidth={2.5} style={{ color: '#002333' }} />
              <p className="text-[13px] font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Filters</p>
            </div>
            {hasFilters && (
              <button onClick={clearAll} className="text-[11px] font-bold text-[#A60003]" style={{ fontFamily: 'Lato, sans-serif' }}>Clear</button>
            )}
          </div>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div>
              <FilterLabel>Search</FilterLabel>
              <div className="relative">
                <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="School or code…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none text-[#374151] placeholder:text-[#9CA3AF]"
                  style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3', background: '#FAFBFC' }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F4F6F8' }} />

            {/* Academic Year */}
            <div>
              <FilterLabel>Academic Year</FilterLabel>
              <FilterSelect value={year} onChange={setYear} options={YEAR_OPTIONS} />
            </div>

            {/* District */}
            <div>
              <FilterLabel>District</FilterLabel>
              <FilterSelect value={district} onChange={setDistrict} options={DISTRICT_OPTIONS} />
            </div>

            {/* Type */}
            <div>
              <FilterLabel>School Type</FilterLabel>
              <FilterSelect value={type} onChange={setType} options={TYPE_OPTIONS} />
            </div>

            <div style={{ borderTop: '1px solid #F4F6F8' }} />

            {/* Status */}
            <div>
              <FilterLabel>Status</FilterLabel>
              <div className="space-y-1.5">
                {STATUS_OPTIONS.map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      background: status === s ? '#002333' : '#FAFBFC',
                      color: status === s ? '#fff' : '#4B5563',
                      border: status === s ? 'none' : '1px solid #EEF0F3',
                    }}>
                    {s}
                    {s !== 'All' && (
                      <span className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: statusConfig[s]?.color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F4F6F8' }} />

            {/* Trend */}
            <div>
              <FilterLabel>Trend</FilterLabel>
              <div className="space-y-1.5">
                {TREND_OPTIONS.map(t => (
                  <button key={t} onClick={() => setTrend(t)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all capitalize"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      background: trend === t ? '#002333' : '#FAFBFC',
                      color: trend === t ? '#fff' : '#4B5563',
                      border: trend === t ? 'none' : '1px solid #EEF0F3',
                    }}>
                    {t === 'All' ? 'All Trends' : t === 'up' ? 'Trending Up' : t === 'down' ? 'Declining' : 'Stable'}
                    {t !== 'All' && <TrendIcon trend={t} />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total Enrolled',  value: totalEnrolled.toLocaleString(), icon: GraduationCap, color: '#002333', bg: 'rgba(0,35,51,0.07)' },
            { label: 'New This Month',  value: `+${totalNew}`,                 icon: TrendingUp,    color: '#16A34A', bg: 'rgba(72,208,140,0.10)' },
            { label: 'Withdrawn',       value: `-${totalWithdrawn}`,           icon: TrendingDown,  color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
            { label: 'Schools At Risk', value: atRiskCount,                    icon: AlertTriangle, color: '#D97706', bg: 'rgba(245,158,11,0.10)' },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                  <p className="text-2xl font-bold mt-1" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon size={18} strokeWidth={2.5} style={{ color: s.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rate Banner */}
        <div className="bg-white rounded-xl px-5 py-4 flex items-center gap-6"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="flex-shrink-0">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>County-Wide Enrollment Rate</p>
            <p className="text-3xl font-bold mt-0.5" style={{ fontFamily: 'Sora, sans-serif', color: '#0367A0' }}>{overallRate}%</p>
          </div>
          <div className="flex-1">
            <div className="h-3 rounded-full" style={{ background: '#EEF0F3' }}>
              <div className="h-full rounded-full" style={{ width: `${overallRate}%`, background: 'linear-gradient(90deg, #0367A0 0%, #48D08C 100%)' }} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-[#9CA3AF] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>0%</span>
              <span className="text-[10px] text-[#9CA3AF] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>{totalEnrolled.toLocaleString()} / {totalCapacity.toLocaleString()} students</span>
              <span className="text-[10px] text-[#9CA3AF] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>100%</span>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0 pl-4" style={{ borderLeft: '1px solid #EEF0F3' }}>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Schools</p>
              <p className="text-lg font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{enrollmentData.length}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Male</p>
              <p className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#0367A0' }}>
                {enrollmentData.reduce((s, e) => s + e.male, 0).toLocaleString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Female</p>
              <p className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#C084FC' }}>
                {enrollmentData.reduce((s, e) => s + e.female, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} school{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
            {[{ m: 'cards', Icon: LayoutGrid }, { m: 'table', Icon: List }].map(({ m, Icon }) => (
              <button key={m} onClick={() => setViewMode(m)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  background: viewMode === m ? '#002333' : 'transparent',
                  color: viewMode === m ? '#fff' : '#9CA3AF',
                }}>
                <Icon size={13} strokeWidth={2.5} />
                {m === 'cards' ? 'Cards' : 'Table'}
              </button>
            ))}
          </div>
        </div>

        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(record => {
              const rate = Math.round((record.enrolled / record.capacity) * 100)
              return (
                <div key={record.id}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                  style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
                  onClick={() => setSelected(record)}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  {/* Card top photo strip */}
                  <div className="relative h-24 overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${record.school.toLowerCase().replace(/\s+/g, '-')}/400/100`}
                      alt={record.school}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,14,33,0.72) 0%, rgba(0,14,33,0.10) 100%)' }} />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                      <TypeBadge type={record.type} />
                      <StatusBadge status={record.status} />
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-[13px] font-bold text-[#002333] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{record.school}</p>
                      <p className="text-[11px] text-[#6B7280] font-semibold mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{record.district}</p>
                    </div>

                    {/* Rate bar */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Enrollment Rate</p>
                        <div className="flex items-center gap-1">
                          <TrendIcon trend={record.trend} />
                          <span className="text-[11px] font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{rate}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
                        <div className="h-full rounded-full" style={{
                          width: `${rate}%`,
                          background: rate >= 85 ? '#48D08C' : rate >= 65 ? '#F59E0B' : '#A60003',
                        }} />
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 pt-2" style={{ borderTop: '1px solid #F4F6F8' }}>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Enrolled</p>
                        <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{record.enrolled.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>New</p>
                        <p className="text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#16A34A' }}>+{record.newEnrollments}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Out</p>
                        <p className="text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#A60003' }}>-{record.withdrawn}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-xl overflow-hidden"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#F4F6F8' }}>
                    {['School', 'District', 'Type', 'Enrolled', 'Rate', 'New', 'Withdrawn', 'Trend', 'Status'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider text-[#0F172A]"
                        style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((record, idx) => (
                    <tr key={record.id}
                      className="cursor-pointer transition-colors"
                      style={{ borderTop: '1px solid #F4F6F8', background: idx % 2 === 0 ? '#fff' : '#FAFBFC' }}
                      onClick={() => setSelected(record)}
                      onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                      onMouseLeave={e => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <SchoolPhoto name={record.school} size={34} />
                          <div>
                            <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{record.school}</p>
                            <p className="text-[10px] font-semibold text-[#9CA3AF] font-mono">{record.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{record.district}</td>
                      <td className="px-5 py-3.5"><TypeBadge type={record.type} /></td>
                      <td className="px-5 py-3.5 text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{record.enrolled.toLocaleString()}</td>
                      <td className="px-5 py-3.5"><RateBar enrolled={record.enrolled} capacity={record.capacity} /></td>
                      <td className="px-5 py-3.5 text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#16A34A' }}>+{record.newEnrollments}</td>
                      <td className="px-5 py-3.5 text-sm font-bold" style={{ fontFamily: 'Sora, sans-serif', color: '#A60003' }}>-{record.withdrawn}</td>
                      <td className="px-5 py-3.5"><TrendIcon trend={record.trend} /></td>
                      <td className="px-5 py-3.5"><StatusBadge status={record.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && (
                <div className="py-16 text-center">
                  <BarChart2 size={32} strokeWidth={2} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No records match your filters</p>
                </div>
              )}
            </div>
          </div>
        )}

        {filtered.length === 0 && viewMode === 'cards' && (
          <div className="flex flex-col items-center py-20 text-center">
            <Users size={32} strokeWidth={2} className="text-gray-300 mb-3" />
            <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No records match your filters</p>
          </div>
        )}
      </div>

      {/* Detail Panel */}
      {selected && <DetailPanel record={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}
