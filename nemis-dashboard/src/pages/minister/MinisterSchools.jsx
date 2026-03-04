import { useState } from 'react'
import { X, School, Flag, Send, Download, ChevronRight, Search, Filter } from 'lucide-react'
import { nationalSchools, counties } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function StatusBadge({ status }) {
  const cfg = {
    Active:  { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Flagged: { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function InfraBadge({ status }) {
  const cfg = {
    Good:     { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Fair:     { color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
    Poor:     { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
    Critical: { color: '#7C3AED', bg: 'rgba(124,58,237,0.10)' },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

// ── Detail Panel (slide from right) ───────────────────────────────────────
function SchoolDetailPanel({ school, onClose, onAction }) {
  const [activeForm, setActiveForm] = useState(null)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col"
        style={{ width: 420, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        {/* Header */}
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}12` }}>
              <School size={20} style={{ color: ACCENT }} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.name}</h3>
              <p className="text-xs font-semibold text-[#64748B]" style={{ fontFamily: 'Roboto, sans-serif' }}>{school.county} · {school.district}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        {/* Info */}
        <div className="px-6 py-5 space-y-4 flex-1">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Level',       value: school.level       },
              { label: 'Type',        value: school.type        },
              { label: 'Principal',   value: school.principal   },
              { label: 'Enrollment',  value: school.enrollment.toLocaleString() },
              { label: 'Attendance',  value: `${school.attendance}%` },
              { label: 'Performance', value: `${school.performance}%` },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</p>
                <p className="text-sm font-black text-[#0F172A] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.value}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap">
            <StatusBadge status={school.status} />
            <InfraBadge status={school.infraStatus} />
          </div>

          <div className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
            <p className="text-[10px] font-black uppercase text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>Last Report</p>
            <p className="text-sm font-black text-[#0F172A] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {school.lastReport || <span style={{ color: '#DC2626' }}>Not submitted</span>}
            </p>
          </div>

          {/* Action Forms */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-black text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>Actions</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'flag',   label: 'Flag School',  color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
                { id: 'notice', label: 'Send Notice',  color: ACCENT,    bg: `${ACCENT}10` },
                { id: 'export', label: 'Export Data',  color: '#059669', bg: 'rgba(5,150,105,0.08)' },
              ].map(a => (
                <button key={a.id} onClick={() => setActiveForm(activeForm === a.id ? null : a.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all"
                  style={{ background: activeForm === a.id ? a.color : a.bg, color: activeForm === a.id ? '#fff' : a.color }}>
                  {a.id === 'flag' ? <Flag size={12} strokeWidth={3} /> : a.id === 'notice' ? <Send size={12} strokeWidth={3} /> : <Download size={12} strokeWidth={3} />}
                  {a.label}
                </button>
              ))}
            </div>

            {activeForm === 'flag' && (
              <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
                <p className="text-xs font-black text-[#DC2626]" style={{ fontFamily: 'Roboto, sans-serif' }}>Flag School</p>
                <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                  style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }}>
                  <option>Select reason...</option>
                  <option>Missing reports</option>
                  <option>Low attendance</option>
                  <option>Infrastructure risk</option>
                  <option>Academic decline</option>
                </select>
                <textarea rows={2} placeholder="Add notes..."
                  className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
                  style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
                <button className="w-full py-2 rounded-xl text-xs font-black text-white"
                  style={{ background: '#DC2626' }}>Confirm Flag</button>
              </div>
            )}

            {activeForm === 'notice' && (
              <div className="rounded-xl p-4 space-y-3" style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}20` }}>
                <p className="text-xs font-black" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>Send Notice to School</p>
                <input type="text" placeholder="Notice subject..." className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                  style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
                <textarea rows={3} placeholder="Message body..." className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
                  style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
                <button className="w-full py-2 rounded-xl text-xs font-black text-white" style={{ background: ACCENT }}>Send Notice</button>
              </div>
            )}

            {activeForm === 'export' && (
              <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)' }}>
                <p className="text-xs font-black text-[#059669]" style={{ fontFamily: 'Roboto, sans-serif' }}>Export School Data</p>
                {['Full School Report (PDF)', 'Student List (Excel)', 'Teacher List (Excel)', 'Performance Data (CSV)'].map(opt => (
                  <button key={opt} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-left transition-colors hover:bg-white"
                    style={{ color: '#334155', fontFamily: 'Roboto, sans-serif' }}>
                    {opt} <Download size={12} color="#059669" strokeWidth={2.5} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MinisterSchools() {
  const [selectedSchool, setSelectedSchool] = useState(null)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({ county: 'All', level: 'All', type: 'All', status: 'All' })

  const school = nationalSchools.find(s => s.id === selectedSchool)

  const filtered = nationalSchools.filter(s => {
    const q = search.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.county.toLowerCase().includes(q) || s.principal.toLowerCase().includes(q)
    const matchCounty = filters.county === 'All' || s.county === filters.county
    const matchLevel = filters.level === 'All' || s.level === filters.level
    const matchType = filters.type === 'All' || s.type === filters.type
    const matchStatus = filters.status === 'All' || s.status === filters.status
    return matchQ && matchCounty && matchLevel && matchType && matchStatus
  })

  return (
    <div className="space-y-5 max-w-[1100px]">
      {school && <SchoolDetailPanel school={school} onClose={() => setSelectedSchool(null)} />}

      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-[240px]"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <Search size={15} color="#94A3B8" strokeWidth={2.5} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, county, principal..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
        {[
          { key: 'county', options: ['All', ...new Set(nationalSchools.map(s => s.county))] },
          { key: 'level',  options: ['All', 'Primary', 'Secondary'] },
          { key: 'type',   options: ['All', 'Public', 'Private'] },
          { key: 'status', options: ['All', 'Active', 'Flagged'] },
        ].map(f => (
          <select key={f.key} value={filters[f.key]}
            onChange={e => setFilters(prev => ({ ...prev, [f.key]: e.target.value }))}
            className="px-3 py-2.5 rounded-xl text-xs outline-none"
            style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }}>
            {f.options.map(o => <option key={o}>{o}</option>)}
          </select>
        ))}
        <button className="px-4 py-2.5 rounded-xl text-xs font-black text-white" style={{ background: ACCENT }}>
          <Download size={13} strokeWidth={3} className="inline mr-1.5" />Export
        </button>
      </div>

      <p className="text-xs font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {filtered.length} school{filtered.length !== 1 ? 's' : ''} · Click a row to view profile
      </p>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['School', 'County', 'Principal', 'Level', 'Enrollment', 'Attendance', 'Performance', 'Infra', 'Last Report', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                onClick={() => setSelectedSchool(s.id)}
                style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-4 py-3.5 text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.county}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.principal.split(' ').slice(-2).join(' ')}</td>
                <td className="px-4 py-3.5">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: s.level === 'Primary' ? 'rgba(37,99,235,0.10)' : 'rgba(124,58,237,0.10)', color: s.level === 'Primary' ? '#2563EB' : '#7C3AED' }}>{s.level}</span>
                </td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.enrollment.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: s.attendance >= 85 ? '#059669' : s.attendance >= 70 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{s.attendance}%</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: s.performance >= 70 ? '#059669' : s.performance >= 55 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{s.performance}%</td>
                <td className="px-4 py-3.5"><InfraBadge status={s.infraStatus} /></td>
                <td className="px-4 py-3.5 text-xs font-semibold" style={{ color: s.lastReport ? '#64748B' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>
                  {s.lastReport || 'Missing'}
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3.5"><ChevronRight size={14} color="#94A3B8" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
