import { useState } from 'react'
import { studentNotifications } from '../../data/studentData'
import { Star, Bell, Info, BookOpen, MessageSquare, CheckCheck } from 'lucide-react'

const typeConfig = {
  grade:    { icon: Star,          label: 'Grade'    },
  alert:    { icon: Bell,          label: 'Alert'    },
  info:     { icon: Info,          label: 'Info'     },
  resource: { icon: BookOpen,      label: 'Resource' },
  message:  { icon: MessageSquare, label: 'Message'  },
}

export default function StudentNotifications() {
  const [items, setItems] = useState(studentNotifications)
  const unreadCount = items.filter(n => !n.read).length

  function markAllRead() {
    setItems(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id) {
    setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  return (
    <div className="space-y-6 max-w-[720px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Notifications</h2>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-black transition-opacity hover:opacity-80"
            style={{ background: '#002333', color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
            <CheckCheck size={15} strokeWidth={3} />
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.map(notif => {
          const cfg  = typeConfig[notif.type] || typeConfig.info
          const Icon = cfg.icon
          return (
            <div key={notif.id}
              className="bg-white rounded-2xl px-5 py-4 flex items-start gap-4 transition-all"
              style={{
                border: notif.read ? '2px solid #EEF0F3' : '2px solid rgba(0,35,51,0.18)',
                boxShadow: notif.read ? '0 1px 4px rgba(0,35,51,0.04)' : '0 2px 10px rgba(0,35,51,0.10)',
              }}>
              {/* Icon: always black, light blue bg */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(37,99,235,0.08)' }}>
                <Icon size={18} color="#002333" strokeWidth={3} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{notif.title}</p>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{notif.time}</span>
                    {!notif.read && (
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#A60003' }} />
                    )}
                  </div>
                </div>
                <p className="text-sm font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{notif.message}</p>
                {!notif.read && (
                  <button
                    onClick={() => markRead(notif.id)}
                    className="text-xs font-black mt-2 transition-opacity hover:opacity-70"
                    style={{ color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
