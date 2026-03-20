import { useState, useEffect } from 'react'
import { Search, ArrowLeft, Phone, Calendar, BookOpen, TrendingUp, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react'
import { principalStudents, principalClasses } from '../../data/principalData'

const ACCENT = '#0367A0'
const PAGE_SIZE = 12

const feeStatusCfg = {
  Paid:    { bg: '#0367A0', color: '#fff' },
  Partial: { bg: '#D97706', color: '#fff' },
  Unpaid:  { bg: '#A60003', color: '#fff' },
}

const gradeCfg = (g) => {
  if (g.startsWith('A')) return { color: '#0367A0' }
  if (g.startsWith('B')) return { color: '#16A34A' }
  if (g.startsWith('C')) return { color: '#D97706' }
  return { color: '#A60003' }
}

function Avatar({ name, gender, photoId, size = 40 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  const genderPath = gender === 'Female' ? 'women' : 'men'
  const numId = photoId % 100
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${genderPath}/${numId}.jpg`}
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
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
        style={{ background: '#F4F6F8' }}
        onMouseEnter={e => { if (page > 1) e.currentTarget.style.background = '#EEF0F3' }}
        onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
        <ChevronLeft size={15} strokeWidth={2.5} color="#374151" />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button key={p} onClick={() => onPage(p)}
          className="w-8 h-8 rounded-lg text-xs font-black transition-all"
          style={{
            background: p === page ? ACCENT : '#F4F6F8',
            color: p === page ? '#fff' : '#374151',
            fontFamily: 'Lato, sans-serif',
          }}>
          {p}
        </button>
      ))}
      <button onClick={() => onPage(page + 1)} disabled={page === totalPages}
        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors disabled:opacity-30"
        style={{ background: '#F4F6F8' }}
        onMouseEnter={e => { if (page < totalPages) e.currentTarget.style.background = '#EEF0F3' }}
        onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
        <ChevronRight size={15} strokeWidth={2.5} color="#374151" />
      </button>
    </div>
  )
}

function StudentDetail({ student, onBack }) {
  const gc = gradeCfg(student.avgGrade)
  return (
    <div className="max-w-[820px] space-y-5">
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-black"
        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Students
      </button>

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 flex items-center gap-5"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 2px 12px rgba(0,35,51,0.06)' }}>
        <Avatar name={student.name} gender={student.gender} photoId={student.photoId} size={80} />
        <div className="flex-1">
          <h2 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{student.name}</h2>
          <p className="text-xs font-black font-mono text-[#6B7280] mt-0.5">{student.studentId}</p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-xs font-black text-white" style={{ background: ACCENT }}>{student.class}</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-black" style={{ background: feeStatusCfg[student.feeStatus].bg, color: feeStatusCfg[student.feeStatus].color }}>{student.feeStatus}</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-black" style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>{student.gender}</span>
          </div>
        </div>
        <div className="text-center flex-shrink-0">
          <p className="text-3xl font-black" style={{ color: gc.color, fontFamily: 'Sora, sans-serif' }}>{student.avgGrade}</p>
          <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>Avg Grade</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 space-y-3" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <BookOpen size={15} strokeWidth={2.5} style={{ color: ACCENT }} /> Basic Information
          </h3>
          {[
            { label: 'Student ID', value: student.studentId },
            { label: 'Class',      value: student.class },
            { label: 'Gender',     value: student.gender },
            { label: 'Enrolled',   value: student.enrolled },
            { label: 'Status',     value: student.status },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F8FAFC' }}>
              <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
              <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-3" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <TrendingUp size={15} strokeWidth={2.5} style={{ color: ACCENT }} /> Academic & Fee Records
          </h3>
          {[
            { label: 'Average Grade', value: student.avgGrade },
            { label: 'Attendance',    value: `${student.attendance}%` },
            { label: 'Fee Amount',    value: '$300' },
            { label: 'Amount Paid',   value: student.feeStatus === 'Paid' ? '$300' : student.feeStatus === 'Partial' ? '$200' : '$0' },
            { label: 'Balance',       value: student.feeStatus === 'Paid' ? '$0' : student.feeStatus === 'Partial' ? '$100' : '$300' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F8FAFC' }}>
              <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
              <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Attendance bar */}
      <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3' }}>
        <h3 className="text-sm font-black text-[#002333] mb-4 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          <Calendar size={15} strokeWidth={2.5} style={{ color: ACCENT }} /> Attendance History
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>1st Semester Attendance Rate</span>
          <span className="text-sm font-black" style={{ color: student.attendance >= 85 ? ACCENT : '#A60003', fontFamily: 'Sora, sans-serif' }}>{student.attendance}%</span>
        </div>
        <div className="h-3 rounded-full w-full" style={{ background: '#EEF0F3' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${student.attendance}%`, background: student.attendance >= 85 ? ACCENT : student.attendance >= 75 ? '#D97706' : '#A60003' }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>0%</span>
          <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {student.attendance < 85 ? 'Below minimum threshold (85%)' : 'Above minimum threshold'}
          </span>
          <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>100%</span>
        </div>
      </div>

      {/* Parent Contact */}
      <div className="bg-white rounded-2xl p-5 flex items-center gap-4" style={{ border: '1px solid #EEF0F3' }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(3,103,160,0.08)' }}>
          <Phone size={18} strokeWidth={2.5} style={{ color: ACCENT }} />
        </div>
        <div>
          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Parent / Guardian Contact</p>
          <p className="text-sm font-bold text-[#0367A0] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{student.parentPhone}</p>
        </div>
      </div>
    </div>
  )
}

export default function PrincipalStudents() {
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [classFilter, setClassFilter] = useState('All')
  const [feeFilter, setFeeFilter] = useState('All')
  const [page, setPage] = useState(1)

  useEffect(() => { setPage(1) }, [search, classFilter, feeFilter])

  const selectedStudent = selected ? principalStudents.find(s => s.id === selected) : null
  if (selectedStudent) return <StudentDetail student={selectedStudent} onBack={() => setSelected(null)} />

  const classNames = ['All', ...Array.from(new Set(principalStudents.map(s => s.class))).sort()]

  const filtered = principalStudents.filter(s => {
    const q = search.toLowerCase()
    return (
      (s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)) &&
      (classFilter === 'All' || s.class === classFilter) &&
      (feeFilter === 'All' || s.feeStatus === feeFilter)
    )
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="space-y-5 max-w-[1280px]">

      {/* ── Hero Image ── */}
      <div className="rounded-2xl overflow-hidden w-full" style={{ height: 100 }}>
        <img
          src="/images/students-banner.jpg"
          alt="Students"
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none' }}
        />
      </div>

      <div className="flex gap-5">

      {/* ── Filter Sidebar ── */}
      <div className="w-52 flex-shrink-0 space-y-4">
        <div className="bg-white rounded-2xl p-4 space-y-4" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</p>

          {/* Search */}
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input type="text" placeholder="Search name or ID…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>

          {/* Class */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Class</p>
            <div className="space-y-0.5 max-h-52 overflow-y-auto">
              {classNames.map(c => (
                <button key={c} onClick={() => setClassFilter(c)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors"
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

          {/* Fee Status */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Fee Status</p>
            <div className="space-y-0.5">
              {['All', 'Paid', 'Partial', 'Unpaid'].map(f => (
                <button key={f} onClick={() => setFeeFilter(f)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                  style={{
                    background: feeFilter === f ? `rgba(3,103,160,0.10)` : 'transparent',
                    color: feeFilter === f ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif',
                    fontWeight: feeFilter === f ? 800 : 600,
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2" style={{ borderTop: '1px solid #EEF0F3' }}>
            <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length} of 642 students
            </p>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-white"
          style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
          + Add Student
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
              {['Student', 'ID', 'Class', 'Gender', 'Parent Contact', 'Attendance', 'Fee Status', 'Grade', ''].map(h => (
                <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map((s, i) => {
              const gc = gradeCfg(s.avgGrade)
              const fs = feeStatusCfg[s.feeStatus]
              return (
                <tr key={s.id}
                  style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC', cursor: 'pointer' }}
                  onClick={() => setSelected(s.id)}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.name} gender={s.gender} photoId={s.photoId} size={36} />
                      <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black font-mono text-[#6B7280]">{s.studentId}</span>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.class}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.gender}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.parentPhone}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black" style={{ color: s.attendance >= 85 ? ACCENT : s.attendance >= 75 ? '#D97706' : '#A60003', fontFamily: 'Lato, sans-serif' }}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: fs.bg, color: fs.color, fontFamily: 'Lato, sans-serif' }}>
                      {s.feeStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-black" style={{ color: gc.color, fontFamily: 'Sora, sans-serif' }}>{s.avgGrade}</span>
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
    </div>
  )
}
