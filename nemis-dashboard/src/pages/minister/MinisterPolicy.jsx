import { useState } from 'react'
import { FileText, Plus, X, CheckCircle, Clock } from 'lucide-react'
import { nationalPolicies } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const STATUS_CFG = {
  Active:       { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
  'Under Review':{ color: '#D97706', bg: 'rgba(217,119,6,0.10)' },
  Draft:        { color: '#64748B', bg: '#F1F5F9'               },
  Archived:     { color: '#94A3B8', bg: '#F8FAFC'               },
}

const CATEGORY_COLOR = {
  Attendance:     '#4F46E5',
  Teachers:       '#2563EB',
  Reporting:      '#0D9488',
  Infrastructure: '#D97706',
  Academic:       '#7C3AED',
  Access:         '#059669',
}

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function PolicyCard({ policy, onSelect }) {
  const catColor = CATEGORY_COLOR[policy.category] || '#64748B'

  return (
    <div className="rounded-2xl p-5 cursor-pointer transition-all hover:shadow-sm"
      style={{ background: '#fff', border: '1px solid #E2E8F0' }}
      onClick={() => onSelect(policy)}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${catColor}12` }}>
            <FileText size={15} color={catColor} strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-sm font-black text-[#0F172A] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{policy.title}</p>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full mt-1 inline-block"
              style={{ background: `${catColor}12`, color: catColor }}>{policy.category}</span>
          </div>
        </div>
        <StatusBadge status={policy.status} />
      </div>
      <p className="text-xs font-semibold text-[#475569] leading-relaxed mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {policy.description}
      </p>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <CheckCircle size={12} color="#94A3B8" strokeWidth={2.5} />
          <p className="text-[10px] font-semibold text-[#94A3B8]">Effective: {policy.effectiveDate || 'TBD'}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={12} color="#94A3B8" strokeWidth={2.5} />
          <p className="text-[10px] font-semibold text-[#94A3B8]">Updated: {policy.lastUpdated}</p>
        </div>
      </div>
    </div>
  )
}

function PolicyDetailPanel({ policy, onClose }) {
  const [activeForm, setActiveForm] = useState(null)
  const toggleForm = f => setActiveForm(prev => prev === f ? null : f)
  const catColor = CATEGORY_COLOR[policy.category] || '#64748B'

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 440, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 className="text-sm font-black text-[#0F172A] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{policy.title}</h3>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full mt-1.5 inline-block"
              style={{ background: `${catColor}12`, color: catColor }}>{policy.category}</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC] flex-shrink-0">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <StatusBadge status={policy.status} />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Policy ID',      value: policy.id },
              { label: 'Category',       value: policy.category },
              { label: 'Status',         value: policy.status },
              { label: 'Effective Date', value: policy.effectiveDate || 'Not set' },
              { label: 'Last Updated',   value: policy.lastUpdated },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]">{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-4" style={{ background: '#F8FAFC' }}>
            <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-2">Full Description</p>
            <p className="text-xs font-semibold text-[#475569] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{policy.description}</p>
          </div>

          <div className="space-y-2 pt-2">
            {[
              { key: 'amend',   label: 'Propose Amendment' },
              { key: 'archive', label: 'Archive Policy' },
              { key: 'notify',  label: 'Notify All CEOs' },
            ].map(btn => (
              <button key={btn.key} onClick={() => toggleForm(btn.key)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left"
                style={{ background: activeForm === btn.key ? ACCENT : '#F8FAFC', color: activeForm === btn.key ? '#fff' : '#0F172A', border: `1px solid ${activeForm === btn.key ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
                {btn.label}
              </button>
            ))}
          </div>

          {activeForm === 'amend' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Propose Amendment</p>
              <textarea rows={4} placeholder="Describe the proposed changes..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <input type="date" className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                placeholder="Proposed effective date"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Submit for Review</button>
            </div>
          )}
          {activeForm === 'archive' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.2)' }}>
              <p className="text-xs font-black text-[#DC2626]">Archive Policy</p>
              <p className="text-xs text-[#475569]">This policy will be moved to the archive and no longer enforced. This action is logged.</p>
              <textarea rows={2} placeholder="Reason for archiving..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: '#DC2626' }}>Confirm Archive</button>
            </div>
          )}
          {activeForm === 'notify' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Notify All CEOs</p>
              <textarea rows={3} placeholder="Message to attach with policy notification..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Send Notification</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MinisterPolicy() {
  const [selected, setSelected] = useState(null)
  const [showCompose, setShowCompose] = useState(false)
  const [catFilter, setCatFilter] = useState('All')

  const policy = nationalPolicies.find(p => p.id === selected)
  const cats = ['All', ...new Set(nationalPolicies.map(p => p.category))]

  const filtered = catFilter === 'All' ? nationalPolicies : nationalPolicies.filter(p => p.category === catFilter)

  return (
    <div className="space-y-5 max-w-[1100px]">
      {policy && <PolicyDetailPanel policy={policy} onClose={() => setSelected(null)} />}

      {/* Header row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>National Policies</h2>
          <p className="text-xs font-semibold text-[#94A3B8] mt-0.5">{nationalPolicies.filter(p => p.status === 'Active').length} active policies</p>
        </div>
        <button onClick={() => setShowCompose(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-white"
          style={{ background: ACCENT }}>
          <Plus size={14} strokeWidth={3} /> New Policy
        </button>
      </div>

      {/* Compose new policy */}
      {showCompose && (
        <div className="rounded-2xl p-5 space-y-4" style={{ background: '#fff', border: `2px solid ${ACCENT}` }}>
          <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Draft New Policy</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Title</label>
              <input type="text" placeholder="Policy title..." className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Category</label>
              <select className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                {['Attendance', 'Teachers', 'Reporting', 'Infrastructure', 'Academic', 'Access'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Effective Date</label>
              <input type="date" className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Initial Status</label>
              <select className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                <option>Draft</option>
                <option>Under Review</option>
                <option>Active</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Description</label>
              <textarea rows={3} placeholder="Full policy description..." className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowCompose(false)} className="px-4 py-2 rounded-xl text-xs font-black text-[#64748B]"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>Cancel</button>
            <button className="px-4 py-2 rounded-xl text-xs font-black text-white" style={{ background: ACCENT }}>Save Draft</button>
          </div>
        </div>
      )}

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setCatFilter(c)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold"
            style={{ background: catFilter === c ? ACCENT : '#fff', color: catFilter === c ? '#fff' : '#64748B', border: `1px solid ${catFilter === c ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {c}
          </button>
        ))}
      </div>

      {/* Policy cards */}
      <div className="space-y-3">
        {filtered.map(p => <PolicyCard key={p.id} policy={p} onSelect={p => setSelected(p.id)} />)}
      </div>
    </div>
  )
}
