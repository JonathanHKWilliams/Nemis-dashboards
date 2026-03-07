import { useState } from 'react'
import {
  BookOpen, ClipboardCheck, Map, Users, DollarSign, Shield,
  Download, Eye, RefreshCw, FileText, X, Pencil, CheckCircle
} from 'lucide-react'
import { reportsData } from '../data/mockData'

const reportTypeCards = [
  { key: 'Enrollment', label: 'Enrollment Report',   desc: 'Student enrollment figures by district, school, and grade',     icon: BookOpen,       color: '#0F172A', bg: '#F4F6F8' },
  { key: 'Compliance', label: 'Compliance Report',   desc: 'Teacher & school compliance rates with performance metrics',    icon: ClipboardCheck, color: '#0F172A', bg: '#F4F6F8' },
  { key: 'District',   label: 'District Report',     desc: 'Full operational summary per district with DEO analytics',      icon: Map,            color: '#0F172A', bg: '#F4F6F8' },
  { key: 'Teacher',    label: 'Teacher Report',      desc: 'Teacher profiles, qualifications, and oversight records',       icon: Users,          color: '#0F172A', bg: '#F4F6F8' },
  { key: 'Finance',    label: 'Finance Report',      desc: 'Budget utilization, fund allocation, and expenditure analysis', icon: DollarSign,     color: '#0F172A', bg: '#F4F6F8' },
  { key: 'Audit',      label: 'System Audit',        desc: 'System access logs, user activity, and security events',        icon: Shield,         color: '#0F172A', bg: '#F4F6F8' },
]

const typeColors = {
  Enrollment: { bg: 'rgba(37,99,235,0.09)',   color: '#2563EB' },
  Compliance: { bg: 'rgba(22,163,74,0.09)',   color: '#16A34A' },
  District:   { bg: 'rgba(0,35,51,0.08)',     color: '#002333' },
  Teacher:    { bg: 'rgba(124,58,237,0.09)',  color: '#7C3AED' },
  Finance:    { bg: 'rgba(245,158,11,0.09)',  color: '#D97706' },
  Student:    { bg: 'rgba(8,145,178,0.09)',   color: '#0891B2' },
  System:     { bg: 'rgba(107,114,128,0.09)', color: '#6B7280' },
  Audit:      { bg: 'rgba(166,0,3,0.08)',     color: '#A60003' },
}

const formatConfig = {
  PDF:   { bg: 'rgba(166,0,3,0.08)',   color: '#A60003' },
  Excel: { bg: 'rgba(22,163,74,0.09)', color: '#16A34A' },
  CSV:   { bg: 'rgba(0,35,51,0.07)',   color: '#002333' },
}

const DISTRICTS = ['All Grand Bassa Districts', 'Buchanan District', 'District 2', 'District 3', 'Tweh Farm District', 'Owensgrove District']
const DATE_RANGES = ['Current Month (Feb 2026)', 'Last Month (Jan 2026)', 'Q4 2025', 'Q3 2025', 'Full Year 2025', 'Academic Year 2025/26']

// Preview Modal — shows draft content and allows edit before generating
function ReportPreviewModal({ card, onClose, onGenerate }) {
  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const [title,     setTitle]     = useState(`${card.label} – ${today}`)
  const [district,  setDistrict]  = useState(DISTRICTS[0])
  const [dateRange, setDateRange] = useState(DATE_RANGES[0])
  const [format,    setFormat]    = useState('PDF')
  const [notes,     setNotes]     = useState('')
  const [editing,   setEditing]   = useState(false)
  const Icon = card.icon

  const previewRows = {
    Enrollment: [['Buchanan District', '8 schools', '14,320 students', '91% enrolled'], ['District 2', '5 schools', '6,840 students', '87% enrolled'], ['District 3', '6 schools', '8,100 students', '83% enrolled']],
    Compliance: [['Grand Bassa High', 'Active', '96%', 'Compliant'], ['St. Mary Primary', 'Active', '88%', 'Compliant'], ['Tweh Farm Public', 'Active', '74%', 'Review Needed']],
    District:   [['Buchanan', '8 schools', '54 teachers', '14,320 students'], ['District 2', '5 schools', '38 teachers', '6,840 students']],
    Teacher:    [['Mr. J. Kollie', 'Mathematics', 'B.Ed', 'Active'], ['Mrs. G. Reeves', 'English', 'M.A.', 'Active']],
    Finance:    [['Salaries', '$680,000', '$654,000', '96%'], ['Infrastructure', '$120,000', '$87,000', '73%']],
    Audit:      [['Login', 'Dr. Johnson', 'CEO', '2026-02-28 09:00'], ['Report Approved', 'Dr. Johnson', 'CEO', '2026-02-27 14:32']],
  }
  const previewHeaders = {
    Enrollment: ['District', 'Schools', 'Students', 'Rate'],
    Compliance: ['School', 'Status', 'Compliance', 'Result'],
    District:   ['District', 'Schools', 'Teachers', 'Students'],
    Teacher:    ['Teacher', 'Subject', 'Qualification', 'Status'],
    Finance:    ['Category', 'Allocated', 'Spent', 'Utilization'],
    Audit:      ['Action', 'User', 'Role', 'Timestamp'],
  }

  const rows    = previewRows[card.key]    || []
  const headers = previewHeaders[card.key] || []

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-6"
      style={{ background: 'rgba(0,0,0,0.5)' }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-2xl my-4" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
              <Icon size={20} strokeWidth={2.5} style={{ color: card.color }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Report Preview</h3>
              <p className="text-xs font-semibold text-[#4B5563]">{card.label}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: '#F4F6F8' }}>
            <X size={15} strokeWidth={2.5} color="#374151" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Editable metadata */}
          <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#374151]">Report Details</p>
              <button onClick={() => setEditing(v => !v)}
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg transition-colors"
                style={{ background: editing ? '#000E21' : '#EEF0F3', color: editing ? '#fff' : '#374151' }}>
                <Pencil size={11} strokeWidth={2.5} /> {editing ? 'Done Editing' : 'Edit Details'}
              </button>
            </div>

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1 block">Report Title</label>
                  <input value={title} onChange={e => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                    style={{ background: '#fff', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1 block">District Scope</label>
                    <select value={district} onChange={e => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none"
                      style={{ background: '#fff', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }}>
                      {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1 block">Date Range</label>
                    <select value={dateRange} onChange={e => setDateRange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm outline-none appearance-none"
                      style={{ background: '#fff', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }}>
                      {DATE_RANGES.map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1 block">Export Format</label>
                  <div className="flex gap-2">
                    {['PDF', 'Excel', 'CSV'].map(f => (
                      <button key={f} onClick={() => setFormat(f)}
                        className="flex-1 py-2 rounded-lg text-xs font-bold"
                        style={{ background: format === f ? '#000E21' : '#fff', color: format === f ? '#fff' : '#374151', border: `1px solid ${format === f ? '#000E21' : '#EEF0F3'}` }}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1 block">Notes (optional)</label>
                  <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)}
                    placeholder="Add any notes to include in the report header..."
                    className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                    style={{ background: '#fff', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Title',         value: title },
                  { label: 'District',      value: district },
                  { label: 'Date Range',    value: dateRange },
                  { label: 'Format',        value: format },
                ].map(f => (
                  <div key={f.label}>
                    <p className="text-[10px] font-black uppercase text-[#94A3B8]">{f.label}</p>
                    <p className="text-sm font-bold text-[#0F172A] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{f.value}</p>
                  </div>
                ))}
                {notes && (
                  <div className="col-span-2">
                    <p className="text-[10px] font-black uppercase text-[#94A3B8]">Notes</p>
                    <p className="text-sm font-semibold text-[#374151] mt-0.5">{notes}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Data preview */}
          {rows.length > 0 && (
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-2">Data Preview (sample)</p>
              <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ background: '#FAFBFC', borderBottom: '1px solid #EEF0F3' }}>
                      {headers.map(h => (
                        <th key={h} className="text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#4B5563]"
                          style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, i) => (
                      <tr key={i} style={{ borderTop: i > 0 ? '1px solid #F4F6F8' : 'none' }}>
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-2.5 text-sm font-semibold text-[#374151]"
                            style={{ fontFamily: 'Lato, sans-serif' }}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="px-4 py-2 text-[10px] font-semibold text-[#94A3B8] italic" style={{ borderTop: '1px solid #F4F6F8' }}>
                  Full report will include all {district === DISTRICTS[0] ? '30' : 'selected'} schools for {dateRange}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: '1px solid #EEF0F3' }}>
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#374151]"
            style={{ background: '#F4F6F8' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
            Cancel
          </button>
          <button onClick={() => { onGenerate(card.key, title, district, format); onClose() }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: '#000E21' }}>
            <CheckCircle size={15} strokeWidth={2.5} /> Confirm & Generate
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Reports() {
  const [reports, setReports] = useState(reportsData)
  const [preview, setPreview]             = useState(null) // card being previewed

  const handleGenerate = (key, title, district, format) => {
    const newId = Date.now()
    setReports(prev => [
      {
        id: newId,
        title,
        type: key,
        district,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Processing',
        format,
      },
      ...prev,
    ])
    setTimeout(() => {
      setReports(prev => prev.map(r => r.id === newId ? { ...r, status: 'Ready' } : r))
    }, 2000)
  }

  return (
    <div className="space-y-6 max-w-[1180px]">
      {/* Preview modal */}
      {preview && (
        <ReportPreviewModal
          card={preview}
          onClose={() => setPreview(null)}
          onGenerate={handleGenerate}
        />
      )}

      {/* Report Type Cards */}
      <div>
        <h3 className="text-base font-bold text-[#0F172A] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Generate New Report</h3>
        <p className="text-xs font-semibold text-[#4B5563] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
          Click a report type to preview and edit before generating
        </p>
        <div className="grid grid-cols-3 gap-4">
          {reportTypeCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.key}
                className="bg-white rounded-xl p-5 transition-all duration-200 cursor-pointer"
                style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,14,33,0.10)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,14,33,0.05)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                    <Icon size={20} strokeWidth={2.5} style={{ color: card.color }} />
                  </div>
                  <span className="text-xs px-2 py-[2px] rounded-full font-bold"
                    style={{ background: card.bg, color: card.color, fontFamily: 'Lato, sans-serif' }}>{card.key}</span>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{card.label}</h4>
                <p className="text-xs font-semibold text-[#4B5563] mt-1 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>{card.desc}</p>
                <button
                  onClick={() => setPreview(card)}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all"
                  style={{ background: card.bg, color: card.color, fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(0.92)' }}
                  onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)' }}>
                  <Eye size={13} strokeWidth={2.5} /> Preview & Generate
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div>
            <h3 className="text-[15px] font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Recent Reports</h3>
            <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>All generated Grand Bassa reports</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['Report Title', 'Type', 'District', 'Date', 'Format', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#4B5563]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => {
                const tc = typeColors[report.type] || typeColors.System
                const fc = formatConfig[report.format] || { bg: '#F4F6F8', color: '#666' }
                const isProcessing = report.status === 'Processing'
                return (
                  <tr key={report.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tc.bg }}>
                          <FileText size={14} strokeWidth={2.5} style={{ color: tc.color }} />
                        </div>
                        <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{report.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-bold"
                        style={{ background: tc.bg, color: tc.color, fontFamily: 'Lato, sans-serif' }}>{report.type}</span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{report.district}</td>
                    <td className="px-5 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{report.date}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-bold"
                        style={{ background: fc.bg, color: fc.color, fontFamily: 'Lato, sans-serif' }}>{report.format}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {isProcessing ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold" style={{ color: '#D97706', fontFamily: 'Lato, sans-serif' }}>
                          <RefreshCw size={12} strokeWidth={2.5} className="animate-spin" /> Processing…
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-bold"
                          style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}>Ready</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {!isProcessing && (
                        <div className="flex items-center gap-1.5">
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                            style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,208,140,0.20)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(72,208,140,0.10)' }}>
                            <Download size={11} strokeWidth={2.5} /> Download
                          </button>
                          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                            style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
                            onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
                            <Eye size={11} strokeWidth={2.5} /> View
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
