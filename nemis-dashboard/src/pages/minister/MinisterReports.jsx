import { useState } from 'react'
import { Search, X, Download, CheckCircle, XCircle, FileText, ChevronRight } from 'lucide-react'
import { nationalReports } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const STATUS_CFG = {
  Approved: { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
  Pending:  { color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
  Rejected: { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
  Missing:  { color: '#94A3B8', bg: '#F1F5F9'                },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function ReportDetailPanel({ report, onClose }) {
  const [activeForm, setActiveForm] = useState(null)
  const toggleForm = f => setActiveForm(prev => prev === f ? null : f)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 420, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 className="text-sm font-black text-[#0F172A] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{report.title}</h3>
            <p className="text-xs text-[#64748B] mt-1">{report.county} · {report.period}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC] flex-shrink-0 ml-3">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <StatusBadge status={report.status} />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Report ID',    value: report.id },
              { label: 'County',       value: report.county },
              { label: 'Type',         value: report.type },
              { label: 'Period',       value: report.period },
              { label: 'Submitted By', value: report.submittedBy || '—' },
              { label: 'Submitted At', value: report.submittedAt || 'Not submitted' },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]">{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5 truncate">{f.value}</p>
              </div>
            ))}
          </div>

          {report.comment && (
            <div className="rounded-xl p-3" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
              <p className="text-[10px] font-black uppercase text-[#DC2626] mb-1">Rejection Note</p>
              <p className="text-xs text-[#475569]">{report.comment}</p>
            </div>
          )}

          {report.status !== 'Missing' && (
            <div className="space-y-2 pt-2">
              {report.status === 'Pending' && (
                <>
                  <button onClick={() => toggleForm('approve')}
                    className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left"
                    style={{ background: activeForm === 'approve' ? '#059669' : '#F8FAFC', color: activeForm === 'approve' ? '#fff' : '#059669', border: `1px solid ${activeForm === 'approve' ? '#059669' : 'rgba(5,150,105,0.25)'}`, fontFamily: 'Roboto, sans-serif' }}>
                    Approve Report
                  </button>
                  <button onClick={() => toggleForm('reject')}
                    className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left"
                    style={{ background: activeForm === 'reject' ? '#DC2626' : '#F8FAFC', color: activeForm === 'reject' ? '#fff' : '#DC2626', border: `1px solid ${activeForm === 'reject' ? '#DC2626' : 'rgba(220,38,38,0.25)'}`, fontFamily: 'Roboto, sans-serif' }}>
                    Reject Report
                  </button>
                </>
              )}
              <button onClick={() => toggleForm('download')}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left flex items-center gap-2"
                style={{ background: activeForm === 'download' ? ACCENT : '#F8FAFC', color: activeForm === 'download' ? '#fff' : '#0F172A', border: `1px solid ${activeForm === 'download' ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
                <Download size={13} strokeWidth={2.5} /> Download Report
              </button>
            </div>
          )}

          {activeForm === 'approve' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.2)' }}>
              <p className="text-xs font-black text-[#059669]">Approve Report</p>
              <textarea rows={2} placeholder="Optional approval note..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: '#059669' }}>Confirm Approval</button>
            </div>
          )}
          {activeForm === 'reject' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <p className="text-xs font-black text-[#DC2626]">Reject Report</p>
              <textarea rows={3} placeholder="Reason for rejection (required)..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: '#DC2626' }}>Reject & Notify</button>
            </div>
          )}
          {activeForm === 'download' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Export Format</p>
              <div className="flex gap-2">
                {['PDF', 'Excel', 'CSV'].map(fmt => (
                  <button key={fmt} className="flex-1 py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>{fmt}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MinisterReports() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const report = nationalReports.find(r => r.id === selected)

  const filtered = nationalReports.filter(r => {
    const q = search.toLowerCase()
    const matchQ = !q || r.title.toLowerCase().includes(q) || r.county.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)
    const matchStatus = statusFilter === 'All' || r.status === statusFilter
    const matchType = typeFilter === 'All' || r.type === typeFilter
    return matchQ && matchStatus && matchType
  })

  const stats = {
    total: nationalReports.length,
    approved: nationalReports.filter(r => r.status === 'Approved').length,
    pending: nationalReports.filter(r => r.status === 'Pending').length,
    missing: nationalReports.filter(r => r.status === 'Missing').length,
  }

  return (
    <div className="space-y-5 max-w-[1100px]">
      {report && <ReportDetailPanel report={report} onClose={() => setSelected(null)} />}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Reports',  value: stats.total,    color: '#0F172A' },
          { label: 'Approved',       value: stats.approved, color: '#059669' },
          { label: 'Pending Review', value: stats.pending,  color: '#D97706' },
          { label: 'Missing',        value: stats.missing,  color: '#DC2626' },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-black" style={{ color: c.color, fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
            <p className="text-xs font-semibold text-[#64748B] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-[220px]"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <Search size={15} color="#94A3B8" strokeWidth={2.5} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, county, ID..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Approved', 'Pending', 'Rejected', 'Missing'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: statusFilter === s ? ACCENT : '#fff', color: statusFilter === s ? '#fff' : '#64748B', border: `1px solid ${statusFilter === s ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
              {s}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Academic', 'Monthly', 'Attendance', 'Finance', 'Infrastructure'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: typeFilter === t ? '#0F172A' : '#fff', color: typeFilter === t ? '#fff' : '#64748B', border: `1px solid ${typeFilter === t ? '#0F172A' : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-semibold text-[#94A3B8]">{filtered.length} report{filtered.length !== 1 ? 's' : ''} · Click to review</p>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['Report', 'County', 'Type', 'Period', 'Submitted By', 'Submitted At', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id}
                className="cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                onClick={() => setSelected(r.id)}
                style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <FileText size={14} color={STATUS_CFG[r.status]?.color || '#64748B'} strokeWidth={2.5} />
                    <p className="text-xs font-black text-[#0F172A] max-w-[180px] truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.title}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{r.county}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{r.type}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{r.period}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{r.submittedBy || '—'}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{r.submittedAt || '—'}</td>
                <td className="px-4 py-3.5"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3.5"><ChevronRight size={14} color="#94A3B8" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
