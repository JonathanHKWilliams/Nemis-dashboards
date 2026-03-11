import { useState, useMemo, Fragment, useEffect } from 'react'
import {
  Search, Users, UserCheck, Clock, AlertCircle, Eye,
  SlidersHorizontal, X, Plus, ChevronRight, ChevronLeft, Check, LayoutGrid, List,
  ArrowLeft, Phone, Mail, MapPin, BookOpen, Award, Calendar, FileText,
} from 'lucide-react'
import { teachersData, districts as districtsList } from '../data/mockData'

const PAGE_SIZE = 6

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const range = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: '1px solid #F4F6F8' }}>
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

const CATEGORIES      = ['All', 'Primary', 'Secondary', 'Technical', 'Vocational']
const FORM_CATEGORIES = ['Primary', 'Secondary', 'Technical', 'Vocational']
const STATUS_OPTIONS  = ['All', 'Active', 'On Leave', 'Suspended']
const FORM_STATUSES   = ['Active', 'On Leave', 'Suspended']
const SUBJECTS_ALL    = [
  'Agriculture', 'Biology', 'Chemistry', 'Civics', 'Cosmetology',
  'Economics', 'Electronics', 'English', 'French', 'Geography',
  'History', 'ICT', 'Literature', 'Mathematics', 'Music', 'Physics',
  'Science', 'Social Studies', 'Other',
]
const QUALIFICATIONS  = ['Diploma', 'B.Ed', 'B.Sc', 'B.A', 'B.Eng', 'M.Ed', 'M.Sc', 'M.A', 'Ph.D']
const STEPS = ['Personal Info', 'Assignment', 'Qualifications', 'Review']

const FORM_DEFAULTS = {
  firstName: '', lastName: '', gender: 'men',
  district: 'Buchanan City', school: '', category: 'Secondary',
  subject: 'Mathematics', qualification: 'B.Ed', experience: '', status: 'Active',
}

const subjectColor = (subject) => {
  if (['Mathematics', 'Physics', 'Chemistry'].includes(subject)) return { bg: 'rgba(37,99,235,0.09)', color: '#2563EB' }
  if (['Biology', 'Science', 'Agriculture'].includes(subject))   return { bg: 'rgba(72,208,140,0.10)', color: '#16A34A' }
  if (['English', 'French', 'Literature'].includes(subject))     return { bg: 'rgba(124,58,237,0.09)', color: '#7C3AED' }
  if (['History', 'Social Studies', 'Geography', 'Economics', 'Civics'].includes(subject)) return { bg: 'rgba(245,158,11,0.09)', color: '#D97706' }
  if (['ICT', 'Electronics'].includes(subject))                  return { bg: 'rgba(8,145,178,0.09)', color: '#0891B2' }
  return { bg: 'rgba(0,35,51,0.07)', color: '#002333' }
}

const statusConfig = {
  'Active':    { bg: '#0367A0', color: '#fff' },
  'On Leave':  { bg: '#D97706', color: '#fff' },
  'Suspended': { bg: '#A60003', color: '#fff' },
}

// mock report history months
const REPORT_MONTHS = ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026']

function PhotoAvatar({ name, gender, photoId, size = 36, id, imgErrors, onError }) {
  const url = `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (imgErrors[id]) {
    return (
      <div className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: '#002333' }}>
        <span style={{ color: '#fff', fontSize: size * 0.3, fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>{initials}</span>
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

function ReportsBar({ submitted, total }) {
  const pct = total > 0 ? (submitted / total) * 100 : 0
  const color = pct >= 87.5 ? '#48D08C' : pct >= 62.5 ? '#F59E0B' : '#A60003'
  return (
    <div className="flex items-center gap-2 min-w-[90px]">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold text-[#6B7280] whitespace-nowrap" style={{ fontFamily: 'Lato, sans-serif' }}>
        {submitted}/{total}
      </span>
    </div>
  )
}

function FilterLabel({ children }) {
  return (
    <p className="text-[10px] font-black uppercase tracking-widest text-[#002333] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
      {children}
    </p>
  )
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full text-sm rounded-lg px-3 py-2 outline-none appearance-none"
      style={{ background: '#F4F6F8', color: '#374151', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', fontWeight: 500 }}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  )
}

function FormInput({ label, ...props }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
        {label}
      </label>
      <input
        {...props}
        className="w-full px-3 py-2 text-sm rounded-lg outline-none"
        style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}
      />
    </div>
  )
}

// ── Teacher Detail Page ──────────────────────────────────────────────────────
function TeacherDetail({ teacher, imgErrors, onImgError, onBack }) {
  const sc  = subjectColor(teacher.subject)
  const stc = statusConfig[teacher.status] || statusConfig['Active']
  const pct = teacher.total > 0 ? Math.round((teacher.reports / teacher.total) * 100) : 0
  const barColor = pct >= 87.5 ? '#48D08C' : pct >= 62.5 ? '#F59E0B' : '#A60003'

  const firstName = teacher.name.split(' ')[0].toLowerCase()
  const lastName  = teacher.name.split(' ').slice(-1)[0].toLowerCase()
  const email     = `${firstName}.${lastName}@moe.gov.lr`
  const phone     = `+231-880-${String(teacher.id).padStart(3, '0')}-${String(teacher.photoId).padStart(3, '0')}`
  const joinYear  = new Date().getFullYear() - teacher.experience

  // generate monthly report history from existing reports/total
  const months = REPORT_MONTHS.slice(0, teacher.total)
  const reportHistory = months.map((month, i) => ({
    month,
    status: i < teacher.reports ? 'Submitted' : (i === teacher.reports ? 'Pending' : 'Missed'),
  }))

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={13} strokeWidth={2.5} style={{ color: '#9CA3AF' }} />}
        <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
    </div>
  )

  return (
    <div className="max-w-[900px] space-y-5">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-[#002333] transition-colors"
        style={{ fontFamily: 'Lato, sans-serif' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#0367A0' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#002333' }}
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Back to Teachers
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
        <div style={{ height: 6, background: 'linear-gradient(90deg, #002333 0%, #0367A0 100%)' }} />
        <div className="px-7 py-6 flex items-center gap-6">
          <PhotoAvatar
            name={teacher.name} gender={teacher.gender} photoId={teacher.photoId}
            size={88} id={`detail-${teacher.id}`} imgErrors={imgErrors} onError={onImgError}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                {teacher.name}
              </h1>
              <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                style={{ background: stc.bg, color: stc.color, fontFamily: 'Lato, sans-serif' }}>
                {teacher.status}
              </span>
              <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                {teacher.subject}
              </span>
            </div>
            <p className="text-sm text-[#6B7280] mt-1 font-mono">{teacher.empId}</p>
            <p className="text-sm font-semibold text-[#374151] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
              {teacher.category} Teacher · {teacher.school}
            </p>
          </div>
          {/* Report compliance pill */}
          <div className="text-center bg-[#F8FAFC] rounded-xl px-6 py-4" style={{ border: '1px solid #EEF0F3' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
              Report Rate
            </p>
            <p className="text-3xl font-black" style={{ fontFamily: 'Sora, sans-serif', color: barColor }}>
              {pct}%
            </p>
            <p className="text-[10px] text-[#9CA3AF] font-semibold mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
              {teacher.reports}/{teacher.total} submitted
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Personal & Contact */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
            Personal & Contact
          </h3>
          <InfoRow label="Gender"    value={teacher.gender === 'men' ? 'Male' : 'Female'} icon={Users} />
          <InfoRow label="Phone"     value={phone}   icon={Phone} />
          <InfoRow label="Email"     value={email}   icon={Mail} />
          <InfoRow label="Joined"    value={`${joinYear}`} icon={Calendar} />
          <InfoRow label="Experience" value={`${teacher.experience} years`} icon={Clock} />
        </div>

        {/* Assignment & Qualification */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
            Assignment & Qualification
          </h3>
          <InfoRow label="School"        value={teacher.school}        icon={BookOpen} />
          <InfoRow label="District"      value={teacher.district}      icon={MapPin} />
          <InfoRow label="Category"      value={teacher.category}      icon={Users} />
          <InfoRow label="Subject"       value={teacher.subject}       icon={FileText} />
          <InfoRow label="Qualification" value={teacher.qualification} icon={Award} />
        </div>
      </div>

      {/* Report History */}
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
            Monthly Report History
          </h3>
          <div className="flex items-center gap-1.5 h-2 rounded-full overflow-hidden" style={{ width: 120, background: '#EEF0F3' }}>
            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: barColor, transition: 'width 0.4s' }} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {reportHistory.map(({ month, status }) => {
            const cfg = status === 'Submitted'
              ? { bg: 'rgba(72,208,140,0.10)', color: '#16A34A', dot: '#48D08C' }
              : status === 'Pending'
              ? { bg: 'rgba(245,158,11,0.09)', color: '#D97706', dot: '#F59E0B' }
              : { bg: 'rgba(166,0,3,0.08)',    color: '#A60003', dot: '#A60003' }
            return (
              <div key={month} className="flex items-center justify-between rounded-lg px-3 py-2.5"
                style={{ background: cfg.bg, border: `1px solid ${cfg.dot}22` }}>
                <span className="text-xs font-bold" style={{ color: cfg.color, fontFamily: 'Lato, sans-serif' }}>{month}</span>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Main Teachers Page ───────────────────────────────────────────────────────
export default function Teachers() {
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [subjectF, setSubjectF]   = useState('All Subjects')
  const [statusF, setStatusF]     = useState('All')
  const [imgErrors, setImgErrors] = useState({})
  const [selected, setSelected]   = useState(null)

  const [teachersList, setTeachersList] = useState(teachersData)
  const [showAddForm, setShowAddForm]   = useState(false)
  const [step, setStep]                 = useState(1)
  const [form, setForm]                 = useState(FORM_DEFAULTS)

  const onImgError = (id) => setImgErrors(p => ({ ...p, [id]: true }))

  const SUBJECTS = useMemo(() =>
    ['All Subjects', ...Array.from(new Set([...teachersList.map(t => t.subject), ...SUBJECTS_ALL])).sort()],
    [teachersList])

  const filtered = useMemo(() =>
    teachersList.filter((t) => {
      const matchSearch   = t.name.toLowerCase().includes(search.toLowerCase()) || t.empId.toLowerCase().includes(search.toLowerCase()) || t.school.toLowerCase().includes(search.toLowerCase())
      const matchCategory = category === 'All'          || t.category === category
      const matchSubject  = subjectF === 'All Subjects' || t.subject  === subjectF
      const matchStatus   = statusF  === 'All'          || t.status   === statusF
      return matchSearch && matchCategory && matchSubject && matchStatus
    }), [teachersList, search, category, subjectF, statusF])

  const stats = useMemo(() => ({
    total:     teachersList.length,
    active:    teachersList.filter(t => t.status === 'Active').length,
    onLeave:   teachersList.filter(t => t.status === 'On Leave').length,
    suspended: teachersList.filter(t => t.status === 'Suspended').length,
  }), [teachersList])

  const hasActiveFilter = search || category !== 'All' || subjectF !== 'All Subjects' || statusF !== 'All'
  const [viewMode, setViewMode] = useState('grid')
  const [page, setPage]         = useState(1)
  const clearFilters = () => { setSearch(''); setCategory('All'); setSubjectF('All Subjects'); setStatusF('All') }

  useEffect(() => { setPage(1) }, [search, category, subjectF, statusF])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const openAddForm = () => { setForm(FORM_DEFAULTS); setStep(1); setShowAddForm(true) }
  const closeAddForm = () => setShowAddForm(false)

  const canProceed = () => {
    if (step === 1) return form.firstName.trim() && form.lastName.trim()
    if (step === 2) return form.district && form.school.trim()
    if (step === 3) return form.subject && form.qualification && String(form.experience).trim()
    return true
  }

  const submitTeacher = () => {
    const newId = Math.max(...teachersList.map(t => t.id)) + 1
    const newTeacher = {
      id:            newId,
      empId:         `TCH-2026-${String(newId).padStart(3, '0')}`,
      name:          `${form.firstName.trim()} ${form.lastName.trim()}`,
      gender:        form.gender,
      photoId:       Math.floor(Math.random() * 80) + 1,
      school:        form.school.trim(),
      district:      form.district,
      subject:       form.subject,
      qualification: form.qualification,
      category:      form.category,
      experience:    parseInt(form.experience) || 0,
      status:        form.status,
      reports:       0,
      total:         8,
    }
    setTeachersList(prev => [newTeacher, ...prev])
    setShowAddForm(false)
  }

  const setF = (key) => (val) => setForm(p => ({ ...p, [key]: val }))

  // ── Inline Detail Page ──────────────────────────────────────────────────
  if (selected) {
    return (
      <TeacherDetail
        teacher={selected}
        imgErrors={imgErrors}
        onImgError={onImgError}
        onBack={() => setSelected(null)}
      />
    )
  }

  return (
    <div className="space-y-5 max-w-[1200px]">

      {/* Add Teacher Button */}
      <div className="flex justify-end">
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
          style={{ background: '#002333', fontFamily: 'Lato, sans-serif', boxShadow: '0 2px 8px rgba(0,35,51,0.20)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#003a52' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#002333' }}
        >
          <Plus size={16} strokeWidth={2.5} /> Add Teacher
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Teachers', value: stats.total,     icon: Users,       color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Active',         value: stats.active,    icon: UserCheck,   color: '#48D08C', bg: 'rgba(72,208,140,0.10)' },
          { label: 'On Leave',       value: stats.onLeave,   icon: Clock,       color: '#D97706', bg: 'rgba(245,158,11,0.09)' },
          { label: 'Suspended',      value: stats.suspended, icon: AlertCircle, color: '#A60003', bg: 'rgba(166,0,3,0.08)' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                <p className="text-2xl font-bold mt-1.5" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={20} strokeWidth={2.5} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Body: Filter Sidebar + Cards/Table */}
      <div className="flex gap-5 items-start">

        {/* ── Filter Sidebar ── */}
        <div
          className="w-[210px] flex-shrink-0 bg-white rounded-xl p-4 sticky top-[88px]"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} strokeWidth={2.5} className="text-[#002333]" />
              <span className="text-[13px] font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</span>
            </div>
            {hasActiveFilter && (
              <button onClick={clearFilters}
                className="text-[11px] font-semibold text-[#A60003] hover:underline"
                style={{ fontFamily: 'Lato, sans-serif' }}>
                Clear
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <FilterLabel>Search</FilterLabel>
              <div className="relative">
                <Search size={13} strokeWidth={2.5} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Name, ID, school…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: '#F4F6F8', color: '#374151', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', fontWeight: 500 }}
                />
              </div>
            </div>

            <div>
              <FilterLabel>Category</FilterLabel>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => setCategory(c)}
                    className="text-left text-sm px-3 py-1.5 rounded-lg font-medium transition-colors"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      background: category === c ? '#002333' : 'transparent',
                      color: category === c ? '#fff' : '#4B5563',
                    }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <FilterLabel>Subject</FilterLabel>
              <FilterSelect value={subjectF} onChange={setSubjectF} options={SUBJECTS} />
            </div>

            <div>
              <FilterLabel>Status</FilterLabel>
              <FilterSelect value={statusF} onChange={setStatusF} options={STATUS_OPTIONS} />
            </div>
          </div>
        </div>

        {/* ── Cards / Table Panel ── */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length} teacher{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              {hasActiveFilter && (
                <button onClick={clearFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-[#6B7280] hover:text-[#002333] transition-colors"
                  style={{ fontFamily: 'Lato, sans-serif' }}>
                  <X size={12} strokeWidth={2.5} /> Clear filters
                </button>
              )}
              <div className="flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
                {[{ mode: 'grid', Icon: LayoutGrid, label: 'Grid' }, { mode: 'table', Icon: List, label: 'Table' }].map(({ mode, Icon, label }) => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                    style={{ background: viewMode === mode ? '#002333' : 'transparent', color: viewMode === mode ? '#fff' : '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                    <Icon size={13} strokeWidth={2.5} />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Grid View ── */}
          {viewMode === 'grid' && (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {paginated.map((teacher) => {
                const stc = statusConfig[teacher.status] || statusConfig['Active']
                return (
                  <div key={teacher.id}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                    style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
                    onClick={() => setSelected(teacher)}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {/* Card Header */}
                    <div className="px-5 pt-4 pb-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                      <div className="flex items-center gap-3">
                        <PhotoAvatar name={teacher.name} gender={teacher.gender} photoId={teacher.photoId}
                          size={44} id={teacher.id} imgErrors={imgErrors} onError={onImgError} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</p>
                          <p className="text-xs font-black text-[#374151] font-mono">{teacher.empId}</p>
                        </div>
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold flex-shrink-0"
                          style={{ background: stc.bg, color: stc.color, fontFamily: 'Lato, sans-serif' }}>
                          {teacher.status}
                        </span>
                      </div>
                    </div>
                    {/* Card Body */}
                    <div className="px-5 py-3 flex items-center justify-between">
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-black"
                        style={{ background: 'rgba(0,0,0,0.06)', color: '#0F172A', fontFamily: 'Lato, sans-serif' }}>
                        {teacher.subject}
                      </span>
                      <span className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {teacher.category}
                      </span>
                    </div>
                    <div className="px-5 py-2.5 flex items-center justify-end" style={{ borderTop: '1px solid #F4F6F8' }}>
                      <span className="text-sm font-black text-[#0367A0]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        View Profile →
                      </span>
                    </div>
                  </div>
                )
              })}
              {paginated.length === 0 && (
                <div className="col-span-2 py-16 text-center">
                  <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No teachers match your filters</p>
                </div>
              )}
            </div>
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
            </>
          )}

          {/* ── Table View ── */}
          {viewMode === 'table' && <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFBFC' }}>
                  {['Teacher', 'School', 'District', 'Subject', 'Qualification', 'Category', 'Exp.', 'Reports', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((teacher) => {
                  const sc  = subjectColor(teacher.subject)
                  const stc = statusConfig[teacher.status] || statusConfig['Active']
                  return (
                    <tr key={teacher.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>

                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <PhotoAvatar name={teacher.name} gender={teacher.gender} photoId={teacher.photoId}
                            size={38} id={teacher.id} imgErrors={imgErrors} onError={onImgError} />
                          <div>
                            <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</p>
                            <p className="text-[10px] font-semibold text-[#6B7280] font-mono">{teacher.empId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#4B5563] max-w-[160px]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        <p className="truncate">{teacher.school}</p>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.district}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                          {teacher.subject}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{ background: 'rgba(0,35,51,0.06)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
                          {teacher.qualification}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.category}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.experience}y</td>
                      <td className="px-4 py-3.5">
                        <ReportsBar submitted={teacher.reports} total={teacher.total} />
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{ background: stc.bg, color: stc.color, fontFamily: 'Lato, sans-serif' }}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={() => setSelected(teacher)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF0F3' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F6F8' }}>
                          <Eye size={12} strokeWidth={2.5} /> View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {paginated.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No teachers match your filters</p>
              </div>
            )}
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </div>}
        </div>
      </div>

      {/* ── Add Teacher Multi-Step Modal ── */}
      {showAddForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.45)' }} onClick={closeAddForm}>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)' }} onClick={e => e.stopPropagation()}>

            <div className="px-6 pt-6 pb-4 flex items-center justify-between" style={{ borderBottom: '1px solid #F4F6F8' }}>
              <div>
                <h3 className="font-bold text-[#002333] text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>Add New Teacher</h3>
                <p className="text-xs text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Step {step} of 4 — {STEPS[step - 1]}
                </p>
              </div>
              <button onClick={closeAddForm}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] transition-all"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F4F6F8'; e.currentTarget.style.color = '#002333' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9CA3AF' }}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            <div className="px-6 py-4 flex items-center gap-1" style={{ borderBottom: '1px solid #F4F6F8' }}>
              {STEPS.map((label, i) => {
                const num = i + 1
                const isDone = step > num
                const isCurrent = step === num
                return (
                  <Fragment key={label}>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
                        style={{
                          background: isDone ? '#0367A0' : isCurrent ? '#002333' : '#F4F6F8',
                          color: (isDone || isCurrent) ? '#fff' : '#9CA3AF',
                        }}>
                        {isDone ? <Check size={12} strokeWidth={3} /> : num}
                      </div>
                      <span className="text-xs font-semibold hidden sm:block"
                        style={{ color: isCurrent ? '#002333' : '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                        {label}
                      </span>
                    </div>
                    {i < STEPS.length - 1 && (
                      <div className="flex-1 h-px" style={{ background: step > num ? '#0367A0' : '#EEF0F3' }} />
                    )}
                  </Fragment>
                )
              })}
            </div>

            <div className="px-6 py-5 space-y-4">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput label="First Name *" value={form.firstName} onChange={e => setF('firstName')(e.target.value)} placeholder="e.g. Henry" />
                    <FormInput label="Last Name *"  value={form.lastName}  onChange={e => setF('lastName')(e.target.value)}  placeholder="e.g. Dolo" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>Gender *</label>
                    <div className="flex gap-2">
                      {[{ value: 'men', label: 'Male' }, { value: 'women', label: 'Female' }].map(g => (
                        <button key={g.value} onClick={() => setF('gender')(g.value)}
                          className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                          style={{ background: form.gender === g.value ? '#002333' : '#F4F6F8', color: form.gender === g.value ? '#fff' : '#4B5563', fontFamily: 'Lato, sans-serif' }}>
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>District *</label>
                    <select value={form.district} onChange={e => setF('district')(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg outline-none appearance-none"
                      style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                      {districtsList.filter(d => d !== 'Grand Bassa CEO Office').map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <FormInput label="School *" value={form.school} onChange={e => setF('school')(e.target.value)} placeholder="e.g. Grand Bassa Central High School" />
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>School Category *</label>
                    <div className="grid grid-cols-4 gap-2">
                      {FORM_CATEGORIES.map(c => (
                        <button key={c} onClick={() => setF('category')(c)}
                          className="py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: form.category === c ? '#002333' : '#F4F6F8', color: form.category === c ? '#fff' : '#4B5563', fontFamily: 'Lato, sans-serif' }}>
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>Subject *</label>
                    <select value={form.subject} onChange={e => setF('subject')(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg outline-none appearance-none"
                      style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                      {SUBJECTS_ALL.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>Qualification *</label>
                    <select value={form.qualification} onChange={e => setF('qualification')(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg outline-none appearance-none"
                      style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                      {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                  <FormInput label="Years of Experience *" type="number" min="0" max="50" value={form.experience} onChange={e => setF('experience')(e.target.value)} placeholder="e.g. 5" />
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#002333] block mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>Employment Status *</label>
                    <div className="flex gap-2">
                      {FORM_STATUSES.map(s => (
                        <button key={s} onClick={() => setF('status')(s)}
                          className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                          style={{ background: form.status === s ? '#002333' : '#F4F6F8', color: form.status === s ? '#fff' : '#4B5563', fontFamily: 'Lato, sans-serif' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>Review Details</p>
                  {[
                    { label: 'Full Name',     value: `${form.firstName} ${form.lastName}` },
                    { label: 'Gender',        value: form.gender === 'men' ? 'Male' : 'Female' },
                    { label: 'District',      value: form.district },
                    { label: 'School',        value: form.school },
                    { label: 'Category',      value: form.category },
                    { label: 'Subject',       value: form.subject },
                    { label: 'Qualification', value: form.qualification },
                    { label: 'Experience',    value: `${form.experience} year${form.experience !== '1' ? 's' : ''}` },
                    { label: 'Status',        value: form.status },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
                      <span className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
                      <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 pt-4 pb-6 flex items-center gap-3" style={{ borderTop: '1px solid #F4F6F8' }}>
              {step > 1 && (
                <button onClick={() => setStep(p => p - 1)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}>
                  <ChevronLeft size={16} strokeWidth={2.5} /> Back
                </button>
              )}
              <div className="flex-1" />
              {step < 4 ? (
                <button
                  onClick={() => canProceed() && setStep(p => p + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
                  style={{ background: canProceed() ? '#002333' : '#9CA3AF', fontFamily: 'Lato, sans-serif', cursor: canProceed() ? 'pointer' : 'not-allowed' }}>
                  Next <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              ) : (
                <button onClick={submitTeacher}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white"
                  style={{ background: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
                  <Check size={16} strokeWidth={2.5} /> Add Teacher
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
