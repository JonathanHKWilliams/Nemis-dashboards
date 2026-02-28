import { useState } from 'react'
import { Star, ClipboardList, CalendarCheck, DollarSign, CreditCard, Bell } from 'lucide-react'
import { parentNotifications as INIT } from '../../data/parentData'

const ACCENT = '#C084FC'

const TYPE_CONFIG = {
  grade:      { icon: Star,          color: '#059669', bg: 'rgba(72,208,140,0.10)'  },
  attendance: { icon: CalendarCheck, color: '#1D4ED8', bg: 'rgba(96,165,250,0.10)'  },
  fee:        { icon: DollarSign,    color: '#A60003', bg: 'rgba(166,0,3,0.10)'      },
  assignment: { icon: ClipboardList, color: '#B45309', bg: 'rgba(245,158,11,0.10)'  },
  payment:    { icon: CreditCard,    color: '#059669', bg: 'rgba(72,208,140,0.10)'  },
}

export default function ParentNotifications() {
  const [notifs, setNotifs] = useState(INIT)

  const unreadCount = notifs.filter(n => !n.read).length

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-xs font-black px-2 py-0.5 rounded-full text-white"
                style={{ background: '#A60003' }}>{unreadCount}</span>
            )}
          </p>
          <p className="text-xs text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Family updates, grades, fees, and attendance
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="text-xs font-bold hover:underline" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
            Mark all read
          </button>
        )}
      </div>

      {/* Notification list */}
      <div className="space-y-2">
        {notifs.map(n => {
          const cfg = TYPE_CONFIG[n.type] || { icon: Bell, color: '#6B7280', bg: '#F4F6F8' }
          const Icon = cfg.icon
          return (
            <div key={n.id}
              onClick={() => markRead(n.id)}
              className="flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all"
              style={{
                background: '#fff',
                border: `1px solid ${n.read ? '#EEF0F3' : ACCENT}`,
                borderLeft: n.read ? '1px solid #EEF0F3' : `3px solid ${ACCENT}`,
                opacity: n.read ? 0.8 : 1,
              }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: cfg.bg }}>
                <Icon size={16} strokeWidth={2.5} style={{ color: cfg.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.text}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.detail}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!n.read && <span className="w-2 h-2 rounded-full" style={{ background: '#A60003' }} />}
                <span className="text-[10px] text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
