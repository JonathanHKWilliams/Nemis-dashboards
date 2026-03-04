import { useState } from 'react'
import { X, Users, Send, Shield, BookOpen, ChevronRight, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react'
import { nationalTeachers } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function StatusBadge({ status }) {
  const cfg = {
    Active:    { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Flagged:   { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
    Pending:   { color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
    'On Leave':{ color: '#64748B', bg: '#F1F5F9'               },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function PerfBadge({ rating }) {
  const cfg = {
    Excellent:{ color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Good:     { color: '#2563EB', bg: 'rgba(37,99,235,0.10)'  },
    Poor:     { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
    'N/A':    { color: '#94A3B8', bg: '#F1F5F9'               },
  }[rating] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{rating}</span>
}

function TeacherDetailPanel({ teacher, onClose }) {
  const [activeForm, setActiveForm] = useState(null)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 420, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        {/* Header */}
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${teacher.gender}/${teacher.photoId}.jpg`}
              alt={teacher.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <h3 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</h3>
              <p className="text-xs font-semibold text-[#64748B]" style={{ fontFamily: 'Roboto, sans-serif' }}>{teacher.subject} · {teacher.county}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4 flex-1">
          <div className="flex gap-2 flex-wrap">
            <StatusBadge status={teacher.status} />
            <PerfBadge rating={teacher.performance} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'ID',             value: teacher.id             },
              { label: 'County',         value: teacher.county         },
              { label: 'School',         value: teacher.school         },
              { label: 'Subject',        value: teacher.subject        },
              { label: 'Qualification',  value: teacher.qualification  },
              { label: 'Years Service',  value: `${teacher.yearsService} years` },
              { label: 'Attendance',     value: teacher.attendance > 0 ? `${teacher.attendance}%` : 'On Leave' },
              { label: 'Performance',    value: teacher.performance    },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5 truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.value}</p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2">
            <p className="text-xs font-black text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>Actions</p>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'verify',  label: 'Verify',        color: '#059669', bg: 'rgba(5,150,105,0.08)' },
                { id: 'suspend', label: 'Suspend',        color: '#DC2626', bg: 'rgba(220,38,38,0.08)' },
                { id: 'notice',  label: 'Send Notice',   color: ACCENT,    bg: `${ACCENT}10`           },
                { id: 'log',     label: 'Activity Log',  color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
              ].map(a => (
                <button key={a.id} onClick={() => setActiveForm(activeForm === a.id ? null : a.id)}
                  className="px-3 py-1.5 rounded-xl text-xs font-black transition-all"
                  style={{ background: activeForm === a.id ? a.color : a.bg, color: activeForm === a.id ? '#fff' : a.color }}>
                  {a.label}
                </button>
              ))}
            </div>

            {activeForm === 'verify' && (
              <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.15)' }}>
                <p className="text-xs font-black text-[#059669]" style={{ fontFamily: 'Roboto, sans-serif' }}>Verify Teacher Credentials</p>
                <p className="text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Confirm that {teacher.name}'s {teacher.qualification} qualification has been verified by the Ministry.
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl text-xs font-black text-white" style={{ background: '#059669' }}>Verify & Approve</button>
                  <button onClick={() => setActiveForm(null)} className="flex-1 py-2 rounded-xl text-xs font-black" style={{ background: '#F1F5F9', color: '#64748B' }}>Cancel</button>
                </div>
              </div>
            )}

            {activeForm === 'notice' && (
              <div className="rounded-xl p-4 space-y-3" style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}20` }}>
                <p className="text-xs font-black" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>Send Notice to Teacher</p>
                <input type="text" placeholder="Subject..." className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                  style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
                <textarea rows={3} placeholder="Message..." className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
                  style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
                <button className="w-full py-2 rounded-xl text-xs font-black text-white" style={{ background: ACCENT }}>Send</button>
              </div>
            )}

            {activeForm === 'log' && (
              <div className="rounded-xl p-4 space-y-2" style={{ background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
                <p className="text-xs font-black text-[#7C3AED]" style={{ fontFamily: 'Roboto, sans-serif' }}>Recent Activity</p>
                {['Logged attendance – Feb 28', 'Submitted grades – Feb 25', 'Updated class schedule – Feb 20', 'Attended training – Feb 14'].map((log, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] font-semibold" style={{ color: '#475569', fontFamily: 'Roboto, sans-serif' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#7C3AED' }} />
                    {log}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MinisterTeachers() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const teacher = nationalTeachers.find(t => t.id === selected)

  const filtered = nationalTeachers.filter(t => {
    const q = search.toLowerCase()
    const matchQ = !q || t.name.toLowerCase().includes(q) || t.county.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q)
    const matchFilter = filter === 'All' || t.status === filter || t.performance === filter
    return matchQ && matchFilter
  })

  return (
    <div className="space-y-5 max-w-[1100px]">
      {teacher && <TeacherDetailPanel teacher={teacher} onClose={() => setSelected(null)} />}

      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-[240px]"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <Search size={15} color="#94A3B8" strokeWidth={2.5} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, county, subject..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
        {['All', 'Active', 'Flagged', 'Pending', 'On Leave', 'Excellent', 'Good', 'Poor'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      <p className="text-xs font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {filtered.length} teacher{filtered.length !== 1 ? 's' : ''} · Click a row to view profile &amp; actions
      </p>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['Teacher', 'County', 'School', 'Subject', 'Qualification', 'Service', 'Attendance', 'Performance', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                onClick={() => setSelected(t.id)}
                style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src={`https://randomuser.me/api/portraits/${t.gender}/${t.photoId}.jpg`}
                      alt={t.name} className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 30, height: 30, border: '1.5px solid #E2E8F0' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.county}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569] max-w-[120px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <p className="truncate">{t.school.split(' ').slice(0, 3).join(' ')}</p>
                </td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.subject}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.qualification}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.yearsService}y</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: t.attendance >= 85 ? '#059669' : t.attendance >= 70 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>
                  {t.attendance > 0 ? `${t.attendance}%` : 'On Leave'}
                </td>
                <td className="px-4 py-3.5"><PerfBadge rating={t.performance} /></td>
                <td className="px-4 py-3.5"><StatusBadge status={t.status} /></td>
                <td className="px-4 py-3.5"><ChevronRight size={14} color="#94A3B8" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
