import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { schoolsData } from '../../data/mockData'

const TYPE_COLORS = {
  Primary:    '#0367A0',
  Secondary:  '#002333',
  Technical:  '#7C3AED',
  Vocational: '#F59E0B',
}

// Aggregate enrollment by school type from schoolsData
const typeMap = {}
schoolsData.forEach(s => {
  typeMap[s.type] = (typeMap[s.type] || 0) + s.enrollment
})
const chartData = Object.entries(typeMap).map(([type, value]) => ({ type, value, color: TYPE_COLORS[type] || '#9CA3AF' }))
const totalEnrolled = chartData.reduce((s, d) => s + d.value, 0)

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  const pct = Math.round((d.value / totalEnrolled) * 100)
  return (
    <div className="px-3.5 py-2.5 rounded-xl"
      style={{ background: '#002333', boxShadow: '0 4px 16px rgba(0,35,51,0.25)', fontFamily: 'Roboto, sans-serif' }}>
      <p className="text-white/60 text-[11px]">{d.type}</p>
      <p className="font-black text-sm mt-0.5" style={{ fontFamily: 'Sora, sans-serif', color: d.color }}>
        {d.value.toLocaleString()} students
      </p>
      <p className="text-[11px] text-white/50">{pct}% of total enrollment</p>
    </div>
  )
}

export default function TopSchoolsChart() {
  return (
    <div className="bg-white rounded-xl p-5"
      style={{ border: '1px solid #EEF0F3' }}>

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            Enrollment by School Type
          </h3>
          <p className="text-xs font-semibold text-gray-400 mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Distribution across all registered schools
          </p>
        </div>
        <span className="text-xs px-3 py-1 rounded-full font-bold"
          style={{ background: 'rgba(0,35,51,0.06)', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
          {totalEnrolled.toLocaleString()} total
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Donut */}
        <div className="relative flex-shrink-0" style={{ width: 180, height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={54}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {chartData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          {/* Centre label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <p className="text-[11px] font-bold text-[#9CA3AF] leading-none" style={{ fontFamily: 'Lato, sans-serif' }}>ENROLLED</p>
            <p className="text-lg font-black text-[#002333] mt-0.5 leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>
              {(totalEnrolled / 1000).toFixed(1)}k
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {chartData.map(d => {
            const pct = Math.round((d.value / totalEnrolled) * 100)
            return (
              <div key={d.type}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                    <span className="text-[12px] font-bold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{d.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {d.value.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-black w-9 text-right" style={{ color: d.color, fontFamily: 'Sora, sans-serif' }}>
                      {pct}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: d.color }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
