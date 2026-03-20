import { useState } from 'react'
import {
  Settings as SettingsIcon, User, Shield, Bell, Plug, Database,
  ChevronRight, Save, Eye, EyeOff, Upload, Check, RefreshCw,
  Globe, Moon, Sun, Monitor, Trash2, Plus, X, ToggleLeft, ToggleRight
} from 'lucide-react'

const NAV = [
  { key: 'general',       label: 'General',              icon: SettingsIcon },
  { key: 'account',       label: 'Account & Profile',    icon: User },
  { key: 'security',      label: 'Security',             icon: Shield },
  { key: 'notifications', label: 'Notification Prefs',   icon: Bell },
  { key: 'integrations',  label: 'Integrations',         icon: Plug },
  { key: 'system',        label: 'System Config',        icon: Database },
]

/* ─── shared ──────────────────────────────────────────────────── */
function SectionBlock({ title, desc, children }) {
  return (
    <div className="bg-white rounded-xl p-6" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
      {(title || desc) && (
        <div className="mb-5 pb-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          {title && <h3 className="text-[15px] font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>}
          {desc  && <p  className="text-xs font-semibold text-[#4B5563] mt-0.5"             style={{ fontFamily: 'Lato, sans-serif' }}>{desc}</p>}
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

function Input({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
      style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
      onFocus={e => e.target.style.borderColor = '#0367A0'}
      onBlur={e => e.target.style.borderColor = '#EEF0F3'}
    />
  )
}

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 text-sm"
      style={{ fontFamily: 'Lato, sans-serif', color: on ? '#16A34A' : '#9CA3AF' }}
    >
      {on
        ? <ToggleRight size={26} strokeWidth={2.5} style={{ color: '#0367A0' }} />
        : <ToggleLeft  size={26} strokeWidth={2.5} style={{ color: '#CBD5E1' }} />}
      <span>{on ? 'Enabled' : 'Disabled'}</span>
    </button>
  )
}

function SaveBtn({ onClick, saved }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-medium text-white transition-all"
      style={{ background: saved ? '#16A34A' : '#002333', fontFamily: 'Lato, sans-serif' }}
    >
      {saved ? <Check size={14} strokeWidth={2.5} /> : <Save size={14} strokeWidth={2.5} />}
      {saved ? 'Saved!' : 'Save Changes'}
    </button>
  )
}

/* ─── sub-pages ───────────────────────────────────────────────── */
function General() {
  const [form, setForm] = useState({
    systemName: 'NEMIS – National Education Management Information System',
    acronym: 'NEMIS',
    country: 'Liberia',
    timezone: 'Africa/Monrovia',
    language: 'English (en)',
    dateFormat: 'MMM D, YYYY',
    fiscalStart: 'January',
    theme: 'light',
  })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="Platform Identity" desc="Core branding and regional configuration">
        <FieldRow label="System Name" hint="Displayed in headers and reports">
          <Input value={form.systemName} onChange={e => set('systemName', e.target.value)} />
        </FieldRow>
        <FieldRow label="Acronym" hint="Short identifier used across the system">
          <Input value={form.acronym} onChange={e => set('acronym', e.target.value)} placeholder="e.g. NEMIS" />
        </FieldRow>
        <FieldRow label="Country" hint="Jurisdiction of this NEMIS instance">
          <Input value={form.country} onChange={e => set('country', e.target.value)} />
        </FieldRow>
      </SectionBlock>

      <SectionBlock title="Regional Settings" desc="Locale, timezone, and date formatting">
        <FieldRow label="Timezone">
          <select
            value={form.timezone}
            onChange={e => set('timezone', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
          >
            {['Africa/Monrovia', 'Africa/Accra', 'Africa/Lagos', 'UTC'].map(tz => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </FieldRow>
        <FieldRow label="Language">
          <select
            value={form.language}
            onChange={e => set('language', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
          >
            {['English (en)', 'French (fr)'].map(l => <option key={l}>{l}</option>)}
          </select>
        </FieldRow>
        <FieldRow label="Date Format">
          <select
            value={form.dateFormat}
            onChange={e => set('dateFormat', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
          >
            {['MMM D, YYYY', 'DD/MM/YYYY', 'MM-DD-YYYY', 'YYYY-MM-DD'].map(f => <option key={f}>{f}</option>)}
          </select>
        </FieldRow>
        <FieldRow label="Fiscal Year Start">
          <select
            value={form.fiscalStart}
            onChange={e => set('fiscalStart', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
          >
            {['January','July','October'].map(m => <option key={m}>{m}</option>)}
          </select>
        </FieldRow>
      </SectionBlock>

      <SectionBlock title="Appearance" desc="Interface theme preference">
        <div className="flex gap-3 pt-1">
          {[
            { key: 'light',  label: 'Light',  Icon: Sun },
            { key: 'dark',   label: 'Dark',   Icon: Moon },
            { key: 'system', label: 'System', Icon: Monitor },
          ].map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => set('theme', key)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                fontFamily: 'Lato, sans-serif',
                background: form.theme === key ? '#002333' : '#F4F6F8',
                color: form.theme === key ? '#fff' : '#6B7280',
                border: form.theme === key ? 'none' : '1px solid #EEF0F3',
              }}
            >
              <Icon size={14} strokeWidth={2.5} /> {label}
            </button>
          ))}
        </div>
      </SectionBlock>

      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function Account() {
  const [form, setForm] = useState({
    firstName: 'Emma', lastName: 'K. Johnson',
    email: 'e.johnson@nemis.gov.lr',
    phone: '+231-770-000-001',
    role: 'Chief Executive Officer',
    department: 'Education Management',
    bio: 'Overseeing the National Education Management Information System for the Republic of Liberia.',
  })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="Profile" desc="Your personal account details">
        <div className="flex items-center gap-5 mb-5 pb-5" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
            style={{ background: '#002333', fontFamily: 'Sora, sans-serif' }}>
            EK
          </div>
          <div>
            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Profile Photo</p>
            <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>JPG, PNG or GIF — max 2MB</p>
            <button className="mt-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
              <Upload size={12} strokeWidth={2.5} /> Upload Photo
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'First Name', k: 'firstName' }, { label: 'Last Name', k: 'lastName' },
            { label: 'Email Address', k: 'email' },  { label: 'Phone Number', k: 'phone' },
            { label: 'Role / Title', k: 'role' },    { label: 'Department', k: 'department' },
          ].map(({ label, k }) => (
            <div key={k}>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1.5 uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</label>
              <Input value={form[k]} onChange={e => set(k, e.target.value)} />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label className="block text-xs font-semibold text-[#4B5563] mb-1.5 uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>Bio</label>
          <textarea
            value={form.bio}
            onChange={e => set('bio', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333] resize-none"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
            onFocus={e => e.target.style.borderColor = '#0367A0'}
            onBlur={e => e.target.style.borderColor = '#EEF0F3'}
          />
        </div>
      </SectionBlock>
      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function Security() {
  const [showOld, setShowOld] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [twoFA, setTwoFA] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState('30')
  const [pwForm, setPwForm] = useState({ old: '', newPw: '', confirm: '' })
  const [saved, setSaved] = useState(false)
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  const sessions = [
    { device: 'Chrome on macOS', ip: '196.5.22.14',  location: 'Monrovia, Liberia',    time: 'Now (current)', current: true },
    { device: 'Firefox on Windows', ip: '41.66.3.120', location: 'Paynesville, Liberia', time: '2h ago',       current: false },
    { device: 'Safari on iPhone',   ip: '102.89.4.5',  location: 'Gbarnga, Liberia',    time: '1 day ago',     current: false },
  ]

  return (
    <div className="space-y-6">
      <SectionBlock title="Change Password" desc="Use a strong password with mixed case, numbers and symbols">
        <div className="space-y-3">
          {[
            { label: 'Current Password', key: 'old', show: showOld, toggle: () => setShowOld(p => !p) },
            { label: 'New Password',     key: 'newPw', show: showNew, toggle: () => setShowNew(p => !p) },
            { label: 'Confirm New Password', key: 'confirm', show: showNew, toggle: () => setShowNew(p => !p) },
          ].map(({ label, key, show, toggle }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-[#4B5563] mb-1.5 uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={pwForm[key]}
                  onChange={e => setPwForm(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 text-sm rounded-lg outline-none text-[#002333]"
                  style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
                  onFocus={e => e.target.style.borderColor = '#0367A0'}
                  onBlur={e => e.target.style.borderColor = '#EEF0F3'}
                />
                <button onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
                  {show ? <EyeOff size={14} strokeWidth={2.5} /> : <Eye size={14} strokeWidth={2.5} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock title="Two-Factor Authentication" desc="Add an extra layer of sign-in security">
        <FieldRow label="2FA via Authenticator App" hint="Require OTP on every login">
          <Toggle on={twoFA} onToggle={() => setTwoFA(p => !p)} />
        </FieldRow>
        <FieldRow label="Session Timeout" hint="Auto logout after inactivity (minutes)">
          <select
            value={sessionTimeout}
            onChange={e => setSessionTimeout(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
          >
            {['15','30','60','120','Never'].map(v => <option key={v}>{v}</option>)}
          </select>
        </FieldRow>
      </SectionBlock>

      <SectionBlock title="Active Sessions" desc="All devices currently signed in to your account">
        <div className="space-y-2">
          {sessions.map((s) => (
            <div key={s.ip} className="flex items-center justify-between p-3.5 rounded-lg"
              style={{ background: s.current ? 'rgba(3,103,160,0.06)' : '#FAFBFC', border: `1px solid ${s.current ? 'rgba(3,103,160,0.18)' : '#EEF0F3'}` }}>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.device}</p>
                <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{s.ip} · {s.location} · {s.time}</p>
              </div>
              {s.current
                ? <span className="text-xs px-2.5 py-[3px] rounded-full font-medium" style={{ background: 'rgba(3,103,160,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}>Current</span>
                : <button className="text-xs px-2.5 py-[3px] rounded-full font-medium" style={{ background: 'rgba(166,0,3,0.08)', color: '#A60003', fontFamily: 'Lato, sans-serif' }}>Revoke</button>}
            </div>
          ))}
        </div>
      </SectionBlock>

      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function NotificationPrefs() {
  const categories = [
    { label: 'School Approvals',        hint: 'New applications and status changes',   email: true,  push: true,  sms: false },
    { label: 'Teacher Reports',          hint: 'Monthly submission alerts',              email: true,  push: false, sms: false },
    { label: 'District Alerts',          hint: 'Compliance and performance flags',       email: false, push: true,  sms: true  },
    { label: 'System Events',            hint: 'Maintenance and update notices',         email: true,  push: false, sms: false },
    { label: 'Finance Notifications',    hint: 'Budget threshold and fund releases',     email: true,  push: true,  sms: false },
    { label: 'Security Alerts',          hint: 'Failed logins and anomaly detection',    email: true,  push: true,  sms: true  },
  ]
  const [prefs, setPrefs] = useState(categories)
  const [saved, setSaved] = useState(false)
  const toggle = (i, channel) => setPrefs(p => p.map((r, idx) => idx === i ? { ...r, [channel]: !r[channel] } : r))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="Notification Channels" desc="Configure how and when you receive alerts per category">
        <div>
          <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 pb-2 mb-1"
            style={{ borderBottom: '1px solid #EEF0F3' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>Category</span>
            {['Email','Push','SMS'].map(c => (
              <span key={c} className="text-[11px] font-bold uppercase tracking-wider text-[#374151] text-center" style={{ fontFamily: 'Lato, sans-serif' }}>{c}</span>
            ))}
          </div>
          {prefs.map((r, i) => (
            <div key={r.label} className="grid grid-cols-[1fr_80px_80px_80px] gap-2 py-3.5 items-center" style={{ borderBottom: '1px solid #F4F6F8' }}>
              <div>
                <p className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.label}</p>
                <p className="text-xs font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.hint}</p>
              </div>
              {(['email','push','sms']).map(ch => (
                <div key={ch} className="flex justify-center">
                  <button onClick={() => toggle(i, ch)}
                    className="w-5 h-5 rounded flex items-center justify-center transition-all"
                    style={{ background: r[ch] ? '#002333' : '#F4F6F8', border: r[ch] ? 'none' : '1px solid #D1D5DB' }}>
                    {r[ch] && <Check size={11} color="#fff" />}
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </SectionBlock>
      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

function Integrations() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Liberia Revenue Authority API', desc: 'Budget tracking and fund reconciliation', status: true,  tag: 'Finance',    tagColor: '#D97706', tagBg: 'rgba(245,158,11,0.09)' },
    { id: 2, name: 'SMS Gateway (Lonestar MTN)',    desc: 'Automated SMS alerts to DEOs and principals', status: true,  tag: 'Messaging',  tagColor: '#2563EB', tagBg: 'rgba(37,99,235,0.09)' },
    { id: 3, name: 'Google Workspace SSO',          desc: 'Single sign-on via institutional Google accounts', status: false, tag: 'Auth',       tagColor: '#16A34A', tagBg: 'rgba(22,163,74,0.09)' },
    { id: 4, name: 'UNHCR Data Sync',               desc: 'Refugee student enrollment synchronisation', status: false, tag: 'Data Sync',   tagColor: '#7C3AED', tagBg: 'rgba(124,58,237,0.09)' },
    { id: 5, name: 'Email Service (SendGrid)',       desc: 'Transactional email delivery for reports and alerts', status: true,  tag: 'Messaging',  tagColor: '#2563EB', tagBg: 'rgba(37,99,235,0.09)' },
  ])
  const toggle = (id) => setIntegrations(p => p.map(i => i.id === id ? { ...i, status: !i.status } : i))

  return (
    <div className="space-y-6">
      <SectionBlock title="Connected Services" desc="Manage third-party integrations and API connections">
        <div className="space-y-3">
          {integrations.map(intg => (
            <div key={intg.id} className="flex items-center justify-between p-4 rounded-xl"
              style={{ background: '#FAFBFC', border: '1px solid #EEF0F3' }}>
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: intg.tagBg }}>
                  <Plug size={16} strokeWidth={2.5} style={{ color: intg.tagColor }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{intg.name}</p>
                    <span className="text-[10px] px-2 py-[2px] rounded-full" style={{ background: intg.tagBg, color: intg.tagColor, fontFamily: 'Lato, sans-serif' }}>{intg.tag}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{intg.desc}</p>
                </div>
              </div>
              <Toggle on={intg.status} onToggle={() => toggle(intg.id)} />
            </div>
          ))}
        </div>
        <button className="mt-4 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: 'rgba(0,35,51,0.06)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          <Plus size={14} strokeWidth={2.5} /> Add Integration
        </button>
      </SectionBlock>
    </div>
  )
}

function SystemConfig() {
  const [cfg, setCfg] = useState({
    maxUploadMB: '25',
    auditRetentionDays: '365',
    reportRetentionDays: '730',
    maintenanceMode: false,
    debugMode: false,
    analyticsEnabled: true,
    autoBackup: true,
    backupFrequency: 'Daily',
  })
  const [saved, setSaved] = useState(false)
  const set = (k, v) => setCfg(p => ({ ...p, [k]: v }))
  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div className="space-y-6">
      <SectionBlock title="Data Retention" desc="Configure how long system data is stored">
        <FieldRow label="Max Upload Size" hint="Maximum file upload size in megabytes">
          <div className="flex items-center gap-2">
            <Input value={cfg.maxUploadMB} onChange={e => set('maxUploadMB', e.target.value)} />
            <span className="text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>MB</span>
          </div>
        </FieldRow>
        <FieldRow label="Audit Log Retention" hint="Days to retain system audit logs">
          <div className="flex items-center gap-2">
            <Input value={cfg.auditRetentionDays} onChange={e => set('auditRetentionDays', e.target.value)} />
            <span className="text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>days</span>
          </div>
        </FieldRow>
        <FieldRow label="Report Retention" hint="Days to keep generated reports">
          <div className="flex items-center gap-2">
            <Input value={cfg.reportRetentionDays} onChange={e => set('reportRetentionDays', e.target.value)} />
            <span className="text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>days</span>
          </div>
        </FieldRow>
      </SectionBlock>

      <SectionBlock title="System Toggles" desc="Platform-wide feature flags and modes">
        <FieldRow label="Maintenance Mode" hint="Temporarily disable access for non-admin users">
          <Toggle on={cfg.maintenanceMode} onToggle={() => set('maintenanceMode', !cfg.maintenanceMode)} />
        </FieldRow>
        <FieldRow label="Debug Logging" hint="Enable verbose logging (dev use only)">
          <Toggle on={cfg.debugMode} onToggle={() => set('debugMode', !cfg.debugMode)} />
        </FieldRow>
        <FieldRow label="Usage Analytics" hint="Collect anonymised usage data to improve the platform">
          <Toggle on={cfg.analyticsEnabled} onToggle={() => set('analyticsEnabled', !cfg.analyticsEnabled)} />
        </FieldRow>
      </SectionBlock>

      <SectionBlock title="Backup Configuration" desc="Automated database and file backup settings">
        <FieldRow label="Auto Backup" hint="Schedule automatic system backups">
          <Toggle on={cfg.autoBackup} onToggle={() => set('autoBackup', !cfg.autoBackup)} />
        </FieldRow>
        <FieldRow label="Backup Frequency" hint="How often automated backups run">
          <select
            value={cfg.backupFrequency}
            onChange={e => set('backupFrequency', e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#002333]"
            style={{ border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', background: '#FAFBFC' }}
          >
            {['Hourly','Daily','Weekly','Monthly'].map(f => <option key={f}>{f}</option>)}
          </select>
        </FieldRow>
        <div className="mt-4 pt-2">
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
            <RefreshCw size={13} strokeWidth={2.5} /> Run Backup Now
          </button>
        </div>
      </SectionBlock>

      <SectionBlock title="Danger Zone" desc="Irreversible system operations">
        <div className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: 'rgba(166,0,3,0.04)', border: '1px solid rgba(166,0,3,0.14)' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: '#A60003', fontFamily: 'Sora, sans-serif' }}>Reset All Settings</p>
            <p className="text-xs font-semibold text-[#4B5563] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>Restore all configurations to factory defaults. This cannot be undone.</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: '#A60003', fontFamily: 'Lato, sans-serif' }}>
            <Trash2 size={13} strokeWidth={2.5} /> Reset
          </button>
        </div>
      </SectionBlock>

      <div className="flex justify-end"><SaveBtn onClick={save} saved={saved} /></div>
    </div>
  )
}

const PAGES = { general: General, account: Account, security: Security, notifications: NotificationPrefs, integrations: Integrations, system: SystemConfig }

/* ─── main export ─────────────────────────────────────────────── */
export default function Settings() {
  const [activeSection, setActiveSection] = useState('general')
  const PageComponent = PAGES[activeSection]

  return (
    <div className="flex gap-6 max-w-[1180px]">
      {/* Settings Sidebar */}
      <div className="w-[220px] flex-shrink-0">
        <div className="bg-white rounded-xl overflow-hidden sticky top-6"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="px-4 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>Settings</p>
          </div>
          <nav className="p-2">
            {NAV.map(({ key, label, icon: Icon }) => {
              const active = activeSection === key
              return (
                <button
                  key={key}
                  onClick={() => setActiveSection(key)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-r-lg text-sm font-black text-left transition-all mb-0.5"
                  style={{
                    fontFamily: 'Lato, sans-serif',
                    background: active ? 'rgba(0,35,51,0.07)' : 'transparent',
                    color: '#002333',
                    borderLeft: active ? '3px solid #0367A0' : '3px solid transparent',
                  }}
                >
                  <Icon size={15} strokeWidth={2.5} style={{ color: active ? '#0367A0' : '#002333' }} />
                  {label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <PageComponent />
      </div>
    </div>
  )
}
