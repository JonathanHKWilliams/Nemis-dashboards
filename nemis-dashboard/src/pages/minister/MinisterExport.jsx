import { useState } from 'react'
import { Download, FileText, CheckCircle } from 'lucide-react'

const ACCENT = '#4F46E5'

const EXPORT_TYPES = [
  {
    id: 'national-summary',
    title: 'National Summary Report',
    description: 'High-level national KPIs, enrollment, attendance, and performance metrics.',
    formats: ['PDF', 'Excel'],
    category: 'Overview',
  },
  {
    id: 'county-performance',
    title: 'County Performance Report',
    description: 'Detailed performance breakdown by county including compliance, attendance, and academics.',
    formats: ['PDF', 'Excel', 'CSV'],
    category: 'Performance',
  },
  {
    id: 'school-registry',
    title: 'National School Registry',
    description: 'Full list of all registered schools with enrollment, infrastructure, and report status.',
    formats: ['Excel', 'CSV'],
    category: 'Registry',
  },
  {
    id: 'teacher-registry',
    title: 'National Teacher Registry',
    description: 'Complete teacher database with qualifications, assignments, and status.',
    formats: ['Excel', 'CSV'],
    category: 'Registry',
  },
  {
    id: 'student-enrollment',
    title: 'Student Enrollment Data',
    description: 'National student enrollment by county, grade, gender, and school level.',
    formats: ['Excel', 'CSV'],
    category: 'Registry',
  },
  {
    id: 'attendance-trend',
    title: 'Attendance Trend Analysis',
    description: '12-month attendance trend data by county and school level.',
    formats: ['PDF', 'Excel'],
    category: 'Attendance',
  },
  {
    id: 'budget-utilization',
    title: 'Budget Utilization Report',
    description: 'County-level budget allocation, disbursement, and utilization statistics.',
    formats: ['PDF', 'Excel'],
    category: 'Finance',
  },
  {
    id: 'report-compliance',
    title: 'Report Compliance Summary',
    description: 'Status of all pending, approved, rejected, and missing reports by county.',
    formats: ['PDF', 'Excel', 'CSV'],
    category: 'Compliance',
  },
  {
    id: 'audit-log',
    title: 'System Audit Log Export',
    description: 'Full export of system activity logs for compliance and accountability review.',
    formats: ['CSV'],
    category: 'Security',
  },
  {
    id: 'emergency-log',
    title: 'Emergency Incidents Log',
    description: 'All reported emergency incidents with status and response actions.',
    formats: ['PDF', 'Excel'],
    category: 'Emergency',
  },
]

const CATEGORIES = ['All', ...new Set(EXPORT_TYPES.map(e => e.category))]

function ExportCard({ item }) {
  const [selectedFmt, setSelectedFmt] = useState(item.formats[0])
  const [exported, setExported] = useState(false)

  const handleExport = () => {
    setExported(true)
    setTimeout(() => setExported(false), 2500)
  }

  return (
    <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${ACCENT}10` }}>
            <FileText size={15} color={ACCENT} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{item.title}</p>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{ background: `${ACCENT}10`, color: ACCENT }}>{item.category}</span>
          </div>
        </div>
      </div>
      <p className="text-xs font-semibold text-[#475569] mb-4 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {item.description}
      </p>
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          {item.formats.map(f => (
            <button key={f} onClick={() => setSelectedFmt(f)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-black"
              style={{ background: selectedFmt === f ? ACCENT : '#F8FAFC', color: selectedFmt === f ? '#fff' : '#64748B', border: `1px solid ${selectedFmt === f ? ACCENT : '#E2E8F0'}` }}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={handleExport}
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all"
          style={{ background: exported ? '#059669' : ACCENT, color: '#fff' }}>
          {exported ? <CheckCircle size={13} strokeWidth={2.5} /> : <Download size={13} strokeWidth={2.5} />}
          {exported ? 'Exported!' : `Export ${selectedFmt}`}
        </button>
      </div>
    </div>
  )
}

export default function MinisterExport() {
  const [catFilter, setCatFilter] = useState('All')
  const [period, setPeriod] = useState('current-term')

  const filtered = catFilter === 'All' ? EXPORT_TYPES : EXPORT_TYPES.filter(e => e.category === catFilter)

  return (
    <div className="space-y-5 max-w-[1000px]">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Data Export Center</h2>
          <p className="text-xs font-semibold text-[#94A3B8] mt-0.5">Export national education data in your preferred format</p>
        </div>
        <div>
          <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Reporting Period</label>
          <select value={period} onChange={e => setPeriod(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs outline-none"
            style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
            <option value="current-term">Current Term (2026)</option>
            <option value="q4-2025">Q4 2025</option>
            <option value="annual-2025">Annual 2025</option>
            <option value="annual-2024">Annual 2024</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: catFilter === c ? ACCENT : '#fff', color: catFilter === c ? '#fff' : '#64748B', border: `1px solid ${catFilter === c ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Export cards */}
      <div className="grid grid-cols-1 gap-3">
        {filtered.map(item => <ExportCard key={item.id} item={item} />)}
      </div>

      {/* Note */}
      <div className="rounded-2xl p-4" style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}15` }}>
        <p className="text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <span className="font-black text-[#0F172A]">Data Privacy:</span> All exports contain anonymized or role-appropriate data. Exports are logged in the system audit trail. Bulk exports of student-level data require NEMIS Data Governance approval.
        </p>
      </div>
    </div>
  )
}
