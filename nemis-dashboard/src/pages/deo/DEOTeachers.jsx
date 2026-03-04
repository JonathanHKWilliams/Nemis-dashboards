import { useState } from 'react'
import { Users, CheckCircle, AlertCircle, Clock, Flag } from 'lucide-react'
import { deoTeachers, teachersBySchool } from '../../data/deoData'

const ACCENT = '#0D9488'

function StatusBadge({ status }) {
  const cfg = {
    Active:   { bg: 'rgba(22,163,74,0.10)',  color: '#16A34A' },
    'On Leave':{ bg: 'rgba(217,119,6,0.10)', color: '#D97706' },
    Flagged:  { bg: 'rgba(166,0,3,0.10)',    color: '#A60003' },
  }[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
  )
}

function AttendanceBar({ value }) {
  const color = value >= 85 ? '#16A34A' : value >= 70 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#F3F4F6', minWidth: 60 }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color, fontFamily: 'Roboto, sans-serif' }}>
        {value > 0 ? `${value}%` : 'N/A'}
      </span>
    </div>
  )
}

export default function DEOTeachers() {
  const [filter, setFilter] = useState('All')
  const [view, setView] = useState('teachers')

  const pendingGrades   = deoTeachers.filter(t => !t.gradesSubmitted && t.status === 'Active').length
  const onLeave         = deoTeachers.filter(t => t.status === 'On Leave').length
  const lowAttendance   = deoTeachers.filter(t => t.attendance < 70 && t.status === 'Active').length

  const filtered = deoTeachers.filter(t => {
    if (filter === 'All') return true
    if (filter === 'Grades Pending') return !t.gradesSubmitted && t.status === 'Active'
    if (filter === 'Low Attendance') return t.attendance < 70 && t.status === 'Active'
    if (filter === 'On Leave') return t.status === 'On Leave'
    return true
  })

  return (
    <div className="space-y-6 max-w-[1080px]">

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers',    value: deoTeachers.length, color: ACCENT,    icon: Users         },
          { label: 'Grades Pending',    value: pendingGrades,       color: '#D97706', icon: Clock         },
          { label: 'On Leave',          value: onLeave,             color: '#6B7280', icon: AlertCircle   },
          { label: 'Low Attendance',    value: lowAttendance,       color: '#A60003', icon: Flag          },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
              <s.icon size={20} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        {['teachers', 'by-school'].map(v => (
          <button key={v} onClick={() => setView(v)}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{ background: view === v ? ACCENT : '#fff', color: view === v ? '#fff' : '#6B7280', border: `1px solid ${view === v ? ACCENT : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
            {v === 'teachers' ? 'Individual Teachers' : 'By School'}
          </button>
        ))}
      </div>

      {view === 'teachers' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #EEF0F3' }}>
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Teacher Overview</h3>
            <div className="flex gap-2">
              {['All', 'Grades Pending', 'Low Attendance', 'On Leave'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{ background: filter === f ? ACCENT : 'transparent', color: filter === f ? '#fff' : '#9CA3AF', border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
                {['Teacher', 'School', 'Subject', 'Attendance', 'Grades', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                    style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => (
                <tr key={t.id} style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://randomuser.me/api/portraits/${t.gender}/${t.photoId}.jpg`}
                        alt={t.name} className="rounded-full flex-shrink-0 object-cover"
                        style={{ width: 32, height: 32, border: '1.5px solid #EEF0F3' }}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                      <div>
                        <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.name}</p>
                        <p className="text-[10px] font-semibold text-[#9CA3AF]">{t.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif', maxWidth: 160 }}>
                    <p className="truncate">{t.school}</p>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.subject}</td>
                  <td className="px-4 py-3.5 min-w-[120px]"><AttendanceBar value={t.attendance} /></td>
                  <td className="px-4 py-3.5">
                    {t.gradesSubmitted ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black" style={{ color: '#16A34A' }}>
                        <CheckCircle size={12} strokeWidth={3} /> Submitted
                      </span>
                    ) : t.status === 'On Leave' ? (
                      <span className="text-[10px] font-semibold text-[#9CA3AF]">On Leave</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black" style={{ color: '#D97706' }}>
                        <Clock size={12} strokeWidth={3} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {view === 'by-school' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-6 py-4" style={{ borderBottom: '1px solid #EEF0F3' }}>
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Teachers by School</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
                {['School', 'Total Teachers', 'Grades Pending', 'Avg Attendance'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                    style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachersBySchool.map((s, i) => (
                <tr key={s.schoolId} style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                  <td className="px-4 py-3.5 text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.schoolName}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.total}</td>
                  <td className="px-4 py-3.5">
                    {s.gradesPending > 0 ? (
                      <span className="text-xs font-black" style={{ color: '#D97706' }}>{s.gradesPending} pending</span>
                    ) : (
                      <span className="text-xs font-bold" style={{ color: '#16A34A' }}>All submitted</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 min-w-[140px]"><AttendanceBar value={s.avgAttendance} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
