import { useState } from 'react'
import { X, ChevronRight, Search } from 'lucide-react'
import { counties, nationalDEOs } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function StatusBadge({ status }) {
  const cfg = {
    Healthy:          { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    'Needs Attention':{ color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
    Critical:         { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
    Active:           { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Flagged:          { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function CEODetailPanel({ county, onClose }) {
  const [activeForm, setActiveForm] = useState(null)

  const toggleForm = form => setActiveForm(prev => prev === form ? null : form)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 420, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${county.gender}/${county.photoId}.jpg`}
              alt={county.ceo} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <h3 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{county.ceo}</h3>
              <p className="text-xs font-semibold text-[#64748B]">CEO · {county.name} County</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <StatusBadge status={county.status} />

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'County',       value: county.name },
              { label: 'Districts',    value: county.districts },
              { label: 'Schools',      value: county.schools.toLocaleString() },
              { label: 'Students',     value: county.students.toLocaleString() },
              { label: 'Teachers',     value: county.teachers.toLocaleString() },
              { label: 'Attendance',   value: `${county.attendance}%` },
              { label: 'Performance',  value: `${county.performance}%` },
              { label: 'Compliance',   value: `${county.compliance}%` },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.value}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            {[
              { key: 'message',  label: 'Send Message' },
              { key: 'review',   label: 'Request Performance Review' },
              { key: 'report',   label: 'Request County Report' },
            ].map(btn => (
              <button key={btn.key} onClick={() => toggleForm(btn.key)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left transition-all"
                style={{ background: activeForm === btn.key ? ACCENT : '#F8FAFC', color: activeForm === btn.key ? '#fff' : '#0F172A', border: `1px solid ${activeForm === btn.key ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
                {btn.label}
              </button>
            ))}
          </div>

          {activeForm === 'message' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Send Message to CEO</p>
              <input type="text" placeholder="Subject..." className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <textarea rows={3} placeholder="Type your message..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Send</button>
            </div>
          )}
          {activeForm === 'review' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Request Performance Review</p>
              <select className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                <option>Standard Review</option>
                <option>Urgent Review</option>
                <option>Annual Evaluation</option>
              </select>
              <textarea rows={2} placeholder="Reason / notes..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Submit Request</button>
            </div>
          )}
          {activeForm === 'report' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Request County Report</p>
              <select className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                <option>Monthly Academic</option>
                <option>Attendance</option>
                <option>Infrastructure</option>
                <option>Finance</option>
              </select>
              <input type="date" className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Request Report</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DEODetailPanel({ deo, onClose }) {
  const [activeForm, setActiveForm] = useState(null)
  const toggleForm = f => setActiveForm(prev => prev === f ? null : f)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 420, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${deo.gender}/${deo.photoId}.jpg`}
              alt={deo.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <h3 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{deo.name}</h3>
              <p className="text-xs font-semibold text-[#64748B]">DEO · {deo.district}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 flex-1">
          <StatusBadge status={deo.status} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'DEO ID',     value: deo.id },
              { label: 'County',     value: deo.county },
              { label: 'District',   value: deo.district },
              { label: 'Schools',    value: deo.schools },
              { label: 'Compliance', value: `${deo.compliance}%` },
              { label: 'Flagged',    value: deo.flagged },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]">{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5">{f.value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 pt-2">
            {[{ key: 'message', label: 'Send Message' }, { key: 'escalate', label: 'Escalate Issue' }].map(btn => (
              <button key={btn.key} onClick={() => toggleForm(btn.key)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left"
                style={{ background: activeForm === btn.key ? ACCENT : '#F8FAFC', color: activeForm === btn.key ? '#fff' : '#0F172A', border: `1px solid ${activeForm === btn.key ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
                {btn.label}
              </button>
            ))}
          </div>
          {activeForm === 'message' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <textarea rows={3} placeholder="Type your message to the DEO..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Send</button>
            </div>
          )}
          {activeForm === 'escalate' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <textarea rows={3} placeholder="Describe the issue to escalate..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: '#DC2626' }}>Escalate</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MinisterAdministration() {
  const [tab, setTab] = useState('CEOs')
  const [search, setSearch] = useState('')
  const [selectedCEO, setSelectedCEO] = useState(null)
  const [selectedDEO, setSelectedDEO] = useState(null)

  const selectedCounty = counties.find(c => c.id === selectedCEO)
  const selectedDEOData = nationalDEOs.find(d => d.id === selectedDEO)

  const filteredCounties = counties.filter(c => {
    const q = search.toLowerCase()
    return !q || c.name.toLowerCase().includes(q) || c.ceo.toLowerCase().includes(q)
  })
  const filteredDEOs = nationalDEOs.filter(d => {
    const q = search.toLowerCase()
    return !q || d.name.toLowerCase().includes(q) || d.county.toLowerCase().includes(q) || d.district.toLowerCase().includes(q)
  })

  return (
    <div className="space-y-5 max-w-[1100px]">
      {selectedCounty && <CEODetailPanel county={selectedCounty} onClose={() => setSelectedCEO(null)} />}
      {selectedDEOData && <DEODetailPanel deo={selectedDEOData} onClose={() => setSelectedDEO(null)} />}

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'County CEOs',     value: 15 },
          { label: 'District DEOs',   value: nationalDEOs.length },
          { label: 'Active Officers', value: nationalDEOs.filter(d => d.status === 'Active').length + counties.filter(c => c.status === 'Healthy').length },
          { label: 'Flagged Officers',value: nationalDEOs.filter(d => d.status === 'Flagged').length },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
            <p className="text-xs font-semibold text-[#64748B] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex gap-2">
          {['CEOs', 'DEOs'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-2 rounded-xl text-xs font-bold"
              style={{ background: tab === t ? ACCENT : '#fff', color: tab === t ? '#fff' : '#64748B', border: `1px solid ${tab === t ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-[220px]"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <Search size={15} color="#94A3B8" strokeWidth={2.5} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={tab === 'CEOs' ? 'Search by county or CEO...' : 'Search by name, county, district...'}
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
      </div>

      {/* CEO Table */}
      {tab === 'CEOs' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['CEO', 'County', 'Districts', 'Schools', 'Students', 'Attendance', 'Performance', 'Compliance', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                    style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCounties.map((c, i) => (
                <tr key={c.id} className="cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                  onClick={() => setSelectedCEO(c.id)}
                  style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
                        alt={c.ceo} className="rounded-full object-cover flex-shrink-0"
                        style={{ width: 30, height: 30, border: '1.5px solid #E2E8F0' }}
                        onError={e => { e.target.style.display = 'none' }} />
                      <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.ceo}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{c.name}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-[#334155]">{c.districts}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-[#334155]">{c.schools.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{c.students.toLocaleString()}</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.attendance >= 80 ? '#059669' : c.attendance >= 65 ? '#D97706' : '#DC2626' }}>{c.attendance}%</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.performance >= 70 ? '#059669' : c.performance >= 55 ? '#D97706' : '#DC2626' }}>{c.performance}%</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.compliance >= 80 ? '#059669' : c.compliance >= 65 ? '#D97706' : '#DC2626' }}>{c.compliance}%</td>
                  <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3.5"><ChevronRight size={14} color="#94A3B8" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* DEO Table */}
      {tab === 'DEOs' && (
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                {['DEO', 'County', 'District', 'Schools', 'Compliance', 'Flagged', 'Status', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                    style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDEOs.map((d, i) => (
                <tr key={d.id} className="cursor-pointer hover:bg-[#F8FAFC] transition-colors"
                  onClick={() => setSelectedDEO(d.id)}
                  style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <img src={`https://randomuser.me/api/portraits/${d.gender}/${d.photoId}.jpg`}
                        alt={d.name} className="rounded-full object-cover flex-shrink-0"
                        style={{ width: 30, height: 30, border: '1.5px solid #E2E8F0' }}
                        onError={e => { e.target.style.display = 'none' }} />
                      <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{d.name}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{d.county}</td>
                  <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{d.district}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-[#334155]">{d.schools}</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: d.compliance >= 80 ? '#059669' : d.compliance >= 65 ? '#D97706' : '#DC2626' }}>{d.compliance}%</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: d.flagged > 3 ? '#DC2626' : '#D97706' }}>{d.flagged}</td>
                  <td className="px-4 py-3.5"><StatusBadge status={d.status} /></td>
                  <td className="px-4 py-3.5"><ChevronRight size={14} color="#94A3B8" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
