import { children, childGrades } from '../../data/parentData'

const ACCENT = '#C084FC'

function gradeColor(grade) {
  if (!grade) return { bg: '#F4F6F8', text: '#6B7280' }
  const g = grade.charAt(0)
  if (g === 'A') return { bg: 'rgba(72,208,140,0.12)', text: '#059669' }
  if (g === 'B') return { bg: 'rgba(96,165,250,0.12)', text: '#1D4ED8' }
  if (g === 'C') return { bg: 'rgba(245,158,11,0.12)', text: '#B45309' }
  return { bg: 'rgba(166,0,3,0.10)', text: '#A60003' }
}

export default function ParentAcademics({ selectedChild, setSelectedChild }) {
  const child = children.find(c => c.id === selectedChild) || children[0]
  const grades = childGrades[child.id] || []
  const isUniversity = child.type === 'university'

  const avgScore = grades.length
    ? Math.round(grades.reduce((s, g) => s + (g.assignment * 0.3 + g.test * 0.3 + g.exam * 0.4), 0) / grades.length)
    : 0

  return (
    <div className="space-y-5">
      {/* Child tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {children.map(c => (
          <button key={c.id} onClick={() => setSelectedChild(c.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 transition-all"
            style={{
              background: selectedChild === c.id ? '#002333' : '#fff',
              border: `1.5px solid ${selectedChild === c.id ? ACCENT : '#EEF0F3'}`,
            }}>
            <img
              src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
              alt={c.name} className="rounded-full" style={{ width: 22, height: 22 }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <span className="text-xs font-bold whitespace-nowrap"
              style={{ color: selectedChild === c.id ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
              {c.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Child info band */}
      <div className="rounded-xl px-5 py-3 flex items-center justify-between"
        style={{ background: '#002333' }}>
        <div className="flex items-center gap-3">
          <img src={`https://randomuser.me/api/portraits/${child.gender}/${child.photoId}.jpg`}
            alt={child.name} className="rounded-full" style={{ width: 36, height: 36, border: `2px solid ${ACCENT}` }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div>
            <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{child.name}</p>
            <p className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif' }}>
              {isUniversity ? `${child.school} · ${child.program}` : `${child.school} · ${child.grade}`}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-black" style={{ color: ACCENT, fontFamily: 'Sora, sans-serif' }}>{avgScore}%</p>
          <p className="text-[10px] font-semibold text-white/50" style={{ fontFamily: 'Roboto, sans-serif' }}>Average Score</p>
        </div>
      </div>

      {/* Read-only grade table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-5 py-3.5" style={{ background: '#F4F6F8', borderBottom: '1px solid #EEF0F3' }}>
          <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            {isUniversity ? 'Course Grades' : 'Subject Grades'} — Read Only
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
                <Th>{isUniversity ? 'Course' : 'Subject'}</Th>
                <Th>{isUniversity ? 'Lecturer' : 'Teacher'}</Th>
                <Th>{isUniversity ? 'Coursework' : 'Assignment'}</Th>
                {!isUniversity && <Th>Test</Th>}
                <Th>Exam</Th>
                <Th>Final Grade</Th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => {
                const gc = gradeColor(g.grade)
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F4F6F8' }}>
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{g.subject}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{g.teacher}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold text-[#002333]">{g.assignment}</span>
                    </td>
                    {!isUniversity && (
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-bold text-[#002333]">{g.test}</span>
                      </td>
                    )}
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-bold text-[#002333]">{g.exam}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg" style={{ background: gc.bg, color: gc.text }}>
                        {g.grade}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {grades.length === 0 && (
                <tr>
                  <td colSpan={isUniversity ? 5 : 6} className="px-5 py-10 text-center text-xs text-[#9CA3AF]">
                    No grade records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[#9CA3AF] text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Grades are recorded by {child.name.split(' ')[0]}'s teachers. Contact the school for any discrepancies.
      </p>
    </div>
  )
}

function Th({ children: c }) {
  return (
    <th className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]"
      style={{ fontFamily: 'Roboto, sans-serif' }}>
      {c}
    </th>
  )
}
