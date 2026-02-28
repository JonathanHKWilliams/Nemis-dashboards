const quickStats = [
  { label: 'Total Districts', value: '88', change: '+2', positive: true },
  { label: 'Total Schools', value: '3,482', change: '+45', positive: true },
  { label: 'Active Teachers', value: '54,332', change: '+1,204', positive: true },
  { label: 'Enrolled Students', value: '1,203,445', change: '+18,332', positive: true },
]

export default function WelcomeBanner() {
  return (
    <div
      className="rounded-2xl p-6 text-white overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #002333 0%, #003d5c 55%, #004a70 100%)',
        boxShadow: '0 4px 24px rgba(0,35,51,0.18)',
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-[0.06]"
        style={{ background: '#48D08C' }}
      />
      <div
        className="absolute -bottom-10 right-40 w-32 h-32 rounded-full opacity-[0.05]"
        style={{ background: '#fff' }}
      />

      <div className="relative flex flex-col lg:flex-row gap-6 lg:items-center">
        {/* ── Left: Welcome Text ── */}
        <div className="flex-1">
          <p
            className="text-[11px] font-medium uppercase tracking-widest text-white/50 mb-1"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            CEO Dashboard · February 2026
          </p>
          <h2
            className="text-2xl font-bold leading-snug"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            Welcome Back, Dr. Johnson
          </h2>
          <p
            className="text-white/65 mt-1.5 text-sm max-w-md leading-relaxed"
            style={{ fontFamily: 'Roboto, sans-serif' }}
          >
            Here's a snapshot of district &amp; school operations for February 2026.
          </p>

          <div className="flex items-center gap-2 mt-4">
            <span
              className="w-2 h-2 rounded-full bg-[#48D08C] animate-pulse"
            />
            <span
              className="text-[11px] text-white/45"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              System operational · Last updated: Feb 24, 2026 at 08:45 AM
            </span>
          </div>
        </div>

        {/* ── Right: Quick Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickStats.map((stat) => (
            <div
              key={stat.label}
              className="px-4 py-3.5 rounded-xl backdrop-blur-sm"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              <p
                className="text-[11px] text-white/55 leading-none"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {stat.label}
              </p>
              <p
                className="text-[18px] font-bold text-white mt-1.5 leading-none"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                {stat.value}
              </p>
              <p
                className="text-[11px] mt-1.5 font-medium"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                  color: stat.positive ? '#48D08C' : '#F87171',
                }}
              >
                {stat.positive ? '▲' : '▼'} {stat.change}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
