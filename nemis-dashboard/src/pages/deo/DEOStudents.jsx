import { GraduationCap, Users, TrendingDown, TrendingUp, ArrowLeftRight } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'
import { deoSchools, enrollmentTrend, attendanceTrend, schoolPerformance, genderDistribution, dropoutAlerts, districtKPIs } from '../../data/deoData'

const ACCENT = '#0D9488'

const COLORS = [ACCENT, '#2563EB', '#D97706', '#7C3AED', '#A60003', '#16A34A', '#0284C7', '#C084FC']

const genderData = [
  { name: 'Male',   value: genderDistribution.male },
  { name: 'Female', value: genderDistribution.female },
]

export default function DEOStudents() {
  return (
    <div className="space-y-6 max-w-[1080px]">

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Enrollment', value: districtKPIs.totalStudents.toLocaleString(), color: ACCENT,    icon: GraduationCap },
          { label: 'Male Students',    value: genderDistribution.male.toLocaleString(),    color: '#2563EB', icon: Users },
          { label: 'Female Students',  value: genderDistribution.female.toLocaleString(),  color: '#7C3AED', icon: Users },
          { label: 'Avg Attendance',   value: `${districtKPIs.avgAttendance}%`,            color: '#16A34A', icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
              <s.icon size={20} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Enrollment Trend */}
        <div className="col-span-2 rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={enrollmentTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontFamily: 'Roboto' }} />
              <Line type="monotone" dataKey="enrolled" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 4, fill: ACCENT }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gender Pie */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Gender Split</h3>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={genderData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value">
                <Cell fill={ACCENT} />
                <Cell fill="#2563EB" />
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {genderData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: i === 0 ? ACCENT : '#2563EB' }} />
                <span className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{d.name}: {d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Attendance Trend */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Attendance Trend (%)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={attendanceTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 95]} tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto' }} />
              <Line type="monotone" dataKey="rate" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Per-School Performance */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Attendance by School (%)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={schoolPerformance} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 8, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto' }} />
              <Bar dataKey="attendance" fill="#2563EB" radius={[5, 5, 0, 0]} name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* School Enrollment Breakdown */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Enrollment by School</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
              {['School', 'Level', 'Total', 'Male', 'Female', 'Attendance', 'Performance'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {deoSchools.map((s, i) => (
              <tr key={s.id} style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                <td className="px-4 py-3 text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</td>
                <td className="px-4 py-3">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: s.level === 'Primary' ? 'rgba(37,99,235,0.10)' : 'rgba(124,58,237,0.10)', color: s.level === 'Primary' ? '#2563EB' : '#7C3AED' }}>
                    {s.level}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.students.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.gender.male}</td>
                <td className="px-4 py-3 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.gender.female}</td>
                <td className="px-4 py-3 text-xs font-bold"
                  style={{ color: s.attendance >= 85 ? '#16A34A' : s.attendance >= 75 ? '#D97706' : '#A60003', fontFamily: 'Roboto, sans-serif' }}>
                  {s.attendance}%
                </td>
                <td className="px-4 py-3 text-xs font-bold"
                  style={{ color: s.performanceAvg >= 70 ? '#16A34A' : s.performanceAvg >= 60 ? '#D97706' : '#A60003', fontFamily: 'Roboto, sans-serif' }}>
                  {s.performanceAvg}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dropout Alerts */}
      <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Dropout Alerts</h3>
        <div className="space-y-3">
          {dropoutAlerts.map((d, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'rgba(166,0,3,0.04)', border: '1px solid rgba(166,0,3,0.08)' }}>
              <TrendingDown size={18} color="#A60003" strokeWidth={2.5} className="flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{d.school}</p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Reason: {d.reason}</p>
              </div>
              <span className="text-sm font-black" style={{ color: '#A60003', fontFamily: 'Sora, sans-serif' }}>{d.count} dropouts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
