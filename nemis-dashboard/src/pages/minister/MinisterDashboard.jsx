import { School, Users, GraduationCap, Map, CalendarCheck, TrendingUp, AlertTriangle, AlertCircle, Activity } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { ministerProfile, nationalKPIs, counties, enrollmentTrend5Y, attendanceTrend12M } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const today = new Date()
const hour  = today.getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

function KPICard({ icon: Icon, label, value, sub, color, onClick }) {
  return (
    <button onClick={onClick}
      className="rounded-2xl p-5 text-left w-full transition-all hover:shadow-md"
      style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.05)' }}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${color}12` }}>
          <Icon size={19} style={{ color }} strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
          <p className="text-[11px] font-bold text-[#64748B] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</p>
          {sub && <p className="text-[10px] font-semibold mt-1" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{sub}</p>}
        </div>
      </div>
    </button>
  )
}

function AlertRow({ icon: Icon, color, bg, text, sub }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl" style={{ background: bg }}>
      <Icon size={15} style={{ color }} strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{text}</p>
        {sub && <p className="text-[10px] font-semibold text-[#64748B] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub}</p>}
      </div>
    </div>
  )
}

export default function MinisterDashboard({ setActivePage }) {
  return (
    <div className="space-y-7 max-w-[1100px]">

      {/* Welcome Banner */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: 'linear-gradient(130deg, #0F172A 0%, #1E1B4B 100%)', minHeight: 130 }}>
        <div className="absolute right-0 top-0 w-80 h-full opacity-10"
          style={{ background: 'radial-gradient(circle at 85% 50%, #4F46E5 0%, transparent 70%)' }} />
        <div className="relative px-8 py-6 flex items-center gap-6">
          <img
            src={`https://randomuser.me/api/portraits/${ministerProfile.gender}/${ministerProfile.photoId}.jpg`}
            alt={ministerProfile.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 68, height: 68, border: '3px solid rgba(79,70,229,0.55)' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>{greeting},</p>
            <h2 className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{ministerProfile.name}</h2>
            <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>
              {ministerProfile.title} · {ministerProfile.ministry}
            </p>
            <p className="text-xs font-bold mt-1.5" style={{ color: 'rgba(165,180,252,0.85)', fontFamily: 'Roboto, sans-serif' }}>
              {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-stretch gap-0 flex-shrink-0">
            {[
              { label: 'Counties',   value: nationalKPIs.counties },
              { label: 'Schools',    value: nationalKPIs.schools.toLocaleString() },
              { label: 'Students',   value: (nationalKPIs.students / 1000000).toFixed(2) + 'M' },
              { label: 'Alerts',     value: nationalKPIs.criticalCounties },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center justify-center px-6 py-4"
                style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none', minWidth: 90 }}>
                <p className="text-2xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                <p className="text-[10px] font-bold mt-0.5 text-center" style={{ color: 'rgba(255,255,255,0.40)', fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard icon={Map}          label="Counties"          value={nationalKPIs.counties}                         color={ACCENT}  onClick={() => setActivePage('counties')}  sub={`${nationalKPIs.criticalCounties} critical`} />
        <KPICard icon={School}       label="Total Schools"     value={nationalKPIs.schools.toLocaleString()}         color="#059669" onClick={() => setActivePage('schools')}   sub="National registry" />
        <KPICard icon={GraduationCap} label="Total Students"  value={(nationalKPIs.students / 1000000).toFixed(3) + 'M'} color="#2563EB" onClick={() => setActivePage('students')} sub="Enrolled nationally" />
        <KPICard icon={Users}        label="Total Teachers"    value={nationalKPIs.teachers.toLocaleString()}        color="#7C3AED" onClick={() => setActivePage('teachers')}  sub="Across all counties" />
        <KPICard icon={CalendarCheck} label="Avg Attendance"  value={`${nationalKPIs.avgAttendance}%`}              color="#0D9488" onClick={() => setActivePage('analytics')} sub="National average" />
        <KPICard icon={TrendingUp}   label="Avg Pass Rate"     value={`${nationalKPIs.avgPerformance}%`}            color="#D97706" onClick={() => setActivePage('analytics')} sub="All schools" />
        <KPICard icon={Activity}     label="Report Compliance" value={`${nationalKPIs.avgCompliance}%`}             color="#059669" onClick={() => setActivePage('reports')}   sub="Counties submitting" />
        <KPICard icon={AlertTriangle} label="Infra Alerts"     value={nationalKPIs.totalInfraAlerts}                color="#DC2626" onClick={() => setActivePage('emergency')} sub="Across all counties" />
      </div>

      {/* Charts + Alerts */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Enrollment Trend (5 Years)</p>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={enrollmentTrend5Y} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Roboto', fontSize: 11 }} />
              <Line type="monotone" dataKey="enrolled" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 4, fill: ACCENT }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Attendance Rate (12 Months)</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={attendanceTrend12M} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 8, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 90]} tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Roboto', fontSize: 11 }} />
              <Bar dataKey="rate" fill="#0D9488" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-1 rounded-2xl p-5 flex flex-col gap-3" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>National Alerts</p>
          <AlertRow icon={AlertCircle}   color="#DC2626" bg="#FEF2F2" text={`${nationalKPIs.criticalCounties} Critical Counties`} sub="Below 70% attendance" />
          <AlertRow icon={AlertTriangle} color="#D97706" bg="#FFFBEB" text="32 Missing Reports"         sub="Overdue this month" />
          <AlertRow icon={AlertTriangle} color="#D97706" bg="#FFFBEB" text="112 Teachers Pending"       sub="Verification queue" />
          <AlertRow icon={AlertCircle}   color="#DC2626" bg="#FEF2F2" text="2 Infra Emergencies"        sub="Schools at risk" />
          <button onClick={() => setActivePage('emergency')}
            className="mt-auto text-[11px] font-black py-2 rounded-xl"
            style={{ color: ACCENT, background: `${ACCENT}10` }}>
            View Emergency Center →
          </button>
        </div>
      </div>

      {/* County Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>County Overview</p>
          <button onClick={() => setActivePage('counties')} className="text-xs font-black" style={{ color: ACCENT }}>View All →</button>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['County', 'CEO', 'Schools', 'Students', 'Attendance', 'Performance', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {counties.slice(0, 8).map((c, i) => {
              const cfg = { Healthy: { color: '#059669', bg: 'rgba(5,150,105,0.10)' }, 'Needs Attention': { color: '#D97706', bg: 'rgba(217,119,6,0.10)' }, Critical: { color: '#DC2626', bg: 'rgba(220,38,38,0.10)' } }[c.status]
              return (
                <tr key={c.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-3 text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.name}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.ceo.split(' ').slice(-2).join(' ')}</td>
                  <td className="px-4 py-3 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.schools}</td>
                  <td className="px-4 py-3 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.students.toLocaleString()}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: c.attendance >= 80 ? '#059669' : c.attendance >= 70 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{c.attendance}%</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ color: c.performance >= 70 ? '#059669' : c.performance >= 60 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{c.performance}%</td>
                  <td className="px-4 py-3"><span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{c.status}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
