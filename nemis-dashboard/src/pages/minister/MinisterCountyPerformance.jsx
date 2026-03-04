import { useState } from 'react'
import { ArrowLeft, School, Users, GraduationCap, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { counties } from '../../data/ministerData'

const ACCENT = '#4F46E5'

function StatusBadge({ status }) {
  const cfg = {
    Healthy:          { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    'Needs Attention':{ color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
    Critical:         { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
  )
}

function ComplianceBar({ value }) {
  const color = value >= 85 ? '#059669' : value >= 70 ? '#D97706' : '#DC2626'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#F1F5F9' }}>
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className="text-[10px] font-bold w-8" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{value}%</span>
    </div>
  )
}

// ── County Detail View ────────────────────────────────────────────────────
function CountyDetail({ county, onBack }) {
  const districtData = Array.from({ length: county.districts }, (_, i) => ({
    name: `District ${i + 1}`,
    schools: Math.round(county.schools / county.districts + (Math.random() - 0.5) * 10),
    performance: Math.round(county.performance + (Math.random() - 0.5) * 14),
  }))

  return (
    <div className="space-y-6 max-w-[1000px]">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold"
        style={{ color: ACCENT, fontFamily: 'Roboto, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Counties
      </button>

      {/* Header card */}
      <div className="rounded-2xl p-6 flex items-start justify-between"
        style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <div className="flex items-center gap-4">
          <img
            src={`https://randomuser.me/api/portraits/${county.gender}/${county.photoId}.jpg`}
            alt={county.ceo} className="rounded-xl object-cover flex-shrink-0"
            style={{ width: 56, height: 56, border: '2px solid #E2E8F0' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div>
            <h2 className="text-xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{county.name} County</h2>
            <p className="text-sm font-semibold text-[#64748B] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>CEO: {county.ceo}</p>
            <p className="text-xs font-semibold text-[#94A3B8] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {county.districts} Districts · {county.schools} Schools
            </p>
          </div>
        </div>
        <StatusBadge status={county.status} />
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Schools',    value: county.schools,                  color: ACCENT,    icon: School       },
          { label: 'Students',   value: county.students.toLocaleString(),color: '#2563EB', icon: GraduationCap},
          { label: 'Teachers',   value: county.teachers.toLocaleString(),color: '#7C3AED', icon: Users        },
          { label: 'Attendance', value: `${county.attendance}%`,         color: county.attendance >= 80 ? '#059669' : '#DC2626', icon: TrendingUp },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-3"
            style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
              <s.icon size={18} style={{ color: s.color }} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-xl font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-[10px] font-bold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* District breakdown chart */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <p className="text-sm font-black text-[#0F172A] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>District Performance Breakdown</p>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={districtData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#94A3B8', fontFamily: 'Roboto' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 10, border: 'none', fontFamily: 'Roboto', fontSize: 11 }} />
            <Bar dataKey="performance" fill={ACCENT} radius={[5, 5, 0, 0]} name="Performance %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Compliance stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Report Compliance', value: county.compliance },
          { label: 'Performance Index', value: county.performance },
          { label: 'Attendance Rate',   value: county.attendance },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <p className="text-xs font-black text-[#475569] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            <ComplianceBar value={s.value} />
          </div>
        ))}
      </div>

      {/* Infrastructure */}
      {county.infraAlerts > 0 && (
        <div className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
          <AlertTriangle size={18} color="#DC2626" strokeWidth={2.5} />
          <p className="text-sm font-bold text-[#DC2626]" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {county.infraAlerts} infrastructure alerts flagged in this county — requires urgent attention.
          </p>
        </div>
      )}
    </div>
  )
}

// ── Main List View ─────────────────────────────────────────────────────────
export default function MinisterCountyPerformance() {
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('All')

  const county = counties.find(c => c.id === selected)
  if (county) return <CountyDetail county={county} onBack={() => setSelected(null)} />

  const filtered = filter === 'All' ? counties : counties.filter(c => c.status === filter)

  return (
    <div className="space-y-5 max-w-[1100px]">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Healthy Counties',          value: counties.filter(c => c.status === 'Healthy').length,          color: '#059669' },
          { label: 'Need Attention',             value: counties.filter(c => c.status === 'Needs Attention').length,  color: '#D97706' },
          { label: 'Critical Counties',          value: counties.filter(c => c.status === 'Critical').length,         color: '#DC2626' },
        ].map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex items-center gap-3"
            style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
              <span className="text-xl font-black" style={{ color: s.color, fontFamily: 'Sora, sans-serif' }}>{s.value}</span>
            </div>
            <p className="text-xs font-bold text-[#64748B]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['All', 'Healthy', 'Needs Attention', 'Critical'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
            style={{ background: filter === f ? ACCENT : '#fff', color: filter === f ? '#fff' : '#64748B', border: `1px solid ${filter === f ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              {['County', 'CEO', 'Districts', 'Schools', 'Students', 'Attendance', 'Performance', 'Compliance', 'Infra Alerts', 'Status', ''].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                  style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={c.id}
                className="cursor-pointer transition-colors hover:bg-[#F8FAFC]"
                onClick={() => setSelected(c.id)}
                style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <img src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
                      alt={c.ceo} className="rounded-full object-cover flex-shrink-0"
                      style={{ width: 28, height: 28, border: '1.5px solid #E2E8F0' }}
                      onError={e => { e.target.style.display = 'none' }} />
                    <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.name}</p>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs font-semibold text-[#475569]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.ceo.split(' ').slice(-2).join(' ')}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.districts}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.schools}</td>
                <td className="px-4 py-3.5 text-xs font-bold text-[#334155]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.students.toLocaleString()}</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.attendance >= 80 ? '#059669' : c.attendance >= 70 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{c.attendance}%</td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.performance >= 70 ? '#059669' : c.performance >= 60 ? '#D97706' : '#DC2626', fontFamily: 'Roboto, sans-serif' }}>{c.performance}%</td>
                <td className="px-4 py-3.5 min-w-[110px]"><ComplianceBar value={c.compliance} /></td>
                <td className="px-4 py-3.5 text-xs font-bold" style={{ color: c.infraAlerts > 5 ? '#DC2626' : c.infraAlerts > 2 ? '#D97706' : '#059669', fontFamily: 'Roboto, sans-serif' }}>{c.infraAlerts}</td>
                <td className="px-4 py-3.5"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3.5"><ChevronRight size={15} color="#94A3B8" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
