import { studentProfile, subjects, assignments, schedule } from '../../data/studentData'
import { BookOpen, Calendar, ClipboardList, Bell, Hash, Leaf, Landmark, Monitor, Zap } from 'lucide-react'

const today = new Date()
const DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const todayKey = DAYS[today.getDay()]
const greetingHour = today.getHours()
const greeting = greetingHour < 12 ? 'Good morning' : greetingHour < 17 ? 'Good afternoon' : 'Good evening'

const subjectIcons = {
  Mathematics: Hash,
  English:     BookOpen,
  Biology:     Leaf,
  History:     Landmark,
  ICT:         Monitor,
  Physics:     Zap,
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h3 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
      {subtitle && <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{subtitle}</p>}
    </div>
  )
}

export default function StudentDashboard() {
  const pending = assignments.filter(a => a.status === 'Pending')
  const todaySlots = schedule
    .filter(row => !row.isBreak && !row.isLunch && row[todayKey])
    .map(row => ({ time: row.time, subject: row[todayKey] }))

  return (
    <div className="space-y-8 max-w-[960px]">

      {/* ── Welcome Banner ── */}
      <div className="rounded-2xl overflow-hidden relative"
        style={{ background: 'linear-gradient(120deg, #002333 0%, #003d5c 100%)', minHeight: 130 }}>
        <div className="absolute right-0 top-0 w-64 h-full opacity-10"
          style={{ background: 'radial-gradient(circle at 80% 50%, #48D08C 0%, transparent 70%)' }} />
        <div className="relative px-8 py-7 flex items-center gap-5">
          <img
            src={`https://randomuser.me/api/portraits/${studentProfile.gender}/${studentProfile.photoId}.jpg`}
            alt={studentProfile.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 68, height: 68, border: '3px solid rgba(72,208,140,0.5)' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div>
            <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif' }}>{greeting},</p>
            <h2 className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{studentProfile.name}</h2>
            <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Roboto, sans-serif' }}>
              {studentProfile.grade} · {studentProfile.school}
            </p>
            {/* Student ID — bold and prominent */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-lg font-black tracking-wider"
                style={{ color: '#48D08C', fontFamily: 'Sora, sans-serif', letterSpacing: '0.05em' }}>
                {studentProfile.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section: Quick Stats ── */}
      <section>
        <SectionHeader title="Quick Overview" subtitle="Your activity at a glance" />
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Subjects',      value: subjects.length,    icon: BookOpen,     color: '#2563EB', bg: 'rgba(37,99,235,0.08)'  },
            { label: 'Pending',       value: pending.length,     icon: ClipboardList,color: '#A60003', bg: 'rgba(166,0,3,0.08)'    },
            { label: 'Classes Today', value: todaySlots.length,  icon: Calendar,     color: '#16A34A', bg: 'rgba(72,208,140,0.12)' },
            { label: 'Notices',       value: 1,                  icon: Bell,         color: '#D97706', bg: 'rgba(217,119,6,0.1)'   },
          ].map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white rounded-2xl p-5"
                style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.bg }}>
                  <Icon size={20} color={stat.color} strokeWidth={3} />
                </div>
                <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</p>
                <p className="text-xs font-bold text-[#6B7280] mt-0.5 uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>{stat.label}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── Section: Today + Assignments ── */}
      <section className="grid grid-cols-2 gap-6">
        <div>
          <SectionHeader title="Today's Classes" subtitle={today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} />
          <div className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
            {todaySlots.length > 0 ? todaySlots.map((slot, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: i < todaySlots.length - 1 ? '1px solid #F4F6F8' : 'none',
                         background: i === 0 ? 'rgba(72,208,140,0.04)' : 'transparent' }}>
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: i === 0 ? '#48D08C' : '#D1D5DB' }} />
                  <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{slot.subject}</span>
                </div>
                <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {slot.time.split('–')[0].trim()}
                </span>
              </div>
            )) : (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No classes today</p>
              </div>
            )}
          </div>
        </div>

        <div>
          <SectionHeader title="Pending Assignments" subtitle={`${pending.length} due`} />
          <div className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
            {pending.length > 0 ? pending.map((a, i) => (
              <div key={a.id} className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: i < pending.length - 1 ? '1px solid #F4F6F8' : 'none' }}>
                <div>
                  <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{a.title}</p>
                  <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.subject}</p>
                </div>
                <span className="text-xs font-black px-2 py-1 rounded-lg flex-shrink-0"
                  style={{ background: 'rgba(166,0,3,0.08)', color: '#A60003', fontFamily: 'Roboto, sans-serif' }}>
                  {a.due}
                </span>
              </div>
            )) : (
              <div className="px-5 py-8 text-center">
                <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>All done!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Section: Announcement ── */}
      <section>
        <SectionHeader title="School Announcement" subtitle="Latest from administration" />
        <div className="bg-white rounded-2xl p-5 flex items-start gap-4"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(217,119,6,0.1)' }}>
            <Bell size={20} color="#D97706" strokeWidth={3} />
          </div>
          <div>
            <p className="font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Mid-Term Examinations</p>
            <p className="text-sm font-semibold text-[#4B5563] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Mid-Term Examinations will begin on <strong>March 5, 2026</strong>. Timetables will be shared by your class teachers.
            </p>
            <p className="text-xs font-bold text-[#9CA3AF] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Posted by School Admin · Feb 20, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ── Section: My Subjects ── */}
      <section>
        <SectionHeader title="My Subjects This Term" subtitle={`${subjects.length} subjects enrolled`} />
        <div className="grid grid-cols-3 gap-0 bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          {subjects.map((sub, i) => {
            const Icon = subjectIcons[sub.name] || BookOpen
            return (
              <div key={sub.id} className="px-5 py-4 flex items-center gap-3"
                style={{
                  borderRight: i % 3 !== 2 ? '1px solid #F4F6F8' : 'none',
                  borderBottom: i < 3 ? '1px solid #F4F6F8' : 'none',
                }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(0,35,51,0.06)' }}>
                  <Icon size={16} color="#002333" strokeWidth={3} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{sub.name}</p>
                  <p className="text-xs font-bold text-[#6B7280] truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub.teacher}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

    </div>
  )
}
