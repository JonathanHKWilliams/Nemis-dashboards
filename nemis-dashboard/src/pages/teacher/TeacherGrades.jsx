import { useState } from 'react'
import { teacherClasses, classStudents } from '../../data/teacherData'
import { Award, Download, Pencil, Check, X } from 'lucide-react'

const gradeStyle = {
  A: { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A' },
  B: { bg: 'rgba(37,99,235,0.10)',   color: '#2563EB' },
  C: { bg: 'rgba(217,119,6,0.10)',   color: '#D97706' },
  D: { bg: 'rgba(166,0,3,0.10)',     color: '#A60003' },
  F: { bg: 'rgba(166,0,3,0.14)',     color: '#A60003' },
}

function calcLetterGrade(avg) {
  if (avg >= 90) return { grade: 'A',  letter: 'A' }
  if (avg >= 80) return { grade: 'B+', letter: 'B' }
  if (avg >= 75) return { grade: 'B',  letter: 'B' }
  if (avg >= 70) return { grade: 'C+', letter: 'C' }
  if (avg >= 60) return { grade: 'C',  letter: 'C' }
  if (avg >= 50) return { grade: 'D',  letter: 'D' }
  return { grade: 'F', letter: 'F' }
}

function calcGPA(students) {
  const gpaMap = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 }
  const avg = students.reduce((s, st) => {
    const avg = Math.round(st.assignment * 0.3 + st.test * 0.3 + st.exam * 0.4)
    return s + (gpaMap[calcLetterGrade(avg).letter] ?? 2.0)
  }, 0) / students.length
  return avg.toFixed(2)
}

function ScoreBar({ score, max = 100 }) {
  const pct   = (score / max) * 100
  const color = pct >= 80 ? '#48D08C' : pct >= 60 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-black text-[#002333] w-8 flex-shrink-0" style={{ fontFamily: 'Roboto, sans-serif' }}>{score}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

export default function TeacherGrades() {
  const [selectedClass, setSelectedClass] = useState('G9A')
  const [editingId, setEditingId]         = useState(null)
  const [editValues, setEditValues]       = useState({})
  const [grades, setGrades]               = useState(
    Object.fromEntries(Object.entries(classStudents).map(([k, v]) => [k, v.map(s => ({ ...s }))]))
  )

  const students = grades[selectedClass] || []
  const gpa = calcGPA(students)
  const gpaColor = parseFloat(gpa) >= 3.5 ? '#16A34A' : parseFloat(gpa) >= 2.5 ? '#2563EB' : parseFloat(gpa) >= 1.5 ? '#D97706' : '#A60003'

  function startEdit(s) {
    setEditingId(s.id)
    setEditValues({ assignment: s.assignment, test: s.test, exam: s.exam })
  }

  function saveEdit(student) {
    const a = Math.min(100, Math.max(0, Number(editValues.assignment) || 0))
    const t = Math.min(100, Math.max(0, Number(editValues.test)       || 0))
    const e = Math.min(100, Math.max(0, Number(editValues.exam)       || 0))
    const avg = Math.round(a * 0.3 + t * 0.3 + e * 0.4)
    const { grade, letter } = calcLetterGrade(avg)
    setGrades(prev => ({
      ...prev,
      [selectedClass]: prev[selectedClass].map(s =>
        s.id === student.id ? { ...s, assignment: a, test: t, exam: e, grade, letter } : s
      ),
    }))
    setEditingId(null)
  }

  const aCount = students.filter(s => s.letter === 'A').length
  const bCount = students.filter(s => s.letter === 'B').length
  const cCount = students.filter(s => s.letter === 'C').length
  const needsReview = students.filter(s => {
    const avg = Math.round(s.assignment * 0.3 + s.test * 0.3 + s.exam * 0.4)
    return avg < 60
  }).length

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Grades</h2>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Manage student grades · Mathematics · Academic Year 2025–2026
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-colors hover:bg-[#EEF0F3]"
          style={{ border: '1.5px solid #EEF0F3', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
          <Download size={14} strokeWidth={3} /> Export CSV
        </button>
      </div>

      {/* Class selector + Term */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EEF0F3' }}>
          {teacherClasses.map(cls => (
            <button key={cls.id}
              onClick={() => { setSelectedClass(cls.id); setEditingId(null) }}
              className="px-4 py-1.5 rounded-lg text-sm font-black transition-all"
              style={{
                background: selectedClass === cls.id ? '#002333' : 'transparent',
                color: selectedClass === cls.id ? '#fff' : '#6B7280',
                fontFamily: 'Roboto, sans-serif',
              }}>
              {cls.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EEF0F3' }}>
          {['Term 1', 'Term 2', 'Term 3'].map(t => (
            <button key={t}
              className="px-3 py-1.5 rounded-lg text-sm font-black"
              style={{
                background: t === 'Term 1' ? '#002333' : 'transparent',
                color: t === 'Term 1' ? '#fff' : '#6B7280',
                fontFamily: 'Roboto, sans-serif',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-stretch gap-3">
        <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4 flex-shrink-0"
          style={{ border: '2px solid #002333', boxShadow: '0 2px 10px rgba(0,35,51,0.08)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(0,35,51,0.06)' }}>
            <Award size={24} color="#002333" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Class GPA</p>
            <p className="text-3xl font-black leading-none mt-0.5" style={{ color: gpaColor, fontFamily: 'Sora, sans-serif' }}>{gpa}</p>
            <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {parseFloat(gpa) >= 3.5 ? 'Excellent' : parseFloat(gpa) >= 2.5 ? 'Good' : 'Needs Improvement'}
            </p>
          </div>
        </div>
        {[
          { count: aCount,      label: 'A grades',    color: '#16A34A' },
          { count: bCount,      label: 'B grades',    color: '#2563EB' },
          { count: cCount,      label: 'C grades',    color: '#D97706' },
          { count: needsReview, label: 'Needs Review', color: '#A60003' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.count}</span>
            <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#000E21' }}>
                {['Student', 'Assignment /100', 'Test /100', 'Exam /100', 'Average', 'Grade', 'Action'].map(h => (
                  <th key={h} className="text-left px-5 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const avg = Math.round(s.assignment * 0.3 + s.test * 0.3 + s.exam * 0.4)
                const { grade, letter } = calcLetterGrade(avg)
                const gs = gradeStyle[letter] || gradeStyle.C
                const isEditing = editingId === s.id

                return (
                  <tr key={s.id} style={{ borderTop: '2px solid #EEF0F3', background: isEditing ? 'rgba(72,208,140,0.04)' : '' }}
                    className="transition-colors"
                    onMouseEnter={e => { if (!isEditing) e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={e => { if (!isEditing) e.currentTarget.style.background = '' }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                          alt={s.name} className="rounded-full object-cover flex-shrink-0"
                          style={{ width: 32, height: 32, border: '1.5px solid #EEF0F3' }}
                          onError={e2 => { e2.target.style.display = 'none' }} />
                        <div>
                          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.name}</p>
                          <p className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.id}</p>
                        </div>
                      </div>
                    </td>
                    {['assignment', 'test', 'exam'].map(field => (
                      <td key={field} className="px-5 py-3.5 min-w-[130px]">
                        {isEditing ? (
                          <input type="number" min="0" max="100"
                            value={editValues[field]}
                            onChange={ev => setEditValues(prev => ({ ...prev, [field]: ev.target.value }))}
                            className="w-20 px-2 py-1 rounded-lg text-sm font-black text-[#002333] outline-none"
                            style={{ border: '2px solid #002333', fontFamily: 'Roboto, sans-serif' }}
                          />
                        ) : (
                          <ScoreBar score={s[field]} />
                        )}
                      </td>
                    ))}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black" style={{ fontFamily: 'Roboto, sans-serif', color: avg >= 80 ? '#16A34A' : avg >= 60 ? '#D97706' : '#A60003' }}>
                          {avg}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-sm font-black"
                        style={{ background: gs.bg, color: gs.color, fontFamily: 'Sora, sans-serif' }}>
                        {s.grade}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => saveEdit(s)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                            style={{ background: 'rgba(72,208,140,0.15)' }}>
                            <Check size={14} color="#16A34A" strokeWidth={3} />
                          </button>
                          <button onClick={() => setEditingId(null)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#EEF0F3]"
                            style={{ background: '#F4F6F8' }}>
                            <X size={14} color="#9CA3AF" strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEdit(s)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-colors hover:bg-[#EEF0F3]"
                          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                          <Pencil size={11} strokeWidth={3} /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-xs font-bold text-[#9CA3AF]"
          style={{ borderTop: '2px solid #EEF0F3', background: '#FAFBFC', fontFamily: 'Roboto, sans-serif' }}>
          Grading: Assignment 30% · Test 30% · Exam 40% · Changes here update student grade records.
        </div>
      </div>
    </div>
  )
}
