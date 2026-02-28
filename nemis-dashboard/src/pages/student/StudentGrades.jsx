import { grades } from '../../data/studentData'
import { Hash, BookOpen, Leaf, Landmark, Monitor, Zap, TrendingUp, TrendingDown, Minus, Award } from 'lucide-react'

const gradeStyle = {
  A: { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A' },
  B: { bg: 'rgba(37,99,235,0.10)',   color: '#2563EB' },
  C: { bg: 'rgba(217,119,6,0.10)',   color: '#D97706' },
  D: { bg: 'rgba(166,0,3,0.10)',     color: '#A60003' },
  F: { bg: 'rgba(166,0,3,0.14)',     color: '#A60003' },
}

const subjectIcons = {
  Mathematics: Hash,
  English:     BookOpen,
  Biology:     Leaf,
  History:     Landmark,
  ICT:         Monitor,
  Physics:     Zap,
}

// Calculate GPA (A=4, B=3, C=2, D=1, F=0)
const gpaMap = { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 }
function calcGPA(gradeList) {
  const total = gradeList.reduce((sum, g) => sum + (gpaMap[g.letter] ?? 2.0), 0)
  return (total / gradeList.length).toFixed(2)
}

function GradeBadge({ grade, letter }) {
  const s = gradeStyle[letter] || gradeStyle.C
  return (
    <span className="px-3 py-1 rounded-full text-sm font-black"
      style={{ background: s.bg, color: s.color, fontFamily: 'Sora, sans-serif' }}>
      {grade}
    </span>
  )
}

function ScoreBar({ score, max = 100 }) {
  const pct   = (score / max) * 100
  const color = pct >= 80 ? '#48D08C' : pct >= 65 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-black text-[#002333] w-8" style={{ fontFamily: 'Roboto, sans-serif' }}>{score}</span>
      <div className="flex-1 h-2 rounded-full" style={{ background: '#EEF0F3' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

function TrendIcon({ score }) {
  if (score >= 80) return <TrendingUp size={14} color="#16A34A" strokeWidth={3} />
  if (score >= 65) return <Minus size={14} color="#D97706" strokeWidth={3} />
  return <TrendingDown size={14} color="#A60003" strokeWidth={3} />
}

export default function StudentGrades() {
  const totalSubjects = grades.length
  const aCount = grades.filter(g => g.letter === 'A').length
  const bCount = grades.filter(g => g.letter === 'B').length
  const cCount = grades.filter(g => g.letter === 'C').length
  const gpa    = calcGPA(grades)
  const gpaColor = parseFloat(gpa) >= 3.5 ? '#16A34A' : parseFloat(gpa) >= 2.5 ? '#2563EB' : parseFloat(gpa) >= 1.5 ? '#D97706' : '#A60003'

  return (
    <div className="space-y-6 max-w-[960px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Grades</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Academic performance · Grade 9A · Term 1 · 2025–2026
        </p>
      </div>

      {/* Summary row — GPA card + grade counts */}
      <div className="flex items-stretch gap-3">
        {/* GPA Hero */}
        <div className="bg-white rounded-2xl px-6 py-4 flex items-center gap-4 flex-shrink-0"
          style={{ border: '2px solid #002333', boxShadow: '0 2px 10px rgba(0,35,51,0.08)' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(0,35,51,0.06)' }}>
            <Award size={24} color="#002333" strokeWidth={3} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280]"
              style={{ fontFamily: 'Roboto, sans-serif' }}>Term GPA</p>
            <p className="text-3xl font-black leading-none mt-0.5"
              style={{ color: gpaColor, fontFamily: 'Sora, sans-serif' }}>{gpa}</p>
            <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {parseFloat(gpa) >= 3.5 ? 'Excellent' : parseFloat(gpa) >= 2.5 ? 'Good' : parseFloat(gpa) >= 1.5 ? 'Average' : 'Needs Work'}
            </p>
          </div>
        </div>

        {/* Grade count pills */}
        {[
          { count: aCount,        label: 'A grades', color: '#16A34A' },
          { count: bCount,        label: 'B grades', color: '#2563EB' },
          { count: cCount,        label: 'C grades', color: '#D97706' },
          { count: totalSubjects, label: 'Subjects', color: '#002333', labelColor: '#6B7280' },
        ].map(item => (
          <div key={item.label} className="bg-white rounded-xl px-4 py-3 flex items-center gap-2"
            style={{ border: '1px solid #EEF0F3' }}>
            <span className="text-2xl font-black" style={{ color: item.color, fontFamily: 'Sora, sans-serif' }}>{item.count}</span>
            <span className="text-sm font-black" style={{ color: item.labelColor || item.color, fontFamily: 'Roboto, sans-serif' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.06)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#002333' }}>
                {['Subject', 'Teacher', 'Assignment', 'Exam', 'Trend', 'Final Grade'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => {
                const Icon = subjectIcons[g.subject] || BookOpen
                const avg  = Math.round((g.assignmentScore + g.examScore) / 2)
                return (
                  <tr key={g.subject} className="transition-colors" style={{ borderTop: '2px solid #EEF0F3' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(0,35,51,0.06)' }}>
                          <Icon size={14} color="#002333" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-black text-[#002333]"
                          style={{ fontFamily: 'Sora, sans-serif' }}>{g.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#4B5563]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{g.teacher}</td>
                    <td className="px-6 py-4 min-w-[140px]">
                      <ScoreBar score={g.assignmentScore} />
                    </td>
                    <td className="px-6 py-4 min-w-[140px]">
                      <ScoreBar score={g.examScore} />
                    </td>
                    <td className="px-6 py-4">
                      <TrendIcon score={avg} />
                    </td>
                    <td className="px-6 py-4">
                      <GradeBadge grade={g.grade} letter={g.letter} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Footer legend */}
        <div className="px-6 py-3 flex items-center gap-4 flex-wrap" style={{ borderTop: '2px solid #EEF0F3', background: '#FAFBFC' }}>
          <p className="text-[11px] font-black text-[#6B7280] uppercase tracking-wide mr-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Grade key:</p>
          {[['A', '#16A34A', 'Excellent (90–100)'], ['B', '#2563EB', 'Good (75–89)'], ['C', '#D97706', 'Average (60–74)'], ['D/F', '#A60003', 'Below Average']].map(([g, c, label]) => (
            <div key={g} className="flex items-center gap-1.5">
              <span className="text-xs font-black" style={{ color: c }}>{g}</span>
              <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 ml-4 pl-4" style={{ borderLeft: '1px solid #EEF0F3' }}>
            <div className="flex items-center gap-1"><TrendingUp size={12} color="#16A34A" strokeWidth={3} /><span className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Strong</span></div>
            <div className="flex items-center gap-1"><Minus size={12} color="#D97706" strokeWidth={3} /><span className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Average</span></div>
            <div className="flex items-center gap-1"><TrendingDown size={12} color="#A60003" strokeWidth={3} /><span className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Needs Work</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}
