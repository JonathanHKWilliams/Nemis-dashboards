import { useState } from 'react'
import { Wrench, AlertCircle, AlertTriangle, Clock, CheckCircle, ArrowUpCircle, X } from 'lucide-react'
import { deoIssues } from '../../data/deoData'

const ACCENT = '#0D9488'

function SeverityBadge({ severity }) {
  const cfg = {
    Critical: { bg: 'rgba(166,0,3,0.10)',  color: '#A60003', icon: AlertCircle  },
    High:     { bg: 'rgba(217,119,6,0.10)', color: '#D97706', icon: AlertTriangle },
    Medium:   { bg: 'rgba(2,132,199,0.10)', color: '#0284C7', icon: Clock        },
    Low:      { bg: 'rgba(22,163,74,0.10)', color: '#16A34A', icon: CheckCircle  },
  }[severity] || { bg: '#F3F4F6', color: '#6B7280', icon: Clock }
  const Icon = cfg.icon
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon size={10} strokeWidth={3} />{severity}
    </span>
  )
}

function StatusPill({ status }) {
  const cfg = {
    'Escalated to CEO': { bg: 'rgba(166,0,3,0.10)',   color: '#A60003' },
    'Under Review':     { bg: 'rgba(217,119,6,0.10)', color: '#D97706' },
    Open:               { bg: 'rgba(100,116,139,0.10)', color: '#64748B' },
    Closed:             { bg: 'rgba(22,163,74,0.10)', color: '#16A34A' },
  }[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
  )
}

const CATEGORY_ICONS = {
  Facility:      Wrench,
  'Staff Shortage': AlertCircle,
  Security:      AlertTriangle,
  Resources:     Clock,
}

export default function DEOInfrastructure() {
  const [filter, setFilter] = useState('All')

  const critical = deoIssues.filter(i => i.severity === 'Critical').length
  const open     = deoIssues.filter(i => i.status === 'Open').length
  const escalated = deoIssues.filter(i => i.status === 'Escalated to CEO').length

  const filtered = filter === 'All'
    ? deoIssues
    : deoIssues.filter(i => i.severity === filter || i.status === filter || i.category === filter)

  return (
    <div className="space-y-6 max-w-[1080px]">

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Issues',    value: deoIssues.length, color: ACCENT,    icon: Wrench       },
          { label: 'Critical',        value: critical,          color: '#A60003', icon: AlertCircle  },
          { label: 'Open / Unassigned',value: open,             color: '#64748B', icon: Clock        },
          { label: 'Escalated',        value: escalated,        color: '#D97706', icon: ArrowUpCircle},
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
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

      {/* Filter Bar */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Critical', 'High', 'Medium', 'Open', 'Under Review', 'Escalated to CEO', 'Facility', 'Security', 'Staff Shortage', 'Resources'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#6B7280', border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filtered.map(issue => {
          const CatIcon = CATEGORY_ICONS[issue.category] || Wrench
          return (
            <div key={issue.id} className="rounded-2xl p-5"
              style={{ background: '#fff', border: `1px solid ${issue.severity === 'Critical' ? 'rgba(166,0,3,0.15)' : '#EEF0F3'}` }}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: issue.severity === 'Critical' ? 'rgba(166,0,3,0.08)' : issue.severity === 'High' ? 'rgba(217,119,6,0.08)' : 'rgba(2,132,199,0.08)' }}>
                  <CatIcon size={18} style={{ color: issue.severity === 'Critical' ? '#A60003' : issue.severity === 'High' ? '#D97706' : '#0284C7' }} strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{issue.title}</p>
                      <p className="text-xs font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {issue.school} · {issue.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <SeverityBadge severity={issue.severity} />
                      <StatusPill status={issue.status} />
                    </div>
                  </div>

                  {issue.notes && (
                    <p className="text-xs font-semibold mt-2 px-3 py-2 rounded-lg"
                      style={{ color: '#374151', background: '#F9FAFB', fontFamily: 'Roboto, sans-serif' }}>
                      Note: {issue.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-4">
                      <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        Reported: {issue.reportedAt}
                      </p>
                      {issue.assignedTo && (
                        <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                          Assigned to: {issue.assignedTo}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {issue.status === 'Open' && (
                        <>
                          <button className="px-3 py-1.5 rounded-lg text-[11px] font-black transition-colors"
                            style={{ background: 'rgba(217,119,6,0.10)', color: '#D97706' }}>
                            Mark Under Review
                          </button>
                          <button className="px-3 py-1.5 rounded-lg text-[11px] font-black transition-colors"
                            style={{ background: 'rgba(166,0,3,0.10)', color: '#A60003' }}>
                            Escalate to CEO
                          </button>
                        </>
                      )}
                      {issue.status === 'Under Review' && (
                        <button className="px-3 py-1.5 rounded-lg text-[11px] font-black transition-colors"
                          style={{ background: 'rgba(22,163,74,0.10)', color: '#16A34A' }}>
                          Close Issue
                        </button>
                      )}
                      {issue.status === 'Escalated to CEO' && (
                        <span className="px-3 py-1.5 rounded-lg text-[11px] font-black"
                          style={{ background: 'rgba(166,0,3,0.06)', color: '#A60003' }}>
                          Awaiting CEO Response
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <CheckCircle size={40} color="#D1D5DB" strokeWidth={1.5} />
            <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No issues found</p>
          </div>
        )}
      </div>
    </div>
  )
}
