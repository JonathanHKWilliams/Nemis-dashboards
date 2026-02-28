import { schedule, subjects } from '../../data/studentData'
import { Hash, BookOpen, Leaf, Landmark, Monitor, Zap } from 'lucide-react'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri']
const DAY_LABELS = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday' }

const subjectIcons = {
  Mathematics: Hash,
  English:     BookOpen,
  Biology:     Leaf,
  History:     Landmark,
  ICT:         Monitor,
  Physics:     Zap,
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
  const Icon = subjectIcons[value] || BookOpen

  return (
    <td className="px-2 py-3" style={{ borderLeft: '2px solid #EEF0F3' }}>
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl"
          style={{ background: 'rgba(0,35,51,0.06)', border: '1.5px solid rgba(0,35,51,0.10)' }}>
          <Icon size={12} color="#002333" strokeWidth={3} />
          <span className="text-[11px] font-black text-[#002333]"
            style={{ fontFamily: 'Roboto, sans-serif' }}>
            {value}
          </span>
        </div>
      </div>
    </td>
  )
}

export default function StudentSchedule() {
  return (
    <div className="space-y-6 max-w-[1000px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Class Schedule</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Weekly timetable for Grade 9A · Academic Year 2025–2026
        </p>
      </div>

      {/* Subject Legend — all black */}
      <div className="flex items-center gap-2.5 flex-wrap">
        {subjects.map(sub => {
          const Icon = subjectIcons[sub.name]
          if (!Icon) return null
          return (
            <div key={sub.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(0,35,51,0.06)', border: '1.5px solid rgba(0,35,51,0.10)' }}>
              <Icon size={12} color="#002333" strokeWidth={3} />
              <span className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {sub.name}
              </span>
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
              {schedule.map((row, i) => (
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
    </div>
  )
}
