import { useState, useMemo } from 'react'
import {
  Search, Mail, Building2, GraduationCap, TrendingUp,
  LayoutGrid, List, X, Megaphone, Send, ChevronRight,
} from 'lucide-react'
import { districtsData } from '../data/mockData'

function ComplianceBar({ value }) {
  const color = value >= 85 ? '#48D08C' : value >= 75 ? '#F59E0B' : '#A60003'
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Compliance</span>
        <span className="text-xs font-bold" style={{ color, fontFamily: 'Sora, sans-serif' }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  )
}

export default function Districts() {
  const [search, setSearch]               = useState('')
  const [imgErrors, setImgErrors]         = useState({})
  const [viewMode, setViewMode]           = useState('grid')
  const [selectedDistrict, setSelectedDistrict] = useState(null)
  const [announcements, setAnnouncements] = useState([])
  const [announceDraft, setAnnounceDraft] = useState('')
  const [showAnnounceForm, setShowAnnounceForm] = useState(false)

  const filtered = useMemo(() =>
    districtsData.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.deo.name.toLowerCase().includes(search.toLowerCase())
    ), [search])

  const totalSchools  = districtsData.reduce((s, d) => s + d.schools, 0)
  const totalStudents = districtsData.reduce((s, d) => s + d.students, 0)
  const avgCompliance = Math.round(districtsData.reduce((s, d) => s + d.compliance, 0) / districtsData.length)

  const handleImgError = (id) => setImgErrors((p) => ({ ...p, [id]: true }))

  const openModal = (district) => {
    setSelectedDistrict(district)
    setShowAnnounceForm(false)
    setAnnounceDraft('')
  }

  const postAnnouncement = () => {
    if (!announceDraft.trim()) return
    setAnnouncements(prev => [{
      id: Date.now(),
      districtId: selectedDistrict.id,
      message: announceDraft.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }, ...prev])
    setAnnounceDraft('')
    setShowAnnounceForm(false)
  }

  const renderDEOAvatar = (district, size = 40) => {
    const photoUrl = `https://randomuser.me/api/portraits/${district.deo.gender}/${district.deo.photoId}.jpg`
    const initials = district.deo.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    if (imgErrors[district.id]) {
      return (
        <div className="rounded-full flex items-center justify-center flex-shrink-0"
          style={{ width: size, height: size, background: '#002333' }}>
          <span className="text-white font-bold" style={{ fontFamily: 'Sora, sans-serif', fontSize: size * 0.32 }}>{initials}</span>
        </div>
      )
    }
    return (
      <img src={photoUrl} alt={district.deo.name}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
        onError={() => handleImgError(district.id)} />
    )
  }

  return (
    <div className="space-y-5 max-w-[1180px]">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Districts', value: districtsData.length.toString(), icon: Building2,    color: '#002333', bg: 'rgba(0,35,51,0.07)' },
          { label: 'Total Schools',   value: totalSchools.toLocaleString(),   icon: Building2,    color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
          { label: 'Total Students',  value: (totalStudents/1000).toFixed(0)+'K', icon: GraduationCap, color: '#48D08C', bg: 'rgba(72,208,140,0.10)' },
          { label: 'Avg Compliance',  value: avgCompliance + '%',             icon: TrendingUp,   color: '#16A34A', bg: 'rgba(22,163,74,0.09)' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5"
            style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                <p className="text-2xl font-bold mt-1.5" style={{ fontFamily: 'Sora, sans-serif', color: s.color }}>{s.value}</p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                <s.icon size={20} strokeWidth={2.5} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar: search + count + view toggle */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
          <input
            value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search districts or DEOs…"
            className="pl-9 pr-4 py-2 text-sm bg-white rounded-lg outline-none text-[#374151] placeholder:text-[#9CA3AF] w-64"
            style={{ fontFamily: 'Lato, sans-serif', border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}
          />
        </div>
        <span className="text-xs text-[#6B7280] font-semibold" style={{ fontFamily: 'Lato, sans-serif' }}>
          {filtered.length} of {districtsData.length} districts
        </span>
        {/* View toggle */}
        <div className="ml-auto flex items-center gap-1 bg-[#F4F6F8] rounded-lg p-1">
          {[
            { mode: 'grid',  Icon: LayoutGrid, label: 'Grid' },
            { mode: 'table', Icon: List,        label: 'Table' },
          ].map(({ mode, Icon, label }) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all"
              style={{
                background: viewMode === mode ? '#002333' : 'transparent',
                color: viewMode === mode ? '#fff' : '#6B7280',
                fontFamily: 'Lato, sans-serif',
              }}>
              <Icon size={13} strokeWidth={2.5} />{label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid View ── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((district) => (
            <div
              key={district.id}
              className="bg-white rounded-xl overflow-hidden transition-all duration-200 cursor-pointer"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}
              onClick={() => openModal(district)}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,35,51,0.10)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,35,51,0.05)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {/* Card Header */}
              <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {district.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-[2px] rounded-full font-semibold"
                        style={{
                          background: district.status === 'Active' ? 'rgba(72,208,140,0.1)' : 'rgba(166,0,3,0.1)',
                          color: district.status === 'Active' ? '#16A34A' : '#A60003',
                          fontFamily: 'Lato, sans-serif',
                        }}>
                        {district.status}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-[#D1D5DB]" style={{ fontFamily: 'Sora, sans-serif' }}>
                    #{String(district.id).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="px-5 py-3 grid grid-cols-3 gap-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                {[
                  { label: 'Schools',  value: district.schools },
                  { label: 'Students', value: (district.students/1000).toFixed(1)+'K' },
                  { label: 'Teachers', value: district.teachers.toLocaleString() },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-lg font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                    <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Compliance */}
              <div className="px-5 py-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <ComplianceBar value={district.compliance} />
              </div>

              {/* DEO */}
              <div className="px-5 py-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#6B7280] mb-2.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                  District Education Officer
                </p>
                <div className="flex items-center gap-3">
                  {renderDEOAvatar(district, 40)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {district.deo.name}
                    </p>
                    <p className="text-xs font-semibold text-[#6B7280] truncate" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {district.deo.email}
                    </p>
                  </div>
                  <ChevronRight size={16} strokeWidth={2.5} className="text-[#9CA3AF] flex-shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Table View ── */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: '#FAFBFC' }}>
                  {['District', 'DEO', 'Schools', 'Students', 'Teachers', 'Compliance', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]"
                      style={{ fontFamily: 'Lato, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((district) => {
                  const compColor = district.compliance >= 85 ? '#48D08C' : district.compliance >= 75 ? '#F59E0B' : '#A60003'
                  return (
                    <tr key={district.id} className="transition-colors" style={{ borderTop: '1px solid #F4F6F8' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFBFC' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '' }}>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{district.name}</p>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          {renderDEOAvatar(district, 32)}
                          <p className="text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{district.deo.name}</p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{district.schools}</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{(district.students/1000).toFixed(1)}K</td>
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{district.teachers}</td>
                      <td className="px-5 py-3.5 min-w-[140px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
                            <div className="h-full rounded-full" style={{ width: `${district.compliance}%`, background: compColor }} />
                          </div>
                          <span className="text-xs font-bold w-8 flex-shrink-0" style={{ color: compColor, fontFamily: 'Sora, sans-serif' }}>{district.compliance}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs px-2.5 py-[3px] rounded-full font-semibold"
                          style={{
                            background: district.status === 'Active' ? 'rgba(72,208,140,0.10)' : 'rgba(166,0,3,0.10)',
                            color: district.status === 'Active' ? '#16A34A' : '#A60003',
                            fontFamily: 'Lato, sans-serif',
                          }}>
                          {district.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <button onClick={() => openModal(district)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                          style={{ background: '#F4F6F8', color: '#374151', fontFamily: 'Lato, sans-serif' }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = '#EEF0F3' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = '#F4F6F8' }}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center py-20 text-center">
          <Building2 size={32} strokeWidth={2.5} className="text-gray-300 mb-3" />
          <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>No districts match your search</p>
        </div>
      )}

      {/* ── District Detail Modal ── */}
      {selectedDistrict && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ background: 'rgba(0,0,0,0.45)' }}
          onClick={() => setSelectedDistrict(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden flex flex-col"
            style={{ boxShadow: '0 24px 64px rgba(0,0,0,0.22)', maxHeight: '90vh' }}
            onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="px-6 pt-6 pb-4 flex items-start justify-between flex-shrink-0"
              style={{ borderBottom: '1px solid #F4F6F8' }}>
              <div>
                <h3 className="font-bold text-[#002333] text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {selectedDistrict.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs px-2 py-[2px] rounded-full font-semibold"
                    style={{
                      background: selectedDistrict.status === 'Active' ? 'rgba(72,208,140,0.10)' : 'rgba(166,0,3,0.10)',
                      color: selectedDistrict.status === 'Active' ? '#16A34A' : '#A60003',
                      fontFamily: 'Lato, sans-serif',
                    }}>
                    {selectedDistrict.status}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedDistrict(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#9CA3AF] transition-all"
                onMouseEnter={(e) => { e.currentTarget.style.background = '#F4F6F8'; e.currentTarget.style.color = '#002333' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9CA3AF' }}>
                <X size={16} strokeWidth={2.5} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto flex-1">
              {/* District Stats */}
              <div className="px-6 py-4 grid grid-cols-3 gap-3" style={{ borderBottom: '1px solid #F4F6F8' }}>
                {[
                  { label: 'Schools',  value: selectedDistrict.schools },
                  { label: 'Students', value: (selectedDistrict.students/1000).toFixed(1)+'K' },
                  { label: 'Teachers', value: selectedDistrict.teachers.toLocaleString() },
                ].map(s => (
                  <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: '#FAFBFC' }}>
                    <p className="text-xl font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</p>
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Compliance */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <ComplianceBar value={selectedDistrict.compliance} />
              </div>

              {/* DEO Info */}
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#002333] mb-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                  District Education Officer
                </p>
                <div className="flex items-center gap-3 mb-3">
                  {renderDEOAvatar(selectedDistrict, 48)}
                  <div>
                    <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{selectedDistrict.deo.name}</p>
                    <p className="text-xs font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{selectedDistrict.deo.email}</p>
                    <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{selectedDistrict.deo.phone}</p>
                  </div>
                </div>
                <button
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                  style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Lato, sans-serif' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,35,51,0.13)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,35,51,0.07)' }}>
                  <Mail size={12} strokeWidth={2.5} /> Email DEO
                </button>
              </div>

              {/* Announcements */}
              <div className="px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Announcements
                  </p>
                  <button
                    onClick={() => { setShowAnnounceForm(p => !p); setAnnounceDraft('') }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    style={{ background: 'rgba(72,208,140,0.10)', color: '#16A34A', fontFamily: 'Lato, sans-serif' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.20)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(72,208,140,0.10)' }}>
                    <Megaphone size={12} strokeWidth={2.5} /> Post Announcement
                  </button>
                </div>

                {/* Compose form */}
                {showAnnounceForm && (
                  <div className="mb-4 p-3 rounded-xl" style={{ background: '#FAFBFC', border: '1px solid #EEF0F3' }}>
                    <textarea
                      value={announceDraft}
                      onChange={(e) => setAnnounceDraft(e.target.value)}
                      placeholder={`Write an announcement for ${selectedDistrict.name}…`}
                      rows={3}
                      className="w-full text-sm rounded-lg px-3 py-2 outline-none resize-none"
                      style={{ background: '#fff', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#374151' }}
                    />
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <button onClick={() => { setShowAnnounceForm(false); setAnnounceDraft('') }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        style={{ background: '#F4F6F8', color: '#6B7280', fontFamily: 'Lato, sans-serif' }}>
                        Cancel
                      </button>
                      <button onClick={postAnnouncement}
                        disabled={!announceDraft.trim()}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                        style={{
                          background: announceDraft.trim() ? '#002333' : '#9CA3AF',
                          fontFamily: 'Lato, sans-serif',
                          cursor: announceDraft.trim() ? 'pointer' : 'not-allowed',
                        }}>
                        <Send size={11} strokeWidth={2.5} /> Send
                      </button>
                    </div>
                  </div>
                )}

                {/* Announcement list */}
                {announcements.filter(a => a.districtId === selectedDistrict.id).length === 0 ? (
                  <div className="py-6 text-center">
                    <Megaphone size={22} strokeWidth={2.5} className="mx-auto mb-2" style={{ color: '#D1D5DB' }} />
                    <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>No announcements posted yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {announcements.filter(a => a.districtId === selectedDistrict.id).map(ann => (
                      <div key={ann.id} className="p-3 rounded-xl" style={{ background: '#FAFBFC', border: '1px solid #F4F6F8' }}>
                        <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>
                          Posted • {ann.date}
                        </p>
                        <p className="text-sm font-semibold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{ann.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 flex-shrink-0" style={{ borderTop: '1px solid #F4F6F8' }}>
              <button onClick={() => setSelectedDistrict(null)}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: '#002333', fontFamily: 'Lato, sans-serif' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
