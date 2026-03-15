import { useState } from 'react'
import { School, User, BookOpen, Settings, Bell, Save, Check, Upload } from 'lucide-react'
import { schoolInfo, principalProfile } from '../../data/principalData'

const ACCENT = '#0367A0'

const NAV = [
  { key: 'school',   label: 'School Profile',    icon: School },
  { key: 'account',  label: 'My Account',        icon: User },
  { key: 'academic', label: 'Academic Settings', icon: BookOpen },
  { key: 'notifs',   label: 'Notifications',     icon: Bell },
  { key: 'system',   label: 'System',            icon: Settings },
]

function SectionBlock({ title, desc, children }) {
  return (
    <div className="bg-white rounded-2xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
      {(title || desc) && (
        <div className="mb-5 pb-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          {title && <h3 className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>}
          {desc  && <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{desc}</p>}
        </div>
      )}
      {children}
    </div>
  )
}

function FieldRow({ label, hint, children }) {
  return (
    <div className="flex items-start justify-between gap-6 py-3.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
      <div className="min-w-[180px]">
        <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</p>
        {hint && <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{hint}</p>}
      </div>
      <div className="flex-1 max-w-sm">{children}</div>
    </div>
  )
}

function Input({ value, onChange, placeholder }) {
  return (
    <input type="text" value={value} onChange={onChange} placeholder={placeholder}
      className="w-full px-3 py-2 text-sm rounded-xl outline-none text-[#002333]"
      style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
      onFocus={e => e.target.style.borderColor = ACCENT}
      onBlur={e => e.target.style.borderColor = '#EEF0F3'} />
  )
}

function SaveBtn({ onClick, saved }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-black text-white transition-all"
      style={{ background: saved ? '#16A34A' : ACCENT, fontFamily: 'Lato, sans-serif' }}>
      {saved ? <Check size={14} strokeWidth={2.5} /> : <Save size={14} strokeWidth={2.5} />}
      {saved ? 'Saved!' : 'Save Changes'}
    </button>
  )
}

function Toggle({ on, onToggle }) {
  return (
    <button onClick={onToggle}
      className="flex items-center gap-2 text-sm"
      style={{ fontFamily: 'Lato, sans-serif', color: on ? ACCENT : '#9CA3AF' }}>
      <div className="w-10 h-5.5 rounded-full relative transition-colors"
        style={{ background: on ? ACCENT : '#D1D5DB', width: 40, height: 22 }}>
        <div className="absolute top-0.5 rounded-full transition-all"
          style={{ width: 18, height: 18, background: '#fff', left: on ? 20 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
      </div>
      <span>{on ? 'Enabled' : 'Disabled'}</span>
    </button>
  )
}

function SchoolProfile() {
  const [form, setForm] = useState({
    name: schoolInfo.name,
    code: schoolInfo.code,
    county: schoolInfo.county,
    district: schoolInfo.district,
    address: schoolInfo.address,
    type: schoolInfo.type,
    level: schoolInfo.level,
    established: schoolInfo.established,
  })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="School Identity" desc="Official school information as registered in NEMIS">
        <div className="flex items-center gap-5 mb-5 pb-5" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white flex-shrink-0"
            style={{ background: ACCENT, fontFamily: 'Sora, sans-serif' }}>
            SM
          </div>
          <div>
            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>School Logo</p>
            <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>JPG or PNG · max 2MB</p>
            <button className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              <Upload size={12} strokeWidth={2.5} /> Upload Logo
            </button>
          </div>
        </div>
        <FieldRow label="School Name" hint="Official registered name">
          <Input value={form.name} onChange={e => set('name', e.target.value)} />
        </FieldRow>
        <FieldRow label="NEMIS Code" hint="Assigned school code">
          <Input value={form.code} onChange={e => set('code', e.target.value)} />
        </FieldRow>
        <FieldRow label="County" hint="County of operation">
          <Input value={form.county} onChange={e => set('county', e.target.value)} />
        </FieldRow>
        <FieldRow label="District" hint="Administrative district">
          <Input value={form.district} onChange={e => set('district', e.target.value)} />
        </FieldRow>
        <FieldRow label="School Address" hint="Physical location">
          <Input value={form.address} onChange={e => set('address', e.target.value)} />
        </FieldRow>
        <FieldRow label="School Type">
          <select value={form.type} onChange={e => set('type', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl outline-none"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC', color: '#002333' }}>
            {['Public', 'Private', 'Faith-Based', 'Community'].map(t => <option key={t}>{t}</option>)}
          </select>
        </FieldRow>
        <FieldRow label="School Level">
          <select value={form.level} onChange={e => set('level', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl outline-none"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC', color: '#002333' }}>
            {['K–12', 'Elementary', 'Junior High', 'Senior High'].map(t => <option key={t}>{t}</option>)}
          </select>
        </FieldRow>
      </SectionBlock>
      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function MyAccount() {
  const [form, setForm] = useState({
    firstName: 'James', lastName: 'K. Freeman',
    email: principalProfile.email,
    phone: principalProfile.phone,
    role: 'School Principal',
  })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="Profile" desc="Your personal account details">
        <div className="flex items-center gap-5 mb-5 pb-5" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <img
            src={`https://randomuser.me/api/portraits/${principalProfile.gender}/${principalProfile.photoId}.jpg`}
            alt={principalProfile.name}
            className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
            style={{ border: '2px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div>
            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Profile Photo</p>
            <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>JPG or PNG · max 2MB</p>
            <button className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
              style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              <Upload size={12} strokeWidth={2.5} /> Change Photo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'First Name', k: 'firstName' }, { label: 'Last Name', k: 'lastName' },
            { label: 'Email Address', k: 'email' },   { label: 'Phone', k: 'phone' },
          ].map(({ label, k }) => (
            <div key={k}>
              <label className="block text-xs font-bold text-[#4B5563] mb-1.5 uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</label>
              <Input value={form[k]} onChange={e => set(k, e.target.value)} />
            </div>
          ))}
        </div>
        <FieldRow label="Role / Title">
          <Input value={form.role} onChange={e => set('role', e.target.value)} />
        </FieldRow>
      </SectionBlock>
      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function AcademicSettings() {
  const [form, setForm] = useState({
    academicYear: '2025–2026',
    currentTerm: '1st Semester',
    termStart: 'January 6, 2026',
    termEnd: 'April 30, 2026',
  })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const subjects = ['Mathematics', 'English Language', 'English Literature', 'Science', 'Biology', 'Chemistry', 'Physics', 'Social Studies', 'History', 'French', 'ICT', 'Physical Education', 'Music & Arts', 'Agriculture', 'Economics', 'Religious Studies', 'Civic Education', 'Guidance & Counseling', 'Geography']

  return (
    <div className="space-y-6">
      <SectionBlock title="Academic Year & Semester" desc="Configure the current academic period">
        <FieldRow label="Academic Year">
          <Input value={form.academicYear} onChange={e => set('academicYear', e.target.value)} />
        </FieldRow>
        <FieldRow label="Current Semester">
          <select value={form.currentTerm} onChange={e => set('currentTerm', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-xl outline-none"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC', color: '#002333' }}>
            {['1st Semester', '2nd Semester'].map(t => <option key={t}>{t}</option>)}
          </select>
        </FieldRow>
        <FieldRow label="Semester Start Date">
          <Input value={form.termStart} onChange={e => set('termStart', e.target.value)} />
        </FieldRow>
        <FieldRow label="Semester End Date">
          <Input value={form.termEnd} onChange={e => set('termEnd', e.target.value)} />
        </FieldRow>
      </SectionBlock>

      <SectionBlock title="Subjects Offered" desc="List of subjects taught at this school">
        <div className="flex flex-wrap gap-2 pt-2">
          {subjects.map(subj => (
            <span key={subj} className="text-xs font-black px-3 py-1.5 rounded-xl"
              style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              {subj}
            </span>
          ))}
        </div>
      </SectionBlock>

      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function NotificationSettings() {
  const [prefs, setPrefs] = useState([
    { label: 'Attendance Alerts',      hint: 'Daily attendance summary',          email: true,  sms: true  },
    { label: 'Fee Payment Updates',    hint: 'Payments received and balances',    email: true,  sms: false },
    { label: 'DEO Communications',     hint: 'Messages from District Education Office', email: true, sms: true },
    { label: 'Teacher Leave Requests', hint: 'Staff leave and substitute alerts', email: true,  sms: false },
    { label: 'Compliance Reminders',   hint: 'NEMIS submission deadlines',        email: true,  sms: true  },
    { label: 'Incident Reports',       hint: 'Safety and behavioral incidents',   email: true,  sms: true  },
  ])
  const [saved, setSaved] = useState(false)
  const toggle = (i, ch) => setPrefs(p => p.map((r, idx) => idx === i ? { ...r, [ch]: !r[ch] } : r))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="Notification Preferences" desc="Choose how you receive alerts and updates">
        <div className="grid grid-cols-[1fr_80px_80px] gap-2 pb-2 mb-1" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>Category</span>
          {['Email', 'SMS'].map(c => (
            <span key={c} className="text-[11px] font-black uppercase tracking-wider text-[#374151] text-center" style={{ fontFamily: 'Lato, sans-serif' }}>{c}</span>
          ))}
        </div>
        {prefs.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[1fr_80px_80px] gap-2 py-3.5 items-center" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.label}</p>
              <p className="text-xs font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.hint}</p>
            </div>
            {['email', 'sms'].map(ch => (
              <div key={ch} className="flex justify-center">
                <button onClick={() => toggle(i, ch)}
                  className="w-5 h-5 rounded flex items-center justify-center transition-all"
                  style={{ background: r[ch] ? ACCENT : '#F4F6F8', border: r[ch] ? 'none' : '1px solid #D1D5DB' }}>
                  {r[ch] && <Check size={11} color="#fff" />}
                </button>
              </div>
            ))}
          </div>
        ))}
      </SectionBlock>
      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function SystemSettings() {
  const [autoBackup, setAutoBackup] = useState(true)
  const [debugMode, setDebugMode]   = useState(false)
  const [saved, setSaved] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="System Configuration" desc="Platform behavior settings">
        <FieldRow label="Auto Backup" hint="Automatic daily data backup">
          <Toggle on={autoBackup} onToggle={() => setAutoBackup(p => !p)} />
        </FieldRow>
        <FieldRow label="Debug Logging" hint="Verbose logs for technical support">
          <Toggle on={debugMode} onToggle={() => setDebugMode(p => !p)} />
        </FieldRow>
      </SectionBlock>
      <SectionBlock title="School Code" desc="Your unique NEMIS identifier">
        <div className="flex items-center gap-3 p-4 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
          <span className="text-sm font-black font-mono text-[#002333]">{schoolInfo.code}</span>
          <span className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
            · Contact DEO to update your school code.
          </span>
        </div>
      </SectionBlock>
      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

const PAGES = {
  school:   SchoolProfile,
  account:  MyAccount,
  academic: AcademicSettings,
  notifs:   NotificationSettings,
  system:   SystemSettings,
}

export default function PrincipalSettings() {
  const [activeSection, setActiveSection] = useState('school')
  const PageComponent = PAGES[activeSection]

  return (
    <div className="flex gap-6 max-w-[1180px]">
      <div className="w-[220px] flex-shrink-0">
        <div className="bg-white rounded-2xl overflow-hidden sticky top-6"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="px-4 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>Settings</p>
          </div>
          <nav className="p-2">
            {NAV.map(({ key, label, icon: Icon }) => {
              const active = activeSection === key
              return (
                <button key={key} onClick={() => setActiveSection(key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-semibold text-left transition-all mb-0.5"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    background: active ? 'rgba(3,103,160,0.07)' : 'transparent',
                    color: active ? '#002333' : '#6B7280',
                    borderLeft: active ? `3px solid ${ACCENT}` : '3px solid transparent',
                  }}>
                  <Icon size={15} strokeWidth={2.5} style={{ color: active ? ACCENT : '#6B7280' }} />
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <PageComponent />
      </div>
    </div>
  )
}
