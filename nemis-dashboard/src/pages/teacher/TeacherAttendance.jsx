import { useState } from 'react'
import { teacherClasses, classStudents } from '../../data/teacherData'
import { CheckCircle2, Save } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'Present', label: 'P', color: '#16A34A', bg: 'rgba(72,208,140,0.18)'  },
  { value: 'Absent',  label: 'A', color: '#A60003', bg: 'rgba(166,0,3,0.14)'     },
  { value: 'Late',    label: 'L', color: '#D97706', bg: 'rgba(217,119,6,0.14)'   },
]

export default function TeacherAttendance() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const [selectedClass, setSelectedClass] = useState('G9A')
  const [saved, setSaved] = useState(false)

  const initRecords = (classId) =>
    Object.fromEntries((classStudents[classId] || []).map(s => [s.id, { status: 'Present', note: '' }]))

  const [records, setRecords] = useState(() => initRecords('G9A'))

  function switchClass(classId) {
    setSelectedClass(classId)
    setSaved(false)
    setRecords(initRecords(classId))
  }

  function setStatus(studentId, status) {
    if (saved) return
    setRecords(prev => ({ ...prev, [studentId]: { ...prev[studentId], status } }))
  }

  function setNote(studentId, note) {
    if (saved) return
    setRecords(prev => ({ ...prev, [studentId]: { ...prev[studentId], note } }))
  }

  const students  = classStudents[selectedClass] || []
  const present   = Object.values(records).filter(r => r.status === 'Present').length
  const absent    = Object.values(records).filter(r => r.status === 'Absent').length
  const late      = Object.values(records).filter(r => r.status === 'Late').length
  const cls       = teacherClasses.find(c => c.id === selectedClass)

  return (
    <div className="space-y-6 max-w-[900px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Attendance</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Mark attendance for your classes · Mathematics
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          {/* Class selector */}
          <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EEF0F3' }}>
            {teacherClasses.map(c => (
              <button key={c.id}
                onClick={() => switchClass(c.id)}
                className="px-4 py-1.5 rounded-lg text-sm font-black transition-all"
                style={{
                  background: selectedClass === c.id ? '#002333' : 'transparent',
                  color: selectedClass === c.id ? '#fff' : '#6B7280',
                  fontFamily: 'Roboto, sans-serif',
                }}>
                {c.name}
              </button>
            ))}
          </div>
          {/* Date */}
          <div className="px-4 py-2 rounded-xl bg-white text-sm font-black text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}>
            {today}
          </div>
        </div>
        {/* Status */}
        <span className="text-xs font-black px-3 py-1.5 rounded-lg"
          style={{
            background: saved ? 'rgba(72,208,140,0.12)' : 'rgba(217,119,6,0.10)',
            color: saved ? '#16A34A' : '#D97706',
            fontFamily: 'Roboto, sans-serif',
          }}>
          {saved ? '✓ Attendance Saved' : 'Not Yet Submitted'}
        </span>
      </div>

      {/* Summary pills */}
      <div className="flex items-center gap-3">
        {[
          { count: present, label: 'Present', color: '#16A34A' },
          { count: absent,  label: 'Absent',  color: '#A60003' },
          { count: late,    label: 'Late',    color: '#D97706' },
          { count: students.length, label: 'Total', color: '#002333', labelColor: '#6B7280' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.count}</span>
            <span className="text-sm font-black" style={{ color: s.labelColor || s.color, fontFamily: 'Roboto, sans-serif' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl"
          style={{ background: 'rgba(72,208,140,0.10)', border: '2px solid rgba(72,208,140,0.35)' }}>
          <CheckCircle2 size={20} color="#16A34A" strokeWidth={2.5} />
          <div className="flex-1">
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
              Attendance saved for {cls?.name} on {today}
            </p>
            <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Students can now see their attendance records.
            </p>
          </div>
          <button onClick={() => setSaved(false)}
            className="text-xs font-black px-3 py-1.5 rounded-lg transition-colors"
            style={{ background: '#000E21', color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
            Edit
          </button>
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #002333', boxShadow: '0 2px 10px rgba(0,35,51,0.08)' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: '#000E21' }}>
              {['Student', 'Status', 'Quick Mark', 'Note'].map(h => (
                <th key={h} className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((s, i) => {
              const rec    = records[s.id] || { status: 'Present', note: '' }
              const active = STATUS_OPTIONS.find(o => o.value === rec.status)
              return (
                <tr key={s.id} style={{ borderTop: '2px solid #EEF0F3', background: rec.status === 'Absent' ? 'rgba(166,0,3,0.02)' : '' }}>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                        alt={s.name} className="rounded-full object-cover flex-shrink-0"
                        style={{ width: 34, height: 34, border: '1.5px solid #EEF0F3' }}
                        onError={e => { e.target.style.display = 'none' }} />
                      <div>
                        <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.name}</p>
                        <p className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
                      style={{ background: active?.bg, color: active?.color, fontFamily: 'Roboto, sans-serif' }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: active?.color }} />
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-1.5">
                      {STATUS_OPTIONS.map(opt => (
                        <button key={opt.value}
                          onClick={() => setStatus(s.id, opt.value)}
                          className="w-8 h-8 rounded-lg text-xs font-black transition-all"
                          style={{
                            background: rec.status === opt.value ? opt.bg : '#F4F6F8',
                            color: rec.status === opt.value ? opt.color : '#9CA3AF',
                            border: rec.status === opt.value ? `1.5px solid ${opt.color}60` : '1.5px solid transparent',
                            fontFamily: 'Roboto, sans-serif',
                            opacity: saved ? 0.5 : 1,
                          }}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <input
                      value={rec.note}
                      onChange={e => setNote(s.id, e.target.value)}
                      disabled={saved}
                      placeholder="Optional note…"
                      className="w-full px-3 py-1.5 rounded-lg text-xs font-bold text-[#4B5563] outline-none transition-colors"
                      style={{
                        border: '1.5px solid #EEF0F3',
                        background: saved ? '#F9FAFB' : '#FAFBFC',
                        fontFamily: 'Roboto, sans-serif',
                      }}
                      onFocus={e => { if (!saved) e.target.style.borderColor = '#002333' }}
                      onBlur={e => { e.target.style.borderColor = '#EEF0F3' }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {!saved && (
        <button onClick={() => setSaved(true)}
          className="w-full py-3.5 rounded-2xl text-sm font-black text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90"
          style={{ background: '#000E21', fontFamily: 'Roboto, sans-serif' }}>
          <Save size={16} strokeWidth={3} />
          Save Attendance for {cls?.name}
        </button>
      )}
    </div>
  )
}
