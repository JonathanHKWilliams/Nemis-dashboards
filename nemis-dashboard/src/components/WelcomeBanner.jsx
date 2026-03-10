const today = new Date()
const hour = today.getHours()
const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

const quickStats = [
  { label: 'Total Districts',    value: '9' },
  { label: 'Total Schools',      value: '295' },
  { label: 'Active Teachers',    value: '4,680' },
  { label: 'Enrolled Students',  value: '136,300' },
]

export default function WelcomeBanner() {
  return (
    <div
      className="rounded-2xl overflow-hidden relative"
      style={{
        background: 'linear-gradient(125deg, #000E21 0%, #001a35 60%, #002d5c 100%)',
        minHeight: 140,
        boxShadow: '0 4px 24px rgba(0,35,51,0.18)',
      }}
    >
      {/* Glow */}
      <div
        className="absolute right-0 top-0 w-80 h-full opacity-10"
        style={{ background: 'radial-gradient(circle at 80% 50%, #0367A0 0%, transparent 70%)' }}
      />

      <div className="relative px-8 py-7 flex items-center gap-6">
        {/* Profile image */}
        <img
          src="https://randomuser.me/api/portraits/men/65.jpg"
          alt="Mr. Jefferson Vobah"
          className="rounded-full object-cover flex-shrink-0"
          style={{ width: 72, height: 72, border: '3px solid rgba(3,103,160,0.55)' }}
          onError={e => { e.target.style.display = 'none' }}
        />

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: 'Roboto, sans-serif' }}>
            {greeting},
          </p>
          <h2 className="text-2xl font-black text-white mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
            Mr. Jefferson Vobah
          </h2>
          <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: 'Roboto, sans-serif' }}>
            County Education Officer · Grand Bassa
          </p>
          <p className="text-xs font-bold mt-1.5" style={{ color: 'rgba(3,103,160,0.90)', fontFamily: 'Roboto, sans-serif' }}>
            {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-stretch gap-0 flex-shrink-0">
          {quickStats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center px-6 py-4"
              style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', minWidth: 90 }}
            >
              <p className="text-2xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
              <p className="text-[10px] font-bold mt-1 text-center" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
