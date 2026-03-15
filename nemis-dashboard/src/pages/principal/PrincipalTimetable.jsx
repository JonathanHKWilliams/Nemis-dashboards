import { useState } from 'react'
import { Clock, Download } from 'lucide-react'
import { classTimetables } from '../../data/principalData'

const ACCENT = '#0367A0'

const DAYS = [
  { key: 'mon', label: 'Monday' },
  { key: 'tue', label: 'Tuesday' },
  { key: 'wed', label: 'Wednesday' },
  { key: 'thu', label: 'Thursday' },
  { key: 'fri', label: 'Friday' },
]

const CLASS_LIST = [
  'Grade 1A','Grade 1B','Grade 2A','Grade 3A','Grade 3B',
  'Grade 4A','Grade 4B','Grade 5A','Grade 5B',
  'Grade 6A','Grade 6B','Grade 7A','Grade 7B',
  'Grade 8A','Grade 8B','Grade 9','Grade 10','Grade 11','Grade 12',
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

function TeacherAvatar({ teacher }) {
  const [hover, setHover] = useState(false)
  if (!teacher) return null
  const initials = teacher.name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
  return (
    <div className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div className="w-7 h-7 rounded-full flex-shrink-0 overflow-hidden" style={{ border: '2px solid rgba(255,255,255,0.80)', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
        <img
          src={`https://randomuser.me/api/portraits/${teacher.gender}/${teacher.photoId % 100}.jpg`}
          alt={teacher.name}
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        <div className="w-full h-full items-center justify-center text-white font-black text-[9px] absolute inset-0"
          style={{ background: ACCENT, display: 'none', fontFamily: 'Sora, sans-serif' }}>
          {initials}
        </div>
      </div>
      {hover && (
        <div className="absolute bottom-full left-1/2 z-50 mb-1.5 px-2.5 py-1.5 rounded-lg whitespace-nowrap pointer-events-none"
          style={{ transform: 'translateX(-50%)', background: '#002333', boxShadow: '0 4px 12px rgba(0,0,0,0.25)' }}>
          <p className="text-[11px] font-black text-white" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.name}</p>
          <div className="absolute top-full left-1/2 w-0 h-0"
            style={{ transform: 'translateX(-50%)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid #002333' }} />
        </div>
      )}
    </div>
  )
}

function PeriodCell({ entry }) {
  if (!entry) return (
    <td style={{ border: '1px solid #E2E8F0', padding: '10px 12px', textAlign: 'center', fontFamily: 'Lato, sans-serif', fontSize: 14, fontWeight: 700, color: '#C4CAD4', background: '#fff' }}>
      —
    </td>
  )
  return (
    <td style={{ border: '1px solid #E2E8F0', padding: '10px 12px', background: '#fff', verticalAlign: 'top' }}>
      <p className="text-sm font-black leading-snug text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
        {entry.subject}
      </p>
      <div className="flex items-center justify-between gap-2 mt-1.5">
        <p className="text-[11px] font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>
          Rm {entry.room}
        </p>
        <TeacherAvatar teacher={entry.teacher} />
      </div>
      <p className="text-[10px] font-bold text-[#6B7280] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
        {entry.teacher?.short}
      </p>
    </td>
  )
}

export default function PrincipalTimetable() {
  const [selectedClass, setSelectedClass] = useState('Grade 7A')

  const schedule = classTimetables[selectedClass] || []

  return (
    <div className="space-y-5 max-w-[1200px]">

      {/* Academic year + class filter */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Academic Year 2025–2026
          </h2>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
            1st Semester · School Timetable
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Class filter */}
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>
              Select Class
            </label>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              className="px-4 py-2.5 rounded-xl text-sm font-black outline-none"
              style={{ background: '#fff', border: `2px solid ${ACCENT}`, color: '#002333', fontFamily: 'Lato, sans-serif', minWidth: 150 }}>
              {CLASS_LIST.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="mt-4">
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black"
              style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3' }}>
              <Download size={14} strokeWidth={2.5} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* Class info badge */}
      <div className="flex items-center gap-3 px-5 py-3 rounded-xl"
        style={{ background: `rgba(3,103,160,0.06)`, border: `1px solid rgba(3,103,160,0.15)` }}>
        <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
        <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
          {selectedClass} — Weekly Schedule
        </p>
        <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
          · Hover teacher photo to see name
        </span>
      </div>

      {/* Timetable Grid */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ minWidth: 900, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                <th className="text-left px-4 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F172A] w-40"
                  style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #B0CCE8' }}>Period / Time</th>
                {DAYS.map(d => (
                  <th key={d.key} className="text-center px-3 py-3.5 text-xs font-black uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #B0CCE8' }}>{d.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => {
                const isBreak = !!row.isBreak
                return (
                  <tr key={i}>
                    <td className="px-4 py-3 w-40 flex-shrink-0"
                      style={{ border: '1px solid #E2E8F0', background: '#F4F6F8', verticalAlign: 'middle' }}>
                      <div className="flex items-center gap-2">
                        <Clock size={14} strokeWidth={2.5} style={{ color: isBreak ? '#C4CAD4' : ACCENT, flexShrink: 0 }} />
                        <div>
                          <p className="text-sm font-black leading-snug"
                            style={{ fontFamily: 'Lato, sans-serif', color: isBreak ? '#9CA3AF' : '#002333' }}>
                            {row.period}
                          </p>
                          <p className="text-[11px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                            {row.time}
                          </p>
                        </div>
                      </div>
                    </td>
                    {isBreak
                      ? DAYS.map(d => (
                          <td key={d.key} style={{ border: '1px solid #E2E8F0', padding: '10px 12px', textAlign: 'center', background: '#FAFBFC' }}>
                            <span className="text-xs font-black text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                              {row.period}
                            </span>
                          </td>
                        ))
                      : DAYS.map(d => <PeriodCell key={d.key} entry={row[d.key]} />)
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Subject Legend */}
      <div className="bg-white rounded-2xl p-4 flex flex-wrap items-center gap-2"
        style={{ border: '1px solid #EEF0F3' }}>
        <span className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mr-1" style={{ fontFamily: 'Lato, sans-serif' }}>
          Subjects:
        </span>
        {Object.entries(subjectColors).filter(([s]) =>
          schedule.some(row => !row.isBreak && DAYS.some(d => row[d.key]?.subject === s))
        ).map(([subj, sc]) => (
          <span key={subj} className="text-[10px] font-black px-2.5 py-1 rounded-full"
            style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
            {subj}
          </span>
        ))}
      </div>

      <p className="text-xs font-bold text-[#9CA3AF] text-center" style={{ fontFamily: 'Lato, sans-serif' }}>
        Last updated: Mar 8, 2026 · Room assignments subject to availability.
      </p>
    </div>
  )
}
