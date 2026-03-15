import { CheckCircle, XCircle, AlertTriangle, ShieldCheck, AlertCircle, Clock } from 'lucide-react'
import { complianceItems, safetyDrills, incidentReports, principalNotifications } from '../../data/principalData'

const ACCENT = '#0367A0'

const complianceCfg = {
  Compliant: { icon: CheckCircle, color: '#0367A0', bg: 'rgba(3,103,160,0.08)' },
  Pending:   { icon: Clock,       color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  Overdue:   { icon: XCircle,     color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
}

const incidentStatusCfg = {
  Open:   { bg: '#A60003', color: '#fff' },
  Closed: { bg: '#0367A0', color: '#fff' },
}

const notifTypeCfg = {
  warning: { icon: AlertTriangle, color: '#D97706', bg: 'rgba(217,119,6,0.06)', border: 'rgba(217,119,6,0.18)' },
  alert:   { icon: AlertCircle,   color: '#A60003', bg: 'rgba(166,0,3,0.06)',   border: 'rgba(166,0,3,0.18)' },
  info:    { icon: CheckCircle,   color: ACCENT,    bg: 'rgba(3,103,160,0.06)', border: 'rgba(3,103,160,0.18)' },
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
        <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
        {subtitle && <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

export default function PrincipalCompliance() {
  const compliantCount = complianceItems.filter(c => c.status === 'Compliant').length
  const pendingCount   = complianceItems.filter(c => c.status === 'Pending').length

  return (
    <div className="space-y-5 max-w-[1180px]">

      {/* Compliance Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Compliant',       value: compliantCount, color: ACCENT },
          { label: 'Action Required', value: pendingCount,   color: '#D97706' },
          { label: 'Total Items',     value: complianceItems.length, color: '#002333' },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.color}14` }}>
              <ShieldCheck size={22} style={{ color: c.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
              <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* NEMIS Compliance Checklist */}
        <SectionCard title="NEMIS Compliance Checklist" subtitle="Required submissions and regulatory status">
          <div className="divide-y divide-[#F4F6F8]">
            {complianceItems.map(item => {
              const cfg = complianceCfg[item.status] || complianceCfg.Pending
              const Icon = cfg.icon
              return (
                <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.bg }}>
                    <Icon size={16} style={{ color: cfg.color }} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#002333] leading-snug" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {item.label}
                    </p>
                    <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {item.date}
                    </p>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ background: cfg.bg, color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
                    {item.status}
                  </span>
                </div>
              )
            })}
          </div>
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="System Notifications" subtitle="Alerts and actions requiring attention">
          <div className="divide-y divide-[#F4F6F8]">
            {principalNotifications.map(notif => {
              const cfg = notifTypeCfg[notif.type] || notifTypeCfg.info
              const Icon = cfg.icon
              return (
                <div key={notif.id} className="px-6 py-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
                    <Icon size={15} style={{ color: cfg.color, flexShrink: 0, marginTop: 2 }} strokeWidth={2.5} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-black text-[#002333] leading-snug" style={{ fontFamily: 'Lato, sans-serif' }}>
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
                        )}
                      </div>
                      <p className="text-[10px] font-semibold mt-1 leading-relaxed"
                        style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                        {notif.message}
                      </p>
                      <p className="text-[10px] font-semibold mt-1" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                        {notif.time}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">

        {/* Safety Drill Logs */}
        <SectionCard title="Safety Drill Log" subtitle="Completed safety exercises">
          <div className="divide-y divide-[#F4F6F8]">
            {safetyDrills.map(drill => (
              <div key={drill.id} className="px-6 py-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(3,103,160,0.08)' }}>
                  <ShieldCheck size={16} style={{ color: ACCENT }} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {drill.type}
                  </p>
                  <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {drill.date} · {drill.participants}
                  </p>
                  <p className="text-xs font-semibold text-[#6B7280] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {drill.outcome}
                  </p>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                  Completed
                </span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* Incident Reports */}
        <SectionCard title="Incident Reports" subtitle="School incidents and status">
          <div className="divide-y divide-[#F4F6F8]">
            {incidentReports.map(inc => {
              const sc = incidentStatusCfg[inc.status]
              return (
                <div key={inc.id} className="px-6 py-4 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: inc.status === 'Open' ? 'rgba(166,0,3,0.08)' : 'rgba(3,103,160,0.08)' }}>
                    <AlertTriangle size={16} style={{ color: inc.status === 'Open' ? '#A60003' : ACCENT }} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {inc.type}
                      </p>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0"
                        style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                        {inc.status}
                      </span>
                    </div>
                    <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {inc.date} · Reported by {inc.reportedBy}
                    </p>
                    <p className="text-xs font-semibold text-[#6B7280] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {inc.description}
                    </p>
                  </div>
                </div>
              )
            })}
            <div className="px-6 py-4">
              <button className="text-xs font-black px-4 py-2.5 rounded-xl text-white"
                style={{ background: '#A60003', fontFamily: 'Lato, sans-serif' }}>
                + File New Incident
              </button>
            </div>
          </div>
        </SectionCard>

      </div>
    </div>
  )
}
