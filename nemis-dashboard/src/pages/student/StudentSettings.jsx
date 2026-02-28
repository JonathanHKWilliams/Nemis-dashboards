import { useState } from 'react'
import { studentProfile, schoolInfo } from '../../data/studentData'
import { User, Lock, Bell, Info, Save, Eye, EyeOff, Mail, MessageSquare, BookOpen } from 'lucide-react'

const SETTINGS_MENU = [
  { id: 'profile',       label: 'My Profile',    icon: User  },
  { id: 'security',      label: 'Security',       icon: Lock  },
  { id: 'notifications', label: 'Notifications',  icon: Bell  },
  { id: 'about',         label: 'About',          icon: Info  },
]

const inputStyle = {
  width: '100%',
  padding: '11px 14px',
  borderRadius: 10,
  border: '2px solid #E5E7EB',
  fontSize: 14,
  fontFamily: 'Roboto, sans-serif',
  color: '#002333',
  fontWeight: 700,
  outline: 'none',
  background: '#fff',
}

const readonlyStyle = {
  ...inputStyle,
  background: '#F9FAFB',
  color: '#6B7280',
  cursor: 'default',
  border: '2px solid #EEF0F3',
}

function Label({ children }) {
  return (
    <label className="text-xs font-black text-[#6B7280] block mb-1.5 uppercase tracking-wide"
      style={{ fontFamily: 'Roboto, sans-serif' }}>
      {children}
    </label>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative inline-flex items-center flex-shrink-0 rounded-full transition-colors"
      style={{ width: 48, height: 26, background: checked ? '#002333' : '#D1D5DB' }}>
      <span className="absolute rounded-full bg-white transition-transform"
        style={{ width: 20, height: 20, left: 3, transform: checked ? 'translateX(22px)' : 'translateX(0)' }} />
    </button>
  )
}

// ── Profile Panel ─────────────────────────────────────────────────────────────
function ProfilePanel() {
  const [parentContact, setParentContact] = useState(studentProfile.parentContact)
  const [email, setEmail] = useState(studentProfile.email)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>My Profile</h3>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          View and update your personal information
        </p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-5 p-5 rounded-2xl" style={{ border: '2px solid #EEF0F3', background: '#FAFBFC' }}>
        <img
          src={`https://randomuser.me/api/portraits/${studentProfile.gender}/${studentProfile.photoId}.jpg`}
          alt={studentProfile.name}
          className="rounded-full object-cover flex-shrink-0"
          style={{ width: 80, height: 80, border: '3px solid #EEF0F3' }}
          onError={e => { e.target.style.display = 'none' }}
        />
        <div>
          <p className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{studentProfile.name}</p>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{studentProfile.id}</p>
          <p className="text-xs font-bold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {studentProfile.grade} · {studentProfile.school}
          </p>
        </div>
      </div>

      {/* Read-only fields */}
      <div>
        <p className="text-xs font-black text-[#9CA3AF] uppercase tracking-wider mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Academic Information (read-only)
        </p>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Full Name',        value: studentProfile.name },
            { label: 'Student ID',       value: studentProfile.id },
            { label: 'Class / Grade',    value: studentProfile.grade },
            { label: 'Date of Birth',    value: studentProfile.dateOfBirth },
            { label: 'Home Address',     value: studentProfile.address },
            { label: 'School',           value: studentProfile.school },
          ].map(f => (
            <div key={f.label}>
              <Label>{f.label}</Label>
              <input readOnly value={f.value} style={readonlyStyle} />
            </div>
          ))}
        </div>
      </div>

      {/* Editable fields */}
      <div style={{ borderTop: '2px solid #EEF0F3', paddingTop: 20 }}>
        <p className="text-xs font-black text-[#9CA3AF] uppercase tracking-wider mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Editable Contact Details
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Parent / Guardian Contact</Label>
            <input value={parentContact} onChange={e => setParentContact(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <Label>Email Address</Label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>
        </div>
      </div>

      <button onClick={handleSave}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
        style={{ background: saved ? '#16A34A' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
        <Save size={15} strokeWidth={3} />
        {saved ? 'Saved!' : 'Save Changes'}
      </button>
    </div>
  )
}

// ── Security Panel ────────────────────────────────────────────────────────────
function SecurityPanel() {
  const [currentPwd, setCurrentPwd] = useState('')
  const [newPwd, setNewPwd]         = useState('')
  const [showC, setShowC]           = useState(false)
  const [showN, setShowN]           = useState(false)
  const [saved, setSaved]           = useState(false)

  function handleSave() {
    if (!currentPwd || !newPwd) return
    setSaved(true)
    setCurrentPwd('')
    setNewPwd('')
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Security</h3>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Manage your password and account security
        </p>
      </div>

      <div className="p-5 rounded-2xl space-y-4" style={{ border: '2px solid #EEF0F3' }}>
        <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Change Password</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Current Password</Label>
            <div className="relative">
              <input
                type={showC ? 'text' : 'password'}
                value={currentPwd}
                onChange={e => setCurrentPwd(e.target.value)}
                placeholder="Enter current password"
                style={{ ...inputStyle, paddingRight: 42 }}
              />
              <button type="button" onClick={() => setShowC(!showC)}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                {showC ? <EyeOff size={16} color="#9CA3AF" strokeWidth={3} /> : <Eye size={16} color="#9CA3AF" strokeWidth={3} />}
              </button>
            </div>
          </div>
          <div>
            <Label>New Password</Label>
            <div className="relative">
              <input
                type={showN ? 'text' : 'password'}
                value={newPwd}
                onChange={e => setNewPwd(e.target.value)}
                placeholder="Enter new password"
                style={{ ...inputStyle, paddingRight: 42 }}
              />
              <button type="button" onClick={() => setShowN(!showN)}
                className="absolute right-3 top-1/2 -translate-y-1/2">
                {showN ? <EyeOff size={16} color="#9CA3AF" strokeWidth={3} /> : <Eye size={16} color="#9CA3AF" strokeWidth={3} />}
              </button>
            </div>
          </div>
        </div>
        <button onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
          style={{ background: saved ? '#16A34A' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
          <Save size={15} strokeWidth={3} />
          {saved ? 'Password Updated!' : 'Update Password'}
        </button>
      </div>

      <div className="p-5 rounded-2xl" style={{ border: '2px solid #EEF0F3' }}>
        <p className="text-sm font-black text-[#002333] mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Account Details</p>
        <p className="text-xs font-bold text-[#9CA3AF] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Your account is managed by St. Peter High School
        </p>
        <div className="flex items-center gap-3">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(schoolInfo.name)}&size=40&background=002333&color=48D08C&bold=true`}
            alt={schoolInfo.name}
            className="rounded-lg"
            style={{ width: 40, height: 40 }}
          />
          <div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{schoolInfo.name}</p>
            <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{schoolInfo.code}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Notifications Panel ───────────────────────────────────────────────────────
function NotificationsPanel() {
  const [notifs, setNotifs] = useState({
    grades:    true,
    messages:  true,
    resources: true,
    alerts:    true,
  })

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Notification Preferences</h3>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Choose what notifications you receive
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #EEF0F3' }}>
        {[
          { key: 'grades',    icon: BookOpen,      label: 'Grade Updates',        desc: 'When assignments or exams are graded' },
          { key: 'messages',  icon: MessageSquare, label: 'New Messages',         desc: 'When a teacher sends you a message' },
          { key: 'resources', icon: Bell,          label: 'New Resources',        desc: 'When new learning materials are uploaded' },
          { key: 'alerts',    icon: Mail,          label: 'School Announcements', desc: 'Important notices from school admin' },
        ].map((item, i) => {
          const Icon = item.icon
          return (
            <div key={item.key} className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: i < 3 ? '2px solid #EEF0F3' : 'none' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(37,99,235,0.08)' }}>
                  <Icon size={16} color="#002333" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{item.label}</p>
                  <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.desc}</p>
                </div>
              </div>
              <Toggle
                checked={notifs[item.key]}
                onChange={val => setNotifs(prev => ({ ...prev, [item.key]: val }))}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── About Panel ───────────────────────────────────────────────────────────────
function AboutPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>About</h3>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          System information
        </p>
      </div>

      <div className="p-5 rounded-2xl space-y-3" style={{ border: '2px solid #EEF0F3' }}>
        {[
          { label: 'Platform',       value: 'NEMIS Student Portal' },
          { label: 'Version',        value: '2.0.1' },
          { label: 'Academic Year',  value: schoolInfo.academicYear },
          { label: 'School',         value: schoolInfo.name },
          { label: 'School Code',    value: schoolInfo.code },
          { label: 'District',       value: schoolInfo.district },
          { label: 'Support Email',  value: schoolInfo.email },
          { label: 'Support Phone',  value: schoolInfo.phone },
        ].map((item, i) => (
          <div key={item.label} className="flex items-center justify-between py-2"
            style={{ borderBottom: i < 7 ? '1px solid #F4F6F8' : 'none' }}>
            <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.label}</span>
            <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function StudentSettings() {
  const [activeSection, setActiveSection] = useState('profile')

  function renderPanel() {
    switch (activeSection) {
      case 'profile':       return <ProfilePanel />
      case 'security':      return <SecurityPanel />
      case 'notifications': return <NotificationsPanel />
      case 'about':         return <AboutPanel />
      default:              return <ProfilePanel />
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Settings</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Manage your account and preferences
        </p>
      </div>

      <div className="flex gap-6 max-w-[900px]">
        {/* Settings sidebar */}
        <div className="flex-shrink-0 bg-white rounded-2xl overflow-hidden"
          style={{ width: 210, border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)', alignSelf: 'flex-start' }}>
          <div className="px-4 py-4" style={{ borderBottom: '2px solid #EEF0F3' }}>
            <p className="text-[11px] font-black text-[#9CA3AF] uppercase tracking-wider" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Settings Menu
            </p>
          </div>
          <nav className="py-2">
            {SETTINGS_MENU.map(item => {
              const Icon   = item.icon
              const active = activeSection === item.id
              return (
                <button key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all relative"
                  style={{
                    background: active ? 'rgba(0,35,51,0.05)' : 'transparent',
                    color: active ? '#002333' : '#6B7280',
                  }}>
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full"
                      style={{ background: '#002333' }} />
                  )}
                  <Icon size={16} strokeWidth={3} color={active ? '#002333' : '#9CA3AF'} />
                  <span className="text-sm font-black" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Settings content */}
        <div className="flex-1 bg-white rounded-2xl p-6"
          style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          {renderPanel()}
        </div>
      </div>
    </div>
  )
}
