import { useState } from 'react'
import { School, Users, ChevronRight, ArrowLeft, AlertCircle, CheckCircle, Clock, TrendingUp, GraduationCap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { deoSchools } from '../../data/deoData'

const ACCENT = '#0D9488'

function StatusBadge({ status }) {
  const cfg = {
    Compliant:      { bg: 'rgba(22,163,74,0.10)',  color: '#16A34A' },
    'Needs Review': { bg: 'rgba(217,119,6,0.10)',  color: '#D97706' },
    Flagged:        { bg: 'rgba(166,0,3,0.10)',    color: '#A60003' },
  }[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
  )
}

function AttendanceBar({ value }) {
  const color = value >= 85 ? '#16A34A' : value >= 75 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#F3F4F6' }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{value}%</span>
    </div>
  )
}

function ReportDots({ submitted, due }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: due }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full"
          style={{ background: i < submitted ? '#16A34A' : '#EEF0F3' }} />
      ))}
    </div>
  )
}

function SchoolDetail({ school, onBack }) {
  return (
    <div className="space-y-6 max-w-[900px]">
      {/* Header */}
      <div>
        <button onClick={onBack}
          className="flex items-center gap-2 text-sm font-bold mb-4 transition-colors"
          style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
          <ArrowLeft size={16} strokeWidth={2.5} /> Back to Schools
        </button>
        <div className="rounded-2xl p-6 flex items-start justify-between"
          style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(13,148,136,0.10)' }}>
              <School size={26} style={{ color: ACCENT }} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{school.name}</h2>
              <p className="text-sm font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {school.level} · {school.location} · Est. {school.established}
              </p>
              <p className="text-sm font-bold mt-1" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
                Principal: {school.principal}
              </p>
            </div>
          </div>
          <StatusBadge status={school.status} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Students', value: school.students.toLocaleString(), icon: GraduationCap, color: '#2563EB' },
          { label: 'Total Teachers', value: school.teachers, icon: Users, color: '#7C3AED' },
          { label: 'Attendance', value: `${school.attendance}%`, icon: CheckCircle, color: school.attendance >= 85 ? '#16A34A' : '#D97706' },
          { label: 'Performance Avg', value: `${school.performanceAvg}%`, icon: TrendingUp, color: ACCENT },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-start gap-3"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${s.color}15` }}>
              <s.icon size={18} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-[10px] font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Enrollment by Grade */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Enrollment by Grade</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={school.enrollmentByGrade} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="grade" tick={{ fontSize: 9, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', fontFamily: 'Roboto' }} />
              <Bar dataKey="students" fill={ACCENT} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gender & Compliance */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <h3 className="text-sm font-black text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Gender Distribution</h3>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-bold text-[#6B7280] w-12" style={{ fontFamily: 'Roboto, sans-serif' }}>Male</span>
              <div className="flex-1 h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(school.gender.male / school.students * 100)}%`, background: '#2563EB' }} />
              </div>
              <span className="text-xs font-bold w-8" style={{ color: '#2563EB', fontFamily: 'Roboto, sans-serif' }}>{school.gender.male}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[#6B7280] w-12" style={{ fontFamily: 'Roboto, sans-serif' }}>Female</span>
              <div className="flex-1 h-2 rounded-full" style={{ background: '#F3F4F6' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(school.gender.female / school.students * 100)}%`, background: ACCENT }} />
              </div>
              <span className="text-xs font-bold w-8" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>{school.gender.female}</span>
            </div>
          </div>

          <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <h3 className="text-sm font-black text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Fee Compliance</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 rounded-full" style={{ background: '#F3F4F6' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${school.feesCollected}%`, background: school.feesCollected >= 80 ? '#16A34A' : school.feesCollected >= 50 ? '#D97706' : '#A60003' }} />
              </div>
              <span className="text-sm font-black" style={{ color: school.feesCollected >= 80 ? '#16A34A' : '#D97706', fontFamily: 'Sora, sans-serif' }}>{school.feesCollected}%</span>
            </div>
            <p className="text-[10px] font-semibold text-[#9CA3AF] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Fees collected relative to target</p>
          </div>

          <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <h3 className="text-sm font-black text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Reports</h3>
            <div className="flex items-center gap-3">
              <ReportDots submitted={school.reportsSubmitted} due={school.reportsDue} />
              <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {school.reportsSubmitted}/{school.reportsDue} submitted
              </span>
            </div>
            {school.issues > 0 && (
              <div className="mt-3 flex items-center gap-2 text-xs font-bold" style={{ color: '#A60003', fontFamily: 'Roboto, sans-serif' }}>
                <AlertCircle size={14} strokeWidth={2.5} />
                {school.issues} open issue{school.issues > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DEOSchools() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const school = deoSchools.find(s => s.id === selected)
  if (school) return <SchoolDetail school={school} onBack={() => setSelected(null)} />

  const filtered = filter === 'All' ? deoSchools : deoSchools.filter(s => s.status === filter || s.level === filter)

  return (
    <div className="space-y-6 max-w-[1080px]">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Schools in District</h2>
          <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{deoSchools.length} schools · Click a school to view details</p>
        </div>
        <div className="flex gap-2">
          {['All', 'Compliant', 'Needs Review', 'Flagged', 'Primary', 'Secondary'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: filter === f ? ACCENT : '#fff',
                color: filter === f ? '#fff' : '#6B7280',
                border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`,
                fontFamily: 'Roboto, sans-serif',
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
              {['School', 'Level', 'Principal', 'Students', 'Teachers', 'Attendance', 'Reports', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.id}
                className="transition-colors hover:bg-[#F9FAFB] cursor-pointer"
                onClick={() => setSelected(s.id)}
                style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                <td className="px-4 py-3.5">
                  <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</p>
                  <p className="text-[10px] font-semibold text-[#9CA3AF]">{s.location}</p>
                </td>
                <td className="px-4 py-3.5">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                    style={{ background: s.level === 'Primary' ? 'rgba(37,99,235,0.10)' : 'rgba(124,58,237,0.10)', color: s.level === 'Primary' ? '#2563EB' : '#7C3AED' }}>
                    {s.level}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.principal}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.students.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.teachers}</td>
                <td className="px-4 py-3.5 min-w-[110px]"><AttendanceBar value={s.attendance} /></td>
                <td className="px-4 py-3.5"><ReportDots submitted={s.reportsSubmitted} due={s.reportsDue} /></td>
                <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
                <td className="px-4 py-3.5">
                  <ChevronRight size={16} color="#9CA3AF" strokeWidth={2.5} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
