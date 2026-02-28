import { useState } from 'react'
import { teacherNotifications } from '../../data/teacherData'
import { Upload, AlertCircle, MessageSquare, FolderOpen, Info, Star } from 'lucide-react'

const typeConfig = {
  submission: { icon: Upload,        color: '#2563EB', bg: 'rgba(37,99,235,0.08)'  },
  alert:      { icon: AlertCircle,   color: '#A60003', bg: 'rgba(166,0,3,0.08)'    },
  message:    { icon: MessageSquare, color: '#002333', bg: 'rgba(0,35,51,0.07)'    },
  resource:   { icon: FolderOpen,    color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  info:       { icon: Info,          color: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  grade:      { icon: Star,          color: '#16A34A', bg: 'rgba(22,163,74,0.08)'  },
}

export default function TeacherNotifications() {
  const [notifs, setNotifs] = useState(teacherNotifications)

  const unreadCount = notifs.filter(n => !n.read).length

  function markRead(id) {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="space-y-6 max-w-[760px]">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Notifications</h2>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-black text-white"
                style={{ background: '#A60003', fontFamily: 'Roboto, sans-serif' }}>{unreadCount}</span>
            )}
          </div>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Updates for your classes and school
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="text-sm font-black text-[#6B7280] hover:text-[#002333] transition-colors"
            style={{ fontFamily: 'Roboto, sans-serif' }}>
            Mark all read
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifs.map(n => {
          const cfg  = typeConfig[n.type] || typeConfig.info
          const Icon = cfg.icon
          return (
            <div key={n.id}
              className="bg-white rounded-2xl px-5 py-4 flex items-start gap-4 transition-all group relative"
              style={{
                border: '1px solid #EEF0F3',
                boxShadow: '0 1px 4px rgba(0,35,51,0.04)',
                borderLeft: !n.read ? '3px solid #A60003' : '1px solid #EEF0F3',
              }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: cfg.bg }}>
                <Icon size={18} color={cfg.color} strokeWidth={3} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{n.title}</p>
                <p className="text-sm font-semibold text-[#4B5563] mt-0.5 leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.message}</p>
                <p className="text-xs font-bold text-[#9CA3AF] mt-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.time}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {!n.read && (
                  <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#A60003' }} />
                )}
                {!n.read && (
                  <button onClick={() => markRead(n.id)}
                    className="text-[11px] font-black text-[#9CA3AF] hover:text-[#002333] opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>
                    Mark read
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
