import { useState } from 'react'
import {
  BookOpen, ClipboardCheck, Map, Users, DollarSign, Shield,
  Download, Eye, RefreshCw, FileText, BarChart2, Plus
} from 'lucide-react'
import { reportsData } from '../data/mockData'

const reportTypeCards = [
  { key: 'Enrollment', label: 'Enrollment Report',   desc: 'Student enrollment figures by district, school, and grade',    icon: BookOpen,       color: '#2563EB', bg: 'rgba(37,99,235,0.09)' },
  { key: 'Compliance', label: 'Compliance Report',   desc: 'Teacher & school compliance rates with performance metrics',   icon: ClipboardCheck, color: '#16A34A', bg: 'rgba(22,163,74,0.09)' },
  { key: 'District',   label: 'District Report',     desc: 'Full operational summary per district with DEO analytics',     icon: Map,            color: '#002333', bg: 'rgba(0,35,51,0.08)' },
  { key: 'Teacher',    label: 'Teacher Report',      desc: 'Teacher profiles, qualifications, and oversight records',      icon: Users,          color: '#7C3AED', bg: 'rgba(124,58,237,0.09)' },
  { key: 'Finance',    label: 'Finance Report',      desc: 'Budget utilization, fund allocation, and expenditure analysis', icon: DollarSign,    color: '#D97706', bg: 'rgba(245,158,11,0.09)' },
  { key: 'Audit',      label: 'System Audit',        desc: 'System access logs, user activity, and security events',       icon: Shield,         color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
]

const typeColors = {
  Enrollment: { bg: 'rgba(37,99,235,0.09)',   color: '#2563EB' },
  Compliance: { bg: 'rgba(22,163,74,0.09)',   color: '#16A34A' },
  District:   { bg: 'rgba(0,35,51,0.08)',     color: '#002333' },
  Teacher:    { bg: 'rgba(124,58,237,0.09)',  color: '#7C3AED' },
  Finance:    { bg: 'rgba(245,158,11,0.09)', color: '#D97706' },
  Student:    { bg: 'rgba(8,145,178,0.09)',  color: '#0891B2' },
  System:     { bg: 'rgba(107,114,128,0.09)',color: '#6B7280' },
  Audit:      { bg: 'rgba(166,0,3,0.08)',    color: '#A60003' },
}

const formatConfig = {
  PDF:   { bg: 'rgba(166,0,3,0.08)',    color: '#A60003' },
  Excel: { bg: 'rgba(22,163,74,0.09)', color: '#16A34A' },
  CSV:   { bg: 'rgba(0,35,51,0.07)',   color: '#002333' },
}

const [GENERATING, setGenerating_] = [new Set(), () => {}]

export default function Reports() {
  const [generating, setGenerating] = useState(new Set())
  const [reports, setReports] = useState(reportsData)

  const handleGenerate = (key) => {
    const newId = Date.now()
    setReports(prev => [
      {
        id: newId,
        title: `${key} Report – ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        type: key,
        district: 'All Grand Bassa Districts',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Processing',
        format: 'PDF',
      },
      ...prev,
    ])
    setGenerating((p) => new Set([...p, newId]))
    setTimeout(() => {
      setGenerating((p) => { const n = new Set(p); n.delete(newId); return n })
      setReports((prev) => prev.map(r => r.id === newId ? { ...r, status: 'Ready' } : r))
    }, 2000)
  }

  const readyCount     = reports.filter(r => r.status === 'Ready').length
  const processingCount= reports.filter(r => r.status === 'Processing').length

  return (
    <div className="space-y-6 max-w-[1180px]">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Reports & Analytics</h2>
          <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
            Generate, schedule, and export comprehensive Grand Bassa operational reports
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Last export</p>
            <p className="text-sm font-medium text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Feb 20, 2026</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Reports This Month', value: reports.length,    color: '#002333' },
          { label: 'Ready to Download',  value: readyCount,        color: '#16A34A' },
          { label: 'Processing',         value: processingCount,   color: '#D97706' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
            <p className="text-3xl font-bold mt-1.5" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Report Type Cards */}
      <div>
        <h3 className="text-base font-semibold text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
          Generate New Report
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {reportTypeCards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.key}
                className="bg-white rounded-xl p-5 transition-all duration-200"
                style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: card.bg }}>
                    <Icon size={20} strokeWidth={2.5} style={{ color: card.color }} />
                  </div>
                  <span className="text-xs px-2 py-[2px] rounded-full font-semibold"
                    style={{ background: card.bg, color: card.color, fontFamily: 'Lato, sans-serif' }}>
                    {card.key}
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{card.label}</h4>
                <p className="text-xs font-medium text-[#6B7280] mt-1 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>{card.desc}</p>
                <button
                  onClick={() => handleGenerate(card.key)}
                  className="mt-4 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: card.bg, color: card.color, fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0.92)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)' }}>
                  <Plus size={13} strokeWidth={2.5} />
                  Generate Report
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div>
            <h3 className="text-[15px] font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Recent Reports</h3>
            <p className="text-xs font-medium text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>All generated Grand Bassa reports</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['Report Title', 'Type', 'District', 'Date', 'Format', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
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
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: tc.bg }}>
                          <FileText size={14} strokeWidth={2.5} style={{ color: tc.color }} />
                        </div>
                        <p className="text-sm font-medium text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{report.title}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                        style={{ background: tc.bg, color: tc.color, fontFamily: 'Lato, sans-serif' }}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{report.district}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{report.date}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                        style={{ background: fc.bg, color: fc.color, fontFamily: 'Lato, sans-serif' }}>
                        {report.format}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      {isProcessing ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#D97706', fontFamily: 'Lato, sans-serif' }}>
                          <RefreshCw size={12} strokeWidth={2.5} className="animate-spin" />
                          Processing…
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}>
                          Ready
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {!isProcessing && (
                        <div className="flex items-center gap-1.5">
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                            style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.20)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.10)' }}>
                            <Download size={11} strokeWidth={2.5} /> Download
                          </button>
                          <button
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                            style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF0F3' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F6F8' }}>
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
