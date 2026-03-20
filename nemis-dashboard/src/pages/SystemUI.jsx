import { useState, useRef, useEffect } from 'react'
import { X, Lock, Unlock, Eye, EyeOff, Cloud, CloudOff, Loader, Copy, Check } from 'lucide-react'
import { supabase } from '../lib/supabase'

const NAVY          = '#002333'
const ACCENT        = '#0367A0'
const EDIT_PASSWORD = '@nemis2026'   // ← change this to your preferred password

/* ── Initial color data ── */
const INITIAL_COLOR_GROUPS = [
  {
    id: 'brand',
    label: 'Brand Core',
    colors: [
      { id: 'c1', name: 'Sidebar / Dark BG',  hex: '#000E21', usage: 'Sidebar background, deepest surface' },
      { id: 'c2', name: 'Navy',               hex: '#002333', usage: 'Primary text, headings, strong elements' },
      { id: 'c3', name: 'Accent Blue',        hex: '#0367A0', usage: 'Buttons, active nav, CTAs, badges' },
      { id: 'c4', name: 'Banner Gradient 1',  hex: '#001a35', usage: 'Welcome banner gradient mid-stop' },
      { id: 'c5', name: 'Banner Gradient 2',  hex: '#002d5c', usage: 'Welcome banner gradient end-stop' },
    ],
  },
  {
    id: 'status',
    label: 'Status & Feedback',
    colors: [
      { id: 's1', name: 'Success Green',  hex: '#16A34A', usage: 'Approved, compliant, positive actions' },
      { id: 's2', name: 'Active Dot',     hex: '#48D08C', usage: 'Online indicator, active status dot' },
      { id: 's3', name: 'Warning Orange', hex: '#D97706', usage: 'Pending, warnings, attention needed' },
      { id: 's4', name: 'Warning Alt',    hex: '#F59E0B', usage: 'Offline status, secondary warning' },
      { id: 's5', name: 'Error Red',      hex: '#A60003', usage: 'Rejected, critical actions, errors' },
      { id: 's6', name: 'Info Blue',      hex: '#2563EB', usage: 'Informational accents, data analyst role' },
      { id: 's7', name: 'Purple',         hex: '#7C3AED', usage: 'Teacher supervisor badge, accents' },
    ],
  },
  {
    id: 'surface',
    label: 'Surface & Neutral',
    colors: [
      { id: 'n1', name: 'Page Background', hex: '#F4F6F8', usage: 'Main content area background' },
      { id: 'n2', name: 'Card Background', hex: '#ffffff', usage: 'Cards, modals, clean surfaces' },
      { id: 'n3', name: 'Alt Row',         hex: '#F8FAFC', usage: 'Table row stripes, secondary surface' },
      { id: 'n4', name: 'Card Border',     hex: '#EEF0F3', usage: 'Card borders, dividers' },
      { id: 'n5', name: 'Section Divider', hex: '#E2E8F0', usage: 'Section lines, table borders' },
    ],
  },
  {
    id: 'text',
    label: 'Text Hierarchy',
    colors: [
      { id: 't1', name: 'Text — Primary',   hex: '#002333', usage: 'Headings, bold labels, names' },
      { id: 't2', name: 'Text — Secondary', hex: '#4B5563', usage: 'Body text, descriptions' },
      { id: 't3', name: 'Text — Muted',     hex: '#6B7280', usage: 'Subtitles, secondary info' },
      { id: 't4', name: 'Text — Faint',     hex: '#9CA3AF', usage: 'Timestamps, placeholders, hints' },
      { id: 't5', name: 'Text — Lightest',  hex: '#C4CAD4', usage: 'Very faint tertiary text' },
    ],
  },
]

const STATUS_BADGES = [
  { label: 'Approved',  bg: 'rgba(72,208,140,0.1)',  color: '#16A34A' },
  { label: 'Pending',   bg: 'rgba(245,158,11,0.1)',  color: '#D97706' },
  { label: 'Rejected',  bg: 'rgba(166,0,3,0.1)',     color: '#A60003' },
  { label: 'Submitted', bg: 'rgba(3,103,160,0.10)',  color: '#0367A0' },
  { label: 'Completed', bg: 'rgba(0,35,51,0.08)',    color: '#002333' },
  { label: 'Overdue',   bg: 'rgba(166,0,3,0.1)',     color: '#A60003' },
]

const ROLE_BADGES = [
  { label: 'School Admin',       bg: 'rgba(72,208,140,0.1)',  color: '#16A34A' },
  { label: 'Finance Manager',    bg: 'rgba(245,158,11,0.1)',  color: '#D97706' },
  { label: 'Teacher Supervisor', bg: 'rgba(139,92,246,0.1)', color: '#7C3AED' },
  { label: 'Data Analyst',       bg: 'rgba(59,130,246,0.1)', color: '#2563EB' },
  { label: 'District Officer',   bg: 'rgba(0,35,51,0.07)',   color: '#002333' },
]

/* ── Initial font data ── */
const INITIAL_FONT_FAMILIES = [
  {
    id: 'sora',
    name: 'Sora',
    role: 'Headings & Display',
    usage: 'Page titles, KPI numbers, card headings, names, high-impact text',
    style: 'Sora, sans-serif',
    samples: [
      { id: 'sa1', label: 'Display',    size: 32, weight: 900, text: 'Grand Bassa NEMIS' },
      { id: 'sa2', label: 'Title',      size: 24, weight: 900, text: 'Dashboard Overview' },
      { id: 'sa3', label: 'Heading',    size: 18, weight: 700, text: 'School Management Portal' },
      { id: 'sa4', label: 'Subheading', size: 15, weight: 700, text: 'Student Enrollment Report' },
      { id: 'sa5', label: 'KPI Number', size: 28, weight: 900, text: '4,812' },
    ],
  },
  {
    id: 'lato',
    name: 'Lato',
    role: 'UI Controls & Labels',
    usage: 'Navigation, buttons, badges, form labels, table headers, small text',
    style: 'Lato, sans-serif',
    samples: [
      { id: 'lb1', label: 'Nav Item',     size: 13, weight: 600, text: 'User Management' },
      { id: 'lb2', label: 'Button',       size: 14, weight: 700, text: 'Add New School' },
      { id: 'lb3', label: 'Table Header', size: 11, weight: 900, text: 'STUDENT NAME · CLASS · STATUS' },
      { id: 'lb4', label: 'Badge',        size: 11, weight: 700, text: 'APPROVED' },
      { id: 'lb5', label: 'Timestamp',    size: 11, weight: 500, text: 'Mar 18, 2026 · 09:42 AM' },
      { id: 'lb6', label: 'Hint',         size: 10, weight: 600, text: 'Last updated 2 hours ago' },
    ],
  },
  {
    id: 'roboto',
    name: 'Roboto',
    role: 'Body & Descriptions',
    usage: 'Paragraphs, descriptions, secondary content, form helper text',
    style: 'Roboto, sans-serif',
    samples: [
      { id: 'rc1', label: 'Body',      size: 14, weight: 500, text: 'This report summarises student enrollment across all 47 registered schools in Grand Bassa County.' },
      { id: 'rc2', label: 'Secondary', size: 13, weight: 400, text: 'Data sourced from NEMIS central registry, Ministry of Education Liberia.' },
      { id: 'rc3', label: 'Caption',   size: 12, weight: 500, text: 'Figures are based on the 2025–26 academic year, aligned to MOE and WAEC standards.' },
    ],
  },
]

const WEIGHT_OPTIONS = [100, 200, 300, 400, 500, 600, 700, 800, 900]

/* ── Helpers ── */
function isValidHex(hex) {
  return /^#[0-9A-Fa-f]{6}$/.test(hex)
}

function luma(hex) {
  if (!isValidHex(hex)) return 128
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

/* ── Password Modal ── */
function PasswordModal({ onSuccess, onClose }) {
  const [pw,      setPw]      = useState('')
  const [showPw,  setShowPw]  = useState(false)
  const [error,   setError]   = useState(false)
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  const handleKey = (e) => { if (e.key === 'Escape') onClose() }

  const attempt = () => {
    if (pw === EDIT_PASSWORD) { setError(false); onSuccess() }
    else { setError(true); setPw('') }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.50)' }}
      onClick={onClose}
    >
      <div
        className="rounded-2xl p-7 w-full"
        style={{ maxWidth: 360, background: '#fff', boxShadow: '0 16px 48px rgba(0,35,51,0.18)' }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKey}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: NAVY }}>
              <Lock size={16} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Unlock Editor</p>
              <p className="text-[11px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Enter the edit password</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#F4F6F8', color: '#6B7280' }}>
            <X size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-3">
          <input
            ref={inputRef}
            type={showPw ? 'text' : 'password'}
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false) }}
            onKeyDown={e => e.key === 'Enter' && attempt()}
            placeholder="Password"
            className="w-full rounded-xl px-4 py-3 text-[14px] font-black outline-none"
            style={{
              fontFamily: 'Lato, sans-serif',
              border: `2px solid ${error ? '#A60003' : '#E2E8F0'}`,
              color: NAVY,
              paddingRight: 44,
            }}
          />
          <button
            type="button"
            onClick={() => setShowPw(p => !p)}
            tabIndex={-1}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: '#9CA3AF', background: 'none', border: 'none', cursor: 'pointer' }}>
            {showPw ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
          </button>
        </div>

        {error && (
          <p className="text-[12px] font-black mb-3" style={{ color: '#A60003', fontFamily: 'Lato, sans-serif' }}>
            Incorrect password. Try again.
          </p>
        )}

        <button
          onClick={attempt}
          className="w-full rounded-xl py-3 text-[14px] font-black text-white"
          style={{ background: NAVY, fontFamily: 'Sora, sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#003a52' }}
          onMouseLeave={e => { e.currentTarget.style.background = NAVY }}
        >
          Unlock
        </button>
      </div>
    </div>
  )
}

/* ── Interactive Color Swatch ── */
function ColorSwatch({ color, onUpdate, onRemove, editable }) {
  const [draft,   setDraft]   = useState(color.hex)
  const [hovered, setHovered] = useState(false)
  const [copied,  setCopied]  = useState(false)
  const pickerRef = useRef(null)

  const liveHex  = isValidHex(draft) ? draft : color.hex
  const dark     = luma(liveHex) < 140
  const hexValid = isValidHex(draft)

  const handleText = (val) => {
    const v = val.startsWith('#') ? val : '#' + val
    setDraft(v)
    if (isValidHex(v)) onUpdate('hex', v)
  }

  const handlePicker = (val) => {
    setDraft(val)
    onUpdate('hex', val)
  }

  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(liveHex.toUpperCase())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{ border: '1px solid #EEF0F3' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* Copy button — always visible */}
      <button
        onClick={handleCopy}
        title="Copy hex code"
        className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all"
        style={{
          background: copied ? 'rgba(22,163,74,0.85)' : 'rgba(0,0,0,0.45)',
        }}
      >
        {copied
          ? <Check size={11} color="#fff" strokeWidth={3} />
          : <Copy  size={12} color="#fff" strokeWidth={3} />}
      </button>

      {/* Delete button — only when editable + hovered */}
      {editable && (
        <button
          onClick={onRemove}
          title="Remove color"
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all"
          style={{
            background: hovered ? 'rgba(166,0,3,0.80)' : 'rgba(0,0,0,0.35)',
            opacity: hovered ? 1 : 0,
            pointerEvents: hovered ? 'auto' : 'none',
          }}
        >
          <X size={11} color="#fff" strokeWidth={3} />
        </button>
      )}

      {/* Color preview */}
      <div
        className="flex items-end px-4 py-5 relative"
        style={{ background: liveHex, minHeight: 80, cursor: editable ? 'pointer' : 'default' }}
        onClick={() => editable && pickerRef.current?.click()}
        title={editable ? 'Click to open color picker' : undefined}
      >
        {editable && (
          <input
            ref={pickerRef}
            type="color"
            value={liveHex}
            onChange={e => handlePicker(e.target.value)}
            className="absolute opacity-0 w-0 h-0 pointer-events-none"
            tabIndex={-1}
          />
        )}
        <span className="text-[15px] font-black tracking-wide select-none"
          style={{ color: dark ? 'rgba(255,255,255,0.85)' : 'rgba(0,35,51,0.65)', fontFamily: 'monospace' }}>
          {liveHex.toUpperCase()}
        </span>
      </div>

      {/* Info */}
      <div className="px-3 py-3 space-y-2" style={{ background: '#fff' }}>
        {editable ? (
          <input
            type="text"
            defaultValue={color.name}
            onBlur={e => onUpdate('name', e.target.value)}
            spellCheck={false}
            placeholder="Color name"
            className="w-full text-[13px] font-black rounded-lg px-2 py-1 outline-none"
            style={{ fontFamily: 'Sora, sans-serif', background: '#F4F6F8', border: '2px solid #EEF0F3', color: NAVY }}
          />
        ) : (
          <p className="text-[13px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{color.name}</p>
        )}
        {editable ? (
          <input
            type="text"
            value={draft}
            onChange={e => handleText(e.target.value)}
            spellCheck={false}
            className="w-full text-[13px] font-black rounded-lg px-2.5 py-1.5 outline-none transition-colors"
            style={{
              fontFamily: 'monospace',
              background: '#F4F6F8',
              border: `2px solid ${hexValid ? '#EEF0F3' : '#A60003'}`,
              color: hexValid ? NAVY : '#A60003',
            }}
          />
        ) : (
          <p className="text-[13px] font-black" style={{ color: '#6B7280', fontFamily: 'monospace' }}>{liveHex.toUpperCase()}</p>
        )}
        <p className="text-[12px] font-black text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{color.usage}</p>
      </div>
    </div>
  )
}

/* helpers for badge bg ↔ hex conversion */
function rgbaToHex(rgba) {
  const m = rgba.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/)
  if (!m) return '#ffffff'
  return '#' + [m[1], m[2], m[3]]
    .map(n => parseInt(n).toString(16).padStart(2, '0')).join('')
}
function hexToRgba(hex, alpha = 0.1) {
  if (!isValidHex(hex)) return `rgba(0,0,0,${alpha})`
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/* ── Editable Badge (status / role) ── */
function EditableBadge({ badge, onUpdate, unlocked }) {
  const colorPickerRef = useRef(null)
  const bgPickerRef    = useRef(null)

  const bgAsHex   = rgbaToHex(badge.bg)
  const liveColor = badge.color

  return (
    <div className="flex flex-col gap-2 min-w-[140px]">
      {/* Live preview */}
      <span className="px-3 py-1 rounded-full text-[12px] font-black self-start"
        style={{ background: badge.bg, color: liveColor, fontFamily: 'Lato, sans-serif' }}>
        {badge.label}
      </span>

      {unlocked ? (
        <div className="space-y-1.5">

          {/* Text color row */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 cursor-pointer relative"
              style={{ background: isValidHex(liveColor) ? liveColor : '#ccc', border: '1.5px solid #EEF0F3' }}
              onClick={() => colorPickerRef.current?.click()}
              title="Pick text color"
            >
              <input
                ref={colorPickerRef}
                type="color"
                value={isValidHex(liveColor) ? liveColor : '#000000'}
                onChange={e => onUpdate('color', e.target.value)}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                tabIndex={-1}
              />
            </div>
            <input
              type="text"
              value={badge.color}
              onChange={e => onUpdate('color', e.target.value)}
              spellCheck={false}
              placeholder="Text color"
              className="text-[11px] font-black rounded-md px-2 py-1 outline-none flex-1"
              style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3', color: NAVY, fontFamily: 'monospace' }}
            />
          </div>

          {/* BG color row — same pattern as text color */}
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-full flex-shrink-0 cursor-pointer relative"
              style={{ background: bgAsHex, border: '1.5px solid #EEF0F3' }}
              onClick={() => bgPickerRef.current?.click()}
              title="Pick background color"
            >
              <input
                ref={bgPickerRef}
                type="color"
                value={bgAsHex}
                onChange={e => onUpdate('bg', hexToRgba(e.target.value))}
                className="absolute opacity-0 w-0 h-0 pointer-events-none"
                tabIndex={-1}
              />
            </div>
            <input
              type="text"
              value={badge.bg}
              onChange={e => onUpdate('bg', e.target.value)}
              spellCheck={false}
              placeholder="Background"
              className="text-[11px] font-black rounded-md px-2 py-1 outline-none flex-1"
              style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3', color: '#6B7280', fontFamily: 'monospace' }}
            />
          </div>

        </div>
      ) : (
        <span className="text-[13px] font-black text-[#6B7280]" style={{ fontFamily: 'monospace' }}>
          {badge.color}
        </span>
      )}
    </div>
  )
}

/* ── Section card wrapper ── */
function SectionCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
      <div className="px-6 py-4" style={{ borderBottom: '1px solid #EEF0F3', background: '#F8FAFC' }}>
        <h3 className="text-[15px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
        {subtitle && <p className="text-xs font-black text-[#374151] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{subtitle}</p>}
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

/* ── Main Page ── */
export default function SystemUI() {
  // Initialise from localStorage so the page renders instantly while Supabase loads
  const [groups,       setGroups]       = useState(() => { try { const s = localStorage.getItem('sui_colors'); return s ? JSON.parse(s) : INITIAL_COLOR_GROUPS } catch { return INITIAL_COLOR_GROUPS } })
  const [fonts,        setFonts]        = useState(() => { try { const s = localStorage.getItem('sui_fonts');  return s ? JSON.parse(s) : INITIAL_FONT_FAMILIES } catch { return INITIAL_FONT_FAMILIES } })
  const [statusBadges, setStatusBadges] = useState(() => { try { const s = localStorage.getItem('sui_status'); return s ? JSON.parse(s) : STATUS_BADGES } catch { return STATUS_BADGES } })
  const [roleBadges,   setRoleBadges]   = useState(() => { try { const s = localStorage.getItem('sui_roles');  return s ? JSON.parse(s) : ROLE_BADGES } catch { return ROLE_BADGES } })
  const [unlocked,     setUnlocked]     = useState(false)
  const [showModal,    setShowModal]    = useState(false)
  const [syncStatus,   setSyncStatus]   = useState('loading') // 'loading'|'idle'|'saving'|'saved'|'error'

  const mounted = useRef(false)   // prevents saving during the initial Supabase load
  const timers  = useRef({})      // per-key debounce timers

  /* ── Load from Supabase on mount (source of truth) ── */
  useEffect(() => {
    async function load() {
      if (!supabase) { mounted.current = true; setSyncStatus('idle'); return }
      setSyncStatus('loading')
      const { data, error } = await supabase
        .from('system_ui_config')
        .select('key, value')
      if (!error && data?.length) {
        data.forEach(row => {
          if (row.key === 'colors' && row.value) { setGroups(row.value);       localStorage.setItem('sui_colors', JSON.stringify(row.value)) }
          if (row.key === 'fonts'  && row.value) { setFonts(row.value);        localStorage.setItem('sui_fonts',  JSON.stringify(row.value)) }
          if (row.key === 'status' && row.value) { setStatusBadges(row.value); localStorage.setItem('sui_status', JSON.stringify(row.value)) }
          if (row.key === 'roles'  && row.value) { setRoleBadges(row.value);   localStorage.setItem('sui_roles',  JSON.stringify(row.value)) }
        })
      }
      mounted.current = true
      setSyncStatus('idle')
    }
    load()
  }, [])

  /* ── Realtime subscription — push changes to all connected devices ── */
  useEffect(() => {
    if (!supabase) return
    const channel = supabase
      .channel('system_ui_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'system_ui_config' }, (payload) => {
        const { key, value } = payload.new
        if (!value) return
        // Skip if this device has a pending save for this key (user is mid-edit)
        if (timers.current[key]) return
        if (key === 'colors') { setGroups(value);       localStorage.setItem('sui_colors', JSON.stringify(value)) }
        if (key === 'fonts')  { setFonts(value);        localStorage.setItem('sui_fonts',  JSON.stringify(value)) }
        if (key === 'status') { setStatusBadges(value); localStorage.setItem('sui_status', JSON.stringify(value)) }
        if (key === 'roles')  { setRoleBadges(value);   localStorage.setItem('sui_roles',  JSON.stringify(value)) }
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  /* ── Debounced save to Supabase + localStorage ── */
  function schedSave(key, value) {
    const lsKey = key === 'colors' ? 'sui_colors' : key === 'fonts' ? 'sui_fonts' : key === 'status' ? 'sui_status' : 'sui_roles'
    localStorage.setItem(lsKey, JSON.stringify(value))
    if (!supabase) return          // no credentials — localStorage only
    clearTimeout(timers.current[key])
    setSyncStatus('saving')
    timers.current[key] = setTimeout(async () => {
      const { error } = await supabase
        .from('system_ui_config')
        .upsert({ key, value, updated_at: new Date().toISOString() })
      setSyncStatus(error ? 'error' : 'saved')
      if (!error) setTimeout(() => setSyncStatus('idle'), 2500)
    }, 900)
  }

  useEffect(() => { if (mounted.current) schedSave('colors', groups)       }, [groups])       // eslint-disable-line
  useEffect(() => { if (mounted.current) schedSave('fonts',  fonts)         }, [fonts])        // eslint-disable-line
  useEffect(() => { if (mounted.current) schedSave('status', statusBadges)  }, [statusBadges]) // eslint-disable-line
  useEffect(() => { if (mounted.current) schedSave('roles',  roleBadges)    }, [roleBadges])   // eslint-disable-line

  const updateBadge = (setter) => (idx, field, value) =>
    setter(prev => prev.map((b, i) => i !== idx ? b : { ...b, [field]: value }))

  /* color helpers */
  const updateColor = (groupId, colorId, field, value) =>
    setGroups(prev => prev.map(g =>
      g.id !== groupId ? g : { ...g, colors: g.colors.map(c => c.id !== colorId ? c : { ...c, [field]: value }) }
    ))

  const removeColor = (groupId, colorId) =>
    setGroups(prev => prev.map(g =>
      g.id !== groupId ? g : { ...g, colors: g.colors.filter(c => c.id !== colorId) }
    ))

  /* font helpers */
  const updateSample = (fontId, sampleId, field, rawValue) => {
    const value = field === 'size' || field === 'weight' ? Number(rawValue) : rawValue
    setFonts(prev => prev.map(f =>
      f.id !== fontId ? f : { ...f, samples: f.samples.map(s => s.id !== sampleId ? s : { ...s, [field]: value }) }
    ))
  }

  return (
    <div className="space-y-8 max-w-[1080px]">

      {/* Password modal */}
      {showModal && (
        <PasswordModal
          onSuccess={() => { setUnlocked(true); setShowModal(false) }}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Page header */}
      <div className="rounded-2xl px-8 py-7 flex items-center justify-between gap-6" style={{ background: '#000E21' }}>
        <div>
          <p className="text-[11px] font-black uppercase tracking-widest mb-2"
            style={{ color: 'rgba(3,103,160,0.80)', fontFamily: 'Lato, sans-serif' }}>
            Grand Bassa NEMIS · CEO Dashboard
          </p>
          <h1 className="text-[28px] font-black text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            System UI Guide
          </h1>
          <p className="text-sm font-semibold mt-2" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Lato, sans-serif' }}>
            {unlocked
              ? 'Edit mode active — click swatches, edit hex codes, adjust font sizes, or remove cards.'
              : 'View mode — unlock to edit colors and typography.'}
          </p>
        </div>

        {/* Right side: sync pill + lock button */}
        <div className="flex flex-col items-end gap-3 flex-shrink-0">

          {/* Sync status pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: syncStatus === 'error'   ? 'rgba(166,0,3,0.25)'
                        : syncStatus === 'saved'   ? 'rgba(22,163,74,0.20)'
                        : syncStatus === 'saving'  ? 'rgba(3,103,160,0.20)'
                        : syncStatus === 'loading' ? 'rgba(255,255,255,0.08)'
                        : 'rgba(255,255,255,0.06)',
            }}>
            {syncStatus === 'loading' && <Loader size={11} strokeWidth={3} className="animate-spin" style={{ color: 'rgba(255,255,255,0.45)' }} />}
            {syncStatus === 'saving'  && <Loader size={11} strokeWidth={3} className="animate-spin" style={{ color: '#7EC8F4' }} />}
            {syncStatus === 'saved'   && <Cloud  size={11} strokeWidth={3} style={{ color: '#4ade80' }} />}
            {syncStatus === 'error'   && <CloudOff size={11} strokeWidth={3} style={{ color: '#ff6b6b' }} />}
            {syncStatus === 'idle'    && <Cloud    size={11} strokeWidth={3} style={{ color: supabase ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.20)' }} />}
            <span className="text-[11px] font-black"
              style={{
                fontFamily: 'Lato, sans-serif',
                color: syncStatus === 'error'   ? '#ff6b6b'
                     : syncStatus === 'saved'   ? '#4ade80'
                     : syncStatus === 'saving'  ? '#7EC8F4'
                     : syncStatus === 'loading' ? 'rgba(255,255,255,0.45)'
                     : 'rgba(255,255,255,0.25)',
              }}>
              {syncStatus === 'loading' ? 'Loading…'
             : syncStatus === 'saving'  ? 'Saving…'
             : syncStatus === 'saved'   ? 'Saved to cloud'
             : syncStatus === 'error'   ? 'Save failed'
             : supabase                 ? 'Cloud sync on'
             : 'Local only'}
            </span>
          </div>

          {/* Lock / Unlock button */}
          <button
            onClick={() => unlocked ? setUnlocked(false) : setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: unlocked ? 'rgba(166,0,3,0.20)' : 'rgba(3,103,160,0.25)',
              color: unlocked ? '#ff6b6b' : '#7EC8F4',
              fontFamily: 'Lato, sans-serif',
              fontWeight: 800,
              fontSize: 13,
              border: `1.5px solid ${unlocked ? 'rgba(166,0,3,0.35)' : 'rgba(3,103,160,0.40)'}`,
            }}
          >
          {unlocked
            ? <><Lock size={14} strokeWidth={2.5} /> Lock</>
            : <><Unlock size={14} strokeWidth={2.5} /> Unlock to Edit</>}
          </button>
        </div>{/* end right-side wrapper */}
      </div>{/* end header banner */}

      {/* ── COLORS ── */}
      <div>
        <h2 className="text-[13px] font-black uppercase tracking-widest mb-4"
          style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
          01 — Color System
        </h2>

        <div className="space-y-6">
          {groups.map(group => (
            <SectionCard key={group.id} title={group.label}
              subtitle={unlocked ? 'Click swatch to pick · Edit hex directly · Hover card to delete' : 'Unlock to edit'}>
              {group.colors.length === 0
                ? <p className="text-sm font-black text-[#4B5563] italic" style={{ fontFamily: 'Lato, sans-serif' }}>All cards removed.</p>
                : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {group.colors.map(c => (
                      <ColorSwatch
                        key={c.id}
                        color={c}
                        editable={unlocked}
                        onUpdate={(field, val) => updateColor(group.id, c.id, field, val)}
                        onRemove={() => removeColor(group.id, c.id)}
                      />
                    ))}
                  </div>
                )
              }
            </SectionCard>
          ))}

          {/* Status badges */}
          <SectionCard title="Status Tokens"
            subtitle={unlocked ? 'Click dot to pick text color · Edit bg value directly' : 'Used on records, approvals, requests'}>
            <div className="flex flex-wrap gap-6">
              {statusBadges.map((b, i) => (
                <EditableBadge
                  key={b.label}
                  badge={b}
                  unlocked={unlocked}
                  onUpdate={(field, val) => updateBadge(setStatusBadges)(i, field, val)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Role badges */}
          <SectionCard title="Role Badges"
            subtitle={unlocked ? 'Click dot to pick text color · Edit bg value directly' : 'User role indicators across the system'}>
            <div className="flex flex-wrap gap-6">
              {roleBadges.map((b, i) => (
                <EditableBadge
                  key={b.label}
                  badge={b}
                  unlocked={unlocked}
                  onUpdate={(field, val) => updateBadge(setRoleBadges)(i, field, val)}
                />
              ))}
            </div>
          </SectionCard>

          {/* Shadow tokens */}
          <SectionCard title="Shadow Tokens" subtitle="Box shadows used on surfaces and overlays">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Card Default',  shadow: '0 1px 4px rgba(0,35,51,0.05)',   desc: 'Resting card state' },
                { label: 'Card Hover',    shadow: '0 6px 24px rgba(0,35,51,0.10)',  desc: 'Interactive card hover' },
                { label: 'Modal / Panel', shadow: '0 12px 40px rgba(0,35,51,0.14)', desc: 'Modals, drawers, drop-downs' },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-5 flex flex-col gap-3 items-start"
                  style={{ background: '#fff', boxShadow: s.shadow, border: '1px solid #EEF0F3' }}>
                  <p className="text-[13px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.label}</p>
                  <code className="text-[12px] font-black text-[#0367A0] bg-[#F4F6F8] px-2 py-1.5 rounded-md"
                    style={{ fontFamily: 'monospace' }}>{s.shadow}</code>
                  <p className="text-[12px] text-[#374151] font-black" style={{ fontFamily: 'Lato, sans-serif' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── TYPOGRAPHY ── */}
      <div>
        <h2 className="text-[13px] font-black uppercase tracking-widest mb-4"
          style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
          02 — Typography System
        </h2>

        <div className="space-y-6">
          {fonts.map((family) => (
            <SectionCard
              key={family.id}
              title={family.name}
              subtitle={`${family.role} — ${family.usage}`}
            >
              {/* Family specimen bar */}
              <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: '1px solid #EEF0F3' }}>
                <div className="px-3 py-1.5 rounded-lg" style={{ background: 'rgba(3,103,160,0.08)' }}>
                  <span className="text-[14px] font-black"
                    style={{ color: ACCENT, fontFamily: family.style }}>
                    Aa Bb Cc — {family.name}
                  </span>
                </div>
                <span className="text-[12px] font-black text-[#374151]" style={{ fontFamily: 'monospace' }}>
                  {family.style}
                </span>
              </div>

              {/* Sample rows — editable */}
              <div className="space-y-5">
                {family.samples.map((s, si) => (
                  <div key={s.id} className="flex items-start gap-4"
                    style={{
                      borderBottom: si < family.samples.length - 1 ? '1px solid #F4F6F8' : 'none',
                      paddingBottom: si < family.samples.length - 1 ? 16 : 0,
                    }}>

                    {/* Meta — editable size + weight */}
                    <div className="flex-shrink-0 w-[220px]">
                      <p className="text-[13px] font-black text-[#374151] mb-2"
                        style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                      <div className="flex gap-2 flex-wrap">

                        {/* Size input */}
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg"
                          style={{ background: '#EEF0F3' }}>
                          <input
                            type="number"
                            min={8} max={96}
                            value={s.size}
                            onChange={e => updateSample(family.id, s.id, 'size', e.target.value)}
                            disabled={!unlocked}
                            className="text-[13px] font-black outline-none bg-transparent w-10 text-center"
                            style={{ color: NAVY, fontFamily: 'monospace', cursor: unlocked ? 'auto' : 'not-allowed' }}
                          />
                          <span className="text-[12px] font-black" style={{ color: NAVY, fontFamily: 'monospace' }}>px</span>
                        </div>

                        {/* Weight select */}
                        <select
                          value={s.weight}
                          onChange={e => updateSample(family.id, s.id, 'weight', e.target.value)}
                          disabled={!unlocked}
                          className="text-[13px] font-black rounded-lg px-2.5 py-1 outline-none"
                          style={{ background: '#EEF0F3', color: ACCENT, fontFamily: 'monospace', border: 'none', cursor: unlocked ? 'pointer' : 'not-allowed' }}
                        >
                          {WEIGHT_OPTIONS.map(w => (
                            <option key={w} value={w}>{w}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Live preview */}
                    <div className="flex-1 min-w-0">
                      <p style={{
                        fontFamily: family.style,
                        fontSize: s.size,
                        fontWeight: s.weight,
                        color: NAVY,
                        lineHeight: 1.35,
                        wordBreak: 'break-word',
                        transition: 'font-size 0.15s, font-weight 0.15s',
                      }}>
                        {s.text}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </SectionCard>
          ))}

          {/* Text color hierarchy */}
          <SectionCard title="Text Color Hierarchy" subtitle="Color ramp from highest to lowest emphasis">
            <div className="space-y-3">
              {[
                { level: '1 — Highest', hex: '#002333', label: 'Headings, bold labels, names' },
                { level: '2 — High',    hex: '#4B5563', label: 'Body text, descriptions' },
                { level: '3 — Medium',  hex: '#6B7280', label: 'Subtitles, secondary info' },
                { level: '4 — Low',     hex: '#9CA3AF', label: 'Timestamps, placeholders' },
                { level: '5 — Faint',   hex: '#C4CAD4', label: 'Very secondary, barely-there text' },
                { level: 'Accent',      hex: '#0367A0', label: 'Links, emphasis, active states' },
                { level: 'Inverse',     hex: '#ffffff', label: 'Text on dark / colored backgrounds', dark: true },
              ].map(row => (
                <div key={row.level} className="flex items-center gap-4 py-2 rounded-lg px-3"
                  style={{ background: row.dark ? NAVY : '#F8FAFC' }}>
                  <div className="w-5 h-5 rounded-full flex-shrink-0"
                    style={{ background: row.hex, border: '1.5px solid #EEF0F3' }} />
                  <code className="text-[14px] font-black w-24 flex-shrink-0"
                    style={{ color: row.dark ? 'rgba(255,255,255,0.80)' : NAVY, fontFamily: 'monospace' }}>
                    {row.hex}
                  </code>
                  <p className="text-[13px] font-black flex-shrink-0 w-28"
                    style={{ color: row.dark ? 'rgba(255,255,255,0.70)' : '#374151', fontFamily: 'Lato, sans-serif' }}>
                    {row.level}
                  </p>
                  <p className="text-[14px] font-black"
                    style={{ color: row.hex, fontFamily: 'Lato, sans-serif' }}>
                    {row.label}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

    </div>
  )
}
