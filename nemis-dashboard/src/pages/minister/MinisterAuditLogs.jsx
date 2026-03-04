import { useState } from 'react'
import { Search, Shield, FileText, Settings, AlertCircle, User } from 'lucide-react'
import { auditLogs } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const ROLE_COLOR = {
  Minister: '#4F46E5',
  CEO:      '#2563EB',
  DEO:      '#0D9488',
  System:   '#64748B',
}

function getActionIcon(action) {
  if (action.toLowerCase().includes('report')) return FileText
  if (action.toLowerCase().includes('policy')) return Settings
  if (action.toLowerCase().includes('emergency') || action.toLowerCase().includes('flagged')) return AlertCircle
  if (action.toLowerCase().includes('user') || action.toLowerCase().includes('suspended')) return User
  return Shield
}

export default function MinisterAuditLogs() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')

  const roles = ['All', ...new Set(auditLogs.map(l => l.role))]

  const filtered = auditLogs.filter(l => {
    const q = search.toLowerCase()
    const matchQ = !q || l.user.toLowerCase().includes(q) || l.action.toLowerCase().includes(q) || l.county.toLowerCase().includes(q)
    const matchRole = roleFilter === 'All' || l.role === roleFilter
    return matchQ && matchRole
  })

  return (
    <div className="space-y-5 max-w-[1100px]">
      {/* Header banner */}
      <div className="rounded-2xl p-5 flex items-start gap-4" style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}18` }}>
        <Shield size={20} color={ACCENT} strokeWidth={2.5} />
        <div>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>System Audit Log</p>
          <p className="text-xs font-semibold text-[#64748B] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            All system actions are logged for accountability and compliance. Logs are tamper-proof and retained for 5 years.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Entries',   value: auditLogs.length },
          { label: 'Minister Actions',value: auditLogs.filter(l => l.role === 'Minister').length },
          { label: 'CEO Actions',     value: auditLogs.filter(l => l.role === 'CEO').length },
          { label: 'System Actions',  value: auditLogs.filter(l => l.role === 'System').length },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
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
            placeholder="Search by user, action, county..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {roles.map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: roleFilter === r ? ACCENT : '#fff', color: roleFilter === r ? '#fff' : '#64748B', border: `1px solid ${roleFilter === r ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Log Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['Action', 'User', 'Role', 'County', 'Target', 'IP Address', 'Timestamp'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => {
              const Icon = getActionIcon(log.action)
              const roleColor = ROLE_COLOR[log.role] || '#64748B'
              return (
                <tr key={log.id} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${roleColor}12` }}>
                        <Icon size={13} color={roleColor} strokeWidth={2.5} />
                      </div>
                      <p className="text-xs font-black text-[#0F172A] max-w-[180px] truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{log.action}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#0F172A]">{log.user}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-black px-2 py-1 rounded-full"
                      style={{ background: `${roleColor}12`, color: roleColor }}>{log.role}</span>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{log.county}</td>
                  <td className="px-4 py-3.5 text-[10px] font-mono text-[#94A3B8]">{log.target}</td>
                  <td className="px-4 py-3.5 text-[10px] font-mono text-[#94A3B8]">{log.ip}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#94A3B8]">{log.time}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
