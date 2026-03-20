import { GraduationCap, Users, CalendarCheck, DollarSign, TrendingUp, ChevronLeft, ChevronRight, UserPlus, UserMinus, ArrowRightLeft, AlertTriangle, BookOpen } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useState } from 'react'
import {
  principalProfile, schoolInfo, schoolKPIs,
  upcomingEvents,
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
        style={{ background: '#F3F4F6' }}>
        <Icon size={20} style={{ color: '#002333' }} strokeWidth={3} />
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

function parseEventDays(events, _year, month) {
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
        style={{ background: '#000E21', minHeight: 148 }}>
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
          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className="px-4 py-1.5 rounded-full text-xs font-black"
              style={{ background: 'rgba(3,103,160,0.30)', color: '#fff', fontFamily: 'Lato, sans-serif', letterSpacing: '0.02em' }}>
              ● School in Session
            </span>
            <p className="text-xs font-bold text-right" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Lato, sans-serif' }}>
              Academic Year {today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1}–{String((today.getMonth() >= 8 ? today.getFullYear() : today.getFullYear() - 1) + 1).slice(-2)}
            </p>
          </div>
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
      {/* Performance Trend — full width, text left + graph right */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="flex items-stretch gap-0">

          {/* Left — text info */}
          <div className="flex flex-col justify-between p-7 flex-shrink-0" style={{ width: 270, borderRight: '1px solid #EEF0F3' }}>
            <div>
              <p className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>MOE Grade Performance</p>
              <h3 className="text-xl font-black text-[#002333] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
                Current Term Grade Distribution
              </h3>
              <p className="text-xs font-semibold mt-2 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                Student grade bands per Liberia Ministry of Education standard. Passing mark is 60%. Includes all classes, 2nd Semester 2025–26.
              </p>
            </div>

            {/* Key stats */}
            <div className="space-y-3 mt-6">
              {[
                { label: 'School Pass Rate',    value: '89%',  color: '#16A34A' },
                { label: 'Term Average Score',  value: '74%',  color: ACCENT    },
                { label: 'WAEC Candidates',     value: '47 students', color: '#7C3AED' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{s.label}</span>
                  <span className="text-sm font-black flex-shrink-0" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-semibold mt-5" style={{ color: '#C4C9D4', fontFamily: 'Lato, sans-serif' }}>
              Grading: MOE Liberia Standard · WAEC-aligned
            </p>
          </div>

          {/* Right — pie chart */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <p className="text-[11px] font-black uppercase tracking-wider mb-3 text-center" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
              % of Students per Grade Band
            </p>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'A — Distinction (90–100)',  value: 12 },
                    { name: 'B — Very Good  (80–89)',    value: 24 },
                    { name: 'C — Good       (70–79)',    value: 31 },
                    { name: 'D — Pass       (60–69)',    value: 22 },
                    { name: 'F — Fail       (Below 60)', value: 11 },
                  ]}
                  cx="50%" cy="50%"
                  innerRadius={52} outerRadius={82}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {['#16A34A', '#0367A0', '#D97706', '#7C3AED', '#A60003'].map((color, i) => (
                    <Cell key={i} fill={color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.10)', fontFamily: 'Lato', fontSize: 12 }}
                  formatter={v => [`${v}% of students`, '']}
                />
                <Legend
                  iconType="circle" iconSize={8}
                  wrapperStyle={{ fontSize: 10, fontFamily: 'Lato, sans-serif', color: '#6B7280' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ height: 3, background: '#EEF0F3', borderRadius: 2 }} />

      {/* ── Activity + Events ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* Enrollment & Student Movement */}
        <div className="xl:col-span-2">
          <SectionCard
            title="Enrollment & Student Movement"
            subtitle="Total enrollment, admissions, withdrawals, transfers & population shifts">

            {/* KPI strip */}
            <div className="grid grid-cols-5 gap-0" style={{ borderBottom: '1px solid #EEF0F3' }}>
              {[
                { icon: BookOpen,        label: 'Total Enrolled',  value: schoolKPIs.totalStudents, color: ACCENT        },
                { icon: UserPlus,        label: 'New Admissions',  value: 14,                       color: '#16A34A'      },
                { icon: UserMinus,       label: 'Withdrawals',     value: 3,                        color: '#A60003'      },
                { icon: ArrowRightLeft,  label: 'Transfers In/Out',value: '5 / 2',                  color: '#7C3AED'      },
                { icon: AlertTriangle,   label: 'Unusual Shifts',  value: 1,                        color: '#D97706'      },
              ].map((k, i) => {
                const Icon = k.icon
                return (
                  <div key={k.label} className="flex flex-col items-center justify-center py-5 gap-2"
                    style={{ borderLeft: i > 0 ? '1px solid #EEF0F3' : 'none' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ background: '#F3F4F6' }}>
                      <Icon size={16} style={{ color: '#002333' }} strokeWidth={3} />
                    </div>
                    <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{k.value}</p>
                    <p className="text-[10px] font-bold text-center" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{k.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Movement log */}
            <div className="divide-y divide-[#F4F6F8]">
              {[
                { icon: UserPlus,       color: '#16A34A', name: 'Emmanuel K. Togba',   action: 'New admission',           cls: 'Grade 7A',  date: 'Mar 18, 2026' },
                { icon: UserPlus,       color: '#16A34A', name: 'Satta M. Kollie',     action: 'New admission',           cls: 'Grade 3B',  date: 'Mar 17, 2026' },
                { icon: ArrowRightLeft, color: '#7C3AED', name: 'Moses D. Flomo',      action: 'Transfer in — Buchanan PS',cls: 'Grade 9',   date: 'Mar 15, 2026' },
                { icon: UserMinus,      color: '#A60003', name: 'Patricia A. Weah',    action: 'Withdrawal — family reloc.',cls: 'Grade 5A', date: 'Mar 14, 2026' },
                { icon: ArrowRightLeft, color: '#7C3AED', name: 'Isaac T. Bestman',    action: 'Transfer out — GSS Buchanan',cls:'Grade 11', date: 'Mar 12, 2026' },
                { icon: AlertTriangle,  color: '#D97706', name: 'Grade 8B',            action: 'Unusual drop — 6 absences in 3 days', cls: 'Grade 8B', date: 'Mar 11, 2026' },
              ].map((r, i) => {
                const Icon = r.icon
                return (
                  <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#F3F4F6' }}>
                      <Icon size={14} style={{ color: '#002333' }} strokeWidth={3} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.name}</p>
                      <p className="text-[11px] font-semibold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{r.action}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}>{r.cls}</span>
                      <p className="text-[10px] font-semibold mt-1" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{r.date}</p>
                    </div>
                  </div>
                )
              })}
            </div>
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
