import { useState } from 'react'
import {
  Plus,
  Edit2,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Search,
  X,
  Shield,
  UserCog,
  Users,
  UserX,
} from 'lucide-react'
import { users as initialUsers, roles, districts } from '../data/mockData'

const roleColors = {
  'District Officer':   { bg: 'rgba(0,35,51,0.07)',     color: '#002333' },
  'School Admin':       { bg: 'rgba(72,208,140,0.1)',   color: '#16A34A' },
  'Data Analyst':       { bg: 'rgba(59,130,246,0.1)',   color: '#2563EB' },
  'Finance Manager':    { bg: 'rgba(245,158,11,0.1)',   color: '#D97706' },
  'Teacher Supervisor': { bg: 'rgba(139,92,246,0.1)',   color: '#7C3AED' },
}

const PERMISSIONS = [
  'view_reports',
  'edit_enrollment',
  'manage_schools',
  'manage_students',
  'manage_teachers',
  'export_data',
  'view_analytics',
  'manage_budget',
  'teacher_oversight',
  'system_admin',
]

const defaultForm = {
  name: '', email: '', role: '', district: '', status: 'Active', permissions: [],
}

function UserAvatar({ name, gender, photoId, size = 36, id, imgErrors, onError }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (!gender || !photoId || imgErrors[id]) {
    return (
      <div className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: '#002333' }}>
        <span style={{ color: '#fff', fontSize: Math.round(size * 0.3), fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>{initials}</span>
      </div>
    )
  }
  const url = `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`
  return (
    <img src={url} alt={name}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
      onError={() => onError(id)} />
  )
}

export default function UserManagement() {
  const [userList, setUserList]   = useState(initialUsers)
  const [showModal, setShowModal] = useState(false)
  const [editUser, setEditUser]   = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRole, setFilterRole]   = useState('All')
  const [form, setForm]           = useState(defaultForm)
  const [imgErrors, setImgErrors] = useState({})

  const onImgError = (id) => setImgErrors(p => ({ ...p, [id]: true }))

  const togglePerm = (perm) => {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(perm)
        ? f.permissions.filter((p) => p !== perm)
        : [...f.permissions, perm],
    }))
  }

  const filtered = userList.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = filterRole === 'All' || u.role === filterRole
    return matchSearch && matchRole
  })

  const toggleStatus = (id) =>
    setUserList((prev) =>
      prev.map((u) => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u)
    )

  const handleEdit = (user) => {
    setEditUser(user)
    setForm({ name: user.name, email: user.email, role: user.role, district: user.district, status: user.status, permissions: user.permissions || [] })
    setShowModal(true)
  }

  const handleDelete = (id) => setUserList((prev) => prev.filter((u) => u.id !== id))

  const handleSave = () => {
    if (!form.name || !form.email || !form.role) return
    if (editUser) {
      setUserList((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, ...form } : u)))
    } else {
      setUserList((prev) => [...prev, { id: Date.now(), ...form, lastLogin: 'Never' }])
    }
    setShowModal(false)
    setEditUser(null)
    setForm(defaultForm)
  }

  const activeCount   = userList.filter(u => u.status === 'Active').length
  const inactiveCount = userList.filter(u => u.status === 'Inactive').length

  return (
    <div className="space-y-5 max-w-[1180px]">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            User Management
          </h2>
          <p className="text-sm text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
            Manage Grand Bassa system users, assign roles, districts &amp; permissions
          </p>
        </div>
        <button
          onClick={() => { setEditUser(null); setForm(defaultForm); setShowModal(true) }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90 active:scale-95"
          style={{ background: '#48D08C', fontFamily: 'Lato, sans-serif' }}
        >
          <Plus size={15} strokeWidth={2.5} />
          Add New User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: userList.length, icon: Users,   color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Active',      value: activeCount,     icon: UserCog, color: '#48D08C', bg: 'rgba(72,208,140,0.10)' },
          { label: 'Inactive',    value: inactiveCount,   icon: UserX,   color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
          { label: 'Roles',       value: roles.length,    icon: Shield,  color: '#D97706', bg: 'rgba(245,158,11,0.09)' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                <p className="text-3xl font-bold mt-1.5" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={20} strokeWidth={2.5} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
              <input
                type="text"
                placeholder="Search users…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm bg-[#F4F6F8] rounded-lg outline-none w-56 text-[#4B5563] placeholder:text-[#9CA3AF]"
                style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }}
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-3 py-2 text-sm bg-[#F4F6F8] rounded-lg outline-none text-[#4B5563] cursor-pointer"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }}
            >
              <option value="All">All Roles</option>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <p className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} user{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#FAFBFC' }}>
                {['User', 'Role', 'District', 'Last Login', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const rc = roleColors[user.role] || { bg: '#F4F6F8', color: '#666' }
                return (
                  <tr key={user.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>

                    {/* User */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          name={user.name}
                          gender={user.gender}
                          photoId={user.photoId}
                          size={38}
                          id={user.id}
                          imgErrors={imgErrors}
                          onError={onImgError}
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{user.name}</p>
                          <p className="text-xs font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                        style={{ background: rc.bg, color: rc.color, fontFamily: 'Lato, sans-serif' }}>
                        {user.role}
                      </span>
                    </td>

                    {/* District */}
                    <td className="px-5 py-3.5 text-sm font-medium text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {user.district}
                    </td>

                    {/* Last Login */}
                    <td className="px-5 py-3.5 text-sm font-medium text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {user.lastLogin}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-5 py-3.5">
                      <button onClick={() => toggleStatus(user.id)} className="flex items-center gap-1.5 transition-opacity hover:opacity-80">
                        {user.status === 'Active' ? (
                          <>
                            <ToggleRight size={22} strokeWidth={2.5} style={{ color: '#48D08C' }} />
                            <span className="text-xs font-semibold" style={{ color: '#48D08C', fontFamily: 'Lato, sans-serif' }}>Active</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={22} strokeWidth={2.5} className="text-[#9CA3AF]" />
                            <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleEdit(user)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: 'rgba(0,35,51,0.06)', color: '#002333' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,35,51,0.12)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,35,51,0.06)' }}>
                          <Edit2 size={13} strokeWidth={2.5} />
                        </button>
                        <button onClick={() => handleDelete(user.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: 'rgba(166,0,3,0.06)', color: '#A60003' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.14)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(166,0,3,0.06)' }}>
                          <Trash2 size={13} strokeWidth={2.5} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No users match your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Modal ── */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.45)' }}>
          <div className="bg-white rounded-2xl w-full max-w-[520px] overflow-hidden"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
              <h3 className="font-bold text-lg text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                {editUser ? 'Edit User' : 'Create New User'}
              </h3>
              <button
                onClick={() => { setShowModal(false); setEditUser(null) }}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F4F6F8] hover:text-[#002333] transition-colors"
              >
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {/* Name */}
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Full Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter full name"
                    className="mt-1.5 w-full px-3 py-2.5 bg-[#F4F6F8] rounded-lg text-sm outline-none transition-colors text-[#002333]"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, border: '1.5px solid transparent' }}
                    onFocus={(e) => { e.currentTarget.style.border = '1.5px solid #48D08C' }}
                    onBlur={(e) => { e.currentTarget.style.border = '1.5px solid transparent' }}
                  />
                </div>

                {/* Email */}
                <div className="col-span-2">
                  <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Email *
                  </label>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="user@gbndb.edu.lr"
                    type="email"
                    className="mt-1.5 w-full px-3 py-2.5 bg-[#F4F6F8] rounded-lg text-sm outline-none text-[#002333]"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, border: '1.5px solid transparent' }}
                    onFocus={(e) => { e.currentTarget.style.border = '1.5px solid #48D08C' }}
                    onBlur={(e) => { e.currentTarget.style.border = '1.5px solid transparent' }}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Role *
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="mt-1.5 w-full px-3 py-2.5 bg-[#F4F6F8] rounded-lg text-sm outline-none cursor-pointer text-[#4B5563]"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, border: '1.5px solid transparent' }}
                    onFocus={(e) => { e.currentTarget.style.border = '1.5px solid #48D08C' }}
                    onBlur={(e) => { e.currentTarget.style.border = '1.5px solid transparent' }}
                  >
                    <option value="">Select role</option>
                    {roles.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Lato, sans-serif' }}>
                    District
                  </label>
                  <select
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="mt-1.5 w-full px-3 py-2.5 bg-[#F4F6F8] rounded-lg text-sm outline-none cursor-pointer text-[#4B5563]"
                    style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500, border: '1.5px solid transparent' }}
                    onFocus={(e) => { e.currentTarget.style.border = '1.5px solid #48D08C' }}
                    onBlur={(e) => { e.currentTarget.style.border = '1.5px solid transparent' }}
                  >
                    <option value="">Select district</option>
                    {districts.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Status
                </label>
                <div className="flex gap-2 mt-1.5">
                  {['Active', 'Inactive'].map((s) => (
                    <button key={s} onClick={() => setForm({ ...form, status: s })}
                      className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        background: form.status === s ? (s === 'Active' ? '#48D08C' : '#A60003') : '#F4F6F8',
                        color: form.status === s ? '#fff' : '#6B7280',
                      }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#6B7280] uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'Lato, sans-serif' }}>
                  <Shield size={12} strokeWidth={2.5} />
                  Permissions
                </label>
                <div className="flex flex-wrap gap-2">
                  {PERMISSIONS.map((perm) => {
                    const active = form.permissions.includes(perm)
                    return (
                      <button key={perm} onClick={() => togglePerm(perm)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                        style={{
                          fontFamily: 'Lato, sans-serif',
                          background: active ? 'rgba(0,35,51,0.08)' : '#F4F6F8',
                          color: active ? '#002333' : '#6B7280',
                          border: active ? '1px solid rgba(0,35,51,0.15)' : '1px solid transparent',
                        }}>
                        {perm.replace(/_/g, ' ')}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 px-6 py-4" style={{ borderTop: '1px solid #F4F6F8' }}>
              <button
                onClick={() => { setShowModal(false); setEditUser(null) }}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-[#4B5563] hover:bg-[#F4F6F8] transition-colors"
                style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3' }}>
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-bold transition-all hover:opacity-90"
                style={{ background: '#48D08C', fontFamily: 'Lato, sans-serif' }}>
                {editUser ? 'Save Changes' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
