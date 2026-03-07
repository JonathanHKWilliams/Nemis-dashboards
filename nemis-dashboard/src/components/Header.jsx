import { useState, useRef, useEffect } from 'react'
import { Bell, MessageSquare, ChevronDown, Search, LogOut, User, Settings } from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import { notifications, messages } from '../data/mockData'

const CEO_PHOTO = 'https://randomuser.me/api/portraits/men/42.jpg'

export default function Header({ title, breadcrumb, setActivePage }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [photoErr, setPhotoErr] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  const unreadNotifications = notifications.filter((n) => !n.read).length
  const unreadMessages = messages.reduce((sum, m) => sum + m.unread, 0)

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const Avatar = ({ size = 36, className = '' }) =>
    photoErr ? (
      <div
        className={`rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
        style={{ width: size, height: size, background: '#002333' }}
      >
        <span className="text-white font-bold" style={{ fontSize: size * 0.28, fontFamily: 'Sora, sans-serif' }}>JV</span>
      </div>
    ) : (
      <img
        src={CEO_PHOTO}
        alt="Jefferson Vobah"
        className={`rounded-full object-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
        onError={() => setPhotoErr(true)}
      />
    )

  return (
    <header
      className="h-20 bg-white flex items-center px-7 gap-4 sticky top-0 z-40 flex-shrink-0"
      style={{ borderBottom: '1px solid #EEF0F3' }}
    >
      {/* ── Left: Title & Breadcrumb ── */}
      <div className="flex-1 min-w-0">
        <h1
          className="text-[18px] font-bold text-[#002333] leading-tight truncate"
          style={{ fontFamily: 'Sora, sans-serif' }}
        >
          {title}
        </h1>
        <p className="text-xs text-[#6B7280] mt-0.5 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
          {breadcrumb}
        </p>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="relative hidden lg:flex items-center">
          <Search size={14} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          <input
            type="text"
            placeholder="Quick search…"
            className="pl-9 pr-4 py-[7px] text-sm bg-[#F4F6F8] rounded-lg outline-none w-52 text-[#374151] placeholder:text-[#9CA3AF]"
            style={{ fontFamily: 'Lato, sans-serif' }}
          />
        </div>

        <div className="w-px h-8 bg-[#EEF0F3] mx-1" />

        {/* ── Notifications ── */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotifications((p) => !p); setShowProfile(false) }}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F6F8] transition-colors"
          >
            <Bell size={20} strokeWidth={2.5} className="text-[#002333]" />
            {unreadNotifications > 0 && (
              <span className="absolute top-[7px] right-[7px] w-[17px] h-[17px] bg-[#A60003] rounded-full flex items-center justify-center text-white leading-none"
                style={{ fontSize: 9, fontFamily: 'Lato, sans-serif', fontWeight: 800 }}>
                {unreadNotifications}
              </span>
            )}
          </button>
          {showNotifications && (
            <NotificationDropdown notifications={notifications} onClose={() => setShowNotifications(false)} />
          )}
        </div>

        {/* ── Messages ── */}
        <button
          onClick={() => setActivePage('messages')}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F6F8] transition-colors"
        >
          <MessageSquare size={20} strokeWidth={2.5} className="text-[#002333]" />
          {unreadMessages > 0 && (
            <span className="absolute top-[7px] right-[7px] w-[17px] h-[17px] bg-[#0367A0] rounded-full flex items-center justify-center text-white leading-none"
              style={{ fontSize: 9, fontFamily: 'Lato, sans-serif', fontWeight: 800 }}>
              {unreadMessages}
            </span>
          )}
        </button>

{/* ── CEO Profile ── */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile((p) => !p); setShowNotifications(false) }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#F4F6F8] transition-colors"
          >
            <Avatar size={36} />
            <div className="hidden lg:block text-left">
              <p className="text-[13px] font-bold text-[#002333] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                Mr. Jefferson Vobah
              </p>
              <p className="text-[11px] text-[#6B7280] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                County Education Officer
              </p>
            </div>
            <ChevronDown size={14} strokeWidth={2.5} className="text-[#6B7280] transition-transform duration-200"
              style={{ transform: showProfile ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-[52px] w-60 bg-white rounded-2xl overflow-hidden z-50"
              style={{ boxShadow: '0 8px 40px rgba(0,35,51,0.14)', border: '1px solid #EEF0F3' }}>
              <div className="px-5 py-4 border-b border-[#F4F6F8]">
                <div className="flex items-center gap-3">
                  <Avatar size={44} />
                  <div>
                    <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Mr. Jefferson Vobah</p>
                    <p className="text-xs text-[#6B7280] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>County Education Officer</p>
                  </div>
                </div>
              </div>
              {[
                { icon: User, label: 'My Profile' },
                { icon: Settings, label: 'Account Settings' },
              ].map(({ icon: Icon, label }) => (
                <button key={label}
                  className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#4B5563] hover:bg-[#F4F6F8] transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif' }}>
                  <Icon size={15} strokeWidth={2.5} className="text-[#6B7280]" />
                  {label}
                </button>
              ))}
              <div className="border-t border-[#F4F6F8]" />
              <button className="w-full flex items-center gap-3 px-5 py-3 text-sm font-medium text-[#A60003] hover:bg-red-50 transition-colors"
                style={{ fontFamily: 'Lato, sans-serif' }}>
                <LogOut size={15} strokeWidth={2.5} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
