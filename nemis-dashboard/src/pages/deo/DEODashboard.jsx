import { School, Users, GraduationCap, UserCog, CalendarCheck, DollarSign, TrendingUp, AlertTriangle, AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { deoProfile, districtKPIs, deoSchools, deoIssues, deoReports, enrollmentTrend, attendanceTrend, schoolPerformance } from '../../data/deoData'

const ACCENT = '#0D9488'

const today = new Date()
const greetingHour = today.getHours()
const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'

function KPICard({ icon: Icon, label, value, sub, color, onClick }) {
  return (
    <button onClick={onClick}
      className="rounded-2xl p-5 flex items-start gap-4 text-left w-full transition-all hover:shadow-md"
      style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18` }}>
        <Icon size={20} style={{ color }} strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
        <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</p>
        {sub && <p className="text-[11px] font-semibold mt-1" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{sub}</p>}
      </div>
    </button>
  )
}

function AlertBadge({ type }) {
  const cfg = {
    Critical: { bg: '#FEE2E2', color: '#A60003', icon: AlertCircle },
    High:     { bg: '#FEF3C7', color: '#D97706', icon: AlertTriangle },
    Medium:   { bg: '#E0F2FE', color: '#0284C7', icon: Clock },
  }[type] || { bg: '#F3F4F6', color: '#6B7280', icon: Clock }
  const Icon = cfg.icon
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon size={10} strokeWidth={3} />{type}
    </span>
  )
}

function StatusBadge({ status }) {
  const cfg = {
    Compliant:     { bg: 'rgba(22,163,74,0.1)',  color: '#16A34A' },
    'Needs Review':{ bg: 'rgba(217,119,6,0.1)',  color: '#D97706' },
    Flagged:       { bg: 'rgba(166,0,3,0.1)',    color: '#A60003' },
    Approved:      { bg: 'rgba(22,163,74,0.1)',  color: '#16A34A' },
    Pending:       { bg: 'rgba(217,119,6,0.1)',  color: '#D97706' },
    Missing:       { bg: 'rgba(166,0,3,0.1)',    color: '#A60003' },
  }[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
  )
}

export default function DEODashboard({ setActivePage }) {
  const criticalIssues = deoIssues.filter(i => i.severity === 'Critical')
  const pendingReports = deoReports.filter(r => r.status === 'Pending' || r.status === 'Missing')
  const flaggedSchools = deoSchools.filter(s => s.status === 'Flagged' || s.status === 'Needs Review')

  return (
    <div className="space-y-8 max-w-[1080px]">

      {/* ── Welcome Banner ── */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: 'linear-gradient(125deg, #002333 0%, #0a3a4a 100%)', minHeight: 140 }}>
        <div className="absolute right-0 top-0 w-80 h-full opacity-10"
          style={{ background: 'radial-gradient(circle at 80% 50%, #0D9488 0%, transparent 70%)' }} />
        <div className="relative px-8 py-7 flex items-center gap-6">
          <img
            src={`https://randomuser.me/api/portraits/${deoProfile.gender}/${deoProfile.photoId}.jpg`}
            alt={deoProfile.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 72, height: 72, border: '3px solid rgba(13,148,136,0.55)' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: 'Roboto, sans-serif' }}>{greeting},</p>
            <h2 className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{deoProfile.name}</h2>
            <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: 'Roboto, sans-serif' }}>
              {deoProfile.title} · {deoProfile.district}
            </p>
            <p className="text-xs font-bold mt-1.5" style={{ color: 'rgba(13,148,136,0.85)', fontFamily: 'Roboto, sans-serif' }}>
              {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-stretch gap-0 flex-shrink-0">
            {[
              { label: 'Schools',      value: districtKPIs.totalSchools },
              { label: 'Students',     value: districtKPIs.totalStudents.toLocaleString() },
              { label: 'Open Issues',  value: districtKPIs.openIssues },
              { label: 'Reports Due',  value: districtKPIs.pendingReports },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center justify-center px-6 py-4"
                style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', minWidth: 90 }}>
                <p className="text-2xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                <p className="text-[10px] font-bold mt-1 text-center" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard icon={School}       label="Total Schools"       value={districtKPIs.totalSchools}                    color={ACCENT}    onClick={() => setActivePage('schools')} sub={`${districtKPIs.compliantSchools} compliant`} />
        <KPICard icon={GraduationCap} label="Total Students"     value={districtKPIs.totalStudents.toLocaleString()}  color="#2563EB"   onClick={() => setActivePage('students')} sub="District enrollment" />
        <KPICard icon={Users}         label="Total Teachers"     value={districtKPIs.totalTeachers}                   color="#7C3AED"   onClick={() => setActivePage('teachers')} sub="Across all schools" />
        <KPICard icon={UserCog}       label="Active Admins"      value={districtKPIs.activeAdmins}                    color="#D97706"   onClick={() => setActivePage('admins')} sub={`${deoProfile.district}`} />
        <KPICard icon={CalendarCheck} label="Avg Attendance"     value={`${districtKPIs.avgAttendance}%`}             color="#16A34A"   onClick={() => setActivePage('students')} sub="District average" />
        <KPICard icon={TrendingUp}    label="Performance Index"  value={`${districtKPIs.performanceIndex}%`}          color={ACCENT}    onClick={() => setActivePage('students')} sub="District average" />
        <KPICard icon={DollarSign}    label="Fee Compliance"     value={`${Math.round(deoSchools.reduce((s, sc) => s + sc.feesCollected, 0) / deoSchools.length)}%`} color="#0284C7" onClick={() => setActivePage('finance')} sub="Average across schools" />
        <KPICard icon={AlertTriangle} label="Flagged Schools"    value={districtKPIs.flaggedSchools}                  color="#A60003"   onClick={() => setActivePage('schools')} sub="Require attention" />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Enrollment Trend */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={enrollmentTrend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontFamily: 'Roboto' }} />
              <Line type="monotone" dataKey="enrolled" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 4, fill: ACCENT }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* School Performance */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>School Performance (%)</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={schoolPerformance} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontFamily: 'Roboto' }} />
              <Bar dataKey="avg" fill={ACCENT} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── Alerts Panel + Schools Table ── */}
      <div className="grid grid-cols-5 gap-6">

        {/* Alerts Panel */}
        <div className="col-span-2 rounded-2xl p-6 flex flex-col gap-4"
          style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Alerts & Actions</h3>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(166,0,3,0.10)', color: '#A60003' }}>
              {criticalIssues.length + pendingReports.length + flaggedSchools.length} items
            </span>
          </div>

          {/* Critical Issues */}
          {criticalIssues.map(issue => (
            <div key={issue.id} className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(166,0,3,0.04)', border: '1px solid rgba(166,0,3,0.10)' }}>
              <AlertCircle size={16} color="#A60003" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs font-black text-[#002333] leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>{issue.title}</p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{issue.school}</p>
              </div>
              <AlertBadge type={issue.severity} />
            </div>
          ))}

          {/* Pending Reports */}
          {pendingReports.slice(0, 2).map(r => (
            <div key={r.id} className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(217,119,6,0.04)', border: '1px solid rgba(217,119,6,0.10)' }}>
              <Clock size={16} color="#D97706" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[#002333] leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {r.status === 'Missing' ? 'Missing Report' : 'Report Pending Review'}
                </p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.school}</p>
              </div>
              <StatusBadge status={r.status} />
            </div>
          ))}

          {/* Flagged Schools */}
          {flaggedSchools.slice(0, 2).map(s => (
            <div key={s.id} className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: 'rgba(217,119,6,0.04)', border: '1px solid rgba(217,119,6,0.10)' }}>
              <AlertTriangle size={16} color="#D97706" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[#002333] leading-tight" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Attendance: {s.attendance}% · Reports: {s.reportsSubmitted}/{s.reportsDue}</p>
              </div>
              <StatusBadge status={s.status} />
            </div>
          ))}

          <button onClick={() => setActivePage('infrastructure')}
            className="mt-auto text-xs font-black text-center py-2.5 rounded-xl transition-colors"
            style={{ color: ACCENT, background: 'rgba(13,148,136,0.07)' }}>
            View All Issues →
          </button>
        </div>

        {/* Schools Quick Table */}
        <div className="col-span-3 rounded-2xl overflow-hidden"
          style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid #EEF0F3' }}>
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Schools at a Glance</h3>
            <button onClick={() => setActivePage('schools')}
              className="text-xs font-black" style={{ color: ACCENT }}>View All →</button>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F9FAFB' }}>
                {['School', 'Students', 'Attend.', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                    style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {deoSchools.map((s, i) => (
                <tr key={s.id} style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                  <td className="px-4 py-3">
                    <p className="text-xs font-black text-[#002333] leading-snug" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</p>
                    <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.level}</p>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.students.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold" style={{ color: s.attendance >= 85 ? '#16A34A' : s.attendance >= 75 ? '#D97706' : '#A60003', fontFamily: 'Roboto, sans-serif' }}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
