import { useState, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight, X, Phone, Mail, MapPin, Briefcase, Users, GraduationCap } from 'lucide-react'
import { principalParents, principalStudents } from '../../data/principalData'

const studentLookup = Object.fromEntries(principalStudents.map(s => [s.studentId, s]))

const ACCENT   = '#0367A0'
const PAGE_SIZE = 15

const feeCfg = {
  Paid:    { bg: '#0367A014', color: ACCENT },
  Partial: { bg: '#D9770614', color: '#D97706' },
  Unpaid:  { bg: '#A6000314', color: '#A60003' },
}

function Avatar({ name, gender, photoId, size = 40 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender}/${photoId % 100}.jpg`}
        alt={name}
        className="rounded-full object-cover w-full h-full"
        style={{ border: '2px solid #EEF0F3' }}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div className="rounded-full w-full h-full items-center justify-center text-white font-black absolute inset-0"
        style={{ background: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: size * 0.3, display: 'none' }}>
        {initials}
      </div>
    </div>
  )
}


function FeeStatusBadge({ status }) {
  const cfg = feeCfg[status] || { bg: '#F4F6F8', color: '#6B7280' }
  return (
    <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
      {status}
    </span>
  )
}

function ParentDetail({ parent, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/20" />
      <div className="w-[420px] h-full bg-white overflow-y-auto flex flex-col"
        style={{ boxShadow: '-8px 0 32px rgba(0,14,33,0.14)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 py-5 flex-shrink-0 flex items-start justify-between"
          style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
          <div className="flex items-center gap-4">
            <Avatar name={parent.name} gender={parent.gender} photoId={parent.photoId} size={56} />
            <div>
              <p className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                {parent.name}
              </p>
              <p className="text-xs font-bold mt-0.5"
                style={{ color: parent.relationship === 'Guardian' ? '#7C3AED' : ACCENT, fontFamily: 'Lato, sans-serif' }}>
                {parent.relationship}
              </p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
            style={{ background: '#EEF0F3', color: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
            onMouseLeave={e => e.currentTarget.style.background = '#EEF0F3'}>
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-5">

          {/* Contact Info */}
          <div className="rounded-2xl p-4 space-y-3" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
              Contact Information
            </p>
            {[
              { icon: Phone,    value: parent.phone },
              { icon: Mail,     value: parent.email },
              { icon: MapPin,   value: parent.address },
              { icon: Briefcase,value: parent.occupation },
            ].map(({ icon: Icon, value }) => (
              <div key={value} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${ACCENT}12` }}>
                  <Icon size={14} strokeWidth={2.5} style={{ color: ACCENT }} />
                </div>
                <p className="text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Children */}
          <div>
            <div className="mb-3">
              <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                {parent.children.length === 1 ? 'Child at School' : `Children at School (${parent.children.length})`}
              </p>
            </div>
            <div className="space-y-3">
              {parent.children.map(child => {
              const s = studentLookup[child.studentId]
              return (
                <div key={child.studentId} className="rounded-2xl p-4"
                  style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar name={child.name} gender={s ? (s.gender === 'Female' ? 'women' : 'men') : 'men'} photoId={s ? s.photoId : 10} size={36} />
                    <div className="flex-1">
                      <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {child.name}
                      </p>
                      <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {child.studentId} · {child.class}
                      </p>
                    </div>
                    <FeeStatusBadge status={child.feeStatus} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Attendance', value: `${child.attendance}%`, color: child.attendance >= 90 ? '#16A34A' : child.attendance >= 75 ? '#D97706' : '#A60003' },
                      { label: 'Avg Grade',  value: child.avgGrade,         color: ACCENT },
                      { label: 'Fee Status', value: child.feeStatus,        color: feeCfg[child.feeStatus]?.color || '#6B7280' },
                    ].map(s => (
                      <div key={s.label} className="text-center rounded-xl py-2.5"
                        style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
                        <p className="text-sm font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                        <p className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
            </div>
          </div>

          {/* Last Contact */}
          <div className="rounded-2xl p-4 flex items-center justify-between"
            style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Last Contact</p>
            <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{parent.lastContact}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:${parent.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black text-white"
              style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              <Phone size={13} strokeWidth={2.5} /> Call
            </a>
            <a href={`mailto:${parent.email}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-black"
              style={{ background: '#F4F6F8', color: '#374151', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif' }}>
              <Mail size={13} strokeWidth={2.5} /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PrincipalParents() {
  const [search, setSearch]               = useState('')
  const [relationshipFilter, setRelFilter]= useState('All')
  const [classFilter, setClassFilter]     = useState('All')
  const [feeFilter, setFeeFilter]         = useState('All')
  const [page, setPage]                   = useState(1)
  const [selected, setSelected]           = useState(null)

  useEffect(() => { setPage(1) }, [search, relationshipFilter, classFilter, feeFilter])

  // All classes across children
  const allClasses = ['All', ...Array.from(new Set(
    principalParents.flatMap(p => p.children.map(c => c.class))
  )).sort()]

  const filtered = principalParents.filter(p => {
    const q = search.toLowerCase()
    const matchSearch = p.name.toLowerCase().includes(q)
      || p.phone.includes(q)
      || p.email.toLowerCase().includes(q)
      || p.children.some(c => c.name.toLowerCase().includes(q) || c.studentId.toLowerCase().includes(q))
    const matchRel  = relationshipFilter === 'All' || p.relationship === relationshipFilter
    const matchClass = classFilter === 'All' || p.children.some(c => c.class === classFilter)
    const worstFee = p.children.some(c => c.feeStatus === 'Unpaid') ? 'Unpaid'
      : p.children.some(c => c.feeStatus === 'Partial') ? 'Partial' : 'Paid'
    const matchFee  = feeFilter === 'All' || worstFee === feeFilter
    return matchSearch && matchRel && matchClass && matchFee
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalChildren   = principalParents.reduce((s, p) => s + p.children.length, 0)
  const feeIssueCount   = principalParents.filter(p => p.children.some(c => c.feeStatus !== 'Paid')).length

  return (
    <div className="space-y-5 max-w-[1280px]">

      {/* ── Hero Image ── */}
      <div className="rounded-2xl overflow-hidden w-full" style={{ height: 100 }}>
        <img
          src="/images/parents-banner.jpg"
          alt="Parents"
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Parents/Guardians', value: principalParents.length, color: ACCENT,    icon: Users },
          { label: 'Total Children Covered',  value: totalChildren,           color: '#7C3AED',  icon: GraduationCap },
          { label: 'With Fee Issues',          value: feeIssueCount,           color: '#A60003',  icon: Users },
        ].map(c => {
          const Icon = c.icon
          return (
            <div key={c.label} className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.color}14` }}>
                <Icon size={20} style={{ color: c.color }} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
                <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{c.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Horizontal Filter Bar ── */}
      <div className="bg-white rounded-2xl px-5 py-4 flex flex-wrap items-end gap-y-3 gap-x-3"
        style={{ border: '1px solid #EEF0F3' }}>

        {/* Search */}
        <div className="flex flex-col gap-1 flex-shrink-0" style={{ width: 200 }}>
          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Search</span>
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input type="text" placeholder="Name, ID…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>
        </div>

        <div className="flex-shrink-0 hidden sm:block self-stretch w-px mb-1" style={{ background: '#EEF0F3' }} />

        {/* Relationship */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Relationship</span>
          <div className="flex items-center gap-1">
            {['All', 'Mother', 'Father', 'Guardian'].map(r => (
              <button key={r} onClick={() => setRelFilter(r)}
                className="px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                  background: relationshipFilter === r ? 'rgba(3,103,160,0.10)' : 'transparent',
                  color: relationshipFilter === r ? ACCENT : '#374151',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: relationshipFilter === r ? 800 : 600,
                  border: relationshipFilter === r ? `1px solid rgba(3,103,160,0.20)` : '1px solid #EEF0F3',
                }}>
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 hidden sm:block self-stretch w-px mb-1" style={{ background: '#EEF0F3' }} />

        {/* Fee Status */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Fee Status</span>
          <div className="flex items-center gap-1">
            {['All', 'Paid', 'Partial', 'Unpaid'].map(f => (
              <button key={f} onClick={() => setFeeFilter(f)}
                className="px-3 py-1.5 rounded-lg text-xs transition-colors"
                style={{
                  background: feeFilter === f ? 'rgba(3,103,160,0.10)' : 'transparent',
                  color: feeFilter === f ? ACCENT : '#374151',
                  fontFamily: 'Lato, sans-serif',
                  fontWeight: feeFilter === f ? 800 : 600,
                  border: feeFilter === f ? `1px solid rgba(3,103,160,0.20)` : '1px solid #EEF0F3',
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 hidden sm:block self-stretch w-px mb-1" style={{ background: '#EEF0F3' }} />

        {/* Child's Class */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Child's Class</span>
          <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
            className="text-xs outline-none rounded-xl px-3 py-2"
            style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif',
              color: classFilter !== 'All' ? ACCENT : '#374151', fontWeight: 700, minWidth: 140 }}>
            {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Record count */}
        <p className="text-xs font-bold text-[#9CA3AF] ml-auto flex-shrink-0 mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
          {filtered.length} of {principalParents.length}
        </p>
      </div>

      {/* ── Table ── */}
      <div className="space-y-5">

        {/* Table */}
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>

          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['Parent / Guardian', 'Relationship', 'Contact', 'Children', 'Fee Status', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-sm font-semibold text-[#9CA3AF]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>
                    No parents match the selected filters.
                  </td>
                </tr>
              ) : paginated.map((p, i) => {
                const worstFee = p.children.some(c => c.feeStatus === 'Unpaid') ? 'Unpaid'
                  : p.children.some(c => c.feeStatus === 'Partial') ? 'Partial' : 'Paid'
                return (
                  <tr key={p.id}
                    style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC', cursor: 'pointer' }}
                    onClick={() => setSelected(p.id)}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                    onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>

                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={p.name} gender={p.gender} photoId={p.photoId} size={38} />
                        <div>
                          <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.name}</p>
                        </div>
                      </div>
                    </td>

                    {/* Relationship */}
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full"
                        style={{
                          background: p.relationship === 'Guardian' ? 'rgba(124,58,237,0.10)' : `${ACCENT}12`,
                          color: p.relationship === 'Guardian' ? '#7C3AED' : ACCENT,
                          fontFamily: 'Lato, sans-serif',
                        }}>
                        {p.relationship}
                      </span>
                    </td>

                    {/* Contact */}
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.phone}</p>
                      <p className="text-[11px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.email}</p>
                    </td>

                    {/* Children */}
                    <td className="px-5 py-3.5">
                      <span className="text-sm font-black" style={{ color: '#002333', fontFamily: 'Sora, sans-serif' }}>
                        {p.children.length}
                      </span>
                      <span className="text-xs font-semibold text-[#9CA3AF] ml-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {p.children.length === 1 ? 'child' : 'children'}
                      </span>
                    </td>

                    {/* Fee Status */}
                    <td className="px-5 py-3.5">
                      <FeeStatusBadge status={worstFee} />
                    </td>

                    {/* View Profile */}
                    <td className="px-5 py-3.5">
                      <button onClick={() => setSelected(p.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-opacity hover:opacity-80"
                        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                        View Profile →
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3"
            style={{ borderTop: '1px solid #F4F6F8', background: '#F8FAFC' }}>
            <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length === 0 ? 'No records' : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </p>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: page === 1 ? '#F4F6F8' : '#EEF0F3', color: page === 1 ? '#C4C9D4' : '#374151' }}>
                <ChevronLeft size={14} strokeWidth={2.5} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…')
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) => typeof p === 'string' ? (
                  <span key={`e${i}`} className="text-xs text-[#9CA3AF] px-1">…</span>
                ) : (
                  <button key={p} onClick={() => setPage(p)}
                    className="w-8 h-8 rounded-lg text-xs font-black"
                    style={{ background: page === p ? ACCENT : '#F4F6F8', color: page === p ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
                    {p}
                  </button>
                ))
              }
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: page === totalPages ? '#F4F6F8' : '#EEF0F3', color: page === totalPages ? '#C4C9D4' : '#374151' }}>
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-over Detail Panel */}
      {selected && (() => {
        const parent = principalParents.find(p => p.id === selected)
        return parent ? <ParentDetail parent={parent} onClose={() => setSelected(null)} /> : null
      })()}
    </div>
  )
}
