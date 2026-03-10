import { useState, useRef, useEffect } from 'react'
import {
  Bell, MessageSquare, ChevronDown, Search, LogOut, User, Settings,
  LayoutDashboard, School, GraduationCap, Users, BarChart2, FileText,
  Map, CheckSquare, UserRound,
} from 'lucide-react'
import NotificationDropdown from './NotificationDropdown'
import { notifications, messages } from '../data/mockData'

const CEO_PHOTO = 'https://randomuser.me/api/portraits/men/42.jpg'

const QUICK_LINKS = [
  { label: 'Overview',        group: 'Pages', icon: LayoutDashboard, page: 'dashboard' },
  { label: 'Districts',       group: 'Pages', icon: Map,             page: 'districts' },
  { label: 'Schools',         group: 'Pages', icon: School,          page: 'schools' },
  { label: 'School Approval', group: 'Pages', icon: CheckSquare,     page: 'school-approval' },
  { label: 'Students',        group: 'Pages', icon: GraduationCap,   page: 'students' },
  { label: 'Teachers',        group: 'Pages', icon: Users,           page: 'teachers' },
  { label: 'Parents',         group: 'Pages', icon: UserRound,       page: 'parents' },
  { label: 'Enrollment',      group: 'Pages', icon: BarChart2,       page: 'enrollment' },
  { label: 'Reports',         group: 'Management', icon: FileText,   page: 'reports' },
  { label: 'Settings',        group: 'Management', icon: Settings,   page: 'settings' },
]

export default function Header({ title, breadcrumb, setActivePage }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile,       setShowProfile]       = useState(false)
  const [showSearch,        setShowSearch]        = useState(false)
  const [searchQuery,       setSearchQuery]       = useState('')
  const [photoErr,          setPhotoErr]          = useState(false)

  const notifRef   = useRef(null)
  const profileRef = useRef(null)
  const searchRef  = useRef(null)

  const unreadNotifications = notifications.filter((n) => !n.read).length
  const unreadMessages      = messages.reduce((sum, m) => sum + m.unread, 0)

  const filteredLinks = QUICK_LINKS.filter(l =>
    searchQuery === '' || l.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const grouped = filteredLinks.reduce((acc, l) => {
    acc[l.group] = acc[l.group] || []
    acc[l.group].push(l)
    return acc
  }, {})

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current   && !notifRef.current.contains(e.target))   setShowNotifications(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
      if (searchRef.current  && !searchRef.current.contains(e.target))  { setShowSearch(false); setSearchQuery('') }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const Avatar = ({ size = 36, className = '' }) =>
    photoErr ? (
      <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${className}`}
        style={{ width: size, height: size, background: '#002333' }}>
        <span className="text-white font-bold" style={{ fontSize: size * 0.28, fontFamily: 'Sora, sans-serif' }}>JV</span>
      </div>
    ) : (
      <img src={CEO_PHOTO} alt="Jefferson Vobah"
        className={`rounded-full object-cover flex-shrink-0 ${className}`}
        style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
        onError={() => setPhotoErr(true)} />
    )

  return (
    <header className="h-20 bg-white flex items-center px-7 gap-4 sticky top-0 z-40 flex-shrink-0"
      style={{ borderBottom: '1px solid #EEF0F3' }}>

      {/* ── Left: Title & Breadcrumb ── */}
      <div className="flex-1 min-w-0">
        <h1 className="text-[18px] font-bold text-[#002333] leading-tight truncate"
          style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h1>
        <p className="text-xs text-[#6B7280] mt-0.5 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
          {breadcrumb}
        </p>
      </div>

      {/* ── Right: Actions ── */}
      <div className="flex items-center gap-2">

        {/* ── Search + Nav dropdown ── */}
        <div className="relative hidden lg:flex items-center gap-0" ref={searchRef}>
          {/* Search input */}
          <div className="flex items-center rounded-l-xl transition-all"
            style={{
              background: '#fff',
              borderTop: '1.5px solid #E2E8F0',
              borderLeft: '1.5px solid #E2E8F0',
              borderBottom: '1.5px solid #E2E8F0',
              borderRight: 'none',
              boxShadow: showSearch ? '0 0 0 3px rgba(3,103,160,0.08)' : 'none',
            }}>
            <Search size={15} strokeWidth={3} className="ml-3 flex-shrink-0" style={{ color: '#0F172A' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); if (!showSearch) setShowSearch(true) }}
              onFocus={() => { setShowSearch(false) }}
              placeholder="Search…"
              className="pl-2.5 py-[9px] text-sm outline-none bg-transparent w-40 text-[#002333] placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }}
            />
          </div>
          {/* Divider */}
          <div style={{ width: 1, height: 36, background: '#E2E8F0', flexShrink: 0 }} />
          {/* Nav dropdown arrow */}
          <button
            onClick={() => { setShowSearch(p => !p); setSearchQuery('') }}
            className="flex items-center justify-center px-2.5 py-[9px] rounded-r-xl transition-all"
            style={{
              background: showSearch ? '#EEF4FB' : '#fff',
              borderTop: '1.5px solid #E2E8F0',
              borderRight: '1.5px solid #E2E8F0',
              borderBottom: '1.5px solid #E2E8F0',
              borderLeft: 'none',
            }}>
            <ChevronDown size={14} strokeWidth={2.5} style={{ color: '#0367A0', transform: showSearch ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
          </button>

          {/* Navigation dropdown */}
          {showSearch && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-72 bg-white rounded-2xl overflow-hidden z-50"
              style={{ boxShadow: '0 12px 40px rgba(0,35,51,0.14)', border: '1px solid #EEF0F3' }}>
              <div className="px-4 pt-3 pb-2" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <p className="text-[11px] font-black text-[#002333] uppercase tracking-widest" style={{ fontFamily: 'Lato, sans-serif' }}>Quick Navigate</p>
              </div>
              {Object.entries(grouped).map(([group, links]) => (
                <div key={group}>
                  <p className="px-4 pt-2.5 pb-1 text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{group}</p>
                  {links.map(l => {
                    const Icon = l.icon
                    return (
                      <button key={l.page}
                        onClick={() => { setActivePage(l.page); setShowSearch(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                        onMouseEnter={e => { e.currentTarget.style.background = '#F4F6F8' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(3,103,160,0.08)' }}>
                          <Icon size={14} strokeWidth={2.5} style={{ color: '#0367A0' }} />
                        </div>
                        <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{l.label}</span>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          )}

          {/* Search results dropdown */}
          {searchQuery.trim() && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-72 bg-white rounded-2xl overflow-hidden z-50"
              style={{ boxShadow: '0 12px 40px rgba(0,35,51,0.14)', border: '1px solid #EEF0F3' }}>
              {filteredLinks.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-[#9CA3AF] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No results for "{searchQuery}"</p>
                </div>
              ) : (
                <>
                  <div className="px-4 pt-3 pb-2" style={{ borderBottom: '1px solid #F4F6F8' }}>
                    <p className="text-[11px] font-black text-[#002333] uppercase tracking-widest" style={{ fontFamily: 'Lato, sans-serif' }}>Results</p>
                  </div>
                  {filteredLinks.map(l => {
                    const Icon = l.icon
                    return (
                      <button key={l.page}
                        onClick={() => { setActivePage(l.page); setSearchQuery('') }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors text-left"
                        onMouseEnter={e => { e.currentTarget.style.background = '#F4F6F8' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(3,103,160,0.08)' }}>
                          <Icon size={14} strokeWidth={2.5} style={{ color: '#0367A0' }} />
                        </div>
                        <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{l.label}</span>
                      </button>
                    )
                  })}
                </>
              )}
            </div>
          )}
        </div>

        <div className="w-px h-8 bg-[#EEF0F3] mx-1" />

        {/* ── Notifications ── */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => { setShowNotifications(p => !p); setShowProfile(false) }}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F6F8] transition-colors">
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
        <button onClick={() => setActivePage('messages')}
          className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#F4F6F8] transition-colors">
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
          <button onClick={() => { setShowProfile(p => !p); setShowNotifications(false) }}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#F4F6F8] transition-colors">
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
              {[{ icon: User, label: 'My Profile' }, { icon: Settings, label: 'Account Settings' }].map(({ icon: Icon, label }) => (
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
