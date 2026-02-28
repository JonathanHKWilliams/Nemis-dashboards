import { useState } from 'react'
import { assignments, subjects } from '../../data/studentData'
import {
  Upload, Eye, CheckCircle2, Clock, FileCheck,
  Hash, BookOpen, Leaf, Landmark, Monitor, Zap,
  ArrowLeft, Send, AlertCircle,
} from 'lucide-react'

const subjectIcons = {
  Mathematics: Hash,
  English:     BookOpen,
  Biology:     Leaf,
  History:     Landmark,
  ICT:         Monitor,
  Physics:     Zap,
}

const statusConfig = {
  Pending:   { bg: 'rgba(217,119,6,0.10)',   color: '#D97706',  icon: Clock,        label: 'Pending'   },
  Submitted: { bg: 'rgba(37,99,235,0.10)',   color: '#2563EB',  icon: FileCheck,    label: 'Submitted' },
  Graded:    { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A',  icon: CheckCircle2, label: 'Graded'    },
}

// Mock assignment detail content
function getAssignmentDetail(a) {
  const details = {
    1: {
      instructions: `Write a 500–700 word essay on the topic "Climate Change and Its Impact on Coastal Communities in West Africa."

Your essay must include:
1. An introduction explaining what climate change is
2. At least two specific impacts on coastal communities
3. Possible solutions or responses to the problem
4. A conclusion summarizing your key points

Format: Double-spaced, 12pt font, include a title and your name.`,
      questions: [
        'What is climate change and what causes it?',
        'Name two ways climate change affects coastal communities in West Africa.',
        'What solutions can governments and citizens adopt to address these impacts?',
      ],
    },
    4: {
      instructions: `Research and write a 600-word paper on the Civil Rights Movement in the United States (1954–1968).

Your paper must cover:
1. The key causes and events that started the Civil Rights Movement
2. At least three major figures (e.g. Martin Luther King Jr., Rosa Parks, Malcolm X)
3. Major legislation passed during this period (e.g. Civil Rights Act 1964)
4. The lasting impact of the movement on American society`,
      questions: [
        'What were the main causes of the Civil Rights Movement?',
        'Who were the key leaders and what did they stand for?',
        'What was the significance of the Civil Rights Act of 1964?',
        'How has the movement shaped modern American society?',
      ],
    },
    5: {
      instructions: `Build a simple personal webpage using HTML, CSS, and basic JavaScript.

Your webpage must include:
1. A navigation bar with at least 3 links
2. A "Home" section with your name and a short bio
3. A "Skills" section listing 3–5 skills
4. A "Contact" form (name, email, message fields)
5. Responsive design for mobile and desktop

Submit your project as a .zip file containing all files.`,
      questions: [
        'Describe the structure of your HTML document.',
        'How did you apply CSS to style your webpage?',
        'What JavaScript functionality did you add and how does it work?',
        'How did you make your page responsive?',
      ],
    },
  }
  return details[a.id] || {
    instructions: `Complete the assignment titled "${a.title}" for ${a.subject}.\n\nFollow all instructions provided by ${a.teacher} and submit before the due date: ${a.due}.`,
    questions: [
      'Answer Question 1 as directed by your teacher.',
      'Answer Question 2 as directed by your teacher.',
      'Answer Question 3 as directed by your teacher.',
    ],
  }
}

function AssignmentDetail({ a, onClose }) {
  const detail  = getAssignmentDetail(a)
  const Icon    = subjectIcons[a.subject] || BookOpen
  const sub     = subjects.find(s => s.name === a.subject)
  const [answers, setAnswers] = useState(detail.questions.map(() => ''))
  const [submitted, setSubmitted] = useState(a.status !== 'Pending')

  function handleSubmit() {
    setSubmitted(true)
  }

  return (
    <div className="space-y-6 max-w-[860px]">
      {/* Back */}
      <button onClick={onClose}
        className="inline-flex items-center gap-2 text-sm font-black text-[#002333] hover:opacity-70 transition-opacity"
        style={{ fontFamily: 'Roboto, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={3} /> Back to Assignments
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #002333', boxShadow: '0 2px 12px rgba(0,35,51,0.10)' }}>
        <div style={{ background: '#002333', padding: '20px 28px' }}>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.12)' }}>
              <Icon size={20} color="white" strokeWidth={3} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</h2>
              <p className="text-sm font-bold mt-1" style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Roboto, sans-serif' }}>
                {a.subject} · Due {a.due}
              </p>
            </div>
            <span className="text-xs font-black px-3 py-1 rounded-full"
              style={{
                background: a.status === 'Pending' ? 'rgba(217,119,6,0.25)' : 'rgba(72,208,140,0.2)',
                color: a.status === 'Pending' ? '#FCD34D' : '#48D08C',
                fontFamily: 'Roboto, sans-serif',
              }}>
              {a.status}
            </span>
          </div>
        </div>

        {/* Teacher info */}
        <div className="px-7 py-4 flex items-center gap-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <img
            src={`https://randomuser.me/api/portraits/${sub?.teacherGender || 'men'}/${sub?.teacherPhotoId || 10}.jpg`}
            alt={a.teacher}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 36, height: 36, border: '2px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{a.teacher}</p>
            <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.subject} Teacher</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="px-7 py-5">
          <p className="text-xs font-black uppercase tracking-widest text-[#6B7280] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Instructions</p>
          <div className="text-sm font-semibold text-[#374151] leading-relaxed whitespace-pre-line"
            style={{ fontFamily: 'Roboto, sans-serif' }}>
            {detail.instructions}
          </div>
        </div>
      </div>

      {/* Answer section */}
      {submitted ? (
        <div className="bg-white rounded-2xl p-7 flex items-center gap-4"
          style={{ border: '2px solid rgba(72,208,140,0.4)', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <CheckCircle2 size={32} color="#16A34A" strokeWidth={2.5} />
          <div>
            <p className="font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {a.status === 'Graded' ? 'This assignment has been graded.' : 'Assignment submitted successfully!'}
            </p>
            <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {a.status === 'Graded' ? 'Check the Grades page to see your score.' : 'Your teacher will review and grade your work.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="text-base font-black text-[#002333] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Your Answers</p>
            <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Answer each question below. Your responses will be submitted directly to your teacher.
            </p>
          </div>

          {detail.questions.map((q, qi) => (
            <div key={qi} className="bg-white rounded-2xl p-5"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
              <p className="text-sm font-black text-[#002333] mb-3"
                style={{ fontFamily: 'Sora, sans-serif' }}>
                Q{qi + 1}. {q}
              </p>
              <textarea
                rows={4}
                value={answers[qi]}
                onChange={e => setAnswers(prev => prev.map((v, i) => i === qi ? e.target.value : v))}
                placeholder="Type your answer here…"
                className="w-full resize-none rounded-xl px-4 py-3 text-sm font-semibold text-[#002333] transition-colors outline-none"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  border: '2px solid #EEF0F3',
                  background: '#FAFBFC',
                }}
                onFocus={e => { e.target.style.borderColor = '#002333' }}
                onBlur={e => { e.target.style.borderColor = '#EEF0F3' }}
              />
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              <AlertCircle size={13} strokeWidth={3} />
              Ensure all answers are complete before submitting.
            </div>
            <button onClick={handleSubmit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
              style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
              <Send size={14} strokeWidth={3} />
              Submit Assignment
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }) {
  const s = statusConfig[status] || statusConfig.Pending
  const Icon = s.icon
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
      style={{ background: s.bg, color: s.color, fontFamily: 'Roboto, sans-serif' }}>
      <Icon size={11} strokeWidth={3} />
      {s.label}
    </span>
  )
}

const currentAssignments = assignments.filter(a => a.status === 'Pending')
const pastAssignments    = assignments.filter(a => a.status !== 'Pending')

function AssignmentTable({ title, rows, onView }) {
  if (!rows.length) return null
  return (
    <div className="bg-white rounded-2xl overflow-hidden"
      style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            {/* Section title row — gray */}
            <tr style={{ background: '#F4F6F8' }}>
              <th colSpan={7} className="text-left px-6 py-3 text-xs font-black uppercase tracking-wider text-[#002333]"
                style={{ fontFamily: 'Roboto, sans-serif', borderBottom: '2px solid #EEF0F3' }}>{title}</th>
            </tr>
            {/* Column headers */}
            <tr style={{ background: '#FAFBFC', borderTop: '1px solid #EEF0F3' }}>
              {['Subject', 'Assignment', 'Teacher', 'Due Date', 'Status', 'Action'].map(h => (
                <th key={h} className="text-left px-6 py-3 text-[11px] font-black uppercase tracking-wider text-[#6B7280]"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((a, i) => {
              const Icon = subjectIcons[a.subject] || BookOpen
              const sub  = subjects.find(s => s.name === a.subject)
              return (
                <tr key={a.id} className="transition-colors" style={{ borderTop: i === 0 ? '2px solid #EEF0F3' : '2px solid #EEF0F3' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(0,35,51,0.06)' }}>
                        <Icon size={14} color="#002333" strokeWidth={3} />
                      </div>
                      <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{a.subject}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://randomuser.me/api/portraits/${sub?.teacherGender || 'men'}/${sub?.teacherPhotoId || 10}.jpg`}
                        alt={a.teacher}
                        className="rounded-full object-cover flex-shrink-0"
                        style={{ width: 28, height: 28, border: '1.5px solid #EEF0F3' }}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                      <span className="text-sm font-bold text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.teacher}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-black"
                      style={{ color: a.status === 'Pending' ? '#A60003' : '#4B5563', fontFamily: 'Roboto, sans-serif' }}>
                      {a.due}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button onClick={() => onView(a)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black transition-colors"
                      style={{
                        background: a.status === 'Pending' ? '#002333' : '#F4F6F8',
                        color: a.status === 'Pending' ? '#fff' : '#002333',
                        fontFamily: 'Roboto, sans-serif',
                      }}>
                      {a.status === 'Pending'
                        ? <><Upload size={12} strokeWidth={3} /> Start</>
                        : <><Eye size={12} strokeWidth={3} /> View</>}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function StudentAssignments() {
  const [detail, setDetail] = useState(null)

  const pendingCount   = assignments.filter(a => a.status === 'Pending').length
  const submittedCount = assignments.filter(a => a.status === 'Submitted').length
  const gradedCount    = assignments.filter(a => a.status === 'Graded').length

  if (detail) return <AssignmentDetail a={detail} onClose={() => setDetail(null)} />

  return (
    <div className="space-y-6 max-w-[960px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Assignments</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          All assignments for Grade 9A · Academic Year 2025–2026
        </p>
      </div>

      {/* Summary Pills */}
      <div className="flex items-center gap-3">
        {[
          { count: pendingCount,   label: 'Pending',   color: '#D97706' },
          { count: submittedCount, label: 'Submitted',  color: '#2563EB' },
          { count: gradedCount,    label: 'Graded',     color: '#16A34A' },
          { count: assignments.length, label: 'Total', color: '#002333', labelColor: '#6B7280' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: item.color, fontFamily: 'Sora, sans-serif' }}>{item.count}</span>
            <span className="text-sm font-black" style={{ color: item.labelColor || item.color, fontFamily: 'Roboto, sans-serif' }}>{item.label}</span>
          </div>
        ))}
      </div>

      <AssignmentTable title="Current Assignments" rows={currentAssignments} onView={setDetail} />
      <AssignmentTable title="Past Assignments"    rows={pastAssignments}    onView={setDetail} />
    </div>
  )
}
