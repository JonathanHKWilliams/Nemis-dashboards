import { teacherSchedule, teacherClasses } from '../../data/teacherData'
import { Users } from 'lucide-react'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri']
const DAY_LABELS = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday' }

const classMeta = {
  'Grade 9A': { bg: 'rgba(0,35,51,0.07)', border: 'rgba(0,35,51,0.15)',   color: '#002333' },
  'Grade 9B': { bg: 'rgba(72,208,140,0.10)', border: 'rgba(72,208,140,0.30)', color: '#065F46' },
}

function countPeriods(classId) {
  const label = classId === 'G9A' ? 'Grade 9A' : 'Grade 9B'
  return teacherSchedule.filter(r => !r.isBreak && !r.isLunch && Object.values(r).includes(label)).length
}

function Cell({ value, isBreak, isLunch }) {
  if (isBreak || isLunch) {
    return (
      <td className="px-3 py-4 text-center" style={{ borderLeft: '2px solid #EEF0F3' }}>
        <span className="text-xs font-black text-[#9CA3AF] uppercase tracking-wide"
          style={{ fontFamily: 'Roboto, sans-serif' }}>
          {isBreak ? '— Break —' : '— Lunch —'}
        </span>
      </td>
    )
  }

  if (!value || value === '—') {
    return (
      <td className="px-3 py-4 text-center" style={{ borderLeft: '2px solid #EEF0F3' }}>
        <span className="text-sm text-[#D1D5DB]" style={{ fontFamily: 'Roboto, sans-serif' }}>—</span>
      </td>
    )
  }

  const meta = classMeta[value] || { bg: 'rgba(0,35,51,0.06)', border: 'rgba(0,35,51,0.12)', color: '#002333' }

  return (
    <td className="px-2 py-3" style={{ borderLeft: '2px solid #EEF0F3' }}>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}>
          <Users size={12} color={meta.color} strokeWidth={3} />
          <span className="text-[11px] font-black" style={{ color: meta.color, fontFamily: 'Roboto, sans-serif' }}>{value}</span>
        </div>
      </div>
    </td>
  )
}

export default function TeacherSchedule() {
  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Class Schedule</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Weekly teaching timetable · Mathematics · Academic Year 2025–2026
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {teacherClasses.map(cls => {
          const meta = classMeta[cls.name] || { bg: 'rgba(0,35,51,0.06)', border: 'rgba(0,35,51,0.12)', color: '#002333' }
          return (
            <div key={cls.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}>
              <Users size={12} color={meta.color} strokeWidth={3} />
              <span className="text-xs font-black" style={{ color: meta.color, fontFamily: 'Roboto, sans-serif' }}>{cls.name}</span>
            </div>
          )
        })}
      </div>

      {/* Timetable */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #002333', boxShadow: '0 2px 10px rgba(0,35,51,0.10)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#002333' }}>
                <th className="text-left px-5 py-4 text-[11px] font-black uppercase tracking-wider text-white w-36"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>Time</th>
                {DAYS.map(d => (
                  <th key={d} className="px-3 py-4 text-[11px] font-black uppercase tracking-wider text-white text-center"
                    style={{ fontFamily: 'Roboto, sans-serif', borderLeft: '2px solid rgba(255,255,255,0.12)' }}>
                    {DAY_LABELS[d]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherSchedule.map((row, i) => (
                <tr key={i}
                  style={{
                    borderTop: '2px solid #EEF0F3',
                    background: row.isBreak || row.isLunch ? 'rgba(244,246,248,0.9)' : 'transparent',
                  }}>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="text-sm font-black text-[#002333]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{row.time}</span>
                  </td>
                  {DAYS.map(d => (
                    <Cell key={d} value={row[d]} isBreak={row.isBreak} isLunch={row.isLunch} />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly summary */}
      <div className="bg-white rounded-2xl p-5"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <p className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Weekly Teaching Summary</p>
        <div className="grid grid-cols-2 gap-4">
          {teacherClasses.map(cls => {
            const periods = countPeriods(cls.id)
            const meta = classMeta[cls.name] || { bg: 'rgba(0,35,51,0.06)', color: '#002333' }
            return (
              <div key={cls.id} className="flex items-center gap-3 p-4 rounded-xl"
                style={{ background: meta.bg }}>
                <div>
                  <p className="text-base font-black" style={{ color: meta.color, fontFamily: 'Sora, sans-serif' }}>{cls.name}</p>
                  <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{cls.subject}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-black" style={{ color: meta.color, fontFamily: 'Sora, sans-serif' }}>{periods}</p>
                  <p className="text-[10px] font-black uppercase tracking-wide text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>periods/wk</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
