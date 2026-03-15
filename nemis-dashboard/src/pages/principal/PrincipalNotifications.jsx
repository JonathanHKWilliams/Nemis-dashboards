import { useState } from 'react'
import { Bell, AlertTriangle, AlertCircle, CheckCircle, Info, Trash2 } from 'lucide-react'
import { principalNotifications } from '../../data/principalData'

const ACCENT = '#0367A0'

const TYPE_CFG = {
  warning: { icon: AlertTriangle, color: '#D97706', bg: 'rgba(217,119,6,0.07)',  border: 'rgba(217,119,6,0.18)',  label: 'Warning' },
  alert:   { icon: AlertCircle,   color: '#A60003', bg: 'rgba(166,0,3,0.07)',    border: 'rgba(166,0,3,0.18)',    label: 'Alert'   },
  info:    { icon: Info,          color: ACCENT,    bg: 'rgba(3,103,160,0.07)',  border: 'rgba(3,103,160,0.18)', label: 'Info'    },
  success: { icon: CheckCircle,   color: '#16A34A', bg: 'rgba(22,163,74,0.07)', border: 'rgba(22,163,74,0.18)', label: 'Success' },
}

const EXTRA_NOTIFS = [
  { id: 10, type: 'success', title: '1st Semester Exams Uploaded', message: 'All 18 class exam schedules have been successfully uploaded to the NEMIS portal.', time: '2 hours ago', read: true },
  { id: 11, type: 'info',    title: 'New Student Enrollment', message: 'A new student, Emmanuel Tokpah, has been enrolled in Grade 7B effective March 13, 2026.', time: '5 hours ago', read: true },
  { id: 12, type: 'warning', title: 'Teacher Absent Without Notice', message: 'Mr. David Flahn (Grade 9 Math) has not reported to school today. Cover arrangement may be needed.', time: 'Yesterday', read: true },
  { id: 13, type: 'alert',   title: 'Fee Deadline Approaching', message: '47 students have outstanding 1st Semester fees. Deadline is March 20, 2026.', time: 'Yesterday', read: true },
  { id: 14, type: 'success', title: 'Annual Inspection Passed', message: 'St. Mark\'s Demonstration School passed the Ministry annual inspection. Certificate issued.', time: '3 days ago', read: true },
  { id: 15, type: 'info',    title: 'DEO Visit Scheduled', message: 'District Education Officer Mr. George Pewee will visit the school on March 18, 2026 at 10:00 AM.', time: '3 days ago', read: true },
]

const ALL_NOTIFS = [
  ...principalNotifications.map(n => ({ ...n, read: !!n.read })),
  ...EXTRA_NOTIFS,
]

const FILTERS = ['All', 'Unread', 'Alert', 'Warning', 'Info', 'Success']

export default function PrincipalNotifications() {
  const [items, setItems]       = useState(ALL_NOTIFS)
  const [filter, setFilter]     = useState('All')

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })))
  const markRead    = id => setItems(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  const remove      = id => setItems(prev => prev.filter(n => n.id !== id))

  const filtered = items.filter(n => {
    if (filter === 'Unread') return !n.read
    if (filter === 'All')    return true
    return n.type === filter.toLowerCase()
  })

  const unreadCount = items.filter(n => !n.read).length

  return (
    <div className="max-w-[860px] space-y-4">

      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `rgba(3,103,160,0.10)` }}>
            <Bell size={20} style={{ color: ACCENT }} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Notifications</h2>
            <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up'}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="text-xs font-black px-4 py-2 rounded-xl transition-colors"
            style={{ background: `rgba(3,103,160,0.08)`, color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-black transition-all"
            style={{
              background: filter === f ? ACCENT : '#fff',
              color: filter === f ? '#fff' : '#6B7280',
              border: `1px solid ${filter === f ? ACCENT : '#EEF0F3'}`,
              fontFamily: 'Lato, sans-serif',
            }}>
            {f}
            {f === 'Unread' && unreadCount > 0 && (
              <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full font-black"
                style={{ background: filter === f ? 'rgba(255,255,255,0.25)' : '#A60003', color: '#fff' }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(3,103,160,0.08)' }}>
              <Bell size={26} style={{ color: ACCENT }} strokeWidth={2} />
            </div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>No notifications</p>
            <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>You're all caught up for this category</p>
          </div>
        ) : (
          <div className="divide-y divide-[#F4F6F8]">
            {filtered.map(notif => {
              const cfg  = TYPE_CFG[notif.type] || TYPE_CFG.info
              const Icon = cfg.icon
              return (
                <div key={notif.id}
                  className="flex items-start gap-4 px-5 py-4 transition-colors"
                  style={{ background: notif.read ? 'transparent' : 'rgba(3,103,160,0.025)' }}
                  onClick={() => markRead(notif.id)}>

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <Icon size={17} style={{ color: cfg.color }} strokeWidth={2.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Lato, sans-serif' }}>
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#A60003' }} />
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: cfg.bg, color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
                          {cfg.label}
                        </span>
                        <button onClick={e => { e.stopPropagation(); remove(notif.id) }}
                          className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                          style={{ color: '#9CA3AF' }}
                          onMouseEnter={e => e.currentTarget.style.color = '#A60003'}
                          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>
                          <Trash2 size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-[#6B7280] mt-1 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {notif.message}
                    </p>
                    <p className="text-[10px] font-semibold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {notif.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
