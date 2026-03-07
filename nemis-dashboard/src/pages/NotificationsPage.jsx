import { useState } from 'react'
import {
  Bell, CheckSquare, FileText, AlertTriangle, Info,
  CheckCircle, Trash2, BellOff,
} from 'lucide-react'
import { notifications as allNotifications } from '../data/mockData'

const TABS = [
  { key: 'all',      label: 'All',       icon: Bell },
  { key: 'approval', label: 'Approvals', icon: CheckSquare },
  { key: 'report',   label: 'Reports',   icon: FileText },
  { key: 'alert',    label: 'Alerts',    icon: AlertTriangle },
  { key: 'system',   label: 'System',    icon: Info },
]

const typeConfig = {
  approval: { bg: '#F4F6F8', color: '#0F172A', icon: CheckSquare },
  report:   { bg: '#F4F6F8', color: '#0F172A', icon: FileText },
  alert:    { bg: '#F4F6F8', color: '#0F172A', icon: AlertTriangle },
  system:   { bg: '#F4F6F8', color: '#0F172A', icon: Info },
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [items, setItems] = useState(allNotifications)

  const markAllRead = () => setItems((p) => p.map((n) => ({ ...n, read: true })))
  const markRead    = (id) => setItems((p) => p.map((n) => n.id === id ? { ...n, read: true } : n))
  const remove      = (id) => setItems((p) => p.filter((n) => n.id !== id))

  const filtered = activeTab === 'all' ? items : items.filter((n) => n.type === activeTab)
  const tabCount = (key) => key === 'all' ? items.filter(n => !n.read).length : items.filter(n => n.type === key && !n.read).length

  return (
    <div className="space-y-5 max-w-[900px]">
      {/* Actions */}
      <div className="flex justify-end">
        <button
          onClick={markAllRead}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{
            background: 'rgba(0,35,51,0.06)',
            color: '#002333',
            fontFamily: 'Lato, sans-serif',
          }}
        >
          <CheckCircle size={14} strokeWidth={2.5} />
          Mark All Read
        </button>
      </div>

      {/* Tabs + Content */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
      >
        {/* Tab Bar */}
        <div
          className="flex items-center gap-1 px-4 pt-4 pb-0"
          style={{ borderBottom: '1px solid #F4F6F8' }}
        >
          {TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeTab === key
            const cnt = tabCount(key)
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-t-xl text-sm font-semibold transition-all relative"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  color: isActive ? '#002333' : '#6B7280',
                  background: isActive ? '#fff' : 'transparent',
                  borderBottom: isActive ? '2px solid #002333' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                <Icon size={14} strokeWidth={2.5} />
                {label}
                {cnt > 0 && (
                  <span
                    className="px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white"
                    style={{ background: '#A60003' }}
                  >
                    {cnt}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Notification List */}
        <div className="divide-y divide-[#F4F6F8]">
          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center gap-3">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(0,35,51,0.06)' }}
              >
                <BellOff size={24} strokeWidth={2.5} style={{ color: '#6B7280' }} />
              </div>
              <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                No notifications in this category
              </p>
            </div>
          )}
          {filtered.map((notif) => {
            const cfg = typeConfig[notif.type] || typeConfig.system
            const Icon = cfg.icon
            return (
              <div
                key={notif.id}
                className="flex items-start gap-4 px-6 py-4 transition-colors group"
                style={{ background: !notif.read ? 'rgba(72,208,140,0.03)' : 'transparent' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = !notif.read ? 'rgba(72,208,140,0.03)' : 'transparent' }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: cfg.bg }}
                >
                  <Icon size={16} strokeWidth={2.5} style={{ color: cfg.color }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-sm font-semibold text-[#002333]"
                        style={{ fontFamily: 'Sora, sans-serif' }}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: '#A60003' }}
                        />
                      )}
                    </div>
                    <span
                      className="text-xs font-medium text-[#6B7280] flex-shrink-0"
                      style={{ fontFamily: 'Lato, sans-serif' }}
                    >
                      {notif.time}
                    </span>
                  </div>
                  <p
                    className="text-sm font-medium text-[#4B5563] mt-0.5 leading-relaxed"
                    style={{ fontFamily: 'Lato, sans-serif' }}
                  >
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {!notif.read && (
                      <button
                        onClick={() => markRead(notif.id)}
                        className="text-xs font-medium text-[#6B7280] hover:text-[#002333] transition-colors"
                        style={{ fontFamily: 'Lato, sans-serif' }}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => remove(notif.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-[#A60003] hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        {filtered.length > 0 && (
          <div
            className="px-6 py-3 text-center"
            style={{ borderTop: '1px solid #F4F6F8', background: '#FAFBFC' }}
          >
            <p className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
              Showing {filtered.length} notification{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
