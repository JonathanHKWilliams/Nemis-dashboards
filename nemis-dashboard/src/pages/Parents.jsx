import { useState, useMemo, useEffect } from 'react'
import {
  Search, UserRound, Phone, MessageSquare, TrendingUp, SlidersHorizontal, X,
  LayoutGrid, List, ArrowLeft, Mail, MapPin, Calendar, GraduationCap, School,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

const PAGE_SIZE = 6

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  const range = Array.from({ length: totalPages }, (_, i) => i + 1)
  return (
    <div className="flex items-center justify-between px-5 py-4" style={{ borderTop: '1px solid #F4F6F8' }}>
      <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Page {page} of {totalPages}</p>
      <div className="flex items-center gap-1">
        <button disabled={page === 1} onClick={() => onPage(page - 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40"
          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          <ChevronLeft size={13} strokeWidth={2.5} /> Prev
        </button>
        {range.map(p => (
          <button key={p} onClick={() => onPage(p)}
            className="w-8 h-8 rounded-lg text-xs font-bold"
            style={{ background: page === p ? '#002333' : '#F4F6F8', color: page === p ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
            {p}
          </button>
        ))}
        <button disabled={page === totalPages} onClick={() => onPage(page + 1)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-40"
          style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
          Next <ChevronRight size={13} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

const parentsData = [
  {
    id: 'P001', name: 'Mrs. Grace Kamara', district: 'Buchanan', contact: '+231-880-001-001',
    engagement: 'High', lastContact: 'Feb 28, 2026', status: 'Active', gender: 'women', photoId: 12,
    email: 'grace.kamara@gmail.com', occupation: 'Teacher',
    childrenDetails: [
      { name: 'James Kamara',  grade: 'Grade 9', school: 'Grand Bassa High School',   studentId: 'STU-2026-089', status: 'Active',   gender: 'male' },
      { name: 'Mary Kamara',   grade: 'Grade 7', school: 'Grand Bassa High School',   studentId: 'STU-2026-112', status: 'Active',   gender: 'female' },
    ],
  },
  {
    id: 'P002', name: 'Mr. John T. Kollie', district: 'Buchanan', contact: '+231-880-002-002',
    engagement: 'Medium', lastContact: 'Feb 15, 2026', status: 'Active', gender: 'men', photoId: 23,
    email: 'john.kollie@gmail.com', occupation: 'Trader',
    childrenDetails: [
      { name: 'David Kollie',  grade: 'Grade 5', school: 'St. Mary Primary School',   studentId: 'STU-2026-134', status: 'Active',   gender: 'male' },
    ],
  },
  {
    id: 'P003', name: 'Mrs. Comfort Reeves', district: 'Buchanan', contact: '+231-880-003-003',
    engagement: 'Low', lastContact: 'Jan 10, 2026', status: 'Active', gender: 'women', photoId: 34,
    email: 'comfort.reeves@gmail.com', occupation: 'Nurse',
    childrenDetails: [
      { name: 'Samuel Reeves', grade: 'Grade 8', school: 'Buchanan Community School', studentId: 'STU-2026-156', status: 'Active',   gender: 'male' },
      { name: 'Ruth Reeves',   grade: 'Grade 6', school: 'Buchanan Community School', studentId: 'STU-2026-178', status: 'Active',   gender: 'female' },
      { name: 'Michael Reeves',grade: 'Grade 4', school: 'Buchanan Community School', studentId: 'STU-2026-201', status: 'Active',   gender: 'male' },
    ],
  },
  {
    id: 'P004', name: 'Mr. Samuel D. Wuo', district: 'Buchanan', contact: '+231-880-004-004',
    engagement: 'High', lastContact: 'Feb 27, 2026', status: 'Active', gender: 'men', photoId: 45,
    email: 'samuel.wuo@gmail.com', occupation: 'Civil Servant',
    childrenDetails: [
      { name: 'Isaiah Wuo',   grade: 'Grade 10', school: 'Grand Bassa High School',   studentId: 'STU-2026-223', status: 'Active',   gender: 'male' },
      { name: 'Esther Wuo',   grade: 'Grade 8',  school: 'Grand Bassa High School',   studentId: 'STU-2026-245', status: 'Active',   gender: 'female' },
    ],
  },
  {
    id: 'P005', name: 'Mrs. Patience Yancy', district: 'District 2', contact: '+231-880-005-005',
    engagement: 'Medium', lastContact: 'Feb 20, 2026', status: 'Active', gender: 'women', photoId: 56,
    email: 'patience.yancy@gmail.com', occupation: 'Farmer',
    childrenDetails: [
      { name: 'Daniel Yancy', grade: 'Grade 3',  school: 'District 2 Central School', studentId: 'STU-2026-267', status: 'Active',   gender: 'male' },
    ],
  },
  {
    id: 'P006', name: 'Mr. Emmanuel Flomo', district: 'Tweh Farm', contact: '+231-880-006-006',
    engagement: 'Low', lastContact: 'Dec 1, 2025', status: 'Inactive', gender: 'men', photoId: 67,
    email: 'emmanuel.flomo@gmail.com', occupation: 'Farmer',
    childrenDetails: [
      { name: 'Grace Flomo',   grade: 'Grade 11', school: 'Tweh Farm Public School',  studentId: 'STU-2026-289', status: 'Active',   gender: 'female' },
      { name: 'Peter Flomo',   grade: 'Grade 9',  school: 'Tweh Farm Public School',  studentId: 'STU-2026-311', status: 'Active',   gender: 'male' },
      { name: 'Agnes Flomo',   grade: 'Grade 7',  school: 'Tweh Farm Public School',  studentId: 'STU-2026-333', status: 'Active',   gender: 'female' },
      { name: 'John Flomo',    grade: 'Grade 5',  school: 'Tweh Farm Public School',  studentId: 'STU-2026-355', status: 'Active',   gender: 'male' },
    ],
  },
  {
    id: 'P007', name: 'Mrs. Martha Gaye', district: 'Buchanan', contact: '+231-880-007-007',
    engagement: 'High', lastContact: 'Feb 26, 2026', status: 'Active', gender: 'women', photoId: 18,
    email: 'martha.gaye@gmail.com', occupation: 'Businesswoman',
    childrenDetails: [
      { name: 'Joseph Gaye',  grade: 'Grade 6',  school: 'St. Mary Primary School',   studentId: 'STU-2026-377', status: 'Active',   gender: 'male' },
      { name: 'Sarah Gaye',   grade: 'Grade 4',  school: 'St. Mary Primary School',   studentId: 'STU-2026-399', status: 'Active',   gender: 'female' },
    ],
  },
  {
    id: 'P008', name: 'Mr. Alfred Cooper', district: 'Buchanan', contact: '+231-880-008-008',
    engagement: 'Medium', lastContact: 'Feb 18, 2026', status: 'Active', gender: 'men', photoId: 29,
    email: 'alfred.cooper@gmail.com', occupation: 'Mechanic',
    childrenDetails: [
      { name: 'Rebecca Cooper', grade: 'Grade 2', school: 'Buchanan Comm. High School', studentId: 'STU-2026-421', status: 'Active', gender: 'female' },
    ],
  },
  {
    id: 'P009', name: 'Mrs. Hannah Freeman', district: 'Buchanan', contact: '+231-880-009-009',
    engagement: 'High', lastContact: 'Feb 25, 2026', status: 'Active', gender: 'women', photoId: 40,
    email: 'hannah.freeman@gmail.com', occupation: 'Principal',
    childrenDetails: [
      { name: 'Solomon Freeman', grade: 'Grade 10', school: 'Grand Bassa High School', studentId: 'STU-2026-443', status: 'Active',  gender: 'male' },
      { name: 'Naomi Freeman',   grade: 'Grade 8',  school: 'Grand Bassa High School', studentId: 'STU-2026-465', status: 'Active',  gender: 'female' },
      { name: 'Elijah Freeman',  grade: 'Grade 6',  school: 'Grand Bassa High School', studentId: 'STU-2026-487', status: 'Active',  gender: 'male' },
    ],
  },
  {
    id: 'P010', name: 'Mr. Thomas B. Nyema', district: 'Tweh Farm', contact: '+231-880-010-010',
    engagement: 'Low', lastContact: 'Jan 5, 2026', status: 'Inactive', gender: 'men', photoId: 51,
    email: 'thomas.nyema@gmail.com', occupation: 'Fisherman',
    childrenDetails: [
      { name: 'Rachel Nyema',   grade: 'Grade 9', school: 'Tweh Farm Public School',  studentId: 'STU-2026-509', status: 'Active',   gender: 'female' },
      { name: 'Benjamin Nyema', grade: 'Grade 7', school: 'Tweh Farm Public School',  studentId: 'STU-2026-531', status: 'Active',   gender: 'male' },
    ],
  },
]

const engagementCfg = {
  High:   { color: '#16A34A', bg: 'rgba(22,163,74,0.09)'  },
  Medium: { color: '#D97706', bg: 'rgba(217,119,6,0.09)'  },
  Low:    { color: '#A60003', bg: 'rgba(166,0,3,0.08)'    },
}

function Badge({ label, color, bg }) {
  return (
    <span className="text-[10px] font-bold px-2.5 py-[3px] rounded-full"
      style={{ background: bg, color, fontFamily: 'Lato, sans-serif' }}>{label}</span>
  )
}

// ── Parent Detail Page ────────────────────────────────────────────────────────
function ParentDetail({ parent, onBack }) {
  const [msgOpen, setMsgOpen] = useState(false)
  const eng = engagementCfg[parent.engagement]

  const InfoRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-center justify-between py-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
      <div className="flex items-center gap-2">
        {Icon && <Icon size={13} strokeWidth={2.5} style={{ color: '#9CA3AF' }} />}
        <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
    </div>
  )

  return (
    <div className="max-w-[900px] space-y-5">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold text-[#002333] transition-colors"
        style={{ fontFamily: 'Lato, sans-serif' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#0367A0' }}
        onMouseLeave={e => { e.currentTarget.style.color = '#002333' }}
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Back to Parents
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #EEF0F3' }}>
        <div style={{ height: 6, background: 'linear-gradient(90deg, #002333 0%, #0367A0 100%)' }} />
        <div className="px-7 py-6 flex items-center gap-6">
          <img
            src={`https://randomuser.me/api/portraits/${parent.gender}/${parent.photoId}.jpg`}
            alt={parent.name}
            className="rounded-full object-cover flex-shrink-0"
            style={{ width: 88, height: 88, border: '3px solid #EEF0F3' }}
            onError={e => { e.target.style.display = 'none' }}
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                {parent.name}
              </h1>
              <Badge
                label={parent.status}
                color={parent.status === 'Active' ? '#16A34A' : '#A60003'}
                bg={parent.status === 'Active' ? 'rgba(22,163,74,0.09)' : 'rgba(166,0,3,0.08)'}
              />
              <Badge label={`${parent.engagement} Engagement`} color={eng.color} bg={eng.bg} />
            </div>
            <p className="text-sm font-mono text-[#6B7280] mt-1">{parent.id}</p>
            <p className="text-sm font-semibold text-[#374151] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>
              {parent.occupation} · {parent.district} District
            </p>
          </div>
          {/* Children count pill */}
          <div className="text-center bg-[#F8FAFC] rounded-xl px-6 py-4 flex-shrink-0" style={{ border: '1px solid #EEF0F3' }}>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#9CA3AF] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
              Children
            </p>
            <p className="text-4xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {parent.childrenDetails.length}
            </p>
            <p className="text-[10px] text-[#9CA3AF] font-semibold mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
              Enrolled
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {/* Contact & Personal Info */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
            Contact & Personal Info
          </h3>
          <InfoRow label="Phone"        value={parent.contact}     icon={Phone} />
          <InfoRow label="Email"        value={parent.email}       icon={Mail} />
          <InfoRow label="District"     value={parent.district}    icon={MapPin} />
          <InfoRow label="Occupation"   value={parent.occupation}  icon={UserRound} />
          <InfoRow label="Last Contact" value={parent.lastContact} icon={Calendar} />
        </div>

        {/* Engagement Info */}
        <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
            Engagement
          </h3>
          <div className="flex items-center gap-3 p-4 rounded-xl mb-3" style={{ background: eng.bg }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: eng.color + '22' }}>
              <TrendingUp size={18} strokeWidth={2.5} style={{ color: eng.color }} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: eng.color, fontFamily: 'Sora, sans-serif' }}>{parent.engagement} Engagement</p>
              <p className="text-xs text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                {parent.engagement === 'High' ? 'Regularly attends meetings and responds promptly.'
                  : parent.engagement === 'Medium' ? 'Occasionally participates in school activities.'
                  : 'Rarely responds to school communications.'}
              </p>
            </div>
          </div>

          {/* Send Message */}
          <button
            onClick={() => setMsgOpen(v => !v)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white mb-3"
            style={{ background: '#002333', fontFamily: 'Lato, sans-serif' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#003a52' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#002333' }}
          >
            <MessageSquare size={15} strokeWidth={2.5} />
            {msgOpen ? 'Cancel Message' : 'Send Message'}
          </button>
          {msgOpen && (
            <div className="space-y-2">
              <input type="text" placeholder="Subject…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937' }} />
              <textarea rows={3} placeholder="Your message…"
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937' }} />
              <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Children Section */}
      <div className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3' }}>
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={18} strokeWidth={2.5} style={{ color: '#0367A0' }} />
          <h3 className="text-[13px] font-black uppercase tracking-wider text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
            Children ({parent.childrenDetails.length})
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {parent.childrenDetails.map((child, idx) => (
            <div key={idx} className="rounded-xl p-4 flex items-center gap-4"
              style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: child.gender === 'female' ? 'rgba(124,58,237,0.10)' : 'rgba(3,103,160,0.10)' }}>
                <GraduationCap size={20} strokeWidth={2}
                  style={{ color: child.gender === 'female' ? '#7C3AED' : '#0367A0' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {child.name}
                  </p>
                  <span className="text-[10px] font-bold px-2 py-[2px] rounded-full"
                    style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}>
                    {child.status}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <School size={11} strokeWidth={2.5} style={{ color: '#9CA3AF', flexShrink: 0 }} />
                  <p className="text-xs font-semibold text-[#6B7280] truncate" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {child.school}
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{child.grade}</span>
                  <span className="text-[10px] font-mono text-[#C4CAD4]">{child.studentId}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Main Parents Page ─────────────────────────────────────────────────────────
export default function Parents() {
  const [search, setSearch]         = useState('')
  const [engagement, setEngagement] = useState('All')
  const [status, setStatus]         = useState('All')
  const [selected, setSelected]     = useState(null)
  const [viewMode, setViewMode]     = useState('grid')
  const [page, setPage]             = useState(1)

  const filtered = useMemo(() => parentsData.filter(p => {
    const q = search.toLowerCase()
    const matchQ  = !q || p.name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q)
    const matchE  = engagement === 'All' || p.engagement === engagement
    const matchS  = status === 'All' || p.status === status
    return matchQ && matchE && matchS
  }), [search, engagement, status])

  useEffect(() => { setPage(1) }, [search, engagement, status])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalChildren = parentsData.reduce((s, p) => s + p.childrenDetails.length, 0)
  const highEng       = parentsData.filter(p => p.engagement === 'High').length
  const lowEng        = parentsData.filter(p => p.engagement === 'Low').length
  const hasFilter     = search || engagement !== 'All' || status !== 'All'

  // ── Inline Detail Page ──
  if (selected) {
    return <ParentDetail parent={selected} onBack={() => setSelected(null)} />
  }

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Registered Parents', value: parentsData.length, color: '#0F172A', icon: UserRound,    bg: 'rgba(0,14,33,0.07)' },
          { label: 'Total Children',     value: totalChildren,       color: '#2563EB', icon: GraduationCap,bg: 'rgba(37,99,235,0.08)' },
          { label: 'High Engagement',    value: highEng,             color: '#16A34A', icon: TrendingUp,   bg: 'rgba(22,163,74,0.09)' },
          { label: 'Low Engagement',     value: lowEng,              color: '#A60003', icon: MessageSquare,bg: 'rgba(166,0,3,0.08)' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl p-5" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                <p className="text-2xl font-bold mt-1.5" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={20} strokeWidth={2.5} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-5 items-start">
        {/* Filter sidebar */}
        <div className="w-[210px] flex-shrink-0 bg-white rounded-xl p-4 sticky top-[88px]"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={15} strokeWidth={2.5} style={{ color: '#0F172A' }} />
              <span className="text-[13px] font-bold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>Filters</span>
            </div>
            {hasFilter && (
              <button onClick={() => { setSearch(''); setEngagement('All'); setStatus('All') }}
                className="text-[11px] font-bold text-[#A60003] hover:underline">Clear</button>
            )}
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] mb-1.5">Search</p>
              <div className="relative">
                <Search size={13} strokeWidth={2.5} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, district…"
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-lg outline-none"
                  style={{ background: '#F4F6F8', color: '#1F2937', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', fontWeight: 600 }} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] mb-1.5">Engagement</p>
              <div className="flex flex-col gap-1">
                {['All', 'High', 'Medium', 'Low'].map(e => (
                  <button key={e} onClick={() => setEngagement(e)}
                    className="text-left text-sm px-3 py-1.5 rounded-lg font-semibold transition-colors"
                    style={{ background: engagement === e ? '#000E21' : 'transparent', color: engagement === e ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] mb-1.5">Status</p>
              <div className="flex flex-col gap-1">
                {['All', 'Active', 'Inactive'].map(s => (
                  <button key={s} onClick={() => setStatus(s)}
                    className="text-left text-sm px-3 py-1.5 rounded-lg font-semibold transition-colors"
                    style={{ background: status === s ? '#000E21' : 'transparent', color: status === s ? '#fff' : '#374151', fontFamily: 'Lato, sans-serif' }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Table / Grid */}
        <div className="flex-1 bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}>
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>
              {filtered.length} parent{filtered.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center gap-2">
              {hasFilter && (
                <button onClick={() => { setSearch(''); setEngagement('All'); setStatus('All') }}
                  className="flex items-center gap-1 text-xs font-bold text-[#4B5563] hover:text-[#0F172A]">
                  <X size={12} strokeWidth={2.5} /> Clear filters
                </button>
              )}
              <div className="flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
                {[{ mode: 'grid', Icon: LayoutGrid, label: 'Grid' }, { mode: 'table', Icon: List, label: 'Table' }].map(({ mode, Icon, label }) => (
                  <button key={mode} onClick={() => setViewMode(mode)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
                    style={{ background: viewMode === mode ? '#002333' : 'transparent', color: viewMode === mode ? '#fff' : '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                    <Icon size={13} strokeWidth={2.5} />{label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Grid View ── */}
          {viewMode === 'grid' && (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              {paginated.map((p) => {
                return (
                  <div key={p.id}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                    style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}
                    onClick={() => setSelected(p)}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,14,33,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,14,33,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    <div className="px-5 pt-4 pb-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                      <div className="flex items-center gap-3">
                        <img src={`https://randomuser.me/api/portraits/${p.gender}/${p.photoId}.jpg`}
                          alt={p.name} className="w-11 h-11 rounded-full object-cover flex-shrink-0"
                          style={{ border: '1.5px solid #EEF0F3' }}
                          onError={e => { e.target.style.display = 'none' }} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold text-[#0F172A] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{p.name}</p>
                          <p className="text-xs font-black text-[#374151] font-mono">{p.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="px-5 py-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Contact</span>
                        <span className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.contact}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Children</span>
                        <span className="text-sm font-black text-[#0367A0]" style={{ fontFamily: 'Sora, sans-serif' }}>{p.childrenDetails.length}</span>
                      </div>
                    </div>
                    <div className="px-5 py-2.5 flex items-center justify-between" style={{ borderTop: '1px solid #F4F6F8' }}>
                      <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                        style={{ background: p.status === 'Active' ? '#0367A0' : '#A60003', color: '#fff', fontFamily: 'Lato, sans-serif' }}>
                        {p.status}
                      </span>
                      <span className="text-sm font-black text-[#0367A0]" style={{ fontFamily: 'Lato, sans-serif' }}>
                        View Profile →
                      </span>
                    </div>
                  </div>
                )
              })}
              {paginated.length === 0 && (
                <div className="col-span-2 py-16 text-center">
                  <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No parents match your filter</p>
                </div>
              )}
            </div>
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
            </>
          )}

          {/* ── Table View ── */}
          {viewMode === 'table' && <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFBFC' }}>
                  {['Parent', 'Children', 'District', 'Contact', 'Engagement', 'Last Contact', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#4B5563]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(p => {
                  const eng = engagementCfg[p.engagement]
                  return (
                    <tr key={p.id} className="transition-colors cursor-pointer" style={{ borderTop: '1px solid #F4F6F8' }}
                      onClick={() => setSelected(p)}
                      onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                      onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <img src={`https://randomuser.me/api/portraits/${p.gender}/${p.photoId}.jpg`}
                            alt={p.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                            style={{ border: '1.5px solid #EEF0F3' }}
                            onError={e => { e.target.style.display = 'none' }} />
                          <div>
                            <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{p.name}</p>
                            <p className="text-[10px] font-semibold text-[#6B7280] font-mono">{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-sm font-bold text-[#1F2937]">{p.childrenDetails.length}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.district}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.contact}</td>
                      <td className="px-4 py-3.5"><Badge label={p.engagement} color={eng.color} bg={eng.bg} /></td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.lastContact}</td>
                      <td className="px-4 py-3.5">
                        <Badge label={p.status}
                          color={p.status === 'Active' ? '#16A34A' : '#A60003'}
                          bg={p.status === 'Active' ? 'rgba(22,163,74,0.09)' : 'rgba(166,0,3,0.08)'} />
                      </td>
                      <td className="px-4 py-3.5">
                        <button onClick={e => { e.stopPropagation(); setSelected(p) }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
                          <Phone size={11} strokeWidth={2.5} /> View
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {paginated.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No parents match your filter</p>
              </div>
            )}
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </div>}
        </div>
      </div>
    </div>
  )
}
