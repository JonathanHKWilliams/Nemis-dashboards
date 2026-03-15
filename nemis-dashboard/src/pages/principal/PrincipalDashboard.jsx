import { GraduationCap, Users, CalendarCheck, DollarSign, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useState } from 'react'
import {
  principalProfile, schoolInfo, schoolKPIs,
  recentActivities, upcomingEvents,
  attendanceTrendData, performanceTrendData, classAttendanceData,
} from '../../data/principalData'

const today = new Date()
const greetingHour = today.getHours()
const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'

const ACCENT = '#0367A0'

function KPICard({ icon: Icon, label, value, sub, color, onClick }) {
  return (
    <button onClick={onClick}
      className="rounded-2xl p-5 flex items-start gap-4 text-left w-full transition-all hover:shadow-md"
      style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}18` }}>
        <Icon size={20} style={{ color }} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
        <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</p>
        {sub && <p className="text-[11px] font-semibold mt-1 truncate" style={{ color, fontFamily: 'Lato, sans-serif' }}>{sub}</p>}
      </div>
    </button>
  )
}

function SectionCard({ title, subtitle, action, children }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
        <div>
          <h3 className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
          {subtitle && <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}

const activityStatusCfg = {
  Completed: { bg: '#0367A014', color: '#0367A0' },
  Approved:  { bg: '#16A34A14', color: '#16A34A' },
  Pending:   { bg: '#D9770614', color: '#D97706' },
}

const eventTypeCfg = {
  Academic:   { bg: 'rgba(3,103,160,0.08)',   color: '#0367A0' },
  Community:  { bg: 'rgba(124,58,237,0.08)',  color: '#7C3AED' },
  Activity:   { bg: 'rgba(22,163,74,0.08)',   color: '#16A34A' },
  Compliance: { bg: 'rgba(166,0,3,0.08)',     color: '#A60003' },
  National:   { bg: 'rgba(0,35,51,0.08)',     color: '#002333' },
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAY_LABELS  = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

function parseEventDays(events, year, month) {
  const monthName = MONTH_SHORT[month]
  const days = new Set()
  events.forEach(ev => {
    if (!ev.date.includes(monthName)) return
    const nums = ev.date.match(/\d+/g)
    if (!nums) return
    const start = parseInt(nums[0])
    const end   = nums[1] && parseInt(nums[1]) < 31 ? parseInt(nums[1]) : start
    for (let d = start; d <= Math.min(end, 31); d++) days.add(d)
  })
  return days
}

function CalendarWidget({ events }) {
  const [viewDate, setViewDate] = useState(() => new Date())
  const now      = new Date()
  const year     = viewDate.getFullYear()
  const month    = viewDate.getMonth()
  const todayDay = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : -1

  const firstDay     = new Date(year, month, 1).getDay()
  const daysInMonth  = new Date(year, month + 1, 0).getDate()
  const eventDays    = parseEventDays(events, year, month)

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const prev = () => setViewDate(new Date(year, month - 1, 1))
  const next = () => setViewDate(new Date(year, month + 1, 1))

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={prev}
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: '#F4F6F8', color: '#374151' }}
          onMouseEnter={e => e.currentTarget.style.background = '#EEF0F3'}
          onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
          <ChevronLeft size={13} strokeWidth={2.5} />
        </button>
        <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {MONTH_NAMES[month]} {year}
        </p>
        <button onClick={next}
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: '#F4F6F8', color: '#374151' }}
          onMouseEnter={e => e.currentTarget.style.background = '#EEF0F3'}
          onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
          <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map(d => (
          <div key={d} className="text-center text-[9px] font-black uppercase text-[#9CA3AF] py-1"
            style={{ fontFamily: 'Lato, sans-serif' }}>{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} />
          const isToday   = d === todayDay
          const hasEvent  = eventDays.has(d)
          return (
            <div key={d} className="flex flex-col items-center py-1.5 rounded-lg"
              style={{ background: isToday ? ACCENT : 'transparent' }}>
              <span className="text-[11px] font-black leading-none"
                style={{ color: isToday ? '#fff' : '#002333', fontFamily: 'Lato, sans-serif' }}>
                {d}
              </span>
              {hasEvent && (
                <div className="w-1.5 h-1.5 rounded-full mt-0.5"
                  style={{ background: isToday ? 'rgba(255,255,255,0.70)' : ACCENT }} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PrincipalDashboard({ setActivePage }) {
  return (
    <div className="space-y-6 max-w-[1180px]">

      {/* ── Welcome Banner ── */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: '#002333', minHeight: 148 }}>
        <div className="relative px-8 py-7 flex items-center gap-6">
          <img
            src={`https://randomuser.me/api/portraits/${principalProfile.gender}/${principalProfile.photoId}.jpg`}
            alt={principalProfile.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 76, height: 76, border: `3px solid rgba(3,103,160,0.55)` }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Lato, sans-serif' }}>
              {greeting},
            </p>
            <h2 className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
              {principalProfile.name}
            </h2>
            <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Lato, sans-serif' }}>
              {principalProfile.title} · {schoolInfo.name}
            </p>
            <p className="text-xs font-bold mt-1.5" style={{ color: 'rgba(3,103,160,0.90)', fontFamily: 'Lato, sans-serif' }}>
              {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-stretch gap-0 flex-shrink-0">
            {[
              { label: 'Students',   value: schoolKPIs.totalStudents.toLocaleString() },
              { label: 'Teachers',   value: schoolKPIs.totalTeachers },
              { label: 'Attendance', value: `${schoolKPIs.attendanceRate}%` },
              { label: 'Classes',    value: schoolKPIs.activeClasses },
            ].map((s, i) => (
              <div key={s.label} className="flex flex-col items-center justify-center px-6 py-4"
                style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.10)' : 'none', minWidth: 88 }}>
                <p className="text-2xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                <p className="text-[10px] font-bold mt-1 text-center" style={{ color: 'rgba(255,255,255,0.40)', fontFamily: 'Lato, sans-serif' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── School Identity Card ── */}
      <div className="rounded-2xl p-5 flex items-center gap-5"
        style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: ACCENT }}>
          <span className="text-xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>SM</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {schoolInfo.name}
            </h3>
            <span className="px-2.5 py-1 rounded-full text-xs font-black text-white" style={{ background: '#0367A0' }}>
              Active
            </span>
          </div>
          <p className="text-xs font-semibold text-[#6B7280] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
            {schoolInfo.code} · {schoolInfo.district} · {schoolInfo.county}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="px-3 py-1.5 rounded-full text-xs font-black text-white" style={{ background: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
            {schoolInfo.type}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-black" style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0', fontFamily: 'Lato, sans-serif' }}>
            {schoolInfo.accreditation}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-black" style={{ background: '#F8FAFC', color: '#6B7280', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif' }}>
            Est. {schoolInfo.established}
          </span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard icon={GraduationCap} label="Total Students"    value={schoolKPIs.totalStudents.toLocaleString()} sub="Enrolled"           color={ACCENT}    onClick={() => setActivePage('students')} />
        <KPICard icon={Users}         label="Active Teachers"   value={schoolKPIs.totalTeachers}  sub="On payroll"          color="#7C3AED"   onClick={() => setActivePage('teachers')} />
        <KPICard icon={CalendarCheck} label="Present Today"     value={schoolKPIs.presentToday}   sub={`of ${schoolKPIs.totalStudents} students`} color="#16A34A"  onClick={() => setActivePage('attendance')} />
        <KPICard icon={Users}         label="Teachers Present"  value={`${schoolKPIs.teachersPresentToday}/${schoolKPIs.totalTeachers}`} sub="Today" color="#D97706" onClick={() => setActivePage('teachers')} />
        <KPICard icon={TrendingUp}    label="Attendance Rate"   value={`${schoolKPIs.attendanceRate}%`} sub="This term"       color={ACCENT}    onClick={() => setActivePage('attendance')} />
        <KPICard icon={DollarSign}    label="Outstanding Fees"  value={`$${(schoolKPIs.outstandingTuition / 1000).toFixed(1)}K`} sub="Unpaid balance" color="#A60003" onClick={() => setActivePage('finance')} />
      </div>

      <div style={{ height: 3, background: '#EEF0F3', borderRadius: 2 }} />

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {/* Performance Trend */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Student Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={performanceTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="term" tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Lato' }} />
              <Line type="monotone" dataKey="avg" stroke={ACCENT} strokeWidth={2.5} dot={{ r: 4, fill: ACCENT }} name="Avg %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Class Attendance */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Attendance by Grade Level
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={classAttendanceData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="class" tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Lato' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Lato' }} />
              <Bar dataKey="pct" fill={ACCENT} radius={[6, 6, 0, 0]} name="Attendance %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ height: 3, background: '#EEF0F3', borderRadius: 2 }} />

      {/* ── Activity + Events ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Recent Activities */}
        <div className="xl:col-span-2">
          <SectionCard title="Recent School Activity" subtitle="Latest actions across staff, students & admin"
            action={
              <span className="text-[11px] font-bold px-3 py-1 rounded-full"
                style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                {recentActivities.length} records
              </span>
            }>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F4F6F8' }}>
                  {['Date', 'Action', 'By', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#374151]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((a, i) => {
                  const sc = activityStatusCfg[a.status] || { bg: '#F4F6F8', color: '#6B7280' }
                  return (
                    <tr key={a.id} style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                      onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                      <td className="px-5 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{a.date}</td>
                      <td className="px-5 py-3 text-xs font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{a.action}</td>
                      <td className="px-5 py-3">
                        <div>
                          <p className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{a.actor}</p>
                          <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{a.role}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                          style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </SectionCard>
        </div>

        {/* Calendar + Upcoming Events */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
            <CalendarWidget events={upcomingEvents} />
          </div>
          <SectionCard title="Upcoming Events" subtitle="School calendar highlights">
            <div className="divide-y divide-[#F4F6F8]">
              {upcomingEvents.map(ev => {
                const cfg = eventTypeCfg[ev.type] || { bg: '#F4F6F8', color: '#6B7280' }
                return (
                  <div key={ev.id} className="px-5 py-3.5 flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: cfg.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-[#002333] leading-tight" style={{ fontFamily: 'Lato, sans-serif' }}>{ev.event}</p>
                      <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{ev.date}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: cfg.bg, color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
                      {ev.type}
                    </span>
                  </div>
                )
              })}
            </div>
          </SectionCard>
        </div>
      </div>

    </div>
  )
}
