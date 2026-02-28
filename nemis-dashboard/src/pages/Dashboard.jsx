import { useState } from 'react'
import {
  Clock,
  UserCheck,
  BookOpen,
  PieChart,
  CheckCircle,
  XCircle,
  Eye,
} from 'lucide-react'
import KPICard from '../components/KPICard'
import WelcomeBanner from '../components/WelcomeBanner'
import EnrollmentTrendChart from '../components/charts/EnrollmentTrendChart'
import TopSchoolsChart from '../components/charts/TopSchoolsChart'
import { schoolApprovals, teacherOversightData, recentActivities } from '../data/mockData'

const kpiCards = [
  {
    title: 'Pending School Approvals',
    value: '14',
    change: '+3',
    trend: 'up',
    accentColor: 'red',
    icon: Clock,
  },
  {
    title: 'Teacher Oversight Compliance',
    value: '92%',
    change: '+2%',
    trend: 'up',
    accentColor: 'green',
    icon: UserCheck,
  },
  {
    title: 'Student Enrollment Rate',
    value: '87%',
    change: '+1.5%',
    trend: 'up',
    accentColor: 'blue',
    icon: BookOpen,
  },
  {
    title: 'Budget Utilization',
    value: '73%',
    change: '-2%',
    trend: 'down',
    accentColor: 'yellow',
    icon: PieChart,
  },
]

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
      style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
    >
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
        <div>
          <h3 className="text-[15px] font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
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

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <EnrollmentTrendChart />
        <TopSchoolsChart />
      </div>

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
              <tr style={{ background: '#FAFBFC' }}>
                {['School Name', 'District', 'Date Submitted', 'Type', 'Status', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {approvals.map((school) => (
                <tr
                  key={school.id}
                  className="transition-colors"
                  style={{ borderTop: '1px solid #F4F6F8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                >
                  <td className="px-5 py-3.5">
                    <span
                      className="text-sm font-semibold text-[#002333]"
                      style={{ fontFamily: 'Sora, sans-serif' }}
                    >
                      {school.name}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {school.district}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['Teacher', 'School', 'District', 'Last Report Date', 'Reports', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teacherOversightData.map((teacher) => {
                const initials = teacher.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                const compliancePct = Math.round(
                  (teacher.reportsSubmitted / teacher.reportsTotal) * 100
                )
                return (
                  <tr
                    key={teacher.id}
                    className="transition-colors"
                    style={{ borderTop: '1px solid #F4F6F8' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(0,35,51,0.07)' }}
                        >
                          <span
                            className="text-[11px] font-bold text-[#002333]"
                            style={{ fontFamily: 'Sora, sans-serif' }}
                          >
                            {initials}
                          </span>
                        </div>
                        <span
                          className="text-sm font-semibold text-[#002333]"
                          style={{ fontFamily: 'Sora, sans-serif' }}
                        >
                          {teacher.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {teacher.school}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {teacher.district}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {teacher.lastReport}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div
                          className="flex-1 h-1.5 rounded-full max-w-[60px]"
                          style={{ background: '#EEF0F3' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${compliancePct}%`,
                              background: compliancePct >= 80 ? '#48D08C' : compliancePct >= 60 ? '#F59E0B' : '#A60003',
                            }}
                          />
                        </div>
                        <span
                          className="text-xs text-gray-400"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {teacher.reportsSubmitted}/{teacher.reportsTotal}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={teacher.status} />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* ── Recent Activities ── */}
      <SectionCard title="Recent Activities" subtitle="System-wide activity log">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['Date', 'Action', 'Actor', 'School / District', 'Status'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-400"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr
                  key={activity.id}
                  className="transition-colors"
                  style={{ borderTop: '1px solid #F4F6F8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                >
                  <td className="px-5 py-3.5 text-sm text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {activity.date}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="text-sm font-medium text-[#002333]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {activity.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {activity.actor}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-500" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {activity.location}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={activity.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  )
}
