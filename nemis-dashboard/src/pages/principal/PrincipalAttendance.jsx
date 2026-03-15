import { useState, useEffect } from 'react'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { attendanceRecords } from '../../data/principalData'

const ACCENT    = '#0367A0'
const PAGE_SIZE = 15

const statusCfg = {
  Present: { bg: '#0367A0', color: '#fff' },
  Absent:  { bg: '#A60003', color: '#fff' },
  Late:    { bg: '#D97706', color: '#fff' },
}

const GRADES = ['All', ...Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)]

function Avatar({ name, gender, photoId, size = 36 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender === 'Female' ? 'women' : 'men'}/${photoId % 100}.jpg`}
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

export default function PrincipalAttendance() {
  const [search, setSearch]           = useState('')
  const [gradeFilter, setGradeFilter] = useState('All')
  const [classFilter, setClassFilter] = useState('All')
  const [statusFilter, setStatus]     = useState('All')
  const [page, setPage]               = useState(1)

  // Reset page on any filter change
  useEffect(() => { setPage(1) }, [search, gradeFilter, classFilter, statusFilter])

  // Reset class filter when grade changes
  useEffect(() => { setClassFilter('All') }, [gradeFilter])

  // Classes available for the selected grade
  const classNames = ['All', ...Array.from(new Set(
    attendanceRecords
      .filter(r => gradeFilter === 'All' || r.class.startsWith(gradeFilter + 'A') || r.class.startsWith(gradeFilter + 'B') || r.class === gradeFilter)
      .map(r => r.class)
  )).sort()]

  const filtered = attendanceRecords.filter(r => {
    const q         = search.toLowerCase()
    const gradeNum  = gradeFilter.replace('Grade ', '')
    const gradeMatch = gradeFilter === 'All'
      || r.class === gradeFilter
      || r.class.startsWith(`Grade ${gradeNum}A`)
      || r.class.startsWith(`Grade ${gradeNum}B`)
      || r.class === `Grade ${gradeNum}`
    return (
      (r.name.toLowerCase().includes(q) || r.studentId?.toLowerCase().includes(q)) &&
      gradeMatch &&
      (classFilter === 'All' || r.class === classFilter) &&
      (statusFilter === 'All' || r.status === statusFilter)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const presentCount = attendanceRecords.filter(r => r.status === 'Present').length
  const absentCount  = attendanceRecords.filter(r => r.status === 'Absent').length
  const lateCount    = attendanceRecords.filter(r => r.status === 'Late').length

  return (
    <div className="flex gap-5 max-w-[1280px]">

      {/* ── Filter Sidebar ── */}
      <div className="w-52 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</p>

          {/* Search */}
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input type="text" placeholder="Search student…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>

          {/* Grade */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Grade</p>
            <div className="space-y-0.5 max-h-52 overflow-y-auto">
              {GRADES.map(g => (
                <button key={g} onClick={() => setGradeFilter(g)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: gradeFilter === g ? `rgba(3,103,160,0.10)` : 'transparent',
                    color: gradeFilter === g ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: gradeFilter === g ? 800 : 600,
                  }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Class (sub-filter) */}
          {classNames.length > 2 && (
            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Class</p>
              <div className="space-y-0.5">
                {classNames.map(c => (
                  <button key={c} onClick={() => setClassFilter(c)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                    style={{
                      background: classFilter === c ? `rgba(3,103,160,0.10)` : 'transparent',
                      color: classFilter === c ? ACCENT : '#374151',
                      fontFamily: 'Lato, sans-serif',
                      fontWeight: classFilter === c ? 800 : 600,
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Status</p>
            <div className="space-y-0.5">
              {['All', 'Present', 'Absent', 'Late'].map(s => (
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
              {filtered.length} records
            </p>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0 space-y-5">

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Present Today', value: presentCount, color: ACCENT },
          { label: 'Absent Today',  value: absentCount,  color: '#A60003' },
          { label: 'Late Arrivals', value: lateCount,    color: '#D97706' },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.color}14` }}>
              <span className="text-xl font-black" style={{ color: c.color, fontFamily: 'Sora, sans-serif' }}>{c.value}</span>
            </div>
            <div>
              <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
              <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Attendance Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
          <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Daily Attendance Record
          </h3>
          <p className="text-[11px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        <table className="w-full">
          <thead>
            <tr style={{ background: '#BFD9F2' }}>
              {['Student', 'Class', 'Status', 'Recorded By', 'Time Logged'].map(h => (
                <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-sm font-semibold text-[#9CA3AF]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>
                  No attendance records match the selected filters.
                </td>
              </tr>
            ) : paginated.map((r, i) => {
              const sc = statusCfg[r.status] || { bg: '#6B7280', color: '#fff' }
              return (
                <tr key={i} style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.name} gender={r.gender} photoId={r.photoId} />
                      <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.class}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.recordedBy}</td>
                  <td className="px-5 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.timeLogged}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid #F4F6F8', background: '#F8FAFC' }}>
          <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length === 0 ? 'No records' : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
          </p>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
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
                <span key={`e${i}`} className="text-xs text-[#9CA3AF] px-1" style={{ fontFamily: 'Lato' }}>…</span>
              ) : (
                <button key={p} onClick={() => setPage(p)}
                  className="w-8 h-8 rounded-lg text-xs font-black transition-colors"
                  style={{
                    background: page === p ? ACCENT : '#F4F6F8',
                    color: page === p ? '#fff' : '#374151',
                    fontFamily: 'Lato, sans-serif',
                  }}>{p}</button>
              ))
            }
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{ background: page === totalPages ? '#F4F6F8' : '#EEF0F3', color: page === totalPages ? '#C4C9D4' : '#374151' }}>
              <ChevronRight size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
