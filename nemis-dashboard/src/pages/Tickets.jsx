import { useState } from 'react'
import { Plus, Headphones, Clock, CheckCircle, X, RefreshCw } from 'lucide-react'

const PRIORITIES = ['Critical', 'High', 'Medium', 'Low']
const CATEGORIES = ['Login / Access', 'Data Error', 'Performance', 'Feature Request', 'Report Issue', 'Other']

const PRIORITY_CFG = {
  Critical: { color: '#1F2937', bg: '#F4F6F8' },
  High:     { color: '#1F2937', bg: '#F4F6F8' },
  Medium:   { color: '#1F2937', bg: '#F4F6F8' },
  Low:      { color: '#1F2937', bg: '#F4F6F8' },
}

const STATUS_CFG = {
  Open:         { color: '#1F2937', bg: '#F4F6F8', icon: Clock },
  'In Progress':{ color: '#1F2937', bg: '#F4F6F8', icon: RefreshCw },
  Resolved:     { color: '#1F2937', bg: '#F4F6F8', icon: CheckCircle },
  Closed:       { color: '#1F2937', bg: '#F4F6F8', icon: X },
}

const initialTickets = [
  { id: 'TKT-001', title: 'Cannot log in to NEMIS portal', category: 'Login / Access', priority: 'Critical', status: 'In Progress', created: '2026-02-28', updated: '2026-02-28', description: 'All staff at Buchanan High School are unable to log in since the system update yesterday. Getting "Invalid credentials" error.', assignedTo: 'NEMIS IT Team' },
  { id: 'TKT-002', title: 'Student enrollment data showing incorrect figures', category: 'Data Error', priority: 'High', status: 'Open', created: '2026-02-27', updated: '2026-02-27', description: 'The enrollment figures for District 3 show 450 but the actual count is 612. Discrepancy may affect reports.', assignedTo: 'Unassigned' },
  { id: 'TKT-003', title: 'Reports page loads very slowly', category: 'Performance', priority: 'Medium', status: 'Open', created: '2026-02-25', updated: '2026-02-26', description: 'The reports generation page takes 40+ seconds to load. This affects daily operations.', assignedTo: 'NEMIS IT Team' },
  { id: 'TKT-004', title: 'Attendance export missing two schools', category: 'Report Issue', priority: 'High', status: 'Resolved', created: '2026-02-20', updated: '2026-02-22', description: 'Attendance export CSV was missing Tweh Farm Primary and St. Patrick Secondary.', assignedTo: 'NEMIS IT Team' },
  { id: 'TKT-005', title: 'Request: Add bulk teacher upload feature', category: 'Feature Request', priority: 'Low', status: 'Open', created: '2026-02-15', updated: '2026-02-15', description: 'It would save significant time to be able to upload teacher records via Excel instead of one by one.', assignedTo: 'Product Team' },
]

function Badge({ label, color, bg }) {
  return (
    <span className="text-[10px] font-bold px-2.5 py-[3px] rounded-full"
      style={{ background: bg, color, fontFamily: 'Lato, sans-serif' }}>{label}</span>
  )
}

function TicketRow({ ticket, onSelect }) {
  const priCfg = PRIORITY_CFG[ticket.priority]
  const stCfg  = STATUS_CFG[ticket.status]
  const StIcon = stCfg.icon
  return (
    <tr className="transition-colors cursor-pointer" style={{ borderTop: '1px solid #F4F6F8' }}
      onClick={() => onSelect(ticket)}
      onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
      onMouseLeave={e => { e.currentTarget.style.background = '' }}>
      <td className="px-5 py-4">
        <div>
          <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{ticket.title}</p>
          <p className="text-[10px] font-semibold text-[#6B7280] mt-0.5 font-mono">{ticket.id}</p>
        </div>
      </td>
      <td className="px-5 py-4 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{ticket.category}</td>
      <td className="px-5 py-4"><Badge label={ticket.priority} color={priCfg.color} bg={priCfg.bg} /></td>
      <td className="px-5 py-4">
        <div className="flex items-center gap-1.5">
          <StIcon size={12} strokeWidth={2.5} style={{ color: stCfg.color }} />
          <Badge label={ticket.status} color={stCfg.color} bg={stCfg.bg} />
        </div>
      </td>
      <td className="px-5 py-4 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{ticket.assignedTo}</td>
      <td className="px-5 py-4 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{ticket.created}</td>
    </tr>
  )
}

export default function Tickets() {
  const [tickets, setTickets]   = useState(initialTickets)
  const [selected, setSelected] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter]     = useState('All')

  const [form, setForm] = useState({ title: '', category: CATEGORIES[0], priority: 'Medium', description: '' })

  const submit = () => {
    if (!form.title.trim() || !form.description.trim()) return
    const newTicket = {
      id: `TKT-00${tickets.length + 1}`,
      ...form,
      status: 'Open',
      created: '2026-03-06',
      updated: '2026-03-06',
      assignedTo: 'NEMIS IT Team',
    }
    setTickets(prev => [newTicket, ...prev])
    setForm({ title: '', category: CATEGORIES[0], priority: 'Medium', description: '' })
    setShowForm(false)
  }

  const filtered = filter === 'All' ? tickets : tickets.filter(t => t.status === filter)

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex justify-end">
        <button onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: '#000E21' }}>
          <Plus size={15} strokeWidth={2.5} /> New Ticket
        </button>
      </div>

      {/* New ticket form */}
      {showForm && (
        <div className="bg-white rounded-xl p-6" style={{ border: '2px solid #000E21', boxShadow: '0 4px 16px rgba(0,14,33,0.08)' }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(0,14,33,0.07)' }}>
              <Headphones size={18} strokeWidth={2.5} style={{ color: '#000E21' }} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Submit IT Support Ticket</h3>
              <p className="text-xs font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>Describe your issue clearly for faster resolution</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1.5 block">Issue Title *</label>
              <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                placeholder="Brief summary of the issue..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1.5 block">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1.5 block">Priority</label>
              <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }}>
                {PRIORITIES.map(pr => <option key={pr}>{pr}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#374151] mb-1.5 block">Description *</label>
              <textarea rows={4} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Provide detailed description: what happened, when, what you expected, any error messages..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#374151] transition-colors"
              style={{ background: '#F4F6F8' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
              Cancel
            </button>
            <button onClick={submit}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: '#000E21' }}>
              Submit Ticket
            </button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex gap-2">
        {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? '#000E21' : '#fff', color: filter === f ? '#fff' : '#374151', border: `1px solid ${filter === f ? '#000E21' : '#EEF0F3'}`, fontFamily: 'Lato, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>{filtered.length} ticket{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#FAFBFC' }}>
              {['Issue', 'Category', 'Priority', 'Status', 'Assigned To', 'Created'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#4B5563]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => <TicketRow key={t.id} ticket={t} onSelect={setSelected} />)}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No tickets match this filter</p>
          </div>
        )}
      </div>

      {/* Ticket detail modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg p-6" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.20)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="text-[10px] font-bold text-[#6B7280] font-mono mb-1">{selected.id}</p>
                <h3 className="text-lg font-bold text-[#0F172A] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)}
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ml-3"
                style={{ background: '#F4F6F8' }}>
                <X size={15} strokeWidth={2.5} color="#374151" />
              </button>
            </div>
            <div className="flex gap-2 mb-5 flex-wrap">
              <Badge label={selected.priority} color={PRIORITY_CFG[selected.priority].color} bg={PRIORITY_CFG[selected.priority].bg} />
              <Badge label={selected.status} color={STATUS_CFG[selected.status].color} bg={STATUS_CFG[selected.status].bg} />
              <Badge label={selected.category} color="#374151" bg="#F4F6F8" />
            </div>
            <div className="rounded-xl p-4 mb-5" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#4B5563] mb-2">Description</p>
              <p className="text-sm font-semibold text-[#1F2937] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>{selected.description}</p>
            </div>
            <div className="space-y-0 mb-5">
              {[
                { label: 'Assigned To', value: selected.assignedTo },
                { label: 'Created',     value: selected.created },
                { label: 'Last Updated',value: selected.updated },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
                  <span className="text-xs font-bold text-[#4B5563] uppercase tracking-wide">{label}</span>
                  <span className="text-sm font-bold text-[#0F172A]">{value}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#374151]">Add Comment</p>
              <textarea rows={3} placeholder="Provide additional details or an update..."
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
              <div className="flex gap-3">
                <button className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#000E21' }}>Add Comment</button>
                <button onClick={() => setSelected(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold text-[#374151]"
                  style={{ background: '#F4F6F8' }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
