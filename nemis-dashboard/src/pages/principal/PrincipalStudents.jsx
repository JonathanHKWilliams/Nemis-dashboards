import { useState, useEffect } from 'react'
import { Search, ArrowLeft, Phone, BookOpen, TrendingUp, ChevronLeft, ChevronRight, LayoutGrid, List, Mail, Briefcase, UserCheck } from 'lucide-react'
import { principalStudents } from '../../data/principalData'

const ACCENT = '#0367A0'
const NAVY   = '#002333'
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

const PARENT_NAMES_M = ['James','John','George','Moses','Emmanuel','David','Peter','Thomas','Samuel','Abraham']
const PARENT_NAMES_F = ['Mary','Korpo','Hawa','Satta','Martha','Rebecca','Christiana','Agnes','Florence','Victoria']
const OCCUPATIONS    = ['Farmer','Teacher','Trader','Civil Servant','Healthcare Worker','Business Owner','Driver','Nurse','Police Officer','Engineer']

function getParent(student) {
  const idx      = student.id % 10
  const isMother = student.id % 2 === 0
  const lastName = student.name.split(' ').slice(-1)[0].replace('.', '')
  const first    = isMother ? PARENT_NAMES_F[idx] : PARENT_NAMES_M[idx]
  return {
    name:       `${first} ${lastName}`,
    relation:   isMother ? 'Mother' : 'Father',
    phone:      student.parentPhone,
    email:      `${first.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
    occupation: OCCUPATIONS[student.id % OCCUPATIONS.length],
    gender:     isMother ? 'women' : 'men',
    photoId:    (student.photoId + 15) % 100,
  }
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
  const gc     = gradeCfg(student.avgGrade)
  const parent = getParent(student)
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
          <p className="text-sm font-black font-mono mt-1" style={{ color: ACCENT, letterSpacing: '0.06em' }}>{student.studentId}</p>
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
              {label === 'Student ID'
                ? <span className="text-sm font-black font-mono" style={{ color: ACCENT, letterSpacing: '0.06em' }}>{value}</span>
                : <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
              }
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

      {/* Parent / Guardian */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
        <div className="px-5 py-3" style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
          <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Parent / Guardian</p>
        </div>
        <div className="p-5 flex items-center gap-4" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <div className="relative flex-shrink-0" style={{ width: 56, height: 56 }}>
            <img
              src={`https://randomuser.me/api/portraits/${parent.gender}/${parent.photoId}.jpg`}
              alt={parent.name}
              className="rounded-full object-cover w-full h-full"
              style={{ border: '2px solid #EEF0F3' }}
              onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
            />
            <div className="rounded-full w-full h-full items-center justify-center text-white font-black absolute inset-0 text-sm"
              style={{ background: ACCENT, fontFamily: 'Sora, sans-serif', display: 'none' }}>
              {parent.name.split(' ').map(n => n[0]).slice(0,2).join('')}
            </div>
          </div>
          <div>
            <p className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{parent.name}</p>
            <span className="text-[11px] font-black px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              {parent.relation}
            </span>
          </div>
        </div>
        <div className="divide-y divide-[#F4F6F8]">
          {[
            { icon: Phone,     label: 'Phone',      value: parent.phone },
            { icon: Mail,      label: 'Email',      value: parent.email },
            { icon: Briefcase, label: 'Occupation', value: parent.occupation },
            { icon: UserCheck, label: 'Relation',   value: parent.relation },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-4 px-5 py-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: '#F4F6F8' }}>
                <Icon size={14} strokeWidth={2.5} style={{ color: NAVY }} />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
                <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
              </div>
            </div>
          ))}
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
  const [viewMode, setViewMode] = useState('table')

  useEffect(() => { setPage(1) }, [search, classFilter, feeFilter, viewMode])

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

      {/* ── Horizontal Filter Bar ── */}
      <div className="bg-white rounded-2xl px-5 py-4 flex flex-wrap items-end gap-y-3 gap-x-3"
        style={{ border: '1px solid #EEF0F3' }}>

        {/* Left group */}
        <div className="flex items-end gap-3 flex-wrap flex-1 min-w-0">

          {/* Search */}
          <div className="flex flex-col gap-1 flex-shrink-0" style={{ width: 200 }}>
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Search</span>
            <div className="relative">
              <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
              <input type="text" placeholder="Name or ID…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
            </div>
          </div>

          <div className="flex-shrink-0 hidden sm:block self-stretch w-px mb-1" style={{ background: '#EEF0F3' }} />

          {/* Class */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Class</span>
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
              className="text-xs outline-none rounded-xl px-3 py-2"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif',
                color: classFilter !== 'All' ? ACCENT : '#374151', fontWeight: 700, minWidth: 140 }}>
              {classNames.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex-shrink-0 hidden sm:block self-stretch w-px mb-1" style={{ background: '#EEF0F3' }} />

          {/* Fee Status */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>School Fees Status</span>
            <div className="flex items-center gap-1">
              {['All', 'Paid', 'Partial', 'Unpaid'].map(f => (
                <button key={f} onClick={() => setFeeFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-colors"
                  style={{
                    background: feeFilter === f ? 'rgba(3,103,160,0.10)' : 'transparent',
                    color: feeFilter === f ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif', fontWeight: feeFilter === f ? 800 : 600,
                    border: feeFilter === f ? '1px solid rgba(3,103,160,0.20)' : '1px solid #EEF0F3',
                  }}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right group: count + view toggle */}
        <div className="flex items-end gap-3 flex-shrink-0 ml-auto">
          <p className="text-xs font-bold text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} of {principalStudents.length} students
          </p>
          <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: '#F4F6F8' }}>
            {[{ mode: 'table', Icon: List, label: 'Table' }, { mode: 'grid', Icon: LayoutGrid, label: 'Grid' }].map(({ mode, Icon, label }) => (
              <button key={mode} onClick={() => setViewMode(mode)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-black transition-all"
                style={{ background: viewMode === mode ? NAVY : 'transparent', color: viewMode === mode ? '#fff' : '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                <Icon size={13} strokeWidth={2.5} />{label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table view ── */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['Student', 'ID', 'Class', 'School Fees Status', 'Grade', ''].map(h => (
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
                      <span className="text-sm font-black font-mono" style={{ color: ACCENT, letterSpacing: '0.06em' }}>{s.studentId}</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.class}</td>
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
      )}

      {/* ── Grid view ── */}
      {viewMode === 'grid' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginated.length === 0 && (
              <div className="col-span-4 py-16 text-center">
                <p className="text-sm font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>No students match the filters.</p>
              </div>
            )}
            {paginated.map(s => {
              const gc = gradeCfg(s.avgGrade)
              const fs = feeStatusCfg[s.feeStatus]
              return (
                <div key={s.id}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-200"
                  style={{ border: '1px solid #EEF0F3' }}
                  onClick={() => setSelected(s.id)}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}>

                  {/* Card header */}
                  <div className="px-4 pt-4 pb-3 flex items-center gap-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                    <Avatar name={s.name} gender={s.gender} photoId={s.photoId} size={44} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black truncate" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>{s.name}</p>
                      <p className="text-xs font-black font-mono mt-0.5" style={{ color: ACCENT, letterSpacing: '0.06em' }}>{s.studentId}</p>
                    </div>
                    <span className="text-xl font-black flex-shrink-0" style={{ color: gc.color, fontFamily: 'Sora, sans-serif' }}>{s.avgGrade}</span>
                  </div>

                  {/* Card body */}
                  <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: `${ACCENT}12`, color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                        {s.class}
                      </span>
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-full"
                        style={{ background: fs.bg, color: fs.color, fontFamily: 'Lato, sans-serif' }}>
                        {s.feeStatus}
                      </span>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="px-4 py-2.5 flex items-center justify-end" style={{ borderTop: '1px solid #F4F6F8', background: '#F8FAFC' }}>
                    <span className="text-xs font-black flex items-center gap-1" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                      View <ChevronRight size={12} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length === 0 ? 'No records' : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
            </p>
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </div>
        </div>
      )}
    </div>
  )
}
