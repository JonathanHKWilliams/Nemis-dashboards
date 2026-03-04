import { useState } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import { systemUsers } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const ROLES = ['All', 'Minister', 'CEO', 'DEO', 'School Admin', 'Teacher', 'Student']

function StatusBadge({ status }) {
  const cfg = {
    Active:  { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Flagged: { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
    Pending: { color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function RoleBadge({ role }) {
  const colors = {
    Minister:     '#4F46E5',
    CEO:          '#2563EB',
    DEO:          '#0D9488',
    'School Admin':'#7C3AED',
    Teacher:      '#D97706',
    Student:      '#059669',
  }
  const c = colors[role] || '#64748B'
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: `${c}15`, color: c }}>{role}</span>
  )
}

function UserDetailPanel({ user, onClose }) {
  const [activeForm, setActiveForm] = useState(null)
  const toggleForm = f => setActiveForm(prev => prev === f ? null : f)

  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 400, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${user.gender}/${user.photoId}.jpg`}
              alt={user.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <h3 className="text-base font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{user.name}</h3>
              <p className="text-xs font-semibold text-[#64748B]">{user.role} · {user.county}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          <div className="flex gap-2 flex-wrap">
            <StatusBadge status={user.status} />
            <RoleBadge role={user.role} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'User ID',     value: user.id },
              { label: 'County',      value: user.county },
              { label: 'Role',        value: user.role },
              { label: 'Last Active', value: user.lastActive },
            ].map(f => (
              <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
                <p className="text-[10px] font-black uppercase text-[#94A3B8]">{f.label}</p>
                <p className="text-xs font-black text-[#0F172A] mt-0.5 truncate">{f.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            {[
              { key: 'suspend', label: user.status === 'Active' ? 'Suspend Account' : 'Reactivate Account', danger: user.status === 'Active' },
              { key: 'reset',   label: 'Reset Password', danger: false },
              { key: 'role',    label: 'Change Role', danger: false },
            ].map(btn => (
              <button key={btn.key} onClick={() => toggleForm(btn.key)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-black text-left transition-all"
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

          {activeForm === 'suspend' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#FEF2F2', border: '1px solid rgba(220,38,38,0.2)' }}>
              <p className="text-xs font-black text-[#DC2626]">Confirm {user.status === 'Active' ? 'Suspension' : 'Reactivation'}</p>
              <textarea rows={2} placeholder="Reason..." className="w-full px-3 py-2 rounded-lg text-xs outline-none resize-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif' }} />
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: '#DC2626' }}>
                Confirm {user.status === 'Active' ? 'Suspend' : 'Reactivate'}
              </button>
            </div>
          )}
          {activeForm === 'reset' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Reset Password</p>
              <p className="text-xs text-[#64748B]">A password reset link will be sent to the user's registered email address.</p>
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Send Reset Link</button>
            </div>
          )}
          {activeForm === 'role' && (
            <div className="rounded-xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <p className="text-xs font-black text-[#0F172A]">Change Role</p>
              <select className="w-full px-3 py-2 rounded-lg text-xs outline-none"
                style={{ background: '#fff', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                {['Minister', 'CEO', 'DEO', 'School Admin', 'Teacher', 'Student'].map(r => (
                  <option key={r} selected={r === user.role}>{r}</option>
                ))}
              </select>
              <button className="w-full py-2 rounded-lg text-xs font-black text-white" style={{ background: ACCENT }}>Update Role</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function MinisterUsers() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const user = systemUsers.find(u => u.id === selected)

  const filtered = systemUsers.filter(u => {
    const q = search.toLowerCase()
    const matchQ = !q || u.name.toLowerCase().includes(q) || u.county.toLowerCase().includes(q) || u.id.toLowerCase().includes(q)
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    return matchQ && matchRole
  })

  return (
    <div className="space-y-5 max-w-[1100px]">
      {user && <UserDetailPanel user={user} onClose={() => setSelected(null)} />}

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Users',    value: systemUsers.length },
          { label: 'Active',         value: systemUsers.filter(u => u.status === 'Active').length },
          { label: 'Flagged',        value: systemUsers.filter(u => u.status === 'Flagged').length },
          { label: 'Pending Review', value: systemUsers.filter(u => u.status === 'Pending').length },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-4" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
            <p className="text-xs font-semibold text-[#64748B] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 min-w-[220px]"
          style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
          <Search size={15} color="#94A3B8" strokeWidth={2.5} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, county, ID..."
            className="flex-1 text-xs outline-none bg-transparent"
            style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ROLES.map(r => (
            <button key={r} onClick={() => setRoleFilter(r)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
              style={{ background: roleFilter === r ? ACCENT : '#fff', color: roleFilter === r ? '#fff' : '#64748B', border: `1px solid ${roleFilter === r ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {filtered.length} user{filtered.length !== 1 ? 's' : ''} shown · Click to manage
      </p>

      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['User', 'ID', 'Role', 'County', 'Last Active', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                onClick={() => setSelected(u.id)}
                style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src={`https://randomuser.me/api/portraits/${u.gender}/${u.photoId}.jpg`}
                      alt={u.name} className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 30, height: 30, border: '1.5px solid #E2E8F0' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{u.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-[10px] font-semibold text-[#94A3B8]">{u.id}</td>
                <td className="px-4 py-3.5"><RoleBadge role={u.role} /></td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{u.county}</td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]">{u.lastActive}</td>
                <td className="px-4 py-3.5"><StatusBadge status={u.status} /></td>
                <td className="px-4 py-3.5"><ChevronRight size={14} color="#94A3B8" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
