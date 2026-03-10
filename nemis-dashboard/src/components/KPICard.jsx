export default function KPICard({ title, value, sub, accentColor = '#002333', icon: Icon }) {
  const color = {
    red:    '#A60003',
    green:  '#16A34A',
    blue:   '#0367A0',
    yellow: '#D97706',
    teal:   '#0D9488',
    purple: '#7C3AED',
  }[accentColor] || accentColor

  return (
    <button
      className="rounded-2xl p-5 flex items-start gap-4 text-left w-full transition-all"
      style={{
        background: '#fff',
        border: '1px solid #EEF0F3',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(0,35,51,0.07)' }}
      >
        {Icon && <Icon size={20} style={{ color: '#0F172A' }} strokeWidth={2.5} />}
      </div>
      <div>
        <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
        <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{title}</p>
        {sub && (
          <p className="text-[11px] font-semibold mt-1" style={{ color, fontFamily: 'Roboto, sans-serif' }}>{sub}</p>
        )}
      </div>
    </button>
  )
}
