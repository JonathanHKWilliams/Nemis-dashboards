import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, Info, LogIn, RefreshCw } from 'lucide-react'

export default function Login({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [code, setCode]         = useState('')
  const [showCode, setShowCode] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [focused, setFocused]   = useState(null)

  const canSubmit = email.trim().length > 0 && code.trim().length > 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!canSubmit || loading) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 1400)
  }

  const inputStyle = (field) => ({
    background: '#F4F6F8',
    border: `1.5px solid ${focused === field ? '#002333' : '#EEF0F3'}`,
    outline: 'none',
    fontFamily: 'Lato, sans-serif',
    color: '#002333',
    fontWeight: 500,
    transition: 'border-color 0.15s',
  })

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: '#002333' }}
    >
      {/* ── Decorative background circles ── */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 520, height: 520, borderRadius: '50%',
          background: 'rgba(72,208,140,0.07)',
          top: -180, right: -180,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 380, height: 380, borderRadius: '50%',
          background: 'rgba(72,208,140,0.05)',
          bottom: -140, left: -140,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 200, height: 200, borderRadius: '50%',
          background: 'rgba(255,255,255,0.03)',
          top: '40%', left: '10%',
        }}
      />

      {/* ── Login Card ── */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div
          className="bg-white rounded-2xl overflow-hidden"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.40)' }}
        >
          {/* Green accent bar */}
          <div className="h-[5px]" style={{ background: 'linear-gradient(90deg, #48D08C 0%, #2DD4BF 100%)' }} />

          <div className="px-8 pt-8 pb-9">

            {/* ── Brand ── */}
            <div className="flex items-center gap-3 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#002333' }}
              >
                <span
                  className="font-black text-lg leading-none"
                  style={{ color: '#48D08C', fontFamily: 'Sora, sans-serif' }}
                >
                  GB
                </span>
              </div>
              <div>
                <p
                  className="font-bold text-[15px] text-[#002333] leading-tight"
                  style={{ fontFamily: 'Sora, sans-serif' }}
                >
                  Grand Bassa NEMIS
                </p>
                <p
                  className="text-[11px] font-medium mt-0.5"
                  style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}
                >
                  County Education Management System
                </p>
              </div>
            </div>

            {/* ── Heading ── */}
            <div className="mb-7">
              <h1
                className="text-[26px] font-bold text-[#002333] leading-tight"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Welcome back
              </h1>
              <p
                className="text-sm font-medium mt-1.5"
                style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}
              >
                Sign in to access the Grand Bassa County dashboard
              </p>
            </div>

            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Email */}
              <div>
                <label
                  className="block text-[11px] font-black uppercase tracking-widest mb-2"
                  style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}
                >
                  Official Email
                </label>
                <div className="relative">
                  <Mail
                    size={16}
                    strokeWidth={2.5}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: focused === 'email' ? '#002333' : '#9CA3AF' }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    placeholder="you@gbndb.edu.lr"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm"
                    style={inputStyle('email')}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Secret Code */}
              <div>
                <label
                  className="block text-[11px] font-black uppercase tracking-widest mb-2"
                  style={{ color: '#002333', fontFamily: 'Lato, sans-serif' }}
                >
                  Secret Code
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    strokeWidth={2.5}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: focused === 'code' ? '#002333' : '#9CA3AF' }}
                  />
                  <input
                    type={showCode ? 'text' : 'password'}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onFocus={() => setFocused('code')}
                    onBlur={() => setFocused(null)}
                    placeholder="Enter your secret code"
                    className="w-full pl-10 pr-11 py-3 rounded-xl text-sm"
                    style={inputStyle('code')}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCode(p => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors"
                    style={{ color: showCode ? '#002333' : '#9CA3AF' }}
                    tabIndex={-1}
                  >
                    {showCode
                      ? <EyeOff size={16} strokeWidth={2.5} />
                      : <Eye size={16} strokeWidth={2.5} />
                    }
                  </button>
                </div>
              </div>

              {/* ── Helper message ── */}
              <div
                className="flex items-start gap-2.5 rounded-xl px-4 py-3"
                style={{
                  background: 'rgba(72,208,140,0.07)',
                  border: '1px solid rgba(72,208,140,0.22)',
                }}
              >
                <Info
                  size={15}
                  strokeWidth={2.5}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: '#16A34A' }}
                />
                <p
                  className="text-xs font-medium leading-relaxed"
                  style={{ color: '#374151', fontFamily: 'Lato, sans-serif' }}
                >
                  Use your official NEMIS credentials assigned by the Grand Bassa County Education Office. Contact your system administrator if you need assistance accessing the portal.
                </p>
              </div>

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all mt-2"
                style={{
                  background: canSubmit && !loading
                    ? '#002333'
                    : 'rgba(0,35,51,0.35)',
                  cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
                  fontFamily: 'Lato, sans-serif',
                  boxShadow: canSubmit && !loading ? '0 4px 16px rgba(0,35,51,0.30)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (canSubmit && !loading) e.currentTarget.style.background = '#003a52'
                }}
                onMouseLeave={(e) => {
                  if (canSubmit && !loading) e.currentTarget.style.background = '#002333'
                }}
              >
                {loading ? (
                  <>
                    <RefreshCw size={15} strokeWidth={2.5} className="animate-spin" />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <LogIn size={15} strokeWidth={2.5} />
                    Sign In
                  </>
                )}
              </button>

            </form>
          </div>
        </div>

        {/* Footer */}
        <p
          className="text-center text-[11px] font-medium mt-5"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Lato, sans-serif' }}
        >
          Grand Bassa County Education Office &nbsp;·&nbsp; NEMIS © 2026
        </p>
      </div>
    </div>
  )
}
