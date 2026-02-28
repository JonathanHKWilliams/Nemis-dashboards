import { children, childAttendance } from '../../data/parentData'

const ACCENT = '#C084FC'

const STATUS_STYLE = {
  Present: { bg: 'rgba(72,208,140,0.12)', color: '#059669' },
  Absent:  { bg: 'rgba(166,0,3,0.10)',    color: '#A60003' },
  Late:    { bg: 'rgba(245,158,11,0.12)', color: '#B45309' },
}

export default function ParentAttendance({ selectedChild, setSelectedChild }) {
  const child = children.find(c => c.id === selectedChild) || children[0]
  const data = childAttendance[child.id]
  const records = data?.records || []

  const present  = records.filter(r => r.status === 'Present').length
  const absent   = records.filter(r => r.status === 'Absent').length
  const late     = records.filter(r => r.status === 'Late').length
  const total    = records.length
  const rate     = total ? Math.round((present / total) * 100) : 0

  return (
    <div className="space-y-5">
      {/* Child tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {children.map(c => (
          <button key={c.id} onClick={() => setSelectedChild(c.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 transition-all"
            style={{
              background: selectedChild === c.id ? '#002333' : '#fff',
              border: `1.5px solid ${selectedChild === c.id ? ACCENT : '#EEF0F3'}`,
            }}>
            <img src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
              alt={c.name} className="rounded-full" style={{ width: 22, height: 22 }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <span className="text-xs font-bold whitespace-nowrap"
              style={{ color: selectedChild === c.id ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
              {c.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Summary banner */}
      <div className="rounded-xl p-5" style={{ background: '#002333' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
              {child.name.split(' ')[0]}'s Attendance
            </p>
            <p className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Roboto, sans-serif' }}>
              {child.school}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black" style={{ color: ACCENT, fontFamily: 'Sora, sans-serif' }}>{rate}%</p>
            <p className="text-[10px] font-semibold text-white/50">Attendance rate</p>
          </div>
        </div>
        <div className="h-2 rounded-full overflow-hidden mb-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <div className="h-full rounded-full" style={{ width: `${rate}%`, background: rate >= 90 ? '#48D08C' : ACCENT }} />
        </div>
        <div className="flex gap-6">
          {[{ label: 'Present', value: present, color: '#48D08C' }, { label: 'Absent', value: absent, color: '#FF6B6B' }, { label: 'Late', value: late, color: '#F59E0B' }].map(s => (
            <div key={s.label}>
              <p className="text-lg font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-[10px] font-semibold text-white/50" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary sentence */}
      <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(192,132,252,0.07)', border: '1px solid rgba(192,132,252,0.18)' }}>
        <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {data?.summary}
        </p>
      </div>

      {/* Records table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-5 py-3.5" style={{ background: '#F4F6F8', borderBottom: '1px solid #EEF0F3' }}>
          <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Attendance Records — February 2026
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
                {['Date', 'Status', 'Note'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r, i) => {
                const st = STATUS_STYLE[r.status] || STATUS_STYLE.Present
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #F4F6F8' }}>
                    <td className="px-5 py-3">
                      <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.date}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full"
                        style={{ background: st.bg, color: st.color, fontFamily: 'Roboto, sans-serif' }}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {r.note || '—'}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {records.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-xs text-[#9CA3AF]">No attendance records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
