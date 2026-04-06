import { useState } from 'react'
import { teacherProfile, teacherSchoolInfo, teacherClasses } from '../../data/teacherData'
import { User, Lock, Bell, Monitor, Info } from 'lucide-react'

const PANELS = [
  { id: 'profile',       label: 'Profile',        icon: User,    section: 'ACCOUNT'      },
  { id: 'security',      label: 'Security',        icon: Lock,    section: 'ACCOUNT'      },
  { id: 'notifications', label: 'Notifications',   icon: Bell,    section: 'PREFERENCES'  },
  { id: 'display',       label: 'Display',         icon: Monitor, section: 'PREFERENCES'  },
  { id: 'system',        label: 'System Info',     icon: Info,    section: 'ABOUT'        },
]

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle}
      className="relative flex-shrink-0 rounded-full transition-colors"
      style={{ width: 44, height: 24, background: on ? '#002333' : '#D1D5DB' }}>
      <span className="absolute top-1 rounded-full transition-all"
        style={{ width: 16, height: 16, background: '#fff', left: on ? 24 : 4 }} />
    </button>
  )
}

function FieldRow({ label, value, readOnly = false, type = 'text', multiline = false }) {
  return (
    <div>
      <label className="block text-xs font-black text-[#6B7280] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</label>
      {multiline ? (
        <textarea defaultValue={value} readOnly={readOnly} rows={2}
          className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none resize-none"
          style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: readOnly ? '#FAFBFC' : '#fff', color: readOnly ? '#6B7280' : '#002333' }}
          onFocus={e => { if (!readOnly) e.target.style.borderColor = '#002333' }}
          onBlur={e => { e.target.style.borderColor = '#EEF0F3' }}
        />
      ) : (
        <input type={type} defaultValue={value} readOnly={readOnly}
          className="w-full px-4 py-2.5 rounded-xl text-sm font-bold outline-none"
          style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: readOnly ? '#FAFBFC' : '#fff', color: readOnly ? '#6B7280' : '#002333' }}
          onFocus={e => { if (!readOnly) e.target.style.borderColor = '#002333' }}
          onBlur={e => { e.target.style.borderColor = '#EEF0F3' }}
        />
      )}
    </div>
  )
}

function ProfilePanel() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5 pb-5" style={{ borderBottom: '2px solid #F4F6F8' }}>
        <img
          src={`https://randomuser.me/api/portraits/${teacherProfile.gender}/${teacherProfile.photoId}.jpg`}
          alt={teacherProfile.name}
          className="rounded-full object-cover flex-shrink-0"
          style={{ width: 80, height: 80, border: '3px solid #EEF0F3' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div>
          <p className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacherProfile.name}</p>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{teacherProfile.subject} Teacher</p>
          <button className="mt-2 text-xs font-black px-3 py-1.5 rounded-lg transition-colors hover:bg-[#EEF0F3]"
            style={{ border: '1.5px solid #EEF0F3', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
            Change Photo
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FieldRow label="Full Name"   value={teacherProfile.name}    />
        <FieldRow label="Subject"     value={teacherProfile.subject} readOnly />
        <FieldRow label="Employee ID" value={teacherProfile.employeeId} readOnly />
        <FieldRow label="Email"       value={teacherProfile.email}   type="email" />
        <FieldRow label="Phone"       value={teacherProfile.phone}   type="tel" />
        <FieldRow label="School"      value={teacherProfile.school}  readOnly />
      </div>
      <FieldRow label="Address" value={teacherProfile.address} />
      <div>
        <label className="block text-xs font-black text-[#6B7280] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Assigned Classes</label>
        <div className="flex gap-2">
          {teacherClasses.map(c => (
            <span key={c.id} className="px-3 py-1.5 rounded-xl text-xs font-black"
              style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
              {c.name} – {c.subject}
            </span>
          ))}
        </div>
      </div>
      <div className="pt-2">
        <button className="px-6 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
          style={{ background: '#000E21', fontFamily: 'Roboto, sans-serif' }}>
          Save Changes
        </button>
      </div>
    </div>
  )
}

function SecurityPanel() {
  return (
    <div className="space-y-4 max-w-[400px]">
      <p className="text-sm font-semibold text-[#4B5563] leading-relaxed pb-2"
        style={{ fontFamily: 'Roboto, sans-serif', borderBottom: '2px solid #F4F6F8' }}>
        Update your account password. Use a strong, unique password.
      </p>
      <FieldRow label="Current Password" value="" type="password" />
      <FieldRow label="New Password"     value="" type="password" />
      <FieldRow label="Confirm Password" value="" type="password" />
      <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
        Password must be at least 8 characters and include a number.
      </p>
      <button className="px-6 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
        style={{ background: '#000E21', fontFamily: 'Roboto, sans-serif' }}>
        Update Password
      </button>
    </div>
  )
}

function NotificationsPanel() {
  const [prefs, setPrefs] = useState({
    email:       true,
    submissions: true,
    grades:      true,
    admin:       true,
    attendance:  false,
  })
  const items = [
    { key: 'email',       label: 'Email Notifications',   desc: 'Receive notifications via your registered email' },
    { key: 'submissions', label: 'Student Submissions',   desc: 'Notify when a student submits an assignment' },
    { key: 'grades',      label: 'Grade Reminders',       desc: 'Reminders to submit grades before deadlines' },
    { key: 'admin',       label: 'Admin Messages',        desc: 'Notifications from principal and administration' },
    { key: 'attendance',  label: 'Attendance Alerts',     desc: 'Alerts when you have not yet marked attendance' },
  ]
  return (
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.key} className="flex items-center justify-between py-3.5"
          style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{item.label}</p>
            <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.desc}</p>
          </div>
          <Toggle on={prefs[item.key]} onToggle={() => setPrefs(p => ({ ...p, [item.key]: !p[item.key] }))} />
        </div>
      ))}
    </div>
  )
}

function DisplayPanel() {
  return (
    <div className="space-y-4">
      {[
        { label: 'Language',      value: 'English (Liberia)' },
        { label: 'Time Zone',     value: 'Africa/Monrovia (GMT+0)' },
        { label: 'Academic Year', value: teacherSchoolInfo.academicYear },
        { label: 'Date Format',   value: 'Month DD, YYYY' },
      ].map(item => (
        <div key={item.label} className="flex items-center justify-between py-3.5"
          style={{ borderBottom: '1px solid #F4F6F8' }}>
          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{item.label}</p>
          <span className="text-sm font-bold text-[#6B7280] px-3 py-1.5 rounded-xl"
            style={{ background: '#F4F6F8', fontFamily: 'Roboto, sans-serif' }}>{item.value}</span>
        </div>
      ))}
    </div>
  )
}

function SystemPanel() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {[
        { label: 'NEMIS Version',  value: 'v2.4.1' },
        { label: 'School Code',    value: teacherSchoolInfo.code },
        { label: 'Employee ID',    value: teacherProfile.employeeId },
        { label: 'Last Login',     value: 'Feb 28, 2026 · 7:45 AM' },
        { label: 'Academic Year',  value: teacherSchoolInfo.academicYear },
        { label: 'District',       value: teacherSchoolInfo.district },
      ].map(item => (
        <div key={item.label} className="p-4 rounded-xl" style={{ background: '#F4F6F8' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#9CA3AF] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.label}</p>
          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{item.value}</p>
        </div>
      ))}
    </div>
  )
}

const PANEL_COMPONENTS = {
  profile:       <ProfilePanel />,
  security:      <SecurityPanel />,
  notifications: <NotificationsPanel />,
  display:       <DisplayPanel />,
  system:        <SystemPanel />,
}

export default function TeacherSettings() {
  const [active, setActive] = useState('profile')
  const sections = [...new Set(PANELS.map(p => p.section))]

  return (
    <div className="flex gap-5 max-w-[900px]" style={{ minHeight: 520 }}>
      {/* Left nav */}
      <div className="flex-shrink-0 bg-white rounded-2xl overflow-hidden"
        style={{ width: 200, border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)', alignSelf: 'start' }}>
        {sections.map(section => (
          <div key={section}>
            <p className="px-4 pt-4 pb-1.5 text-[10px] font-black uppercase tracking-widest text-[#9CA3AF]"
              style={{ fontFamily: 'Roboto, sans-serif' }}>{section}</p>
            {PANELS.filter(p => p.section === section).map(p => {
              const Icon = p.icon
              const isActive = active === p.id
              return (
                <button key={p.id}
                  onClick={() => setActive(p.id)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-black transition-all"
                  style={{
                    background: isActive ? '#002333' : 'transparent',
                    color: isActive ? '#fff' : '#6B7280',
                    fontFamily: 'Roboto, sans-serif',
                  }}>
                  <Icon size={14} strokeWidth={3} />
                  {p.label}
                </button>
              )
            })}
          </div>
        ))}
        <div className="h-4" />
      </div>

      {/* Right content */}
      <div className="flex-1 bg-white rounded-2xl p-7"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <h3 className="text-lg font-black text-[#002333] mb-5"
          style={{ fontFamily: 'Sora, sans-serif', borderBottom: '2px solid #F4F6F8', paddingBottom: 16 }}>
          {PANELS.find(p => p.id === active)?.label}
        </h3>
        {PANEL_COMPONENTS[active]}
      </div>
    </div>
  )
}
