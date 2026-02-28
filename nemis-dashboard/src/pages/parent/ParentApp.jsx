import { useState } from 'react'
import {
  LayoutDashboard, Users, GraduationCap, CalendarCheck, ClipboardList,
  DollarSign, CreditCard, FolderOpen, MessageSquare, Bell, Settings,
  ChevronUp, ShieldCheck,
} from 'lucide-react'
import { parentProfile, parentMessages, parentNotifications, children } from '../../data/parentData'

import ParentDashboard    from './ParentDashboard'
import ParentChildren     from './ParentChildren'
import ParentAcademics    from './ParentAcademics'
import ParentAttendance   from './ParentAttendance'
import ParentAssignments  from './ParentAssignments'
import ParentFees         from './ParentFees'
import ParentPayments     from './ParentPayments'
import ParentResources    from './ParentResources'
import ParentMessages     from './ParentMessages'
import ParentNotifications from './ParentNotifications'
import ParentSettings     from './ParentSettings'

const ACCENT = '#C084FC'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard',   icon: LayoutDashboard },
      { id: 'children',  label: 'My Children', icon: Users           },
    ],
  },
  {
    label: 'Academics',
    items: [
      { id: 'academics',    label: 'Academics',    icon: GraduationCap  },
      { id: 'attendance',   label: 'Attendance',   icon: CalendarCheck  },
      { id: 'assignments',  label: 'Assignments',  icon: ClipboardList  },
    ],
  },
  {
    label: 'Finance',
    items: [
      { id: 'fees',     label: 'School Fees', icon: DollarSign },
      { id: 'payments', label: 'Payments',    icon: CreditCard },
    ],
  },
  {
    label: 'Resources',
    items: [
      { id: 'resources', label: 'Resources', icon: FolderOpen },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id: 'messages',      label: 'Messages',      icon: MessageSquare },
      { id: 'notifications', label: 'Notifications', icon: Bell          },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
]

const PAGE_TITLES = {
  dashboard:     'Dashboard',
  children:      'My Children',
  academics:     'Academics',
  attendance:    'Attendance',
  assignments:   'Assignments',
  fees:          'School Fees',
  payments:      'Payments',
  resources:     'Resources',
  messages:      'Messages',
  notifications: 'Notifications',
  settings:      'Settings',
}

const DASHBOARD_OPTIONS = [
  { mode: 'ceo',     label: 'Admin / CEO', icon: ShieldCheck,    color: '#48D08C' },
  { mode: 'teacher', label: 'Teacher',      icon: Users,          color: '#60A5FA' },
  { mode: 'student', label: 'Student',      icon: GraduationCap,  color: '#F59E0B' },
  { mode: 'parent',  label: 'Parent',       icon: Users,          color: ACCENT    },
]

function DashboardSwitcher({ onSwitch }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-3 flex-shrink-0 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl overflow-hidden"
          style={{ background: '#001A27', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 -8px 24px rgba(0,0,0,0.35)' }}>
          {DASHBOARD_OPTIONS.map(opt => {
            const Icon = opt.icon
            const isActive = opt.mode === 'parent'
            return (
              <button key={opt.mode}
                onClick={() => { setOpen(false); if (!isActive) onSwitch(opt.mode) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors"
                style={{ background: isActive ? `rgba(192,132,252,0.10)` : 'transparent' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                <Icon size={15} strokeWidth={2.5} style={{ color: opt.color, flexShrink: 0 }} />
                <span className="text-sm font-semibold flex-1 text-left"
                  style={{ color: isActive ? opt.color : 'rgba(255,255,255,0.75)', fontFamily: 'Roboto, sans-serif' }}>
                  {opt.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(192,132,252,0.18)', color: opt.color, fontFamily: 'Roboto, sans-serif' }}>
                    ACTIVE
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all"
        style={{ background: open ? `rgba(192,132,252,0.15)` : `rgba(192,132,252,0.08)`, color: ACCENT }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = `rgba(192,132,252,0.14)` }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = `rgba(192,132,252,0.08)` }}>
        <Users size={16} strokeWidth={2.5} />
        <span className="text-sm font-semibold flex-1 text-left" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Parent Portal
        </span>
        <ChevronUp size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}

function ParentSidebar({ activePage, setActivePage, onSwitch }) {
  const unreadMessages = parentMessages.filter(m => m.unread > 0).length
  const unreadNotifs   = parentNotifications.filter(n => !n.read).length
  const totalBalance   = children.reduce((s, c) => s + c.balance, 0)

  return (
    <div className="fixed top-0 left-0 h-full flex flex-col z-30"
      style={{ width: 240, background: '#002333' }}>

      {/* Brand */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: ACCENT }}>
          <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>N</span>
        </div>
        <div>
          <p className="text-sm font-black text-white leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>NEMIS</p>
          <p className="text-[10px] mt-0.5 font-semibold" style={{ color: 'rgba(192,132,252,0.85)', fontFamily: 'Roboto, sans-serif' }}>Parent Portal</p>
        </div>
      </div>

      {/* Parent profile strip */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img
          src={`https://randomuser.me/api/portraits/${parentProfile.gender}/${parentProfile.photoId}.jpg`}
          alt={parentProfile.name} className="rounded-full flex-shrink-0"
          style={{ width: 36, height: 36, border: `1.5px solid rgba(192,132,252,0.5)` }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="min-w-0">
          <p className="text-xs font-black text-white truncate leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
            {parentProfile.firstName}
          </p>
          <p className="text-[10px] font-semibold truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>
            {children.length} children · {totalBalance > 0 ? `$${totalBalance} due` : 'All paid'}
          </p>
        </div>
      </div>

      {/* Sectional Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label} className={si > 0 ? 'mt-1' : ''}>
            <p className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.30)', fontFamily: 'Roboto, sans-serif' }}>
              {section.label}
            </p>
            {section.items.map(item => {
              const Icon   = item.icon
              const active = activePage === item.id
              const badge  = item.id === 'messages' ? unreadMessages : item.id === 'notifications' ? unreadNotifs : 0
              const feeBadge = (item.id === 'fees' || item.id === 'payments') && totalBalance > 0
              return (
                <button key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all relative"
                  style={{
                    background: active ? `rgba(192,132,252,0.12)` : 'transparent',
                    color: active ? ACCENT : 'rgba(255,255,255,0.62)',
                  }}>
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                      style={{ background: ACCENT }} />
                  )}
                  <Icon size={16} strokeWidth={active ? 3 : 2.5} />
                  <span className="text-[13px] font-bold flex-1 text-left" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {item.label}
                  </span>
                  {badge > 0 && (
                    <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                      style={{ background: '#A60003' }}>{badge}</span>
                  )}
                  {feeBadge && badge === 0 && (
                    <span className="w-2 h-2 rounded-full" style={{ background: '#A60003' }} />
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <DashboardSwitcher onSwitch={onSwitch} />
    </div>
  )
}

function ParentHeader({ activePage, setActivePage }) {
  const unreadNotifs   = parentNotifications.filter(n => !n.read).length
  const unreadMessages = parentMessages.filter(m => m.unread > 0).length

  return (
    <div className="flex-shrink-0 flex items-center justify-between px-7"
      style={{ height: 68, background: '#fff', borderBottom: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
      <div>
        <h1 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </h1>
        <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Parent Portal · Monitoring {children.length} children
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setActivePage('notifications')}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F4F6F8]">
          <Bell size={18} color="#4B5563" strokeWidth={2.5} />
          {unreadNotifs > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#A60003' }}>{unreadNotifs}</span>
          )}
        </button>
        <button onClick={() => setActivePage('messages')}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F4F6F8]">
          <MessageSquare size={18} color="#4B5563" strokeWidth={2.5} />
          {unreadMessages > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#A60003' }}>{unreadMessages}</span>
          )}
        </button>
        <div className="w-px h-6" style={{ background: '#EEF0F3' }} />
        <button onClick={() => setActivePage('settings')}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#F4F6F8]">
          <img
            src={`https://randomuser.me/api/portraits/${parentProfile.gender}/${parentProfile.photoId}.jpg`}
            alt={parentProfile.name} className="rounded-full object-cover"
            style={{ width: 34, height: 34, border: '2px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-black text-[#002333] leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
              {parentProfile.firstName}
            </p>
            <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Parent
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function ParentApp({ onSwitch }) {
  const [activePage, setActivePage]     = useState('dashboard')
  const [selectedChild, setSelectedChild] = useState(children[0].id)

  // Pages that need child context props
  const childProps = { selectedChild, setSelectedChild }

  function renderPage(page) {
    switch (page) {
      case 'dashboard':     return <ParentDashboard    {...childProps} setActivePage={setActivePage} />
      case 'children':      return <ParentChildren     {...childProps} setActivePage={setActivePage} />
      case 'academics':     return <ParentAcademics    {...childProps} />
      case 'attendance':    return <ParentAttendance   {...childProps} />
      case 'assignments':   return <ParentAssignments  {...childProps} />
      case 'fees':          return <ParentFees         {...childProps} setActivePage={setActivePage} />
      case 'payments':      return <ParentPayments />
      case 'resources':     return <ParentResources    {...childProps} />
      case 'messages':      return <ParentMessages />
      case 'notifications': return <ParentNotifications />
      case 'settings':      return <ParentSettings />
      default:              return <ParentDashboard    {...childProps} setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F6F8' }}>
      <ParentSidebar activePage={activePage} setActivePage={setActivePage} onSwitch={onSwitch} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: 240 }}>
        <ParentHeader activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto"
          style={{ padding: activePage === 'messages' ? '20px 24px' : '24px 28px' }}>
          {renderPage(activePage)}
        </main>
      </div>
    </div>
  )
}
