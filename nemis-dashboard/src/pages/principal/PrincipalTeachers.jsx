import { useState, useEffect } from 'react'
import {
  Search, ArrowLeft, Mail, Phone, BookOpen, CalendarCheck,
  ChevronLeft, ChevronRight, UserPlus, Check,
  TrendingUp, AlertCircle, ChevronDown, MoreVertical,
  Award, FileText, Lightbulb,
} from 'lucide-react'
import { principalTeachers, principalClasses } from '../../data/principalData'

const ACCENT   = '#0367A0'
const NAVY     = '#002333'
const RED      = '#A60003'
const PAGE_SIZE = 10

const SUBJECTS = [
  'Mathematics','English Language','English Literature','Science','Biology',
  'Chemistry','Physics','Social Studies','History','French','Geography',
  'ICT','Agriculture','Health & PE','Physical Education','Music & Arts',
  'Religious Studies','Civic Education','Economics','Guidance Counseling',
  'Grade 1 Class','Grade 2 Class','Grade 3 Class','Grade 4 Class','Grade 5 Class','Grade 1B Class','Grade 3B Class',
]

const statusCfg = {
  Active:     { bg: '#0367A0',  color: '#fff',     pill: 'rgba(3,103,160,0.12)',  text: ACCENT   },
  'On Leave': { bg: '#D97706',  color: '#fff',     pill: 'rgba(217,119,6,0.12)', text: '#D97706' },
  Suspended:  { bg: '#A60003',  color: '#fff',     pill: 'rgba(166,0,3,0.12)',   text: '#A60003' },
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Avatar({ name, gender, photoId, size = 40 }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender}/${photoId % 100}.jpg`}
        alt={name} className="rounded-full object-cover w-full h-full"
        style={{ border: '2px solid #EEF0F3' }}
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div className="rounded-full w-full h-full items-center justify-center text-white font-black absolute inset-0"
        style={{ background: ACCENT, fontFamily: 'Sora, sans-serif', fontSize: size * 0.3, display: 'none' }}>
        {initials}
      </div>
    </div>
  )
}

function StatusBadge({ status }) {
  const cfg = statusCfg[status] || { bg: '#6B7280', color: '#fff' }
  return (
    <span className="text-[10px] font-black px-2.5 py-1 rounded-full"
      style={{ background: cfg.bg, color: cfg.color, fontFamily: 'Lato, sans-serif' }}>
      {status}
    </span>
  )
}

function Stat({ label, value, color, sub }) {
  return (
    <div className="rounded-2xl p-5 flex items-start gap-4"
      style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}15` }}>
        <div className="w-3 h-3 rounded-full" style={{ background: color }} />
      </div>
      <div>
        <p className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</p>
        <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</p>
        {sub && <p className="text-[10px] font-semibold mt-0.5" style={{ color, fontFamily: 'Lato, sans-serif' }}>{sub}</p>}
      </div>
    </div>
  )
}

// ─── Multi-step Add Teacher — Full-page layout ────────────────────────────────

const STEPS_CFG = [
  { label: 'Personal Info',    subtitle: 'Basic details'    },
  { label: 'Professional',     subtitle: 'Role & status'    },
  { label: 'Class Assignment', subtitle: 'Assign classes'   },
  { label: 'Documents',        subtitle: 'Upload files'     },
  { label: 'Review',           subtitle: 'Confirm & add'    },
]

const STEP_HEADINGS = [
  { title: 'Tell us about the teacher',   desc: 'Enter the teacher\'s personal and contact information.' },
  { title: 'Professional details',        desc: 'Add employment ID, subject, join date and current status.' },
  { title: 'Assign classes',              desc: 'Select which classes this teacher will be responsible for.' },
  { title: 'Required documents',          desc: 'Upload the teacher\'s official credentials and supporting documents.' },
  { title: 'Review & confirm',            desc: 'Double-check all details before adding the teacher to the system.' },
]

const REQUIRED_DOCS = [
  { key: 'nationalId',   label: 'National ID / Passport',         required: true,  accept: '.pdf,.jpg,.jpeg,.png', hint: 'Clear scan or photo of valid government-issued ID' },
  { key: 'teachingLic',  label: 'Teaching License / MoE Cert.',   required: true,  accept: '.pdf,.jpg,.jpeg,.png', hint: 'Ministry of Education teaching authorization certificate' },
  { key: 'transcript',   label: 'Academic Transcript / Degree',    required: true,  accept: '.pdf,.jpg,.jpeg,.png', hint: 'Certified copy of highest academic qualification' },
  { key: 'medical',      label: 'Medical Fitness Certificate',     required: false, accept: '.pdf,.jpg,.jpeg,.png', hint: 'Issued by a certified medical practitioner' },
  { key: 'police',       label: 'Police Clearance Certificate',    required: false, accept: '.pdf,.jpg,.jpeg,.png', hint: 'Criminal background check from national police' },
  { key: 'reference',    label: 'Reference / Recommendation Letter', required: false, accept: '.pdf,.doc,.docx',   hint: 'From a former employer or academic institution' },
]

const BLANK = {
  firstName: '', lastName: '', gender: 'men', phone: '', email: '',
  empId: '', subject: '', joined: '', status: 'Active', classes: [],
  docs: {},
}

function FormField({ label, required, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-semibold"
        style={{ color: '#374151', fontFamily: 'Lato, sans-serif' }}>
        {required && <span style={{ color: RED }}>* </span>}{label}
      </label>
      {children}
      {error && (
        <p className="text-xs font-semibold flex items-center gap-1"
          style={{ color: RED, fontFamily: 'Lato, sans-serif' }}>
          <AlertCircle size={11} strokeWidth={2.5} /> {error}
        </p>
      )}
    </div>
  )
}

const baseInput = {
  width: '100%', padding: '11px 14px', borderRadius: 8, outline: 'none',
  border: '1.5px solid #D1D5DB', background: '#fff',
  fontFamily: 'Lato, sans-serif', fontSize: 14, color: NAVY, fontWeight: 500,
}

function FInput({ error, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      {...props}
      style={{ ...baseInput, borderColor: error ? RED : focused ? ACCENT : '#D1D5DB', boxShadow: focused ? `0 0 0 3px ${ACCENT}18` : 'none' }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  )
}

function FSelect({ error, children, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="relative">
      <select
        {...props}
        style={{ ...baseInput, borderColor: error ? RED : focused ? ACCENT : '#D1D5DB', boxShadow: focused ? `0 0 0 3px ${ACCENT}18` : 'none', appearance: 'none', paddingRight: 36 }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
      <ChevronDown size={15} strokeWidth={2.5} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
    </div>
  )
}

function AddTeacherModal({ onClose, onAdd }) {
  const [step, setStep]     = useState(0)
  const [form, setForm]     = useState(BLANK)
  const [errors, setErrors] = useState({})
  const [tipOpen, setTipOpen] = useState(false)

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  // Completeness: count filled required fields out of 11 (8 info + 3 required docs)
  const requiredDocsFilled = REQUIRED_DOCS.filter(d => d.required && form.docs[d.key]).length
  const filled = [
    form.firstName.trim(), form.lastName.trim(), form.phone.trim(), form.email.trim(),
    form.empId.trim(), form.subject.trim(), form.joined.trim(),
    form.classes.length > 0 ? 'x' : '',
  ].filter(Boolean).length + requiredDocsFilled
  const completeness = Math.round((filled / 11) * 100)

  function validateStep() {
    const e = {}
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'First name is required'
      if (!form.lastName.trim())  e.lastName  = 'Last name is required'
      if (!form.phone.trim())     e.phone     = 'Phone number is required'
      if (!form.email.trim())     e.email     = 'Email address is required'
    }
    if (step === 1) {
      if (!form.empId.trim())   e.empId   = 'Employee ID is required'
      if (!form.subject.trim()) e.subject = 'Subject is required'
      if (!form.joined.trim())  e.joined  = 'Join date is required'
    }
    if (step === 2 && form.classes.length === 0) {
      e.classes = 'Assign at least one class'
    }
    if (step === 3) {
      const missing = REQUIRED_DOCS.filter(d => d.required && !form.docs[d.key])
      if (missing.length > 0) e.docs = `Missing required: ${missing.map(d => d.label).join(', ')}`
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep()) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)

  function handleSubmit() {
    const newTeacher = {
      id: Date.now(), empId: form.empId,
      name: `${form.firstName} ${form.lastName}`,
      subject: form.subject, classes: form.classes,
      attendance: 100, gender: form.gender, photoId: Math.floor(Math.random() * 80) + 10,
      status: form.status, joined: form.joined,
      phone: form.phone, email: form.email, lastReport: '—',
    }
    onAdd(newTeacher)
    onClose()
  }

  const TIPS = [
    'Employee IDs follow the format TCH-XXX.',
    'Ensure the email is the official school email address.',
    'A teacher can be assigned to multiple classes across grade levels.',
    'Accepted document formats: PDF, JPG, PNG (max 5 MB each).',
    'You can update documents later from the teacher\'s profile.',
  ]

  const setDoc = (key, file) => setForm(f => ({ ...f, docs: { ...f.docs, [key]: file } }))
  const removeDoc = (key) => setForm(f => { const d = { ...f.docs }; delete d[key]; return { ...f, docs: d } })

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: '#fff' }}>

      {/* ── Left Sidebar ── */}
      <div className="flex flex-col flex-shrink-0 select-none" style={{ width: 248, background: '#000E21' }}>

        {/* Brand */}
        <div className="px-6 pt-6 pb-5 flex items-center gap-3 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: ACCENT }}>
            <span className="text-xs font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>SM</span>
          </div>
          <div>
            <p className="text-[12px] font-black text-white leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>Add New Teacher</p>
            <p className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Lato, sans-serif' }}>St. Mark's School</p>
          </div>
        </div>

        {/* Steps */}
        <nav className="flex-1 px-5 pt-6 overflow-y-auto">
          {STEPS_CFG.map((s, i) => {
            const done   = i < step
            const active = i === step
            return (
              <div key={s.label} className="flex gap-4">
                {/* Line + circle */}
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      background: done ? '#16A34A' : active ? ACCENT : 'rgba(255,255,255,0.08)',
                      border: done || active ? 'none' : '1.5px solid rgba(255,255,255,0.18)',
                    }}>
                    {done
                      ? <Check size={14} strokeWidth={3} color="#fff" />
                      : <span className="text-xs font-black" style={{ color: active ? '#fff' : 'rgba(255,255,255,0.38)', fontFamily: 'Lato, sans-serif' }}>{i + 1}</span>
                    }
                  </div>
                  {i < STEPS_CFG.length - 1 && (
                    <div className="w-px flex-1 my-1.5"
                      style={{ background: done ? '#16A34A' : 'rgba(255,255,255,0.12)', minHeight: 28 }} />
                  )}
                </div>
                {/* Label */}
                <div className="pb-7">
                  <p className="text-[13px] font-black leading-snug"
                    style={{ color: active ? '#fff' : done ? 'rgba(255,255,255,0.70)' : 'rgba(255,255,255,0.35)', fontFamily: 'Lato, sans-serif' }}>
                    {s.label}
                  </p>
                  <p className="text-[11px] font-semibold mt-0.5"
                    style={{ color: active ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.22)', fontFamily: 'Lato, sans-serif' }}>
                    {s.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </nav>

        {/* Completeness */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-black" style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Lato, sans-serif' }}>Form Completeness:</p>
            <p className="text-[11px] font-black" style={{ color: '#4ADE80', fontFamily: 'Lato, sans-serif' }}>{completeness}%</p>
          </div>
          <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.10)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${completeness}%`, background: '#4ADE80' }} />
          </div>
        </div>

        {/* Footer links */}
        <div className="px-5 pb-5 pt-3 space-y-1.5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {['Terms & Conditions', 'Privacy Policy', 'Accessibility'].map(l => (
            <p key={l} className="text-[11px] font-semibold cursor-pointer hover:underline"
              style={{ color: 'rgba(255,255,255,0.30)', fontFamily: 'Lato, sans-serif' }}>{l}</p>
          ))}
          <p className="text-[10px] font-semibold pt-1" style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'Lato, sans-serif' }}>© 2026 St. Mark's School</p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#fff' }}>

        {/* Top bar */}
        <div className="flex items-center justify-between px-10 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid #F3F4F6' }}>
          <button onClick={step === 0 ? onClose : back}
            className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
            <ArrowLeft size={15} strokeWidth={2.5} />
            {step === 0 ? 'Back to Teachers' : 'Go Back'}
          </button>
          <div className="relative">
            <button onClick={() => setTipOpen(o => !o)}
              className="flex items-center gap-1.5 text-sm font-semibold transition-opacity hover:opacity-80"
              style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              <Lightbulb size={15} strokeWidth={2} />
              Tips
            </button>
            {tipOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl overflow-hidden z-20"
                style={{ background: '#fff', border: '1px solid #E5E7EB', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                <div className="px-4 py-3" style={{ background: `${ACCENT}08`, borderBottom: '1px solid #E5E7EB' }}>
                  <p className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Quick Tips</p>
                </div>
                <ul className="px-4 py-3 space-y-2">
                  {TIPS.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: ACCENT }} />
                      <p className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{t}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable form area */}
        <div className="flex-1 overflow-y-auto px-10 py-8">
          <div className="max-w-[680px]">

            {/* Heading */}
            <h1 className="text-3xl font-black text-[#111827] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              {STEP_HEADINGS[step].title}
            </h1>
            <p className="mt-2 text-sm font-medium" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              {STEP_HEADINGS[step].desc}
            </p>
            <p className="mt-4 text-xs font-semibold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
              <span style={{ color: RED }}>*</span> indicates a required field
            </p>

            <div className="mt-7 space-y-6">

              {/* Step 0 — Personal Info */}
              {step === 0 && (
                <>
                  <div className="grid grid-cols-2 gap-5">
                    <FormField label="First Name" required error={errors.firstName}>
                      <FInput value={form.firstName} onChange={e => set('firstName', e.target.value)} placeholder="e.g. Mary" error={errors.firstName} />
                    </FormField>
                    <FormField label="Last Name" required error={errors.lastName}>
                      <FInput value={form.lastName} onChange={e => set('lastName', e.target.value)} placeholder="e.g. Johnson" error={errors.lastName} />
                    </FormField>
                  </div>

                  <FormField label="Gender">
                    <div className="flex gap-3">
                      {[
                        { val: 'men',   label: 'Male',   symbol: '♂' },
                        { val: 'women', label: 'Female', symbol: '♀' },
                      ].map(g => {
                        const active = form.gender === g.val
                        return (
                          <button key={g.val} onClick={() => set('gender', g.val)}
                            className="flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-lg text-sm font-semibold transition-all"
                            style={{
                              background: active ? `${ACCENT}10` : '#F9FAFB',
                              color: active ? ACCENT : '#374151',
                              border: `1.5px solid ${active ? ACCENT : '#D1D5DB'}`,
                              fontFamily: 'Lato, sans-serif',
                            }}>
                            <span className="text-xl font-black leading-none" style={{ color: active ? ACCENT : '#9CA3AF', lineHeight: 1 }}>
                              {g.symbol}
                            </span>
                            <span className="font-bold">{g.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </FormField>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 24 }}>
                    <p className="text-sm font-bold text-[#111827] mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Contact Information <span className="text-xs font-semibold text-[#9CA3AF] ml-1">(required)</span>
                    </p>
                    <div className="grid grid-cols-2 gap-5">
                      <FormField label="Phone Number" required error={errors.phone}>
                        <FInput value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+231 77 555 0000" error={errors.phone} />
                      </FormField>
                      <FormField label="Email Address" required error={errors.email}>
                        <FInput type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="name@stmarks.edu.lr" error={errors.email} />
                      </FormField>
                    </div>
                  </div>
                </>
              )}

              {/* Step 1 — Professional */}
              {step === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-5">
                    <FormField label="Employee ID" required error={errors.empId}>
                      <FInput value={form.empId} onChange={e => set('empId', e.target.value)} placeholder="TCH-029" error={errors.empId} />
                    </FormField>
                    <FormField label="Date Joined" required error={errors.joined}>
                      <FInput type="date" value={form.joined} onChange={e => set('joined', e.target.value)} error={errors.joined} />
                    </FormField>
                  </div>

                  <FormField label="Subject / Role" required error={errors.subject}>
                    <FSelect value={form.subject} onChange={e => set('subject', e.target.value)} error={errors.subject}>
                      <option value="">Select subject…</option>
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </FSelect>
                  </FormField>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 24 }}>
                    <p className="text-sm font-bold text-[#111827] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Employment Status <span className="text-xs font-semibold text-[#9CA3AF] ml-1">(optional)</span>
                    </p>
                    <p className="text-xs font-medium mb-4" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                      You can update this at any time from the teacher's profile.
                    </p>
                    <div className="flex gap-3">
                      {['Active', 'On Leave'].map(s => (
                        <button key={s} onClick={() => set('status', s)}
                          className="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
                          style={{
                            background: form.status === s ? `${ACCENT}10` : '#F9FAFB',
                            color: form.status === s ? ACCENT : '#374151',
                            border: `1.5px solid ${form.status === s ? ACCENT : '#D1D5DB'}`,
                            fontFamily: 'Lato, sans-serif',
                          }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Step 2 — Class Assignment */}
              {step === 2 && (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                      {form.classes.length === 0 ? 'No classes selected yet' : `${form.classes.length} class${form.classes.length > 1 ? 'es' : ''} selected`}
                    </p>
                    {form.classes.length > 0 && (
                      <button onClick={() => set('classes', [])}
                        className="text-xs font-semibold transition-opacity hover:opacity-70"
                        style={{ color: RED, fontFamily: 'Lato, sans-serif' }}>
                        Clear all
                      </button>
                    )}
                  </div>
                  {errors.classes && (
                    <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                      <AlertCircle size={13} color={RED} />
                      <p className="text-xs font-bold" style={{ color: RED, fontFamily: 'Lato, sans-serif' }}>{errors.classes}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2.5">
                    {principalClasses.map(cls => {
                      const sel = form.classes.includes(cls.name)
                      return (
                        <button key={cls.id}
                          onClick={() => set('classes', sel ? form.classes.filter(c => c !== cls.name) : [...form.classes, cls.name])}
                          className="px-3 py-3 rounded-xl text-left transition-all"
                          style={{
                            background: sel ? `${ACCENT}0E` : '#F9FAFB',
                            border: `1.5px solid ${sel ? ACCENT : '#D1D5DB'}`,
                            fontFamily: 'Lato, sans-serif',
                          }}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-sm font-bold" style={{ color: sel ? ACCENT : '#111827' }}>{cls.name}</span>
                            {sel && <Check size={12} strokeWidth={3} style={{ color: ACCENT }} />}
                          </div>
                          <p className="text-xs font-medium" style={{ color: sel ? ACCENT : '#9CA3AF' }}>{cls.students} students</p>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Step 3 — Documents */}
              {step === 3 && (
                <>
                  {errors.docs && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                      <AlertCircle size={14} color={RED} />
                      <p className="text-xs font-bold" style={{ color: RED, fontFamily: 'Lato, sans-serif' }}>{errors.docs}</p>
                    </div>
                  )}

                  {/* Required */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                      Required Documents
                    </p>
                    <div className="space-y-3">
                      {REQUIRED_DOCS.filter(d => d.required).map(doc => {
                        const file = form.docs[doc.key]
                        return (
                          <div key={doc.key} className="flex items-center gap-4 p-4 rounded-xl transition-all"
                            style={{
                              border: `1.5px solid ${file ? '#86EFAC' : errors.docs ? '#FECACA' : '#D1D5DB'}`,
                              background: file ? '#F0FDF4' : '#FAFAFA',
                            }}>
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: file ? '#DCFCE7' : `${ACCENT}10` }}>
                              <FileText size={18} strokeWidth={2} style={{ color: file ? '#16A34A' : ACCENT }} />
                            </div>
                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold text-[#111827]" style={{ fontFamily: 'Lato, sans-serif' }}>{doc.label}</p>
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                                  style={{ background: '#FEE2E2', color: RED, fontFamily: 'Lato, sans-serif' }}>Required</span>
                              </div>
                              {file
                                ? <p className="text-xs font-semibold mt-0.5 truncate" style={{ color: '#16A34A', fontFamily: 'Lato, sans-serif' }}>
                                    ✓ {file.name} · {(file.size / 1024).toFixed(0)} KB
                                  </p>
                                : <p className="text-xs font-medium mt-0.5" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{doc.hint}</p>
                              }
                            </div>
                            {/* Action */}
                            {file ? (
                              <button onClick={() => removeDoc(doc.key)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                                style={{ background: '#FEE2E2', color: RED }}
                                onMouseEnter={e => e.currentTarget.style.background = '#FECACA'}
                                onMouseLeave={e => e.currentTarget.style.background = '#FEE2E2'}
                                title="Remove file">
                                <AlertCircle size={13} strokeWidth={2.5} />
                              </button>
                            ) : (
                              <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold cursor-pointer flex-shrink-0 transition-all"
                                style={{ background: ACCENT, color: '#fff', fontFamily: 'Lato, sans-serif' }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                                <ChevronRight size={12} strokeWidth={3} style={{ transform: 'rotate(-90deg)' }} /> Upload
                                <input type="file" accept={doc.accept} className="hidden"
                                  onChange={e => { if (e.target.files[0]) setDoc(doc.key, e.target.files[0]); e.target.value = '' }} />
                              </label>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Optional */}
                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: 20 }}>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                      Optional Documents
                    </p>
                    <div className="space-y-3">
                      {REQUIRED_DOCS.filter(d => !d.required).map(doc => {
                        const file = form.docs[doc.key]
                        return (
                          <div key={doc.key} className="flex items-center gap-4 p-4 rounded-xl transition-all"
                            style={{
                              border: `1.5px solid ${file ? '#86EFAC' : '#E5E7EB'}`,
                              background: file ? '#F0FDF4' : '#fff',
                            }}>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: file ? '#DCFCE7' : '#F3F4F6' }}>
                              <FileText size={18} strokeWidth={2} style={{ color: file ? '#16A34A' : '#9CA3AF' }} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-bold text-[#111827]" style={{ fontFamily: 'Lato, sans-serif' }}>{doc.label}</p>
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                                  style={{ background: '#F3F4F6', color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Optional</span>
                              </div>
                              {file
                                ? <p className="text-xs font-semibold mt-0.5 truncate" style={{ color: '#16A34A', fontFamily: 'Lato, sans-serif' }}>
                                    ✓ {file.name} · {(file.size / 1024).toFixed(0)} KB
                                  </p>
                                : <p className="text-xs font-medium mt-0.5" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{doc.hint}</p>
                              }
                            </div>
                            {file ? (
                              <button onClick={() => removeDoc(doc.key)}
                                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                                style={{ background: '#FEE2E2', color: RED }}
                                onMouseEnter={e => e.currentTarget.style.background = '#FECACA'}
                                onMouseLeave={e => e.currentTarget.style.background = '#FEE2E2'}
                                title="Remove file">
                                <AlertCircle size={13} strokeWidth={2.5} />
                              </button>
                            ) : (
                              <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold cursor-pointer flex-shrink-0 transition-all"
                                style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1px solid #E5E7EB' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
                                onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}>
                                <ChevronRight size={12} strokeWidth={3} style={{ transform: 'rotate(-90deg)' }} /> Upload
                                <input type="file" accept={doc.accept} className="hidden"
                                  onChange={e => { if (e.target.files[0]) setDoc(doc.key, e.target.files[0]); e.target.value = '' }} />
                              </label>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Step 4 — Review */}
              {step === 4 && (
                <>
                  {/* Profile preview */}
                  <div className="flex items-center gap-4 p-5 rounded-2xl"
                    style={{ background: `${ACCENT}07`, border: `1.5px solid ${ACCENT}20` }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, ${ACCENT} 100%)`, fontFamily: 'Sora, sans-serif', fontSize: 22 }}>
                      {(form.firstName[0] || '?')}{(form.lastName[0] || '?')}
                    </div>
                    <div>
                      <p className="text-lg font-black text-[#111827]" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {form.firstName} {form.lastName}
                      </p>
                      <p className="text-sm font-semibold mt-0.5" style={{ color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>{form.subject || '—'}</p>
                      <StatusBadge status={form.status} />
                    </div>
                  </div>

                  {/* Detail rows */}
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #E5E7EB' }}>
                    {[
                      { label: 'Employee ID',  value: form.empId   || '—' },
                      { label: 'Phone',        value: form.phone   || '—' },
                      { label: 'Email',        value: form.email   || '—' },
                      { label: 'Date Joined',  value: form.joined  || '—' },
                      { label: 'Gender',       value: form.gender === 'men' ? 'Male' : 'Female' },
                      { label: 'Classes',      value: form.classes.join(', ') || '—' },
                    ].map((r, i, arr) => (
                      <div key={r.label} className="flex items-center justify-between px-5 py-3.5"
                        style={{ borderBottom: i < arr.length - 1 ? '1px solid #F3F4F6' : 'none', background: i % 2 === 0 ? '#fff' : '#FAFAFA' }}>
                        <span className="text-sm font-semibold" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>{r.label}</span>
                        <span className="text-sm font-bold text-right max-w-[320px] truncate" style={{ color: '#111827', fontFamily: 'Lato, sans-serif' }}>{r.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Documents summary */}
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider mb-3" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>Documents</p>
                    <div className="grid grid-cols-2 gap-2">
                      {REQUIRED_DOCS.map(doc => {
                        const file = form.docs[doc.key]
                        return (
                          <div key={doc.key} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                            style={{ background: file ? '#F0FDF4' : '#F9FAFB', border: `1px solid ${file ? '#86EFAC' : '#E5E7EB'}` }}>
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: file ? '#DCFCE7' : '#F3F4F6' }}>
                              <FileText size={12} strokeWidth={2} style={{ color: file ? '#16A34A' : '#D1D5DB' }} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate" style={{ color: '#111827', fontFamily: 'Lato, sans-serif' }}>{doc.label}</p>
                              <p className="text-[10px] font-semibold" style={{ color: file ? '#16A34A' : doc.required ? RED : '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                                {file ? `✓ ${file.name}` : doc.required ? 'Missing' : 'Not uploaded'}
                              </p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>

        {/* Bottom action bar */}
        <div className="flex items-center justify-between px-10 py-4 flex-shrink-0"
          style={{ borderTop: '1px solid #E5E7EB', background: '#fff', boxShadow: '0 -2px 8px rgba(0,0,0,0.04)' }}>
          <button onClick={step === 0 ? onClose : back}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all"
            style={{ background: '#F3F4F6', color: '#374151', fontFamily: 'Lato, sans-serif', border: '1.5px solid #E5E7EB' }}
            onMouseEnter={e => e.currentTarget.style.background = '#E5E7EB'}
            onMouseLeave={e => e.currentTarget.style.background = '#F3F4F6'}>
            <ChevronLeft size={14} strokeWidth={2.5} /> {step === 0 ? 'Cancel' : 'Previous'}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
              Step {step + 1} of {STEPS_CFG.length}
            </span>
            {step < STEPS_CFG.length - 1 ? (
              <button onClick={next}
                className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: ACCENT, fontFamily: 'Lato, sans-serif', boxShadow: `0 4px 12px ${ACCENT}40` }}>
                Next <ChevronRight size={14} strokeWidth={2.5} />
              </button>
            ) : (
              <button onClick={handleSubmit}
                className="flex items-center gap-2 px-7 py-2.5 rounded-full text-sm font-bold text-white transition-opacity hover:opacity-90"
                style={{ background: '#16A34A', fontFamily: 'Lato, sans-serif', boxShadow: '0 4px 12px rgba(22,163,74,0.35)' }}>
                <Check size={14} strokeWidth={3} /> Add Teacher
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Quick Status Change Popover ──────────────────────────────────────────────

function StatusMenu({ teacher, onStatusChange }) {
  const [open, setOpen] = useState(false)
  const options = ['Active', 'On Leave', 'Suspended'].filter(s => s !== teacher.status)
  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black transition-all"
        style={{ background: statusCfg[teacher.status]?.bg || '#6B7280', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
        {teacher.status}
        <ChevronDown size={9} strokeWidth={3} style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s' }} />
      </button>
      {open && (
        <div className="absolute right-0 top-[calc(100%+4px)] z-30 bg-white rounded-xl overflow-hidden"
          style={{ boxShadow: '0 8px 24px rgba(0,14,33,0.14)', border: '1px solid #EEF0F3', minWidth: 120 }}>
          {options.map(s => (
            <button key={s} onClick={() => { onStatusChange(teacher.id, s); setOpen(false) }}
              className="w-full text-left px-4 py-2.5 text-xs font-black transition-colors"
              style={{ color: statusCfg[s]?.text || '#374151', fontFamily: 'Lato, sans-serif' }}
              onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Set {s}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Teacher Detail ───────────────────────────────────────────────────────────

const MONTHLY = ['Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar']

function TeacherDetail({ teacher, onBack }) {
  const monthly = MONTHLY.map((m, i) => ({
    month: m,
    rate: Math.min(100, Math.max(60, teacher.attendance + (i % 3 === 0 ? -4 : i % 3 === 1 ? 2 : -1))),
  }))
  return (
    <div className="max-w-[900px] space-y-5">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-black transition-opacity hover:opacity-70"
        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Teachers
      </button>

      {/* Hero card */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 2px 16px rgba(0,35,51,0.07)' }}>
        <div className="h-24" style={{ background: `linear-gradient(120deg, ${NAVY} 0%, ${ACCENT} 100%)` }} />
        <div className="px-6 pb-6 bg-white" style={{ marginTop: -40 }}>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div className="flex items-end gap-4">
              <div className="rounded-2xl overflow-hidden flex-shrink-0" style={{ border: '4px solid #fff', boxShadow: '0 4px 16px rgba(0,35,51,0.12)' }}>
                <Avatar name={teacher.name} gender={teacher.gender} photoId={teacher.photoId} size={80} />
              </div>
              <div className="pb-1">
                <h2 className="text-xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</h2>
                <p className="text-xs font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{teacher.empId} · {teacher.subject}</p>
                <div className="flex items-center gap-2 mt-2">
                  <StatusBadge status={teacher.status} />
                  <span className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Joined {teacher.joined}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-1">
              <a href={`tel:${teacher.phone}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-white"
                style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                <Phone size={12} strokeWidth={2.5} /> Call
              </a>
              <a href={`mailto:${teacher.email}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black"
                style={{ background: '#F4F6F8', color: NAVY, border: '1px solid #E2E8F0', fontFamily: 'Lato, sans-serif' }}>
                <Mail size={12} strokeWidth={2.5} /> Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Attendance Rate',   value: `${teacher.attendance}%`, color: teacher.attendance >= 90 ? '#16A34A' : '#D97706', icon: CalendarCheck },
          { label: 'Classes Assigned',  value: teacher.classes.length,  color: ACCENT, icon: BookOpen },
          { label: 'Last Report',       value: teacher.lastReport,      color: NAVY, icon: FileText },
          { label: 'Employment Status', value: teacher.status,          color: statusCfg[teacher.status]?.text || '#6B7280', icon: Award },
        ].map(k => {
          const Icon = k.icon
          return (
            <div key={k.label} className="rounded-2xl p-4 flex items-center gap-3"
              style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${k.color}15` }}>
                <Icon size={16} style={{ color: k.color }} strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-sm font-black text-[#002333] leading-none" style={{ fontFamily: 'Sora, sans-serif' }}>{k.value}</p>
                <p className="text-[10px] font-bold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>{k.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Contact */}
        <div className="bg-white rounded-2xl p-5 space-y-1" style={{ border: '1px solid #EEF0F3' }}>
          <p className="text-sm font-black text-[#002333] mb-3 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <Phone size={14} strokeWidth={2.5} style={{ color: ACCENT }} /> Contact & Personal
          </p>
          {[
            { label: 'Phone',    value: teacher.phone },
            { label: 'Email',    value: teacher.email },
            { label: 'Joined',   value: teacher.joined },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between py-2.5"
              style={{ borderBottom: '1px solid #F4F6F8' }}>
              <span className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.label}</span>
              <span className="text-sm font-bold text-[#002333] max-w-[200px] truncate text-right" style={{ fontFamily: 'Lato, sans-serif' }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Classes */}
        <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <p className="text-sm font-black text-[#002333] mb-3 flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <BookOpen size={14} strokeWidth={2.5} style={{ color: ACCENT }} /> Class Assignments
          </p>
          <div className="grid grid-cols-2 gap-2">
            {teacher.classes.map(cls => (
              <div key={cls} className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                style={{ background: `${ACCENT}08`, border: `1px solid ${ACCENT}22` }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: ACCENT }} />
                <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{cls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Attendance */}
      <div className="bg-white rounded-2xl p-5" style={{ border: '1px solid #EEF0F3' }}>
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-black text-[#002333] flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            <TrendingUp size={14} strokeWidth={2.5} style={{ color: ACCENT }} /> Monthly Attendance — 1st Semester 2025–26
          </p>
          <span className="text-lg font-black" style={{ color: teacher.attendance >= 90 ? '#16A34A' : '#D97706', fontFamily: 'Sora, sans-serif' }}>
            {teacher.attendance}% avg
          </span>
        </div>
        <div className="flex items-end gap-2">
          {monthly.map(m => {
            const color = m.rate >= 90 ? ACCENT : m.rate >= 75 ? '#D97706' : RED
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-black" style={{ color, fontFamily: 'Lato, sans-serif' }}>{m.rate}%</span>
                <div className="w-full rounded-t-lg" style={{ height: Math.round((m.rate / 100) * 80), background: color, opacity: 0.85, minHeight: 8 }} />
                <span className="text-[9px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{m.month}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PrincipalTeachers() {
  const [teachers, setTeachers]         = useState(principalTeachers)
  const [selected, setSelected]         = useState(null)
  const [search, setSearch]             = useState('')
  const [statusFilter, setStatus]       = useState('All')
  const [subjectFilter, setSubject]     = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [page, setPage]                 = useState(1)

  useEffect(() => { setPage(1) }, [search, statusFilter, subjectFilter])

  const selectedTeacher = selected ? teachers.find(t => t.id === selected) : null
  if (selectedTeacher) return <TeacherDetail teacher={selectedTeacher} onBack={() => setSelected(null)} />

  const allSubjects = ['All', ...Array.from(new Set(teachers.map(t => t.subject))).sort()]

  const filtered = teachers.filter(t => {
    const q = search.toLowerCase()
    return (
      (t.name.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.empId.toLowerCase().includes(q)) &&
      (statusFilter === 'All' || t.status === statusFilter) &&
      (subjectFilter === 'All' || t.subject === subjectFilter)
    )
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const activeCount  = teachers.filter(t => t.status === 'Active').length
  const leaveCount   = teachers.filter(t => t.status === 'On Leave').length
  const avgAttend    = Math.round(teachers.reduce((s, t) => s + t.attendance, 0) / teachers.length)

  const handleStatusChange = (id, newStatus) =>
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))

  const handleAdd = (teacher) =>
    setTeachers(prev => [...prev, teacher])

  return (
    <div className="space-y-5 max-w-[1280px]">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Teachers & Staff</h2>
          <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
            {teachers.length} staff members · St. Mark's Demonstration School
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
          style={{ background: ACCENT, fontFamily: 'Lato, sans-serif', boxShadow: '0 4px 12px rgba(3,103,160,0.30)' }}>
          <UserPlus size={16} strokeWidth={2.5} /> Add Teacher
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-4 gap-4">
        <Stat label="Total Staff"      value={teachers.length}   color={ACCENT}    sub="Registered" />
        <Stat label="Active"           value={activeCount}        color="#16A34A"   sub="Currently teaching" />
        <Stat label="On Leave / Suspended" value={leaveCount + (teachers.length - activeCount - leaveCount)} color="#D97706" sub="Not in class" />
        <Stat label="Avg Attendance"   value={`${avgAttend}%`}   color={avgAttend >= 90 ? '#16A34A' : '#D97706'} sub="This semester" />
      </div>

      <div className="flex gap-5">
        {/* ── Filter Sidebar ── */}
        <div className="w-52 flex-shrink-0">
          <div className="bg-white rounded-2xl p-4 space-y-4"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
            <p className="text-xs font-black uppercase tracking-wider text-[#002333]"
              style={{ fontFamily: 'Lato, sans-serif' }}>Filters</p>

            <div className="relative">
              <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
              <input type="text" placeholder="Name, subject, ID…"
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs outline-none rounded-xl"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Status</p>
              <div className="space-y-0.5">
                {['All', 'Active', 'On Leave', 'Suspended'].map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                    style={{
                      background: statusFilter === s ? 'rgba(3,103,160,0.10)' : 'transparent',
                      color: statusFilter === s ? ACCENT : '#374151',
                      fontFamily: 'Lato, sans-serif', fontWeight: statusFilter === s ? 800 : 600,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-black uppercase text-[#9CA3AF] mb-2" style={{ fontFamily: 'Lato, sans-serif' }}>Subject</p>
              <div className="space-y-0.5 max-h-48 overflow-y-auto">
                {allSubjects.map(s => (
                  <button key={s} onClick={() => setSubject(s)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors"
                    style={{
                      background: subjectFilter === s ? 'rgba(3,103,160,0.10)' : 'transparent',
                      color: subjectFilter === s ? ACCENT : '#374151',
                      fontFamily: 'Lato, sans-serif', fontWeight: subjectFilter === s ? 800 : 600,
                    }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2" style={{ borderTop: '1px solid #EEF0F3' }}>
              <p className="text-[11px] font-bold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                {filtered.length} of {teachers.length} teachers
              </p>
            </div>
          </div>
        </div>

        {/* ── Table ── */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="bg-white rounded-2xl overflow-hidden"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: '#BFD9F2' }}>
                  {['Teacher', 'ID', 'Subject', 'Classes', 'Attendance', 'Status', 'Last Report', 'Actions'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#0F172A]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr><td colSpan={8} className="text-center py-12 text-sm font-semibold text-[#9CA3AF]"
                    style={{ fontFamily: 'Lato, sans-serif' }}>No teachers match the filters.</td></tr>
                ) : paginated.map((t, i) => {
                  const attColor = t.attendance >= 90 ? '#16A34A' : t.attendance >= 75 ? '#D97706' : RED
                  return (
                    <tr key={t.id} style={{ borderTop: '1px solid #F4F6F8', background: i % 2 === 0 ? '#fff' : '#F8FAFC' }}>
                      {/* Teacher */}
                      <td className="px-4 py-3 cursor-pointer" onClick={() => setSelected(t.id)}>
                        <div className="flex items-center gap-2.5">
                          <Avatar name={t.name} gender={t.gender} photoId={t.photoId} size={36} />
                          <div>
                            <p className="text-sm font-bold text-[#002333] hover:underline" style={{ fontFamily: 'Lato, sans-serif' }}>{t.name}</p>
                          </div>
                        </div>
                      </td>
                      {/* ID */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-black text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{t.empId}</span>
                      </td>
                      {/* Subject */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-black px-2.5 py-1 rounded-full"
                          style={{ background: `${ACCENT}12`, color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                          {t.subject}
                        </span>
                      </td>
                      {/* Classes */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {t.classes.slice(0, 2).map(c => (
                            <span key={c} className="text-[9px] font-black px-1.5 py-0.5 rounded"
                              style={{ background: '#F4F6F8', color: NAVY, fontFamily: 'Lato, sans-serif' }}>
                              {c}
                            </span>
                          ))}
                          {t.classes.length > 2 && (
                            <span className="text-[9px] font-black px-1.5 py-0.5 rounded"
                              style={{ background: `${ACCENT}15`, color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                              +{t.classes.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      {/* Attendance */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 min-w-[80px]">
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
                            <div className="h-full rounded-full" style={{ width: `${t.attendance}%`, background: attColor }} />
                          </div>
                          <span className="text-xs font-black w-9 text-right" style={{ color: attColor, fontFamily: 'Lato, sans-serif' }}>
                            {t.attendance}%
                          </span>
                        </div>
                      </td>
                      {/* Status — clickable dropdown */}
                      <td className="px-4 py-3">
                        <StatusMenu teacher={t} onStatusChange={handleStatusChange} />
                      </td>
                      {/* Last Report */}
                      <td className="px-4 py-3 text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {t.lastReport}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button onClick={() => setSelected(t.id)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                            style={{ background: `${ACCENT}12`, color: ACCENT }}
                            onMouseEnter={e => e.currentTarget.style.background = `${ACCENT}22`}
                            onMouseLeave={e => e.currentTarget.style.background = `${ACCENT}12`}
                            title="View profile">
                            <MoreVertical size={13} strokeWidth={2.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex items-center justify-between px-5 py-3"
              style={{ borderTop: '1px solid #F4F6F8', background: '#F8FAFC' }}>
              <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                {filtered.length === 0 ? 'No records' : `Showing ${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)} of ${filtered.length}`}
              </p>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: page === 1 ? '#F4F6F8' : '#EEF0F3', color: page === 1 ? '#C4C9D4' : '#374151' }}>
                  <ChevronLeft size={14} strokeWidth={2.5} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce((acc, p, idx, arr) => {
                    if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…')
                    acc.push(p)
                    return acc
                  }, [])
                  .map((p, i) => typeof p === 'string' ? (
                    <span key={`e${i}`} className="text-xs text-[#9CA3AF] px-1">…</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p)}
                      className="w-8 h-8 rounded-lg text-xs font-black"
                      style={{ background: page === p ? ACCENT : '#F4F6F8', color: page === p ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
                      {p}
                    </button>
                  ))
                }
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: page === totalPages ? '#F4F6F8' : '#EEF0F3', color: page === totalPages ? '#C4C9D4' : '#374151' }}>
                  <ChevronRight size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && <AddTeacherModal onClose={() => setShowAddModal(false)} onAdd={handleAdd} />}
    </div>
  )
}
