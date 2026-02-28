import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react'
import { children, childFees } from '../../data/parentData'

const ACCENT = '#C084FC'

export default function ParentFees({ selectedChild, setSelectedChild, setActivePage }) {
  const child = children.find(c => c.id === selectedChild) || children[0]
  const fees = childFees[child.id]
  const paidPct = Math.round((fees.paid / fees.total) * 100)

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
            {c.balance > 0 && (
              <span className="text-[10px] font-black px-1 rounded" style={{ background: 'rgba(166,0,3,0.15)', color: '#A60003' }}>!</span>
            )}
          </button>
        ))}
      </div>

      {/* Header card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
        <div className="px-6 py-4 flex items-center gap-3" style={{ background: '#002333' }}>
          <img src={`https://randomuser.me/api/portraits/${child.gender}/${child.photoId}.jpg`}
            alt={child.name} className="rounded-full" style={{ width: 44, height: 44, border: `2px solid ${ACCENT}` }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="flex-1">
            <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{child.name}</p>
            <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Roboto, sans-serif' }}>
              {fees.label}
            </p>
          </div>
          {fees.outstanding > 0 ? (
            <div className="text-right">
              <p className="text-xl font-black text-[#FF6B6B]" style={{ fontFamily: 'Sora, sans-serif' }}>${fees.outstanding}</p>
              <p className="text-[10px] text-white/50">Outstanding</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <CheckCircle size={18} color="#48D08C" strokeWidth={2.5} />
              <p className="text-sm font-black text-[#48D08C]">All Paid</p>
            </div>
          )}
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 divide-x" style={{ background: '#F9FAFB', divideColor: '#EEF0F3' }}>
          {[
            { label: 'Total Fee', value: `$${fees.total}`, color: '#002333' },
            { label: 'Amount Paid', value: `$${fees.paid}`, color: '#059669' },
            { label: 'Outstanding', value: `$${fees.outstanding}`, color: fees.outstanding > 0 ? '#A60003' : '#059669' },
          ].map((item, i) => (
            <div key={i} className="px-5 py-4 text-center" style={{ borderRight: i < 2 ? '1px solid #EEF0F3' : 'none' }}>
              <p className="text-xl font-black" style={{ color: item.color, fontFamily: 'Sora, sans-serif' }}>{item.value}</p>
              <p className="text-[10px] font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>Payment Progress</span>
            <span className="text-xs font-black" style={{ color: ACCENT }}>{paidPct}%</span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: '#F4F6F8' }}>
            <div className="h-full rounded-full transition-all"
              style={{ width: `${paidPct}%`, background: fees.outstanding === 0 ? '#48D08C' : ACCENT }} />
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Due date: {fees.dueDate}
          </p>
        </div>
      </div>

      {/* Fee breakdown */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-5 py-3.5" style={{ background: '#F4F6F8', borderBottom: '1px solid #EEF0F3' }}>
          <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Fee Breakdown</p>
        </div>
        <div className="divide-y" style={{ divideColor: '#F4F6F8' }}>
          {fees.breakdown.map((item, i) => {
            const itemPct = Math.round((item.paid / item.amount) * 100)
            const outstanding = item.amount - item.paid
            return (
              <div key={i} className="px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{item.item}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#9CA3AF]">${item.paid} / ${item.amount}</span>
                    {outstanding > 0
                      ? <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: 'rgba(166,0,3,0.10)', color: '#A60003' }}>
                          ${outstanding} due
                        </span>
                      : <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background: 'rgba(72,208,140,0.10)', color: '#059669' }}>
                          Paid ✓
                        </span>
                    }
                  </div>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#F4F6F8' }}>
                  <div className="h-full rounded-full" style={{ width: `${itemPct}%`, background: outstanding === 0 ? '#48D08C' : ACCENT }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {fees.outstanding > 0 && (
        <div className="flex items-center justify-between p-4 rounded-xl"
          style={{ background: 'rgba(166,0,3,0.06)', border: '1px solid rgba(166,0,3,0.15)' }}>
          <div className="flex items-center gap-3">
            <AlertCircle size={18} color="#A60003" strokeWidth={2.5} />
            <div>
              <p className="text-sm font-black text-[#A60003]" style={{ fontFamily: 'Sora, sans-serif' }}>Payment Required</p>
              <p className="text-xs text-[#6B7280]">${fees.outstanding} outstanding — due {fees.dueDate}</p>
            </div>
          </div>
          <button onClick={() => setActivePage('payments')}
            className="px-4 py-2 rounded-xl text-sm font-black text-white hover:opacity-90 transition-opacity"
            style={{ background: '#A60003', fontFamily: 'Roboto, sans-serif' }}>
            Pay Now
          </button>
        </div>
      )}
    </div>
  )
}
