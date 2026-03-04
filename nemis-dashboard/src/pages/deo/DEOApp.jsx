import { useState } from 'react'
import {
  LayoutDashboard, School, UserCog, Users, GraduationCap,
  FileText, Wrench, DollarSign, MessageSquare, Bell, Settings,
  ChevronUp, ShieldCheck, Building2, Crown,
} from 'lucide-react'
import { deoProfile, deoMessages, deoNotifications } from '../../data/deoData'

import DEODashboard      from './DEODashboard'
import DEOSchools        from './DEOSchools'
import DEOAdmins         from './DEOAdmins'
import DEOTeachers       from './DEOTeachers'
import DEOStudents       from './DEOStudents'
import DEOReports        from './DEOReports'
import DEOInfrastructure from './DEOInfrastructure'
import DEOFinance        from './DEOFinance'
import DEOCommunications from './DEOCommunications'
import DEONotifications  from './DEONotifications'
import DEOSettings       from './DEOSettings'

const ACCENT = '#0D9488'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'District',
    items: [
      { id: 'schools',  label: 'Schools',        icon: School   },
      { id: 'admins',   label: 'School Admins',  icon: UserCog  },
      { id: 'teachers', label: 'Teachers',        icon: Users    },
      { id: 'students', label: 'Students & Enrollment', icon: GraduationCap },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'reports',        label: 'Reports & Compliance', icon: FileText    },
      { id: 'infrastructure', label: 'Infrastructure',       icon: Wrench      },
      { id: 'finance',        label: 'Finance',              icon: DollarSign  },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id: 'communications', label: 'Communications',  icon: MessageSquare },
      { id: 'notifications',  label: 'Notifications',   icon: Bell          },
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
  dashboard:      'Dashboard Overview',
  schools:        'Schools Management',
  admins:         'School Admins',
  teachers:       'Teacher Monitoring',
  students:       'Students & Enrollment',
  reports:        'Reports & Compliance',
  infrastructure: 'Infrastructure & Issues',
  finance:        'Finance Monitoring',
  communications: 'Communications',
  notifications:  'Notifications',
  settings:       'Settings',
}

const DASHBOARD_OPTIONS = [
  { mode: 'minister',label: 'Minister',     icon: Crown,         color: '#4F46E5' },
  { mode: 'ceo',     label: 'Admin / CEO',  icon: ShieldCheck,   color: '#48D08C' },
  { mode: 'deo',     label: 'DEO Portal',   icon: Building2,     color: ACCENT    },
  { mode: 'teacher', label: 'Teacher',       icon: Users,         color: '#60A5FA' },
  { mode: 'student', label: 'Student',       icon: GraduationCap, color: '#F59E0B' },
  { mode: 'parent',  label: 'Parent',        icon: Users,         color: '#C084FC' },
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
            const isActive = opt.mode === 'deo'
            return (
              <button key={opt.mode}
                onClick={() => { setOpen(false); if (!isActive) onSwitch(opt.mode) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors"
                style={{ background: isActive ? `rgba(13,148,136,0.12)` : 'transparent' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                <Icon size={15} strokeWidth={2.5} style={{ color: opt.color, flexShrink: 0 }} />
                <span className="text-sm font-semibold flex-1 text-left"
                  style={{ color: isActive ? opt.color : 'rgba(255,255,255,0.75)', fontFamily: 'Roboto, sans-serif' }}>
                  {opt.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(13,148,136,0.20)', color: opt.color, fontFamily: 'Roboto, sans-serif' }}>
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
        style={{ background: open ? 'rgba(13,148,136,0.18)' : 'rgba(13,148,136,0.10)', color: ACCENT }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(13,148,136,0.16)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'rgba(13,148,136,0.10)' }}>
        <Building2 size={16} strokeWidth={2.5} />
        <span className="text-sm font-semibold flex-1 text-left" style={{ fontFamily: 'Roboto, sans-serif' }}>
          DEO Portal
        </span>
        <ChevronUp size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}

function DEOSidebar({ activePage, setActivePage, onSwitch }) {
  const unreadMessages = deoMessages.filter(m => m.unread > 0).length
  const unreadNotifs   = deoNotifications.filter(n => !n.read).length

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
          <p className="text-[10px] mt-0.5 font-semibold" style={{ color: `rgba(13,148,136,0.90)`, fontFamily: 'Roboto, sans-serif' }}>DEO Portal</p>
        </div>
      </div>

      {/* DEO profile strip */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img
          src={`https://randomuser.me/api/portraits/${deoProfile.gender}/${deoProfile.photoId}.jpg`}
          alt={deoProfile.name}
          className="rounded-full flex-shrink-0"
          style={{ width: 36, height: 36, border: `1.5px solid rgba(13,148,136,0.55)` }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="min-w-0">
          <p className="text-xs font-black text-white truncate leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
            {deoProfile.firstName}
          </p>
          <p className="text-[10px] font-semibold truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Roboto, sans-serif' }}>
            {deoProfile.district}
          </p>
        </div>
      </div>

      {/* Nav */}
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
              const badge  = item.id === 'communications' ? unreadMessages : item.id === 'notifications' ? unreadNotifs : 0
              return (
                <button key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all relative"
                  style={{
                    background: active ? 'rgba(13,148,136,0.14)' : 'transparent',
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

function DEOHeader({ activePage, setActivePage }) {
  const unreadNotifs   = deoNotifications.filter(n => !n.read).length
  const unreadMessages = deoMessages.filter(m => m.unread > 0).length

  return (
    <div className="flex-shrink-0 flex items-center justify-between px-7"
      style={{ height: 68, background: '#fff', borderBottom: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
      <div>
        <h1 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </h1>
        <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          DEO Portal · {deoProfile.district} · {deoProfile.county}
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
        <button onClick={() => setActivePage('communications')}
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
            src={`https://randomuser.me/api/portraits/${deoProfile.gender}/${deoProfile.photoId}.jpg`}
            alt={deoProfile.name}
            className="rounded-full object-cover"
            style={{ width: 34, height: 34, border: '2px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-black text-[#002333] leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
              {deoProfile.firstName}
            </p>
            <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              DEO
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function DEOApp({ onSwitch }) {
  const [activePage, setActivePage] = useState('dashboard')

  function renderPage(page) {
    switch (page) {
      case 'dashboard':      return <DEODashboard setActivePage={setActivePage} />
      case 'schools':        return <DEOSchools />
      case 'admins':         return <DEOAdmins />
      case 'teachers':       return <DEOTeachers />
      case 'students':       return <DEOStudents />
      case 'reports':        return <DEOReports />
      case 'infrastructure': return <DEOInfrastructure />
      case 'finance':        return <DEOFinance />
      case 'communications': return <DEOCommunications />
      case 'notifications':  return <DEONotifications />
      case 'settings':       return <DEOSettings />
      default:               return <DEODashboard setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F6F8' }}>
      <DEOSidebar activePage={activePage} setActivePage={setActivePage} onSwitch={onSwitch} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: 240 }}>
        <DEOHeader activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto"
          style={{ padding: activePage === 'communications' ? '20px 24px' : '24px 28px' }}>
          {renderPage(activePage)}
        </main>
      </div>
    </div>
  )
}
