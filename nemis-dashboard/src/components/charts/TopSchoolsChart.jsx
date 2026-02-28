import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { topSchoolsData } from '../../data/mockData'

const BAR_COLORS = ['#48D08C', '#002333', '#004466', '#005580', '#006699']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3.5 py-2.5 rounded-xl text-white"
        style={{
          background: '#002333',
          boxShadow: '0 4px 16px rgba(0,35,51,0.25)',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <p className="text-white/60 text-[11px]">{label}</p>
        <p className="font-semibold text-sm mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
          {payload[0].value}%
        </p>
        <p className="text-[11px] text-[#48D08C]">compliance score</p>
      </div>
    )
  }
  return null
}

// Custom label inside bar
const CustomBarLabel = ({ x, y, width, value }) => {
  if (width < 30) return null
  return (
    <text
      x={x + width - 8}
      y={y + 14}
      fill="#fff"
      fontSize={11}
      fontFamily="Roboto, sans-serif"
      fontWeight={600}
      textAnchor="end"
    >
      {value}%
    </text>
  )
}

export default function TopSchoolsChart() {
  return (
    <div
      className="bg-white rounded-xl p-5"
      style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
    >
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3
            className="text-[15px] font-semibold text-[#002333]"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Top Performing Districts
          </h3>
          <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Ranked by compliance &amp; performance score
          </p>
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{
            background: 'rgba(0,35,51,0.06)',
            color: '#002333',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          Feb 2026
        </span>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <BarChart
          data={topSchoolsData}
          layout="vertical"
          margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
          barCategoryGap="28%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F4" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: '#9CA3AF', fontSize: 10, fontFamily: 'Roboto, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <YAxis
            type="category"
            dataKey="school"
            tick={{ fill: '#374151', fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
            axisLine={false}
            tickLine={false}
            width={138}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,35,51,0.03)' }} />
          <Bar dataKey="compliance" radius={[0, 4, 4, 0]} label={<CustomBarLabel />}>
            {topSchoolsData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={BAR_COLORS[index] || '#002333'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
