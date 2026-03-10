import { School, Users, GraduationCap } from 'lucide-react'
import { districtsData } from '../../data/mockData'

const sorted = [...districtsData].sort((a, b) => b.compliance - a.compliance)

function complianceColor(score) {
  if (score >= 85) return { color: '#0367A0', bg: 'rgba(3,103,160,0.10)', label: 'On Track' }
  if (score >= 75) return { color: '#002333', bg: 'rgba(0,35,51,0.08)', label: 'Fair' }
  return { color: '#A60003', bg: 'rgba(166,0,3,0.10)', label: 'At Risk' }
}

export default function EnrollmentTrendChart() {
  const totalStudents = districtsData.reduce((s, d) => s + d.students, 0)
  const totalSchools  = districtsData.reduce((s, d) => s + d.schools, 0)
  const avgCompliance = Math.round(districtsData.reduce((s, d) => s + d.compliance, 0) / districtsData.length)
  const onTrack = districtsData.filter(d => d.compliance >= 85).length

  return (
    <div className="bg-white rounded-xl p-5"
      style={{ border: '1px solid #EEF0F3' }}>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            District Education Scorecard
          </h3>
          <p className="text-xs font-semibold text-gray-400 mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            All {districtsData.length} districts · Grand Bassa County
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Avg Compliance</p>
          <p className="text-xl font-black" style={{ fontFamily: 'Sora, sans-serif', color: complianceColor(avgCompliance).color }}>
            {avgCompliance}%
          </p>
        </div>
      </div>

      {/* Summary pills */}
      <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
        {[
          { icon: GraduationCap, label: 'Students',  value: totalStudents.toLocaleString(), color: '#0367A0' },
          { icon: School,        label: 'Schools',   value: totalSchools,                   color: '#002333' },
          { icon: Users,         label: 'On Track',  value: `${onTrack}/${districtsData.length} districts`, color: '#0367A0' },
        ].map(s => (
          <div key={s.label} className="flex items-center gap-2 flex-1 rounded-lg px-3 py-2"
            style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
            <s.icon size={14} strokeWidth={2.5} style={{ color: s.color, flexShrink: 0 }} />
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
              <p className="text-xs font-bold" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* District rows */}
      <div className="space-y-2.5">
        {sorted.map((d, i) => {
          const cfg = complianceColor(d.compliance)
          return (
            <div key={d.id} className="flex items-center gap-3">
              {/* Rank */}
              <span className="text-[11px] font-black text-[#CBD5E1] w-4 flex-shrink-0 text-right" style={{ fontFamily: 'Lato, sans-serif' }}>
                {i + 1}
              </span>

              {/* Name + stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[12px] font-bold text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {d.name.replace('Commonwealth District', 'Commonwealth').replace('District No.', 'Dist.')}
                  </p>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {d.schools} sch · {(d.students / 1000).toFixed(1)}k stu
                    </span>
                    <span className="text-[11px] font-black" style={{ color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
                      {d.compliance}%
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${d.compliance}%`, background: cfg.color }} />
                </div>
              </div>

              {/* Status dot */}
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
