import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { nationalBudget, countyBudget } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function fmt(n) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function ProgressBar({ value, max, color }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height: 6, background: '#E2E8F0' }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

export default function MinisterBudget() {
  const disbursedPct = Math.round((nationalBudget.disbursed / nationalBudget.totalAllocation) * 100)
  const utilizedPct  = Math.round((nationalBudget.utilized  / nationalBudget.totalAllocation) * 100)

  return (
    <div className="space-y-5 max-w-[1100px]">
      {/* Overview cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Allocation', value: fmt(nationalBudget.totalAllocation), sub: nationalBudget.year,               color: '#4F46E5' },
          { label: 'Disbursed',        value: fmt(nationalBudget.disbursed),       sub: `${disbursedPct}% of allocation`,  color: '#2563EB' },
          { label: 'Utilized',         value: fmt(nationalBudget.utilized),        sub: `${utilizedPct}% of allocation`,   color: '#059669' },
          { label: 'Outstanding',      value: fmt(nationalBudget.outstanding),     sub: 'Pending disbursement',            color: '#D97706' },
        ].map(c => (
          <div key={c.label} className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <p className="text-2xl font-black" style={{ color: c.color, fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
            <p className="text-xs font-black text-[#0F172A] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.label}</p>
            <p className="text-[10px] font-semibold text-[#94A3B8] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.sub}</p>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div className="rounded-2xl p-5 space-y-4" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <h3 className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Budget Utilization — FY {nationalBudget.year}</h3>
        {[
          { label: 'Total Allocation', value: nationalBudget.totalAllocation, max: nationalBudget.totalAllocation, color: '#E2E8F0', barColor: ACCENT },
          { label: 'Disbursed',        value: nationalBudget.disbursed,       max: nationalBudget.totalAllocation, color: '#E2E8F0', barColor: '#2563EB' },
          { label: 'Utilized',         value: nationalBudget.utilized,        max: nationalBudget.totalAllocation, color: '#E2E8F0', barColor: '#059669' },
          { label: 'Outstanding',      value: nationalBudget.outstanding,     max: nationalBudget.totalAllocation, color: '#E2E8F0', barColor: '#D97706' },
        ].map(r => (
          <div key={r.label}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.label}</p>
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>
                {fmt(r.value)} <span className="font-semibold text-[#94A3B8]">/ {fmt(r.max)}</span>
              </p>
            </div>
            <ProgressBar value={r.value} max={r.max} color={r.barColor} />
          </div>
        ))}
      </div>

      {/* County breakdown chart */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <h3 className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>County Budget Breakdown (Top 8)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={countyBudget} barSize={20} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="county" tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'Roboto, sans-serif' }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} tick={{ fontSize: 10, fill: '#94A3B8', fontFamily: 'Roboto, sans-serif' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={v => [fmt(v)]} contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #E2E8F0' }} />
            <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Roboto, sans-serif' }} />
            <Bar dataKey="allocation" name="Allocation" fill={`${ACCENT}50`} radius={[4, 4, 0, 0]} />
            <Bar dataKey="disbursed"  name="Disbursed"  fill={ACCENT}         radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* County table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <h3 className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>County Allocation Details</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['County', 'Allocation', 'Disbursed', 'Disbursed %', 'Compliance', 'Utilization Bar'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countyBudget.map((c, i) => {
              const pct = Math.round((c.disbursed / c.allocation) * 100)
              return (
                <tr key={c.county} style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                  <td className="px-4 py-3.5 text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.county}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-[#334155]">{fmt(c.allocation)}</td>
                  <td className="px-4 py-3.5 text-xs font-bold text-[#334155]">{fmt(c.disbursed)}</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: pct >= 80 ? '#059669' : pct >= 60 ? '#D97706' : '#DC2626' }}>{pct}%</td>
                  <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.compliance >= 80 ? '#059669' : c.compliance >= 65 ? '#D97706' : '#DC2626' }}>{c.compliance}%</td>
                  <td className="px-4 py-3.5 w-40">
                    <ProgressBar value={c.disbursed} max={c.allocation} color={pct >= 80 ? '#059669' : pct >= 60 ? '#D97706' : '#DC2626'} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Read-only note */}
      <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: `${ACCENT}06`, border: `1px solid ${ACCENT}15` }}>
        <p className="text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <span className="font-black text-[#0F172A]">Note:</span> Budget allocations are set by the Ministry of Finance in coordination with the MOE. The Minister may monitor utilization but cannot modify allocations directly. Contact the Finance Directorate for adjustments.
        </p>
      </div>
    </div>
  )
}
