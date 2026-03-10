import { useState } from 'react'
import {
  UserCheck,
  CheckCircle,
  XCircle,
  Eye,
  GraduationCap,
  FileText,
  UserCog,
  Building2,
  Clock,
  BookOpen,
  PieChart,
} from 'lucide-react'
import WelcomeBanner from '../components/WelcomeBanner'
import KPICard from '../components/KPICard'
import EnrollmentTrendChart from '../components/charts/EnrollmentTrendChart'
import TopSchoolsChart from '../components/charts/TopSchoolsChart'
import { schoolApprovals, teacherOversightData, recentActivities } from '../data/mockData'


const statusStyles = {
  Pending: { bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  Approved: { bg: 'rgba(72,208,140,0.1)', color: '#16A34A' },
  Rejected: { bg: 'rgba(166,0,3,0.1)', color: '#A60003' },
  Submitted: { bg: 'rgba(72,208,140,0.1)', color: '#16A34A' },
  Overdue: { bg: 'rgba(166,0,3,0.1)', color: '#A60003' },
  Completed: { bg: 'rgba(0,35,51,0.08)', color: '#002333' },
}

function StatusBadge({ status }) {
  const s = statusStyles[status] || { bg: '#F4F6F8', color: '#666' }
  return (
    <span
      className="px-2.5 py-[3px] rounded-full text-xs font-medium"
      style={{ background: s.bg, color: s.color, fontFamily: 'Roboto, sans-serif' }}
    >
      {status}
    </span>
  )
}

function SectionCard({ title, subtitle, badge, children }) {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: '1px solid #EEF0F3' }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #E2E8F0', background: '#F4F6F8' }}>
        <div>
          <h3 className="text-[15px] font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs font-semibold text-[#374151] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {subtitle}
            </p>
          )}
        </div>
        {badge}
      </div>
      {children}
    </div>
  )
}

export default function Dashboard() {
  const [approvals, setApprovals] = useState(schoolApprovals)

  const handleApprove = (id) =>
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a)))
  const handleReject = (id) =>
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Rejected' } : a)))

  const pendingCount = approvals.filter((a) => a.status === 'Pending').length

  const kpiCards = [
    { title: 'Pending Approvals',        value: '14',   sub: '+3 this week',       accentColor: 'red',    icon: Clock },
    { title: 'Oversight Compliance',     value: '92%',  sub: 'Teacher reports',    accentColor: 'green',  icon: UserCheck },
    { title: 'Enrollment Rate',          value: '87%',  sub: 'County-wide',        accentColor: 'blue',   icon: BookOpen },
    { title: 'Active Schools',           value: '289',  sub: 'Across 9 districts', accentColor: 'yellow', icon: PieChart },
  ]

  return (
    <div className="space-y-5 max-w-[1180px]">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiCards.map((card) => (
          <KPICard key={card.title} {...card} />
        ))}
      </div>

      <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2 }} />

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <EnrollmentTrendChart />
        <TopSchoolsChart />
      </div>

      <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2 }} />

      {/* ── School Approval Section ── */}
      <SectionCard
        title="School Approval Requests"
        subtitle="Pending registrations requiring CEO approval"
        badge={
          <span
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              background: pendingCount > 0 ? 'rgba(245,158,11,0.12)' : 'rgba(72,208,140,0.1)',
              color: pendingCount > 0 ? '#D97706' : '#16A34A',
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            {pendingCount} Pending
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['School Name', 'District', 'Date Submitted', 'Type', 'Status', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvals.map((school, idx) => (
                <tr
                  key={school.id}
                  className="transition-colors"
                  style={{ borderTop: '1px solid #F4F6F8', background: idx % 2 === 0 ? '#fff' : '#F8FAFC' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF4FB' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#F8FAFC' }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={`https://picsum.photos/seed/school${school.id}/32/32`}
                        alt={school.name}
                        className="w-8 h-8 rounded-lg flex-shrink-0"
                        style={{ border: '1px solid #E2E8F0' }}
                      />
                      <span
                        className="text-sm font-semibold text-[#002333]"
                        style={{ fontFamily: 'Sora, sans-serif' }}
                      >
                        {school.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {school.district}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {school.dateSubmitted}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-xs px-2.5 py-[3px] rounded-full"
                      style={{
                        background: 'rgba(0,35,51,0.06)',
                        color: '#002333',
                        fontFamily: 'Roboto, sans-serif',
                      }}
                    >
                      {school.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={school.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    {school.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(school.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          style={{
                            background: 'rgba(72,208,140,0.1)',
                            color: '#16A34A',
                            fontFamily: 'Roboto, sans-serif',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.2)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.1)' }}
                        >
                          <CheckCircle size={12} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(school.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                          style={{
                            background: 'rgba(166,0,3,0.08)',
                            color: '#A60003',
                            fontFamily: 'Roboto, sans-serif',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.15)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.08)' }}
                        >
                          <XCircle size={12} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 transition-colors"
                        style={{ background: '#F4F6F8', fontFamily: 'Roboto, sans-serif' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF0F3' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F6F8' }}
                      >
                        <Eye size={12} />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2 }} />

      {/* ── Teacher Oversight Panel ── */}
      <SectionCard
        title="Teacher Oversight Panel"
        subtitle="Monthly report submission status by teacher"
        badge={
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
              54,332 Assigned
            </span>
            <span
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{
                background: 'rgba(72,208,140,0.1)',
                color: '#16A34A',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              92% Compliant
            </span>
          </div>
        }
      >
        <div className="grid grid-cols-5 divide-x divide-[#F4F6F8]">
          {teacherOversightData.map((teacher) => {
            const teacherPhotos = { 1: 'men/31', 2: 'men/23', 3: 'women/47', 4: 'men/52', 5: 'women/22' }
            const photoPath = teacherPhotos[teacher.id]
            const compliancePct = Math.round((teacher.reportsSubmitted / teacher.reportsTotal) * 100)
            const statusColors = {
              Submitted: { color: '#0367A0', bg: 'rgba(3,103,160,0.10)' },
              Pending:   { color: '#D97706', bg: 'rgba(245,158,11,0.10)' },
              Overdue:   { color: '#A60003', bg: 'rgba(166,0,3,0.10)' },
            }
            const sc = statusColors[teacher.status] || { color: '#6B7280', bg: '#F4F6F8' }
            const barColor = compliancePct >= 80 ? '#0367A0' : compliancePct >= 60 ? '#002333' : '#A60003'
            return (
              <div key={teacher.id} className="flex flex-col items-center px-4 py-5 text-center gap-3
                transition-colors cursor-pointer"
                onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                {/* Photo */}
                <div className="relative">
                  <img
                    src={`https://randomuser.me/api/portraits/${photoPath}.jpg`}
                    alt={teacher.name}
                    className="w-14 h-14 rounded-2xl object-cover"
                    style={{ border: '2px solid #EEF0F3' }}
                  />
                  <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ background: teacher.status === 'Submitted' ? '#48D08C' : teacher.status === 'Overdue' ? '#A60003' : '#F59E0B' }} />
                </div>
                {/* Name */}
                <div>
                  <p className="text-[13px] font-bold text-[#002333] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {teacher.name}
                  </p>
                  <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5 leading-tight" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {teacher.school.replace('Grand Bassa ', '').replace(' High School', ' HS').replace(' Secondary School', ' SS')}
                  </p>
                </div>
                {/* Compliance bar */}
                <div className="w-full">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Reports</span>
                    <span className="text-[11px] font-black" style={{ color: barColor, fontFamily: 'Sora, sans-serif' }}>{compliancePct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full w-full" style={{ background: '#EEF0F3' }}>
                    <div className="h-full rounded-full" style={{ width: `${compliancePct}%`, background: barColor }} />
                  </div>
                  <p className="text-[10px] text-[#C4CAD4] mt-1 font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {teacher.reportsSubmitted}/{teacher.reportsTotal} submitted
                  </p>
                </div>
                {/* Status + date */}
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                  style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                  {teacher.status}
                </span>
                <p className="text-[10px] text-[#9CA3AF] font-semibold -mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                  {teacher.lastReport}
                </p>
              </div>
            )
          })}
        </div>
      </SectionCard>

      <div style={{ height: 3, background: '#E2E8F0', borderRadius: 2 }} />

      {/* ── Recent Activities ── */}
      <SectionCard title="Recent Activities" subtitle="System-wide activity log">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['Date', 'Action', 'Actor', 'School / District', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity, idx) => {
                const activityIcons = {
                  'Updated Teacher Attendance': UserCheck,
                  'Student Enrollment Edit': GraduationCap,
                  'School Registration Submitted': Building2,
                  'Q1 Budget Report Filed': FileText,
                  'Teacher Oversight Review': Eye,
                  'System User Created': UserCog,
                }
                const ActivityIcon = activityIcons[activity.action] || FileText
                return (
                <tr
                  key={activity.id}
                  className="transition-colors"
                  style={{ borderTop: '1px solid #F4F6F8', background: idx % 2 === 0 ? '#fff' : '#F8FAFC' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF4FB' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#F8FAFC' }}
                >
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {activity.date}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <ActivityIcon size={15} strokeWidth={3} className="text-[#0F172A] flex-shrink-0" />
                      <span
                        className="text-sm font-bold text-[#0F172A]"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        {activity.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {activity.actor}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {activity.location}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={activity.status} />
                  </td>
                </tr>
              )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
