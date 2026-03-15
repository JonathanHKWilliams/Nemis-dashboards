import { useState } from 'react'
import {
  LayoutDashboard, BarChart2, Map, Award, Database,
  School, Users, GraduationCap, ShieldCheck, FileText,
  UserCog, MessageSquare, Bell, Settings, ChevronUp,
  Building2, Crown, DollarSign, BookOpen, AlertTriangle,
  Download, ClipboardCheck,
} from 'lucide-react'
import { ministerProfile, ministerMessages, ministerNotifications } from '../../data/ministerData'

import MinisterDashboard        from './MinisterDashboard'
import MinisterNationalAnalytics from './MinisterNationalAnalytics'
import MinisterCountyPerformance from './MinisterCountyPerformance'
import MinisterScorecard        from './MinisterScorecard'
import MinisterRecords          from './MinisterRecords'
import MinisterSchools          from './MinisterSchools'
import MinisterTeachers         from './MinisterTeachers'
import MinisterStudents         from './MinisterStudents'
import MinisterAdministration   from './MinisterAdministration'
import MinisterUsers            from './MinisterUsers'
import MinisterReports          from './MinisterReports'
import MinisterAuditLogs        from './MinisterAuditLogs'
import MinisterBudget           from './MinisterBudget'
import MinisterPolicy           from './MinisterPolicy'
import MinisterEmergency        from './MinisterEmergency'
import MinisterExport           from './MinisterExport'
import MinisterMessages         from './MinisterMessages'
import MinisterNotifications    from './MinisterNotifications'
import MinisterSettings         from './MinisterSettings'

const ACCENT = '#4F46E5'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { id: 'analytics',  label: 'National Analytics',   icon: BarChart2 },
      { id: 'counties',   label: 'County Performance',   icon: Map       },
      { id: 'scorecard',  label: 'Education Scorecard',  icon: Award     },
    ],
  },
  {
    label: 'Registry',
    items: [
      { id: 'records',  label: 'Records',   icon: Database      },
      { id: 'schools',  label: 'Schools',   icon: School        },
      { id: 'teachers', label: 'Teachers',  icon: Users         },
      { id: 'students', label: 'Students',  icon: GraduationCap },
    ],
  },
  {
    label: 'Administration',
    items: [
      { id: 'administration', label: 'Administration', icon: ShieldCheck },
      { id: 'users',          label: 'User Management', icon: UserCog    },
    ],
  },
  {
    label: 'Reports',
    items: [
      { id: 'reports',   label: 'Reports',    icon: FileText       },
      { id: 'audit',     label: 'Audit Logs', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Budget & Policy',
    items: [
      { id: 'budget',    label: 'Budget Overview',  icon: DollarSign  },
      { id: 'policy',    label: 'National Policy',  icon: BookOpen    },
      { id: 'emergency', label: 'Emergency Center', icon: AlertTriangle },
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
    label: 'Tools',
    items: [
      { id: 'export', label: 'Data Export', icon: Download },
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
  dashboard:      'Executive Dashboard',
  analytics:      'National Analytics',
  counties:       'County Performance',
  scorecard:      'Education Scorecard',
  records:        'National Records',
  schools:        'Schools Registry',
  teachers:       'Teachers Registry',
  students:       'Students Registry',
  administration: 'Administration',
  users:          'User Management',
  reports:        'Reports',
  audit:          'Audit Logs',
  budget:         'Budget Overview',
  policy:         'National Policy',
  emergency:      'Emergency Center',
  messages:       'Messages',
  notifications:  'Notifications',
  export:         'Data Export',
  settings:       'Settings',
}

const DASHBOARD_OPTIONS = [
  { mode: 'minister', label: 'Minister',    icon: Crown,       color: ACCENT    },
  { mode: 'ceo',      label: 'Admin / CEO', icon: ShieldCheck, color: '#48D08C' },
  { mode: 'deo',      label: 'DEO Portal',  icon: Building2,   color: '#0D9488' },
  { mode: 'teacher',  label: 'Teacher',     icon: Users,       color: '#60A5FA' },
  { mode: 'student',  label: 'Student',     icon: GraduationCap, color: '#F59E0B' },
  { mode: 'parent',    label: 'Parent',      icon: Users,       color: '#C084FC' },
  { mode: 'principal', label: 'School Admin', icon: Users,       color: '#0367A0' },
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
            const isActive = opt.mode === 'minister'
            return (
              <button key={opt.mode}
                onClick={() => { setOpen(false); if (!isActive) onSwitch(opt.mode) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors"
                style={{ background: isActive ? `rgba(79,70,229,0.14)` : 'transparent' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                <Icon size={15} strokeWidth={2.5} style={{ color: opt.color, flexShrink: 0 }} />
                <span className="text-sm font-semibold flex-1 text-left"
                  style={{ color: isActive ? opt.color : 'rgba(255,255,255,0.75)', fontFamily: 'Roboto, sans-serif' }}>
                  {opt.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(79,70,229,0.22)', color: opt.color, fontFamily: 'Roboto, sans-serif' }}>
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
        style={{ background: open ? 'rgba(79,70,229,0.20)' : 'rgba(79,70,229,0.12)', color: ACCENT }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(79,70,229,0.18)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'rgba(79,70,229,0.12)' }}>
        <Crown size={16} strokeWidth={2.5} />
        <span className="text-sm font-semibold flex-1 text-left" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Minister Portal
        </span>
        <ChevronUp size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}

function MinisterSidebar({ activePage, setActivePage, onSwitch }) {
  const unreadMessages = ministerMessages.filter(m => m.unread > 0).length
  const unreadNotifs   = ministerNotifications.filter(n => !n.read).length

  return (
    <div className="fixed top-0 left-0 h-full flex flex-col z-30"
      style={{ width: 248, background: '#0F172A' }}>

      {/* Brand */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: ACCENT }}>
          <Crown size={17} color="#fff" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-black text-white leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>NEMIS</p>
          <p className="text-[10px] mt-0.5 font-semibold" style={{ color: 'rgba(165,180,252,0.85)', fontFamily: 'Roboto, sans-serif' }}>Minister Portal</p>
        </div>
      </div>

      {/* Profile strip */}
      <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <img
          src={`https://randomuser.me/api/portraits/${ministerProfile.gender}/${ministerProfile.photoId}.jpg`}
          alt={ministerProfile.name}
          className="rounded-full flex-shrink-0"
          style={{ width: 36, height: 36, border: `1.5px solid rgba(79,70,229,0.60)` }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="min-w-0">
          <p className="text-xs font-black text-white truncate leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
            {ministerProfile.firstName}
          </p>
          <p className="text-[10px] font-semibold truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Roboto, sans-serif' }}>
            Ministry of Education
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label} className={si > 0 ? 'mt-1' : ''}>
            <p className="px-3 pt-3 pb-1 text-[9px] font-black uppercase tracking-[0.14em]"
              style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Roboto, sans-serif' }}>
              {section.label}
            </p>
            {section.items.map(item => {
              const Icon   = item.icon
              const active = activePage === item.id
              const badge  = item.id === 'messages' ? unreadMessages : item.id === 'notifications' ? unreadNotifs : 0
              return (
                <button key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all relative"
                  style={{
                    background: active ? 'rgba(79,70,229,0.18)' : 'transparent',
                    color: active ? '#A5B4FC' : 'rgba(255,255,255,0.55)',
                  }}>
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                      style={{ background: ACCENT }} />
                  )}
                  <Icon size={15} strokeWidth={active ? 2.5 : 2} style={{ color: active ? '#A5B4FC' : 'inherit', flexShrink: 0 }} />
                  <span className="text-[12px] font-bold flex-1 text-left" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {item.label}
                  </span>
                  {badge > 0 && (
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                      style={{ background: '#DC2626' }}>{badge}</span>
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

function MinisterHeader({ activePage, setActivePage }) {
  const unreadNotifs   = ministerNotifications.filter(n => !n.read).length
  const unreadMessages = ministerMessages.filter(m => m.unread > 0).length

  return (
    <div className="flex-shrink-0 flex items-center justify-between px-7"
      style={{ height: 64, background: '#fff', borderBottom: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(15,23,42,0.04)' }}>
      <div>
        <h1 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </h1>
        <p className="text-[11px] font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Ministry of Education · Republic of Liberia
        </p>
      </div>
      <div className="flex items-center gap-2.5">
        <button onClick={() => setActivePage('notifications')}
          className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F8FAFC]">
          <Bell size={17} color="#64748B" strokeWidth={2.5} />
          {unreadNotifs > 0 && (
            <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#DC2626' }}>{unreadNotifs}</span>
          )}
        </button>
        <button onClick={() => setActivePage('messages')}
          className="relative w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F8FAFC]">
          <MessageSquare size={17} color="#64748B" strokeWidth={2.5} />
          {unreadMessages > 0 && (
            <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#DC2626' }}>{unreadMessages}</span>
          )}
        </button>
        <div className="w-px h-5" style={{ background: '#E2E8F0' }} />
        <button onClick={() => setActivePage('settings')}
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition-colors hover:bg-[#F8FAFC]">
          <img
            src={`https://randomuser.me/api/portraits/${ministerProfile.gender}/${ministerProfile.photoId}.jpg`}
            alt={ministerProfile.name}
            className="rounded-full object-cover"
            style={{ width: 30, height: 30, border: '2px solid #E2E8F0' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="text-left hidden sm:block">
            <p className="text-xs font-black text-[#0F172A] leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
              {ministerProfile.firstName}
            </p>
            <p className="text-[10px] font-semibold mt-0.5" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
              Minister
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function MinisterApp({ onSwitch }) {
  const [activePage, setActivePage] = useState('dashboard')

  function renderPage(page) {
    switch (page) {
      case 'dashboard':      return <MinisterDashboard setActivePage={setActivePage} />
      case 'analytics':      return <MinisterNationalAnalytics />
      case 'counties':       return <MinisterCountyPerformance />
      case 'scorecard':      return <MinisterScorecard />
      case 'records':        return <MinisterRecords />
      case 'schools':        return <MinisterSchools />
      case 'teachers':       return <MinisterTeachers />
      case 'students':       return <MinisterStudents />
      case 'administration': return <MinisterAdministration />
      case 'users':          return <MinisterUsers />
      case 'reports':        return <MinisterReports />
      case 'audit':          return <MinisterAuditLogs />
      case 'budget':         return <MinisterBudget />
      case 'policy':         return <MinisterPolicy />
      case 'emergency':      return <MinisterEmergency />
      case 'messages':       return <MinisterMessages />
      case 'notifications':  return <MinisterNotifications />
      case 'export':         return <MinisterExport />
      case 'settings':       return <MinisterSettings />
      default:               return <MinisterDashboard setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F8FAFC' }}>
      <MinisterSidebar activePage={activePage} setActivePage={setActivePage} onSwitch={onSwitch} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: 248 }}>
        <MinisterHeader activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto"
          style={{ padding: activePage === 'messages' ? '20px 24px' : '28px 32px' }}>
          {renderPage(activePage)}
        </main>
      </div>
    </div>
  )
}
