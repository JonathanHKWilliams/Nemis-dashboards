import { useState } from 'react'
import { Bell, AlertCircle, AlertTriangle, Info, CheckCircle, FileText } from 'lucide-react'
import { ministerNotifications } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const TYPE_CONFIG = {
  alert:   { icon: AlertCircle,  color: '#DC2626', bg: 'rgba(220,38,38,0.07)'  },
  warning: { icon: AlertTriangle,color: '#D97706', bg: 'rgba(217,119,6,0.07)'  },
  report:  { icon: FileText,     color: '#2563EB', bg: 'rgba(37,99,235,0.07)'  },
  info:    { icon: Info,         color: ACCENT,    bg: `${ACCENT}10`            },
  success: { icon: CheckCircle,  color: '#059669', bg: 'rgba(5,150,105,0.07)'  },
}

export default function MinisterNotifications() {
  const [filter, setFilter] = useState('All')
  const unread = ministerNotifications.filter(n => !n.read).length

  const filtered = filter === 'All'
    ? ministerNotifications
    : filter === 'Unread'
    ? ministerNotifications.filter(n => !n.read)
    : ministerNotifications.filter(n => n.type === filter.toLowerCase())

  return (
    <div className="space-y-6 max-w-[760px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Notifications</h2>
          <p className="text-xs font-semibold text-[#94A3B8] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {unread} unread notification{unread !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="text-xs font-black px-4 py-2 rounded-xl"
          style={{ color: ACCENT, background: `${ACCENT}0D`, fontFamily: 'Roboto, sans-serif' }}>
          Mark All as Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Unread', 'Alert', 'Warning', 'Report', 'Info', 'Success'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Notifications */}
      <div className="space-y-2">
        {filtered.map(notif => {
          const cfg = TYPE_CONFIG[notif.type] || TYPE_CONFIG.info
          const Icon = cfg.icon
          return (
            <div key={notif.id}
              className="rounded-2xl p-4 flex items-start gap-4 transition-all"
              style={{
                background: notif.read ? '#fff' : cfg.bg,
                border: `1px solid ${notif.read ? '#E2E8F0' : 'transparent'}`,
              }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: notif.read ? '#F4F6F8' : `${cfg.color}15` }}>
                <Icon size={16} style={{ color: cfg.color }} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{notif.title}</p>
                    {notif.county && notif.county !== 'National' && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ background: `${cfg.color}12`, color: cfg.color }}>{notif.county}</span>
                    )}
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: cfg.color }} />
                  )}
                </div>
                <p className="text-xs font-semibold text-[#64748B] mt-1 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {notif.message}
                </p>
                <p className="text-[10px] font-semibold text-[#94A3B8] mt-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {notif.time}
                </p>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl"
            style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <Bell size={40} color="#D1D5DB" strokeWidth={1.5} />
            <p className="text-sm font-bold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>No notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}
