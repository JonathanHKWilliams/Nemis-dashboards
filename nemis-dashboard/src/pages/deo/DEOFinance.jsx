import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { deoFinance, schoolFinance, financeMonthly } from '../../data/deoData'

const ACCENT = '#0D9488'

function StatusBadge({ status }) {
  const cfg = {
    'On Track': { bg: 'rgba(22,163,74,0.10)',  color: '#16A34A' },
    Behind:     { bg: 'rgba(217,119,6,0.10)',  color: '#D97706' },
    Critical:   { bg: 'rgba(166,0,3,0.10)',    color: '#A60003' },
  }[status] || { bg: '#F3F4F6', color: '#6B7280' }
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
  )
}

function ComplianceBar({ value }) {
  const color = value >= 80 ? '#16A34A' : value >= 50 ? '#D97706' : '#A60003'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full" style={{ background: '#F3F4F6' }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-xs font-bold w-8 text-right" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{value}%</span>
    </div>
  )
}

export default function DEOFinance() {
  const utilizationRate = Math.round((deoFinance.utilized / deoFinance.disbursed) * 100)

  return (
    <div className="space-y-6 max-w-[1080px]">

      {/* Note Banner */}
      <div className="rounded-2xl p-4 flex items-center gap-3"
        style={{ background: 'rgba(13,148,136,0.07)', border: '1px solid rgba(13,148,136,0.20)' }}>
        <TrendingUp size={18} color={ACCENT} strokeWidth={2.5} className="flex-shrink-0" />
        <p className="text-sm font-semibold" style={{ color: '#374151', fontFamily: 'Roboto, sans-serif' }}>
          <span className="font-black">Finance Monitor Mode:</span> DEO monitors fee compliance and budget utilization. All payment transactions are managed by school admins.
        </p>
      </div>

      {/* District Budget Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'District Budget',  value: `$${(deoFinance.districtBudget / 1000).toFixed(0)}K`, color: ACCENT,    icon: DollarSign   },
          { label: 'Disbursed',        value: `$${(deoFinance.disbursed / 1000).toFixed(0)}K`,      color: '#2563EB', icon: TrendingUp   },
          { label: 'Utilized',         value: `$${(deoFinance.utilized / 1000).toFixed(0)}K`,       color: '#16A34A', icon: CheckCircle  },
          { label: 'Outstanding',      value: `$${(deoFinance.outstanding / 1000).toFixed(0)}K`,    color: '#D97706', icon: AlertTriangle },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-4"
            style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}15` }}>
              <s.icon size={20} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Budget Utilization</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>Disbursement Rate</span>
                <span className="text-xs font-black" style={{ color: ACCENT }}>{Math.round(deoFinance.disbursed / deoFinance.districtBudget * 100)}%</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: '#F3F4F6' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(deoFinance.disbursed / deoFinance.districtBudget * 100)}%`, background: ACCENT }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>Fund Utilization</span>
                <span className="text-xs font-black" style={{ color: '#16A34A' }}>{utilizationRate}%</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: '#F3F4F6' }}>
                <div className="h-full rounded-full" style={{ width: `${utilizationRate}%`, background: '#16A34A' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>Outstanding</span>
                <span className="text-xs font-black" style={{ color: '#D97706' }}>{Math.round(deoFinance.outstanding / deoFinance.disbursed * 100)}%</span>
              </div>
              <div className="h-3 rounded-full" style={{ background: '#F3F4F6' }}>
                <div className="h-full rounded-full" style={{ width: `${Math.round(deoFinance.outstanding / deoFinance.disbursed * 100)}%`, background: '#D97706' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Collection Trend */}
        <div className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>Monthly Collection Trend</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={financeMonthly} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9CA3AF', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Collected']} contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto' }} />
              <Bar dataKey="collected" fill={ACCENT} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* School Finance Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Fee Compliance by School</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #EEF0F3' }}>
              {['School', 'Allocation', 'Collected', 'Compliance', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schoolFinance.map((s, i) => (
              <tr key={s.id} style={{ borderTop: i > 0 ? '1px solid #F3F4F6' : 'none' }}>
                <td className="px-4 py-3.5 text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.school}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#374151]" style={{ fontFamily: 'Roboto, sans-serif' }}>${s.allocation.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>${s.collected.toLocaleString()}</td>
                <td className="px-4 py-3.5 min-w-[150px]"><ComplianceBar value={s.compliance} /></td>
                <td className="px-4 py-3.5"><StatusBadge status={s.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
