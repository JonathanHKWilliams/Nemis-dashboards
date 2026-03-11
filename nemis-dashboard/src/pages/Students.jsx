import { useState, useMemo, useEffect } from 'react'
import { Search, GraduationCap, Users, UserCheck, Calendar, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 8

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const range = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => onPage(page - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40"
          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          <ChevronLeft size={13} strokeWidth={2.5} /> Prev
        </button>
        {range.map(p => (
          <button key={p} onClick={() => onPage(p)}
            className="w-8 h-8 rounded-lg text-xs font-bold"
            style={{ background: page === p ? '#002333' : '#F4F6F8', color: page === p ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
            {p}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => onPage(page + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40"
          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          Next <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
import { studentsData } from '../data/mockData'

const SCHOOL_NAMES   = ['All Schools',   ...Array.from(new Set(studentsData.map((s) => s.school)))]
const DISTRICT_NAMES = ['All Districts', ...Array.from(new Set(studentsData.map((s) => s.district)))]
const GRADES         = ['All Grades',    ...Array.from(new Set(studentsData.map((s) => s.grade)))]
const PERFORMANCE_OPTIONS = ['All', 'Excellent', 'Good', 'Average', 'Below Avg']
const STATUS_OPTIONS = ['All', 'Active', 'Inactive']

const perfConfig = {
  'Excellent': { bg: 'rgba(72,208,140,0.12)',  color: '#16A34A' },
  'Good':      { bg: 'rgba(37,99,235,0.09)',   color: '#2563EB' },
  'Average':   { bg: 'rgba(245,158,11,0.10)',  color: '#D97706' },
  'Below Avg': { bg: 'rgba(166,0,3,0.09)',     color: '#A60003' },
}

function PhotoAvatar({ name, gender, photoId, size = 64, id, imgErrors, onError }) {
  const url = `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (imgErrors[id]) {
    return (
      <div className="rounded-full flex items-center justify-center"
        style={{ width: size, height: size, background: '#002333', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: size * 0.28, fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>{initials}</span>
      </div>
    )
  }
  return (
    <img src={url} alt={name}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
      onError={() => onError(id)} />
  )
}

function FilterLabel({ children }) {
  return <p className="text-[10px] font-black uppercase tracking-widest text-[#6B7280] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>{children}</p>
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 text-sm rounded-lg outline-none text-[#374151] cursor-pointer"
      style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3', background: '#FAFBFC', fontWeight: 500 }}>
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

export default function Students() {
  const [search, setSearch]       = useState('')
  const [school, setSchool]       = useState('All Schools')
  const [district, setDistrict]   = useState('All Districts')
  const [grade, setGrade]         = useState('All Grades')
  const [performance, setPerf]    = useState('All')
  const [statusF, setStatusF]     = useState('All')
  const [viewMode, setViewMode]   = useState('cards')
  const [imgErrors, setImgErrors] = useState({})
  const [page, setPage]           = useState(1)

  const onImgError = (id) => setImgErrors((p) => ({ ...p, [id]: true }))

  const filtered = useMemo(() =>
    studentsData.filter((s) => {
      const matchSearch   = s.name.toLowerCase().includes(search.toLowerCase()) || s.stuId.toLowerCase().includes(search.toLowerCase())
      const matchSchool   = school      === 'All Schools'   || s.school      === school
      const matchDistrict = district    === 'All Districts' || s.district    === district
      const matchGrade    = grade       === 'All Grades'    || s.grade       === grade
      const matchPerf     = performance === 'All'           || s.performance === performance
      const matchStatus   = statusF     === 'All'           || s.status      === statusF
      return matchSearch && matchSchool && matchDistrict && matchGrade && matchPerf && matchStatus
    }), [search, school, district, grade, performance, statusF])

  const activeCount = studentsData.filter(s => s.status === 'Active').length

  const hasActiveFilters = search || school !== 'All Schools' || district !== 'All Districts' ||
    grade !== 'All Grades' || performance !== 'All' || statusF !== 'All'

  const clearAll = () => { setSearch(''); setSchool('All Schools'); setDistrict('All Districts'); setGrade('All Grades'); setPerf('All'); setStatusF('All') }

  useEffect(() => { setPage(1) }, [search, school, district, grade, performance, statusF])
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex gap-6 max-w-[1200px]">
      {/* ── Filter Sidebar ── */}
      <div className="w-[210px] flex-shrink-0">
        <div className="bg-white rounded-xl overflow-hidden sticky top-6"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="px-4 py-3.5 flex items-center justify-between" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} strokeWidth={2.5} style={{ color: '#002333' }} />
              <p className="text-[13px] font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Filters</p>
            </div>
            {hasActiveFilters && (
              <button onClick={clearAll} className="text-[11px] font-bold text-[#A60003]" style={{ fontFamily: 'Lato, sans-serif' }}>Clear</button>
            )}
          </div>
          <div className="p-4 space-y-4">
            {/* Search */}
            <div>
              <FilterLabel>Search</FilterLabel>
              <div className="relative">
                <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Name or ID…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none text-[#374151] placeholder:text-[#9CA3AF]"
                  style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3', background: '#FAFBFC' }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F4F6F8' }} />

            {/* School */}
            <div>
              <FilterLabel>School</FilterLabel>
              <FilterSelect value={school} onChange={setSchool} options={SCHOOL_NAMES} />
            </div>

            {/* District */}
            <div>
              <FilterLabel>District</FilterLabel>
              <FilterSelect value={district} onChange={setDistrict} options={DISTRICT_NAMES} />
            </div>

            {/* Grade */}
            <div>
              <FilterLabel>Grade</FilterLabel>
              <FilterSelect value={grade} onChange={setGrade} options={GRADES} />
            </div>

            <div style={{ borderTop: '1px solid #F4F6F8' }} />

            {/* Performance */}
            <div>
              <FilterLabel>Performance</FilterLabel>
              <div className="space-y-1.5">
                {PERFORMANCE_OPTIONS.map((p) => (
                  <button key={p} onClick={() => setPerf(p)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      background: performance === p ? '#002333' : '#FAFBFC',
                      color: performance === p ? '#fff' : '#4B5563',
                      border: performance === p ? 'none' : '1px solid #EEF0F3',
                    }}>
                    {p}
                    {p !== 'All' && perfConfig[p] && (
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: perfConfig[p].color }} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ borderTop: '1px solid #F4F6F8' }} />

            {/* Status */}
            <div>
              <FilterLabel>Status</FilterLabel>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button key={s} onClick={() => setStatusF(s)}
                    className="flex-1 py-1.5 rounded-lg text-xs font-bold transition-all"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      background: statusF === s ? '#002333' : '#FAFBFC',
                      color: statusF === s ? '#fff' : '#4B5563',
                      border: statusF === s ? 'none' : '1px solid #EEF0F3',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total Students',  value: studentsData.length, icon: GraduationCap, color: '#002333', bg: 'rgba(0,35,51,0.07)' },
            { label: 'Active',          value: activeCount,          icon: UserCheck,     color: '#48D08C', bg: 'rgba(72,208,140,0.10)' },
            { label: 'Inactive',        value: studentsData.length - activeCount, icon: Users, color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
            { label: 'Schools',         value: SCHOOL_NAMES.length - 1, icon: Calendar,  color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                  <p className="text-2xl font-bold mt-1" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon size={18} strokeWidth={2.5} style={{ color: s.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} student{filtered.length !== 1 ? 's' : ''} found
          </p>
          <div className="flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
            {['cards', 'table'].map((m) => (
              <button key={m} onClick={() => setViewMode(m)}
                className="px-3 py-1.5 rounded-md text-xs font-bold transition-all capitalize"
                style={{
                  fontFamily: 'Lato, sans-serif',
                  background: viewMode === m ? '#002333' : 'transparent',
                  color: viewMode === m ? '#fff' : '#9CA3AF',
                }}>
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Card View */}
        {viewMode === 'cards' && (
          <>
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
            {paginated.map((student) => {
              const pc = perfConfig[student.performance] || perfConfig['Average']
              return (
                <div key={student.id}
                  className="bg-white rounded-xl p-4 text-center transition-all duration-200"
                  style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div className="flex justify-end mb-2">
                    <span className="w-2 h-2 rounded-full"
                      style={{ background: student.status === 'Active' ? '#48D08C' : '#A60003' }} />
                  </div>
                  <div className="flex justify-center mb-3">
                    <PhotoAvatar name={student.name} gender={student.gender} photoId={student.photoId}
                      size={72} id={student.id} imgErrors={imgErrors} onError={onImgError} />
                  </div>
                  <p className="text-sm font-bold text-[#002333] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>{student.name}</p>
                  <p className="text-[10px] font-semibold text-[#6B7280] mt-0.5 font-mono">{student.stuId}</p>
                  <span className="inline-block mt-2 text-[10px] px-2.5 py-[3px] rounded-full font-bold"
                    style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
                    {student.grade}
                  </span>
                  <div className="mt-2">
                    <span className="text-[10px] px-2.5 py-[3px] rounded-full font-bold"
                      style={{ background: pc.bg, color: pc.color, fontFamily: 'Lato, sans-serif' }}>
                      {student.performance}
                    </span>
                  </div>
                  <div className="mt-3 pt-3" style={{ borderTop: '1px solid #F4F6F8' }}>
                    <p className="text-[11px] text-[#4B5563] font-semibold leading-tight" style={{ fontFamily: 'Lato, sans-serif' }}>{student.school}</p>
                    <p className="text-[10px] font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{student.district}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </>
        )}

        {/* Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-xl overflow-hidden"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#FAFBFC' }}>
                    {['Student', 'Student ID', 'School', 'District', 'Grade', 'Performance', 'Enrolled', 'Status'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-[11px] font-black uppercase tracking-wider text-[#6B7280]"
                        style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((student) => {
                    const pc = perfConfig[student.performance] || perfConfig['Average']
                    return (
                      <tr key={student.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <PhotoAvatar name={student.name} gender={student.gender} photoId={student.photoId}
                              size={36} id={`t-${student.id}`} imgErrors={imgErrors} onError={onImgError} />
                            <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{student.name}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-[#6B7280] font-semibold font-mono">{student.stuId}</td>
                        <td className="px-5 py-3.5 text-sm text-[#4B5563] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>{student.school}</td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{student.district}</td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs px-2.5 py-[3px] rounded-full font-bold"
                            style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
                            {student.grade}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs px-2.5 py-[3px] rounded-full font-bold"
                            style={{ background: pc.bg, color: pc.color, fontFamily: 'Lato, sans-serif' }}>{student.performance}</span>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{student.enrolled}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full"
                              style={{ background: student.status === 'Active' ? '#48D08C' : '#A60003' }} />
                            <span className="text-xs font-bold" style={{ color: student.status === 'Active' ? '#16A34A' : '#A60003', fontFamily: 'Lato, sans-serif' }}>
                              {student.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {paginated.length === 0 && (
                <div className="py-16 text-center">
                  <GraduationCap size={32} strokeWidth={2} className="mx-auto text-gray-300 mb-3" />
                  <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No students match your filters</p>
                </div>
              )}
            </div>
            <div className="px-4 pb-4"><Pagination page={page} totalPages={totalPages} onPage={setPage} /></div>
          </div>
        )}

        {paginated.length === 0 && viewMode === 'cards' && (
          <div className="flex flex-col items-center py-20 text-center">
            <GraduationCap size={32} strokeWidth={2} className="text-gray-300 mb-3" />
            <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No students match your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
