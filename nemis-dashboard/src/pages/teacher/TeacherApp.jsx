import { useState } from 'react'
import {
  LayoutDashboard, School, Users, Calendar, Star,
  ClipboardCheck, ClipboardList, FolderOpen, MessageSquare,
  Bell, Settings, ChevronUp, GraduationCap, ShieldCheck, Building2, Crown, UserCog,
} from 'lucide-react'
import { teacherProfile, teacherSchoolInfo, teacherMessages, teacherNotifications } from '../../data/teacherData'

import TeacherDashboard    from './TeacherDashboard'
import TeacherSchool       from './TeacherSchool'
import TeacherClasses      from './TeacherClasses'
import TeacherSchedule     from './TeacherSchedule'
import TeacherGrades       from './TeacherGrades'
import TeacherAttendance   from './TeacherAttendance'
import TeacherAssignments  from './TeacherAssignments'
import TeacherResources    from './TeacherResources'
import TeacherMessages     from './TeacherMessages'
import TeacherNotifications from './TeacherNotifications'
import TeacherSettings     from './TeacherSettings'

const ACCENT     = '#0367A0'
const SIDEBAR_BG = '#000E21'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Teaching',
    items: [
      { id: 'school',     label: 'My School',      icon: School         },
      { id: 'classes',    label: 'My Classes',     icon: Users          },
      { id: 'schedule',   label: 'Class Schedule', icon: Calendar       },
      { id: 'grades',     label: 'Grades',         icon: Star           },
      { id: 'attendance', label: 'Attendance',     icon: ClipboardCheck },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'assignments', label: 'Assignments', icon: ClipboardList },
      { id: 'resources',   label: 'Resources',   icon: FolderOpen    },
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
  school:        'My School',
  classes:       'My Classes',
  schedule:      'Class Schedule',
  grades:        'Grades',
  attendance:    'Attendance',
  assignments:   'Assignments',
  resources:     'Learning Resources',
  messages:      'Messages',
  notifications: 'Notifications',
  settings:      'Settings',
}

function renderTeacherPage(page, setActivePage) {
  switch (page) {
    case 'dashboard':     return <TeacherDashboard setActivePage={setActivePage} />
    case 'school':        return <TeacherSchool />
    case 'classes':       return <TeacherClasses setActivePage={setActivePage} />
    case 'schedule':      return <TeacherSchedule />
    case 'grades':        return <TeacherGrades />
    case 'attendance':    return <TeacherAttendance />
    case 'assignments':   return <TeacherAssignments />
    case 'resources':     return <TeacherResources />
    case 'messages':      return <TeacherMessages />
    case 'notifications': return <TeacherNotifications />
    case 'settings':      return <TeacherSettings />
    default:              return <TeacherDashboard setActivePage={setActivePage} />
  }
}

const DASHBOARD_OPTIONS = [
  { mode: 'minister',  label: 'Minister',     icon: Crown,         color: '#4F46E5' },
  { mode: 'ceo',       label: 'Admin / CEO',  icon: ShieldCheck,   color: '#0367A0' },
  { mode: 'deo',       label: 'DEO Portal',   icon: Building2,     color: '#0D9488' },
  { mode: 'principal', label: 'School Admin', icon: School,        color: '#0367A0' },
  { mode: 'teacher',   label: 'Teacher',      icon: Users,         color: '#60A5FA' },
  { mode: 'student',   label: 'Student',      icon: GraduationCap, color: '#F59E0B' },
  { mode: 'parent',    label: 'Parent',       icon: UserCog,       color: '#C084FC' },
]

function DashboardSwitcher({ onSwitch }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-3 flex-shrink-0 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl overflow-hidden"
          style={{ background: '#00091A', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 -8px 24px rgba(0,0,0,0.45)', zIndex: 100 }}>
          {DASHBOARD_OPTIONS.map(opt => {
            const Icon = opt.icon
            const isActive = opt.mode === 'teacher'
            return (
              <button key={opt.mode}
                onClick={() => { setOpen(false); if (!isActive) onSwitch(opt.mode) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors"
                style={{ background: isActive ? 'rgba(3,103,160,0.12)' : 'transparent' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                <Icon size={15} strokeWidth={2.5} style={{ color: opt.color, flexShrink: 0 }} />
                <span className="text-sm font-semibold flex-1 text-left"
                  style={{ color: isActive ? opt.color : 'rgba(255,255,255,0.75)', fontFamily: 'Lato, sans-serif' }}>
                  {opt.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(3,103,160,0.20)', color: opt.color, fontFamily: 'Lato, sans-serif' }}>
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
        style={{ background: open ? 'rgba(3,103,160,0.18)' : 'rgba(3,103,160,0.10)', color: ACCENT }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(3,103,160,0.16)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'rgba(3,103,160,0.10)' }}>
        <GraduationCap size={16} strokeWidth={2.5} />
        <span className="text-sm font-semibold flex-1 text-left" style={{ fontFamily: 'Lato, sans-serif' }}>
          Teacher Portal
        </span>
        <ChevronUp size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}

function TeacherSidebar({ activePage, setActivePage, onSwitch }) {
  const unreadMessages = teacherMessages.filter(m => m.unread > 0).length
  const unreadNotifs   = teacherNotifications.filter(n => !n.read).length

  return (
    <div className="fixed top-0 left-0 h-full flex flex-col z-30 select-none"
      style={{ width: 256, background: SIDEBAR_BG, boxShadow: '4px 0 24px rgba(0,0,0,0.35)' }}>

      {/* Brand */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
          style={{ background: ACCENT }}>
          <img
            src="/images/school-logo.png"
            alt="School Logo"
            className="w-full h-full object-contain"
            onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
          />
          <span className="text-sm font-black text-white w-full h-full items-center justify-center"
            style={{ fontFamily: 'Sora, sans-serif', display: 'none' }}>N</span>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-black text-white truncate leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
            {teacherSchoolInfo.name}
          </p>
          <p className="text-[10px] font-semibold mt-0.5 truncate"
            style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Lato, sans-serif' }}>
            Teacher Portal · {teacherProfile.subject}
          </p>
        </div>
      </div>

      {/* Sectional Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 scrollbar-hide">
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label} className={si > 0 ? 'mt-1' : ''}>
            <p className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Lato, sans-serif' }}>
              {section.label}
            </p>
            {section.items.map(item => {
              const Icon   = item.icon
              const active = activePage === item.id
              const badge  = item.id === 'messages' ? unreadMessages : item.id === 'notifications' ? unreadNotifs : 0
              return (
                <button key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className="w-full flex items-center gap-3 px-3 py-[10px] rounded-lg mb-0.5 text-[13px] relative transition-all duration-150"
                  style={{
                    background: active ? ACCENT : 'transparent',
                    color: active ? '#fff' : 'rgba(255,255,255,0.65)',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: active ? 700 : 600,
                  }}>
                  <Icon size={17} strokeWidth={active ? 3 : 2.5} style={{ flexShrink: 0 }} />
                  <span className="flex-1 text-left">{item.label}</span>
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

function TeacherHeader({ activePage, setActivePage }) {
  const unreadNotifs   = teacherNotifications.filter(n => !n.read).length
  const unreadMessages = teacherMessages.filter(m => m.unread > 0).length
  const today = new Date()

  return (
    <div className="flex-shrink-0 flex items-center justify-between px-7"
      style={{ height: 68, background: '#fff', borderBottom: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
      <div>
        <h1 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </h1>
        <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
          Teacher Portal · {teacherProfile.subject} · {teacherSchoolInfo.name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <p className="text-xs font-semibold text-[#9CA3AF] hidden md:block" style={{ fontFamily: 'Lato, sans-serif' }}>
          {today.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
        <div className="w-px h-6" style={{ background: '#EEF0F3' }} />

        <button onClick={() => setActivePage('messages')}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: '#F4F6F8' }}
          onMouseEnter={e => e.currentTarget.style.background = '#EEF0F3'}
          onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
          <MessageSquare size={17} color="#4B5563" strokeWidth={2.5} />
          {unreadMessages > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#A60003' }}>{unreadMessages}</span>
          )}
        </button>

        <button onClick={() => setActivePage('notifications')}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: '#F4F6F8' }}
          onMouseEnter={e => e.currentTarget.style.background = '#EEF0F3'}
          onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
          <Bell size={17} color="#4B5563" strokeWidth={2.5} />
          {unreadNotifs > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#A60003' }}>{unreadNotifs}</span>
          )}
        </button>

        <div className="w-px h-6" style={{ background: '#EEF0F3' }} />

        <button onClick={() => setActivePage('settings')}
          className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors"
          style={{ background: '#F4F6F8' }}
          onMouseEnter={e => e.currentTarget.style.background = '#EEF0F3'}
          onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
          <img
            src={`https://randomuser.me/api/portraits/${teacherProfile.gender}/${teacherProfile.photoId}.jpg`}
            alt={teacherProfile.name}
            className="rounded-full object-cover"
            style={{ width: 34, height: 34, border: '2px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-black text-[#002333] leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
              {teacherProfile.name.split(' ')[0]}
            </p>
            <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
              {teacherProfile.subject}
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function TeacherApp({ onSwitch }) {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F6F8' }}>
      <TeacherSidebar activePage={activePage} setActivePage={setActivePage} onSwitch={onSwitch} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: 256 }}>
        <TeacherHeader activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto"
          style={{ padding: activePage === 'messages' ? '20px 24px' : '24px 28px' }}>
          {renderTeacherPage(activePage, setActivePage)}
        </main>
      </div>
    </div>
  )
}
