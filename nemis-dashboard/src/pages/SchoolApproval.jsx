import { useState } from 'react'
import { CheckCircle, XCircle, Eye, Search } from 'lucide-react'
import { schoolApprovals as initialApprovals } from '../data/mockData'

function SchoolLogo({ name, size = 32 }) {
  const colors = ['#002333','#A60003','#2563EB','#7C3AED','#D97706','#0891B2','#16A34A']
  const hex = colors[name.charCodeAt(0) % colors.length].replace('#', '')
  const initials = name.split(' ').filter(w => w.length > 2).map(w => w[0]).join('').slice(0, 3).toUpperCase() ||
    name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${hex}&color=ffffff&size=128&bold=true&font-size=0.45`
  return <img src={src} alt={name} className="rounded-lg object-cover flex-shrink-0" style={{ width: size, height: size }} />
}

const statusStyles = {
  Pending: { bg: 'rgba(245,158,11,0.1)', color: '#D97706' },
  Approved: { bg: 'rgba(72,208,140,0.1)', color: '#16A34A' },
  Rejected: { bg: 'rgba(166,0,3,0.1)', color: '#A60003' },
}

function StatusBadge({ status }) {
  const s = statusStyles[status] || {}
  return (
    <span
      className="px-2.5 py-[3px] rounded-full text-xs font-semibold"
      style={{ background: s.bg, color: s.color, fontFamily: 'Lato, sans-serif' }}
    >
      {status}
    </span>
  )
}

export default function SchoolApproval() {
  const [approvals, setApprovals] = useState(initialApprovals)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedSchool, setSelectedSchool] = useState(null)

  const handleApprove = (id) =>
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Approved' } : a)))
  const handleReject = (id) =>
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: 'Rejected' } : a)))

  const filtered = approvals.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.district.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || a.status === filter
    return matchSearch && matchFilter
  })

  const counts = {
    All: approvals.length,
    Pending: approvals.filter((a) => a.status === 'Pending').length,
    Approved: approvals.filter((a) => a.status === 'Approved').length,
    Rejected: approvals.filter((a) => a.status === 'Rejected').length,
  }

  return (
    <div className="space-y-5 max-w-[1180px]">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
          School Approval
        </h2>
        <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
          Review and approve Grand Bassa school registration applications
        </p>
      </div>

      {/* Stat Tabs */}
      <div className="flex gap-3">
        {Object.entries(counts).map(([label, count]) => {
          const isActive = filter === label
          const colors = {
            All: '#002333',
            Pending: '#D97706',
            Approved: '#16A34A',
            Rejected: '#A60003',
          }
          return (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                fontFamily: 'Lato, sans-serif',
                background: isActive ? colors[label] : '#fff',
                color: isActive ? '#fff' : '#6B7280',
                border: isActive ? 'none' : '1px solid #EEF0F3',
                boxShadow: isActive ? '0 2px 8px rgba(0,35,51,0.15)' : '0 1px 4px rgba(0,35,51,0.04)',
              }}
            >
              {label}
              <span
                className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                style={{
                  background: isActive ? 'rgba(255,255,255,0.22)' : '#F4F6F8',
                  color: isActive ? '#fff' : '#9CA3AF',
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Table Card */}
      <div
        className="bg-white rounded-xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
      >
        {/* Toolbar */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: '1px solid #F4F6F8' }}
        >
          <div className="relative">
            <Search
              size={14}
              strokeWidth={2.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search schools or districts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-[#F4F6F8] rounded-lg outline-none w-64 text-[#4B5563] placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }}
            />
          </div>
          <p className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} applications
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['School Name', 'District', 'Type', 'Students', 'Date Submitted', 'Status', 'Action'].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((school) => (
                <tr
                  key={school.id}
                  className="transition-colors"
                  style={{ borderTop: '1px solid #F4F6F8' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '' }}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2.5">
                      <SchoolLogo name={school.name} size={32} />
                      <span
                        className="text-sm font-semibold text-[#002333]"
                        style={{ fontFamily: 'Sora, sans-serif' }}
                      >
                        {school.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {school.district}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                      style={{
                        background: 'rgba(0,35,51,0.06)',
                        color: '#002333',
                        fontFamily: 'Lato, sans-serif',
                      }}
                    >
                      {school.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {school.students?.toLocaleString() ?? '—'}
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {school.dateSubmitted}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={school.status} />
                  </td>
                  <td className="px-5 py-4">
                    {school.status === 'Pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(school.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{
                            background: 'rgba(72,208,140,0.1)',
                            color: '#16A34A',
                            fontFamily: 'Lato, sans-serif',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.2)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.1)' }}
                        >
                          <CheckCircle size={12} strokeWidth={2.5} />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(school.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{
                            background: 'rgba(166,0,3,0.08)',
                            color: '#A60003',
                            fontFamily: 'Lato, sans-serif',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.16)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.08)' }}
                        >
                          <XCircle size={12} strokeWidth={2.5} />
                          Reject
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedSchool(school)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#374151] transition-colors"
                        style={{ background: '#F4F6F8', fontFamily: 'Lato, sans-serif' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF0F3' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F6F8' }}
                      >
                        <Eye size={12} strokeWidth={2.5} />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                No applications match your filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedSchool && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSelectedSchool(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md p-6"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5">
              <SchoolLogo name={selectedSchool.name} size={48} />
              <div>
                <h3 className="font-bold text-[#002333] text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {selectedSchool.name}
                </h3>
                <p className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Application Details
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'District', value: selectedSchool.district },
                { label: 'School Type', value: selectedSchool.type },
                { label: 'Student Capacity', value: selectedSchool.students },
                { label: 'Date Submitted', value: selectedSchool.dateSubmitted },
                { label: 'Current Status', value: <StatusBadge status={selectedSchool.status} /> },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
                  <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {label}
                  </span>
                  <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedSchool(null)}
              className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#002333', fontFamily: 'Lato, sans-serif' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
