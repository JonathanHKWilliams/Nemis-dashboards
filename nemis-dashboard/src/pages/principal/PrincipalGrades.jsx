import { useState, useEffect } from 'react'
import {
  Search, Plus, Edit2, Trash2, Check, X,
  BookOpen, SlidersHorizontal, CalendarDays, Clock3,
  PenLine, Lock, Unlock, ChevronLeft, ChevronRight, ChevronDown, AlertCircle,
  ShieldAlert, Info,
} from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts'
import { gradesData, performanceTrendData, subjectPerformanceData } from '../../data/principalData'

const ACCENT   = '#0367A0'
const DARK_NAV = '#000E21'

// ─── Grade helpers ─────────────────────────────────────────────────────────────
const gradeCfg = grade => {
  if (grade === 'A' || grade === 'A+') return { bg: '#0367A014', color: '#0367A0' }
  if (['B', 'B+', 'B-'].includes(grade))  return { bg: '#16A34A14', color: '#16A34A' }
  if (['C', 'C+'].includes(grade))         return { bg: '#D9770614', color: '#D97706' }
  return { bg: '#A6000314', color: '#A60003' }
}

const GRADING_SCALE_DEFAULT = [
  { id: 1, grade: 'A', min: 80, max: 100, label: 'Distinction', color: '#0367A0' },
  { id: 2, grade: 'B', min: 70, max: 79,  label: 'Very Good',   color: '#16A34A' },
  { id: 3, grade: 'C', min: 60, max: 69,  label: 'Good',        color: '#D97706' },
  { id: 4, grade: 'D', min: 50, max: 59,  label: 'Pass',        color: '#EA580C' },
  { id: 5, grade: 'F', min: 0,  max: 49,  label: 'Fail',        color: '#A60003' },
]

// ─── Mock data ─────────────────────────────────────────────────────────────────
const MOCK_PERIODS = [
  { id: 1, name: '1st Semester 2025–26', start: 'Sep 2, 2025',  end: 'Jan 16, 2026', status: 'Completed' },
  { id: 2, name: '2nd Semester 2025–26', start: 'Jan 20, 2026', end: 'Jun 5, 2026',  status: 'Active'    },
  { id: 3, name: '1st Semester 2026–27', start: 'Sep 1, 2026',  end: 'Jan 15, 2027', status: 'Upcoming'  },
]

const MOCK_WINDOWS = [
  { id: 1, period: '2nd Semester 2025–26', class: 'Grade 7A',  subject: 'All Subjects', openDate: 'Mar 1, 2026',  closeDate: 'Apr 15, 2026', status: 'Open'   },
  { id: 2, period: '2nd Semester 2025–26', class: 'Grade 8B',  subject: 'All Subjects', openDate: 'Mar 1, 2026',  closeDate: 'Apr 15, 2026', status: 'Open'   },
  { id: 3, period: '2nd Semester 2025–26', class: 'Grade 9A',  subject: 'All Subjects', openDate: 'Mar 1, 2026',  closeDate: 'Apr 15, 2026', status: 'Closed' },
  { id: 4, period: '2nd Semester 2025–26', class: 'Grade 10',  subject: 'All Subjects', openDate: 'Mar 1, 2026',  closeDate: 'Apr 15, 2026', status: 'Open'   },
  { id: 5, period: '2nd Semester 2025–26', class: 'Grade 11',  subject: 'All Subjects', openDate: 'Mar 1, 2026',  closeDate: 'Apr 15, 2026', status: 'Closed' },
  { id: 6, period: '2nd Semester 2025–26', class: 'Grade 12',  subject: 'All Subjects', openDate: 'Mar 1, 2026',  closeDate: 'Apr 30, 2026', status: 'Open'   },
]

const MOCK_EMERGENCY_STUDENTS = [
  { id: 1, name: 'Emmanuel K. Togba',  class: 'Grade 7A', score: '', grade: '' },
  { id: 2, name: 'Satta M. Kollie',    class: 'Grade 7A', score: '', grade: '' },
  { id: 3, name: 'Moses D. Flomo',     class: 'Grade 7A', score: '', grade: '' },
  { id: 4, name: 'Patricia A. Weah',   class: 'Grade 7A', score: '', grade: '' },
  { id: 5, name: 'Isaac T. Bestman',   class: 'Grade 7A', score: '', grade: '' },
]

const SCHOOL_CLASSES = [
  'Grade 7A', 'Grade 7B',
  'Grade 8A', 'Grade 8B',
  'Grade 9A', 'Grade 9B',
  'Grade 10', 'Grade 11', 'Grade 12',
]

const SCHOOL_SUBJECTS = [
  'All Subjects',
  'Mathematics', 'English Language', 'English Literature',
  'Science', 'Biology', 'Chemistry', 'Physics',
  'Social Studies', 'History', 'Geography', 'Economics',
  'French', 'ICT', 'Agriculture', 'Health & PE', 'Physical Education',
  'Music & Arts', 'Religious Studies', 'Civic Education',
  'Guidance Counseling',
]

let _seq = 100

// ─── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ name, size = 34, photoId, gender }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  const [imgFailed, setImgFailed] = useState(false)
  const photoUrl = photoId && gender ? `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg` : null
  return (
    <div className="rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center text-white font-black"
      style={{ width: size, height: size, background: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: size * 0.3 }}>
      {photoUrl && !imgFailed
        ? <img src={photoUrl} alt={name} className="w-full h-full object-cover" onError={() => setImgFailed(true)} />
        : initials}
    </div>
  )
}

// ─── Slide-over shell ──────────────────────────────────────────────────────────
function SlidePanel({ title, subtitle, image, onClose, children, footer }) {
  return (
    <>
      <div className="fixed inset-0 z-40" style={{ background: 'rgba(0,14,33,0.45)' }} onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 flex flex-col"
        style={{ width: 500, background: '#fff', boxShadow: '-8px 0 40px rgba(0,0,0,0.18)' }}>

        <div className="flex items-start justify-between px-6 py-5 flex-shrink-0"
          style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
          <div className="flex items-center gap-3 min-w-0">
            {image && (
              <div className="flex-shrink-0 overflow-hidden" style={{ width: 44, height: 44 }}>
                <img src={image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="min-w-0">
              <h3 className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
              {subtitle && (
                <p className="text-xs font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{subtitle}</p>
              )}
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center ml-3 flex-shrink-0 transition-colors"
            style={{ background: '#F4F6F8', color: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#EEF0F3'}
            onMouseLeave={e => e.currentTarget.style.background = '#F4F6F8'}>
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {footer && (
          <div className="flex items-center gap-3 px-6 py-4 flex-shrink-0"
            style={{ borderTop: '1px solid #EEF0F3', background: '#F8FAFC' }}>
            {footer}
          </div>
        )}
      </div>
    </>
  )
}

// ─── Grading Configuration panel ──────────────────────────────────────────────
function GradingConfigPanel({ onClose }) {
  const [scale,              setScale]              = useState(GRADING_SCALE_DEFAULT.map(r => ({ ...r })))
  const [maxMarks,           setMaxMarks]           = useState(100)
  const [passingMark,        setPassingMark]        = useState(60)
  const [semestersPerYear,   setSemestersPerYear]   = useState(2)
  const [periodsPerSemester, setPeriodsPerSemester] = useState(2)
  const [policies,           setPolicies]           = useState({ requireApproval: false, allowLate: false })
  const [saved,              setSaved]              = useState(false)

  function Toggle({ value, onChange }) {
    return (
      <button onClick={() => onChange(!value)}
        className="relative flex-shrink-0 transition-colors duration-200 rounded-full"
        style={{ width: 44, height: 24, background: value ? ACCENT : '#D1D5DB' }}>
        <span className="absolute top-0.5 transition-all duration-200 w-5 h-5 rounded-full bg-white"
          style={{ left: value ? 22 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.18)' }} />
      </button>
    )
  }

  function updateRow(id, field, value) {
    setScale(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r))
  }

  function handleSave() {
    setSaved(true)
    setTimeout(() => { setSaved(false); onClose() }, 1200)
  }

  function Stepper({ value, onChange, min = 1, max = 99 }) {
    return (
      <div className="flex items-center rounded-xl overflow-hidden flex-shrink-0"
        style={{ border: '1.5px solid #EEF0F3', background: '#fff' }}>
        <button onClick={() => onChange(Math.max(min, value - 1))}
          className="w-9 h-10 flex items-center justify-center font-black text-lg transition-colors"
          style={{ color: '#9CA3AF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#002333'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>−</button>
        <span className="text-lg font-black px-2"
          style={{ color: ACCENT, fontFamily: 'Sora, sans-serif', minWidth: 40, textAlign: 'center' }}>
          {value}
        </span>
        <button onClick={() => onChange(Math.min(max, value + 1))}
          className="w-9 h-10 flex items-center justify-center font-black text-lg transition-colors"
          style={{ color: '#9CA3AF' }}
          onMouseEnter={e => e.currentTarget.style.color = '#002333'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}>+</button>
      </div>
    )
  }

  return (
    <SlidePanel
      title="Grading Configuration"
      subtitle="Institution-wide grading rules, scale, and policies"
      image="/grading-config.jpg"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = '#001830'}
            onMouseLeave={e => e.currentTarget.style.background = DARK_NAV}>
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = '#025a8e'}
            onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
            {saved ? <><Check size={14} strokeWidth={3} /> Saved</> : 'Save Configuration'}
          </button>
        </>
      }>

      <div className="space-y-6">

        {/* ── Basic Configuration ── */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider mb-3"
            style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Basic Configuration</p>

          <div style={{ border: '1px solid #D1D5DB' }}>
            {[
              { label: 'Maximum Marks',       sub: 'Full mark value for any assessment',          ctrl: <Stepper value={maxMarks}           onChange={setMaxMarks}           min={10} max={200} /> },
              { label: 'Passing Mark',         sub: 'Minimum score to pass — below this is a fail', ctrl: <Stepper value={passingMark}        onChange={setPassingMark}        min={1}  max={maxMarks} /> },
              { label: 'Semesters per Year',   sub: 'Number of semesters in one academic year',   ctrl: <Stepper value={semestersPerYear}   onChange={setSemestersPerYear}   min={1}  max={4} /> },
              { label: 'Periods per Semester', sub: 'Grading periods within each semester',       ctrl: <Stepper value={periodsPerSemester} onChange={setPeriodsPerSemester} min={1}  max={6} /> },
            ].map((row, i, arr) => (
              <div key={row.label}>
                <div className="flex items-center justify-between px-4 py-3.5">
                  <div>
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{row.label}</p>
                    <p className="text-[11px] font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{row.sub}</p>
                  </div>
                  {row.ctrl}
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
              </div>
            ))}
          </div>

          {/* Live summary */}
          <div className="mt-3 px-4 py-3 flex items-center gap-2"
            style={{ background: 'rgba(3,103,160,0.05)', border: '1px solid rgba(3,103,160,0.15)' }}>
            <Info size={13} style={{ color: ACCENT, flexShrink: 0 }} strokeWidth={2} />
            <p className="text-[11px] font-bold leading-relaxed" style={{ color: '#374151', fontFamily: 'Lato, sans-serif' }}>
              <span style={{ fontWeight: 800, color: '#002333' }}>{semestersPerYear} semester{semestersPerYear !== 1 ? 's' : ''}</span> per year ·{' '}
              <span style={{ fontWeight: 800, color: '#002333' }}>{periodsPerSemester} period{periodsPerSemester !== 1 ? 's' : ''}</span> per semester ·{' '}
              <span style={{ fontWeight: 800, color: '#002333' }}>{semestersPerYear * periodsPerSemester} total period{semestersPerYear * periodsPerSemester !== 1 ? 's' : ''}</span> per academic year
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: '#D1D5DB' }} />

        {/* ── Grading Policies ── */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider mb-3"
            style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Grading Policies</p>

          <div style={{ border: '1px solid #D1D5DB' }}>
            {[
              {
                key:   'requireApproval',
                label: 'Require admin approval before publishing grades',
                sub:   'Grades submitted by teachers will be held for review until approved by an administrator',
              },
              {
                key:   'allowLate',
                label: 'Allow late grade submissions',
                sub:   'Teachers can submit grades after the entry window has closed',
              },
            ].map((policy, i, arr) => (
              <div key={policy.key}>
                <div className="flex items-center justify-between gap-4 px-4 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{policy.label}</p>
                    <p className="text-[11px] font-bold mt-0.5 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{policy.sub}</p>
                  </div>
                  <Toggle
                    value={policies[policy.key]}
                    onChange={val => setPolicies(p => ({ ...p, [policy.key]: val }))}
                  />
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
              </div>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: '#D1D5DB' }} />

        {/* ── Grade Scale ── */}
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider mb-3"
            style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>Grade Scale</p>

          <div className="grid px-4 pb-2" style={{ gridTemplateColumns: '44px 1fr 64px 64px' }}>
            {['Grade', 'Label', 'Min', 'Max'].map(h => (
              <p key={h} className="text-[10px] font-black uppercase tracking-wider"
                style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}>{h}</p>
            ))}
          </div>

          <div style={{ border: '1px solid #D1D5DB' }}>
            {scale.map((row, i, arr) => (
              <div key={row.id}>
                <div className="grid items-center gap-2 px-4 py-3" style={{ gridTemplateColumns: '44px 1fr 64px 64px' }}>

                  <div className="w-8 h-7 flex items-center justify-center"
                    style={{ background: 'rgba(3,103,160,0.10)' }}>
                    <span className="text-xs font-black" style={{ color: ACCENT, fontFamily: 'Sora, sans-serif' }}>{row.grade}</span>
                  </div>

                  <input value={row.label} onChange={e => updateRow(row.id, 'label', e.target.value)}
                    className="w-full text-xs font-bold outline-none px-2 py-1.5"
                    style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />

                  <input type="number" value={row.min} onChange={e => updateRow(row.id, 'min', Number(e.target.value))}
                    className="w-full text-xs font-bold text-center outline-none px-2 py-1.5"
                    style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Sora, sans-serif', color: '#002333' }} />

                  <input type="number" value={row.max} onChange={e => updateRow(row.id, 'max', Number(e.target.value))}
                    className="w-full text-xs font-bold text-center outline-none px-2 py-1.5"
                    style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Sora, sans-serif', color: '#002333' }} />
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
              </div>
            ))}
          </div>
        </div>

      </div>
    </SlidePanel>
  )
}

// ─── Grading Periods panel ─────────────────────────────────────────────────────
function GradingPeriodsPanel({ onClose }) {
  const [periods, setPeriods] = useState(MOCK_PERIODS.map(p => ({ ...p })))
  const [form,    setForm]    = useState(null) // null | { id?, name, start, end, status }

  const statusCfg = {
    Active:    { bg: 'rgba(22,163,74,0.08)',  color: '#16A34A' },
    Upcoming:  { bg: 'rgba(3,103,160,0.08)',  color: ACCENT    },
    Completed: { bg: 'rgba(107,114,128,0.08)', color: '#6B7280' },
  }

  function openAdd()   { setForm({ name: '', start: '', end: '', status: 'Upcoming' }) }
  function openEdit(p) { setForm({ ...p }) }
  function cancelForm(){ setForm(null) }

  function saveForm() {
    if (!form.name.trim()) return
    if (form.id) {
      setPeriods(prev => prev.map(p => p.id === form.id ? { ...form } : p))
    } else {
      setPeriods(prev => [...prev, { ...form, id: ++_seq }])
    }
    setForm(null)
  }

  function deletePeriod(id) { setPeriods(prev => prev.filter(p => p.id !== id)) }

  return (
    <SlidePanel
      title="Grading Periods"
      subtitle="Create and manage grading periods for each semester"
      image="/grading-periods.jpg"
      onClose={onClose}>

      <div className="space-y-4">

        {!form && (
          <button onClick={openAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = '#001830'}
            onMouseLeave={e => e.currentTarget.style.background = DARK_NAV}>
            <Plus size={15} strokeWidth={2.5} /> Add Grading Period
          </button>
        )}

        {form && (
          <div className="rounded-2xl p-4 space-y-3"
            style={{ background: '#F8FAFC', border: '1.5px solid rgba(3,103,160,0.20)' }}>
            <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {form.id ? 'Edit Period' : 'New Period'}
            </p>

            <input placeholder="Period name (e.g. 1st Semester 2026–27)"
              value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-3 py-2.5 text-sm outline-none rounded-xl"
              style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Start Date</p>
                <input placeholder="e.g. Sep 1, 2026"
                  value={form.start} onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
                  className="w-full px-3 py-2 text-xs outline-none rounded-xl"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>End Date</p>
                <input placeholder="e.g. Jan 15, 2027"
                  value={form.end} onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
                  className="w-full px-3 py-2 text-xs outline-none rounded-xl"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Status</p>
              <div className="flex gap-2">
                {['Active', 'Upcoming', 'Completed'].map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                    className="px-3 py-1.5 rounded-lg text-xs font-black transition-colors"
                    style={{
                      background: form.status === s ? ACCENT : '#fff',
                      color: form.status === s ? '#fff' : '#6B7280',
                      border: `1.5px solid ${form.status === s ? ACCENT : '#EEF0F3'}`,
                      fontFamily: 'Lato, sans-serif',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={cancelForm}
                className="flex-1 py-2 rounded-xl text-xs font-bold transition-colors"
                style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}>
                Cancel
              </button>
              <button onClick={saveForm} disabled={!form.name.trim()}
                className="flex-1 py-2 rounded-xl text-xs font-black transition-colors"
                style={{
                  background: ACCENT,
                  color: '#fff',
                  fontFamily: 'Lato, sans-serif',
                  opacity: form.name.trim() ? 1 : 0.4,
                  cursor: form.name.trim() ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={e => { if (form.name.trim()) e.currentTarget.style.background = '#025a8e' }}
                onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                {form.id ? 'Save Changes' : 'Create Period'}
              </button>
            </div>
          </div>
        )}

        <div style={{ border: '1px solid #D1D5DB' }}>
          {periods.map((p, i, arr) => {
            const cfg = statusCfg[p.status] || statusCfg.Upcoming
            return (
              <div key={p.id}>
                <div className="flex items-center justify-between gap-2 px-4 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{p.name}</p>
                    <p className="text-[11px] font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                      {p.start} — {p.end}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
                      style={{ background: cfg.bg, color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
                      {p.status}
                    </span>
                    <button onClick={() => openEdit(p)}
                      className="w-7 h-7 flex items-center justify-center transition-colors"
                      style={{ color: ACCENT }}
                      onMouseEnter={e => e.currentTarget.style.color = '#025a8e'}
                      onMouseLeave={e => e.currentTarget.style.color = ACCENT}>
                      <Edit2 size={13} strokeWidth={2.5} />
                    </button>
                    <button onClick={() => deletePeriod(p.id)}
                      className="w-7 h-7 flex items-center justify-center transition-colors"
                      style={{ color: '#A60003' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#7f0002'}
                      onMouseLeave={e => e.currentTarget.style.color = '#A60003'}>
                      <Trash2 size={13} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
              </div>
            )
          })}
        </div>
      </div>
    </SlidePanel>
  )
}

// ─── Grade Entry Windows panel ─────────────────────────────────────────────────
function GradeWindowsPanel({ onClose }) {
  const [windows,    setWindows]    = useState(MOCK_WINDOWS.map(w => ({ ...w })))
  const [confirming, setConfirming] = useState(null)
  const [form,       setForm]       = useState(null) // null | { id?, period, class, subject, openDate, closeDate, status }

  const openCount   = windows.filter(w => w.status === 'Open').length
  const closedCount = windows.filter(w => w.status === 'Closed').length

  function toggleWindow(id) {
    setWindows(prev => prev.map(w =>
      w.id === id ? { ...w, status: w.status === 'Open' ? 'Closed' : 'Open' } : w
    ))
    setConfirming(null)
  }

  function closeAll() {
    setWindows(prev => prev.map(w => ({ ...w, status: 'Closed' })))
  }

  function openAll() {
    setWindows(prev => prev.map(w => ({ ...w, status: 'Open' })))
  }

  function openAdd() {
    setForm({ period: MOCK_PERIODS[1].name, class: SCHOOL_CLASSES[0], subject: SCHOOL_SUBJECTS[0], openDate: '', closeDate: '', status: 'Open' })
  }

  function openEdit(w) {
    setForm({ ...w })
  }

  function cancelForm() { setForm(null) }

  function saveForm() {
    if (!form.openDate.trim() || !form.closeDate.trim()) return
    if (form.id) {
      // editing an existing window — update in place
      setWindows(prev => prev.map(w => w.id === form.id ? { ...form } : w))
    } else if (form.class === 'All Classes') {
      // create one window per class
      setWindows(prev => [
        ...prev,
        ...SCHOOL_CLASSES.map(cls => ({
          ...form,
          class: cls,
          id: ++_seq,
        })),
      ])
    } else {
      setWindows(prev => [...prev, { ...form, id: ++_seq }])
    }
    setForm(null)
  }

  function deleteWindow(id) {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const formValid = form && form.openDate.trim() && form.closeDate.trim()

  return (
    <SlidePanel
      title="Grade Entry Windows"
      subtitle="Set submission windows and control when teachers can enter grades"
      image="/grade-windows.jpg"
      onClose={onClose}>

      <div className="space-y-4">

        {/* Summary + close-all */}
        <div className="flex items-center gap-3 p-4"
          style={{ background: '#F8FAFC', border: '1px solid #D1D5DB' }}>
          <div className="flex-1 flex gap-4">
            <div className="text-center">
              <p className="text-xl font-black" style={{ color: '#16A34A', fontFamily: 'Sora, sans-serif' }}>{openCount}</p>
              <p className="text-[10px] font-bold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>Open</p>
            </div>
            <div className="w-px" style={{ background: '#EEF0F3' }} />
            <div className="text-center">
              <p className="text-xl font-black" style={{ color: '#A60003', fontFamily: 'Sora, sans-serif' }}>{closedCount}</p>
              <p className="text-[10px] font-bold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>Closed</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            {openCount > 0 && (
              <button onClick={closeAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-colors"
                style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.background = '#025a8e'}
                onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                <Lock size={12} strokeWidth={2.5} /> Close All
              </button>
            )}
            {closedCount > 0 && (
              <button onClick={openAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition-colors"
                style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                onMouseEnter={e => e.currentTarget.style.background = '#025a8e'}
                onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                <Unlock size={12} strokeWidth={2.5} /> Open All
              </button>
            )}
          </div>
        </div>

        {/* Info notice */}
        <div className="flex items-start gap-3 px-4 py-3"
          style={{ background: 'rgba(3,103,160,0.04)', border: '1px solid rgba(3,103,160,0.15)' }}>
          <Info size={14} style={{ color: ACCENT, flexShrink: 0, marginTop: 1 }} strokeWidth={2} />
          <p className="text-[11px] font-bold leading-relaxed" style={{ color: '#374151', fontFamily: 'Lato, sans-serif' }}>
            Each window defines the period during which teachers may submit grades for a class. Closing a window immediately blocks all grade submissions until reopened.
          </p>
        </div>

        {/* Add button */}
        {!form && (
          <button onClick={openAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.background = '#001830'}
            onMouseLeave={e => e.currentTarget.style.background = DARK_NAV}>
            <Plus size={15} strokeWidth={2.5} /> Add Entry Window
          </button>
        )}

        {/* Add / Edit form */}
        {form && (
          <div className="p-4 space-y-3"
            style={{ background: '#F8FAFC', border: '1.5px solid rgba(3,103,160,0.20)' }}>
            <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {form.id ? 'Edit Window' : 'New Entry Window'}
            </p>

            {/* Class */}
            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Class</p>
              <div className="relative">
                <select value={form.class} onChange={e => setForm(f => ({ ...f, class: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 text-xs font-bold outline-none appearance-none"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                  {!form.id && (
                    <option value="All Classes">— All Classes (creates a window for each)</option>
                  )}
                  {SCHOOL_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
              </div>
              {!form.id && form.class === 'All Classes' && (
                <p className="text-[10px] font-bold mt-1.5" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                  {SCHOOL_CLASSES.length} windows will be created — one per class, with the same dates and settings.
                </p>
              )}
            </div>

            {/* Subject */}
            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Subject</p>
              <div className="relative">
                <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 text-xs font-bold outline-none appearance-none"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                  {SCHOOL_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
              </div>
            </div>

            {/* Grading Period */}
            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Grading Period</p>
              <div className="relative">
                <select value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))}
                  className="w-full px-3 py-2 pr-8 text-xs font-bold outline-none appearance-none"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                  {MOCK_PERIODS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
                <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
              </div>
            </div>

            {/* Open Date + Close Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Open Date</p>
                <input type="date"
                  value={form.openDate} onChange={e => setForm(f => ({ ...f, openDate: e.target.value }))}
                  className="w-full px-3 py-2 text-xs font-bold outline-none"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Close Date</p>
                <input type="date"
                  value={form.closeDate} onChange={e => setForm(f => ({ ...f, closeDate: e.target.value }))}
                  className="w-full px-3 py-2 text-xs font-bold outline-none"
                  style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
              </div>
            </div>

            {/* Status */}
            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Status</p>
              <div className="flex gap-2">
                {['Open', 'Closed'].map(s => (
                  <button key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                    className="px-3 py-1.5 text-xs font-black transition-colors"
                    style={{
                      background: form.status === s ? ACCENT : '#fff',
                      color: form.status === s ? '#fff' : '#6B7280',
                      border: `1.5px solid ${form.status === s ? ACCENT : '#EEF0F3'}`,
                      fontFamily: 'Lato, sans-serif',
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={cancelForm}
                className="flex-1 py-2 text-xs font-bold transition-colors"
                style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}>
                Cancel
              </button>
              <button onClick={saveForm} disabled={!formValid}
                className="flex-1 py-2 text-xs font-black transition-colors"
                style={{
                  background: ACCENT,
                  color: '#fff',
                  fontFamily: 'Lato, sans-serif',
                  opacity: formValid ? 1 : 0.4,
                  cursor: formValid ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={e => { if (formValid) e.currentTarget.style.background = '#025a8e' }}
                onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                {form.id ? 'Save Changes' : 'Create Window'}
              </button>
            </div>
          </div>
        )}

        {/* Window list */}
        <div style={{ border: '1px solid #D1D5DB' }}>
          {windows.map((w, i, arr) => {
            const isOpen = w.status === 'Open'
            return (
              <div key={w.id}>
                <div className="flex items-start justify-between gap-3 px-4 py-3.5">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{w.class}</p>
                    <p className="text-[11px] font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                      {w.period} · {w.subject}
                    </p>
                    <p className="text-[10px] font-bold mt-1" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                      Opens: {w.openDate} · Closes: {w.closeDate}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
                      style={{
                        background: isOpen ? 'rgba(22,163,74,0.10)' : 'rgba(166,0,3,0.08)',
                        color: isOpen ? '#16A34A' : '#A60003',
                        fontFamily: 'Lato, sans-serif',
                      }}>
                      {w.status}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Edit dates */}
                      <button onClick={() => { setConfirming(null); openEdit(w) }}
                        className="w-7 h-7 flex items-center justify-center transition-colors"
                        style={{ color: ACCENT }}
                        onMouseEnter={e => e.currentTarget.style.color = '#025a8e'}
                        onMouseLeave={e => e.currentTarget.style.color = ACCENT}>
                        <Edit2 size={13} strokeWidth={2.5} />
                      </button>

                      {/* Delete */}
                      <button onClick={() => deleteWindow(w.id)}
                        className="w-7 h-7 flex items-center justify-center transition-colors"
                        style={{ color: '#A60003' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#7f0002'}
                        onMouseLeave={e => e.currentTarget.style.color = '#A60003'}>
                        <Trash2 size={13} strokeWidth={2.5} />
                      </button>

                      {/* Open / Close toggle */}
                      {confirming === w.id ? (
                        <div className="flex gap-1">
                          <button onClick={() => setConfirming(null)}
                            className="px-2.5 py-1.5 text-[11px] font-bold transition-colors"
                            style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#001830'}
                            onMouseLeave={e => e.currentTarget.style.background = DARK_NAV}>
                            No
                          </button>
                          <button onClick={() => toggleWindow(w.id)}
                            className="px-2.5 py-1.5 text-[11px] font-black transition-colors"
                            style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#025a8e'}
                            onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                            Yes
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirming(w.id)}
                          className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-black transition-colors"
                          style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#025a8e'}
                          onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                          {isOpen ? <><Lock size={11} strokeWidth={2.5} /> Close</> : <><Unlock size={11} strokeWidth={2.5} /> Reopen</>}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
              </div>
            )
          })}
        </div>
      </div>
    </SlidePanel>
  )
}

// ─── Grade Entry panel (emergency) ────────────────────────────────────────────
function GradeEntryPanel({ onClose }) {
  const openWindows = MOCK_WINDOWS.filter(w => w.status === 'Open').map(w => w.class)
  const [selectedClass,  setSelectedClass]  = useState(openWindows[0] || '')
  const [selectedPeriod, setSelectedPeriod] = useState('2nd Semester 2025–26')
  const [students,       setStudents]       = useState(MOCK_EMERGENCY_STUDENTS.map(s => ({ ...s })))
  const [submitted,      setSubmitted]      = useState(false)

  function scoreToGrade(score) {
    const n = Number(score)
    if (isNaN(n) || score === '') return ''
    if (n >= 80) return 'A'
    if (n >= 70) return 'B'
    if (n >= 60) return 'C'
    if (n >= 50) return 'D'
    return 'F'
  }

  function updateScore(id, val) {
    setStudents(prev => prev.map(s =>
      s.id === id ? { ...s, score: val, grade: scoreToGrade(val) } : s
    ))
  }

  function handleSubmit() {
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); onClose() }, 1400)
  }

  const filled = students.filter(s => s.score !== '').length

  return (
    <SlidePanel
      title="Emergency Grade Entry"
      subtitle="Enter grades on behalf of teachers — only available for open windows"
      image="/grade-entry.jpg"
      onClose={onClose}
      footer={
        <>
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-colors"
            style={{ background: DARK_NAV, color: '#fff', fontFamily: 'Lato, sans-serif' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={filled === 0}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black transition-all"
            style={{
              background: ACCENT,
              color: '#fff',
              fontFamily: 'Lato, sans-serif',
              opacity: filled > 0 ? 1 : 0.4,
              cursor: filled > 0 ? 'pointer' : 'not-allowed',
            }}
            onMouseEnter={e => { if (filled > 0) e.currentTarget.style.background = '#025a8e' }}
            onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
            {submitted ? <><Check size={14} strokeWidth={3} /> Submitted</> : `Submit ${filled > 0 ? `(${filled})` : ''} Grades`}
          </button>
        </>
      }>

      <div className="space-y-5">

        {/* Warning */}
        <div className="flex items-start gap-3 px-4 py-3.5"
          style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.25)' }}>
          <ShieldAlert size={16} style={{ color: '#D97706', flexShrink: 0, marginTop: 1 }} strokeWidth={2} />
          <p className="text-[11px] font-bold leading-relaxed" style={{ color: '#374151', fontFamily: 'Lato, sans-serif' }}>
            This action is recorded in the audit log. Use only in emergencies when a teacher is unable to submit grades within an open window.
          </p>
        </div>

        {/* Window selection */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
              Grading Period
            </p>
            <div className="relative">
              <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2.5 pr-8 text-xs font-bold outline-none rounded-xl appearance-none"
                style={{ background: '#F8FAFC', border: '1.5px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                {MOCK_PERIODS.map(p => <option key={p.id}>{p.name}</option>)}
              </select>
              <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1.5" style={{ fontFamily: 'Lato, sans-serif' }}>
              Class (Open Windows Only)
            </p>
            <div className="relative">
              <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
                className="w-full px-3 py-2.5 pr-8 text-xs font-bold outline-none rounded-xl appearance-none"
                style={{ background: '#F8FAFC', border: '1.5px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                {openWindows.length > 0
                  ? openWindows.map(c => <option key={c}>{c}</option>)
                  : <option value="">No open windows</option>
                }
              </select>
              <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
            </div>
          </div>
        </div>

        {openWindows.length === 0 ? (
          <div className="flex flex-col items-center py-10 gap-3"
            style={{ background: '#F8FAFC', border: '1px dashed #D1D5DB' }}>
            <AlertCircle size={28} style={{ color: '#C4C9D4' }} strokeWidth={1.5} />
            <p className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Sora, sans-serif' }}>
              No open grade windows
            </p>
            <p className="text-xs font-bold text-[#6B7280] text-center px-6" style={{ fontFamily: 'Lato, sans-serif' }}>
              Open a grade entry window first under "Manage Windows" before entering grades.
            </p>
          </div>
        ) : (
          <>
            {/* Column headers */}
            <div className="grid px-1" style={{ gridTemplateColumns: '1fr 80px 60px' }}>
              {['Student', 'Score / 100', 'Grade'].map(h => (
                <p key={h} className="text-[10px] font-black uppercase tracking-wider"
                  style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{h}</p>
              ))}
            </div>

            {/* Student rows */}
            <div style={{ border: '1px solid #D1D5DB' }}>
              {students.map((s, i, arr) => {
                const gc = s.grade ? gradeCfg(s.grade) : null
                return (
                  <div key={s.id}>
                    <div className="grid items-center gap-3 px-4 py-3"
                      style={{ gridTemplateColumns: '1fr 80px 60px' }}>

                      <div className="flex items-center gap-2.5 min-w-0">
                        <Avatar name={s.name} size={30} />
                        <span className="text-xs font-bold text-[#002333] truncate"
                          style={{ fontFamily: 'Lato, sans-serif' }}>{s.name}</span>
                      </div>

                      <input type="number" min={0} max={100} placeholder="—"
                        value={s.score}
                        onChange={e => updateScore(s.id, e.target.value)}
                        className="w-full text-sm font-black text-center outline-none py-1.5 rounded-lg"
                        style={{
                          background: '#fff',
                          border: `1.5px solid ${s.score !== '' ? ACCENT + '50' : '#EEF0F3'}`,
                          fontFamily: 'Sora, sans-serif',
                          color: '#002333',
                        }} />

                      <div className="flex justify-center">
                        {gc ? (
                          <span className="text-xs font-black px-2 py-1 rounded-lg"
                            style={{ background: gc.bg, color: gc.color, fontFamily: 'Sora, sans-serif' }}>
                            {s.grade}
                          </span>
                        ) : (
                          <span className="text-xs font-bold" style={{ color: '#D1D5DB', fontFamily: 'Sora, sans-serif' }}>—</span>
                        )}
                      </div>
                    </div>
                    {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
                  </div>
                )
              })}
            </div>

            <p className="text-[10px] font-bold text-center" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              {filled}/{students.length} grades entered · {selectedClass} · {selectedPeriod}
            </p>
          </>
        )}
      </div>
    </SlidePanel>
  )
}

// ─── Grading System Management ─────────────────────────────────────────────────
function GradingSystemManagement() {
  const [openPanel, setOpenPanel] = useState(null) // 'config' | 'periods' | 'windows' | 'entry'

  const openWindows = MOCK_WINDOWS.filter(w => w.status === 'Open').length
  const totalWindows = MOCK_WINDOWS.length

  const FEATURES = [
    {
      id:    'config',
      icon:  SlidersHorizontal,
      img:   '/grading-config.jpg',
      title: 'Grading Configuration',
      desc:  'Grade rules, scale, and policies.',
      meta:  '5 grade bands · Passing mark: 60%',
      btn:   'Configure System',
    },
    {
      id:    'periods',
      icon:  CalendarDays,
      img:   '/grading-periods.jpg',
      title: 'Grading Periods',
      desc:  'Academic periods for each semester.',
      meta:  `${MOCK_PERIODS.length} periods · 1 Active`,
      btn:   'Manage Periods',
    },
    {
      id:    'windows',
      icon:  Clock3,
      img:   '/grade-windows.jpg',
      title: 'Grade Entry Windows',
      desc:  'Control when teachers can submit grades per class.',
      meta:  `${openWindows} open · ${totalWindows - openWindows} closed`,
      btn:   'Manage Windows',
    },
    {
      id:    'entry',
      icon:  PenLine,
      img:   '/grade-entry.jpg',
      title: 'Grade Entry',
      desc:  'Admin grade entry for open windows — emergency use only.',
      meta:  `${openWindows} open window${openWindows !== 1 ? 's' : ''} available`,
      btn:   'Enter Grades',
    },
  ]

  return (
    <div className="space-y-5">

      {/* Status banner */}
      <div className="flex items-center gap-3 px-5 py-4"
        style={{ background: 'rgba(3,103,160,0.05)', border: '1px solid rgba(3,103,160,0.15)' }}>
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: '#16A34A' }} />
        <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
          2nd Semester 2025–26 is active ·
          <span style={{ color: '#16A34A' }}> {openWindows} grade windows open</span>
          <span style={{ color: '#6B7280' }}> · Teachers may currently submit grades for open classes</span>
        </p>
      </div>

      {/* Summary stats */}
      <div className="flex" style={{ border: '1px solid #D1D5DB' }}>
        {[
          { label: 'Active Windows', value: openWindows,  icon: Unlock,   iconColor: '#16A34A' },
          { label: 'Total Windows',  value: totalWindows, icon: Clock3,   iconColor: ACCENT    },
          { label: 'Passing Mark',   value: '60 / 100',   icon: BookOpen, iconColor: DARK_NAV  },
        ].map((s, i, arr) => {
          const Icon = s.icon
          return (
            <div key={s.label} className="flex items-center flex-1">
              <div className="flex-1 flex flex-col items-center justify-center py-5 gap-1.5">
                <div className="w-8 h-8 flex items-center justify-center"
                  style={{ background: '#E5E7EB' }}>
                  <Icon size={15} strokeWidth={3} style={{ color: '#002333' }} />
                </div>
                <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
              </div>
              {i < arr.length - 1 && <div style={{ width: 2, height: 40, background: '#D1D5DB', flexShrink: 0 }} />}
            </div>
          )
        })}
      </div>

      {/* Feature cards — 2×2 grid */}
      <div className="grid grid-cols-2 gap-4">
        {FEATURES.map(f => {
          const Icon = f.icon
          return (
            <div key={f.id} className="flex gap-3 p-4"
              style={{ background: '#fff' }}>

              {/* Left image */}
              <div className="flex-shrink-0 overflow-hidden" style={{ width: 68, height: 68, background: '#F4F6F8' }}>
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover"
                  onError={e => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="w-full h-full items-center justify-center" style={{ display: 'none' }}>
                  <Icon size={22} style={{ color: '#D1D5DB' }} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1 min-w-0">
                <div>
                  <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{f.title}</h3>
                  <p className="text-xs font-bold mt-0.5 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{f.desc}</p>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 self-start"
                  style={{ background: '#EEF0F3', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
                  {f.meta}
                </span>
                <button onClick={() => setOpenPanel(f.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all self-start"
                  style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#025a8e'}
                  onMouseLeave={e => e.currentTarget.style.background = ACCENT}>
                  {f.btn} <ChevronRight size={12} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Start Guide */}
      <div style={{ border: '1px solid #D1D5DB' }}>

        {/* Header */}
        <div className="flex gap-3 px-5 py-4 items-center" style={{ borderBottom: '1px solid #D1D5DB', background: '#F8FAFC' }}>
          <div className="flex-shrink-0 overflow-hidden" style={{ width: 68, height: 68, background: '#F4F6F8' }}>
            <img src="/grading-guide.jpg" alt="Grading Guide" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Quick Start Guide</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              How the grading system works — follow these steps in order.
            </p>
          </div>
        </div>

        {/* Steps */}
        {[
          {
            step: '01',
            title: 'Configure the Grading System',
            body: 'Start here. Set your maximum marks, passing mark, number of semesters per year, and periods per semester. Also define your grade scale (A, B, C…) and grading policies such as whether admin approval is required before grades are published.',
          },
          {
            step: '02',
            title: 'Create Grading Periods',
            body: 'Define the academic periods teachers will be submitting grades for — e.g. "1st Semester 2025–26". Each period has a start date, end date, and status (Upcoming, Active, or Completed). You must have at least one Active period before opening grade windows.',
          },
          {
            step: '03',
            title: 'Open Grade Entry Windows',
            body: 'A grade entry window controls whether teachers in a specific class can submit grades. Go to Manage Windows, create a window for each class (or use "All Classes" to create them all at once), set the open and close dates, and set the status to Open. Teachers can only submit grades when their class window is Open.',
          },
          {
            step: '04',
            title: 'Closing & Reopening Windows',
            body: 'Once the submission deadline has passed, close the window — this immediately locks that class\'s grades and prevents any teacher from editing or submitting. Use "Close All" to lock every class at once. You can reopen a closed window at any time if late submissions need to be accepted.',
          },
          {
            step: '05',
            title: 'Emergency Grade Entry',
            body: 'If a teacher is unable to submit grades themselves, an administrator can enter grades on their behalf using the Grade Entry panel — but only for classes with an Open window. Every emergency entry is recorded in the audit log.',
          },
        ].map((s, i, arr) => (
          <div key={s.step}>
            <div className="flex gap-4 px-5 py-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center"
                style={{ background: DARK_NAV }}>
                <span className="text-[10px] font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.step}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.title}</p>
                <p className="text-xs font-bold mt-1 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{s.body}</p>
              </div>
            </div>
            {i < arr.length - 1 && <div style={{ height: 1, background: '#D1D5DB' }} />}
          </div>
        ))}
      </div>

      {/* Panels */}
      {openPanel === 'config'  && <GradingConfigPanel  onClose={() => setOpenPanel(null)} />}
      {openPanel === 'periods' && <GradingPeriodsPanel  onClose={() => setOpenPanel(null)} />}
      {openPanel === 'windows' && <GradeWindowsPanel    onClose={() => setOpenPanel(null)} />}
      {openPanel === 'entry'   && <GradeEntryPanel      onClose={() => setOpenPanel(null)} />}
    </div>
  )
}

// ─── Grade Records view ────────────────────────────────────────────────────────
function GradeRecords() {
  const [search,         setSearch]   = useState('')
  const [subjectFilter,  setSubject]  = useState('All')
  const [classFilter,    setClass]    = useState('All')
  const [semesterFilter, setSemester] = useState('1st Semester')
  const [sortBy,         setSortBy]   = useState('name-az')
  const [page,           setPage]     = useState(1)
  const PAGE_SIZE = 10

  const subjects = ['All', ...Array.from(new Set(gradesData.map(g => g.subject)))]
  const classes  = ['All', ...Array.from(new Set(gradesData.map(g => g.class))).sort()]

  // Reset to page 1 whenever filters change
  useEffect(() => { setPage(1) }, [search, subjectFilter, classFilter, semesterFilter, sortBy])

  const SORT_OPTIONS = [
    { value: 'name-az',    label: 'Name A–Z'        },
    { value: 'name-za',    label: 'Name Z–A'        },
    { value: 'score-high', label: 'Score: High–Low'  },
    { value: 'score-low',  label: 'Score: Low–High'  },
    { value: 'grade',      label: 'Grade'            },
  ]

  const filtered = gradesData
    .filter(g => {
      const q = search.toLowerCase()
      return (
        (g.name.toLowerCase().includes(q) || g.studentId.toLowerCase().includes(q)) &&
        (subjectFilter === 'All' || g.subject === subjectFilter) &&
        (classFilter   === 'All' || g.class   === classFilter)   &&
        g.term === semesterFilter
      )
    })
    .sort((a, b) => {
      if (sortBy === 'name-az')    return a.name.localeCompare(b.name)
      if (sortBy === 'name-za')    return b.name.localeCompare(a.name)
      if (sortBy === 'score-high') return b.score - a.score
      if (sortBy === 'score-low')  return a.score - b.score
      if (sortBy === 'grade')      return a.grade.localeCompare(b.grade)
      return 0
    })

  const avgScore = filtered.length
    ? Math.round(filtered.reduce((s, g) => s + g.score, 0) / filtered.length)
    : 0

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const pageItems  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  return (
    <div className="space-y-5">

      {/* Horizontal filter bar */}
      <div className="flex items-end gap-3 flex-wrap px-4 py-3"
        style={{ background: '#fff', border: '1px solid #D1D5DB' }}>

        {/* Search */}
        <div className="flex flex-col gap-1 flex-1 min-w-44">
          <span className="text-[10px] font-black uppercase" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Search</span>
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
            <input type="text" placeholder="Student or ID…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs font-bold outline-none"
              style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>
        </div>

        <div style={{ width: 1, alignSelf: 'stretch', background: '#D1D5DB', flexShrink: 0 }} />

        {/* Semester toggle */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Semester</span>
          <div className="flex items-center">
            {['1st Semester', '2nd Semester'].map(s => (
              <button key={s} onClick={() => setSemester(s)}
                className="px-3 py-2 text-xs font-black transition-colors"
                style={{
                  background: semesterFilter === s ? DARK_NAV : 'transparent',
                  color: semesterFilter === s ? '#fff' : '#6B7280',
                  fontFamily: 'Lato, sans-serif',
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: 1, alignSelf: 'stretch', background: '#D1D5DB', flexShrink: 0 }} />

        {/* Class dropdown */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Class</span>
          <div className="relative">
            <select value={classFilter} onChange={e => setClass(e.target.value)}
              className="pl-3 pr-8 py-2 text-xs font-bold outline-none appearance-none"
              style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333', minWidth: 110 }}>
              {classes.map(c => <option key={c}>{c}</option>)}
            </select>
            <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
          </div>
        </div>

        <div style={{ width: 1, alignSelf: 'stretch', background: '#D1D5DB', flexShrink: 0 }} />

        {/* Subject dropdown */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Subject</span>
          <div className="relative">
            <select value={subjectFilter} onChange={e => setSubject(e.target.value)}
              className="pl-3 pr-8 py-2 text-xs font-bold outline-none appearance-none"
              style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333', minWidth: 140 }}>
              {subjects.map(s => <option key={s}>{s}</option>)}
            </select>
            <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
          </div>
        </div>

        <div style={{ width: 1, alignSelf: 'stretch', background: '#D1D5DB', flexShrink: 0 }} />

        {/* Sort */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Sort</span>
          <div className="relative">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="pl-3 pr-8 py-2 text-xs font-bold outline-none appearance-none"
              style={{ background: '#F8FAFC', border: '1px solid #D1D5DB', fontFamily: 'Lato, sans-serif', color: '#002333', minWidth: 140 }}>
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={13} strokeWidth={2.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }} />
          </div>
        </div>

        {/* Stats */}
        <div className="ml-auto flex items-center gap-4">
          <p className="text-xs font-bold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} records
          </p>
          <p className="text-xs font-bold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
            Avg: <span style={{ color: ACCENT, fontWeight: 900 }}>{avgScore}%</span>
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="space-y-5">
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #D1D5DB' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['Student', 'Class', 'Subject', 'Score', 'Grade', 'Semester'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((g, i) => {
                const gc = gradeCfg(g.grade)
                return (
                  <tr key={i}
                    style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#EEF4FB' }}
                    onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar name={g.name} photoId={g.photoId} gender={g.gender} />
                        <span className="text-sm font-bold text-[#002333]"
                          style={{ fontFamily: 'Lato, sans-serif' }}>{g.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#374151]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{g.class}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(0,0,0,0.06)', color: '#0F172A', fontFamily: 'Lato, sans-serif' }}>
                        {g.subject}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-black" style={{ color: gc.color, fontFamily: 'Sora, sans-serif' }}>
                        {g.score}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-sm font-black px-2.5 py-1 rounded-full"
                        style={{ background: gc.bg, color: gc.color, fontFamily: 'Sora, sans-serif' }}>
                        {g.grade}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs font-bold text-[#6B7280]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{g.term}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid #E5E7EB' }}>
            <p className="text-xs font-bold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              Showing {filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="flex items-center justify-center w-8 h-8 text-xs font-black transition-colors"
                style={{
                  background: safePage === 1 ? '#F4F6F8' : DARK_NAV,
                  color: safePage === 1 ? '#9CA3AF' : '#fff',
                  cursor: safePage === 1 ? 'not-allowed' : 'pointer',
                }}>
                <ChevronLeft size={14} strokeWidth={2.5} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setPage(n)}
                  className="flex items-center justify-center w-8 h-8 text-xs font-black transition-colors"
                  style={{
                    background: n === safePage ? ACCENT : 'transparent',
                    color: n === safePage ? '#fff' : '#6B7280',
                    fontFamily: 'Lato, sans-serif',
                  }}>
                  {n}
                </button>
              ))}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="flex items-center justify-center w-8 h-8 text-xs font-black transition-colors"
                style={{
                  background: safePage === totalPages ? '#F4F6F8' : DARK_NAV,
                  color: safePage === totalPages ? '#9CA3AF' : '#fff',
                  cursor: safePage === totalPages ? 'not-allowed' : 'pointer',
                }}>
                <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Documents */}
      <div className="px-5 py-5" style={{ border: '1px solid #D1D5DB', background: '#fff' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 36, height: 36, background: DARK_NAV }}>
            <BookOpen size={16} strokeWidth={2.5} style={{ color: '#fff' }} />
          </div>
          <div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Grade Records — Reading Guide</p>
            <p className="text-xs font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              Understanding how grades are recorded, filtered, and interpreted in this section.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {[
            {
              icon: BookOpen,
              title: 'What is the Grade Records section?',
              body: 'This section displays the academic performance of all students across subjects and semesters. Each row represents one grade entry — a single student\'s score in a specific subject for a specific term. Grades are submitted by teachers through open grade entry windows and are visible here once recorded.',
            },
            {
              icon: Search,
              title: 'Searching and Filtering',
              body: 'Use the search bar to find a student by name or student ID. Use the Semester toggle to switch between 1st and 2nd Semester records. The Class and Subject dropdowns further narrow results to a specific class or subject. All filters work together — only records matching all selected criteria are shown.',
            },
            {
              icon: SlidersHorizontal,
              title: 'Sorting Records',
              body: 'Use the Sort dropdown to order students by name (A–Z or Z–A), by score (highest or lowest first), or alphabetically by grade. Sorting applies after filtering, so you always see the most relevant records ordered the way you need them.',
            },
            {
              icon: ShieldAlert,
              title: 'Understanding Grades and Scores',
              body: 'Scores are out of 100. A score of 80 and above earns a grade of A; 70–79 earns B; 60–69 earns C; 50–59 earns D; below 50 is F. The current passing mark is 60. The average score shown in the filter bar is calculated across all currently filtered records.',
            },
            {
              icon: AlertCircle,
              title: 'Missing or Incorrect Grades',
              body: 'If a student\'s grade is missing, it means the teacher has not yet submitted it, or the grade entry window for that class is still closed. If a grade appears incorrect, use the Grade Entry panel in the Grading System Management tab to make an emergency correction. Only authorized administrators can edit submitted grades.',
            },
          ].map((doc) => {
            const Icon = doc.icon
            return (
              <div key={doc.title} className="flex gap-3">
                <div className="flex-shrink-0 flex items-start justify-center pt-0.5"
                  style={{ width: 28, height: 28, background: '#EEF0F3' }}>
                  <Icon size={13} strokeWidth={2.5} style={{ color: DARK_NAV, marginTop: 7 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{doc.title}</p>
                  <p className="text-xs font-bold mt-0.5 leading-relaxed" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{doc.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

// ─── Root export ───────────────────────────────────────────────────────────────
export default function PrincipalGrades() {
  const [activeTab, setActiveTab] = useState('records')

  const TABS = [
    { id: 'records', label: 'Grade Records',            icon: BookOpen          },
    { id: 'system',  label: 'Grading System Management', icon: SlidersHorizontal },
  ]

  return (
    <div className="space-y-5 max-w-[1280px]">
      <div className="flex items-center gap-1 p-1 rounded-2xl"
        style={{ background: '#EEF0F3', display: 'inline-flex' }}>
        {TABS.map(tab => {
          const Icon   = tab.icon
          const active = activeTab === tab.id
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: active ? '#fff' : 'transparent',
                color: active ? ACCENT : '#6B7280',
                fontFamily: 'Lato, sans-serif',
                fontWeight: active ? 800 : 600,
                boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}>
              <Icon size={15} strokeWidth={active ? 2.5 : 2} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {activeTab === 'records' && <GradeRecords />}
      {activeTab === 'system'  && <GradingSystemManagement />}
    </div>
  )
}
