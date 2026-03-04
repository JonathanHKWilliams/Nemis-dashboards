import { useState } from 'react'
import { Search, X, ChevronRight } from 'lucide-react'
import { nationalSchools, nationalTeachers, nationalStudents, nationalDEOs } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const TABS = ['Schools', 'Teachers', 'Students', 'DEOs']

function StatusBadge({ status }) {
  const cfg = {
    Active:      { color: '#059669', bg: 'rgba(5,150,105,0.10)'  },
    Flagged:     { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
    Pending:     { color: '#D97706', bg: 'rgba(217,119,6,0.10)'  },
    'On Leave':  { color: '#64748B', bg: '#F1F5F9' },
    'At Risk':   { color: '#DC2626', bg: 'rgba(220,38,38,0.10)'  },
  }[status] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{status}</span>
}

function SlidePanel({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" style={{ background: 'rgba(15,23,42,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="h-full overflow-y-auto flex flex-col" style={{ width: 400, background: '#fff', boxShadow: '-8px 0 32px rgba(15,23,42,0.15)' }}>
        <div className="px-6 py-5 flex items-center justify-between flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <h3 className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F8FAFC]">
            <X size={16} color="#64748B" strokeWidth={2.5} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4 flex-1">{children}</div>
      </div>
    </div>
  )
}

function InfoGrid({ items }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(f => (
        <div key={f.label} className="rounded-xl p-3" style={{ background: '#F8FAFC' }}>
          <p className="text-[10px] font-black uppercase text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</p>
          <p className="text-xs font-black text-[#0F172A] mt-0.5 truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.value}</p>
        </div>
      ))}
    </div>
  )
}

function SchoolsTab() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const school = nationalSchools.find(s => s.id === selected)
  const filtered = nationalSchools.filter(s => {
    const q = search.toLowerCase()
    return !q || s.name.toLowerCase().includes(q) || s.county.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  })

  return (
    <>
      {school && (
        <SlidePanel title="School Record" onClose={() => setSelected(null)}>
          <InfoGrid items={[
            { label: 'School ID',      value: school.id },
            { label: 'County',         value: school.county },
            { label: 'District',       value: school.district },
            { label: 'Level',          value: school.level },
            { label: 'Type',           value: school.type },
            { label: 'Enrollment',     value: school.enrollment.toLocaleString() },
            { label: 'Attendance',     value: `${school.attendance}%` },
            { label: 'Performance',    value: `${school.performance}%` },
            { label: 'Infra Status',   value: school.infraStatus },
            { label: 'Last Report',    value: school.lastReport || 'Not submitted' },
          ]} />
          <div>
            <p className="text-[10px] font-black uppercase text-[#94A3B8] mb-1" style={{ fontFamily: 'Roboto, sans-serif' }}>Principal</p>
            <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{school.principal}</p>
          </div>
          <StatusBadge status={school.status} />
        </SlidePanel>
      )}
      <SearchBar value={search} onChange={setSearch} placeholder="Search schools..." />
      <RecordTable
        headers={['School', 'County', 'Level', 'Enrollment', 'Attendance', 'Performance', 'Status', '']}
        rows={filtered.map(s => ({
          id: s.id,
          cells: [
            <div><p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name.split(' ').slice(0, 3).join(' ')}</p><p className="text-[10px] text-[#94A3B8]">{s.id}</p></div>,
            s.county,
            s.level,
            s.enrollment.toLocaleString(),
            <span style={{ color: s.attendance >= 80 ? '#059669' : s.attendance >= 65 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{s.attendance}%</span>,
            <span style={{ color: s.performance >= 70 ? '#059669' : s.performance >= 55 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{s.performance}%</span>,
            <StatusBadge status={s.status} />,
            <ChevronRight size={14} color="#94A3B8" />,
          ],
        }))}
        onRowClick={setSelected}
      />
    </>
  )
}

function TeachersTab() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const teacher = nationalTeachers.find(t => t.id === selected)
  const filtered = nationalTeachers.filter(t => {
    const q = search.toLowerCase()
    return !q || t.name.toLowerCase().includes(q) || t.county.toLowerCase().includes(q) || t.id.toLowerCase().includes(q)
  })

  return (
    <>
      {teacher && (
        <SlidePanel title="Teacher Record" onClose={() => setSelected(null)}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${teacher.gender}/${teacher.photoId}.jpg`}
              alt={teacher.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{teacher.name}</p>
              <p className="text-xs text-[#64748B]">{teacher.subject} · {teacher.county}</p>
            </div>
          </div>
          <InfoGrid items={[
            { label: 'Teacher ID',     value: teacher.id },
            { label: 'County',         value: teacher.county },
            { label: 'Subject',        value: teacher.subject },
            { label: 'Qualification',  value: teacher.qualification },
            { label: 'Years Service',  value: `${teacher.yearsService} yrs` },
            { label: 'Attendance',     value: teacher.attendance > 0 ? `${teacher.attendance}%` : 'On Leave' },
            { label: 'Performance',    value: teacher.performance },
          ]} />
          <StatusBadge status={teacher.status} />
        </SlidePanel>
      )}
      <SearchBar value={search} onChange={setSearch} placeholder="Search teachers..." />
      <RecordTable
        headers={['Teacher', 'County', 'Subject', 'Qualification', 'Attendance', 'Performance', 'Status', '']}
        rows={filtered.map(t => ({
          id: t.id,
          cells: [
            <div className="flex items-center gap-2">
              <img src={`https://randomuser.me/api/portraits/${t.gender}/${t.photoId}.jpg`}
                alt={t.name} className="rounded-full object-cover flex-shrink-0"
                style={{ width: 28, height: 28, border: '1.5px solid #E2E8F0' }}
                onError={e => { e.target.style.display = 'none' }} />
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.name}</p>
            </div>,
            t.county,
            t.subject,
            t.qualification,
            <span style={{ color: t.attendance >= 80 ? '#059669' : t.attendance >= 65 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{t.attendance > 0 ? `${t.attendance}%` : '—'}</span>,
            t.performance,
            <StatusBadge status={t.status} />,
            <ChevronRight size={14} color="#94A3B8" />,
          ],
        }))}
        onRowClick={setSelected}
      />
    </>
  )
}

function StudentsTab() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const student = nationalStudents.find(s => s.id === selected)
  const filtered = nationalStudents.filter(s => {
    const q = search.toLowerCase()
    return !q || s.name.toLowerCase().includes(q) || s.county.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
  })

  return (
    <>
      {student && (
        <SlidePanel title="Student Record" onClose={() => setSelected(null)}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${student.gender}/${student.photoId}.jpg`}
              alt={student.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{student.name}</p>
              <p className="text-xs text-[#64748B]">{student.grade} · {student.county}</p>
            </div>
          </div>
          <InfoGrid items={[
            { label: 'Student ID',   value: student.id },
            { label: 'County',       value: student.county },
            { label: 'School',       value: student.school },
            { label: 'Grade',        value: student.grade },
            { label: 'Attendance',   value: `${student.attendance}%` },
            { label: 'Avg Grade',    value: `${student.avgGrade}%` },
            { label: 'Gender',       value: student.gender === 'men' ? 'Male' : 'Female' },
          ]} />
          <StatusBadge status={student.status} />
        </SlidePanel>
      )}
      <SearchBar value={search} onChange={setSearch} placeholder="Search students..." />
      <RecordTable
        headers={['Student', 'County', 'School', 'Grade', 'Attendance', 'Avg Grade', 'Status', '']}
        rows={filtered.map(s => ({
          id: s.id,
          cells: [
            <div className="flex items-center gap-2">
              <img src={`https://randomuser.me/api/portraits/${s.gender}/${s.photoId}.jpg`}
                alt={s.name} className="rounded-full object-cover flex-shrink-0"
                style={{ width: 28, height: 28, border: '1.5px solid #E2E8F0' }}
                onError={e => { e.target.style.display = 'none' }} />
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{s.name}</p>
            </div>,
            s.county,
            <span className="truncate block max-w-[100px]">{s.school.split(' ').slice(0, 3).join(' ')}</span>,
            s.grade,
            <span style={{ color: s.attendance >= 80 ? '#059669' : s.attendance >= 65 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{s.attendance}%</span>,
            <span style={{ color: s.avgGrade >= 70 ? '#059669' : s.avgGrade >= 55 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{s.avgGrade}%</span>,
            <StatusBadge status={s.status} />,
            <ChevronRight size={14} color="#94A3B8" />,
          ],
        }))}
        onRowClick={setSelected}
      />
    </>
  )
}

function DEOsTab() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const deo = nationalDEOs.find(d => d.id === selected)
  const filtered = nationalDEOs.filter(d => {
    const q = search.toLowerCase()
    return !q || d.name.toLowerCase().includes(q) || d.county.toLowerCase().includes(q) || d.id.toLowerCase().includes(q)
  })

  return (
    <>
      {deo && (
        <SlidePanel title="DEO Record" onClose={() => setSelected(null)}>
          <div className="flex items-center gap-3">
            <img src={`https://randomuser.me/api/portraits/${deo.gender}/${deo.photoId}.jpg`}
              alt={deo.name} className="rounded-xl object-cover"
              style={{ width: 48, height: 48, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{deo.name}</p>
              <p className="text-xs text-[#64748B]">{deo.district} · {deo.county}</p>
            </div>
          </div>
          <InfoGrid items={[
            { label: 'DEO ID',       value: deo.id },
            { label: 'County',       value: deo.county },
            { label: 'District',     value: deo.district },
            { label: 'Schools',      value: deo.schools },
            { label: 'Compliance',   value: `${deo.compliance}%` },
            { label: 'Flagged',      value: deo.flagged },
          ]} />
          <StatusBadge status={deo.status} />
        </SlidePanel>
      )}
      <SearchBar value={search} onChange={setSearch} placeholder="Search DEOs..." />
      <RecordTable
        headers={['DEO', 'County', 'District', 'Schools', 'Compliance', 'Flagged', 'Status', '']}
        rows={filtered.map(d => ({
          id: d.id,
          cells: [
            <div className="flex items-center gap-2">
              <img src={`https://randomuser.me/api/portraits/${d.gender}/${d.photoId}.jpg`}
                alt={d.name} className="rounded-full object-cover flex-shrink-0"
                style={{ width: 28, height: 28, border: '1.5px solid #E2E8F0' }}
                onError={e => { e.target.style.display = 'none' }} />
              <p className="text-xs font-black text-[#0F172A]" style={{ fontFamily: 'Roboto, sans-serif' }}>{d.name}</p>
            </div>,
            d.county,
            d.district,
            d.schools,
            <span style={{ color: d.compliance >= 80 ? '#059669' : d.compliance >= 65 ? '#D97706' : '#DC2626', fontWeight: 700 }}>{d.compliance}%</span>,
            <span style={{ color: d.flagged > 3 ? '#DC2626' : '#D97706', fontWeight: 700 }}>{d.flagged}</span>,
            <StatusBadge status={d.status} />,
            <ChevronRight size={14} color="#94A3B8" />,
          ],
        }))}
        onRowClick={setSelected}
      />
    </>
  )
}

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
      <Search size={15} color="#94A3B8" strokeWidth={2.5} />
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 text-xs outline-none bg-transparent"
        style={{ fontFamily: 'Roboto, sans-serif', color: '#334155' }} />
    </div>
  )
}

function RecordTable({ headers, rows, onRowClick }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
      <table className="w-full">
        <thead>
          <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
            {headers.map(h => (
              <th key={h} className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-wide"
                style={{ color: '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id}
              className="cursor-pointer transition-colors hover:bg-[#F8FAFC]"
              onClick={() => onRowClick(row.id)}
              style={{ borderTop: i > 0 ? '1px solid #F1F5F9' : 'none' }}>
              {row.cells.map((cell, j) => (
                <td key={j} className="px-4 py-3.5 text-xs font-semibold text-[#475569]"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function MinisterRecords() {
  const [tab, setTab] = useState('Schools')

  return (
    <div className="space-y-5 max-w-[1100px]">
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
            style={{ background: tab === t ? ACCENT : '#fff', color: tab === t ? '#fff' : '#64748B', border: `1px solid ${tab === t ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
            {t}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {tab === 'Schools'  && <SchoolsTab />}
        {tab === 'Teachers' && <TeachersTab />}
        {tab === 'Students' && <StudentsTab />}
        {tab === 'DEOs'     && <DEOsTab />}
      </div>
    </div>
  )
}
