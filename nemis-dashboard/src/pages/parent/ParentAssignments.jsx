import { useState } from 'react'
import { X, MessageSquare } from 'lucide-react'
import { children, childAssignments } from '../../data/parentData'

const ACCENT = '#C084FC'

const STATUS_STYLE = {
  Pending:   { bg: 'rgba(245,158,11,0.12)',  color: '#B45309'  },
  Submitted: { bg: 'rgba(96,165,250,0.12)',  color: '#1D4ED8'  },
  Graded:    { bg: 'rgba(72,208,140,0.12)',  color: '#059669'  },
}

export default function ParentAssignments({ selectedChild, setSelectedChild }) {
  const [detail, setDetail] = useState(null)
  const child = children.find(c => c.id === selectedChild) || children[0]
  const assignments = childAssignments[child.id] || []

  if (detail) {
    return (
      <div className="space-y-5">
        <button onClick={() => setDetail(null)}
          className="flex items-center gap-2 text-sm font-bold text-[#6B7280] hover:text-[#002333] transition-colors">
          ← Back to Assignments
        </button>
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-6 py-4 flex items-start justify-between" style={{ background: '#002333' }}>
            <div>
              <p className="text-base font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{detail.title}</p>
              <p className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif' }}>
                {detail.subject} · Due: {detail.dueDate}
              </p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0"
              style={{ background: STATUS_STYLE[detail.status]?.bg, color: STATUS_STYLE[detail.status]?.color }}>
              {detail.status}
            </span>
          </div>
          <div className="p-6 space-y-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#9CA3AF] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Assignment</p>
              <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{detail.title}</p>
              <p className="text-xs text-[#6B7280] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Subject: {detail.subject} &nbsp;·&nbsp; Due: {detail.dueDate}
              </p>
            </div>
            {(detail.status === 'Graded' || detail.status === 'Submitted') && detail.feedback ? (
              <div className="rounded-xl p-4" style={{ background: 'rgba(192,132,252,0.07)', border: '1px solid rgba(192,132,252,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={14} color={ACCENT} strokeWidth={2.5} />
                  <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Teacher Feedback</p>
                </div>
                <p className="text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>{detail.feedback}</p>
              </div>
            ) : (
              <div className="rounded-xl p-4" style={{ background: '#F4F6F8' }}>
                <p className="text-xs text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  {detail.status === 'Pending' ? 'Not yet submitted.' : 'No feedback provided yet.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

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

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total', value: assignments.length, color: '#002333' },
          { label: 'Pending', value: assignments.filter(a => a.status === 'Pending').length, color: '#B45309' },
          { label: 'Graded', value: assignments.filter(a => a.status === 'Graded').length, color: '#059669' },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 text-center" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <p className="text-xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
            <p className="text-[11px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Assignments table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-5 py-3.5" style={{ background: '#F4F6F8', borderBottom: '1px solid #EEF0F3' }}>
          <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            {child.name.split(' ')[0]}'s Assignments
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
                {['Title', 'Subject', 'Due Date', 'Status', ''].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignments.map(a => {
                const st = STATUS_STYLE[a.status]
                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid #F4F6F8' }}>
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.title}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.subject}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{a.dueDate}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs font-black px-2.5 py-1 rounded-full"
                        style={{ background: st?.bg, color: st?.color, fontFamily: 'Roboto, sans-serif' }}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <button onClick={() => setDetail(a)}
                        className="text-xs font-bold transition-colors hover:underline"
                        style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
              {assignments.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-xs text-[#9CA3AF]">No assignments recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
