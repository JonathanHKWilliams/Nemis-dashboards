import { useState } from 'react'
import { attendance } from '../../data/studentData'
import { LayoutList, CalendarDays } from 'lucide-react'

const statusStyle = {
  Present: { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A',  dot: '#16A34A',  calBg: 'rgba(72,208,140,0.18)',  calColor: '#16A34A' },
  Absent:  { bg: 'rgba(166,0,3,0.10)',     color: '#A60003',  dot: '#A60003',  calBg: 'rgba(166,0,3,0.14)',     calColor: '#A60003' },
  Late:    { bg: 'rgba(217,119,6,0.10)',   color: '#D97706',  dot: '#D97706',  calBg: 'rgba(217,119,6,0.14)',   calColor: '#D97706' },
}

// All unique months in the data
const MONTHS = [...new Set(attendance.map(a => {
  const parts = a.date.split(' ')
  return `${parts[0]} ${parts[2]}`  // "Feb 2026"
}))]

function StatusBadge({ status }) {
  const s = statusStyle[status] || statusStyle.Present
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
      style={{ background: s.bg, color: s.color, fontFamily: 'Roboto, sans-serif' }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.dot }} />
      {status}
    </span>
  )
}

// Build a calendar grid for a given set of records
function CalendarView({ records }) {
  if (!records.length) return (
    <div className="bg-white rounded-2xl p-8 text-center" style={{ border: '1px solid #EEF0F3' }}>
      <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No records for this month.</p>
    </div>
  )

  // Parse day numbers and statuses
  const dayMap = {}
  records.forEach(r => {
    const day = parseInt(r.date.split(' ')[1], 10)
    dayMap[day] = r.status
  })

  // Get total days in the month from first record
  const firstDate = new Date(records[0].date.replace(',', ''))
  const year  = firstDate.getFullYear()
  const month = firstDate.getMonth()
  const totalDays = new Date(year, month + 1, 0).getDate()
  const startDow  = new Date(year, month, 1).getDay() // 0=sun

  const cells = []
  // Empty leading cells
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)

  const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
      {/* DOW headers */}
      <div className="grid grid-cols-7" style={{ background: '#002333' }}>
        {DOW.map(d => (
          <div key={d} className="py-3 text-center text-[11px] font-black text-white uppercase tracking-wider"
            style={{ fontFamily: 'Roboto, sans-serif' }}>{d}</div>
        ))}
      </div>
      {/* Days */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const status = day ? dayMap[day] : null
          const style  = status ? statusStyle[status] : null
          const today  = day === new Date().getDate() && month === new Date().getMonth()
          return (
            <div key={i} className="relative flex flex-col items-center justify-center py-3"
              style={{
                borderRight:  (i + 1) % 7 !== 0 ? '1px solid #F4F6F8' : 'none',
                borderBottom: i < cells.length - 7 ? '1px solid #F4F6F8' : 'none',
                background:   style ? style.calBg : 'transparent',
                minHeight: 56,
              }}>
              {day && (
                <>
                  <span className="text-sm font-black"
                    style={{
                      color: style ? style.calColor : '#D1D5DB',
                      fontFamily: 'Sora, sans-serif',
                      ...(today ? { textDecoration: 'underline' } : {}),
                    }}>
                    {day}
                  </span>
                  {status && (
                    <span className="text-[9px] font-black uppercase mt-0.5"
                      style={{ color: style.calColor, fontFamily: 'Roboto, sans-serif', letterSpacing: '0.05em' }}>
                      {status}
                    </span>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
      {/* Legend */}
      <div className="px-5 py-3 flex items-center gap-4" style={{ borderTop: '2px solid #EEF0F3', background: '#FAFBFC' }}>
        {['Present', 'Absent', 'Late'].map(s => {
          const st = statusStyle[s]
          return (
            <div key={s} className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: st.calBg, border: `1.5px solid ${st.calColor}60` }} />
              <span className="text-xs font-black" style={{ color: st.calColor, fontFamily: 'Roboto, sans-serif' }}>{s}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function StudentAttendance() {
  const [activeMonth, setActiveMonth] = useState(MONTHS[MONTHS.length - 1] || MONTHS[0])
  const [view, setView] = useState('list') // 'list' | 'calendar'

  const filtered = attendance.filter(a => {
    const parts = a.date.split(' ')
    return `${parts[0]} ${parts[2]}` === activeMonth
  })

  const presentCount = filtered.filter(a => a.status === 'Present').length
  const absentCount  = filtered.filter(a => a.status === 'Absent').length
  const lateCount    = filtered.filter(a => a.status === 'Late').length
  const total        = filtered.length
  const pct          = total > 0 ? Math.round((presentCount / total) * 100) : 0

  const allPresent = attendance.filter(a => a.status === 'Present').length
  const allTotal   = attendance.length
  const overallPct = allTotal > 0 ? Math.round((allPresent / allTotal) * 100) : 0

  return (
    <div className="space-y-6 max-w-[860px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Attendance</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Attendance record for Grade 9A · Academic Year 2025–2026
        </p>
      </div>

      {/* Overall + month summary */}
      <div className="flex items-stretch gap-3 flex-wrap">
        <div className="bg-white rounded-xl px-5 py-3 flex items-center gap-2"
          style={{ border: '2px solid #002333' }}>
          <span className="text-2xl font-black" style={{ color: overallPct >= 80 ? '#16A34A' : '#A60003', fontFamily: 'Sora, sans-serif' }}>{overallPct}%</span>
          <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Overall Rate</span>
        </div>
        {[
          { count: presentCount, label: 'Present', color: '#16A34A' },
          { count: absentCount,  label: 'Absent',  color: '#A60003' },
          { count: lateCount,    label: 'Late',    color: '#D97706' },
          { count: `${pct}%`,   label: 'This Month', color: pct >= 80 ? '#16A34A' : '#A60003', labelColor: '#6B7280' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: item.color, fontFamily: 'Sora, sans-serif' }}>{item.count}</span>
            <span className="text-sm font-black" style={{ color: item.labelColor || item.color, fontFamily: 'Roboto, sans-serif' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Month filter + view toggle */}
      <div className="flex items-center justify-between">
        {/* Month tabs */}
        <div className="flex items-center gap-1.5 bg-white rounded-xl p-1"
          style={{ border: '1px solid #EEF0F3' }}>
          {MONTHS.map(m => (
            <button key={m}
              onClick={() => setActiveMonth(m)}
              className="px-4 py-1.5 rounded-lg text-xs font-black transition-all"
              style={{
                background:  activeMonth === m ? '#002333' : 'transparent',
                color:       activeMonth === m ? '#fff' : '#6B7280',
                fontFamily:  'Roboto, sans-serif',
              }}>
              {m}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-white rounded-xl p-1"
          style={{ border: '1px solid #EEF0F3' }}>
          <button onClick={() => setView('list')}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
            style={{ background: view === 'list' ? '#002333' : 'transparent' }}>
            <LayoutList size={16} color={view === 'list' ? '#fff' : '#6B7280'} strokeWidth={3} />
          </button>
          <button onClick={() => setView('calendar')}
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
            style={{ background: view === 'calendar' ? '#002333' : 'transparent' }}>
            <CalendarDays size={16} color={view === 'calendar' ? '#fff' : '#6B7280'} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content */}
      {view === 'calendar' ? (
        <CalendarView records={filtered} />
      ) : (
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '2px solid #002333', boxShadow: '0 2px 10px rgba(0,35,51,0.08)' }}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: '#002333' }}>
                  {['Date', 'Day', 'Status', 'Note'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? filtered.map((rec, i) => (
                  <tr key={i}
                    className="transition-colors"
                    style={{ borderTop: '2px solid #EEF0F3' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                    <td className="px-6 py-3.5 text-sm font-black text-[#002333]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{rec.date}</td>
                    <td className="px-6 py-3.5 text-sm font-bold text-[#4B5563]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{rec.day}</td>
                    <td className="px-6 py-3.5">
                      <StatusBadge status={rec.status} />
                    </td>
                    <td className="px-6 py-3.5 text-sm font-bold text-[#6B7280]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{rec.note || '—'}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm font-bold text-[#9CA3AF]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>No records for this month.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
