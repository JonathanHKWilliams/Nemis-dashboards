import { useState } from 'react'
import { FileText, CheckCircle, Clock, XCircle, AlertCircle, Download, Check, X, RotateCcw } from 'lucide-react'
import { deoReports } from '../../data/deoData'

const ACCENT = '#0D9488'

function StatusBadge({ status }) {
  const cfg = {
    Approved: { bg: 'rgba(22,163,74,0.10)',  color: '#16A34A', icon: CheckCircle },
    Pending:  { bg: 'rgba(217,119,6,0.10)',  color: '#D97706', icon: Clock       },
    Rejected: { bg: 'rgba(166,0,3,0.10)',    color: '#A60003', icon: XCircle     },
    Missing:  { bg: 'rgba(100,116,139,0.10)',color: '#64748B', icon: AlertCircle },
  }[status] || { bg: '#F3F4F6', color: '#6B7280', icon: Clock }
  const Icon = cfg.icon
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon size={10} strokeWidth={3} />{status}
    </span>
  )
}

export default function DEOReports() {
  const [filter, setFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const approved = deoReports.filter(r => r.status === 'Approved').length
  const pending  = deoReports.filter(r => r.status === 'Pending').length
  const rejected = deoReports.filter(r => r.status === 'Rejected').length
  const missing  = deoReports.filter(r => r.status === 'Missing').length

  const types = ['All', ...new Set(deoReports.map(r => r.type))]

  const filtered = deoReports.filter(r => {
    const statusOk = filter === 'All' || r.status === filter
    const typeOk   = typeFilter === 'All' || r.type === typeFilter
    return statusOk && typeOk
  })

  return (
    <div className="space-y-6 max-w-[1080px]">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Approved',  value: approved, color: '#16A34A', icon: CheckCircle },
          { label: 'Pending',   value: pending,  color: '#D97706', icon: Clock       },
          { label: 'Rejected',  value: rejected, color: '#A60003', icon: XCircle     },
          { label: 'Missing',   value: missing,  color: '#64748B', icon: AlertCircle },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all hover:shadow-md"
            onClick={() => setFilter(s.label)}
            style={{ background: filter === s.label ? `${s.color}10` : '#fff', border: `1px solid ${filter === s.label ? s.color : '#EEF0F3'}` }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
              <s.icon size={20} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['All', 'Approved', 'Pending', 'Rejected', 'Missing'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#6B7280', border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {types.map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{ background: typeFilter === f ? '#374151' : '#fff', color: typeFilter === f ? '#fff' : '#6B7280', border: `1px solid ${typeFilter === f ? '#374151' : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
              {['School', 'Report Type', 'Period', 'Submitted By', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr key={r.id} style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                <td className="px-4 py-3.5 text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.school}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.type}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.month}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {r.submittedBy || <span style={{ color: '#A60003' }}>Not submitted</span>}
                </td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {r.submittedAt || '—'}
                </td>
                <td className="px-4 py-3.5"><StatusBadge status={r.status} /></td>
                <td className="px-4 py-3.5">
                  {r.status === 'Pending' && (
                    <div className="flex gap-1.5">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'rgba(22,163,74,0.10)' }} title="Approve">
                        <Check size={13} color="#16A34A" strokeWidth={3} />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                        style={{ background: 'rgba(166,0,3,0.10)' }} title="Reject">
                        <X size={13} color="#A60003" strokeWidth={3} />
                      </button>
                    </div>
                  )}
                  {r.status === 'Rejected' && (
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'rgba(217,119,6,0.10)' }} title="Request Correction">
                      <RotateCcw size={13} color="#D97706" strokeWidth={2.5} />
                    </button>
                  )}
                  {r.status === 'Approved' && (
                    <button className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                      style={{ background: 'rgba(13,148,136,0.10)' }} title="Download">
                      <Download size={13} color={ACCENT} strokeWidth={2.5} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <FileText size={40} color="#D1D5DB" strokeWidth={1.5} />
            <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No reports match filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
