import { useState, useMemo } from 'react'
import {
  ArrowLeft, Eye, ArrowRight, LayoutGrid, List,
  ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Search, ArrowUpDown,
} from 'lucide-react'

const ACCENT = '#0367A0'
const NAVY   = '#002333'

/* ─── Report list data ─────────────────────────────────────────────────── */
const REPORTS = [
  { id: 'enrollment',    title: 'Student Enrollment Report',        subtitle: 'Full enrollment data by class, grade, and semester',         img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&h=200&fit=crop', lastGenerated: 'March 10, 2026', semester: '1st Semester', year: '2025–2026', period: 'Period 1' },
  { id: 'attendance',    title: 'Attendance Report',                 subtitle: 'Daily and weekly student & teacher attendance',              img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=480&h=200&fit=crop', lastGenerated: 'March 10, 2026', semester: '1st Semester', year: '2025–2026', period: 'Period 2' },
  { id: 'performance',   title: 'Academic Performance Report',       subtitle: 'Semester results, grade distributions, and subject averages', img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&h=200&fit=crop', lastGenerated: 'March 10, 2026', semester: '1st Semester', year: '2025–2026', period: 'Period 3' },
  { id: 'fees',          title: 'Fee Collection Report',             subtitle: 'Semester fee collection, balance, and payment status',       img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=480&h=200&fit=crop', lastGenerated: 'March 8, 2026',  semester: '1st Semester', year: '2025–2026', period: 'Period 4' },
  { id: 'teachers',      title: 'Teacher Performance Report',        subtitle: 'Staff evaluations, attendance, and class performance',        img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=480&h=200&fit=crop', lastGenerated: 'March 8, 2026',  semester: '1st Semester', year: '2025–2026', period: 'Period 5' },
  { id: 'compliance',    title: 'Regulatory Compliance Report',      subtitle: 'NEMIS submissions, inspections, and compliance status',       img: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=480&h=200&fit=crop', lastGenerated: 'March 5, 2026',  semester: '1st Semester', year: '2025–2026', period: 'Period 6' },
  { id: 'promotion',     title: 'Student Promotion Report',          subtitle: 'End-of-semester grade promotion and retention outcomes',      img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=480&h=200&fit=crop', lastGenerated: 'Feb 28, 2026',   semester: '2nd Semester', year: '2025–2026', period: 'Period 1' },
  { id: 'health',        title: 'Health & Nutrition Report',         subtitle: 'Student health screenings and school feeding programme',      img: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=480&h=200&fit=crop', lastGenerated: 'Feb 25, 2026',   semester: '2nd Semester', year: '2025–2026', period: 'Period 2' },
  { id: 'infrastructure',title: 'Infrastructure & Facilities Report',subtitle: 'Classroom conditions, utilities, and maintenance status',    img: 'https://images.unsplash.com/photo-1562774053-701939374585?w=480&h=200&fit=crop', lastGenerated: 'Feb 20, 2026',   semester: '2nd Semester', year: '2025–2026', period: 'Period 3' },
  { id: 'parents',       title: 'Parent Engagement Report',          subtitle: 'PTA meetings, parent visits, and guardian involvement',       img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=480&h=200&fit=crop', lastGenerated: 'Feb 18, 2026',   semester: '2nd Semester', year: '2025–2026', period: 'Period 4' },
  { id: 'special-needs', title: 'Special Needs & Inclusion Report',  subtitle: 'Students with learning differences and support plans',        img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=480&h=200&fit=crop', lastGenerated: 'Feb 15, 2026',   semester: '2nd Semester', year: '2025–2026', period: 'Period 5' },
  { id: 'library',       title: 'Library & Resources Report',        subtitle: 'Book inventory, borrowing rates, and learning materials',     img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=480&h=200&fit=crop', lastGenerated: 'Feb 10, 2026',   semester: '2nd Semester', year: '2025–2026', period: 'Period 6' },
]

const SEMESTERS = ['1st Semester', '2nd Semester']
const PERIODS   = ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6']

/* ─── Table styles ────────────────────────────────────────────────────── */
const CELL = { border: '1px solid #E2E8F0', padding: '10px 14px', background: '#fff', fontFamily: 'Lato, sans-serif', fontSize: 13 }
const TH   = { ...CELL, background: '#F8FAFC', fontWeight: 900, fontSize: 11, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.07em' }

/* ─── Shared helpers ──────────────────────────────────────────────────── */
function SortIcon({ active, dir }) {
  return (
    <span className="inline-flex flex-col ml-1" style={{ gap: 1, verticalAlign: 'middle' }}>
      <ChevronUp   size={9} strokeWidth={3} style={{ color: active && dir === 'asc'  ? ACCENT : '#CBD5E1' }} />
      <ChevronDown size={9} strokeWidth={3} style={{ color: active && dir === 'desc' ? ACCENT : '#CBD5E1' }} />
    </span>
  )
}

function Section({ num, title, children }) {
  return (
    <div style={{ border: '1px solid #E2E8F0', borderTop: 'none' }}>
      <div className="flex items-center gap-3 px-6 py-3" style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
        <span className="text-[10px] font-black px-1.5 py-0.5"
          style={{ background: NAVY, color: '#fff', fontFamily: 'Lato, sans-serif', letterSpacing: '0.05em' }}>
          {num}
        </span>
        <h3 className="text-[14px] font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Bar({ value, label }) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-xs font-semibold w-44 flex-shrink-0" style={{ color: '#4B5563', fontFamily: 'Lato, sans-serif' }}>{label}</span>}
      <div className="flex-1 h-1.5" style={{ background: '#EEF0F3' }}>
        <div style={{ width: `${Math.min(100, value)}%`, height: '100%', background: ACCENT }} />
      </div>
      <span className="text-xs font-black w-9 text-right flex-shrink-0" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>{value}%</span>
    </div>
  )
}

function Bullet({ items, accent = false }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ background: accent ? ACCENT : NAVY, borderRadius: 1 }} />
          <span className="text-xs font-semibold text-[#4B5563]" style={{ fontFamily: 'Lato, sans-serif' }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function InlineStats({ stats }) {
  return (
    <div className="flex flex-wrap gap-0" style={{ border: '1px solid #E2E8F0' }}>
      {stats.map(({ label, value }, i) => (
        <div key={label} className="flex-1 min-w-[100px] px-5 py-4 text-center"
          style={{ borderRight: i < stats.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
          <p className="text-2xl font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>{value}</p>
          <p className="text-[11px] font-semibold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</p>
        </div>
      ))}
    </div>
  )
}

/* ─── Full Academic Report Detail ─────────────────────────────────────── */
function FullReportDetail({ report, onBack }) {
  return (
    <div style={{ maxWidth: 920 }}>

      {/* Back */}
      <button onClick={onBack}
        className="flex items-center gap-2 text-sm font-black mb-4 transition-opacity hover:opacity-70"
        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
        <ArrowLeft size={16} strokeWidth={2.5} /> Back to Reports
      </button>

      {/* Banner */}
      <div className="relative overflow-hidden" style={{ background: NAVY, border: '1px solid #E2E8F0' }}>
        <img src={report.img} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.12 }} />
        <div className="relative px-8 py-8">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2"
            style={{ color: 'rgba(3,103,160,0.85)', fontFamily: 'Lato, sans-serif' }}>
            Academic Report · {report.semester} · {report.year}
          </p>
          <h1 className="text-2xl font-black text-white leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            St. Mark's Demonstration School
          </h1>
          <p className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Lato, sans-serif' }}>
            Monrovia, Montserrado County, Liberia
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {['1st Semester · 2025–2026', 'Private Mission School', 'Grades 1–12'].map(t => (
              <span key={t} className="px-2.5 py-1 text-[11px] font-black"
                style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.60)', fontFamily: 'Lato, sans-serif' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 01 — School Profile */}
      <Section num="01" title="School Profile">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>School Type</p>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>Private Mission School</p>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>Levels Offered</p>
            <Bullet items={['Primary — Grades 1–6', 'Junior Secondary — Grades 7–9', 'Senior Secondary — Grades 10–12']} accent />
          </div>
        </div>
      </Section>

      {/* 02 — Academic Calendar */}
      <Section num="02" title="Academic Calendar">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>{['Period', 'Duration', 'Key Activities'].map(h => <th key={h} style={TH}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {[
              ['1st Semester', 'September 2025 – January 2026', 'Teaching, Continuous Assessment, Midterm & Final Exams'],
              ['2nd Semester', 'February 2026 – June 2026',     'Teaching, Projects, Final Exams'],
              ['Vacation',     'July – August 2026',            'Promotion & Preparation'],
            ].map(([period, duration, activities]) => (
              <tr key={period}>
                <td style={{ ...CELL, fontWeight: 700, color: NAVY, whiteSpace: 'nowrap' }}>{period}</td>
                <td style={{ ...CELL, color: '#4B5563', whiteSpace: 'nowrap' }}>{duration}</td>
                <td style={{ ...CELL, color: '#4B5563' }}>{activities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* 03 — Curriculum Structure */}
      <Section num="03" title="Curriculum Structure">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-0" style={{ border: '1px solid #E2E8F0' }}>
          {[
            { label: 'Core Subjects',    items: ['English Language', 'Mathematics'] },
            { label: 'General Subjects', items: ['Social Studies', 'History', 'Geography', 'Literature'] },
            { label: 'Science Subjects', items: ['General Science', 'Biology', 'Chemistry', 'Physics'] },
            { label: 'Other Subjects',   items: ['Religious & Moral Education', 'Computer Studies', 'Physical Education', 'Agriculture'] },
          ].map(({ label, items }, i) => (
            <div key={label} style={{ borderRight: i < 3 ? '1px solid #E2E8F0' : 'none' }}>
              <p className="px-4 py-2.5 text-[11px] font-black uppercase tracking-wider"
                style={{ color: ACCENT, fontFamily: 'Lato, sans-serif', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                {label}
              </p>
              <div className="px-4 py-3">
                <Bullet items={items} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — Grading System */}
      <Section num="04" title="Grading System">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>Grading Scale</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr><th style={TH}>Grade</th><th style={TH}>Meaning</th></tr></thead>
              <tbody>
                {[['1', 'Excellent'], ['2', 'Very Good'], ['3', 'Good'], ['4–6', 'Credit'], ['7–8', 'Pass'], ['9', 'Fail']].map(([g, m]) => (
                  <tr key={g}>
                    <td style={{ ...CELL, fontWeight: 900, color: NAVY }}>{g}</td>
                    <td style={{ ...CELL, color: '#4B5563' }}>{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>Assessment Breakdown</p>
            <div className="space-y-4">
              {[['Continuous Assessment (CASS)', 30], ['Final Examination (TASS)', 70]].map(([label, val]) => (
                <div key={label} className="flex items-center justify-between py-3 px-4" style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Lato, sans-serif' }}>{label}</span>
                  <span className="text-xl font-black ml-4 flex-shrink-0" style={{ color: ACCENT, fontFamily: 'Sora, sans-serif' }}>{val}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 05 — Enrollment Summary */}
      <Section num="05" title="Enrollment Summary">
        <InlineStats stats={[{ label: 'Primary', value: '320' }, { label: 'Junior Secondary', value: '210' }, { label: 'Senior Secondary', value: '170' }, { label: 'Total', value: '700' }]} />
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
          <thead><tr><th style={TH}>Level</th><th style={TH}>Students</th><th style={TH}>Share</th></tr></thead>
          <tbody>
            {[['Primary (Grades 1–6)', '320', 46], ['Junior Secondary (Grades 7–9)', '210', 30], ['Senior Secondary (Grades 10–12)', '170', 24]].map(([level, count, pct]) => (
              <tr key={level}>
                <td style={{ ...CELL, color: NAVY, fontWeight: 700 }}>{level}</td>
                <td style={{ ...CELL, fontWeight: 900, color: ACCENT }}>{count}</td>
                <td style={{ ...CELL, minWidth: 160 }}><Bar value={pct} /></td>
              </tr>
            ))}
            <tr><td style={{ ...CELL, fontWeight: 900, color: NAVY, background: '#F8FAFC' }}>Total</td><td style={{ ...CELL, fontWeight: 900, color: NAVY, background: '#F8FAFC' }}>700</td><td style={{ ...CELL, background: '#F8FAFC' }} /></tr>
          </tbody>
        </table>
      </Section>

      {/* 06 — Attendance Report */}
      <Section num="06" title="Attendance Report">
        <div className="flex items-center gap-4 mb-5 pb-5" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <span className="text-4xl font-black flex-shrink-0" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>87%</span>
          <div className="flex-1">
            <p className="text-xs font-black text-[#002333] mb-1" style={{ fontFamily: 'Lato, sans-serif' }}>Average Attendance Rate — School-wide</p>
            <Bar value={87} />
          </div>
        </div>
        <div className="space-y-3 mb-5">
          <Bar value={92} label="Highest — Grade 6" />
          <Bar value={87} label="School Average" />
          <Bar value={81} label="Lowest — Grade 11" />
        </div>
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Challenges</p>
          <Bullet items={['Transportation issues', 'Financial constraints', 'Health-related absences']} />
        </div>
      </Section>

      {/* 07 — Academic Performance */}
      <Section num="07" title="Academic Performance">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={TH}>Division</th>
              <th style={TH}>Grades</th>
              <th style={TH}>Pass Rate</th>
              <th style={TH}>Strengths</th>
              <th style={TH}>Weaknesses</th>
            </tr>
          </thead>
          <tbody>
            {[
              { div: 'Primary',          grades: '1–6',   pass: 85, strengths: ['English & Reading'],                             weaknesses: ['Maths problem-solving'] },
              { div: 'Junior Secondary', grades: '7–9',   pass: 78, strengths: ['Social Studies', 'General Science'],             weaknesses: ['Mathematics', 'English composition'] },
              { div: 'Senior Secondary', grades: '10–12', pass: 72, strengths: ['Biology', 'Geography', 'Economics'],             weaknesses: ['Physics', 'Mathematics'] },
            ].map(row => (
              <tr key={row.div}>
                <td style={{ ...CELL, fontWeight: 900, color: NAVY, whiteSpace: 'nowrap' }}>{row.div}</td>
                <td style={{ ...CELL, color: '#6B7280', whiteSpace: 'nowrap' }}>Grade {row.grades}</td>
                <td style={{ ...CELL, minWidth: 140 }}><Bar value={row.pass} /></td>
                <td style={{ ...CELL }}><Bullet items={row.strengths} accent /></td>
                <td style={{ ...CELL }}><Bullet items={row.weaknesses} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #E2E8F0' }}>
          <p className="text-[11px] font-black uppercase tracking-wider mb-3" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>WAEC Preparedness — Senior Secondary</p>
          <div className="space-y-2.5">
            <Bar value={65} label="Ready for WAEC" />
            <Bar value={20} label="Need additional support" />
          </div>
        </div>
      </Section>

      {/* 08 — Subject Performance */}
      <Section num="08" title="Subject Performance">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={TH}>Subject</th><th style={TH}>Performance</th><th style={TH}>Indicator</th></tr></thead>
          <tbody>
            {[
              ['English Language', 'Good',      75],
              ['Mathematics',      'Fair',       50],
              ['Biology',          'Very Good',  85],
              ['Chemistry',        'Fair',       52],
              ['Physics',          'Weak',       32],
              ['Social Studies',   'Good',       73],
              ['ICT / Computer',   'Improving',  60],
            ].map(([subject, perf, pct]) => (
              <tr key={subject}>
                <td style={{ ...CELL, fontWeight: 700, color: NAVY }}>{subject}</td>
                <td style={{ ...CELL }}>
                  <span className="text-xs font-black px-2.5 py-1"
                    style={{ background: 'rgba(3,103,160,0.07)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                    {perf}
                  </span>
                </td>
                <td style={{ ...CELL, minWidth: 160 }}><Bar value={pct} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* 09 — Discipline & Student Behavior */}
      <Section num="09" title="Discipline & Student Behavior">
        <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <p className="text-[11px] font-black uppercase tracking-wider" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>Overall Behavior Rating</p>
          <span className="text-sm font-black px-3 py-1"
            style={{ background: 'rgba(3,103,160,0.07)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
            Good
          </span>
        </div>
        <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Common Issues</p>
        <Bullet items={['Late attendance', 'Incomplete assignments']} />
      </Section>

      {/* 10 — Staff Performance */}
      <Section num="10" title="Staff Performance">
        <InlineStats stats={[{ label: 'Total Teachers', value: '32' }, { label: 'Qualified', value: '75%' }]} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>Strengths</p>
            <Bullet items={['Strong commitment to teaching', 'Effective use of continuous assessment']} accent />
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Challenges</p>
            <Bullet items={['Limited teaching resources', 'Need for ICT training']} />
          </div>
        </div>
      </Section>

      {/* 11 — School Facilities */}
      <Section num="11" title="School Facilities">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>Available Facilities</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {[['Classrooms', 'Adequate but crowded'], ['Science Lab', 'Partially equipped'], ['Computer Lab', 'Limited systems'], ['Library', 'Basic']].map(([name, note]) => (
                  <tr key={name}>
                    <td style={{ ...CELL, fontWeight: 700, color: NAVY, whiteSpace: 'nowrap' }}>{name}</td>
                    <td style={{ ...CELL, color: '#6B7280' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider mb-2" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>Challenges</p>
            <Bullet items={['Insufficient computers', 'Limited science equipment', 'Lack of digital learning tools']} />
          </div>
        </div>
      </Section>

      {/* 12 — Key Challenges */}
      <Section num="12" title="Key Challenges">
        <div className="space-y-2">
          {['Inadequate instructional materials', 'Weak performance in STEM subjects', 'Financial difficulties affecting attendance', 'Teacher training gaps'].map((c, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 px-4" style={{ border: '1px solid #E2E8F0', background: '#F8FAFC' }}>
              <span className="text-[10px] font-black flex-shrink-0 w-4"
                style={{ color: ACCENT, fontFamily: 'Lato, sans-serif', marginTop: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{c}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 13 — Recommendations */}
      <Section num="13" title="Recommendations">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th style={TH}>Category</th><th style={TH}>Recommendations</th></tr></thead>
          <tbody>
            {[
              ['Academic',        ['Introduce remedial classes (Math & Physics)', 'Improve continuous assessment tracking']],
              ['Technology',      ['Expand ICT integration', 'Introduce e-learning tools']],
              ['Administration',  ['Improve attendance monitoring', 'Strengthen parent-teacher engagement']],
              ['Staff Development', ['Conduct regular training workshops', 'Improve ICT skills']],
            ].map(([cat, items]) => (
              <tr key={cat}>
                <td style={{ ...CELL, fontWeight: 900, color: NAVY, whiteSpace: 'nowrap', verticalAlign: 'top' }}>{cat}</td>
                <td style={{ ...CELL }}><Bullet items={items} accent /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* 14 — Second Semester Action Plan */}
      <Section num="14" title="Second Semester Action Plan">
        <div className="space-y-2">
          {['Launch academic support programs', 'Conduct mock WAEC exams', 'Upgrade science laboratory', 'Introduce digital attendance system'].map((item, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 px-4" style={{ border: '1px solid #E2E8F0' }}>
              <span className="text-[10px] font-black flex-shrink-0"
                style={{ color: ACCENT, fontFamily: 'Lato, sans-serif', width: 16 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold text-[#374151]" style={{ fontFamily: 'Lato, sans-serif' }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 15 — Conclusion */}
      <Section num="15" title="Conclusion">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#4B5563] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
            The First Semester of the 2025–2026 academic year shows <strong style={{ color: NAVY }}>moderate progress</strong> across all divisions.
            While performance in humanities subjects remains strong, there is a clear need to improve outcomes in Mathematics and Science subjects.
          </p>
          <p className="text-sm font-semibold text-[#4B5563] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
            With focused interventions, improved teaching resources, and stronger academic support systems, the school is
            <strong style={{ color: NAVY }}> positioned to achieve better results</strong> in the second semester.
          </p>
        </div>
      </Section>

    </div>
  )
}

/* ─── Main Reports Page ────────────────────────────────────────────────── */
const PAGE_SIZE_GRID  = 8
const PAGE_SIZE_TABLE = 8

export default function PrincipalReports() {
  const [selected,       setSelected]       = useState(null)
  const [view,           setView]           = useState('grid')
  const [search,         setSearch]         = useState('')
  const [filterSemester, setFilterSemester] = useState('all')
  const [filterPeriod,   setFilterPeriod]   = useState('all')
  const [sortBy,         setSortBy]         = useState('date')
  const [sortDir,        setSortDir]        = useState('desc')
  const [page,           setPage]           = useState(0)

  const perPage = view === 'grid' ? PAGE_SIZE_GRID : PAGE_SIZE_TABLE

  const filtered = useMemo(() => {
    let list = [...REPORTS]
    if (search.trim())            list = list.filter(r => r.title.toLowerCase().includes(search.toLowerCase()))
    if (filterSemester !== 'all') list = list.filter(r => r.semester === filterSemester)
    if (filterPeriod   !== 'all') list = list.filter(r => r.period   === filterPeriod)
    list.sort((a, b) => {
      const aVal = sortBy === 'title' ? a.title : a.lastGenerated
      const bVal = sortBy === 'title' ? b.title : b.lastGenerated
      return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    })
    return list
  }, [search, filterSemester, filterPeriod, sortBy, sortDir])

  const totalPages = Math.ceil(filtered.length / perPage)
  const paginated  = filtered.slice(page * perPage, page * perPage + perPage)

  const toggleSort = (col) => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortBy(col); setSortDir('asc') }
    setPage(0)
  }

  const handleViewSwitch = (v) => { setView(v); setPage(0) }

  if (selected) {
    const report = REPORTS.find(r => r.id === selected)
    return <FullReportDetail report={report} onBack={() => setSelected(null)} />
  }

  return (
    <div className="max-w-[1180px] space-y-0">

      {/* ── Toolbar ── */}
      <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderBottom: 'none' }}>
        <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div className="relative flex-1 max-w-xs">
            <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#9CA3AF' }} />
            <input
              type="text" placeholder="Search reports…" value={search}
              onChange={e => { setSearch(e.target.value); setPage(0) }}
              className="w-full pl-8 pr-3 py-2 text-xs font-semibold outline-none"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', color: NAVY, fontFamily: 'Lato, sans-serif' }}
            />
          </div>
          <div className="flex-1" />
          <div className="flex" style={{ border: '1px solid #E2E8F0' }}>
            {[['grid', LayoutGrid], ['table', List]].map(([v, Icon]) => (
              <button key={v} onClick={() => handleViewSwitch(v)}
                className="flex items-center justify-center w-9 h-8 transition-colors"
                style={{ background: view === v ? NAVY : '#F8FAFC', color: view === v ? '#fff' : '#9CA3AF', borderRight: v === 'grid' ? '1px solid #E2E8F0' : 'none' }}>
                <Icon size={14} strokeWidth={2.5} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 px-5 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Semester</span>
            <div className="flex">
              {['all', ...SEMESTERS].map((s, i) => (
                <button key={s} onClick={() => { setFilterSemester(s); setPage(0) }}
                  className="px-3 py-1.5 text-[11px] font-black transition-colors"
                  style={{ background: filterSemester === s ? NAVY : '#F8FAFC', color: filterSemester === s ? '#fff' : '#6B7280', border: '1px solid #E2E8F0', borderLeft: i > 0 ? 'none' : '1px solid #E2E8F0', fontFamily: 'Lato, sans-serif' }}>
                  {s === 'all' ? 'All' : s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Period</span>
            <div className="flex">
              {['all', ...PERIODS].map((p, i) => (
                <button key={p} onClick={() => { setFilterPeriod(p); setPage(0) }}
                  className="px-3 py-1.5 text-[11px] font-black transition-colors"
                  style={{ background: filterPeriod === p ? ACCENT : '#F8FAFC', color: filterPeriod === p ? '#fff' : '#6B7280', border: '1px solid #E2E8F0', borderLeft: i > 0 ? 'none' : '1px solid #E2E8F0', fontFamily: 'Lato, sans-serif' }}>
                  {p === 'all' ? 'All' : p.replace('Period ', 'P')}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <ArrowUpDown size={13} strokeWidth={2.5} style={{ color: '#9CA3AF' }} />
            <span className="text-[11px] font-black uppercase text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>Sort by</span>
            <div className="flex">
              {[['date', 'Date'], ['title', 'Title']].map(([val, label], i) => (
                <button key={val} onClick={() => toggleSort(val)}
                  className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-black transition-colors"
                  style={{ background: sortBy === val ? ACCENT : '#F8FAFC', color: sortBy === val ? '#fff' : '#6B7280', border: '1px solid #E2E8F0', borderLeft: i > 0 ? 'none' : '1px solid #E2E8F0', fontFamily: 'Lato, sans-serif' }}>
                  {label}
                  {sortBy === val && (sortDir === 'asc' ? <ChevronUp size={10} strokeWidth={3} /> : <ChevronDown size={10} strokeWidth={3} />)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid view ── */}
      {view === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          style={{ border: '1px solid #E2E8F0', borderTop: 'none' }}>
          {paginated.length === 0
            ? <p className="col-span-4 py-12 text-center text-sm font-black text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>No reports match your filters.</p>
            : paginated.map((r, i) => (
              <div key={r.id} className="flex flex-col"
                style={{ background: '#fff', borderRight: (i + 1) % 4 !== 0 ? '1px solid #E2E8F0' : 'none', borderBottom: '1px solid #E2E8F0' }}>
                <img src={r.img} alt={r.title} className="w-full object-cover" style={{ height: 140 }} />
                <div className="px-4 pt-3 pb-4 flex flex-col gap-1">
                  <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{r.title}</p>
                  <p className="text-[11px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{r.semester} · {r.period} · {r.lastGenerated}</p>
                  <button onClick={() => setSelected(r.id)}
                    className="flex items-center gap-1.5 mt-2 text-xs font-black transition-opacity hover:opacity-70 self-start"
                    style={{ color: ACCENT, fontFamily: 'Lato, sans-serif', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                    <Eye size={13} strokeWidth={2.5} /> View Report <ArrowRight size={12} strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {/* ── Table view ── */}
      {view === 'table' && (
        <div style={{ border: '1px solid #E2E8F0', borderTop: 'none' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...TH, width: 96 }} />
                <th style={{ ...TH, cursor: 'pointer' }} onClick={() => toggleSort('title')}>Report <SortIcon active={sortBy === 'title'} dir={sortDir} /></th>
                <th style={TH}>Semester</th>
                <th style={TH}>Period</th>
                <th style={{ ...TH, cursor: 'pointer' }} onClick={() => toggleSort('date')}>Generated <SortIcon active={sortBy === 'date'} dir={sortDir} /></th>
                <th style={{ ...TH, textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0
                ? <tr><td colSpan={6} style={{ ...CELL, textAlign: 'center', color: '#9CA3AF', fontWeight: 700 }}>No reports match your filters.</td></tr>
                : paginated.map(r => (
                  <tr key={r.id}
                    onMouseEnter={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '#F8FAFC')}
                    onMouseLeave={e => e.currentTarget.querySelectorAll('td').forEach(td => td.style.background = '#fff')}>
                    <td style={{ ...CELL, padding: '10px 12px' }}>
                      <img src={r.img} alt={r.title} style={{ width: 80, height: 52, objectFit: 'cover', display: 'block' }} />
                    </td>
                    <td style={CELL}>
                      <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{r.title}</p>
                      <p className="text-xs font-semibold text-[#9CA3AF] mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{r.subtitle}</p>
                    </td>
                    <td style={{ ...CELL, whiteSpace: 'nowrap' }}>
                      <span className="text-xs font-black px-2.5 py-1" style={{ background: 'rgba(3,103,160,0.07)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>{r.semester}</span>
                    </td>
                    <td style={{ ...CELL, whiteSpace: 'nowrap' }}>
                      <span className="text-xs font-black px-2.5 py-1" style={{ background: 'rgba(0,35,51,0.05)', color: NAVY, fontFamily: 'Lato, sans-serif' }}>{r.period}</span>
                    </td>
                    <td style={{ ...CELL, whiteSpace: 'nowrap', fontSize: 12, fontWeight: 600, color: '#6B7280' }}>{r.lastGenerated}</td>
                    <td style={{ ...CELL, textAlign: 'center' }}>
                      <button onClick={() => setSelected(r.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-black transition-opacity hover:opacity-70"
                        style={{ color: ACCENT, fontFamily: 'Lato, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Eye size={13} strokeWidth={2.5} /> View Report <ArrowRight size={11} strokeWidth={2.5} />
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between px-5 py-3"
        style={{ background: '#fff', border: '1px solid #E2E8F0', borderTop: 'none' }}>
        <p className="text-xs font-black text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
          {filtered.length} report{filtered.length !== 1 ? 's' : ''}{totalPages > 1 ? ` · Page ${page + 1} of ${totalPages}` : ''}
        </p>
        {totalPages > 1 && (
          <div className="flex gap-1">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
              className="flex items-center justify-center w-8 h-8"
              style={{ border: '1px solid #E2E8F0', background: page === 0 ? '#F8FAFC' : '#fff', color: page === 0 ? '#CBD5E1' : NAVY, cursor: page === 0 ? 'not-allowed' : 'pointer' }}>
              <ChevronLeft size={13} strokeWidth={2.5} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i)}
                className="flex items-center justify-center w-8 h-8 text-xs font-black"
                style={{ border: '1px solid #E2E8F0', background: page === i ? NAVY : '#fff', color: page === i ? '#fff' : NAVY, fontFamily: 'Lato, sans-serif', cursor: 'pointer' }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page === totalPages - 1}
              className="flex items-center justify-center w-8 h-8"
              style={{ border: '1px solid #E2E8F0', background: page === totalPages - 1 ? '#F8FAFC' : '#fff', color: page === totalPages - 1 ? '#CBD5E1' : NAVY, cursor: page === totalPages - 1 ? 'not-allowed' : 'pointer' }}>
              <ChevronRight size={13} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </div>

    </div>
  )
}
