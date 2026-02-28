import { useState } from 'react'
import { teacherAssignments, assignmentSubmissions, classStudents, teacherClasses } from '../../data/teacherData'
import {
  Plus, ArrowLeft, ClipboardList, HelpCircle, FileText, GraduationCap, BookOpen,
  Upload, Eye, CheckCircle2, Clock, X, Pencil, Check,
} from 'lucide-react'

const typeConfig = {
  Assignment: { icon: ClipboardList, color: '#2563EB', bg: 'rgba(37,99,235,0.08)'  },
  Quiz:       { icon: HelpCircle,    color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  Test:       { icon: FileText,      color: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  Exam:       { icon: GraduationCap, color: '#A60003', bg: 'rgba(166,0,3,0.08)'    },
  Classwork:  { icon: BookOpen,      color: '#002333', bg: 'rgba(0,35,51,0.07)'    },
}

const statusStyle = {
  Graded:      { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A' },
  'In Progress': { bg: 'rgba(37,99,235,0.10)', color: '#2563EB' },
  Pending:     { bg: 'rgba(217,119,6,0.10)',   color: '#D97706' },
}

function calcGrade(score, max) {
  const pct = (score / max) * 100
  if (pct >= 90) return 'A'
  if (pct >= 80) return 'B+'
  if (pct >= 75) return 'B'
  if (pct >= 65) return 'C+'
  if (pct >= 60) return 'C'
  if (pct >= 50) return 'D'
  return 'F'
}

function AssignmentDetail({ a, onBack }) {
  const [activeTab, setActiveTab]   = useState('submitted')
  const [subs, setSubs]             = useState(assignmentSubmissions[a.id] || [])
  const [editScore, setEditScore]   = useState({})
  const [editFeedback, setEditFeedback] = useState({})
  const [saved, setSaved]           = useState({})

  const allStudents = classStudents[a.classId] || []
  const submittedIds = subs.map(s => s.studentId)
  const notSubmitted = allStudents.filter(s => !submittedIds.includes(s.id))
  const { icon: TypeIcon, color: typeColor, bg: typeBg } = typeConfig[a.type] || typeConfig.Assignment

  function saveScore(sub) {
    const score = Number(editScore[sub.studentId] ?? sub.score)
    const grade = score !== null ? calcGrade(score, a.maxScore) : null
    setSubs(prev => prev.map(s => s.studentId === sub.studentId ? { ...s, score, grade, feedback: editFeedback[sub.studentId] ?? s.feedback } : s))
    setSaved(prev => ({ ...prev, [sub.studentId]: true }))
    setTimeout(() => setSaved(prev => ({ ...prev, [sub.studentId]: false })), 2000)
  }

  return (
    <div className="space-y-6 max-w-[960px]">
      <button onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-black text-[#002333] hover:opacity-70"
        style={{ fontFamily: 'Roboto, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={3} /> Back to Assignments
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #002333', boxShadow: '0 2px 12px rgba(0,35,51,0.10)' }}>
        <div className="px-7 py-5 flex items-start gap-4" style={{ background: '#002333' }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)' }}>
            <TypeIcon size={22} color="white" strokeWidth={3} />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</h2>
            <p className="text-sm font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Roboto, sans-serif' }}>
              {a.type} · {a.classId === 'G9A' ? 'Grade 9A' : 'Grade 9B'} · Due {a.due} · Max {a.maxScore} pts
            </p>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full"
            style={{ background: 'rgba(72,208,140,0.2)', color: '#48D08C', fontFamily: 'Roboto, sans-serif' }}>
            {subs.length}/{allStudents.length} Submitted
          </span>
        </div>

        {a.description && (
          <div className="px-7 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-xs font-black uppercase tracking-widest text-[#6B7280] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Instructions</p>
            <p className="text-sm font-semibold text-[#374151] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.description}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '2px solid #EEF0F3' }}>
          {[
            { id: 'submitted',     label: `Submitted (${subs.length})` },
            { id: 'not_submitted', label: `Not Submitted (${notSubmitted.length})` },
          ].map(tab => (
            <button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3.5 text-sm font-black transition-colors"
              style={{
                color: activeTab === tab.id ? '#002333' : '#9CA3AF',
                fontFamily: 'Roboto, sans-serif',
                borderBottom: activeTab === tab.id ? '2px solid #002333' : '2px solid transparent',
                marginBottom: -2,
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {activeTab === 'submitted' && (
            subs.length === 0 ? (
              <p className="text-sm font-bold text-[#9CA3AF] text-center py-8" style={{ fontFamily: 'Roboto, sans-serif' }}>No submissions yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr style={{ background: '#FAFBFC' }}>
                      {['Student', 'Score', 'Grade', 'Feedback', 'Action'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-[11px] font-black uppercase tracking-wider text-[#6B7280]"
                          style={{ fontFamily: 'Roboto, sans-serif', borderBottom: '2px solid #EEF0F3' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((sub, i) => {
                      const score = editScore[sub.studentId] !== undefined ? editScore[sub.studentId] : (sub.score ?? '')
                      const grade = score !== '' ? calcGrade(Number(score), a.maxScore) : '—'
                      const fb    = editFeedback[sub.studentId] !== undefined ? editFeedback[sub.studentId] : (sub.feedback || '')
                      return (
                        <tr key={sub.studentId} style={{ borderBottom: '1px solid #F4F6F8' }}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <img src={`https://randomuser.me/api/portraits/${sub.gender}/${sub.photoId}.jpg`}
                                alt={sub.name} className="rounded-full object-cover flex-shrink-0"
                                style={{ width: 30, height: 30, border: '1.5px solid #EEF0F3' }}
                                onError={e => { e.target.style.display = 'none' }} />
                              <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{sub.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <input type="number" min="0" max={a.maxScore}
                              value={score}
                              onChange={e => setEditScore(prev => ({ ...prev, [sub.studentId]: e.target.value }))}
                              className="w-20 px-2 py-1 rounded-lg text-sm font-black text-[#002333] outline-none"
                              style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                              onFocus={e => { e.target.style.borderColor = '#002333' }}
                              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm font-black px-2.5 py-1 rounded-full"
                              style={{
                                background: grade === 'A' ? 'rgba(72,208,140,0.12)' : grade === 'F' ? 'rgba(166,0,3,0.10)' : 'rgba(37,99,235,0.10)',
                                color: grade === 'A' ? '#16A34A' : grade === 'F' ? '#A60003' : '#2563EB',
                                fontFamily: 'Sora, sans-serif',
                              }}>
                              {grade}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <input
                              value={fb}
                              onChange={e => setEditFeedback(prev => ({ ...prev, [sub.studentId]: e.target.value }))}
                              placeholder="Write feedback…"
                              className="w-full px-2 py-1.5 rounded-lg text-xs font-bold text-[#4B5563] outline-none"
                              style={{ border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', minWidth: 160 }}
                              onFocus={e => { e.target.style.borderColor = '#002333' }}
                              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }}
                            />
                          </td>
                          <td className="px-4 py-3">
                            {saved[sub.studentId] ? (
                              <span className="inline-flex items-center gap-1 text-xs font-black text-[#16A34A]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                                <CheckCircle2 size={13} strokeWidth={3} /> Saved
                              </span>
                            ) : (
                              <button onClick={() => saveScore(sub)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-white transition-opacity hover:opacity-80"
                                style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                                <Check size={11} strokeWidth={3} /> Save
                              </button>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'not_submitted' && (
            notSubmitted.length === 0 ? (
              <p className="text-sm font-bold text-[#9CA3AF] text-center py-8" style={{ fontFamily: 'Roboto, sans-serif' }}>All students have submitted.</p>
            ) : (
              <div className="space-y-2">
                {notSubmitted.map(s => (
                  <div key={s.id} className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: '#FAFBFC', border: '1px solid #EEF0F3' }}>
                    <div className="flex items-center gap-2.5">
                      <img src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                        alt={s.name} className="rounded-full object-cover flex-shrink-0"
                        style={{ width: 30, height: 30, border: '1.5px solid #EEF0F3' }}
                        onError={e => { e.target.style.display = 'none' }} />
                      <div>
                        <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.name}</p>
                        <p className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.id}</p>
                      </div>
                    </div>
                    <span className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(166,0,3,0.10)', color: '#A60003', fontFamily: 'Roboto, sans-serif' }}>
                      Not Submitted
                    </span>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

function CreateModal({ onClose }) {
  const [questions, setQuestions] = useState([''])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,35,51,0.45)', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl w-full max-w-[560px] overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,35,51,0.25)' }}>
        <div className="px-7 py-5 flex items-center justify-between" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Create Assignment</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={16} color="white" strokeWidth={3} />
          </button>
        </div>
        <div className="px-7 py-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {[
            { label: 'Title', type: 'text', placeholder: 'Assignment title' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                onFocus={e => { e.target.style.borderColor = '#002333' }}
                onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Class</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: '#fff' }}>
                <option>Grade 9A</option><option>Grade 9B</option><option>Both Classes</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Type</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: '#fff' }}>
                {Object.keys(typeConfig).map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Description / Instructions</label>
            <textarea rows={3} placeholder="Describe the assignment…"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none resize-none"
              style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
              onFocus={e => { e.target.style.borderColor = '#002333' }}
              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Due Date</label>
              <input type="date" className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                onFocus={e => { e.target.style.borderColor = '#002333' }}
                onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
            </div>
            <div>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Max Score</label>
              <input type="number" defaultValue={100} className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                onFocus={e => { e.target.style.borderColor = '#002333' }}
                onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>Questions</label>
              <button onClick={() => setQuestions(prev => [...prev, ''])}
                className="text-xs font-black text-[#002333] hover:opacity-70" style={{ fontFamily: 'Roboto, sans-serif' }}>+ Add Question</button>
            </div>
            {questions.map((q, qi) => (
              <div key={qi} className="flex gap-2 mb-2">
                <input value={q} onChange={e => setQuestions(prev => prev.map((x, i) => i === qi ? e.target.value : x))}
                  placeholder={`Question ${qi + 1}`}
                  className="flex-1 px-3 py-2 rounded-xl text-sm font-bold text-[#002333] outline-none"
                  style={{ border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                  onFocus={e => { e.target.style.borderColor = '#002333' }}
                  onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
                {questions.length > 1 && (
                  <button onClick={() => setQuestions(prev => prev.filter((_, i) => i !== qi))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: '#F4F6F8' }}>
                    <X size={13} color="#9CA3AF" strokeWidth={3} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-7 py-4 flex items-center justify-end gap-3" style={{ borderTop: '2px solid #EEF0F3' }}>
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-black transition-colors hover:bg-[#EEF0F3]"
            style={{ color: '#6B7280', fontFamily: 'Roboto, sans-serif' }}>Cancel</button>
          <button onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
            style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>Create Assignment</button>
        </div>
      </div>
    </div>
  )
}

export default function TeacherAssignments() {
  const [detail, setDetail]             = useState(null)
  const [showCreate, setShowCreate]     = useState(false)

  const pending    = teacherAssignments.filter(a => a.status === 'Pending').length
  const inProgress = teacherAssignments.filter(a => a.status === 'In Progress').length
  const graded     = teacherAssignments.filter(a => a.status === 'Graded').length

  if (detail) return <AssignmentDetail a={detail} onBack={() => setDetail(null)} />

  return (
    <div className="space-y-6 max-w-[960px]">
      {showCreate && <CreateModal onClose={() => setShowCreate(false)} />}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Assignments</h2>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Manage and grade class assignments
          </p>
        </div>
        <button onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
          style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
          <Plus size={16} strokeWidth={3} /> Create Assignment
        </button>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-3">
        {[
          { count: pending,    label: 'Pending',     color: '#D97706' },
          { count: inProgress, label: 'In Progress', color: '#2563EB' },
          { count: graded,     label: 'Graded',      color: '#16A34A' },
          { count: teacherAssignments.length, label: 'Total', color: '#002333', labelColor: '#6B7280' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.count}</span>
            <span className="text-sm font-black" style={{ color: s.labelColor || s.color, fontFamily: 'Roboto, sans-serif' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#002333' }}>
                {['Title', 'Class', 'Type', 'Due Date', 'Submissions', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherAssignments.map((a, i) => {
                const { icon: TypeIcon, color, bg } = typeConfig[a.type] || typeConfig.Assignment
                const ss = statusStyle[a.status] || statusStyle.Pending
                return (
                  <tr key={a.id} style={{ borderTop: '2px solid #EEF0F3' }}
                    className="transition-colors"
                    onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        {a.classId === 'G9A' ? 'Grade 9A' : 'Grade 9B'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ background: bg }}>
                        <TypeIcon size={11} color={color} strokeWidth={3} />
                        <span className="text-[11px] font-black" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{a.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-[#002333]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{a.due}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.submissions}</span>
                        <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>/ {a.total}</span>
                        <div className="w-16 h-1.5 rounded-full ml-1" style={{ background: '#EEF0F3' }}>
                          <div className="h-full rounded-full"
                            style={{ width: `${(a.submissions / a.total) * 100}%`, background: '#48D08C' }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full"
                        style={{ background: ss.bg, color: ss.color, fontFamily: 'Roboto, sans-serif' }}>{a.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => setDetail(a)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black text-white transition-opacity hover:opacity-80"
                        style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        <Eye size={11} strokeWidth={3} /> View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
