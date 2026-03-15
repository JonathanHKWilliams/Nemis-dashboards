import { useState, useEffect } from 'react'
import { Search, ArrowLeft, Mail, Phone, BookOpen, CalendarCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { principalTeachers } from '../../data/principalData'

const ACCENT = '#0367A0'
const PAGE_SIZE = 10

const statusCfg = {
  Active:    { bg: '#0367A0', color: '#fff' },
  'On Leave':{ bg: '#D97706', color: '#fff' },
  Suspended: { bg: '#A60003', color: '#fff' },
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
        onError={e => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div className="rounded-full w-full h-full items-center justify-center text-white font-black absolute inset-0"
        style={{ background: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: size * 0.3, display: 'none' }}>
        {initials}
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 pt-5 pb-2">
      <button onClick={() => onPage(page - 1)} disabled={page === 1}
        className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
        style={{ background: '#F4F6F8' }}>
        <ChevronLeft size={15} strokeWidth={2.5} color="#374151" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onPage(p)}
          className="w-8 h-8 rounded-lg text-xs font-black transition-all"
          style={{ background: p === page ? ACCENT : '#F4F6F8', color: p === page ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
          {p}
        </button>
      ))}
      <button onClick={() => onPage(page + 1)} disabled={page === totalPages}
        className="w-8 h-8 rounded-lg flex items-center justify-center disabled:opacity-30"
        style={{ background: '#F4F6F8' }}>
        <ChevronRight size={15} strokeWidth={2.5} color="#374151" />
      </button>
    </div>
  )
}

function TeacherDetail({ teacher, onBack }) {
  const sc = statusCfg[teacher.status] || { bg: '#6B7280', color: '#fff' }
  return (
    <div className="max-w-[820px] space-y-5">
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-black"
        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Teachers
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 flex items-center gap-5"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 2px 12px rgba(0,35,51,0.06)' }}>
        <Avatar name={teacher.name} gender={teacher.gender} photoId={teacher.photoId} size={80} />
        <div className="flex-1">
          <h2 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</h2>
          <p className="text-xs font-black font-mono text-[#6B7280] mt-0.5">{teacher.empId}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-black" style={{ background: sc.bg, color: sc.color }}>{teacher.status}</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-black" style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>{teacher.subject}</span>
          </div>
        </div>
        <div className="text-center flex-shrink-0">
          <p className="text-3xl font-black" style={{ color: teacher.attendance >= 90 ? ACCENT : '#D97706', fontFamily: 'Sora, sans-serif' }}>{teacher.attendance}%</p>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>Attendance</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl p-5 space-y-3" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Phone size={15} strokeWidth={2.5} style={{ color: ACCENT }} /> Contact & Personal
          </h3>
          {[
            { label: 'Employee ID', value: teacher.empId },
            { label: 'Phone',       value: teacher.phone },
            { label: 'Email',       value: teacher.email },
            { label: 'Joined',      value: teacher.joined },
            { label: 'Status',      value: teacher.status },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F8FAFC' }}>
              <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
              <span className="text-sm font-bold text-[#002333] text-right max-w-[180px] truncate" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Assignment */}
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <BookOpen size={15} strokeWidth={2.5} style={{ color: ACCENT }} /> Class Assignments
          </h3>
          <div className="space-y-2">
            {teacher.classes.map(cls => (
              <div key={cls} className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{cls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance bar */}
      <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3' }}>
        <h3 className="text-sm font-black text-[#002333] mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          <CalendarCheck size={15} strokeWidth={2.5} style={{ color: ACCENT }} /> Monthly Attendance
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>1st Semester Attendance Rate</span>
          <span className="text-sm font-black" style={{ color: teacher.attendance >= 90 ? ACCENT : '#D97706', fontFamily: 'Sora, sans-serif' }}>{teacher.attendance}%</span>
        </div>
        <div className="h-3 rounded-full w-full" style={{ background: '#EEF0F3' }}>
          <div className="h-full rounded-full" style={{ width: `${teacher.attendance}%`, background: teacher.attendance >= 90 ? ACCENT : teacher.attendance >= 75 ? '#D97706' : '#A60003' }} />
        </div>
        <p className="text-xs font-semibold mt-2" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
          Last Report: {teacher.lastReport}
        </p>
      </div>
    </div>
  )
}

export default function PrincipalTeachers() {
  const [selected, setSelected]   = useState(null)
  const [search, setSearch]       = useState('')
  const [statusFilter, setStatus] = useState('All')
  const [page, setPage]           = useState(1)

  useEffect(() => { setPage(1) }, [search, statusFilter])

  const selectedTeacher = selected ? principalTeachers.find(t => t.id === selected) : null
  if (selectedTeacher) return <TeacherDetail teacher={selectedTeacher} onBack={() => setSelected(null)} />

  const filtered = principalTeachers.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.empId.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || t.status === statusFilter)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex gap-5 max-w-[1280px]">

      {/* ── Filter Sidebar ── */}
      <div className="w-52 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</p>

          {/* Search */}
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input type="text" placeholder="Name, subject, ID…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>

          {/* Status */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Status</p>
            <div className="space-y-0.5">
              {['All', 'Active', 'On Leave', 'Suspended'].map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: statusFilter === s ? `rgba(3,103,160,0.10)` : 'transparent',
                    color: statusFilter === s ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: statusFilter === s ? 800 : 600,
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2" style={{ borderTop: '1px solid #EEF0F3' }}>
            <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length} of 28 teachers
            </p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-white"
          style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
          + Add Teacher
        </button>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0 space-y-4">

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#BFD9F2' }}>
              {['Teacher', 'ID', 'Subject', 'Assigned Classes', 'Attendance', 'Last Report', 'Status', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((t, i) => {
              const sc = statusCfg[t.status] || { bg: '#6B7280', color: '#fff' }
              return (
                <tr key={t.id}
                  style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC', cursor: 'pointer' }}
                  onClick={() => setSelected(t.id)}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={t.name} gender={t.gender} photoId={t.photoId} size={36} />
                      <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black font-mono text-[#6B7280]">{t.empId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.06)', color: '#0F172A', fontFamily: 'Lato, sans-serif' }}>
                      {t.subject}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {t.classes.join(', ')}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black" style={{ color: t.attendance >= 90 ? ACCENT : t.attendance >= 75 ? '#D97706' : '#A60003', fontFamily: 'Lato, sans-serif' }}>
                      {t.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{t.lastReport}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>View →</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="px-5 pb-4">
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      </div>
      </div>
    </div>
  )
}
