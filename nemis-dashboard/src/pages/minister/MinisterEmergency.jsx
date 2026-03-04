import { useState } from 'react'
import { AlertCircle, X, Plus } from 'lucide-react'
import { emergencyIncidents } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const SEV_CFG = {
  Critical: { color: '#DC2626', bg: 'rgba(220,38,38,0.10)' },
  High:     { color: '#D97706', bg: 'rgba(217,119,6,0.10)' },
  Medium:   { color: '#2563EB', bg: 'rgba(37,99,235,0.10)' },
  Low:      { color: '#059669', bg: 'rgba(5,150,105,0.10)' },
}

const STATUS_CFG = {
  Active:          { color: '#DC2626', bg: 'rgba(220,38,38,0.10)' },
  'Under Control': { color: '#D97706', bg: 'rgba(217,119,6,0.10)' },
  'In Progress':   { color: '#2563EB', bg: 'rgba(37,99,235,0.10)' },
  Resolved:        { color: '#059669', bg: 'rgba(5,150,105,0.10)' },
}

function SevBadge({ severity }) {
  const cfg = SEV_CFG[severity] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{severity}</span>
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function IncidentPanel({ incident, onClose }) {
  const [activeForm, setActiveForm] = useState(null)
  const toggleForm = f => setActiveForm(prev => prev === f ? null : f)
  const sevColor = SEV_CFG[incident.severity]?.color || '#64748B'

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 440, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0', background: `${sevColor}06` }}>
          <div>
            <h3 className="text-sm font-black text-[#0F172A] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{incident.title}</h3>
            <p className="text-xs text-[#64748B] mt-1">{incident.county} · Reported {incident.reportedAt}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC] flex-shrink-0">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <div className="flex gap-2 flex-wrap">
            <SevBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Incident ID',       value: incident.id },
              { label: 'County',            value: incident.county },
              { label: 'Schools Affected',  value: incident.schoolsAffected },
              { label: 'Students Affected', value: incident.studentsAffected.toLocaleString() },
              { label: 'Reported',          value: incident.reportedAt },
              { label: 'Assigned To',       value: incident.assignedTo },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]">{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5 truncate">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ background: '#F8FAFC' }}>
            <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-2">Description</p>
            <p className="text-xs font-semibold text-[#475569] leading-relaxed">{incident.description}</p>
          </div>

          <div className="space-y-2 pt-2">
            {[
              { key: 'update',   label: 'Update Status' },
              { key: 'response', label: 'Log Response Action' },
              { key: 'escalate', label: 'Escalate to Cabinet', danger: true },
            ].map(btn => (
              <button key={btn.key} onClick={() => toggleForm(btn.key)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left"
                style={{
                  background: activeForm === btn.key ? (btn.danger ? '#DC2626' : ACCENT) : '#F8FAFC',
                  color: activeForm === btn.key ? '#fff' : btn.danger ? '#DC2626' : '#0F172A',
                  border: `1px solid ${activeForm === btn.key ? (btn.danger ? '#DC2626' : ACCENT) : btn.danger ? 'rgba(220,38,38,0.25)' : '#E2E8F0'}`,
                  fontFamily: 'Roboto, sans-serif',
                }}>
                {btn.label}
              </button>
            ))}
          </div>

          {activeForm === 'update' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Update Incident Status</p>
              <select className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                {['Active', 'Under Control', 'In Progress', 'Resolved'].map(s => (
                  <option key={s} selected={s === incident.status}>{s}</option>
                ))}
              </select>
              <textarea rows={2} placeholder="Status update note..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Update</button>
            </div>
          )}
          {activeForm === 'response' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Log Response Action</p>
              <input type="text" placeholder="Action taken..." className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <textarea rows={2} placeholder="Details..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Log Action</button>
            </div>
          )}
          {activeForm === 'escalate' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <p className="text-xs font-black text-[#DC2626]">Escalate to Cabinet</p>
              <p className="text-xs text-[#475569]">This will formally escalate the incident to the Cabinet of Liberia for emergency resource allocation.</p>
              <textarea rows={2} placeholder="Escalation justification..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: '#DC2626' }}>Confirm Escalation</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MinisterEmergency() {
  const [selected, setSelected] = useState(null)
  const [showReport, setShowReport] = useState(false)
  const [sevFilter, setSevFilter] = useState('All')

  const incident = emergencyIncidents.find(e => e.id === selected)

  const filtered = sevFilter === 'All' ? emergencyIncidents : emergencyIncidents.filter(e => e.severity === sevFilter)

  const active  = emergencyIncidents.filter(e => e.status === 'Active').length
  const total   = emergencyIncidents.length
  const students = emergencyIncidents.reduce((s, e) => s + e.studentsAffected, 0)

  return (
    <div className="space-y-5 max-w-[1100px]">
      {incident && <IncidentPanel incident={incident} onClose={() => setSelected(null)} />}

      {/* Critical banner */}
      {active > 0 && (
        <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
          <AlertCircle size={18} color="#DC2626" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-[#DC2626]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {active} Active Emergency Incident{active !== 1 ? 's' : ''}
            </p>
            <p className="text-xs font-semibold text-[#475569] mt-0.5">{students.toLocaleString()} students affected. Immediate ministerial attention required.</p>
          </div>
        </div>
      )}

      {/* Summary + header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="grid grid-cols-3 gap-4 flex-1">
          {[
            { label: 'Total Incidents',    value: total,    color: '#0F172A' },
            { label: 'Active',             value: active,   color: '#DC2626' },
            { label: 'Students Affected',  value: students.toLocaleString(), color: '#D97706' },
          ].map(c => (
            <div key={c.label} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
              <p className="text-2xl font-black" style={{ color: c.color, fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
              <p className="text-xs font-semibold text-[#64748B] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.label}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setShowReport(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white flex-shrink-0"
          style={{ background: '#DC2626' }}>
          <Plus size={14} strokeWidth={3} /> Report Incident
        </button>
      </div>

      {/* Report form */}
      {showReport && (
        <div className="rounded-2xl p-5 space-y-4" style={{ background: '#fff', border: '2px solid #DC2626' }}>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Report New Emergency Incident</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Title</label>
              <input type="text" placeholder="Incident title..." className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">County</label>
              <select className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                {['Montserrado', 'Nimba', 'Lofa', 'Grand Gedeh', 'Rivercess', 'Grand Kru', 'Bong', 'Margibi', 'Grand Bassa'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Severity</label>
              <select className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                {['Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Schools Affected</label>
              <input type="number" placeholder="0" className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Description</label>
              <textarea rows={3} placeholder="Describe the emergency..." className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowReport(false)} className="px-4 py-2 rounded-xl text-xs font-black text-[#64748B]"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>Cancel</button>
            <button className="px-4 py-2 rounded-xl text-xs font-black text-white" style={{ background: '#DC2626' }}>Report Incident</button>
          </div>
        </div>
      )}

      {/* Severity filter */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Critical', 'High', 'Medium'].map(s => (
          <button key={s} onClick={() => setSevFilter(s)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{
              background: sevFilter === s ? (s === 'All' ? ACCENT : SEV_CFG[s]?.color || ACCENT) : '#fff',
              color: sevFilter === s ? '#fff' : '#64748B',
              border: `1px solid ${sevFilter === s ? (s === 'All' ? ACCENT : SEV_CFG[s]?.color || ACCENT) : '#E2E8F0'}`,
              fontFamily: 'Roboto, sans-serif',
            }}>
            {s}
          </button>
        ))}
      </div>

      {/* Incident cards */}
      <div className="space-y-3">
        {filtered.map(inc => {
          const sevColor = SEV_CFG[inc.severity]?.color || '#64748B'
          return (
            <div key={inc.id}
              className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-sm"
              style={{ background: '#fff', border: `1px solid ${inc.status === 'Active' ? 'rgba(220,38,38,0.2)' : '#E2E8F0'}` }}
              onClick={() => setSelected(inc.id)}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${sevColor}12` }}>
                    <AlertCircle size={16} color={sevColor} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{inc.title}</p>
                      <SevBadge severity={inc.severity} />
                      <StatusBadge status={inc.status} />
                    </div>
                    <p className="text-xs font-semibold text-[#64748B] mb-2">{inc.county} · Reported {inc.reportedAt}</p>
                    <p className="text-xs font-semibold text-[#475569] leading-relaxed">{inc.description}</p>
                    <div className="flex gap-4 mt-3">
                      <p className="text-[10px] font-black text-[#DC2626]">{inc.schoolsAffected} schools affected</p>
                      <p className="text-[10px] font-black text-[#D97706]">{inc.studentsAffected.toLocaleString()} students</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 flex items-center gap-2" style={{ borderTop: '1px solid #F1F5F9' }}>
                <p className="text-[10px] font-semibold text-[#94A3B8]">Assigned: {inc.assignedTo}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
