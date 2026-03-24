import { useState, useEffect, useMemo } from 'react'
import { Search, ChevronLeft, ChevronRight, AlertTriangle, X } from 'lucide-react'
import { attendanceRecords } from '../../data/principalData'
import { principalStudents } from '../../data/principalData'

const ACCENT   = '#0367A0'
const NAVY     = '#002333'
const PAGE_SIZE = 15

const statusCfg = {
  Present: { bg: '#0367A014', color: ACCENT },
  Absent:  { bg: '#A6000314', color: '#A60003' },
  Late:    { bg: '#D9770614', color: '#D97706' },
}

/* ── Generate yearly attendance data from principalStudents ── */
const SEMESTER_DAYS = 90  // school days per semester
const PERIODS       = 6   // periods per semester

function buildYearlyRecord(s) {
  const rate1 = Math.min(100, Math.max(50, s.attendance + (s.id % 7) - 3))
  const rate2 = Math.min(100, Math.max(50, s.attendance - (s.id % 5) + 2))

  const present1 = Math.round(rate1 / 100 * SEMESTER_DAYS)
  const late1    = Math.round((100 - rate1) / 100 * SEMESTER_DAYS * 0.3)
  const absent1  = SEMESTER_DAYS - present1 - late1

  const present2 = Math.round(rate2 / 100 * SEMESTER_DAYS)
  const late2    = Math.round((100 - rate2) / 100 * SEMESTER_DAYS * 0.3)
  const absent2  = SEMESTER_DAYS - present2 - late2

  const totalDays    = SEMESTER_DAYS * 2
  const totalPresent = present1 + present2
  const totalAbsent  = absent1 + absent2
  const totalLate    = late1 + late2
  const overallRate  = Math.round((totalPresent / totalDays) * 100)

  const periods = Array.from({ length: PERIODS }, (_, i) => {
    const pRate = Math.min(100, Math.max(55, rate1 + (i % 3) * 2 - 2))
    const pDays = Math.round(SEMESTER_DAYS / PERIODS)
    const pPresent = Math.round(pRate / 100 * pDays)
    return { label: `P${i + 1}`, rate: pRate, present: pPresent, absent: pDays - pPresent, days: pDays }
  })

  return {
    ...s,
    sem1: { rate: rate1, present: present1, absent: absent1, late: late1 },
    sem2: { rate: rate2, present: present2, absent: absent2, late: late2 },
    overall: { rate: overallRate, present: totalPresent, absent: totalAbsent, late: totalLate, days: totalDays },
    periods,
  }
}

const yearlyRecords = principalStudents.map(buildYearlyRecord)

/* ── Helpers ── */
function Avatar({ name, gender, photoId, size = 36 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender === 'Female' ? 'women' : 'men'}/${photoId % 100}.jpg`}
        alt={name} className="rounded-full object-cover w-full h-full"
        style={{ border: '2px solid #EEF0F3' }}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div className="rounded-full w-full h-full items-center justify-center text-white font-black absolute inset-0"
        style={{ background: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: size * 0.3, display: 'none' }}>
        {initials}
      </div>
    </div>
  )
}

function RateBar({ value, size = 'md' }) {
  const color = value >= 90 ? ACCENT : value >= 75 ? '#D97706' : '#A60003'
  const h = size === 'sm' ? 4 : 6
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1" style={{ background: '#EEF0F3', height: h, minWidth: 60 }}>
        <div style={{ width: `${value}%`, height: '100%', background: color }} />
      </div>
      <span className="text-xs font-black flex-shrink-0" style={{ color, fontFamily: 'Lato, sans-serif', minWidth: 36 }}>{value}%</span>
    </div>
  )
}

/* ── Student Yearly Detail Panel ── */
function StudentYearlyDetail({ record, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="flex-1 bg-black/20" />
      <div className="w-[440px] h-full bg-white overflow-y-auto flex flex-col"
        style={{ boxShadow: '-8px 0 32px rgba(0,14,33,0.14)' }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="px-6 py-5 flex items-start justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
          <div className="flex items-center gap-3">
            <Avatar name={record.name} gender={record.gender} photoId={record.photoId} size={48} />
            <div>
              <p className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{record.name}</p>
              <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{record.class}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: '#EEF0F3', color: '#6B7280' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
            onMouseLeave={e => e.currentTarget.style.background = '#EEF0F3'}>
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex-1 p-6 space-y-5">

          {/* Overall rate */}
          <div className="grid grid-cols-3 gap-0" style={{ border: '1px solid #EEF0F3' }}>
            {[
              { label: 'Overall Rate', value: `${record.overall.rate}%`, color: record.overall.rate >= 85 ? ACCENT : '#A60003' },
              { label: 'Days Present', value: record.overall.present, color: NAVY },
              { label: 'Days Absent',  value: record.overall.absent,  color: '#A60003' },
            ].map(({ label, value, color }, i) => (
              <div key={label} className="px-4 py-4 text-center"
                style={{ borderRight: i < 2 ? '1px solid #EEF0F3' : 'none' }}>
                <p className="text-2xl font-black" style={{ color, fontFamily: 'Sora, sans-serif' }}>{value}</p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Semester comparison */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Semester Breakdown</p>
            <div className="space-y-0" style={{ border: '1px solid #EEF0F3' }}>
              {[
                { label: '1st Semester', data: record.sem1 },
                { label: '2nd Semester', data: record.sem2 },
              ].map(({ label, data }, i) => (
                <div key={label} className="px-4 py-3" style={{ borderBottom: i === 0 ? '1px solid #EEF0F3' : 'none' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      <span style={{ color: ACCENT }}>{data.present}P</span>
                      <span style={{ color: '#A60003' }}>{data.absent}A</span>
                      <span style={{ color: '#D97706' }}>{data.late}L</span>
                    </div>
                  </div>
                  <RateBar value={data.rate} />
                </div>
              ))}
            </div>
          </div>

          {/* Period breakdown */}
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Period-by-Period (1st Semester)</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  {['Period', 'Present', 'Absent', 'Rate'].map(h => (
                    <th key={h} className="text-left px-3 py-2 text-[10px] font-black uppercase tracking-wider"
                      style={{ border: '1px solid #E2E8F0', color: '#374151', fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {record.periods.map(p => (
                  <tr key={p.label}>
                    <td className="px-3 py-2 text-xs font-black" style={{ border: '1px solid #E2E8F0', color: NAVY, fontFamily: 'Lato, sans-serif' }}>{p.label}</td>
                    <td className="px-3 py-2 text-xs font-semibold" style={{ border: '1px solid #E2E8F0', color: ACCENT }}>{p.present}</td>
                    <td className="px-3 py-2 text-xs font-semibold" style={{ border: '1px solid #E2E8F0', color: '#A60003' }}>{p.absent}</td>
                    <td className="px-3 py-2" style={{ border: '1px solid #E2E8F0', minWidth: 120 }}><RateBar value={p.rate} size="sm" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Status note */}
          {record.overall.rate < 85 && (
            <div className="flex items-start gap-3 px-4 py-3" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <AlertTriangle size={15} strokeWidth={2.5} style={{ color: '#A60003', flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs font-black" style={{ color: '#A60003', fontFamily: 'Lato, sans-serif' }}>
                Below minimum attendance threshold (85%). Parent/guardian should be notified.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main Component ── */
const CLASSES = ['All', ...Array.from(new Set(principalStudents.map(s => s.class))).sort()]

export default function PrincipalAttendance() {
  const [tab,          setTab]        = useState('daily')
  const [search,       setSearch]     = useState('')
  const [classFilter,  setClass]      = useState('All')
  const [statusFilter, setStatus]     = useState('All')
  const [page,         setPage]       = useState(1)
  const [selected,     setSelected]   = useState(null)

  useEffect(() => { setPage(1) }, [search, classFilter, statusFilter, tab])

  /* ── Daily log ── */
  const dailyFiltered = useMemo(() => attendanceRecords.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.name.toLowerCase().includes(q) || r.studentId?.toLowerCase().includes(q)) &&
      (classFilter === 'All' || r.class === classFilter) &&
      (statusFilter === 'All' || r.status === statusFilter)
    )
  }), [search, classFilter, statusFilter])

  /* ── Yearly records ── */
  const yearlyFiltered = useMemo(() => yearlyRecords.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.name.toLowerCase().includes(q) || r.studentId.toLowerCase().includes(q)) &&
      (classFilter === 'All' || r.class === classFilter) &&
      (statusFilter === 'All' ||
        (statusFilter === 'Present' && r.overall.rate >= 90) ||
        (statusFilter === 'Late'    && r.overall.rate >= 75 && r.overall.rate < 90) ||
        (statusFilter === 'Absent'  && r.overall.rate < 75))
    )
  }), [search, classFilter, statusFilter])

  const activeList  = tab === 'daily' ? dailyFiltered : yearlyFiltered
  const totalPages  = Math.max(1, Math.ceil(activeList.length / PAGE_SIZE))
  const paginated   = activeList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  /* ── KPI ── */

  const selectedRecord = selected ? yearlyRecords.find(r => r.id === selected) : null

  return (
    <div className="space-y-5 max-w-[1280px]">

{/* ── Tab + Filter bar ── */}
      <div className="bg-white rounded-2xl px-5 py-4 space-y-3" style={{ border: '1px solid #EEF0F3' }}>

        {/* Tabs */}
        <div className="flex items-center gap-0" style={{ borderBottom: '1px solid #EEF0F3', paddingBottom: 12 }}>
          {[
            { id: 'daily',  label: 'Daily Log',       sub: `Today · ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` },
            { id: 'yearly', label: 'Yearly Records',  sub: 'Full school year · 2025–2026' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex flex-col items-start px-5 py-1.5 transition-all"
              style={{ borderBottom: tab === t.id ? `2px solid ${ACCENT}` : '2px solid transparent', marginBottom: -1 }}>
              <span className="text-sm font-black" style={{ color: tab === t.id ? ACCENT : '#6B7280', fontFamily: 'Sora, sans-serif' }}>{t.label}</span>
              <span className="text-[10px] font-semibold" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{t.sub}</span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-3">

          {/* Search */}
          <div className="flex flex-col gap-1 flex-shrink-0" style={{ width: 200 }}>
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Search</span>
            <div className="relative">
              <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
              <input type="text" placeholder="Student name, ID…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: NAVY }} />
            </div>
          </div>

          <div className="flex-shrink-0 hidden sm:block self-stretch w-px" style={{ background: '#EEF0F3' }} />

          {/* Class */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Class</span>
            <select value={classFilter} onChange={e => setClass(e.target.value)}
              className="text-xs outline-none rounded-xl px-3 py-2"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif',
                color: classFilter !== 'All' ? ACCENT : '#374151', fontWeight: 700, minWidth: 140 }}>
              {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex-shrink-0 hidden sm:block self-stretch w-px" style={{ background: '#EEF0F3' }} />

          {/* Status */}
          <div className="flex flex-col gap-1 flex-shrink-0">
            <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>
              {tab === 'daily' ? 'Status' : 'Rate Band'}
            </span>
            <div className="flex items-center gap-1">
              {(tab === 'daily'
                ? ['All', 'Present', 'Absent', 'Late']
                : ['All', 'Present', 'Late', 'Absent']
              ).map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className="px-3 py-1.5 rounded-lg text-xs transition-colors"
                  style={{
                    background: statusFilter === s ? 'rgba(3,103,160,0.10)' : 'transparent',
                    color: statusFilter === s ? ACCENT : '#374151',
                    fontFamily: 'Lato, sans-serif', fontWeight: statusFilter === s ? 800 : 600,
                    border: statusFilter === s ? '1px solid rgba(3,103,160,0.20)' : '1px solid #EEF0F3',
                  }}>
                  {tab === 'yearly' && s !== 'All'
                    ? s === 'Present' ? '90%+' : s === 'Late' ? '75–89%' : '<75%'
                    : s}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs font-bold text-[#9CA3AF] ml-auto mb-0.5 flex-shrink-0" style={{ fontFamily: 'Lato, sans-serif' }}>
            {activeList.length} {tab === 'daily' ? 'records' : 'students'}
          </p>
        </div>
      </div>

      {/* ── Daily Log Table ── */}
      {tab === 'daily' && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
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
                <tr><td colSpan={5} className="text-center py-10 text-sm font-semibold text-[#9CA3AF]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>No records match the selected filters.</td></tr>
              ) : paginated.map((r, i) => {
                const sc = statusCfg[r.status] || statusCfg.Present
                return (
                  <tr key={i} style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#EEF4FB'}
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
          <PaginationRow page={page} totalPages={totalPages} filtered={activeList} onPage={setPage} />
        </div>
      )}

      {/* ── Yearly Records Table ── */}
      {tab === 'yearly' && (
        <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['Student', 'Class', '1st Semester', '2nd Semester', 'Overall Rate', 'Present', 'Absent', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-sm font-semibold text-[#9CA3AF]"
                  style={{ fontFamily: 'Lato, sans-serif' }}>No students match the selected filters.</td></tr>
              ) : paginated.map((r, i) => (
                <tr key={r.id}
                  style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC', cursor: 'pointer' }}
                  onClick={() => setSelected(r.id)}
                  onMouseEnter={e => e.currentTarget.style.background = '#EEF4FB'}
                  onMouseLeave={e => { e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={r.name} gender={r.gender} photoId={r.photoId} />
                      <div>
                        <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.name}</p>
                        <p className="text-[11px] font-black font-mono" style={{ color: ACCENT, letterSpacing: '0.05em' }}>{r.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.class}</td>
                  <td className="px-5 py-3" style={{ minWidth: 130 }}><RateBar value={r.sem1.rate} /></td>
                  <td className="px-5 py-3" style={{ minWidth: 130 }}><RateBar value={r.sem2.rate} /></td>
                  <td className="px-5 py-3" style={{ minWidth: 140 }}><RateBar value={r.overall.rate} /></td>
                  <td className="px-5 py-3 text-sm font-black" style={{ color: ACCENT, fontFamily: 'Sora, sans-serif' }}>{r.overall.present}</td>
                  <td className="px-5 py-3 text-sm font-black" style={{ color: '#A60003', fontFamily: 'Sora, sans-serif' }}>{r.overall.absent}</td>
                  <td className="px-5 py-3">
                    {r.overall.rate < 85 && (
                      <AlertTriangle size={14} strokeWidth={2.5} style={{ color: '#A60003' }} title="Below 85% threshold" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationRow page={page} totalPages={totalPages} filtered={activeList} onPage={setPage} />
        </div>
      )}

      {/* Detail panel */}
      {selectedRecord && <StudentYearlyDetail record={selectedRecord} onClose={() => setSelected(null)} />}
    </div>
  )
}

function PaginationRow({ page, totalPages, filtered, onPage }) {
  return (
    <div className="flex items-center justify-between px-5 py-3" style={{ borderTop: '1px solid #F4F6F8', background: '#F8FAFC' }}>
      <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
        {filtered.length === 0 ? 'No records' : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
      </p>
      <div className="flex items-center gap-1.5">
        <button onClick={() => onPage(p => Math.max(1, p - 1))} disabled={page === 1}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: page === 1 ? '#F4F6F8' : '#EEF0F3', color: page === 1 ? '#C4C9D4' : '#374151' }}>
          <ChevronLeft size={14} strokeWidth={2.5} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
          .reduce((acc, p, idx, arr) => { if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…'); acc.push(p); return acc }, [])
          .map((p, i) => typeof p === 'string'
            ? <span key={`e${i}`} className="text-xs text-[#9CA3AF] px-1">…</span>
            : <button key={p} onClick={() => onPage(p)}
                className="w-8 h-8 rounded-lg text-xs font-black"
                style={{ background: page === p ? ACCENT : '#F4F6F8', color: page === p ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
                {p}
              </button>
          )}
        <button onClick={() => onPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: page === totalPages ? '#F4F6F8' : '#EEF0F3', color: page === totalPages ? '#C4C9D4' : '#374151' }}>
          <ChevronRight size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
