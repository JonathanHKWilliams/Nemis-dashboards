import { useState } from 'react'
import { subjects } from '../../data/studentData'
import { Clock, MapPin, Hash, BookOpen, Leaf, Landmark, Monitor, Zap, X, Calendar } from 'lucide-react'

const subjectIcons = {
  Mathematics: Hash,
  English:     BookOpen,
  Biology:     Leaf,
  History:     Landmark,
  ICT:         Monitor,
  Physics:     Zap,
}

const subjectDetails = {
  Mathematics: {
    desc: 'Covers algebra, geometry, trigonometry, statistics, and problem-solving techniques aligned with the Grade 9 national curriculum.',
    topics: ['Algebra & Equations', 'Geometry & Angles', 'Statistics & Probability', 'Trigonometry Basics', 'Word Problems'],
  },
  English: {
    desc: 'Develops reading comprehension, writing skills, grammar, literature analysis, and oral communication for Grade 9 students.',
    topics: ['Essay Writing', 'Grammar & Punctuation', 'Literature Analysis', 'Comprehension', 'Oral Presentations'],
  },
  Biology: {
    desc: 'Explores the science of living organisms including cells, genetics, ecosystems, and human biology through theory and lab work.',
    topics: ['Cell Structure & Division', 'Genetics & Heredity', 'Human Body Systems', 'Ecosystems', 'Lab Practicals'],
  },
  History: {
    desc: 'Studies world and African history including colonialism, independence movements, civil rights, and political developments.',
    topics: ['African History', 'Civil Rights Movement', 'Colonialism & Independence', 'World Wars', 'Liberian History'],
  },
  ICT: {
    desc: 'Introduces computing concepts, software applications, internet use, basic programming, and digital literacy skills.',
    topics: ['Computer Basics', 'Microsoft Office Suite', 'Internet & Safety', 'Web Design (HTML/CSS)', 'Programming Logic'],
  },
  Physics: {
    desc: 'Covers mechanics, forces, energy, electricity, waves, and optics through theory, calculations, and experiments.',
    topics: ["Newton's Laws", 'Energy & Work', 'Electricity & Magnetism', 'Waves & Sound', 'Optics & Light'],
  },
}

function SubjectModal({ sub, onClose }) {
  const Icon   = subjectIcons[sub.name] || BookOpen
  const detail = subjectDetails[sub.name] || { desc: '', topics: [] }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,35,51,0.45)', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl w-full max-w-[520px] overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,35,51,0.25)', border: '2px solid #EEF0F3' }}>

        <div className="px-7 py-5 flex items-start gap-4" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(255,255,255,0.12)' }}>
            <Icon size={24} color="white" strokeWidth={3} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{sub.name}</h3>
            <p className="text-sm font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Roboto, sans-serif' }}>
              Grade 9A · {sub.periods} periods/week
            </p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={16} color="white" strokeWidth={3} />
          </button>
        </div>

        <div className="px-7 py-6 space-y-5">
          <div className="flex items-center gap-3">
            <img
              src={`https://randomuser.me/api/portraits/${sub.teacherGender}/${sub.teacherPhotoId}.jpg`}
              alt={sub.teacher}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 44, height: 44, border: '2px solid #EEF0F3' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{sub.teacher}</p>
              <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>Subject Teacher</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-[#374151] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>
            {detail.desc}
          </p>

          <div>
            <p className="text-xs font-black uppercase tracking-widest text-[#6B7280] mb-3" style={{ fontFamily: 'Roboto, sans-serif' }}>Topics Covered</p>
            <div className="space-y-2">
              {detail.topics.map((t, i) => (
                <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-xl" style={{ background: '#F4F6F8' }}>
                  <span className="text-xs font-black text-[#9CA3AF] w-5 flex-shrink-0" style={{ fontFamily: 'Roboto, sans-serif' }}>{i + 1}</span>
                  <span className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2" style={{ borderTop: '1px solid #F4F6F8' }}>
            <div className="flex items-center gap-1.5">
              <MapPin size={13} color="#9CA3AF" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub.classroom}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} color="#9CA3AF" strokeWidth={2.5} />
              <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub.periods} × 55 min/week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SubjectCard({ sub, onClick }) {
  const Icon = subjectIcons[sub.name] || BookOpen
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden cursor-pointer"
      style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,35,51,0.12)'
        e.currentTarget.style.borderColor = 'rgba(0,35,51,0.18)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 1px 6px rgba(0,35,51,0.05)'
        e.currentTarget.style.borderColor = '#EEF0F3'
      }}>
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(0,35,51,0.06)' }}>
              <Icon size={20} color="#002333" strokeWidth={3} />
            </div>
            <h3 className="text-base font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{sub.name}</h3>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-black flex-shrink-0 ml-2"
            style={{ background: 'rgba(0,35,51,0.06)', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
            {sub.periods} pw
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img
              src={`https://randomuser.me/api/portraits/${sub.teacherGender}/${sub.teacherPhotoId}.jpg`}
              alt={sub.teacher}
              className="rounded-full object-cover"
              style={{ width: 40, height: 40, border: '2px solid #EEF0F3' }}
              onError={e => {
                e.target.style.display = 'none'
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex'
              }}
            />
            <div className="rounded-full items-center justify-center font-bold"
              style={{ width: 40, height: 40, background: 'rgba(0,35,51,0.08)', color: '#002333', display: 'none', fontSize: 14, fontFamily: 'Sora, sans-serif', border: '2px solid #EEF0F3', position: 'absolute', top: 0, left: 0 }}>
              {sub.teacher.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
          </div>
          <div>
            <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub.teacher}</p>
            <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>Subject Teacher</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-3" style={{ borderTop: '1px solid #F4F6F8' }}>
          <MapPin size={13} color="#9CA3AF" strokeWidth={2.5} />
          <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub.classroom}</span>
          <Clock size={13} color="#9CA3AF" strokeWidth={2.5} className="ml-2" />
          <span className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{sub.periods} × 55 min</span>
        </div>
      </div>
    </div>
  )
}

export default function StudentSubjects() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="space-y-6 max-w-[960px]">
      {selected && <SubjectModal sub={selected} onClose={() => setSelected(null)} />}

      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>My Subjects</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Enrolled subjects for Grade 9A · 2025–2026 · Click a card for details
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2" style={{ border: '1px solid #EEF0F3' }}>
          <span className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{subjects.length}</span>
          <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Subjects</span>
        </div>
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2" style={{ border: '1px solid #EEF0F3' }}>
          <span className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>
            {subjects.reduce((sum, s) => sum + s.periods, 0)}
          </span>
          <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Periods/week</span>
        </div>
        <div className="bg-white rounded-xl px-4 py-3 flex items-center gap-2" style={{ border: '1px solid #EEF0F3' }}>
          <span className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{subjects.length}</span>
          <span className="text-sm font-black text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>Teachers</span>
        </div>
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {subjects.map(sub => (
          <SubjectCard key={sub.id} sub={sub} onClick={() => setSelected(sub)} />
        ))}
      </div>
    </div>
  )
}
