import { useState } from 'react'
import { CheckCircle, XCircle, Search, ArrowLeft, FileText, MapPin, Users, Calendar, Building2, BookOpen, ClipboardCheck, AlertTriangle } from 'lucide-react'
import { schoolApprovals as initialApprovals } from '../data/mockData'

function SchoolLogo({ name, size = 32 }) {
  const slug = name.toLowerCase().replace(/\s+/g, '-')
  const src = `https://picsum.photos/seed/${slug}/${size * 2}/${size * 2}`
  return <img src={src} alt={name} className="rounded-xl object-cover flex-shrink-0" style={{ width: size, height: size }} />
}

const statusConfig = {
  Pending:  { bg: '#D97706', color: '#fff' },
  Approved: { bg: '#0367A0', color: '#fff' },
  Rejected: { bg: '#A60003', color: '#fff' },
}

function StatusBadge({ status }) {
  const s = statusConfig[status] || { bg: '#6B7280', color: '#fff' }
  return (
    <span className="px-2.5 py-[3px] rounded-full text-xs font-bold"
      style={{ background: s.bg, color: s.color, fontFamily: 'Lato, sans-serif' }}>
      {status}
    </span>
  )
}

const schoolDetailData = {
  1: {
    principal: 'Mr. Emmanuel Kollie', email: 'e.kollie@gbchs.edu.lr', phone: '+231 886 112 233',
    county: 'Grand Bassa', capacity: 400, established: '2018', ownershipType: 'Community',
    notes: 'Buchanan City Community High School has applied for formal registration under the Liberia Education Management System. The school currently operates with provisional status and has submitted a complete set of required documents for review.',
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Submitted' },
      { label: 'Building Inspection Report', status: 'Submitted' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Submitted' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Pending' },
      { label: 'Community Support Letter', status: 'Submitted' },
      { label: 'Ministry Endorsement Letter', status: 'Missing' },
    ],
  },
  2: {
    principal: 'Ms. Hawa Bestman', email: 'h.bestman@sjra.edu.lr', phone: '+231 770 445 667',
    county: 'Grand Bassa', capacity: 280, established: '2020', ownershipType: 'Private',
    notes: 'St. John River Academy is a private secondary school applying for official recognition. The school currently has a functioning faculty of 14 teachers and follows the Liberian national curriculum.',
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Submitted' },
      { label: 'Building Inspection Report', status: 'Pending' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Submitted' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Submitted' },
      { label: 'Community Support Letter', status: 'Missing' },
      { label: 'Ministry Endorsement Letter', status: 'Missing' },
    ],
  },
  3: {
    principal: 'Mr. Thomas Yarkpazuo', email: 't.yarkpazuo@cti.edu.lr', phone: '+231 886 778 990',
    county: 'Grand Bassa', capacity: 220, established: '2017', ownershipType: 'Government',
    notes: 'Commonwealth Technical Institute is a government-funded vocational training school approved under the TVET initiative. All documentation has been verified and the school meets the minimum requirements for full registration.',
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Submitted' },
      { label: 'Building Inspection Report', status: 'Submitted' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Submitted' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Submitted' },
      { label: 'Community Support Letter', status: 'Submitted' },
      { label: 'Ministry Endorsement Letter', status: 'Submitted' },
    ],
  },
  4: {
    principal: 'Ms. Cecelia Flomo', email: 'c.flomo@owensgrove.edu.lr', phone: '+231 770 334 556',
    county: 'Grand Bassa', capacity: 180, established: '2022', ownershipType: 'Private',
    notes: "Owensgrove Secondary School's application was reviewed and rejected due to insufficient documentation and failure to meet the minimum infrastructure standards as outlined in the Liberia Education Act.",
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Missing' },
      { label: 'Building Inspection Report', status: 'Missing' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Pending' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Missing' },
      { label: 'Community Support Letter', status: 'Submitted' },
      { label: 'Ministry Endorsement Letter', status: 'Missing' },
    ],
  },
  5: {
    principal: 'Mr. George Wleh', email: 'g.wleh@neekreen.edu.lr', phone: '+231 886 001 223',
    county: 'Grand Bassa', capacity: 520, established: '2015', ownershipType: 'Community',
    notes: 'Neekreen District Primary School is one of the largest primary schools in Grand Bassa County, serving over 460 students. The school has been a key institution for the community and is applying for formal EMS registration.',
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Submitted' },
      { label: 'Building Inspection Report', status: 'Submitted' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Submitted' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Pending' },
      { label: 'Community Support Letter', status: 'Submitted' },
      { label: 'Ministry Endorsement Letter', status: 'Pending' },
    ],
  },
  6: {
    principal: 'Rev. John Weah', email: 'j.weah@faithacademy.edu.lr', phone: '+231 770 889 001',
    county: 'Grand Bassa', capacity: 340, established: '2021', ownershipType: 'Faith-Based',
    notes: "District No. 4 Faith Academy is a faith-based primary school with strong community roots. The school provides elementary education with a focus on values and academic excellence aligned with Liberia's national curriculum.",
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Submitted' },
      { label: 'Building Inspection Report', status: 'Pending' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Submitted' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Submitted' },
      { label: 'Community Support Letter', status: 'Submitted' },
      { label: 'Ministry Endorsement Letter', status: 'Missing' },
    ],
  },
  7: {
    principal: 'Mr. Sampson Tarr', email: 's.tarr@gbvtc.edu.lr', phone: '+231 886 445 778',
    county: 'Grand Bassa', capacity: 200, established: '2016', ownershipType: 'Government',
    notes: 'Grand Bassa Vocational Training Centre provides vocational and technical education to youth in Buchanan City. This application has been approved as the centre meets all requirements under the TVET framework.',
    docs: [
      { label: 'Letter of Intent / Application Form', status: 'Submitted' },
      { label: 'Land Ownership / Lease Agreement', status: 'Submitted' },
      { label: 'Building Inspection Report', status: 'Submitted' },
      { label: "Principal's Academic Credentials", status: 'Submitted' },
      { label: 'Curriculum & Academic Program Plan', status: 'Submitted' },
      { label: 'Financial Proof / Sustainability Plan', status: 'Submitted' },
      { label: 'Community Support Letter', status: 'Submitted' },
      { label: 'Ministry Endorsement Letter', status: 'Submitted' },
    ],
  },
}

function DocStatusIcon({ status }) {
  if (status === 'Submitted') return <CheckCircle size={15} strokeWidth={2.5} style={{ color: '#0367A0' }} />
  if (status === 'Pending')   return <AlertTriangle size={15} strokeWidth={2.5} style={{ color: '#D97706' }} />
  return <XCircle size={15} strokeWidth={2.5} style={{ color: '#A60003' }} />
}

function SchoolApprovalDetail({ school, detail, onBack, onApprove, onReject }) {
  const docCounts = {
    submitted: (detail?.docs || []).filter(d => d.status === 'Submitted').length,
    pending:   (detail?.docs || []).filter(d => d.status === 'Pending').length,
    missing:   (detail?.docs || []).filter(d => d.status === 'Missing').length,
  }
  const allSubmitted = docCounts.pending === 0 && docCounts.missing === 0

  return (
    <div className="max-w-[820px] space-y-5">
      {/* Back */}
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-bold"
        style={{ color: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Applications
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 2px 12px rgba(0,35,51,0.06)' }}>
        <div className="flex items-start gap-5 p-6" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <SchoolLogo name={school.name} size={72} />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-black text-[#002333] leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {school.name}
                </h2>
                <p className="text-sm font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                  {detail?.county || 'Grand Bassa County'} · {school.district}
                </p>
              </div>
              <StatusBadge status={school.status} />
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(3,103,160,0.08)', color: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
                {school.type}
              </span>
              {detail?.ownershipType && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold"
                  style={{ background: 'rgba(0,35,51,0.06)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
                  {detail.ownershipType}
                </span>
              )}
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold"
                style={{ background: 'rgba(0,35,51,0.06)', color: '#002333', fontFamily: 'Lato, sans-serif' }}>
                Submitted: {school.dateSubmitted}
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          {[
            { label: 'Students',  value: school.students?.toLocaleString() ?? '—', icon: <Users size={14} /> },
            { label: 'Capacity',  value: (detail?.capacity ?? '—').toLocaleString(), icon: <Building2 size={14} /> },
            { label: 'Est.',      value: detail?.established ?? '—', icon: <Calendar size={14} /> },
            { label: 'Doc Score', value: `${docCounts.submitted}/${(detail?.docs || []).length}`, icon: <FileText size={14} /> },
          ].map(({ label, value, icon }) => (
            <div key={label} className="flex flex-col items-center justify-center py-4 gap-0.5"
              style={{ borderRight: '1px solid #F4F6F8' }}>
              <span style={{ color: '#9CA3AF' }}>{icon}</span>
              <span className="text-lg font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two column: School Info + Principal */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl p-5 space-y-3"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen size={15} strokeWidth={2.5} style={{ color: '#0367A0' }} />
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>School Information</h3>
          </div>
          {[
            { label: 'District',          value: school.district },
            { label: 'County',            value: detail?.county ?? 'Grand Bassa' },
            { label: 'School Type',       value: school.type },
            { label: 'Ownership',         value: detail?.ownershipType ?? '—' },
            { label: 'Year Established',  value: detail?.established ?? '—' },
            { label: 'Student Enrollment',value: school.students?.toLocaleString() ?? '—' },
            { label: 'Capacity',          value: detail?.capacity?.toLocaleString() ?? '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F8FAFC' }}>
              <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
              <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-5 space-y-3"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <div className="flex items-center gap-2 mb-1">
            <Users size={15} strokeWidth={2.5} style={{ color: '#0367A0' }} />
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>School Leadership</h3>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#F8FAFC' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white flex-shrink-0"
              style={{ background: '#002333' }}>
              {(detail?.principal ?? 'P').split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{detail?.principal ?? '—'}</p>
              <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>Principal</p>
            </div>
          </div>
          {[
            { label: 'Email',          value: detail?.email ?? '—' },
            { label: 'Phone',          value: detail?.phone ?? '—' },
            { label: 'Application ID', value: `APP-2026-${String(school.id).padStart(4, '0')}` },
            { label: 'Date Submitted', value: school.dateSubmitted },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #F8FAFC' }}>
              <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
              <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Application Overview */}
      <div className="bg-white rounded-2xl p-5"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <div className="flex items-center gap-2 mb-3">
          <FileText size={15} strokeWidth={2.5} style={{ color: '#0367A0' }} />
          <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Application Overview</h3>
        </div>
        <p className="text-sm leading-relaxed text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>
          {detail?.notes ?? 'No application notes available.'}
        </p>
      </div>

      {/* Required Documents */}
      <div className="bg-white rounded-2xl p-5"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardCheck size={15} strokeWidth={2.5} style={{ color: '#0367A0' }} />
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Required Documents</h3>
          </div>
          <div className="flex items-center gap-2">
            {[
              { label: `${docCounts.submitted} Submitted`, color: '#0367A0' },
              { label: `${docCounts.pending} Pending`,   color: '#D97706' },
              { label: `${docCounts.missing} Missing`,   color: '#A60003' },
            ].map(({ label, color }) => (
              <span key={label} className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${color}14`, color, fontFamily: 'Lato, sans-serif' }}>
                {label}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {(detail?.docs || []).map((doc, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl"
              style={{ background: '#F8FAFC', border: '1px solid #EEF0F3' }}>
              <DocStatusIcon status={doc.status} />
              <span className="flex-1 text-sm font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>
                {doc.label}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: doc.status === 'Submitted' ? 'rgba(3,103,160,0.1)' : doc.status === 'Pending' ? 'rgba(217,119,6,0.1)' : 'rgba(166,0,3,0.1)',
                  color: doc.status === 'Submitted' ? '#0367A0' : doc.status === 'Pending' ? '#D97706' : '#A60003',
                  fontFamily: 'Lato, sans-serif',
                }}>
                {doc.status}
              </span>
            </div>
          ))}
        </div>

        {!allSubmitted && school.status === 'Pending' && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-xl"
            style={{ background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.18)' }}>
            <AlertTriangle size={14} strokeWidth={2.5} style={{ color: '#D97706', marginTop: 2, flexShrink: 0 }} />
            <p className="text-xs font-semibold text-[#92400E]" style={{ fontFamily: 'Lato, sans-serif' }}>
              This application has {docCounts.pending > 0 ? `${docCounts.pending} pending` : ''}{docCounts.pending > 0 && docCounts.missing > 0 ? ' and ' : ''}{docCounts.missing > 0 ? `${docCounts.missing} missing` : ''} document(s). Review carefully before approving.
            </p>
          </div>
        )}
      </div>

      {/* CEO Decision — only for Pending */}
      {school.status === 'Pending' && (
        <div className="bg-white rounded-2xl p-5"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          <div className="flex items-center gap-2 mb-3">
            <ClipboardCheck size={15} strokeWidth={2.5} style={{ color: '#0367A0' }} />
            <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>CEO Decision</h3>
          </div>
          <p className="text-xs font-semibold text-[#6B7280] mb-4 leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
            You have reviewed the school information, required documents, and application details above. Your decision will be recorded in the system and the school will be notified accordingly.
          </p>
          <div className="flex items-center gap-3">
            <button onClick={() => { onApprove(school.id); onBack() }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
              style={{ background: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
              <CheckCircle size={15} strokeWidth={2.5} /> Approve Application
            </button>
            <button onClick={() => { onReject(school.id); onBack() }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-90"
              style={{ background: '#A60003', fontFamily: 'Lato, sans-serif' }}>
              <XCircle size={15} strokeWidth={2.5} /> Decline Application
            </button>
          </div>
        </div>
      )}

      {/* Already decided */}
      {school.status !== 'Pending' && (
        <div className="bg-white rounded-2xl p-5 flex items-center gap-3"
          style={{ border: `1px solid ${school.status === 'Approved' ? 'rgba(3,103,160,0.2)' : 'rgba(166,0,3,0.2)'}`, boxShadow: '0 1px 4px rgba(0,35,51,0.04)' }}>
          {school.status === 'Approved'
            ? <CheckCircle size={18} strokeWidth={2.5} style={{ color: '#0367A0', flexShrink: 0 }} />
            : <XCircle size={18} strokeWidth={2.5} style={{ color: '#A60003', flexShrink: 0 }} />}
          <p className="text-sm font-semibold"
            style={{ color: school.status === 'Approved' ? '#0367A0' : '#A60003', fontFamily: 'Lato, sans-serif' }}>
            This application has been <strong>{school.status === 'Approved' ? 'approved' : 'declined'}</strong>. No further action is required.
          </p>
        </div>
      )}
    </div>
  )
}

export default function SchoolApproval() {
  const [approvals, setApprovals] = useState(initialApprovals)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const handleApprove = (id) =>
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'Approved' } : a))
  const handleReject = (id) =>
    setApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'Rejected' } : a))

  const selectedSchool = selected ? approvals.find(a => a.id === selected) : null

  if (selectedSchool) {
    return (
      <SchoolApprovalDetail
        school={selectedSchool}
        detail={schoolDetailData[selectedSchool.id]}
        onBack={() => setSelected(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    )
  }

  const filtered = approvals.filter(a => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.district.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || a.status === filter
    return matchSearch && matchFilter
  })

  const counts = {
    All:      approvals.length,
    Pending:  approvals.filter(a => a.status === 'Pending').length,
    Approved: approvals.filter(a => a.status === 'Approved').length,
    Rejected: approvals.filter(a => a.status === 'Rejected').length,
  }

  return (
    <div className="space-y-5 max-w-[1180px]">
      {/* Stat Tabs */}
      <div className="flex gap-3 flex-wrap">
        {Object.entries(counts).map(([label, count]) => {
          const isActive = filter === label
          const colors = { All: '#002333', Pending: '#D97706', Approved: '#0367A0', Rejected: '#A60003' }
          return (
            <button key={label} onClick={() => setFilter(label)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                fontFamily: 'Lato, sans-serif',
                background: isActive ? colors[label] : '#fff',
                color: isActive ? '#fff' : '#6B7280',
                border: isActive ? 'none' : '1px solid #EEF0F3',
                boxShadow: isActive ? '0 2px 8px rgba(0,35,51,0.15)' : '0 1px 4px rgba(0,35,51,0.04)',
              }}>
              {label}
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold"
                style={{ background: isActive ? 'rgba(255,255,255,0.22)' : '#F4F6F8', color: isActive ? '#fff' : '#9CA3AF' }}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Cards */}
      <div className="bg-white rounded-xl overflow-hidden"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
        {/* Toolbar */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div className="relative">
            <Search size={14} strokeWidth={2.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280] pointer-events-none" />
            <input type="text" placeholder="Search schools or districts…"
              value={search} onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-[#F4F6F8] rounded-lg outline-none w-64 text-[#4B5563] placeholder:text-[#9CA3AF]"
              style={{ fontFamily: 'Lato, sans-serif', fontWeight: 500 }} />
          </div>
          <p className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
            {filtered.length} application{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {filtered.map(school => (
            <div key={school.id}
              onClick={() => setSelected(school.id)}
              className="bg-white rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
              style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>
              {/* Card Header */}
              <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
                <SchoolLogo name={school.name} size={40} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {school.name}
                  </p>
                  <p className="text-xs font-black font-mono text-[#6B7280] mt-0.5">
                    APP-2026-{String(school.id).padStart(4, '0')}
                  </p>
                </div>
                <StatusBadge status={school.status} />
              </div>
              {/* Card Body */}
              <div className="px-5 py-3 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} strokeWidth={2.5} style={{ color: '#9CA3AF' }} />
                    <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {school.district}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} strokeWidth={2.5} style={{ color: '#9CA3AF' }} />
                    <span className="text-xs font-semibold text-[#6B7280]" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {school.dateSubmitted}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold"
                    style={{ background: 'rgba(3,103,160,0.07)', color: '#0367A0', fontFamily: 'Lato, sans-serif' }}>
                    {school.type}
                  </span>
                  <span className="text-xs font-black text-[#0367A0]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Review →
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-2 py-16 text-center">
              <p className="text-[#6B7280] text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                No applications match your filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
