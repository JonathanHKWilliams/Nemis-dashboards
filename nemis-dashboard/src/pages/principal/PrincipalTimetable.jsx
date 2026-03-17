import { useState } from 'react'
import { Clock, Download, Edit2, Plus, X, Check, CalendarDays, BookOpen, User, Hash } from 'lucide-react'
import { classTimetables } from '../../data/principalData'

const ACCENT = '#0367A0'
const NAVY   = '#002333'

const DAYS = [
  { key: 'mon', label: 'Monday'    },
  { key: 'tue', label: 'Tuesday'   },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday'  },
  { key: 'fri', label: 'Friday'    },
]

const DAY_INDEX_MAP = { 1: 'mon', 2: 'tue', 3: 'wed', 4: 'thu', 5: 'fri' }
const todayKey = DAY_INDEX_MAP[new Date().getDay()] || 'mon'

const CLASS_LIST = [
  'Grade 1A','Grade 1B','Grade 2A','Grade 3A','Grade 3B',
  'Grade 4A','Grade 4B','Grade 5A','Grade 5B',
  'Grade 6A','Grade 6B','Grade 7A','Grade 7B',
  'Grade 8A','Grade 8B','Grade 9','Grade 10','Grade 11','Grade 12',
]

const ALL_TEACHERS = [
  { name: 'Mary A. Johnson',       short: 'Johnson',    gender: 'women', photoId: 44 },
  { name: 'David K. Cooper',       short: 'Cooper',     gender: 'men',   photoId: 32 },
  { name: 'Agnes T. Sumo',         short: 'Sumo',       gender: 'women', photoId: 55 },
  { name: 'Robert G. Yarkpah',     short: 'Yarkpah',    gender: 'men',   photoId: 61 },
  { name: 'Florence B. Dennis',    short: 'Dennis',     gender: 'women', photoId: 38 },
  { name: 'Samuel E. Kollie',      short: 'Kollie',     gender: 'men',   photoId: 22 },
  { name: 'Patricia W. Wleh',      short: 'Wleh',       gender: 'women', photoId: 62 },
  { name: 'Thomas J. Flomo',       short: 'Flomo',      gender: 'men',   photoId: 48 },
  { name: 'Cecelia M. Tarr',       short: 'Tarr',       gender: 'women', photoId: 71 },
  { name: 'George H. Bestman',     short: 'Bestman',    gender: 'men',   photoId: 37 },
  { name: 'Hawa N. Gbessay',       short: 'Gbessay',    gender: 'women', photoId: 52 },
  { name: 'Abraham C. Weah',       short: 'Weah',       gender: 'men',   photoId: 53 },
  { name: 'Lorpu S. Mulbah',       short: 'Mulbah',     gender: 'women', photoId: 67 },
  { name: 'Emmanuel D. Toe',       short: 'Toe',        gender: 'men',   photoId: 29 },
  { name: 'Rebecca A. Nimley',     short: 'Nimley',     gender: 'women', photoId: 41 },
  { name: 'John T. Kerkula',       short: 'Kerkula',    gender: 'men',   photoId: 64 },
  { name: 'Miatta E. Gaye',        short: 'Gaye',       gender: 'women', photoId: 46 },
  { name: 'Isaac P. Dokie',        short: 'Dokie',      gender: 'men',   photoId: 15 },
  { name: 'Satta K. Wiah',         short: 'Wiah',       gender: 'women', photoId: 58 },
  { name: 'Moses B. Togba',        short: 'Togba',      gender: 'men',   photoId: 71 },
  { name: 'Jenneh D. Fahnbulleh',  short: 'Fahnbulleh', gender: 'women', photoId: 73 },
  { name: 'Daniel O. Nyenpan',     short: 'Nyenpan',    gender: 'men',   photoId: 19 },
  { name: 'Isaiah T. Kollie',      short: 'I. Kollie',  gender: 'men',   photoId: 43 },
  { name: 'Korpo A. Momo',         short: 'Momo',       gender: 'women', photoId: 63 },
]

const SUBJECTS = [
  'Mathematics','English','English Language','English Literature','Literacy',
  'Science','Biology','Chemistry','Physics','Health','Numeracy','Phonics',
  'Social Studies','History','Civic Education','Economics','Agriculture',
  'French','ICT','PE','Physical Ed.','Music & Arts','Arts & Crafts','Handwriting',
]

const subjectColors = {
  'Mathematics':          { bg: '#E8F1F9', color: '#0367A0' },
  'Numeracy':             { bg: '#E8F1F9', color: '#0367A0' },
  'English':              { bg: '#EDE9FE', color: '#7C3AED' },
  'English Language':     { bg: '#EDE9FE', color: '#7C3AED' },
  'English Literature':   { bg: '#EDE9FE', color: '#7C3AED' },
  'Literacy':             { bg: '#EDE9FE', color: '#7C3AED' },
  'Science':              { bg: '#ECFDF5', color: '#16A34A' },
  'Biology':              { bg: '#ECFDF5', color: '#16A34A' },
  'Health':               { bg: '#ECFDF5', color: '#16A34A' },
  'Chemistry':            { bg: '#FFFBEB', color: '#D97706' },
  'Physics':              { bg: '#FFF1F2', color: '#DC2626' },
  'Social Studies':       { bg: '#F0F4F8', color: '#002333' },
  'History':              { bg: '#F0F4F8', color: '#002333' },
  'French':               { bg: '#FFF4ED', color: '#EA580C' },
  'ICT':                  { bg: '#ECFEFF', color: '#0891B2' },
  'Economics':            { bg: '#F5F3FF', color: '#A855F7' },
  'Agriculture':          { bg: '#F0FDF4', color: '#15803D' },
  'PE':                   { bg: '#F0FDF4', color: '#10B981' },
  'Physical Ed.':         { bg: '#F0FDF4', color: '#10B981' },
  'Music & Arts':         { bg: '#FDF4FF', color: '#C026D3' },
  'Arts & Crafts':        { bg: '#FDF4FF', color: '#C026D3' },
  'Handwriting':          { bg: '#FFF8F0', color: '#B45309' },
  'Civic Education':      { bg: '#F0F9FF', color: '#0284C7' },
  'Phonics':              { bg: '#F0FDF4', color: '#059669' },
}

function deepCloneSchedules() {
  const out = {}
  for (const [cls, rows] of Object.entries(classTimetables)) {
    out[cls] = rows.map(row => {
      if (row.isBreak) return { ...row }
      const r = { period: row.period, time: row.time }
      for (const d of ['mon','tue','wed','thu','fri']) {
        r[d] = row[d] ? { ...row[d], teacher: row[d].teacher ? { ...row[d].teacher } : null } : null
      }
      return r
    })
  }
  return out
}

/* ─── Teacher Avatar ─────────────────────────────────────────────────────── */
function TeacherAvatar({ teacher }) {
  const [hover, setHover] = useState(false)
  if (!teacher) return null
  const initials = teacher.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
  return (
    <div className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className="w-7 h-7 rounded-full flex-shrink-0 overflow-hidden"
        style={{ border: '2px solid rgba(255,255,255,0.80)', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
        <img
          src={`https://randomuser.me/api/portraits/${teacher.gender}/${teacher.photoId % 100}.jpg`}
          alt={teacher.name}
          className="w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
        />
        <div className="w-full h-full items-center justify-center text-white font-black text-[9px] absolute inset-0"
          style={{ background: ACCENT, display: 'none', fontFamily: 'Sora, sans-serif' }}>
          {initials}
        </div>
      </div>
      {hover && (
        <div className="absolute bottom-full left-1/2 z-50 mb-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
          style={{ transform: 'translateX(-50%)', background: NAVY, boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
          <p className="text-[11px] font-black text-white" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.name}</p>
          <div className="absolute top-full left-1/2 w-0 h-0"
            style={{ transform: 'translateX(-50%)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: `5px solid ${NAVY}` }} />
        </div>
      )}
    </div>
  )
}

/* ─── Period Cell ────────────────────────────────────────────────────────── */
function PeriodCell({ entry, isToday, onClick }) {
  const [hovered, setHovered] = useState(false)
  const hasTeacher = !!entry?.teacher

  if (!entry) return (
    <td onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: '1px solid #E2E8F0', padding: '10px 12px', textAlign: 'center',
        fontFamily: 'Lato, sans-serif', fontSize: 14, fontWeight: 700, color: '#C4CAD4',
        background: hovered ? '#F8FAFC' : '#fff', cursor: 'pointer', position: 'relative',
        transition: 'background 0.15s',
      }}>
      <div className="flex flex-col items-center gap-1">
        <span>—</span>
        {hovered && (
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
            style={{ background: '#E8F1F9', color: ACCENT }}>
            + Add
          </span>
        )}
      </div>
    </td>
  )

  const bg          = isToday ? (hasTeacher ? '#DCFCE7' : '#FEE2E2') : (hovered ? '#F0F7FF' : '#fff')
  const borderColor = isToday ? (hasTeacher ? '#86EFAC' : '#FECACA') : (hovered ? `${ACCENT}55` : '#E2E8F0')
  const subjectColor = isToday ? (hasTeacher ? '#14532D' : '#7F1D1D') : NAVY
  const roomColor    = isToday ? (hasTeacher ? '#166534' : '#991B1B') : '#374151'

  return (
    <td onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${borderColor}`, padding: '10px 12px',
        background: bg, verticalAlign: 'top', cursor: 'pointer',
        position: 'relative', transition: 'background 0.15s, border-color 0.15s',
      }}>
      {hovered && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded flex items-center justify-center"
          style={{ background: ACCENT, opacity: 0.9 }}>
          <Edit2 size={10} color="#fff" strokeWidth={2.5} />
        </div>
      )}
      <p className="text-sm font-black leading-snug pr-5" style={{ fontFamily: 'Lato, sans-serif', color: subjectColor }}>
        {entry.subject}
      </p>
      <div className="flex items-center justify-between gap-2 mt-1.5">
        <p className="text-[11px] font-bold" style={{ fontFamily: 'Lato, sans-serif', color: roomColor }}>
          Rm {entry.room}
        </p>
        {hasTeacher && <TeacherAvatar teacher={entry.teacher} />}
        {isToday && !hasTeacher && (
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
            style={{ background: '#FCA5A5', color: '#7F1D1D', fontFamily: 'Lato, sans-serif' }}>
            NO TEACHER
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold mt-1" style={{ fontFamily: 'Lato, sans-serif', color: isToday ? (hasTeacher ? '#166534' : '#991B1B') : '#6B7280' }}>
        {entry.teacher?.short ?? (isToday ? 'Unassigned' : '—')}
      </p>
    </td>
  )
}

/* ─── Form Field wrapper ─────────────────────────────────────────────────── */
function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider mb-1.5"
        style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
        {Icon && <Icon size={11} strokeWidth={2.5} />}{label}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: 10, border: '1.5px solid #E2E8F0',
  fontFamily: 'Lato, sans-serif', fontSize: 13, fontWeight: 700, color: NAVY,
  background: '#fff', outline: 'none', boxSizing: 'border-box',
}

/* ─── Edit Cell Modal ────────────────────────────────────────────────────── */
function EditCellModal({ cell, className, onSave, onClose }) {
  const [subject,     setSubject]     = useState(cell.entry?.subject ?? SUBJECTS[0])
  const [teacherName, setTeacherName] = useState(cell.entry?.teacher?.name ?? '')
  const [room,        setRoom]        = useState(cell.entry?.room ?? '')

  const dayLabel  = DAYS.find(d => d.key === cell.dayKey)?.label ?? cell.dayKey
  const teacherObj = ALL_TEACHERS.find(t => t.name === teacherName) ?? null

  function handleSave() {
    onSave(cell.rowIndex, cell.dayKey, {
      subject,
      teacher: teacherObj,
      room: room.trim() || '—',
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,14,33,0.45)' }} onClick={onClose}>
      <div className="rounded-2xl w-full max-w-md mx-4 overflow-hidden"
        style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,14,33,0.25)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 py-4 flex items-start justify-between"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${ACCENT} 100%)` }}>
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest mb-0.5"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Lato, sans-serif' }}>
              {className} · {dayLabel}
            </p>
            <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              {cell.period}
            </h3>
            <p className="text-xs font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Lato, sans-serif' }}>
              {cell.time}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center mt-0.5"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            <X size={14} color="#fff" strokeWidth={2.5} />
          </button>
        </div>

        {/* Form body */}
        <div className="px-6 py-5 space-y-4">
          <Field icon={BookOpen} label="Subject">
            <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <Field icon={User} label="Teacher">
            <select value={teacherName} onChange={e => setTeacherName(e.target.value)} style={inputStyle}>
              <option value="">— Unassigned —</option>
              {ALL_TEACHERS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
          </Field>

          <Field icon={Hash} label="Room / Venue">
            <input value={room} onChange={e => setRoom(e.target.value)}
              placeholder="e.g. 201, Lab, Field" style={inputStyle} />
          </Field>

          {/* Live preview badge */}
          {subject && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: subjectColors[subject]?.bg ?? '#F8FAFC',
                border: `1px solid ${subjectColors[subject]?.color ?? '#E2E8F0'}33`,
              }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: subjectColors[subject]?.color ?? ACCENT }} />
              <div>
                <p className="text-xs font-black"
                  style={{ color: subjectColors[subject]?.color ?? NAVY, fontFamily: 'Lato, sans-serif' }}>
                  {subject}
                </p>
                <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                  {teacherName || 'No teacher assigned'}{room ? ` · Rm ${room}` : ''}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-black"
            style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #E2E8F0' }}>
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}>
            <Check size={14} strokeWidth={3} /> Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Schedule Editor Panel ──────────────────────────────────────────────── */
function ScheduleEditorPanel({ className, schedule, onSave, onClose }) {
  const periods = schedule.filter(r => !r.isBreak)

  const [day,         setDay]       = useState('mon')
  const [periodIdx,   setPeriodIdx] = useState(0)
  const [subject,     setSubject]   = useState(SUBJECTS[0])
  const [teacherName, setTeacher]   = useState('')
  const [room,        setRoom]      = useState('')
  const [saved,       setSaved]     = useState(false)

  const selectedRow = periods[periodIdx] ?? periods[0]
  const rowIndex    = schedule.indexOf(selectedRow)
  const teacherObj  = ALL_TEACHERS.find(t => t.name === teacherName) ?? null

  function handleSave() {
    if (!selectedRow) return
    onSave(rowIndex, day, { subject, teacher: teacherObj, room: room.trim() || '—' })
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="fixed inset-0 z-50 flex"
      style={{ background: 'rgba(0,14,33,0.35)' }} onClick={onClose}>
      <div className="ml-auto h-full w-full max-w-sm overflow-y-auto flex flex-col"
        style={{ background: '#fff', boxShadow: '-8px 0 40px rgba(0,14,33,0.18)' }}
        onClick={e => e.stopPropagation()}>

        {/* Panel header */}
        <div className="px-6 pt-6 pb-5 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${ACCENT} 100%)` }}>
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <CalendarDays size={18} color="#fff" strokeWidth={2.5} />
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <X size={14} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
          <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            Schedule Editor
          </h3>
          <p className="text-xs font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Lato, sans-serif' }}>
            {className} — Assign or update a class slot
          </p>
        </div>

        {/* Form */}
        <div className="flex-1 px-6 py-5 space-y-5">
          <div className="px-4 py-3 rounded-xl text-[11px] font-bold"
            style={{ background: '#EFF6FF', color: '#1D4ED8', fontFamily: 'Lato, sans-serif', border: '1px solid #BFDBFE' }}>
            Select a period and day, then assign a subject and teacher. Existing entries will be overwritten.
          </div>

          <Field icon={CalendarDays} label="Day">
            <select value={day} onChange={e => setDay(e.target.value)} style={inputStyle}>
              {DAYS.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
            </select>
          </Field>

          <Field icon={Clock} label="Period">
            <select value={periodIdx} onChange={e => setPeriodIdx(Number(e.target.value))} style={inputStyle}>
              {periods.map((p, i) => (
                <option key={i} value={i}>{p.period} · {p.time}</option>
              ))}
            </select>
          </Field>

          <div style={{ borderTop: '1.5px dashed #E2E8F0' }} />

          <Field icon={BookOpen} label="Subject">
            <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <Field icon={User} label="Teacher">
            <select value={teacherName} onChange={e => setTeacher(e.target.value)} style={inputStyle}>
              <option value="">— Unassigned —</option>
              {ALL_TEACHERS.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
            </select>
          </Field>

          <Field icon={Hash} label="Room / Venue">
            <input value={room} onChange={e => setRoom(e.target.value)}
              placeholder="e.g. 201, Lab, Field" style={inputStyle} />
          </Field>

          {/* Preview */}
          <div className="px-4 py-3 rounded-xl"
            style={{
              background: subjectColors[subject]?.bg ?? '#F8FAFC',
              border: `1.5px solid ${subjectColors[subject]?.color ?? ACCENT}33`,
            }}>
            <p className="text-[10px] font-black uppercase tracking-wider mb-1.5"
              style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Preview</p>
            <p className="text-sm font-black"
              style={{ color: subjectColors[subject]?.color ?? NAVY, fontFamily: 'Lato, sans-serif' }}>
              {subject}
            </p>
            <p className="text-[11px] font-bold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              {DAYS.find(d => d.key === day)?.label} · {selectedRow?.period}
            </p>
            <p className="text-[11px] font-bold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              {teacherName || 'No teacher'}{room ? ` · Rm ${room}` : ''}
            </p>
          </div>
        </div>

        {/* Save button */}
        <div className="px-6 pb-6 flex-shrink-0">
          <button onClick={handleSave}
            className="w-full py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            style={{
              background: saved ? '#16A34A' : ACCENT,
              color: '#fff', fontFamily: 'Lato, sans-serif',
              transition: 'background 0.3s',
            }}>
            {saved
              ? <><Check size={15} strokeWidth={3} /> Saved!</>
              : <><Plus size={15} strokeWidth={3} /> Save Slot</>}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function PrincipalTimetable() {
  const [selectedClass, setSelectedClass] = useState('Grade 7A')
  const [schedules,     setSchedules]     = useState(() => deepCloneSchedules())
  const [editingCell,   setEditingCell]   = useState(null)
  const [showEditor,    setShowEditor]    = useState(false)
  const [lastSaved,     setLastSaved]     = useState(null)

  const schedule = schedules[selectedClass] ?? []

  function handleCellClick(rowIndex, dayKey, entry, period, time) {
    setEditingCell({ rowIndex, dayKey, entry, period, time })
    setShowEditor(false)
  }

  function handleSaveCell(rowIndex, dayKey, newEntry) {
    setSchedules(prev => {
      const rows = [...prev[selectedClass]]
      rows[rowIndex] = { ...rows[rowIndex], [dayKey]: newEntry }
      return { ...prev, [selectedClass]: rows }
    })
    const day = DAYS.find(d => d.key === dayKey)?.label ?? dayKey
    setLastSaved(`${editingCell.period} · ${day}`)
    setEditingCell(null)
  }

  function handleEditorSave(rowIndex, dayKey, newEntry) {
    setSchedules(prev => {
      const rows = [...(prev[selectedClass] ?? [])]
      if (rows[rowIndex]) {
        rows[rowIndex] = { ...rows[rowIndex], [dayKey]: newEntry }
      }
      return { ...prev, [selectedClass]: rows }
    })
    const dayLabel = DAYS.find(d => d.key === dayKey)?.label ?? dayKey
    const row = (schedules[selectedClass] ?? []).filter(r => !r.isBreak).find((_, i, arr) => {
      const allRows = schedules[selectedClass] ?? []
      return allRows.indexOf(arr[i]) === rowIndex
    })
    setLastSaved(`${row?.period ?? 'Slot'} · ${dayLabel}`)
  }

  return (
    <div className="space-y-5 max-w-[1200px]">

      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>
            Academic Year 2025–2026
          </h2>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
            1st Semester · Class Schedule
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block"
              style={{ fontFamily: 'Lato, sans-serif' }}>
              Select Class
            </label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-black outline-none"
              style={{ background: '#fff', border: `2px solid ${ACCENT}`, color: NAVY, fontFamily: 'Lato, sans-serif', minWidth: 150 }}>
              {CLASS_LIST.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button onClick={() => { setShowEditor(true); setEditingCell(null) }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black"
              style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif', boxShadow: '0 2px 8px rgba(3,103,160,0.25)' }}>
              <CalendarDays size={14} strokeWidth={2.5} /> Edit Schedule
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black"
              style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3' }}>
              <Download size={14} strokeWidth={2.5} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl flex-wrap"
        style={{ background: 'rgba(3,103,160,0.06)', border: '1px solid rgba(3,103,160,0.15)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
        <p className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>
          {selectedClass} — Weekly Class Schedule
        </p>
        <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
          · Click any cell to edit · Hover teacher photo for name
        </span>
        {lastSaved && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full"
            style={{ background: '#DCFCE7', color: '#15803D', fontFamily: 'Lato, sans-serif' }}>
            <Check size={10} strokeWidth={3} /> Updated: {lastSaved}
          </span>
        )}
      </div>

      {/* Schedule Grid */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 900, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                <th className="text-left px-4 py-3.5 text-xs font-black uppercase tracking-wider w-40"
                  style={{ color: '#0F172A', fontFamily: 'Lato, sans-serif', border: '1px solid #B0CCE8' }}>
                  Period / Time
                </th>
                {DAYS.map(d => (
                  <th key={d.key} className="text-center px-3 py-3.5 text-xs font-black uppercase tracking-wider"
                    style={{
                      fontFamily: 'Lato, sans-serif',
                      border: d.key === todayKey ? '1px solid #16A34A' : '1px solid #B0CCE8',
                      background: d.key === todayKey ? '#16A34A' : 'transparent',
                      color: d.key === todayKey ? '#fff' : '#0F172A',
                    }}>
                    {d.label}{d.key === todayKey ? ' · Today' : ''}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => {
                const isBreak = !!row.isBreak
                return (
                  <tr key={i}>
                    <td className="px-4 py-3 w-40"
                      style={{ border: '1px solid #E2E8F0', background: '#F4F6F8', verticalAlign: 'middle' }}>
                      <div className="flex items-center gap-2">
                        <Clock size={15} strokeWidth={3} style={{ color: NAVY, flexShrink: 0 }} />
                        <div>
                          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 14, color: NAVY, lineHeight: 1.2 }}>
                            {row.period}
                          </p>
                          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 800, fontSize: 12, color: NAVY, marginTop: 2 }}>
                            {row.time}
                          </p>
                        </div>
                      </div>
                    </td>

                    {isBreak
                      ? DAYS.map(d => (
                          <td key={d.key}
                            style={{ border: '1px solid #E2E8F0', padding: '10px 12px', textAlign: 'center', background: '#F4F6F8' }}>
                            <span style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 13, color: NAVY }}>
                              {row.period}
                            </span>
                          </td>
                        ))
                      : DAYS.map(d => (
                          <PeriodCell
                            key={d.key}
                            entry={row[d.key]}
                            isToday={d.key === todayKey}
                            onClick={() => handleCellClick(i, d.key, row[d.key], row.period, row.time)}
                          />
                        ))
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject legend */}
      <div className="bg-white rounded-2xl p-4 flex flex-wrap items-center gap-2"
        style={{ border: '1px solid #EEF0F3' }}>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mr-1"
          style={{ fontFamily: 'Lato, sans-serif' }}>
          Subjects:
        </span>
        {Object.entries(subjectColors)
          .filter(([s]) => schedule.some(row => !row.isBreak && DAYS.some(d => row[d.key]?.subject === s)))
          .map(([subj, sc]) => (
            <span key={subj} className="text-[10px] font-black px-2.5 py-1 rounded-full"
              style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
              {subj}
            </span>
          ))}
      </div>

      <p className="text-xs font-bold text-[#9CA3AF] text-center" style={{ fontFamily: 'Lato, sans-serif' }}>
        Last updated: Mar 8, 2026 · Click any session cell to edit teacher, subject, or room.
      </p>

      {editingCell && (
        <EditCellModal
          cell={editingCell}
          className={selectedClass}
          onSave={handleSaveCell}
          onClose={() => setEditingCell(null)}
        />
      )}
      {showEditor && (
        <ScheduleEditorPanel
          className={selectedClass}
          schedule={schedule}
          onSave={handleEditorSave}
          onClose={() => setShowEditor(false)}
        />
      )}
    </div>
  )
}
