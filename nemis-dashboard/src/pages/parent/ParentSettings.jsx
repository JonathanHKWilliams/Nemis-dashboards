import { useState } from 'react'
import { User, Lock, Bell, UserPlus, Info } from 'lucide-react'
import { parentProfile } from '../../data/parentData'

const ACCENT = '#C084FC'

const PANELS = [
  { id: 'profile',  label: 'My Profile',    icon: User     },
  { id: 'security', label: 'Security',       icon: Lock     },
  { id: 'notifs',   label: 'Notifications', icon: Bell     },
  { id: 'addchild', label: 'Add a Child',   icon: UserPlus },
  { id: 'system',   label: 'System Info',   icon: Info     },
]

function Toggle({ value, onChange }) {
  return (
    <button onClick={() => onChange(!value)}
      className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
      style={{ background: value ? ACCENT : '#E5E7EB' }}>
      <span className="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all"
        style={{ left: value ? 26 : 4 }} />
    </button>
  )
}

function FieldRow({ label, value, readOnly }) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {label}
      </label>
      <input defaultValue={value} readOnly={readOnly}
        className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none transition-all"
        style={{ background: readOnly ? '#F4F6F8' : '#F9FAFB', border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
        onFocus={e => { if (!readOnly) e.target.style.border = `1.5px solid ${ACCENT}` }}
        onBlur={e => { e.target.style.border = '1.5px solid #EEF0F3' }}
      />
    </div>
  )
}

function ProfilePanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 p-4 rounded-xl" style={{ background: '#F4F6F8' }}>
        <div className="relative">
          <img
            src={`https://randomuser.me/api/portraits/${parentProfile.gender}/${parentProfile.photoId}.jpg`}
            alt={parentProfile.name} className="rounded-full"
            style={{ width: 64, height: 64, border: `3px solid ${ACCENT}` }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
            style={{ background: ACCENT }}>+</button>
        </div>
        <div>
          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{parentProfile.name}</p>
          <p className="text-xs text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>ID: {parentProfile.parentId}</p>
          <p className="text-xs text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{parentProfile.location}</p>
        </div>
      </div>
      <FieldRow label="Full Name" value={parentProfile.name} />
      <FieldRow label="Parent ID" value={parentProfile.parentId} readOnly />
      <FieldRow label="Phone Number" value={parentProfile.phone} />
      <FieldRow label="Email Address" value={parentProfile.email} />
      <FieldRow label="Location" value={parentProfile.location} />
      <button className="px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
        style={{ background: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
        Save Changes
      </button>
    </div>
  )
}

function SecurityPanel() {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ background: 'rgba(192,132,252,0.07)', border: '1px solid rgba(192,132,252,0.2)' }}>
        <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Keep your account secure. Use a strong password and never share your login credentials.
        </p>
      </div>
      <FieldRow label="Current Password" value="" />
      <FieldRow label="New Password" value="" />
      <FieldRow label="Confirm New Password" value="" />
      <button className="px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
        style={{ background: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
        Update Password
      </button>
    </div>
  )
}

function NotifsPanel() {
  const [prefs, setPrefs] = useState({
    grades:      true,
    attendance:  true,
    assignments: true,
    fees:        true,
    messages:    true,
    alerts:      false,
  })
  const labels = { grades: 'Grade updates', attendance: 'Attendance changes', assignments: 'New assignments', fees: 'Fee reminders', messages: 'New messages', alerts: 'School alerts' }

  return (
    <div className="space-y-3">
      {Object.entries(prefs).map(([key, val]) => (
        <div key={key} className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: '#F9FAFB', border: '1px solid #EEF0F3' }}>
          <div>
            <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{labels[key]}</p>
          </div>
          <Toggle value={val} onChange={v => setPrefs(p => ({ ...p, [key]: v }))} />
        </div>
      ))}
    </div>
  )
}

function AddChildPanel() {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
        <p className="text-xs font-bold text-[#B45309]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Adding a child requires school approval. Fill in your child's Student ID and school. The school administrator will confirm the link.
        </p>
      </div>
      <FieldRow label="Child's Full Name" value="" />
      <FieldRow label="Student ID" value="" />
      <FieldRow label="School Name" value="" />
      <FieldRow label="Grade / Class" value="" />
      <button className="px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
        style={{ background: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
        Submit Request
      </button>
    </div>
  )
}

function SystemPanel() {
  return (
    <div className="space-y-3">
      {[
        { label: 'System', value: 'NEMIS – Grand Bassa' },
        { label: 'Portal', value: 'Parent Dashboard' },
        { label: 'Version', value: '2.1.0' },
        { label: 'Parent ID', value: parentProfile.parentId },
        { label: 'Children Linked', value: '6' },
        { label: 'Last Login', value: 'Feb 28, 2026 · 8:30 AM' },
      ].map(row => (
        <div key={row.label} className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: '#F9FAFB', border: '1px solid #EEF0F3' }}>
          <span className="text-xs font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{row.label}</span>
          <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{row.value}</span>
        </div>
      ))}
    </div>
  )
}

export default function ParentSettings() {
  const [panel, setPanel] = useState('profile')

  const PANEL_COMPONENTS = { profile: ProfilePanel, security: SecurityPanel, notifs: NotifsPanel, addchild: AddChildPanel, system: SystemPanel }
  const PanelComp = PANEL_COMPONENTS[panel] || ProfilePanel

  return (
    <div className="flex gap-6">
      {/* Side nav */}
      <div className="flex-shrink-0 rounded-2xl overflow-hidden" style={{ width: 200, background: '#fff', border: '1px solid #EEF0F3', alignSelf: 'start' }}>
        <div className="px-4 py-3.5" style={{ background: '#002333', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Settings</p>
        </div>
        <nav className="p-2">
          {PANELS.map(p => {
            const Icon = p.icon
            const active = panel === p.id
            return (
              <button key={p.id} onClick={() => setPanel(p.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 text-left transition-all relative"
                style={{
                  background: active ? 'rgba(192,132,252,0.10)' : 'transparent',
                  color: active ? ACCENT : '#6B7280',
                }}>
                {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background: ACCENT }} />}
                <Icon size={15} strokeWidth={active ? 3 : 2.5} />
                <span className="text-[13px] font-bold" style={{ fontFamily: 'Roboto, sans-serif' }}>{p.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Panel content */}
      <div className="flex-1 rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <p className="text-sm font-black text-[#002333] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
          {PANELS.find(p => p.id === panel)?.label}
        </p>
        <PanelComp />
      </div>
    </div>
  )
}
