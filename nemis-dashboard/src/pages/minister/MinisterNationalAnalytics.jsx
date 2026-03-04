import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { counties, enrollmentByLevel, genderData, subjectPerformance, attendanceTrend12M, performanceTrend, nationalKPIs } from '../../data/ministerData'

const ACCENT = '#4F46E5'
const COLORS = [ACCENT, '#0D9488', '#D97706', '#DC2626', '#7C3AED', '#059669', '#2563EB', '#C084FC']

const FILTERS = {
  year: ['2025/2026', '2024/2025', '2023/2024'],
  term: ['All Terms', 'Term 1', 'Term 2', 'Term 3'],
  level: ['All Levels', 'Primary', 'Secondary', 'Tertiary'],
  county: ['All Counties', ...counties.map(c => c.name)],
}

function FilterBar({ filters, setFilters }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {Object.entries(FILTERS).map(([key, options]) => (
        <select key={key}
          value={filters[key]}
          onChange={e => setFilters(f => ({ ...f, [key]: e.target.value }))}
          className="px-3 py-2 rounded-xl text-xs outline-none"
          style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#334155' }}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ))}
      <button className="px-4 py-2 rounded-xl text-xs font-black text-white ml-auto"
        style={{ background: ACCENT }}>Export PDF</button>
      <button className="px-4 py-2 rounded-xl text-xs font-black"
        style={{ background: '#fff', color: ACCENT, border: `1px solid ${ACCENT}` }}>Export Excel</button>
    </div>
  )
}

export default function MinisterNationalAnalytics() {
  const [filters, setFilters] = useState({ year: '2025/2026', term: 'All Terms', level: 'All Levels', county: 'All Counties' })

  const enrollmentByCounty = counties.map(c => ({ county: c.name.split(' ')[0], students: c.students }))

  return (
    <div className="space-y-7 max-w-[1100px]">
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Enrollment Section */}
      <div className="rounded-2xl p-1" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Enrollment Breakdown</p>
        </div>
        <div className="grid grid-cols-3 gap-6 p-5">
          {/* By County */}
          <div>
            <p className="text-xs font-black text-[#475569] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>By County</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={enrollmentByCounty} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" tick={{ fontSize: 9, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="county" tick={{ fontSize: 9, fill: '#64748B', fontFamily: 'Roboto' }} width={60} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Roboto', fontSize: 11 }} />
                <Bar dataKey="students" fill={ACCENT} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* By Level */}
          <div>
            <p className="text-xs font-black text-[#475569] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>By School Level</p>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={enrollmentByLevel} cx="50%" cy="50%" outerRadius={68} paddingAngle={3} dataKey="students">
                  {enrollmentByLevel.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => v.toLocaleString()} contentStyle={{ borderRadius: 8, border: 'none', fontFamily: 'Roboto', fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {enrollmentByLevel.map((l, i) => (
                <div key={l.level} className="flex items-center justify-between text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                    <span style={{ color: '#64748B', fontFamily: 'Roboto' }}>{l.level}</span>
                  </div>
                  <span className="font-black" style={{ color: '#334155' }}>{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* By Gender */}
          <div>
            <p className="text-xs font-black text-[#475569] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Gender Distribution</p>
            <div className="space-y-4 mt-4">
              {[
                { label: 'Male', value: genderData.male, color: '#2563EB' },
                { label: 'Female', value: genderData.female, color: ACCENT },
              ].map(g => (
                <div key={g.label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{g.label}</span>
                    <span className="text-xs font-black" style={{ color: g.color }}>{g.value.toLocaleString()}</span>
                  </div>
                  <div className="h-3 rounded-full" style={{ background: '#F1F5F9' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.round(g.value / nationalKPIs.students * 100)}%`, background: g.color }} />
                  </div>
                  <p className="text-[10px] font-semibold text-[#94A3B8] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {Math.round(g.value / nationalKPIs.students * 100)}% of enrollment
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>National Pass Rate Trend</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={performanceTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 80]} tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto', fontSize: 11 }} />
              <Line type="monotone" dataKey="passRate" stroke="#059669" strokeWidth={2.5} dot={{ r: 4, fill: '#059669' }} name="Pass Rate %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Subject-Level Performance (%)</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={subjectPerformance} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="subject" tick={{ fontSize: 8, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 90]} tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto', fontSize: 11 }} />
              <Bar dataKey="passRate" fill="#D97706" radius={[4, 4, 0, 0]} name="Pass Rate %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Teacher Distribution */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Teacher Distribution by County</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['County', 'Total Teachers', 'Students', 'Teacher : Student Ratio', 'Attendance %'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {counties.map((c, i) => {
              const ratio = Math.round(c.students / c.teachers)
              return (
                <tr key={c.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-3 text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.name}</td>
                  <td className="px-4 py-3 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.teachers.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.students.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: ratio <= 30 ? '#059669' : ratio <= 40 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>1 : {ratio}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: c.attendance >= 80 ? '#059669' : c.attendance >= 70 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{c.attendance}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
