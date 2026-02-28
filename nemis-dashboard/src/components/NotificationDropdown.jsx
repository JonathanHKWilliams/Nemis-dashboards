import { Bell, CheckSquare, FileText, AlertTriangle, Info, X } from 'lucide-react'

const iconMap = {
  approval: CheckSquare,
  report: FileText,
  alert: AlertTriangle,
  system: Info,
}

const colorMap = {
  approval: { bg: 'rgba(72,208,140,0.12)', color: '#48D08C' },
  report: { bg: 'rgba(0,35,51,0.08)', color: '#002333' },
  alert: { bg: 'rgba(166,0,3,0.1)', color: '#A60003' },
  system: { bg: 'rgba(59,130,246,0.1)', color: '#3B82F6' },
}

export default function NotificationDropdown({ notifications, onClose }) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div
      className="absolute right-0 top-12 w-[340px] bg-white rounded-2xl z-50 overflow-hidden"
      style={{ boxShadow: '0 8px 40px rgba(0,35,51,0.16)', border: '1px solid #F0F2F4' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#F4F6F8]">
        <div className="flex items-center gap-2.5">
          <Bell size={15} className="text-[#002333]" />
          <span className="font-semibold text-sm text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Notifications
          </span>
          {unreadCount > 0 && (
            <span
              className="px-2 py-0.5 text-white text-[11px] font-bold rounded-full"
              style={{ background: '#A60003', fontFamily: 'Roboto, sans-serif' }}
            >
              {unreadCount} new
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-[#F4F6F8] transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-[#F4F6F8] max-h-[360px] overflow-y-auto">
        {notifications.map((notif) => {
          const Icon = iconMap[notif.type]
          const { bg, color } = colorMap[notif.type] || colorMap.system

          return (
            <div
              key={notif.id}
              className="flex gap-3 px-5 py-3.5 cursor-pointer transition-colors hover:bg-[#F4F6F8]/70"
              style={{ background: !notif.read ? 'rgba(72,208,140,0.04)' : undefined }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}
              >
                <Icon size={14} style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p
                    className="text-[13px] font-semibold text-[#002333] leading-snug"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-[#A60003] flex-shrink-0 mt-1.5" />
                  )}
                </div>
                <p
                  className="text-xs text-gray-500 mt-0.5 leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {notif.message}
                </p>
                <p className="text-[11px] text-gray-400 mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {notif.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-[#F4F6F8] bg-[#F4F6F8]/40">
        <button
          className="w-full text-center text-[13px] font-medium text-[#002333] hover:text-[#48D08C] transition-colors"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          View All Notifications →
        </button>
      </div>
    </div>
  )
}
