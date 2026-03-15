import { useState } from 'react'
import { ArrowLeft, Download, Eye, FileText } from 'lucide-react'

const ACCENT = '#0367A0'

const REPORTS = [
  {
    id: 'enrollment',
    title: 'Student Enrollment Report',
    subtitle: 'Full enrollment data by class, grade, and semester',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&h=200&fit=crop',
    lastGenerated: 'March 10, 2026',
    term: '1st Semester · 2025–2026',
    summary: 'Total enrolled students across all 18 classes. Includes new admissions, transfers, and withdrawals for the current academic year.',
    stats: [
      { label: 'Total Enrolled', value: '642' },
      { label: 'New Admissions', value: '48' },
      { label: 'Transfers In', value: '12' },
      { label: 'Withdrawals', value: '7' },
    ],
  },
  {
    id: 'attendance',
    title: 'Attendance Report',
    subtitle: 'Daily and weekly student & teacher attendance',
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=200&fit=crop',
    lastGenerated: 'March 10, 2026',
    term: '1st Semester · 2025–2026',
    summary: 'Attendance rates for all students and teaching staff. Identifies chronic absenteeism trends and class-level summaries.',
    stats: [
      { label: 'Avg Attendance', value: '93%' },
      { label: 'Perfect Attendance', value: '214' },
      { label: 'Chronic Absent', value: '18' },
      { label: 'Teacher Attendance', value: '96%' },
    ],
  },
  {
    id: 'performance',
    title: 'Academic Performance Report',
    subtitle: 'Semester results, grade distributions, and subject averages',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&h=200&fit=crop',
    lastGenerated: 'March 10, 2026',
    term: '1st Semester · 2025–2026',
    summary: 'Academic performance across all grades, subjects, and teachers. Includes grade distributions, pass rates, and subject-level averages.',
    stats: [
      { label: 'School Average', value: '78%' },
      { label: 'Pass Rate', value: '84%' },
      { label: 'Honor Students', value: '97' },
      { label: 'Failing Students', value: '31' },
    ],
  },
  {
    id: 'fees',
    title: 'Fee Collection Report',
    subtitle: 'Semester fee collection, balance, and payment status',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&h=200&fit=crop',
    lastGenerated: 'March 10, 2026',
    term: '1st Semester · 2025–2026',
    summary: 'Fee collection status for all enrolled students. Breaks down payments by class, outstanding balances, and collection rate by month.',
    stats: [
      { label: 'Total Expected', value: '$192,600' },
      { label: 'Total Collected', value: '$174,360' },
      { label: 'Outstanding', value: '$18,240' },
      { label: 'Collection Rate', value: '91%' },
    ],
  },
  {
    id: 'teachers',
    title: 'Teacher Performance Report',
    subtitle: 'Staff evaluations, attendance, and class performance',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=480&h=200&fit=crop',
    lastGenerated: 'March 8, 2026',
    term: '1st Semester · 2025–2026',
    summary: 'Evaluations and metrics for all 28 teaching staff members. Covers classroom observations, attendance, student performance outcomes, and professional development.',
    stats: [
      { label: 'Total Staff', value: '28' },
      { label: 'Avg Attendance', value: '92%' },
      { label: 'On Leave', value: '1' },
      { label: 'Top Performers', value: '8' },
    ],
  },
  {
    id: 'compliance',
    title: 'Regulatory Compliance Report',
    subtitle: 'NEMIS submissions, inspections, and compliance status',
    img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=480&h=200&fit=crop',
    lastGenerated: 'March 5, 2026',
    term: '1st Semester · 2025–2026',
    summary: 'School compliance status with Ministry of Education requirements. Covers NEMIS data submissions, safety inspections, teacher accreditation, and pending items.',
    stats: [
      { label: 'Compliant Items', value: '6/8' },
      { label: 'Pending', value: '2' },
      { label: 'Overdue', value: '0' },
      { label: 'Next Deadline', value: 'Mar 20' },
    ],
  },
]

function ReportDetail({ report, onBack }) {
  return (
    <div className="max-w-[860px] space-y-5">
      {/* Back */}
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-black transition-colors"
        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Reports
      </button>

      {/* Header */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
        <img src={report.img} alt={report.title} className="w-full object-cover" style={{ height: 200 }} />
        <div className="p-6 flex items-start justify-between gap-4" style={{ background: '#fff' }}>
          <div>
            <h2 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{report.title}</h2>
            <p className="text-sm font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{report.term}</p>
            <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>Last generated: {report.lastGenerated}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0 mt-1">
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black text-white"
              style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              <Eye size={15} strokeWidth={2.5} /> View Report
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black"
              style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3' }}>
              <Download size={15} strokeWidth={2.5} /> Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <h3 className="text-sm font-black text-[#002333] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Report Summary</h3>
        <p className="text-sm font-semibold text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>{report.summary}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {report.stats.map(s => (
          <div key={s.label} className="rounded-2xl p-5 text-center"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
            <p className="text-xs font-bold text-[#6B7280] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Generate section */}
      <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <h3 className="text-sm font-black text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Generate New Report</h3>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Academic Year</label>
            <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
              <option>2025–2026</option>
              <option>2024–2025</option>
              <option>2023–2024</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Semester</label>
            <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
              <option>1st Semester</option>
              <option>2nd Semester</option>
              <option>Full Year</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Format</label>
            <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
            </select>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white"
          style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
          <FileText size={14} strokeWidth={2.5} /> Generate Report
        </button>
      </div>
    </div>
  )
}

export default function PrincipalReports() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    const report = REPORTS.find(r => r.id === selected)
    return <ReportDetail report={report} onBack={() => setSelected(null)} />
  }

  return (
    <div className="max-w-[1180px] space-y-5">
      <div>
        <h2 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Reports</h2>
        <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
          Academic Year 2025–2026 · St. Mark's Demonstration School
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {REPORTS.map(r => (
          <div key={r.id} className="rounded-2xl overflow-hidden flex flex-col"
            style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>

            {/* Real photo */}
            <img src={r.img} alt={r.title} className="w-full object-cover" style={{ height: 160 }} />

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
                {r.title}
              </p>
              <p className="text-xs font-semibold text-[#6B7280] mt-1 leading-relaxed flex-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                {r.subtitle}
              </p>
              <p className="text-[10px] font-semibold text-[#9CA3AF] mt-2 mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                Last generated: {r.lastGenerated}
              </p>
              <button onClick={() => setSelected(r.id)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-black text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                <Eye size={13} strokeWidth={2.5} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
