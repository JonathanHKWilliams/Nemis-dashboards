import { User, Shield } from 'lucide-react'
import { ministerProfile } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function Section({ title, children }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
      <h3 className="text-sm font-black text-[#0F172A] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, value, type = 'text', readonly = false }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-wide text-[#94A3B8] mb-1.5 block"
        style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        readOnly={readonly}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
        style={{
          background: readonly ? '#F9FAFB' : '#F4F6F8',
          border: '1px solid #E2E8F0',
          color: readonly ? '#94A3B8' : '#0F172A',
          fontFamily: 'Roboto, sans-serif',
          cursor: readonly ? 'default' : 'text',
        }}
      />
    </div>
  )
}

function Toggle({ label, description, defaultOn = false }) {
  return (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F3F4F6' }}>
      <div>
        <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</p>
        {description && <p className="text-[10px] font-semibold text-[#94A3B8] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{description}</p>}
      </div>
      <div className="relative flex-shrink-0">
        <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" id={label.replace(/\s/g, '-')} />
        <label htmlFor={label.replace(/\s/g, '-')}
          className="block w-10 h-5 rounded-full cursor-pointer transition-colors peer-checked:bg-[#4F46E5]"
          style={{ background: defaultOn ? ACCENT : '#D1D5DB' }} />
      </div>
    </div>
  )
}

export default function MinisterSettings() {
  return (
    <div className="space-y-6 max-w-[720px]">

      {/* Profile */}
      <Section title="Profile Information">
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <img
              src={`https://randomuser.me/api/portraits/${ministerProfile.gender}/${ministerProfile.photoId}.jpg`}
              alt={ministerProfile.name} className="rounded-2xl object-cover"
              style={{ width: 76, height: 76, border: `3px solid ${ACCENT}` }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: ACCENT, cursor: 'pointer' }}>
              <User size={13} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-lg font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{ministerProfile.name}</p>
            <p className="text-sm font-semibold text-[#64748B]" style={{ fontFamily: 'Roboto, sans-serif' }}>{ministerProfile.title}</p>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full mt-1 inline-block"
              style={{ background: `${ACCENT}15`, color: ACCENT }}>Minister · {ministerProfile.ministry.split('–')[0].trim()}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name"      value={ministerProfile.name} />
          <Field label="Employee ID"    value={ministerProfile.employeeId} readonly />
          <Field label="Email"          value={ministerProfile.email} type="email" />
          <Field label="Phone"          value={ministerProfile.phone} type="tel" />
          <div className="col-span-2">
            <Field label="Office Address" value={ministerProfile.office} readonly />
          </div>
          <div className="col-span-2">
            <Field label="Ministry"     value={ministerProfile.ministry} readonly />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-5 py-2.5 rounded-xl text-xs font-black text-white"
            style={{ background: ACCENT }}>
            Save Changes
          </button>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notification Preferences">
        <Toggle label="County Emergency Alerts"     description="Notify on critical incidents from any county"   defaultOn={true} />
        <Toggle label="Missing Report Alerts"       description="Notify when county reports are overdue"         defaultOn={true} />
        <Toggle label="Infrastructure Alerts"       description="Notify on critical infrastructure issues"        defaultOn={true} />
        <Toggle label="Low Attendance Alerts"       description="Notify when national attendance drops below 75%" defaultOn={true} />
        <Toggle label="Report Submission Alerts"    description="Notify when national reports are submitted"      defaultOn={true} />
        <Toggle label="Policy Update Alerts"        description="Notify when policies are amended or archived"    defaultOn={true} />
        <Toggle label="Budget Alerts"               description="Notify on budget utilization anomalies"          defaultOn={false} />
        <Toggle label="Message Notifications"       description="Notify on new CEO messages"                     defaultOn={true} />
        <Toggle label="System Announcements"        description="Receive NEMIS system updates"                   defaultOn={true} />
      </Section>

      {/* Security */}
      <Section title="Security">
        <div className="grid grid-cols-1 gap-4">
          <Field label="Current Password" value="" type="password" />
          <Field label="New Password"     value="" type="password" />
          <Field label="Confirm Password" value="" type="password" />
        </div>
        <div className="flex items-center gap-3 mt-4 p-3 rounded-xl"
          style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}15` }}>
          <Shield size={16} color={ACCENT} strokeWidth={2.5} />
          <p className="text-xs font-semibold" style={{ color: '#374151', fontFamily: 'Roboto, sans-serif' }}>
            Last sign-in: Today, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · Ministry of Education, Capitol Hill
          </p>
        </div>
        <div className="flex items-center gap-3 mt-3 p-3 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
          <Shield size={16} color="#059669" strokeWidth={2.5} />
          <p className="text-xs font-semibold" style={{ color: '#374151', fontFamily: 'Roboto, sans-serif' }}>
            Two-factor authentication is <span className="font-black text-[#059669]">enabled</span> for this account
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-5 py-2.5 rounded-xl text-xs font-black text-white"
            style={{ background: ACCENT }}>
            Update Password
          </button>
        </div>
      </Section>

    </div>
  )
}
