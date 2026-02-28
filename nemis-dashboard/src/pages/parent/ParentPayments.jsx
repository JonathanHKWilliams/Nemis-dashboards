import { useState } from 'react'
import { Smartphone, Building2, CreditCard, UploadCloud, CheckCircle } from 'lucide-react'
import { children, paymentHistory } from '../../data/parentData'

const ACCENT = '#C084FC'

const METHODS = [
  { id: 'mobile', label: 'Mobile Money', icon: Smartphone },
  { id: 'bank',   label: 'Bank Transfer', icon: Building2 },
  { id: 'card',   label: 'Card',          icon: CreditCard },
]

const STATUS_STYLE = {
  Confirmed: { bg: 'rgba(72,208,140,0.12)',  color: '#059669' },
  Pending:   { bg: 'rgba(96,165,250,0.12)',  color: '#1D4ED8' },
  Failed:    { bg: 'rgba(166,0,3,0.10)',     color: '#A60003' },
}

export default function ParentPayments() {
  const [selectedChildId, setSelectedChildId] = useState(children[0].id)
  const [amount, setAmount]     = useState('')
  const [method, setMethod]     = useState('mobile')
  const [success, setSuccess]   = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!amount || isNaN(amount) || Number(amount) <= 0) return
    setSuccess(true)
    setAmount('')
    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-5 py-3.5 flex items-center gap-2" style={{ background: '#002333' }}>
            <CreditCard size={15} color={ACCENT} strokeWidth={2.5} />
            <span className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Make a Payment</span>
          </div>
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {success && (
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: 'rgba(72,208,140,0.10)', border: '1px solid rgba(72,208,140,0.25)' }}>
                <CheckCircle size={16} color="#059669" strokeWidth={2.5} />
                <p className="text-sm font-bold text-[#059669]" style={{ fontFamily: 'Roboto, sans-serif' }}>Payment submitted successfully!</p>
              </div>
            )}
            {/* Select Child */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#9CA3AF] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Select Child
              </label>
              <div className="space-y-2">
                {children.filter(c => c.balance > 0).map(c => (
                  <button key={c.id} type="button" onClick={() => setSelectedChildId(c.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left"
                    style={{
                      background: selectedChildId === c.id ? '#002333' : '#F4F6F8',
                      border: `1.5px solid ${selectedChildId === c.id ? ACCENT : 'transparent'}`,
                    }}>
                    <img src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
                      alt={c.name} className="rounded-full" style={{ width: 28, height: 28 }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate"
                        style={{ color: selectedChildId === c.id ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        {c.name}
                      </p>
                      <p className="text-[10px]"
                        style={{ color: selectedChildId === c.id ? 'rgba(255,255,255,0.55)' : '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>
                        {c.school}
                      </p>
                    </div>
                    <span className="text-xs font-black" style={{ color: selectedChildId === c.id ? '#FF6B6B' : '#A60003' }}>
                      ${c.balance} due
                    </span>
                  </button>
                ))}
                {children.filter(c => c.balance === 0).slice(0, 1).map(c => (
                  <button key={c.id} type="button" onClick={() => setSelectedChildId(c.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left"
                    style={{
                      background: selectedChildId === c.id ? '#002333' : '#F4F6F8',
                      border: `1.5px solid ${selectedChildId === c.id ? ACCENT : 'transparent'}`,
                    }}>
                    <img src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
                      alt={c.name} className="rounded-full" style={{ width: 28, height: 28 }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate"
                        style={{ color: selectedChildId === c.id ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        {c.name}
                      </p>
                    </div>
                    <span className="text-[10px] font-black text-[#059669]">Paid ✓</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#9CA3AF] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#9CA3AF]">$</span>
                <input
                  type="number" min="1" value={amount} onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-7 pr-4 py-3 rounded-xl text-sm font-bold text-[#002333] outline-none transition-all"
                  style={{ background: '#F4F6F8', border: '1.5px solid transparent', fontFamily: 'Roboto, sans-serif' }}
                  onFocus={e => e.target.style.border = `1.5px solid ${ACCENT}`}
                  onBlur={e => e.target.style.border = '1.5px solid transparent'}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#9CA3AF] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {METHODS.map(m => {
                  const Icon = m.icon
                  return (
                    <button key={m.id} type="button" onClick={() => setMethod(m.id)}
                      className="flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all"
                      style={{
                        background: method === m.id ? '#002333' : '#F4F6F8',
                        border: `1.5px solid ${method === m.id ? ACCENT : 'transparent'}`,
                      }}>
                      <Icon size={18} strokeWidth={2.5} style={{ color: method === m.id ? ACCENT : '#9CA3AF' }} />
                      <span className="text-[10px] font-bold text-center"
                        style={{ color: method === m.id ? '#fff' : '#6B7280', fontFamily: 'Roboto, sans-serif' }}>
                        {m.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Upload Proof */}
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-[#9CA3AF] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
                Upload Proof (Optional)
              </label>
              <div className="flex items-center justify-center gap-2 py-5 rounded-xl cursor-pointer"
                style={{ background: '#F4F6F8', border: '1.5px dashed #E5E7EB' }}>
                <UploadCloud size={18} color="#9CA3AF" strokeWidth={2.5} />
                <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                  Click to attach receipt or screenshot
                </span>
              </div>
            </div>

            <button type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT, fontFamily: 'Sora, sans-serif' }}>
              Submit Payment
            </button>
          </form>
        </div>

        {/* Payment History */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <div className="px-5 py-3.5 flex items-center gap-2" style={{ background: '#002333' }}>
            <CheckCircle size={15} color={ACCENT} strokeWidth={2.5} />
            <span className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Payment History</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
                  {['Date', 'Child', 'Amount', 'Method', 'Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map(p => {
                  const st = STATUS_STYLE[p.status]
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #F4F6F8' }}>
                      <td className="px-4 py-3 text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{p.date}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                        {p.child.split(' ')[0]}
                      </td>
                      <td className="px-4 py-3 text-xs font-black text-[#002333]">${p.amount}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{p.method}</td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: st?.bg, color: st?.color, fontFamily: 'Roboto, sans-serif' }}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
