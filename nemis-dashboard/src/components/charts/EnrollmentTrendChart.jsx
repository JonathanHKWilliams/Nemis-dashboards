import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts'
import { enrollmentTrendData } from '../../data/mockData'

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
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-[11px] text-[#48D08C]">students enrolled</p>
      </div>
    )
  }
  return null
}

export default function EnrollmentTrendChart() {
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
            District Enrollment Trend
          </h3>
          <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            All districts · Aug 2025 – Feb 2026
          </p>
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{
            background: 'rgba(72,208,140,0.1)',
            color: '#48D08C',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          +22.8% YTD
        </span>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={enrollmentTrendData} margin={{ top: 4, right: 6, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="enrollGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#002333" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#002333" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F4" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'Roboto, sans-serif' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#9CA3AF', fontSize: 10, fontFamily: 'Roboto, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`}
            width={38}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#002333', strokeWidth: 1, strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="students"
            stroke="#002333"
            strokeWidth={2.5}
            fill="url(#enrollGradient)"
            dot={{ fill: '#48D08C', strokeWidth: 2.5, r: 4, stroke: '#fff' }}
            activeDot={{ r: 6, fill: '#48D08C', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
