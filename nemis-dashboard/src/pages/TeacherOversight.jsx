import { useState, useMemo } from 'react'
import { Search, Send, FileText, Users, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { teachersData } from '../data/mockData'

const statusConfig = {
  Active:    { label: 'Submitted',  bg: 'rgba(72,208,140,0.10)',  color: '#16A34A' },
  'On Leave':{ label: 'On Leave',   bg: 'rgba(245,158,11,0.10)', color: '#D97706' },
  Suspended: { label: 'Suspended',  bg: 'rgba(166,0,3,0.10)',    color: '#A60003' },
}

function getReportStatus(teacher) {
  if (teacher.status === 'Suspended') return 'Overdue'
  if (teacher.status === 'On Leave')  return 'On Leave'
  if (teacher.reports === teacher.total) return 'Submitted'
  if (teacher.reports >= teacher.total * 0.75) return 'Pending'
  return 'Overdue'
}

const rStatusConfig = {
  Submitted: { bg: 'rgba(72,208,140,0.10)',  color: '#16A34A' },
  Pending:   { bg: 'rgba(245,158,11,0.10)', color: '#D97706' },
  Overdue:   { bg: 'rgba(166,0,3,0.10)',    color: '#A60003' },
  'On Leave':{ bg: 'rgba(156,163,175,0.15)', color: '#9CA3AF' },
}

const CATEGORIES = ['All', 'Primary', 'Secondary', 'Technical', 'Vocational']
const REPORT_STATUS = ['All', 'Submitted', 'Pending', 'Overdue', 'On Leave']

function PhotoAvatar({ name, gender, photoId, size = 36, id, imgErrors, onError }) {
  const url = `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (imgErrors[id]) {
    return (
      <div className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: '#002333' }}>
        <span style={{ color: '#fff', fontSize: size * 0.3, fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>{initials}</span>
      </div>
    )
  }
  return (
    <img src={url} alt={name}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
      onError={() => onError(id)} />
  )
}

export default function TeacherOversight() {
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [statusF, setStatusF]     = useState('All')
  const [imgErrors, setImgErrors] = useState({})

  const onImgError = (id) => setImgErrors(p => ({ ...p, [id]: true }))

  const enriched = useMemo(() =>
    teachersData.map(t => ({ ...t, reportStatus: getReportStatus(t) })), [])

  const filtered = useMemo(() =>
    enriched.filter((t) => {
      const matchSearch   = t.name.toLowerCase().includes(search.toLowerCase()) || t.empId.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All' || t.category === category
      const matchStatus   = statusF  === 'All' || t.reportStatus === statusF
      return matchSearch && matchCategory && matchStatus
    }), [enriched, search, category, statusF])

  const submitted = enriched.filter(t => t.reportStatus === 'Submitted').length
  const pending   = enriched.filter(t => t.reportStatus === 'Pending').length
  const overdue   = enriched.filter(t => t.reportStatus === 'Overdue').length
  const compliance = Math.round((submitted / enriched.length) * 100)

  const categoryStats = ['Primary','Secondary','Technical','Vocational'].map(cat => {
    const group = enriched.filter(t => t.category === cat)
    const groupCompliance = group.length > 0 ? Math.round((group.filter(t => t.reportStatus === 'Submitted').length / group.length) * 100) : 0
    return { cat, count: group.length, compliance: groupCompliance }
  })

  return (
    <div className="space-y-5 max-w-[1180px]">
      <div>
        <h2 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Teacher Oversight</h2>
        <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
          Monitor teacher activity reports, compliance rates, and submit oversight evaluations
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Assigned',    value: enriched.length,  icon: Users,         color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Reports Submitted', value: `${submitted}/${enriched.length}`, icon: CheckCircle, color: '#48D08C', bg: 'rgba(72,208,140,0.10)' },
          { label: 'Compliance Rate',   value: compliance + '%', icon: FileText,      color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
          { label: 'Overdue Reports',   value: overdue,          icon: AlertCircle,   color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
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

      {/* Category Compliance Breakdown */}
      <div className="bg-white rounded-xl p-5"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
        <h3 className="text-[15px] font-semibold text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
          Compliance by Category
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {categoryStats.map(({ cat, count, compliance: c }) => {
            const barColor = c >= 85 ? '#48D08C' : c >= 70 ? '#F59E0B' : '#A60003'
            return (
              <div key={cat} className="p-4 rounded-xl" style={{ background: '#FAFBFC', border: '1px solid #F4F6F8' }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{cat}</p>
                  <span className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{count} teachers</span>
                </div>
                <p className="text-2xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif', color: barColor }}>{c}%</p>
                <div className="h-2 rounded-full" style={{ background: '#EEF0F3' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${c}%`, background: barColor }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Oversight Table */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div className="relative">
            <Search size={14} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teachers…"
              className="pl-9 pr-4 py-2 text-sm bg-[#F4F6F8] rounded-lg outline-none w-48 text-[#4B5563] placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }} />
          </div>
          {/* Category tabs */}
          <div className="flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  background: category === c ? '#002333' : 'transparent',
                  color: category === c ? '#fff' : '#6B7280',
                }}>
                {c}
              </button>
            ))}
          </div>
          <select value={statusF} onChange={(e) => setStatusF(e.target.value)}
            className="px-3 py-2 text-sm bg-[#F4F6F8] rounded-lg outline-none text-[#4B5563] cursor-pointer"
            style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }}>
            {REPORT_STATUS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
          </select>
          <p className="text-xs font-medium text-[#6B7280] ml-auto" style={{ fontFamily: 'Lato, sans-serif' }}>{filtered.length} teachers</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['Teacher', 'School', 'District', 'Category', 'Reports', 'Report Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((teacher) => {
                const rsc = rStatusConfig[teacher.reportStatus] || rStatusConfig.Pending
                const reportPct = (teacher.reports / teacher.total) * 100
                const barColor = reportPct >= 87.5 ? '#48D08C' : reportPct >= 62.5 ? '#F59E0B' : '#A60003'

                return (
                  <tr key={teacher.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <PhotoAvatar name={teacher.name} gender={teacher.gender} photoId={teacher.photoId}
                          size={38} id={teacher.id} imgErrors={imgErrors} onError={onImgError} />
                        <div>
                          <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</p>
                          <p className="text-[10px] text-[#6B7280] font-mono">{teacher.empId}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-sm font-medium text-[#4B5563] max-w-[160px]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      <p className="truncate">{teacher.school}</p>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.district}</td>
                    <td className="px-5 py-3.5 text-xs font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.category}</td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2 min-w-[100px]">
                        <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
                          <div className="h-full rounded-full" style={{ width: `${reportPct}%`, background: barColor }} />
                        </div>
                        <span className="text-xs font-medium text-[#6B7280] whitespace-nowrap" style={{ fontFamily: 'Lato, sans-serif' }}>
                          {teacher.reports}/{teacher.total}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                        style={{ background: rsc.bg, color: rsc.color, fontFamily: 'Lato, sans-serif' }}>
                        {teacher.reportStatus}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        {(teacher.reportStatus === 'Pending' || teacher.reportStatus === 'Overdue') && (
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                            style={{ background: 'rgba(166,0,3,0.08)', color: '#A60003', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.15)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.08)' }}>
                            <Send size={11} strokeWidth={2.5} /> Remind
                          </button>
                        )}
                        {teacher.reportStatus === 'Submitted' && (
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                            style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.20)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.10)' }}>
                            <FileText size={11} strokeWidth={2.5} /> View Report
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No teachers match your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
