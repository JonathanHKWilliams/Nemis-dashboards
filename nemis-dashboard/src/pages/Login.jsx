import { useState } from 'react'
import { Eye, EyeOff, RefreshCw, Mail, Lock } from 'lucide-react'

const ACCENT = '#0367A0'
const NAVY   = '#002333'

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
    setTimeout(() => { setLoading(false); onLogin() }, 1400)
  }

  const inputStyle = (field) => ({
    background: '#fff',
    border: `2px solid ${focused === field ? ACCENT : '#D1D5DB'}`,
    borderRadius: 10,
    outline: 'none',
    fontFamily: 'Lato, sans-serif',
    color: NAVY,
    fontWeight: 700,
    fontSize: 14,
    padding: '12px 14px',
    width: '100%',
    transition: 'border-color 0.15s',
    boxSizing: 'border-box',
  })

  const labelStyle = {
    display: 'block',
    fontSize: 13,
    fontWeight: 800,
    color: NAVY,
    fontFamily: 'Lato, sans-serif',
    marginBottom: 6,
  }

  return (
    <div className="min-h-screen w-screen flex" style={{ background: '#fff' }}>

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex flex-col justify-between px-14 py-12 flex-shrink-0"
        style={{ width: '45%', background: '#fff' }}>

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: NAVY }}>
            <img
              src="/images/school-logo.png"
              alt="Grand Bassa NEMIS"
              className="w-full h-full object-cover"
              onError={e => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            <span className="font-black text-base leading-none w-full h-full items-center justify-center"
              style={{ color: '#48D08C', fontFamily: 'Sora, sans-serif', display: 'none' }}>GB</span>
          </div>
          <div>
            <p className="font-black text-[15px] leading-tight"
              style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>Grand Bassa NEMIS</p>
            <p className="text-[11px] font-bold mt-0.5"
              style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>County Education Management System</p>
          </div>
        </div>

        {/* Heading + tiles + photo */}
        <div>
          <h1 className="text-[40px] font-black leading-tight"
            style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>
            Welcome back
          </h1>
          <p className="text-[15px] font-bold mt-3 leading-relaxed"
            style={{ color: '#4B5563', fontFamily: 'Lato, sans-serif', maxWidth: 380 }}>
            Sign in to access the Grand Bassa County education dashboard and manage your schools.
          </p>


          {/* Liberia / Grand Bassa stat tiles */}
          <div className="flex gap-4 mt-8">
            <div className="flex-1 rounded-2xl p-5" style={{ background: NAVY }}>
              <p className="text-[11px] font-black uppercase tracking-wider mb-2"
                style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Lato, sans-serif' }}>Grand Bassa County</p>
              <p className="text-[32px] font-black leading-none"
                style={{ color: '#48D08C', fontFamily: 'Sora, sans-serif' }}>47</p>
              <p className="text-xs font-bold mt-1.5"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Lato, sans-serif' }}>Schools registered under NEMIS</p>
            </div>
            <div className="flex-1 rounded-2xl p-5" style={{ background: ACCENT }}>
              <p className="text-[11px] font-black uppercase tracking-wider mb-2"
                style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Lato, sans-serif' }}>MOE Liberia</p>
              <p className="text-[32px] font-black leading-none text-white"
                style={{ fontFamily: 'Sora, sans-serif' }}>WAEC</p>
              <p className="text-xs font-bold mt-1.5"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: 'Lato, sans-serif' }}>Curriculum & exams aligned</p>
            </div>
          </div>

          {/* Photo — add your image at public/images/login-left-photo.jpg */}
          <div className="mt-5 rounded-2xl overflow-hidden" style={{ height: 200 }}>
            <img
              src="/images/login-left-photo.jpg"
              alt="Classroom"
              className="w-full h-full object-cover"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=560&q=80' }}
            />
          </div>
        </div>

        {/* Footer */}
        <p className="text-[11px] font-bold" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
          Grand Bassa County Education Office &nbsp;·&nbsp; NEMIS © 2026
        </p>
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex flex-col px-6 py-12"
        style={{ background: '#F4F6F8' }}>

        {/* Form — vertically centered in its own flex region */}
        <div className="flex-1 flex items-center justify-center">
        <div className="w-full" style={{ maxWidth: 400 }}>

          {/* Mobile brand */}
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ background: NAVY }}>
              <img
                src="/images/school-logo.png"
                alt="Grand Bassa NEMIS"
                className="w-full h-full object-cover"
                onError={e => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <span className="font-black text-sm w-full h-full items-center justify-center"
                style={{ color: '#48D08C', fontFamily: 'Sora, sans-serif', display: 'none' }}>GB</span>
            </div>
            <p className="font-black text-[15px]" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>
              Grand Bassa NEMIS
            </p>
          </div>

          <h2 className="text-[26px] font-black mb-1" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>
            Sign in
          </h2>
          <p className="text-sm font-bold mb-7" style={{ color: '#4B5563', fontFamily: 'Lato, sans-serif' }}>
            Enter your official NEMIS credentials below.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Email */}
            <div>
              <label style={labelStyle}>Official Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} strokeWidth={2.5} style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: focused === 'email' ? NAVY : '#9CA3AF', pointerEvents: 'none',
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                  placeholder="you@gbndb.edu.lr"
                  style={{ ...inputStyle('email'), paddingLeft: 42 }}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Secret Code */}
            <div>
              <label style={labelStyle}>Secret Code</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} strokeWidth={2.5} style={{
                  position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                  color: focused === 'code' ? NAVY : '#9CA3AF', pointerEvents: 'none',
                }} />
                <input
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  onFocus={() => setFocused('code')}
                  onBlur={() => setFocused(null)}
                  placeholder="Enter your secret code"
                  style={{ ...inputStyle('code'), paddingLeft: 42, paddingRight: 44 }}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(p => !p)}
                  tabIndex={-1}
                  style={{
                    position: 'absolute', right: 14, top: '50%',
                    transform: 'translateY(-50%)',
                    color: showCode ? NAVY : '#9CA3AF',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                  }}>
                  {showCode ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!canSubmit || loading}
              style={{
                background: canSubmit && !loading ? NAVY : 'rgba(0,35,51,0.30)',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '14px',
                width: '100%',
                fontSize: 15,
                fontWeight: 900,
                fontFamily: 'Sora, sans-serif',
                cursor: canSubmit && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 4,
                transition: 'background 0.15s',
                boxShadow: canSubmit && !loading ? '0 4px 16px rgba(0,35,51,0.25)' : 'none',
              }}
              onMouseEnter={e => { if (canSubmit && !loading) e.currentTarget.style.background = '#003a52' }}
              onMouseLeave={e => { if (canSubmit && !loading) e.currentTarget.style.background = NAVY }}
            >
              {loading
                ? <><RefreshCw size={15} strokeWidth={2.5} className="animate-spin" /> Authenticating…</>
                : 'Sign In'}
            </button>

          </form>

          {/* Privacy note */}
          <p className="text-xs font-bold mt-6 leading-relaxed"
            style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
            By signing in you agree to the{' '}
            <span style={{ color: NAVY, fontWeight: 800 }}>Grand Bassa County NEMIS Terms of Use</span>.
            Your login credentials are strictly personal and were assigned by the{' '}
            <span style={{ color: NAVY, fontWeight: 800 }}>Grand Bassa County Education Office</span>.
            Do not share your credentials with anyone. If you have lost access, forgotten your secret code,
            or believe your account has been compromised, please contact your{' '}
            <span style={{ color: NAVY, fontWeight: 800 }}>school or county system administrator</span>{' '}
            immediately for assistance.
          </p>
        </div>
        </div>{/* end form center wrapper */}


      </div>

    </div>
  )
}
