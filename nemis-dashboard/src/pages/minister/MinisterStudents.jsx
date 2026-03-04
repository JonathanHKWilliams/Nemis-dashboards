import { useState } from 'react'
import { X, ChevronRight, Search, GraduationCap } from 'lucide-react'
import { nationalStudents } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function StatusBadge({ status }) {
  const cfg = {
    Active:   { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    'At Risk':{ color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function StudentDetailPanel({ student, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 400, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${student.gender}/${student.photoId}.jpg`}
              alt={student.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <h3 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{student.name}</h3>
              <p className="text-xs font-semibold text-[#64748B]" style={{ fontFamily: 'Roboto, sans-serif' }}>{student.grade} · {student.county}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <div className="flex gap-2"><StatusBadge status={student.status} /></div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Student ID',  value: student.id             },
              { label: 'County',      value: student.county         },
              { label: 'School',      value: student.school         },
              { label: 'Grade',       value: student.grade          },
              { label: 'Attendance',  value: `${student.attendance}%` },
              { label: 'Avg Grade',   value: `${student.avgGrade}%` },
              { label: 'Status',      value: student.status         },
              { label: 'Gender',      value: student.gender === 'men' ? 'Male' : 'Female' },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5 truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.value}</p>
              </div>
            ))}
          </div>

          {student.status === 'At Risk' && (
            <div className="rounded-xl p-4" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
              <p className="text-xs font-black text-[#DC2626] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>At Risk — Intervention Needed</p>
              <p className="text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                This student's attendance is below 70% and/or academic average is below 55%. The school admin and DEO have been notified.
              </p>
            </div>
          )}

          <div className="p-3 rounded-xl" style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}15` }}>
            <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Note</p>
            <p className="text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              The Minister may only view student records. Grade editing is restricted to teachers and school admins.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MinisterStudents() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const student = nationalStudents.find(s => s.id === selected)

  const filtered = nationalStudents.filter(s => {
    const q = search.toLowerCase()
    const matchQ = !q || s.name.toLowerCase().includes(q) || s.county.toLowerCase().includes(q) || s.school.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    const matchFilter = filter === 'All' || s.status === filter || s.county === filter
    return matchQ && matchFilter
  })

  return (
    <div className="space-y-5 max-w-[1100px]">
      {student && <StudentDetailPanel student={student} onClose={() => setSelected(null)} />}

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-[240px]"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <Search size={15} color="#94A3B8" strokeWidth={2.5} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, ID, county, school..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
        {['All', 'Active', 'At Risk'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      <p className="text-xs font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {filtered.length} student record{filtered.length !== 1 ? 's' : ''} shown · Click to view profile
      </p>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['Student', 'ID', 'County', 'School', 'Grade', 'Attendance', 'Avg Grade', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                onClick={() => setSelected(s.id)}
                style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                      alt={s.name} className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 30, height: 30, border: '1.5px solid #E2E8F0' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[10px] font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.id}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.county}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569] max-w-[130px]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <p className="truncate">{s.school.split(' ').slice(0, 3).join(' ')}</p>
                </td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.grade}</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: s.attendance >= 80 ? '#059669' : s.attendance >= 65 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{s.attendance}%</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: s.avgGrade >= 70 ? '#059669' : s.avgGrade >= 55 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{s.avgGrade}%</td>
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
