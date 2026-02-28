import { useState } from 'react'
import {
  LayoutDashboard, Map, School, CheckSquare, GraduationCap,
  Users, ClipboardCheck, BarChart2, UserCog, FileText,
  MessageSquare, Bell, Settings, ChevronUp, ShieldCheck,
} from 'lucide-react'

const DASHBOARD_OPTIONS = [
  { mode: 'ceo',     label: 'Admin / CEO', icon: ShieldCheck,   color: '#48D08C' },
  { mode: 'teacher', label: 'Teacher',      icon: Users,         color: '#60A5FA' },
  { mode: 'student', label: 'Student',      icon: GraduationCap, color: '#F59E0B' },
  { mode: 'parent',  label: 'Parent',       icon: Users,         color: '#C084FC' },
]

function DashboardSwitcher({ onSwitchDashboard }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-3 flex-shrink-0 relative" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      {open && (
        <div className="absolute bottom-full left-3 right-3 mb-2 rounded-xl overflow-hidden"
          style={{ background: '#001A27', border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 -8px 24px rgba(0,0,0,0.35)' }}>
          {DASHBOARD_OPTIONS.map(opt => {
            const Icon = opt.icon
            const isActive = opt.mode === 'ceo'
            return (
              <button key={opt.mode}
                onClick={() => { setOpen(false); if (!isActive) onSwitchDashboard(opt.mode) }}
                className="w-full flex items-center gap-2.5 px-4 py-3 transition-colors"
                style={{ background: isActive ? 'rgba(72,208,140,0.10)' : 'transparent' }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}>
                <Icon size={15} strokeWidth={2.5} style={{ color: opt.color, flexShrink: 0 }} />
                <span className="text-sm font-semibold flex-1 text-left"
                  style={{ color: isActive ? opt.color : 'rgba(255,255,255,0.75)', fontFamily: 'Lato, sans-serif' }}>
                  {opt.label}
                </span>
                {isActive && (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(72,208,140,0.18)', color: opt.color, fontFamily: 'Lato, sans-serif' }}>
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
        style={{ background: open ? 'rgba(72,208,140,0.18)' : 'rgba(72,208,140,0.10)', color: '#48D08C' }}
        onMouseEnter={e => { if (!open) e.currentTarget.style.background = 'rgba(72,208,140,0.16)' }}
        onMouseLeave={e => { if (!open) e.currentTarget.style.background = 'rgba(72,208,140,0.10)' }}>
        <ShieldCheck size={16} strokeWidth={2.5} />
        <span className="text-sm font-semibold flex-1 text-left" style={{ fontFamily: 'Lato, sans-serif' }}>
          Admin / CEO
        </span>
        <ChevronUp size={14} strokeWidth={2.5}
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }} />
      </button>
    </div>
  )
}

const SECTIONS = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Education',
    items: [
      { id: 'districts',          label: 'Districts',          icon: Map },
      { id: 'schools',            label: 'Schools',            icon: School },
      { id: 'school-approval',    label: 'School Approval',    icon: CheckSquare },
      { id: 'students',           label: 'Students',           icon: GraduationCap },
      { id: 'teachers',           label: 'Teachers',           icon: Users },
      { id: 'teacher-oversight',  label: 'Teacher Oversight',  icon: ClipboardCheck },
      { id: 'enrollment',         label: 'Enrollment',         icon: BarChart2 },
    ],
  },
  {
    label: 'Management',
    items: [
      { id: 'users',    label: 'User Management', icon: UserCog },
      { id: 'reports',  label: 'Reports',         icon: FileText },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id: 'messages',       label: 'Messages',       icon: MessageSquare },
      { id: 'notifications',  label: 'Notifications',  icon: Bell },
    ],
  },
  {
    label: 'System',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ],
  },
]

export default function Sidebar({ activePage, setActivePage, onSwitchDashboard }) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] bg-[#002333] flex flex-col z-50 select-none"
      style={{ boxShadow: '4px 0 24px rgba(0,0,0,0.22)' }}
    >
      {/* ── Brand ── */}
      <div className="px-5 pt-5 pb-4 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        <div className="w-10 h-10 bg-[#48D08C] rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-[#002333] font-black text-base leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
            GB
          </span>
        </div>
        <div>
          <p className="text-white text-[13px] font-bold leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            Grand Bassa NEMIS
          </p>
          <p className="text-[11px] font-medium" style={{ color: 'rgba(72,208,140,0.85)', fontFamily: 'Lato, sans-serif' }}>
            County Education Office
          </p>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
        {SECTIONS.map((section, si) => (
          <div key={section.label} className={si > 0 ? 'mt-1' : ''}>
            {/* Section label */}
            <p
              className="px-5 pt-3 pb-1.5 text-[10px] font-black uppercase tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Lato, sans-serif' }}
            >
              {section.label}
            </p>

            {section.items.map((item) => {
              const Icon = item.icon
              const isActive = activePage === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className="w-full flex items-center gap-3 px-5 py-[10px] text-[13px] relative transition-all duration-150"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.09)' : 'transparent',
                    color: isActive ? '#fff' : 'rgba(255,255,255,0.68)',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: isActive ? 700 : 600,
                    letterSpacing: '0.01em',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.90)' }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.68)' }
                  }}
                >
                  {isActive && (
                    <span className="absolute left-0 top-[5px] bottom-[5px] w-[3px] bg-[#48D08C] rounded-r-full" />
                  )}
                  <Icon
                    size={18}
                    strokeWidth={2.5}
                    style={{ color: isActive ? '#48D08C' : 'currentColor', flexShrink: 0 }}
                  />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>
        ))}
      </nav>

      <DashboardSwitcher onSwitchDashboard={onSwitchDashboard} />

    </aside>
  )
}
