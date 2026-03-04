import { useState } from 'react'
import {
  LayoutDashboard, School, BookOpen, Calendar, Star,
  ClipboardCheck, ClipboardList, FolderOpen, MessageSquare,
  Bell, Settings, ChevronUp, ShieldCheck, Users, GraduationCap, Building2, Crown,
} from 'lucide-react'

const DASHBOARD_OPTIONS = [
  { mode: 'minister',label: 'Minister',     icon: Crown,         color: '#4F46E5' },
  { mode: 'ceo',     label: 'Admin / CEO',  icon: ShieldCheck,   color: '#48D08C' },
  { mode: 'deo',     label: 'DEO Portal',   icon: Building2,     color: '#0D9488' },
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
            const isActive = opt.mode === 'student'
            return (
              <button key={opt.mode}
                onClick={() => { setOpen(false); if (!isActive) onSwitch(opt.mode) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors"
                style={{ background: isActive ? 'rgba(245,158,11,0.10)' : 'transparent' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                <Icon size={15} strokeWidth={2.5} style={{ color: opt.color, flexShrink: 0 }} />
                <span className="text-sm font-semibold flex-1 text-left"
                  style={{ color: isActive ? opt.color : 'rgba(255,255,255,0.75)', fontFamily: 'Roboto, sans-serif' }}>
                  {opt.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(245,158,11,0.18)', color: opt.color, fontFamily: 'Roboto, sans-serif' }}>
                    ACTIVE
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2.5 px-3 py-3 rounded-xl transition-all"
        style={{ background: open ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.08)', color: '#F59E0B' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(245,158,11,0.14)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'rgba(245,158,11,0.08)' }}>
        <GraduationCap size={16} strokeWidth={2.5} />
        <span className="text-sm font-semibold flex-1 text-left" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Student Portal
        </span>
        <ChevronUp size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}
import { studentProfile, schoolInfo, studentMessages, studentNotifications } from '../../data/studentData'

import StudentDashboard    from './StudentDashboard'
import StudentSchool       from './StudentSchool'
import StudentSubjects     from './StudentSubjects'
import StudentSchedule     from './StudentSchedule'
import StudentGrades       from './StudentGrades'
import StudentAttendance   from './StudentAttendance'
import StudentAssignments  from './StudentAssignments'
import StudentResources    from './StudentResources'
import StudentMessages     from './StudentMessages'
import StudentNotifications from './StudentNotifications'
import StudentSettings     from './StudentSettings'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Learning',
    items: [
      { id: 'school',      label: 'My School',      icon: School        },
      { id: 'subjects',    label: 'My Subjects',    icon: BookOpen      },
      { id: 'schedule',    label: 'Class Schedule', icon: Calendar      },
      { id: 'grades',      label: 'Grades',         icon: Star          },
      { id: 'attendance',  label: 'Attendance',     icon: ClipboardCheck},
    ],
  },
  {
    label: 'Tasks',
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
  subjects:      'My Subjects',
  schedule:      'Class Schedule',
  grades:        'Grades',
  attendance:    'Attendance',
  assignments:   'Assignments',
  resources:     'Resources',
  messages:      'Messages',
  notifications: 'Notifications',
  settings:      'Settings',
}

function renderStudentPage(page) {
  switch (page) {
    case 'dashboard':     return <StudentDashboard />
    case 'school':        return <StudentSchool />
    case 'subjects':      return <StudentSubjects />
    case 'schedule':      return <StudentSchedule />
    case 'grades':        return <StudentGrades />
    case 'attendance':    return <StudentAttendance />
    case 'assignments':   return <StudentAssignments />
    case 'resources':     return <StudentResources />
    case 'messages':      return <StudentMessages />
    case 'notifications': return <StudentNotifications />
    case 'settings':      return <StudentSettings />
    default:              return <StudentDashboard />
  }
}

function StudentSidebar({ activePage, setActivePage, onSwitch }) {
  const unreadMessages = studentMessages.filter(m => m.unread > 0).length
  const unreadNotifs   = studentNotifications.filter(n => !n.read).length

  return (
    <div className="fixed top-0 left-0 h-full flex flex-col z-30"
      style={{ width: 240, background: '#002333' }}>

      {/* Brand */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: '#48D08C' }}>
          <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>N</span>
        </div>
        <div>
          <p className="text-sm font-black text-white leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>NEMIS</p>
          <p className="text-[10px] mt-0.5 font-semibold" style={{ color: 'rgba(72,208,140,0.85)', fontFamily: 'Roboto, sans-serif' }}>Student Portal</p>
        </div>
      </div>

      {/* School info */}
      <div className="px-5 py-3 flex items-center gap-3 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img
          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(schoolInfo.name)}&size=38&background=48D08C&color=002333&bold=true&font-size=0.3`}
          alt={schoolInfo.name}
          className="rounded-lg flex-shrink-0"
          style={{ width: 36, height: 36, border: '1.5px solid rgba(72,208,140,0.4)' }}
        />
        <div className="min-w-0">
          <p className="text-xs font-black text-white truncate leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
            {schoolInfo.name}
          </p>
          <p className="text-[10px] font-semibold truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>
            {studentProfile.grade} · {schoolInfo.code}
          </p>
        </div>
      </div>

      {/* Sectional Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        {NAV_SECTIONS.map((section, si) => (
          <div key={section.label} className={si > 0 ? 'mt-1' : ''}>
            {/* Section label */}
            <p className="px-3 pt-3 pb-1 text-[10px] font-black uppercase tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.30)', fontFamily: 'Roboto, sans-serif' }}>
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
                    background: active ? 'rgba(72,208,140,0.12)' : 'transparent',
                    color: active ? '#48D08C' : 'rgba(255,255,255,0.62)',
                  }}>
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                      style={{ background: '#48D08C' }} />
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

function StudentHeader({ activePage, setActivePage }) {
  const unreadNotifs   = studentNotifications.filter(n => !n.read).length
  const unreadMessages = studentMessages.filter(m => m.unread > 0).length

  return (
    <div className="flex-shrink-0 flex items-center justify-between px-7"
      style={{ height: 68, background: '#fff', borderBottom: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
      <div>
        <h1 className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {PAGE_TITLES[activePage] || 'Dashboard'}
        </h1>
        <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Student Portal · {studentProfile.grade} · {studentProfile.school}
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
            src={`https://randomuser.me/api/portraits/${studentProfile.gender}/${studentProfile.photoId}.jpg`}
            alt={studentProfile.name}
            className="rounded-full object-cover"
            style={{ width: 34, height: 34, border: '2px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="text-left hidden sm:block">
            <p className="text-sm font-black text-[#002333] leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
              {studentProfile.name.split(' ')[0]}
            </p>
            <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {studentProfile.grade}
            </p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default function StudentApp({ onSwitch }) {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F4F6F8' }}>
      <StudentSidebar activePage={activePage} setActivePage={setActivePage} onSwitch={onSwitch} />
      <div className="flex flex-col flex-1 overflow-hidden" style={{ marginLeft: 240 }}>
        <StudentHeader activePage={activePage} setActivePage={setActivePage} />
        <main className="flex-1 overflow-y-auto"
          style={{ padding: activePage === 'messages' ? '20px 24px' : '24px 28px' }}>
          {renderStudentPage(activePage)}
        </main>
      </div>
    </div>
  )
}
