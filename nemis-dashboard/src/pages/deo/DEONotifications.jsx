import { useState } from 'react'
import { Bell, AlertCircle, AlertTriangle, Info, CheckCircle, FileText } from 'lucide-react'
import { deoNotifications } from '../../data/deoData'

const ACCENT = '#0D9488'

const TYPE_CONFIG = {
  alert:   { icon: AlertCircle,  color: '#A60003', bg: 'rgba(166,0,3,0.07)'    },
  warning: { icon: AlertTriangle,color: '#D97706', bg: 'rgba(217,119,6,0.07)'  },
  report:  { icon: FileText,     color: '#2563EB', bg: 'rgba(37,99,235,0.07)'  },
  info:    { icon: Info,         color: ACCENT,    bg: 'rgba(13,148,136,0.07)' },
  success: { icon: CheckCircle,  color: '#16A34A', bg: 'rgba(22,163,74,0.07)'  },
}

export default function DEONotifications() {
  const [filter, setFilter] = useState('All')
  const unread = deoNotifications.filter(n => !n.read).length

  const filtered = filter === 'All'
    ? deoNotifications
    : filter === 'Unread'
    ? deoNotifications.filter(n => !n.read)
    : deoNotifications.filter(n => n.type === filter.toLowerCase())

  return (
    <div className="space-y-6 max-w-[760px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Notifications</h2>
          <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {unread} unread notification{unread !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="text-xs font-black px-4 py-2 rounded-xl transition-colors"
          style={{ color: ACCENT, background: 'rgba(13,148,136,0.08)', fontFamily: 'Roboto, sans-serif' }}>
          Mark All as Read
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Unread', 'Alert', 'Warning', 'Report', 'Info', 'Success'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#6B7280', border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`, fontFamily: 'Roboto, sans-serif' }}>
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
                border: `1px solid ${notif.read ? '#EEF0F3' : 'transparent'}`,
              }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: notif.read ? '#F4F6F8' : `${cfg.color}15` }}>
                <Icon size={16} style={{ color: cfg.color }} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{notif.title}</p>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ background: cfg.color }} />
                  )}
                </div>
                <p className="text-xs font-semibold text-[#6B7280] mt-1 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {notif.message}
                </p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {notif.time}
                </p>
              </div>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 rounded-2xl"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <Bell size={40} color="#D1D5DB" strokeWidth={1.5} />
            <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No notifications</p>
          </div>
        )}
      </div>
    </div>
  )
}
