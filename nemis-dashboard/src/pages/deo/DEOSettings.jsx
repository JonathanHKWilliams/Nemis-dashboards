import { User, Bell, Shield, Building2, Mail, Phone } from 'lucide-react'
import { deoProfile } from '../../data/deoData'

const ACCENT = '#0D9488'

function Section({ title, children }) {
  return (
    <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
      <h3 className="text-sm font-black text-[#002333] mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, value, type = 'text', readonly = false }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-wide text-[#9CA3AF] mb-1.5 block" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</label>
      <input
        type={type}
        defaultValue={value}
        readOnly={readonly}
        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          background: readonly ? '#F9FAFB' : '#F4F6F8',
          border: `1px solid ${readonly ? '#EEF0F3' : '#EEF0F3'}`,
          color: readonly ? '#9CA3AF' : '#002333',
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
        <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{label}</p>
        {description && <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{description}</p>}
      </div>
      <div className="relative flex-shrink-0">
        <input type="checkbox" defaultChecked={defaultOn} className="sr-only peer" id={label.replace(/\s/g, '-')} />
        <label htmlFor={label.replace(/\s/g, '-')}
          className="block w-10 h-5 rounded-full cursor-pointer transition-colors peer-checked:bg-[#0D9488]"
          style={{ background: defaultOn ? ACCENT : '#D1D5DB' }} />
      </div>
    </div>
  )
}

export default function DEOSettings() {
  return (
    <div className="space-y-6 max-w-[720px]">

      {/* Profile */}
      <Section title="Profile Information">
        <div className="flex items-center gap-5 mb-6">
          <div className="relative">
            <img
              src={`https://randomuser.me/api/portraits/${deoProfile.gender}/${deoProfile.photoId}.jpg`}
              alt={deoProfile.name} className="rounded-2xl object-cover"
              style={{ width: 76, height: 76, border: `3px solid ${ACCENT}` }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: ACCENT, cursor: 'pointer' }}>
              <User size={13} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <p className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{deoProfile.name}</p>
            <p className="text-sm font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{deoProfile.title}</p>
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full mt-1 inline-block"
              style={{ background: 'rgba(13,148,136,0.10)', color: ACCENT }}>DEO · {deoProfile.district}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name"      value={deoProfile.name} />
          <Field label="Employee ID"    value={deoProfile.employeeId} readonly />
          <Field label="Email"          value={deoProfile.email} type="email" />
          <Field label="Phone"          value={deoProfile.phone} type="tel" />
          <Field label="District"       value={deoProfile.district} readonly />
          <Field label="County"         value={deoProfile.county} readonly />
          <div className="col-span-2">
            <Field label="Office Address" value={deoProfile.office} readonly />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-5 py-2.5 rounded-xl text-xs font-black text-white transition-colors"
            style={{ background: ACCENT }}>
            Save Changes
          </button>
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notification Preferences">
        <Toggle label="Report Submission Alerts"     description="Notify when schools submit reports" defaultOn={true} />
        <Toggle label="Missing Report Alerts"        description="Notify when reports are overdue"     defaultOn={true} />
        <Toggle label="Infrastructure Issue Alerts"  description="Notify on new issues flagged"        defaultOn={true} />
        <Toggle label="Low Attendance Alerts"        description="Notify when attendance drops below 75%" defaultOn={true} />
        <Toggle label="Message Notifications"        description="Notify on new messages"              defaultOn={true} />
        <Toggle label="Finance Alerts"               description="Notify on fee compliance issues"     defaultOn={false} />
        <Toggle label="District Announcements"       description="Receive ministry updates"            defaultOn={true} />
      </Section>

      {/* Security */}
      <Section title="Security">
        <div className="grid grid-cols-1 gap-4">
          <Field label="Current Password" value="" type="password" />
          <Field label="New Password"     value="" type="password" />
          <Field label="Confirm Password" value="" type="password" />
        </div>
        <div className="flex items-center gap-3 mt-4 p-3 rounded-xl"
          style={{ background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)' }}>
          <Shield size={16} color={ACCENT} strokeWidth={2.5} />
          <p className="text-xs font-semibold" style={{ color: '#374151', fontFamily: 'Roboto, sans-serif' }}>
            Last sign-in: Today, {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · Buchanan District office
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-5 py-2.5 rounded-xl text-xs font-black text-white transition-colors"
            style={{ background: ACCENT }}>
            Update Password
          </button>
        </div>
      </Section>

    </div>
  )
}
