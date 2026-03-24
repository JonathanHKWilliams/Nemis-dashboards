import { useState, useEffect } from 'react'
import { Search, DollarSign, TrendingUp, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { feeRecords, financialSummary } from '../../data/principalData'

const ACCENT    = '#0367A0'
const PAGE_SIZE = 15

const feeStatusCfg = {
  Paid:    { bg: '#0367A0', color: '#fff' },
  Partial: { bg: '#D97706', color: '#fff' },
  Unpaid:  { bg: '#A60003', color: '#fff' },
}

function Avatar({ name, gender, photoId, size = 36 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender}/${photoId % 100}.jpg`}
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

export default function PrincipalFinance() {
  const [search, setSearch]           = useState('')
  const [statusFilter, setStatus]     = useState('All')
  const [classFilter, setClassFilter] = useState('All')
  const [page, setPage]               = useState(1)

  useEffect(() => { setPage(1) }, [search, statusFilter, classFilter])

  const classNames = ['All', ...Array.from(new Set(feeRecords.map(r => r.class))).sort()]

  const filtered = feeRecords.filter(r => {
    const q = search.toLowerCase()
    return (
      (r.name.toLowerCase().includes(q) || r.studentId.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || r.status === statusFilter) &&
      (classFilter === 'All' || r.class === classFilter)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="flex gap-5 max-w-[1280px]">

      {/* ── Filter Sidebar ── */}
      <div className="w-52 flex-shrink-0 space-y-4 self-start sticky top-0">
        <div className="bg-white rounded-2xl p-4 space-y-4" style={{ border: '1px solid #EEF0F3' }}>
          <p className="text-xs font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</p>

          {/* Search */}
          <div className="relative">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
            <input type="text" placeholder="Search student…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>

          {/* Class */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Class</p>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
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

          {/* Status */}
          <div>
            <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Payment Status</p>
            <div className="space-y-0.5">
              {['All', 'Paid', 'Partial', 'Unpaid'].map(s => (
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

          <div className="pt-2 text-[10px] font-semibold text-[#9CA3AF]" style={{ borderTop: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} records
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Expected',      value: `$${financialSummary.totalExpected.toLocaleString()}`,  icon: DollarSign,  color: '#002333' },
            { label: 'Total Collected',     value: `$${financialSummary.totalCollected.toLocaleString()}`, icon: TrendingUp,  color: ACCENT },
            { label: 'Outstanding Balance', value: `$${financialSummary.outstanding.toLocaleString()}`,    icon: AlertCircle, color: '#A60003' },
          ].map(c => {
            const Icon = c.icon
            return (
              <div key={c.label} className="rounded-2xl p-5 flex items-start gap-4"
                style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${c.color}14` }}>
                  <Icon size={20} style={{ color: c.color }} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
                  <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{c.label}</p>
                  {c.label === 'Total Collected' && (
                    <p className="text-[11px] font-semibold mt-1" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                      {financialSummary.collectionRate}% collection rate
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Fee Status Breakdown */}
        <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Fee Payment Status Overview</h3>
          <div className="grid grid-cols-3 gap-6">
            {[
              { label: 'Paid',    count: feeRecords.filter(r => r.status === 'Paid').length,    color: '#0367A0' },
              { label: 'Partial', count: feeRecords.filter(r => r.status === 'Partial').length, color: '#D97706' },
              { label: 'Unpaid',  count: feeRecords.filter(r => r.status === 'Unpaid').length,  color: '#A60003' },
            ].map(s => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</span>
                  <span className="text-sm font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.count} students</span>
                </div>
                <div className="h-2.5 rounded-full w-full" style={{ background: '#EEF0F3' }}>
                  <div className="h-full rounded-full" style={{ width: `${(s.count / feeRecords.length) * 100}%`, background: s.color }} />
                </div>
                <p className="text-[10px] font-semibold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                  {((s.count / feeRecords.length) * 100).toFixed(0)}% of students
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #F4F6F8' }}>
            <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
              Overall collection rate for 1st Semester · Academic Year 2025–2026
            </p>
            <p className="text-xl font-black" style={{ color: ACCENT, fontFamily: 'Sora, sans-serif' }}>
              {financialSummary.collectionRate}%
            </p>
          </div>
        </div>

        {/* Fee Ledger Table */}
        <div className="bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3' }}>
          <div className="px-5 py-4" style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Fee Ledger</h3>
          </div>

          <table className="w-full">
            <thead>
              <tr style={{ background: '#BFD9F2' }}>
                {['Student', 'Class', 'Fee Amount', 'Amount Paid', 'Balance', 'Status', 'Payment Date'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-sm font-semibold text-[#9CA3AF]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>
                    No fee records match the selected filters.
                  </td>
                </tr>
              ) : paginated.map((r, i) => {
                const sc = feeStatusCfg[r.status]
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
                    <td className="px-5 py-3 text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>${r.feeAmount}</td>
                    <td className="px-5 py-3 text-sm font-black" style={{ color: '#16A34A', fontFamily: 'Sora, sans-serif' }}>${r.amountPaid}</td>
                    <td className="px-5 py-3 text-sm font-black" style={{ color: r.balance > 0 ? '#A60003' : '#16A34A', fontFamily: 'Sora, sans-serif' }}>${r.balance}</td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: sc.bg, color: sc.color, fontFamily: 'Lato, sans-serif' }}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.paymentDate}</td>
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
                className="w-8 h-8 rounded-lg flex items-center justify-center"
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
                  <span key={`e${i}`} className="text-xs text-[#9CA3AF] px-1">…</span>
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
                className="w-8 h-8 rounded-lg flex items-center justify-center"
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
