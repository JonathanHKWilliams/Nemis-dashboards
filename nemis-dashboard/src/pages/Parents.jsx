import { useState, useMemo } from 'react'
import { Search, UserRound, Phone, MessageSquare, TrendingUp, SlidersHorizontal, X, LayoutGrid, List } from 'lucide-react'

const ACCENT = '#0367A0'

const parentsData = [
  { id: 'P001', name: 'Mrs. Grace Kamara',     children: 2, school: 'Grand Bassa High School',    district: 'Buchanan',  contact: '+231-880-001-001', engagement: 'High',   lastContact: '2026-02-28', status: 'Active',   gender: 'women', photoId: 12 },
  { id: 'P002', name: 'Mr. John T. Kollie',    children: 1, school: 'St. Mary Primary School',    district: 'Buchanan',  contact: '+231-880-002-002', engagement: 'Medium', lastContact: '2026-02-15', status: 'Active',   gender: 'men',   photoId: 23 },
  { id: 'P003', name: 'Mrs. Comfort Reeves',   children: 3, school: 'Buchanan Community School',  district: 'Buchanan',  contact: '+231-880-003-003', engagement: 'Low',    lastContact: '2026-01-10', status: 'Active',   gender: 'women', photoId: 34 },
  { id: 'P004', name: 'Mr. Samuel D. Wuo',     children: 2, school: 'Grand Bassa High School',    district: 'Buchanan',  contact: '+231-880-004-004', engagement: 'High',   lastContact: '2026-02-27', status: 'Active',   gender: 'men',   photoId: 45 },
  { id: 'P005', name: 'Mrs. Patience Yancy',   children: 1, school: 'District 2 Central School',  district: 'District 2',contact: '+231-880-005-005', engagement: 'Medium', lastContact: '2026-02-20', status: 'Active',   gender: 'women', photoId: 56 },
  { id: 'P006', name: 'Mr. Emmanuel Flomo',    children: 4, school: 'Tweh Farm Public School',    district: 'Tweh Farm', contact: '+231-880-006-006', engagement: 'Low',    lastContact: '2025-12-01', status: 'Inactive', gender: 'men',   photoId: 67 },
  { id: 'P007', name: 'Mrs. Martha Gaye',      children: 2, school: 'St. Mary Primary School',    district: 'Buchanan',  contact: '+231-880-007-007', engagement: 'High',   lastContact: '2026-02-26', status: 'Active',   gender: 'women', photoId: 18 },
  { id: 'P008', name: 'Mr. Alfred Cooper',     children: 1, school: 'Buchanan Comm. High School', district: 'Buchanan',  contact: '+231-880-008-008', engagement: 'Medium', lastContact: '2026-02-18', status: 'Active',   gender: 'men',   photoId: 29 },
  { id: 'P009', name: 'Mrs. Hannah Freeman',   children: 3, school: 'Grand Bassa High School',    district: 'Buchanan',  contact: '+231-880-009-009', engagement: 'High',   lastContact: '2026-02-25', status: 'Active',   gender: 'women', photoId: 40 },
  { id: 'P010', name: 'Mr. Thomas B. Nyema',   children: 2, school: 'Tweh Farm Public School',    district: 'Tweh Farm', contact: '+231-880-010-010', engagement: 'Low',    lastContact: '2026-01-05', status: 'Inactive', gender: 'men',   photoId: 51 },
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

export default function Parents() {
  const [search, setSearch]         = useState('')
  const [engagement, setEngagement] = useState('All')
  const [status, setStatus]         = useState('All')
  const [selected, setSelected]     = useState(null)
  const [msgForm, setMsgForm]       = useState(false)
  const [viewMode, setViewMode]     = useState('grid')

  const filtered = useMemo(() => parentsData.filter(p => {
    const q = search.toLowerCase()
    const matchQ  = !q || p.name.toLowerCase().includes(q) || p.school.toLowerCase().includes(q) || p.district.toLowerCase().includes(q)
    const matchE  = engagement === 'All' || p.engagement === engagement
    const matchS  = status === 'All' || p.status === status
    return matchQ && matchE && matchS
  }), [search, engagement, status])

  const totalChildren = parentsData.reduce((s, p) => s + p.children, 0)
  const highEng       = parentsData.filter(p => p.engagement === 'High').length
  const lowEng        = parentsData.filter(p => p.engagement === 'Low').length

  const hasFilter = search || engagement !== 'All' || status !== 'All'

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Registered Parents', value: parentsData.length,   color: '#0F172A', icon: UserRound,   bg: 'rgba(0,14,33,0.07)' },
          { label: 'Total Children',     value: totalChildren,         color: '#2563EB', icon: TrendingUp,  bg: 'rgba(37,99,235,0.08)' },
          { label: 'High Engagement',    value: highEng,              color: '#16A34A', icon: TrendingUp,  bg: 'rgba(22,163,74,0.09)' },
          { label: 'Low Engagement',     value: lowEng,               color: '#A60003', icon: MessageSquare,bg:'rgba(166,0,3,0.08)' },
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
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Name, school…"
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

        {/* Table */}
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

          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
              {filtered.map((p) => {
                const eng = engagementCfg[p.engagement]
                return (
                  <div key={p.id}
                    className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
                    style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,14,33,0.05)' }}
                    onClick={() => { setSelected(p); setMsgForm(false) }}
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
                          <p className="text-[10px] font-mono text-[#9CA3AF]">{p.id}</p>
                        </div>
                        <Badge label={p.engagement} color={eng.color} bg={eng.bg} />
                      </div>
                    </div>
                    <div className="px-5 py-3 grid grid-cols-2 gap-x-4 gap-y-2" style={{ borderBottom: '1px solid #F4F6F8' }}>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>School</p>
                        <p className="text-xs font-bold text-[#0F172A] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{p.school}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Children</p>
                        <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{p.children}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Contact</p>
                        <p className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.contact}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Last Contact</p>
                        <p className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.lastContact}</p>
                      </div>
                    </div>
                    <div className="px-5 py-3 flex items-center justify-between">
                      <Badge label={p.status}
                        color={p.status === 'Active' ? '#16A34A' : '#A60003'}
                        bg={p.status === 'Active' ? 'rgba(22,163,74,0.09)' : 'rgba(166,0,3,0.08)'} />
                      <button onClick={(e) => { e.stopPropagation(); setSelected(p); setMsgForm(false) }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
                        <Phone size={11} strokeWidth={2.5} /> Contact
                      </button>
                    </div>
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <div className="col-span-3 py-16 text-center">
                  <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No parents match your filter</p>
                </div>
              )}
            </div>
          )}

          {viewMode === 'table' && <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFBFC' }}>
                  {['Parent', 'Children', 'School', 'District', 'Contact', 'Engagement', 'Last Contact', 'Status', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-[#4B5563]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => {
                  const eng = engagementCfg[p.engagement]
                  return (
                    <tr key={p.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
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
                      <td className="px-4 py-3.5 text-sm font-bold text-[#1F2937]">{p.children}</td>
                      <td className="px-4 py-3.5 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{p.school}</td>
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
                        <button onClick={() => { setSelected(p); setMsgForm(false) }}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
                          <Phone size={11} strokeWidth={2.5} /> Contact
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-[#6B7280] text-sm font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>No parents match your filter</p>
              </div>
            )}
          </div>}
        </div>
      </div>

      {/* Contact modal */}
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-6" style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.20)' }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-4 mb-5">
              <img src={`https://randomuser.me/api/portraits/${selected.gender}/${selected.photoId}.jpg`}
                alt={selected.name} className="w-14 h-14 rounded-xl object-cover"
                style={{ border: '2px solid #EEF0F3' }}
                onError={e => { e.target.style.display = 'none' }} />
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{selected.name}</h3>
                <p className="text-xs font-semibold text-[#4B5563]">{selected.school}</p>
              </div>
            </div>
            <div className="space-y-0 mb-5">
              {[
                { label: 'Parent ID',    value: selected.id },
                { label: 'Children',     value: selected.children },
                { label: 'District',     value: selected.district },
                { label: 'Contact',      value: selected.contact },
                { label: 'Engagement',   value: selected.engagement },
                { label: 'Last Contact', value: selected.lastContact },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2.5" style={{ borderBottom: '1px solid #F4F6F8' }}>
                  <span className="text-xs font-bold text-[#4B5563] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
                  <span className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setMsgForm(v => !v)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white mb-3"
              style={{ background: '#000E21' }}>
              <MessageSquare size={15} strokeWidth={2.5} /> Send Message
            </button>
            {msgForm && (
              <div className="space-y-3 mb-3">
                <input type="text" placeholder="Subject..." className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
                <textarea rows={3} placeholder="Your message..." className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                  style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#1F2937', fontWeight: 600 }} />
                <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: ACCENT, color: '#000E21' }}>Send</button>
              </div>
            )}
            <button onClick={() => setSelected(null)}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-[#374151] transition-colors"
              style={{ background: '#F4F6F8', fontFamily: 'Lato, sans-serif' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#EEF0F3' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#F4F6F8' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
