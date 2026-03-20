import { useState, useMemo } from 'react'
import {
  Clock, Download, Edit2, Plus, X, Check, CalendarDays, BookOpen, User, Hash,
  AlertTriangle, BarChart2, UserX, RotateCcw, ClipboardList, GripVertical,
  ChevronRight, Zap,
} from 'lucide-react'
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

// Which teachers are qualified for each subject
const SUBJECT_TEACHERS = {
  'Mathematics':        ['Mary A. Johnson', 'Samuel E. Kollie'],
  'English':            ['David K. Cooper', 'Patricia W. Wleh'],
  'English Language':   ['David K. Cooper', 'Patricia W. Wleh'],
  'English Literature': ['Patricia W. Wleh'],
  'Literacy':           ['Rebecca A. Nimley'],
  'Numeracy':           ['Rebecca A. Nimley'],
  'Phonics':            ['Rebecca A. Nimley'],
  'Handwriting':        ['Rebecca A. Nimley'],
  'Science':            ['Agnes T. Sumo'],
  'Biology':            ['Thomas J. Flomo'],
  'Chemistry':          ['Cecelia M. Tarr'],
  'Physics':            ['George H. Bestman'],
  'Health':             ['Agnes T. Sumo'],
  'Social Studies':     ['Robert G. Yarkpah'],
  'History':            ['Abraham C. Weah'],
  'Civic Education':    ['Korpo A. Momo'],
  'Economics':          ['Jenneh D. Fahnbulleh'],
  'French':             ['Hawa N. Gbessay'],
  'ICT':                ['Emmanuel D. Toe'],
  'Agriculture':        ['Daniel O. Nyenpan'],
  'PE':                 ['Isaiah T. Kollie', 'Florence B. Dennis'],
  'Physical Ed.':       ['Isaiah T. Kollie', 'Florence B. Dennis'],
  'Music & Arts':       ['Lorpu S. Mulbah'],
  'Arts & Crafts':      ['Rebecca A. Nimley'],
}

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

/* ─── Deep clone schedules ───────────────────────────────────────────────── */
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

/* ─── Conflict detection (across all classes) ────────────────────────────── */
function detectConflicts(schedules) {
  const teacherSlots = {} // teacherName -> { dayKey -> { rowIndex -> [className] } }
  const roomSlots    = {} // room -> { dayKey -> { rowIndex -> [className] } }

  for (const [className, rows] of Object.entries(schedules)) {
    rows.forEach((row, rowIndex) => {
      if (row.isBreak) return
      for (const { key: dayKey } of DAYS) {
        const entry = row[dayKey]
        if (!entry) continue
        if (entry.teacher?.name) {
          const t = entry.teacher.name
          teacherSlots[t] ??= {}
          teacherSlots[t][dayKey] ??= {}
          teacherSlots[t][dayKey][rowIndex] ??= []
          teacherSlots[t][dayKey][rowIndex].push(className)
        }
        if (entry.room && entry.room !== '—' && entry.room !== 'Field') {
          const r = entry.room
          roomSlots[r] ??= {}
          roomSlots[r][dayKey] ??= {}
          roomSlots[r][dayKey][rowIndex] ??= []
          roomSlots[r][dayKey][rowIndex].push(className)
        }
      }
    })
  }

  const conflictCells    = new Set()     // "className:dayKey:rowIndex"
  const conflictMessages = {}            // "className:dayKey:rowIndex" -> message

  function extract(slots, type) {
    for (const [name, days] of Object.entries(slots)) {
      for (const [dayKey, idxMap] of Object.entries(days)) {
        for (const [rowIndex, classes] of Object.entries(idxMap)) {
          if (classes.length < 2) continue
          for (const cls of classes) {
            const key = `${cls}:${dayKey}:${rowIndex}`
            conflictCells.add(key)
            const others = classes.filter(c => c !== cls).join(', ')
            conflictMessages[key] = type === 'teacher'
              ? `${name} is also in ${others}`
              : `Room ${name} also used by ${others}`
          }
        }
      }
    }
  }

  extract(teacherSlots, 'teacher')
  extract(roomSlots, 'room')
  return { conflictCells, conflictMessages }
}

/* ─── Workload computation ───────────────────────────────────────────────── */
function computeWorkload(schedules) {
  const wl = {} // teacherName -> { count, classes: Set }
  for (const [className, rows] of Object.entries(schedules)) {
    for (const row of rows) {
      if (row.isBreak) continue
      for (const { key: dayKey } of DAYS) {
        const name = row[dayKey]?.teacher?.name
        if (!name) continue
        wl[name] ??= { count: 0, classes: new Set() }
        wl[name].count++
        wl[name].classes.add(className)
      }
    }
  }
  return wl
}

/* ─── Teacher Avatar ─────────────────────────────────────────────────────── */
function TeacherAvatar({ teacher }) {
  const [hover, setHover] = useState(false)
  if (!teacher) return null
  const initials = teacher.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
  return (
    <div className="relative inline-block"
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
        style={{ border: '2px solid rgba(255,255,255,0.80)', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
        <img src={`https://randomuser.me/api/portraits/${teacher.gender}/${teacher.photoId % 100}.jpg`}
          alt={teacher.name} className="w-full h-full object-cover"
          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
        <div className="w-full h-full items-center justify-center text-white font-black text-[9px] absolute inset-0"
          style={{ background: ACCENT, display: 'none', fontFamily: 'Sora, sans-serif' }}>{initials}</div>
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
function PeriodCell({
  entry, isToday, rowIndex, dayKey, isConflict, conflictMsg, isAbsentTeacher,
  isDragSource, isDragTarget,
  onClick, onDragStart, onDragOver, onDragLeave, onDrop, onDragEnd,
}) {
  const [hovered, setHovered] = useState(false)
  const hasTeacher = !!entry?.teacher

  // Drag visual
  const dragStyle = isDragTarget
    ? { outline: `2.5px dashed ${ACCENT}`, outlineOffset: -2 }
    : isDragSource ? { opacity: 0.45 } : {}

  // Empty cell
  if (!entry) return (
    <td onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onDragOver={e => { e.preventDefault(); onDragOver() }}
      onDragLeave={onDragLeave}
      onDrop={e => { e.preventDefault(); onDrop() }}
      style={{
        border: isDragTarget ? `2.5px dashed ${ACCENT}` : '1px solid #E2E8F0',
        padding: '10px 12px', textAlign: 'center',
        fontFamily: 'Lato, sans-serif', fontSize: 14, fontWeight: 700, color: '#C4CAD4',
        background: hovered ? '#F8FAFC' : '#fff', cursor: 'pointer', position: 'relative',
        transition: 'background 0.12s',
        ...dragStyle,
      }}>
      <div className="flex flex-col items-center gap-1">
        <span>—</span>
        {hovered && (
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
            style={{ background: '#E8F1F9', color: ACCENT }}>+ Add</span>
        )}
      </div>
    </td>
  )

  // Color logic
  let bg, borderColor, subjectColor
  if (isConflict) {
    bg = '#FFF1F2'; borderColor = '#FECACA'; subjectColor = '#991B1B'
  } else if (isAbsentTeacher) {
    bg = '#FFFBEB'; borderColor = '#FDE68A'; subjectColor = '#92400E'
  } else if (isToday) {
    bg = hasTeacher ? '#DCFCE7' : '#FEE2E2'
    borderColor = hasTeacher ? '#86EFAC' : '#FECACA'
    subjectColor = hasTeacher ? '#14532D' : '#7F1D1D'
  } else {
    bg = hovered ? '#F0F7FF' : '#fff'
    borderColor = hovered ? `${ACCENT}55` : '#E2E8F0'
    subjectColor = NAVY
  }

  return (
    <td
      draggable
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragStart={e => { e.dataTransfer.effectAllowed = 'move'; onDragStart() }}
      onDragOver={e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; onDragOver() }}
      onDragLeave={onDragLeave}
      onDrop={e => { e.preventDefault(); onDrop() }}
      onDragEnd={onDragEnd}
      style={{
        border: `1px solid ${borderColor}`, padding: '10px 12px',
        background: bg, verticalAlign: 'top', cursor: 'grab',
        position: 'relative', transition: 'background 0.12s, border-color 0.12s',
        ...dragStyle,
      }}>

      {/* Conflict badge */}
      {isConflict && (
        <div className="absolute top-1 left-1 z-10" title={conflictMsg}>
          <div className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: '#DC2626' }}>
            <AlertTriangle size={9} color="#fff" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* Absent badge */}
      {isAbsentTeacher && !isConflict && (
        <div className="absolute top-1 left-1 z-10" title="Teacher is absent">
          <div className="w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: '#D97706' }}>
            <UserX size={9} color="#fff" strokeWidth={3} />
          </div>
        </div>
      )}

      {/* Edit icon on hover */}
      {hovered && !isDragSource && (
        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded flex items-center justify-center z-10"
          style={{ background: ACCENT, opacity: 0.9 }}>
          <Edit2 size={10} color="#fff" strokeWidth={2.5} />
        </div>
      )}

      {/* Drag handle hint on hover */}
      {hovered && (
        <div className="absolute bottom-1 right-1 z-10 opacity-40">
          <GripVertical size={11} color={NAVY} strokeWidth={2} />
        </div>
      )}

      <p className="text-sm font-black leading-snug pr-5 pl-1"
        style={{ fontFamily: 'Lato, sans-serif', color: subjectColor }}>
        {entry.subject}
      </p>
      <div className="flex items-center justify-between gap-2 mt-1.5">
        <p className="text-[11px] font-bold"
          style={{ fontFamily: 'Lato, sans-serif', color: isConflict ? '#991B1B' : isAbsentTeacher ? '#92400E' : isToday ? (hasTeacher ? '#166534' : '#991B1B') : '#374151' }}>
          Rm {entry.room}
        </p>
        {hasTeacher && <TeacherAvatar teacher={entry.teacher} />}
        {isToday && !hasTeacher && !isConflict && (
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
            style={{ background: '#FCA5A5', color: '#7F1D1D', fontFamily: 'Lato, sans-serif' }}>
            NO TEACHER
          </span>
        )}
        {isAbsentTeacher && !isConflict && (
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
            style={{ background: '#FDE68A', color: '#92400E', fontFamily: 'Lato, sans-serif' }}>
            ABSENT
          </span>
        )}
      </div>
      <p className="text-[10px] font-bold mt-1 pl-1"
        style={{ fontFamily: 'Lato, sans-serif', color: isConflict ? '#DC2626' : isAbsentTeacher ? '#D97706' : isToday ? (hasTeacher ? '#166534' : '#991B1B') : '#6B7280' }}>
        {entry.teacher?.short ?? (isToday ? 'Unassigned' : '—')}
      </p>
    </td>
  )
}

/* ─── Form helpers ───────────────────────────────────────────────────────── */
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

/* ─── Edit Cell Modal (with suggestions + conflict detection) ────────────── */
function EditCellModal({ cell, className, schedules, absentTeachers, conflictMessages, onSave, onClose }) {
  const [subject,     setSubject]     = useState(cell.entry?.subject ?? SUBJECTS[0])
  const [teacherName, setTeacherName] = useState(cell.entry?.teacher?.name ?? '')
  const [room,        setRoom]        = useState(cell.entry?.room ?? '')

  const dayLabel = DAYS.find(d => d.key === cell.dayKey)?.label ?? cell.dayKey

  // Find busy teachers at this slot in other classes
  const busyAt = useMemo(() => {
    const busy = {} // teacherName -> [className]
    for (const [cls, rows] of Object.entries(schedules)) {
      if (cls === className) continue
      const row = rows[cell.rowIndex]
      if (!row || row.isBreak) continue
      const t = row[cell.dayKey]?.teacher?.name
      if (t) { busy[t] ??= []; busy[t].push(cls) }
    }
    return busy
  }, [schedules, className, cell.rowIndex, cell.dayKey])

  // Find busy rooms at this slot in other classes
  const busyRooms = useMemo(() => {
    const br = {}
    for (const [cls, rows] of Object.entries(schedules)) {
      if (cls === className) continue
      const row = rows[cell.rowIndex]
      if (!row || row.isBreak) continue
      const r = row[cell.dayKey]?.room
      if (r && r !== '—') { br[r] ??= []; br[r].push(cls) }
    }
    return br
  }, [schedules, className, cell.rowIndex, cell.dayKey])

  // Categorise teachers
  const qualified  = SUBJECT_TEACHERS[subject] ?? []
  const suggested  = ALL_TEACHERS.filter(t => qualified.includes(t.name) && !busyAt[t.name] && !absentTeachers.has(t.name))
  const otherFree  = ALL_TEACHERS.filter(t => !qualified.includes(t.name) && !busyAt[t.name] && !absentTeachers.has(t.name))
  const busyList   = ALL_TEACHERS.filter(t => busyAt[t.name] && !absentTeachers.has(t.name))
  const absentList = ALL_TEACHERS.filter(t => absentTeachers.has(t.name))

  const selectedTeacherBusy   = teacherName && busyAt[teacherName]
  const selectedTeacherAbsent = teacherName && absentTeachers.has(teacherName)
  const selectedRoomConflict  = room.trim() && busyRooms[room.trim()]
  const cellConflictMsg       = conflictMessages[`${className}:${cell.dayKey}:${cell.rowIndex}`]

  const hasWarning = selectedTeacherBusy || selectedTeacherAbsent || selectedRoomConflict

  function handleSave() {
    const teacherObj = ALL_TEACHERS.find(t => t.name === teacherName) ?? null
    onSave(cell.rowIndex, cell.dayKey, { subject, teacher: teacherObj, room: room.trim() || '—' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,14,33,0.45)' }} onClick={onClose}>
      <div className="rounded-2xl w-full max-w-md mx-4 overflow-hidden"
        style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,14,33,0.25)', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 py-4 flex items-start justify-between flex-shrink-0"
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
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.15)' }}>
            <X size={14} color="#fff" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Existing conflict warning */}
          {cellConflictMsg && (
            <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl"
              style={{ background: '#FFF1F2', border: '1px solid #FECACA' }}>
              <AlertTriangle size={14} color="#DC2626" strokeWidth={2.5} className="flex-shrink-0 mt-0.5" />
              <p className="text-xs font-bold" style={{ color: '#991B1B', fontFamily: 'Lato, sans-serif' }}>
                Current conflict: {cellConflictMsg}
              </p>
            </div>
          )}

          <Field icon={BookOpen} label="Subject">
            <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <Field icon={User} label="Teacher">
            <select value={teacherName} onChange={e => setTeacherName(e.target.value)}
              style={{ ...inputStyle, borderColor: selectedTeacherBusy ? '#FCA5A5' : selectedTeacherAbsent ? '#FDE68A' : '#E2E8F0' }}>
              <option value="">— Unassigned —</option>
              {suggested.length > 0 && (
                <optgroup label={`✓ Suggested for ${subject} (${suggested.length})`}>
                  {suggested.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </optgroup>
              )}
              {otherFree.length > 0 && (
                <optgroup label="Other available teachers">
                  {otherFree.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </optgroup>
              )}
              {busyList.length > 0 && (
                <optgroup label="⚠ Busy at this time (conflict)">
                  {busyList.map(t => <option key={t.name} value={t.name}>{t.name} — teaching {busyAt[t.name]?.join(', ')}</option>)}
                </optgroup>
              )}
              {absentList.length > 0 && (
                <optgroup label="✗ Absent today">
                  {absentList.map(t => <option key={t.name} value={t.name}>{t.name} (Absent)</option>)}
                </optgroup>
              )}
            </select>
          </Field>

          <Field icon={Hash} label="Room / Venue">
            <input value={room} onChange={e => setRoom(e.target.value)}
              placeholder="e.g. 201, Lab, Field"
              style={{ ...inputStyle, borderColor: selectedRoomConflict ? '#FCA5A5' : '#E2E8F0' }} />
          </Field>

          {/* Inline warnings */}
          {hasWarning && (
            <div className="space-y-1.5">
              {selectedTeacherBusy && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: '#FFF1F2', border: '1px solid #FECACA' }}>
                  <AlertTriangle size={12} color="#DC2626" strokeWidth={2.5} />
                  <p className="text-[11px] font-bold" style={{ color: '#991B1B', fontFamily: 'Lato, sans-serif' }}>
                    Teacher conflict: {teacherName.split(' ')[0]} is already teaching {busyAt[teacherName]?.join(', ')} at this time.
                  </p>
                </div>
              )}
              {selectedTeacherAbsent && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <UserX size={12} color="#D97706" strokeWidth={2.5} />
                  <p className="text-[11px] font-bold" style={{ color: '#92400E', fontFamily: 'Lato, sans-serif' }}>
                    {teacherName.split(' ')[0]} is marked absent today.
                  </p>
                </div>
              )}
              {selectedRoomConflict && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: '#FFF1F2', border: '1px solid #FECACA' }}>
                  <AlertTriangle size={12} color="#DC2626" strokeWidth={2.5} />
                  <p className="text-[11px] font-bold" style={{ color: '#991B1B', fontFamily: 'Lato, sans-serif' }}>
                    Room conflict: Room {room} is also used by {selectedRoomConflict.join(', ')}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Preview */}
          {subject && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: subjectColors[subject]?.bg ?? '#F8FAFC', border: `1px solid ${subjectColors[subject]?.color ?? '#E2E8F0'}33` }}>
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

        <div className="px-6 pb-5 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-black"
            style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #E2E8F0' }}>
            Cancel
          </button>
          <button onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            style={{ background: hasWarning ? '#EA580C' : ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}>
            {hasWarning ? <AlertTriangle size={14} strokeWidth={2.5} /> : <Check size={14} strokeWidth={3} />}
            {hasWarning ? 'Save Anyway' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Schedule Editor Panel ──────────────────────────────────────────────── */
function ScheduleEditorPanel({ className, schedule, schedules, absentTeachers, onSave, onClose }) {
  const periods = schedule.filter(r => !r.isBreak)
  const [day,       setDay]       = useState('mon')
  const [periodIdx, setPeriodIdx] = useState(0)
  const [subject,   setSubject]   = useState(SUBJECTS[0])
  const [teacher,   setTeacher]   = useState('')
  const [room,      setRoom]      = useState('')
  const [saved,     setSaved]     = useState(false)

  const selectedRow = periods[periodIdx] ?? periods[0]
  const rowIndex    = schedule.indexOf(selectedRow)

  const busyAt = useMemo(() => {
    const busy = {}
    for (const [cls, rows] of Object.entries(schedules)) {
      if (cls === className) continue
      const row = rows[rowIndex]
      if (!row || row.isBreak) continue
      const t = row[day]?.teacher?.name
      if (t) { busy[t] ??= []; busy[t].push(cls) }
    }
    return busy
  }, [schedules, className, rowIndex, day])

  const qualified = SUBJECT_TEACHERS[subject] ?? []
  const suggested = ALL_TEACHERS.filter(t => qualified.includes(t.name) && !busyAt[t.name] && !absentTeachers.has(t.name))
  const otherFree = ALL_TEACHERS.filter(t => !qualified.includes(t.name) && !busyAt[t.name] && !absentTeachers.has(t.name))
  const busyList  = ALL_TEACHERS.filter(t => busyAt[t.name])
  const teacherObj = ALL_TEACHERS.find(t => t.name === teacher) ?? null

  function handleSave() {
    if (!selectedRow) return
    onSave(rowIndex, day, { subject, teacher: teacherObj, room: room.trim() || '—' })
    setSaved(true); setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(0,14,33,0.35)' }} onClick={onClose}>
      <div className="ml-auto h-full w-full max-w-sm overflow-y-auto flex flex-col"
        style={{ background: '#fff', boxShadow: '-8px 0 40px rgba(0,14,33,0.18)' }}
        onClick={e => e.stopPropagation()}>
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
          <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Schedule Editor</h3>
          <p className="text-xs font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'Lato, sans-serif' }}>
            {className} — Assign or update a class slot
          </p>
        </div>
        <div className="flex-1 px-6 py-5 space-y-5">
          <Field icon={CalendarDays} label="Day">
            <select value={day} onChange={e => setDay(e.target.value)} style={inputStyle}>
              {DAYS.map(d => <option key={d.key} value={d.key}>{d.label}</option>)}
            </select>
          </Field>
          <Field icon={Clock} label="Period">
            <select value={periodIdx} onChange={e => setPeriodIdx(Number(e.target.value))} style={inputStyle}>
              {periods.map((p, i) => <option key={i} value={i}>{p.period} · {p.time}</option>)}
            </select>
          </Field>
          <div style={{ borderTop: '1.5px dashed #E2E8F0' }} />
          <Field icon={BookOpen} label="Subject">
            <select value={subject} onChange={e => setSubject(e.target.value)} style={inputStyle}>
              {SUBJECTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field icon={User} label="Teacher">
            <select value={teacher} onChange={e => setTeacher(e.target.value)} style={inputStyle}>
              <option value="">— Unassigned —</option>
              {suggested.length > 0 && (
                <optgroup label={`✓ Suggested for ${subject}`}>
                  {suggested.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </optgroup>
              )}
              {otherFree.length > 0 && (
                <optgroup label="Other available">
                  {otherFree.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </optgroup>
              )}
              {busyList.length > 0 && (
                <optgroup label="⚠ Busy (conflict)">
                  {busyList.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                </optgroup>
              )}
            </select>
          </Field>
          <Field icon={Hash} label="Room / Venue">
            <input value={room} onChange={e => setRoom(e.target.value)}
              placeholder="e.g. 201, Lab, Field" style={inputStyle} />
          </Field>
        </div>
        <div className="px-6 pb-6 flex-shrink-0">
          <button onClick={handleSave}
            className="w-full py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2"
            style={{ background: saved ? '#16A34A' : ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif', transition: 'background 0.3s' }}>
            {saved ? <><Check size={15} strokeWidth={3} /> Saved!</> : <><Plus size={15} strokeWidth={3} /> Save Slot</>}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Right Panel (Workload · Absence · History) ─────────────────────────── */
function RightPanel({ view, setView, workload, absentTeachers, onToggleAbsent, history, onUndo, onClose }) {
  const OVERLOAD_THRESHOLD = 20

  const sorted = Object.entries(workload).sort((a, b) => b[1].count - a[1].count)
  const maxLoad = sorted[0]?.[1].count || 1

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: 'rgba(0,14,33,0.35)' }} onClick={onClose}>
      <div className="ml-auto h-full w-full max-w-sm overflow-y-auto flex flex-col"
        style={{ background: '#fff', boxShadow: '-8px 0 40px rgba(0,14,33,0.18)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-5 pt-5 pb-0 flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${ACCENT} 100%)` }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Admin Assist</p>
            <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <X size={13} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 pb-0">
            {[
              { id: 'workload', label: 'Workload',  icon: BarChart2   },
              { id: 'absence',  label: 'Absences',  icon: UserX       },
              { id: 'history',  label: 'History',   icon: ClipboardList },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setView(id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-black rounded-t-xl transition-all"
                style={{
                  background: view === id ? '#fff' : 'transparent',
                  color: view === id ? ACCENT : 'rgba(255,255,255,0.7)',
                  fontFamily: 'Lato, sans-serif',
                }}>
                <Icon size={12} strokeWidth={2.5} />{label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Workload ── */}
          {view === 'workload' && (
            <div className="px-5 py-4 space-y-3">
              <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                Periods/week per teacher across all classes. Threshold: {OVERLOAD_THRESHOLD}+ = overloaded.
              </p>
              {sorted.map(([name, data]) => {
                const isOver = data.count >= OVERLOAD_THRESHOLD
                const pct    = Math.round((data.count / maxLoad) * 100)
                const barColor = isOver ? '#DC2626' : data.count >= 15 ? '#D97706' : '#16A34A'
                return (
                  <div key={name} className="rounded-xl p-3"
                    style={{ background: isOver ? '#FFF1F2' : '#F8FAFC', border: `1px solid ${isOver ? '#FECACA' : '#EEF0F3'}` }}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-black truncate" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>
                        {name}
                      </p>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        {isOver && <AlertTriangle size={11} color="#DC2626" strokeWidth={2.5} />}
                        <span className="text-[11px] font-black" style={{ color: barColor, fontFamily: 'Lato, sans-serif' }}>
                          {data.count} periods
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#E2E8F0' }}>
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: barColor }} />
                    </div>
                    <p className="text-[10px] font-semibold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {[...data.classes].join(', ')}
                    </p>
                  </div>
                )
              })}
              {sorted.length === 0 && (
                <p className="text-sm font-bold text-[#9CA3AF] text-center py-8" style={{ fontFamily: 'Lato, sans-serif' }}>
                  No teachers assigned yet.
                </p>
              )}
            </div>
          )}

          {/* ── Absence ── */}
          {view === 'absence' && (
            <div className="px-5 py-4 space-y-3">
              <div className="px-4 py-3 rounded-xl text-[11px] font-bold"
                style={{ background: '#FFFBEB', color: '#92400E', fontFamily: 'Lato, sans-serif', border: '1px solid #FDE68A' }}>
                Mark teachers as absent. Their assigned periods will be highlighted in yellow across all classes.
              </div>
              {ALL_TEACHERS.map(t => {
                const isAbsent = absentTeachers.has(t.name)
                const periods  = workload[t.name]?.count ?? 0
                return (
                  <div key={t.name}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                    style={{ background: isAbsent ? '#FFFBEB' : '#F8FAFC', border: `1px solid ${isAbsent ? '#FDE68A' : '#EEF0F3'}` }}>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                      <img src={`https://randomuser.me/api/portraits/${t.gender}/${t.photoId % 100}.jpg`}
                        alt={t.name} className="w-full h-full object-cover"
                        onError={e => { e.target.style.display = 'none' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black truncate" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>{t.name}</p>
                      <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {periods} period{periods !== 1 ? 's' : ''} affected
                      </p>
                    </div>
                    <button onClick={() => onToggleAbsent(t.name)}
                      className="text-[11px] font-black px-3 py-1.5 rounded-lg flex-shrink-0"
                      style={{
                        background: isAbsent ? '#D97706' : '#F4F6F8',
                        color: isAbsent ? '#fff' : '#6B7280',
                        fontFamily: 'Lato, sans-serif',
                      }}>
                      {isAbsent ? 'Absent' : 'Present'}
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── History ── */}
          {view === 'history' && (
            <div className="px-5 py-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                  Recent changes ({history.length})
                </p>
                {history.length > 0 && (
                  <button onClick={onUndo}
                    className="flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(3,103,160,0.10)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                    <RotateCcw size={11} strokeWidth={2.5} /> Undo Last
                  </button>
                )}
              </div>
              {history.length === 0 && (
                <p className="text-sm font-bold text-[#9CA3AF] text-center py-8" style={{ fontFamily: 'Lato, sans-serif' }}>
                  No changes yet.
                </p>
              )}
              {[...history].reverse().map((h, i) => (
                <div key={i} className="flex items-start gap-3 px-3 py-2.5 rounded-xl"
                  style={{ background: i === 0 ? 'rgba(3,103,160,0.05)' : '#F8FAFC', border: `1px solid ${i === 0 ? 'rgba(3,103,160,0.15)' : '#EEF0F3'}` }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: i === 0 ? ACCENT : '#E2E8F0' }}>
                    <ClipboardList size={11} color={i === 0 ? '#fff' : '#9CA3AF'} strokeWidth={2.5} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>{h.label}</p>
                    <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{h.time}</p>
                  </div>
                  {i === 0 && (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{ background: 'rgba(3,103,160,0.10)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                      Latest
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function PrincipalTimetable() {
  const [selectedClass,  setSelectedClass]  = useState('Grade 7A')
  const [schedules,      setSchedules]      = useState(() => deepCloneSchedules())
  const [editingCell,    setEditingCell]    = useState(null)
  const [showEditor,     setShowEditor]     = useState(false)
  const [rightPanel,     setRightPanel]     = useState(null)   // 'workload'|'absence'|'history'|null
  const [rightView,      setRightView]      = useState('workload')
  const [absentTeachers, setAbsentTeachers] = useState(new Set())
  const [changeHistory,  setChangeHistory]  = useState([])     // [{label, snapshot, time}]
  const [dragSource,     setDragSource]     = useState(null)   // {rowIndex, dayKey}
  const [dragTarget,     setDragTarget]     = useState(null)   // {rowIndex, dayKey}
  const [lastSaved,      setLastSaved]      = useState(null)

  const schedule = schedules[selectedClass] ?? []

  const { conflictCells, conflictMessages } = useMemo(
    () => detectConflicts(schedules), [schedules]
  )
  const workload = useMemo(() => computeWorkload(schedules), [schedules])

  const classConflicts = [...conflictCells].filter(k => k.startsWith(selectedClass + ':')).length
  const overloadedCount = Object.values(workload).filter(w => w.count >= 20).length

  // ── History helpers ──────────────────────────────────────────────────────
  function pushHistory(label, snapshot) {
    const time = new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' })
    setChangeHistory(prev => [...prev.slice(-19), { label, snapshot, time }])
  }

  function undo() {
    if (changeHistory.length === 0) return
    const last = changeHistory[changeHistory.length - 1]
    setSchedules(last.snapshot)
    setChangeHistory(prev => prev.slice(0, -1))
    setLastSaved(null)
  }

  // ── Save cell change ─────────────────────────────────────────────────────
  function handleSaveCell(rowIndex, dayKey, newEntry) {
    const dayLabel = DAYS.find(d => d.key === dayKey)?.label ?? dayKey
    const period   = schedule[rowIndex]?.period ?? 'slot'
    const label    = `${selectedClass} · ${period} ${dayLabel} → ${newEntry.subject} (${newEntry.teacher?.short ?? 'Unassigned'})`
    pushHistory(label, schedules)
    setSchedules(prev => {
      const rows = [...prev[selectedClass]]
      rows[rowIndex] = { ...rows[rowIndex], [dayKey]: newEntry }
      return { ...prev, [selectedClass]: rows }
    })
    setLastSaved(`${period} · ${dayLabel}`)
    setEditingCell(null)
  }

  // ── Editor save ───────────────────────────────────────────────────────────
  function handleEditorSave(rowIndex, dayKey, newEntry) {
    const dayLabel = DAYS.find(d => d.key === dayKey)?.label ?? dayKey
    const period   = schedule[rowIndex]?.period ?? 'slot'
    pushHistory(`${selectedClass} · ${period} ${dayLabel} → ${newEntry.subject}`, schedules)
    setSchedules(prev => {
      const rows = [...(prev[selectedClass] ?? [])]
      if (rows[rowIndex]) rows[rowIndex] = { ...rows[rowIndex], [dayKey]: newEntry }
      return { ...prev, [selectedClass]: rows }
    })
    setLastSaved(`${period} · ${dayLabel}`)
  }

  // ── Drag & Drop ───────────────────────────────────────────────────────────
  function handleDrop(targetRowIndex, targetDayKey) {
    if (!dragSource) return
    const { rowIndex: srcRow, dayKey: srcDay } = dragSource
    if (srcRow === targetRowIndex && srcDay === targetDayKey) { setDragSource(null); setDragTarget(null); return }

    const srcEntry  = schedule[srcRow]?.[srcDay]
    const tgtEntry  = schedule[targetRowIndex]?.[targetDayKey]
    const dayA = DAYS.find(d => d.key === srcDay)?.label ?? srcDay
    const dayB = DAYS.find(d => d.key === targetDayKey)?.label ?? targetDayKey
    const label = `Swapped ${schedule[srcRow]?.period} ${dayA} ↔ ${schedule[targetRowIndex]?.period} ${dayB}`

    pushHistory(label, schedules)
    setSchedules(prev => {
      const rows = [...prev[selectedClass]]
      rows[srcRow]         = { ...rows[srcRow],         [srcDay]:        tgtEntry }
      rows[targetRowIndex] = { ...rows[targetRowIndex], [targetDayKey]:  srcEntry }
      return { ...prev, [selectedClass]: rows }
    })
    setLastSaved(label)
    setDragSource(null); setDragTarget(null)
  }

  // ── Absence toggle ────────────────────────────────────────────────────────
  function toggleAbsent(name) {
    setAbsentTeachers(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  function openRightPanel(view) {
    setRightView(view)
    setRightPanel(view)
    setShowEditor(false)
    setEditingCell(null)
  }

  return (
    <div className="space-y-5 max-w-[1200px]">

      {/* ── Top bar ── */}
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
          {/* Class selector */}
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>
              Select Class
            </label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-black outline-none"
              style={{ background: '#fff', border: `2px solid ${ACCENT}`, color: NAVY, fontFamily: 'Lato, sans-serif', minWidth: 150 }}>
              {CLASS_LIST.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 mt-4">
            {/* Undo */}
            <button onClick={undo} disabled={changeHistory.length === 0}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: changeHistory.length > 0 ? '#F4F6F8' : '#F8FAFC', border: '1px solid #EEF0F3' }}
              title={`Undo${changeHistory.length > 0 ? ': ' + changeHistory[changeHistory.length - 1]?.label : ''}`}>
              <RotateCcw size={15} strokeWidth={2.5} color={changeHistory.length > 0 ? '#374151' : '#C4CAD4'} />
            </button>

            {/* Workload */}
            <button onClick={() => openRightPanel('workload')}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: overloadedCount > 0 ? '#FFF1F2' : '#F4F6F8', border: `1px solid ${overloadedCount > 0 ? '#FECACA' : '#EEF0F3'}` }}
              title="Teacher workload">
              <BarChart2 size={15} strokeWidth={2.5} color={overloadedCount > 0 ? '#DC2626' : '#374151'} />
              {overloadedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: '#DC2626' }}>{overloadedCount}</span>
              )}
            </button>

            {/* Absence */}
            <button onClick={() => openRightPanel('absence')}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: absentTeachers.size > 0 ? '#FFFBEB' : '#F4F6F8', border: `1px solid ${absentTeachers.size > 0 ? '#FDE68A' : '#EEF0F3'}` }}
              title="Absence mode">
              <UserX size={15} strokeWidth={2.5} color={absentTeachers.size > 0 ? '#D97706' : '#374151'} />
              {absentTeachers.size > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: '#D97706' }}>{absentTeachers.size}</span>
              )}
            </button>

            {/* History */}
            <button onClick={() => openRightPanel('history')}
              className="w-9 h-9 rounded-xl flex items-center justify-center relative"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3' }}
              title="Change history">
              <ClipboardList size={15} strokeWidth={2.5} color="#374151" />
              {changeHistory.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                  style={{ background: ACCENT }}>{changeHistory.length}</span>
              )}
            </button>

            {/* Schedule Editor */}
            <button onClick={() => { setShowEditor(true); setEditingCell(null); setRightPanel(null) }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black"
              style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif', boxShadow: '0 2px 8px rgba(3,103,160,0.25)' }}>
              <CalendarDays size={14} strokeWidth={2.5} /> Edit Schedule
            </button>

            {/* Export */}
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black"
              style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3' }}>
              <Download size={14} strokeWidth={2.5} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* ── Conflict banner ── */}
      {classConflicts > 0 && (
        <div className="flex items-center gap-3 px-5 py-3 rounded-xl"
          style={{ background: '#FFF1F2', border: '1px solid #FECACA' }}>
          <AlertTriangle size={16} color="#DC2626" strokeWidth={2.5} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-black" style={{ color: '#991B1B', fontFamily: 'Lato, sans-serif' }}>
              {classConflicts} scheduling conflict{classConflicts > 1 ? 's' : ''} detected in {selectedClass}
            </p>
            <p className="text-xs font-bold" style={{ color: '#DC2626', fontFamily: 'Lato, sans-serif' }}>
              A teacher or room is double-booked. Cells are marked in red — click to resolve.
            </p>
          </div>
          <button onClick={() => openRightPanel('workload')}
            className="flex items-center gap-1 text-xs font-black flex-shrink-0"
            style={{ color: '#DC2626', fontFamily: 'Lato, sans-serif' }}>
            View <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {/* ── Info bar ── */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl flex-wrap"
        style={{ background: 'rgba(3,103,160,0.06)', border: '1px solid rgba(3,103,160,0.15)' }}>
        <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
        <p className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>
          {selectedClass} — Weekly Class Schedule
        </p>
        <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
          · Click to edit · Drag cells to swap · Hover photo for name
        </span>
        {lastSaved && (
          <span className="ml-auto flex items-center gap-1 text-[11px] font-black px-2.5 py-1 rounded-full"
            style={{ background: '#DCFCE7', color: '#15803D', fontFamily: 'Lato, sans-serif' }}>
            <Check size={10} strokeWidth={3} /> Updated: {lastSaved}
          </span>
        )}
      </div>

      {/* ── Schedule grid ── */}
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
                          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 14, color: NAVY, lineHeight: 1.2 }}>{row.period}</p>
                          <p style={{ fontFamily: 'Lato, sans-serif', fontWeight: 800, fontSize: 12, color: NAVY, marginTop: 2 }}>{row.time}</p>
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
                      : DAYS.map(d => {
                          const entry          = row[d.key]
                          const cellKey        = `${selectedClass}:${d.key}:${i}`
                          const isConflict     = conflictCells.has(cellKey)
                          const conflictMsg    = conflictMessages[cellKey]
                          const isAbsent       = entry?.teacher?.name ? absentTeachers.has(entry.teacher.name) : false
                          const isSrc          = dragSource?.rowIndex === i && dragSource?.dayKey === d.key
                          const isTgt          = dragTarget?.rowIndex === i && dragTarget?.dayKey === d.key
                          return (
                            <PeriodCell
                              key={d.key}
                              entry={entry}
                              isToday={d.key === todayKey}
                              rowIndex={i}
                              dayKey={d.key}
                              isConflict={isConflict}
                              conflictMsg={conflictMsg}
                              isAbsentTeacher={isAbsent}
                              isDragSource={isSrc}
                              isDragTarget={isTgt}
                              onClick={() => { setEditingCell({ rowIndex: i, dayKey: d.key, entry, period: row.period, time: row.time }); setShowEditor(false); setRightPanel(null) }}
                              onDragStart={() => setDragSource({ rowIndex: i, dayKey: d.key })}
                              onDragOver={() => setDragTarget({ rowIndex: i, dayKey: d.key })}
                              onDragLeave={() => setDragTarget(null)}
                              onDrop={() => handleDrop(i, d.key)}
                              onDragEnd={() => { setDragSource(null); setDragTarget(null) }}
                            />
                          )
                        })
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Subject legend ── */}
      <div className="bg-white rounded-2xl p-4 flex flex-wrap items-center gap-2"
        style={{ border: '1px solid #EEF0F3' }}>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mr-1" style={{ fontFamily: 'Lato, sans-serif' }}>
          Subjects:
        </span>
        {Object.entries(subjectColors)
          .filter(([s]) => schedule.some(row => !row.isBreak && DAYS.some(d => row[d.key]?.subject === s)))
          .map(([subj, sc]) => (
            <span key={subj} className="text-[10px] font-black px-2.5 py-1 rounded-full"
              style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>{subj}</span>
          ))}
      </div>

      {/* ── Legend row ── */}
      <div className="flex flex-wrap items-center gap-4 px-2">
        {[
          { color: '#DCFCE7', border: '#86EFAC', label: "Today's active session" },
          { color: '#FEE2E2', border: '#FECACA', label: 'No teacher assigned (today)' },
          { color: '#FFF1F2', border: '#FECACA', label: 'Scheduling conflict' },
          { color: '#FFFBEB', border: '#FDE68A', label: 'Teacher absent' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded" style={{ background: item.color, border: `1px solid ${item.border}` }} />
            <span className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{item.label}</span>
          </div>
        ))}
        <span className="text-[10px] font-bold text-[#B0B7C3] ml-auto" style={{ fontFamily: 'Lato, sans-serif' }}>
          Drag cells to swap slots · Click to edit
        </span>
      </div>

      {/* ── Modals / Panels ── */}
      {editingCell && (
        <EditCellModal
          cell={editingCell}
          className={selectedClass}
          schedules={schedules}
          absentTeachers={absentTeachers}
          conflictMessages={conflictMessages}
          onSave={handleSaveCell}
          onClose={() => setEditingCell(null)}
        />
      )}
      {showEditor && (
        <ScheduleEditorPanel
          className={selectedClass}
          schedule={schedule}
          schedules={schedules}
          absentTeachers={absentTeachers}
          onSave={handleEditorSave}
          onClose={() => setShowEditor(false)}
        />
      )}
      {rightPanel && (
        <RightPanel
          view={rightView}
          setView={setRightView}
          workload={workload}
          absentTeachers={absentTeachers}
          onToggleAbsent={toggleAbsent}
          history={changeHistory}
          onUndo={undo}
          onClose={() => setRightPanel(null)}
        />
      )}
    </div>
  )
}
