import { teacherProfile, teacherClasses, teacherAssignments, teacherNotifications } from '../../data/teacherData'
import { Users, ClipboardCheck, Star, ClipboardList, Bell, MessageSquare, BookOpen, AlertCircle, Info, FolderOpen, Upload } from 'lucide-react'

const today = new Date()
const greetingHour = today.getHours()
const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'

const notifIcons = {
  submission: Upload,
  alert:      AlertCircle,
  message:    MessageSquare,
  resource:   FolderOpen,
  info:       Info,
  grade:      Star,
}
const notifColors = {
  submission: '#2563EB',
  alert:      '#A60003',
  message:    '#002333',
  resource:   '#7C3AED',
  info:       '#D97706',
  grade:      '#16A34A',
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
      {subtitle && <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{subtitle}</p>}
    </div>
  )
}

export default function TeacherDashboard({ setActivePage }) {
  const pendingToGrade = teacherAssignments.filter(a => a.status !== 'Graded' && a.submissions > 0).length
  const unreadNotifs   = teacherNotifications.filter(n => !n.read).length

  return (
    <div className="space-y-8 max-w-[1000px]">

      {/* ── Welcome Banner ── */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: 'linear-gradient(120deg, #002333 0%, #003d5c 100%)', minHeight: 140 }}>
        <div className="absolute right-0 top-0 w-72 h-full opacity-10"
          style={{ background: 'radial-gradient(circle at 80% 50%, #48D08C 0%, transparent 70%)' }} />
        <div className="relative px-8 py-7 flex items-center gap-6">
          <img
            src={`https://randomuser.me/api/portraits/${teacherProfile.gender}/${teacherProfile.photoId}.jpg`}
            alt={teacherProfile.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 72, height: 72, border: '3px solid rgba(72,208,140,0.5)' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif' }}>{greeting},</p>
            <h2 className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{teacherProfile.name}</h2>
            <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Roboto, sans-serif' }}>
              {teacherProfile.subject} Teacher · {teacherProfile.school}
            </p>
            <p className="text-xs font-bold mt-1.5" style={{ color: 'rgba(72,208,140,0.8)', fontFamily: 'Roboto, sans-serif' }}>
              {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          {/* Action stats */}
          <div className="flex items-stretch gap-0 flex-shrink-0">
            {[
              { label: 'Classes Today', value: 2, icon: BookOpen },
              { label: 'To Grade',      value: pendingToGrade, icon: ClipboardCheck },
              { label: 'Attendance',    value: 2, icon: Users },
              { label: 'Messages',      value: 3, icon: MessageSquare },
            ].map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label} className="flex flex-col items-center justify-center px-6 py-4"
                  style={{
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                    minWidth: 90,
                  }}>
                  <Icon size={16} color="rgba(72,208,140,0.85)" strokeWidth={3} />
                  <p className="text-2xl font-black text-white mt-1" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                  <p className="text-[10px] font-bold text-center uppercase tracking-wide mt-0.5"
                    style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Two-column grid ── */}
      <div className="grid grid-cols-2 gap-6">

        {/* LEFT — My Classes */}
        <div>
          <SectionHeader title="My Classes" subtitle={`${teacherClasses.length} assigned classes · ${teacherProfile.subject}`} />
          <div className="space-y-4">
            {teacherClasses.map(cls => (
              <div key={cls.id} className="bg-white rounded-2xl p-5"
                style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{cls.name}</h4>
                    <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {cls.room} · {cls.totalStudents} students
                    </p>
                  </div>
                  <span className="text-[10px] font-black px-2 py-1 rounded-lg"
                    style={{ background: 'rgba(72,208,140,0.12)', color: '#16A34A', fontFamily: 'Roboto, sans-serif' }}>
                    {cls.subject}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mb-4 text-xs font-bold text-[#6B7280]"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>
                  <ClipboardCheck size={12} strokeWidth={3} color="#9CA3AF" />
                  Next: {cls.nextClass} · {cls.nextDay}
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { label: 'Students', icon: Users, page: 'classes' },
                    { label: 'Attendance', icon: ClipboardCheck, page: 'attendance' },
                    { label: 'Grades', icon: Star, page: 'grades' },
                  ].map(btn => {
                    const Icon = btn.icon
                    return (
                      <button key={btn.label}
                        onClick={() => setActivePage && setActivePage(btn.page)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-black text-white transition-opacity hover:opacity-80"
                        style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        <Icon size={11} strokeWidth={3} />
                        {btn.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Assignments + Notifications */}
        <div className="space-y-6">
          <div>
            <SectionHeader title="Assignments Due" subtitle="Pending review or submission" />
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
              {teacherAssignments.filter(a => a.status !== 'Graded').slice(0, 4).map((a, i, arr) => (
                <div key={a.id} className="px-5 py-3.5 flex items-center justify-between"
                  style={{ borderBottom: i < arr.length - 1 ? '1px solid #F4F6F8' : 'none' }}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(0,35,51,0.06)' }}>
                      <ClipboardList size={12} color="#002333" strokeWidth={3} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</p>
                      <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {a.classId === 'G9A' ? 'Grade 9A' : 'Grade 9B'} · {a.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg"
                      style={{
                        background: a.status === 'In Progress' ? 'rgba(37,99,235,0.1)' : 'rgba(217,119,6,0.1)',
                        color: a.status === 'In Progress' ? '#2563EB' : '#D97706',
                        fontFamily: 'Roboto, sans-serif',
                      }}>
                      {a.submissions}/{a.total}
                    </span>
                    <span className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader title="Recent Notifications" subtitle="Your latest updates" />
            <div className="bg-white rounded-2xl overflow-hidden"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
              {teacherNotifications.slice(0, 3).map((n, i) => {
                const Icon = notifIcons[n.type] || Bell
                const color = notifColors[n.type] || '#002333'
                return (
                  <div key={n.id} className="px-5 py-3.5 flex items-start gap-3"
                    style={{
                      borderBottom: i < 2 ? '1px solid #F4F6F8' : 'none',
                      borderLeft: !n.read ? '3px solid #A60003' : '3px solid transparent',
                    }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}14` }}>
                      <Icon size={13} color={color} strokeWidth={3} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{n.title}</p>
                      <p className="text-xs font-semibold text-[#6B7280] mt-0.5 truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.message}</p>
                    </div>
                    <span className="text-[10px] font-bold text-[#9CA3AF] flex-shrink-0" style={{ fontFamily: 'Roboto, sans-serif' }}>{n.time}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
