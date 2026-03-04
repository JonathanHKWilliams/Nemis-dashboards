import { TrendingUp, TrendingDown, Target, Award } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import { scorecardMetrics, nationalKPIs, counties } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function MetricCard({ metric, value, target, trend, unit }) {
  const pct = unit === '%' ? value : unit === ':1' ? Math.round((1 - (value - 30) / 20) * 100) : unit === '' ? Math.round(value * 100) : Math.round((1 - value / 10) * 100)
  const achieved = unit === '%' ? value >= target : unit === ':1' ? value <= target : unit === '' ? value >= target : value <= target
  const Icon = achieved ? TrendingUp : TrendingDown
  const color = achieved ? '#059669' : '#DC2626'
  const progress = unit === '%' ? Math.min(Math.round(value / target * 100), 100) : unit === ':1' ? Math.min(Math.round(target / value * 100), 100) : unit === '' ? Math.min(Math.round(value / target * 100), 100) : Math.min(Math.round(target / value * 100), 100)

  return (
    <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-black text-[#0F172A] flex-1 pr-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{metric}</p>
        <div className="flex items-center gap-1 flex-shrink-0"
          style={{ color, background: `${color}10`, padding: '2px 8px', borderRadius: 20 }}>
          <Icon size={11} strokeWidth={3} />
          <span className="text-[10px] font-black" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {achieved ? 'On Track' : 'Below Target'}
          </span>
        </div>
      </div>

      <div className="flex items-end gap-2 mb-3">
        <span className="text-3xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>
          {typeof value === 'number' && value < 10 ? value.toFixed(2) : value}{unit}
        </span>
        <span className="text-xs font-semibold text-[#94A3B8] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
          / Target: {target}{unit}
        </span>
      </div>

      <div className="h-2 rounded-full" style={{ background: '#F1F5F9' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: achieved ? '#059669' : '#DC2626' }} />
      </div>
      <p className="text-[10px] font-semibold text-[#94A3B8] mt-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
        {progress}% of target achieved
      </p>
    </div>
  )
}

export default function MinisterScorecard() {
  const countyPerf = counties.map(c => ({ name: c.name.split(' ')[0], score: Math.round((c.attendance + c.performance + c.compliance) / 3) })).sort((a, b) => b.score - a.score)

  return (
    <div className="space-y-7 max-w-[1100px]">
      {/* Header */}
      <div className="rounded-2xl p-6 flex items-center gap-4"
        style={{ background: 'linear-gradient(130deg, #0F172A 0%, #1E1B4B 100%)' }}>
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(79,70,229,0.35)' }}>
          <Award size={26} color="#A5B4FC" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>National Education Scorecard</h2>
          <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>
            Academic Year 2025/2026 · Republic of Liberia
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-4xl font-black" style={{ color: '#A5B4FC', fontFamily: 'Sora, sans-serif' }}>C+</p>
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>Overall Grade</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        {scorecardMetrics.map(m => (
          <MetricCard key={m.metric} {...m} />
        ))}
      </div>

      {/* County Ranking */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <p className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>County Performance Ranking (Composite Score)</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={countyPerf} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
            <YAxis domain={[40, 90]} tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
            <ReferenceLine y={75} stroke="#059669" strokeDasharray="4 4" label={{ value: 'Target', fill: '#059669', fontSize: 9 }} />
            <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto', fontSize: 11 }} />
            <Bar dataKey="score" fill={ACCENT} radius={[5, 5, 0, 0]} name="Composite Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
