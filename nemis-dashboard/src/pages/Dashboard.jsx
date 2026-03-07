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
} from 'lucide-react'
import WelcomeBanner from '../components/WelcomeBanner'
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
      style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
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

  return (
    <div className="space-y-5 max-w-[1180px]">
      {/* Welcome Banner */}
      <WelcomeBanner />

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
              <tr style={{ background: '#BFD9F2' }}>
                {['Teacher', 'School', 'District', 'Last Report Date', 'Reports', 'Status'].map((h) => (
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
              {teacherOversightData.map((teacher, idx) => {
                const teacherPhotos = { 1: 'men/31', 2: 'men/23', 3: 'women/47' }
                const photoPath = teacherPhotos[teacher.id]
                const compliancePct = Math.round(
                  (teacher.reportsSubmitted / teacher.reportsTotal) * 100
                )
                return (
                  <tr
                    key={teacher.id}
                    className="transition-colors"
                    style={{ borderTop: '1px solid #F4F6F8', background: idx % 2 === 0 ? '#fff' : '#F8FAFC' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF4FB' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#fff' : '#F8FAFC' }}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={`https://randomuser.me/api/portraits/${photoPath}.jpg`}
                          alt={teacher.name}
                          className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                          style={{ border: '2px solid #EEF0F3' }}
                        />
                        <span
                          className="text-sm font-semibold text-[#002333]"
                          style={{ fontFamily: 'Sora, sans-serif' }}
                        >
                          {teacher.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {teacher.school}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {teacher.district}
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
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
