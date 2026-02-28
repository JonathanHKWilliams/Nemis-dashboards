import { TrendingUp, TrendingDown } from 'lucide-react'

const accentConfig = {
  red: {
    bar: '#A60003',
    iconBg: 'rgba(166,0,3,0.08)',
    iconColor: '#A60003',
  },
  green: {
    bar: '#48D08C',
    iconBg: 'rgba(72,208,140,0.1)',
    iconColor: '#48D08C',
  },
  blue: {
    bar: '#002333',
    iconBg: 'rgba(0,35,51,0.07)',
    iconColor: '#002333',
  },
  yellow: {
    bar: '#F59E0B',
    iconBg: 'rgba(245,158,11,0.09)',
    iconColor: '#F59E0B',
  },
}

export default function KPICard({ title, value, change, trend, accentColor = 'blue', icon: Icon }) {
  const isPositive = trend === 'up'
  const cfg = accentConfig[accentColor] || accentConfig.blue

  return (
    <div
      className="bg-white rounded-xl overflow-hidden transition-all duration-200 cursor-default"
      style={{
        border: '1px solid #EEF0F3',
        boxShadow: '0 1px 4px rgba(0,35,51,0.05)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)' }}
    >
      {/* Accent bar */}
      <div className="h-[3px]" style={{ background: cfg.bar }} />

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <p
              className="text-[11px] font-medium text-gray-500 uppercase tracking-wider leading-none"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              {title}
            </p>
            <p
              className="text-[26px] font-bold text-[#002333] mt-2 leading-none"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              {value}
            </p>
          </div>
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: cfg.iconBg }}
          >
            {Icon && <Icon size={20} style={{ color: cfg.iconColor }} />}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3">
          {isPositive ? (
            <TrendingUp size={13} style={{ color: '#48D08C' }} />
          ) : (
            <TrendingDown size={13} style={{ color: '#A60003' }} />
          )}
          <span
            className="text-xs font-medium"
            style={{
              fontFamily: 'Roboto, sans-serif',
              color: isPositive ? '#48D08C' : '#A60003',
            }}
          >
            {change}
          </span>
          <span className="text-xs text-gray-400" style={{ fontFamily: 'Roboto, sans-serif' }}>
            vs last month
          </span>
        </div>
      </div>
    </div>
  )
}
