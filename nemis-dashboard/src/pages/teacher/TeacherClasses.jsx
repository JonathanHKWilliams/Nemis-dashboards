import { useState } from 'react'
import { teacherClasses, classStudents, teacherAssignments } from '../../data/teacherData'
import { Users, ArrowLeft, ClipboardCheck, Star, ClipboardList } from 'lucide-react'

const gradeStyle = {
  A: { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A' },
  B: { bg: 'rgba(37,99,235,0.10)',   color: '#2563EB' },
  C: { bg: 'rgba(217,119,6,0.10)',   color: '#D97706' },
  D: { bg: 'rgba(166,0,3,0.10)',     color: '#A60003' },
  F: { bg: 'rgba(166,0,3,0.14)',     color: '#A60003' },
}

function AttendanceBar({ pct }) {
  const color = pct >= 90 ? '#48D08C' : pct >= 75 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-[10px] font-black w-8 text-right flex-shrink-0" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{pct}%</span>
    </div>
  )
}

function ClassDetail({ classId, onBack }) {
  const [activeTab, setActiveTab] = useState('students')
  const cls      = teacherClasses.find(c => c.id === classId)
  const students = classStudents[classId] || []
  const assigns  = teacherAssignments.filter(a => a.classId === classId)

  return (
    <div className="space-y-6 max-w-[960px]">
      <button onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-black text-[#002333] hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'Roboto, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={3} /> Back to Classes
      </button>

      {/* Class header */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #002333', boxShadow: '0 2px 12px rgba(0,35,51,0.10)' }}>
        <div className="px-7 py-5" style={{ background: '#002333' }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{cls?.name}</h2>
              <p className="text-sm font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Roboto, sans-serif' }}>
                {cls?.subject} · {cls?.room} · {cls?.totalStudents} students total
              </p>
            </div>
            <div className="flex items-center gap-6">
              {[
                { label: 'Shown', value: students.length, color: '#48D08C' },
                { label: 'Assignments', value: assigns.length, color: '#FCD34D' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                  <p className="text-[10px] font-black uppercase" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex" style={{ borderBottom: '2px solid #EEF0F3' }}>
          {[
            { id: 'students', label: 'Students', icon: Users },
            { id: 'assignments', label: 'Assignments', icon: ClipboardList },
            { id: 'summary', label: 'Attendance Summary', icon: ClipboardCheck },
          ].map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-6 py-3.5 text-sm font-black transition-colors relative"
                style={{
                  color: activeTab === tab.id ? '#002333' : '#9CA3AF',
                  fontFamily: 'Roboto, sans-serif',
                  borderBottom: activeTab === tab.id ? '2px solid #002333' : '2px solid transparent',
                  marginBottom: -2,
                }}>
                <Icon size={14} strokeWidth={3} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'students' && (
            <div className="grid grid-cols-2 gap-4">
              {students.map(s => {
                const gs = gradeStyle[s.letter] || gradeStyle.C
                return (
                  <div key={s.id} className="flex items-center gap-3 p-4 rounded-xl"
                    style={{ border: '1px solid #EEF0F3', background: '#FAFBFC' }}>
                    <img
                      src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                      alt={s.name}
                      className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 40, height: 40, border: '2px solid #EEF0F3' }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{s.name}</p>
                      <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.id}</p>
                      <AttendanceBar pct={s.attendance} />
                    </div>
                    <span className="text-sm font-black px-2.5 py-1 rounded-lg flex-shrink-0"
                      style={{ background: gs.bg, color: gs.color, fontFamily: 'Sora, sans-serif' }}>
                      {s.grade}
                    </span>
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-3">
              {assigns.length === 0 && (
                <p className="text-sm font-bold text-[#9CA3AF] text-center py-8" style={{ fontFamily: 'Roboto, sans-serif' }}>No assignments for this class yet.</p>
              )}
              {assigns.map(a => (
                <div key={a.id} className="flex items-center justify-between px-4 py-3.5 rounded-xl"
                  style={{ border: '1px solid #EEF0F3', background: '#FAFBFC' }}>
                  <div>
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</p>
                    <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.type} · Due {a.due}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.submissions}/{a.total}</span>
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg"
                      style={{
                        background: a.status === 'Graded' ? 'rgba(72,208,140,0.12)' : a.status === 'In Progress' ? 'rgba(37,99,235,0.1)' : 'rgba(217,119,6,0.1)',
                        color: a.status === 'Graded' ? '#16A34A' : a.status === 'In Progress' ? '#2563EB' : '#D97706',
                        fontFamily: 'Roboto, sans-serif',
                      }}>
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'summary' && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Average Attendance', value: `${Math.round(students.reduce((s, st) => s + st.attendance, 0) / students.length)}%`, color: '#16A34A' },
                  { label: 'Below 80%', value: students.filter(s => s.attendance < 80).length, color: '#A60003' },
                  { label: 'Perfect Attendance', value: students.filter(s => s.attendance === 100).length, color: '#2563EB' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-xl p-4 text-center" style={{ border: '1px solid #EEF0F3' }}>
                    <p className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                    <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {students.map(s => (
                  <div key={s.id} className="flex items-center gap-3">
                    <img src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                      alt={s.name} className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 28, height: 28, border: '1.5px solid #EEF0F3' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <span className="text-sm font-black text-[#002333] w-44 flex-shrink-0 truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{s.name}</span>
                    <div className="flex-1"><AttendanceBar pct={s.attendance} /></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TeacherClasses({ setActivePage }) {
  const [selectedClass, setSelectedClass] = useState(null)

  if (selectedClass) return <ClassDetail classId={selectedClass} onBack={() => setSelectedClass(null)} />

  const totalStudents = teacherClasses.reduce((s, c) => s + c.totalStudents, 0)

  return (
    <div className="space-y-6 max-w-[960px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>My Classes</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Assigned classes for Academic Year 2025–2026
        </p>
      </div>

      <div className="flex items-center gap-3">
        {[
          { value: teacherClasses.length, label: 'Classes', color: '#002333' },
          { value: totalStudents, label: 'Total Students', color: '#002333' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2" style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</span>
            <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Classes table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#002333' }}>
                {['Class', 'Subject', 'Students', 'Room', 'Next Class', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherClasses.map((cls, i) => (
                <tr key={cls.id} style={{ borderTop: '2px solid #EEF0F3' }}
                  className="transition-colors"
                  onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,35,51,0.06)' }}>
                        <Users size={15} color="#002333" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{cls.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                      style={{ background: 'rgba(72,208,140,0.12)', color: '#16A34A', fontFamily: 'Roboto, sans-serif' }}>
                      {cls.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-[#002333]"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{cls.totalStudents}</td>
                  <td className="px-6 py-4 text-sm font-bold text-[#4B5563]"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{cls.room}</td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{cls.nextClass}</p>
                    <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{cls.nextDay}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelectedClass(cls.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-black text-white transition-opacity hover:opacity-80"
                        style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        View Class
                      </button>
                      <button onClick={() => setActivePage && setActivePage('attendance')}
                        className="px-3 py-1.5 rounded-lg text-xs font-black transition-colors hover:bg-[#EEF0F3]"
                        style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        Attendance
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
