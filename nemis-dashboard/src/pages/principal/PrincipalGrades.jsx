import { useState } from 'react'
import { Search } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { gradesData, performanceTrendData, subjectPerformanceData } from '../../data/principalData'

const ACCENT = '#0367A0'

const gradeCfg = (grade) => {
  if (grade === 'A' || grade === 'A+') return { bg: '#0367A014', color: '#0367A0' }
  if (grade === 'B' || grade === 'B+' || grade === 'B-') return { bg: '#16A34A14', color: '#16A34A' }
  if (grade === 'C' || grade === 'C+') return { bg: '#D9770614', color: '#D97706' }
  return { bg: '#A6000314', color: '#A60003' }
}

function Avatar({ name, gender, photoId, size = 36 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender}/${photoId % 100}.jpg`}
        alt={name}
        className="rounded-full object-cover w-full h-full"
        style={{ border: '2px solid #EEF0F3' }}
        onError={e => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div className="rounded-full w-full h-full items-center justify-center text-white font-black absolute inset-0"
        style={{ background: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: size * 0.3, display: 'none' }}>
        {initials}
      </div>
    </div>
  )
}

const GRADING_SCALE = [
  { grade: 'A', range: '80 – 100', color: '#0367A0' },
  { grade: 'B', range: '70 – 79',  color: '#16A34A' },
  { grade: 'C', range: '60 – 69',  color: '#D97706' },
  { grade: 'D', range: '50 – 59',  color: '#EA580C' },
  { grade: 'F', range: 'Below 50', color: '#A60003' },
]

export default function PrincipalGrades() {
  const [search, setSearch]       = useState('')
  const [subjectFilter, setSubject] = useState('All')
  const [semesterFilter, setSemester] = useState('1st Semester')

  const subjects = ['All', ...Array.from(new Set(gradesData.map(g => g.subject)))]

  const filtered = gradesData.filter(g => {
    const q = search.toLowerCase()
    return (
      (g.name.toLowerCase().includes(q) || g.studentId.toLowerCase().includes(q)) &&
      (subjectFilter === 'All' || g.subject === subjectFilter) &&
      g.term === semesterFilter
    )
  })

  const avgScore = filtered.length
    ? Math.round(filtered.reduce((s, g) => s + g.score, 0) / filtered.length)
    : 0

  return (
    <div className="flex gap-5 max-w-[1280px]">

      {/* ── Filter Sidebar ── */}
      <div className="w-52 flex-shrink-0 space-y-4 self-start sticky top-0">
        <div className="bg-white rounded-2xl p-4 space-y-4" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</p>

          {/* Search */}
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input type="text" placeholder="Search student…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>

          {/* Semester */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Semester</p>
            <div className="space-y-0.5">
              {['1st Semester', '2nd Semester'].map(s => (
                <button key={s} onClick={() => setSemester(s)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: semesterFilter === s ? `rgba(3,103,160,0.10)` : 'transparent',
                    color: semesterFilter === s ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: semesterFilter === s ? 800 : 600,
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Subject</p>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
              {subjects.map(s => (
                <button key={s} onClick={() => setSubject(s)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: subjectFilter === s ? `rgba(3,103,160,0.10)` : 'transparent',
                    color: subjectFilter === s ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: subjectFilter === s ? 800 : 600,
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Grading scale */}
          <div className="pt-2" style={{ borderTop: '1px solid #EEF0F3' }}>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Grading Scale</p>
            {GRADING_SCALE.map(g => (
              <div key={g.grade} className="flex items-center justify-between py-0.5">
                <span className="text-xs font-black" style={{ color: g.color, fontFamily: 'Sora, sans-serif' }}>{g.grade}</span>
                <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{g.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0 space-y-5">

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Student Performance Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={performanceTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="term" tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Lato' }} />
              <Line type="monotone" dataKey="avg" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 4, fill: ACCENT }} name="Class Avg %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Subject Performance Comparison</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={subjectPerformanceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="subject" tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Lato' }} />
              <Bar dataKey="avg" fill={ACCENT} radius={[5, 5, 0, 0]} name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Info row */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
          {filtered.length} records · {semesterFilter}
        </p>
        <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
          Class Avg: <span style={{ color: ACCENT }}>{avgScore}%</span>
        </p>
      </div>

      {/* Grades Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#BFD9F2' }}>
              {['Student', 'Class', 'Subject', 'Score', 'Grade', 'Semester'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((g, i) => {
              const gc = gradeCfg(g.grade)
              return (
                <tr key={i} style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={g.name} gender={g.gender} photoId={g.photoId} />
                      <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{g.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{g.class}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.06)', color: '#0F172A', fontFamily: 'Lato, sans-serif' }}>
                      {g.subject}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm font-black" style={{ color: gc.color, fontFamily: 'Sora, sans-serif' }}>{g.score}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm font-black px-2.5 py-1 rounded-full"
                      style={{ background: gc.bg, color: gc.color, fontFamily: 'Sora, sans-serif' }}>
                      {g.grade}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{g.term}</td>
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
