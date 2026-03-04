import { useState } from 'react'
import { UserCog, CheckCircle, AlertCircle, Clock, MessageSquare, Shield, RotateCcw } from 'lucide-react'
import { deoAdmins } from '../../data/deoData'

const ACCENT = '#0D9488'

function StatusBadge({ status }) {
  const cfg = {
    Active:    { bg: 'rgba(22,163,74,0.10)',  color: '#16A34A', icon: CheckCircle },
    Suspended: { bg: 'rgba(166,0,3,0.10)',    color: '#A60003', icon: AlertCircle },
    Pending:   { bg: 'rgba(217,119,6,0.10)',  color: '#D97706', icon: Clock },
  }[status] || { bg: '#F3F4F6', color: '#6B7280', icon: Clock }
  const Icon = cfg.icon
  return (
    <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>
      <Icon size={10} strokeWidth={3} />{status}
    </span>
  )
}

function ActivityLog({ admin }) {
  return (
    <div className="mt-3 space-y-1">
      {[
        { action: `Submitted ${admin.reports} report${admin.reports !== 1 ? 's' : ''} this month`, time: '2 days ago', ok: true },
        { action: `${admin.issues} open infrastructure issue${admin.issues !== 1 ? 's' : ''}`, time: 'Ongoing', ok: admin.issues === 0 },
        { action: `Last active: ${admin.lastActive}`, time: '', ok: admin.status === 'Active' },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-2 text-[11px] font-semibold"
          style={{ color: item.ok ? '#6B7280' : '#D97706', fontFamily: 'Roboto, sans-serif' }}>
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.ok ? '#16A34A' : '#D97706' }} />
          {item.action}
        </div>
      ))}
    </div>
  )
}

export default function DEOAdmins() {
  const [filter, setFilter] = useState('All')
  const filtered = filter === 'All' ? deoAdmins : deoAdmins.filter(a => a.status === filter)

  const activeCount    = deoAdmins.filter(a => a.status === 'Active').length
  const suspendedCount = deoAdmins.filter(a => a.status === 'Suspended').length

  return (
    <div className="space-y-6 max-w-[1080px]">

      {/* Summary Row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Admins',    value: deoAdmins.length,  color: ACCENT,    icon: UserCog     },
          { label: 'Active',          value: activeCount,        color: '#16A34A', icon: CheckCircle },
          { label: 'Suspended',       value: suspendedCount,     color: '#A60003', icon: AlertCircle },
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

      {/* Filter + List */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>School Admin Directory</h3>
          <div className="flex gap-2">
            {['All', 'Active', 'Suspended'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: filter === f ? ACCENT : 'transparent', color: filter === f ? '#fff' : '#9CA3AF', border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#F3F4F6]">
          {filtered.map(admin => (
            <div key={admin.id} className="px-6 py-5 flex items-start gap-4">
              <img
                src={`https://randomuser.me/api/portraits/${admin.gender}/${admin.photoId}.jpg`}
                alt={admin.name} className="rounded-xl flex-shrink-0 object-cover"
                style={{ width: 44, height: 44, border: '2px solid #EEF0F3' }}
                onError={e => { e.target.style.display = 'none' }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{admin.name}</p>
                    <p className="text-xs font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {admin.role} · {admin.school}
                    </p>
                    <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      ID: {admin.id} · Joined: {admin.joinDate}
                    </p>
                  </div>
                  <StatusBadge status={admin.status} />
                </div>
                <ActivityLog admin={admin} />
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F4F6F8]"
                  title="Message Admin">
                  <MessageSquare size={15} color="#6B7280" strokeWidth={2.5} />
                </button>
                {admin.status === 'Active' ? (
                  <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: 'rgba(166,0,3,0.07)' }} title="Suspend Admin">
                    <Shield size={15} color="#A60003" strokeWidth={2.5} />
                  </button>
                ) : (
                  <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                    style={{ background: 'rgba(22,163,74,0.07)' }} title="Reactivate Admin">
                    <RotateCcw size={15} color="#16A34A" strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
