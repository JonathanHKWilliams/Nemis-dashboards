import { useState } from 'react'
import { resources } from '../../data/studentData'
import { BookOpen, FileText, Video, HelpCircle, Download, Book, ArrowLeft, ChevronDown, ChevronRight, CheckCircle2, Play } from 'lucide-react'

const subjectColors = {
  Mathematics: { color: '#2563EB', bg: 'rgba(37,99,235,0.08)' },
  English:     { color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  Biology:     { color: '#16A34A', bg: 'rgba(22,163,74,0.08)' },
  History:     { color: '#D97706', bg: 'rgba(217,119,6,0.08)' },
  ICT:         { color: '#0891B2', bg: 'rgba(8,145,178,0.08)' },
  Physics:     { color: '#A60003', bg: 'rgba(166,0,3,0.07)' },
}

const categoryConfig = {
  ebook:    { icon: BookOpen,   label: 'E-book',         bg: 'rgba(37,99,235,0.08)'  },
  notes:    { icon: FileText,   label: 'Lecture Notes',  bg: 'rgba(124,58,237,0.08)' },
  video:    { icon: Video,      label: 'Video Lesson',   bg: 'rgba(166,0,3,0.07)'    },
  past:     { icon: HelpCircle, label: 'Past Questions', bg: 'rgba(217,119,6,0.08)'  },
  download: { icon: Download,   label: 'Download',       bg: 'rgba(22,163,74,0.08)'  },
}

const cardImages = {
  1: 'https://picsum.photos/seed/math9/400/200',
  2: 'https://picsum.photos/seed/english9/400/200',
  3: 'https://picsum.photos/seed/biology9/400/200',
  4: 'https://picsum.photos/seed/history9/400/200',
  5: 'https://picsum.photos/seed/ict9/400/200',
  6: 'https://picsum.photos/seed/physics9/400/200',
  7: 'https://picsum.photos/seed/english2/400/200',
  8: 'https://picsum.photos/seed/biology2/400/200',
}

function getCourseOutline(res) {
  return [
    { section: 'Introduction', lessons: [`Overview of ${res.subject}`, 'Learning Objectives', 'How to Use This Material'] },
    { section: 'Core Content',  lessons: ['Chapter 1: Foundations', 'Chapter 2: Key Concepts', 'Chapter 3: Applications'] },
    { section: 'Practice',      lessons: ['Worked Examples', 'Practice Questions', 'Self-Assessment'] },
    { section: 'Review',        lessons: ['Summary Notes', 'Key Terms', 'Further Reading'] },
  ]
}

function mockContent(res) {
  return `Welcome to "${res.title}".\n\nThis ${res.type} has been prepared by ${res.uploadedBy} to support your learning in ${res.subject}.\n\n📌 Learning Objectives\nBy the end of this material, you will be able to:\n• Understand core concepts in ${res.subject}\n• Apply key principles to solve problems\n• Prepare effectively for examinations\n\n📖 Introduction\nThis resource covers the essential topics outlined in the Grade 9 syllabus. Study each section carefully and complete all practice exercises.\n\n✅ How to Study Effectively\n1. Read through the entire section first.\n2. Take notes on key concepts.\n3. Attempt all practice questions.\n4. Review any areas you found difficult.\n5. Ask your teacher if you need clarification.\n\n📝 Note\nThis material is for educational purposes within ${res.subject} for Grade 9A students of St. Peter High School.`
}

function ResourceReader({ res, onClose }) {
  const outline = getCourseOutline(res)
  const [openSec, setOpenSec] = useState(0)
  const [activeLesson, setActiveLesson] = useState({ sec: 0, lesson: 0 })
  const subj = subjectColors[res.subject] || { color: '#6B7280', bg: 'rgba(107,114,128,0.08)' }
  const cat  = categoryConfig[res.category] || categoryConfig.notes
  const Icon = cat.icon

  const currentTitle = outline[activeLesson.sec]?.lessons[activeLesson.lesson] || ''
  const totalLessons = outline.reduce((sum, s) => sum + s.lessons.length, 0)
  const doneIdx = outline.slice(0, activeLesson.sec).reduce((sum, s) => sum + s.lessons.length, 0) + activeLesson.lesson
  const pct = Math.round(((doneIdx + 1) / totalLessons) * 100)

  function goPrev() {
    if (activeLesson.lesson > 0) {
      setActiveLesson(prev => ({ ...prev, lesson: prev.lesson - 1 }))
    } else if (activeLesson.sec > 0) {
      const prevSec = activeLesson.sec - 1
      setActiveLesson({ sec: prevSec, lesson: outline[prevSec].lessons.length - 1 })
      setOpenSec(prevSec)
    }
  }
  function goNext() {
    const secLessons = outline[activeLesson.sec].lessons
    if (activeLesson.lesson < secLessons.length - 1) {
      setActiveLesson(prev => ({ ...prev, lesson: prev.lesson + 1 }))
    } else if (activeLesson.sec < outline.length - 1) {
      const nextSec = activeLesson.sec + 1
      setActiveLesson({ sec: nextSec, lesson: 0 })
      setOpenSec(nextSec)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex" style={{ background: '#F4F6F8' }}>
      {/* Sidebar */}
      <div className="flex flex-col flex-shrink-0 bg-white overflow-hidden"
        style={{ width: 280, borderRight: '2px solid #EEF0F3', height: '100vh' }}>
        <button onClick={onClose}
          className="flex items-center gap-2 px-4 py-4 text-sm font-black text-[#002333] hover:bg-[#F4F6F8] transition-colors flex-shrink-0"
          style={{ fontFamily: 'Sora, sans-serif', borderBottom: '1px solid #F4F6F8' }}>
          <ArrowLeft size={16} strokeWidth={3} /> Back to Resources
        </button>

        <div className="px-4 py-4 flex-shrink-0" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={14} color={subj.color} strokeWidth={3} />
            <span className="text-xs font-black px-2 py-0.5 rounded-full"
              style={{ background: subj.bg, color: subj.color, fontFamily: 'Roboto, sans-serif' }}>{res.subject}</span>
          </div>
          <p className="text-sm font-black text-[#002333] leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>{res.title}</p>
          <p className="text-xs font-bold text-[#9CA3AF] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>by {res.uploadedBy}</p>
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-[#6B7280] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>Progress</span>
              <span className="text-[10px] font-black text-[#002333]">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full" style={{ background: '#EEF0F3' }}>
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#48D08C' }} />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <p className="px-4 pt-2 pb-1 text-[10px] font-black uppercase tracking-wider text-[#9CA3AF]"
            style={{ fontFamily: 'Roboto, sans-serif' }}>Course Outline</p>
          {outline.map((sec, si) => (
            <div key={si}>
              <button onClick={() => setOpenSec(openSec === si ? -1 : si)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-[#F4F6F8] transition-colors">
                <span className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{sec.section}</span>
                {openSec === si
                  ? <ChevronDown size={14} color="#9CA3AF" strokeWidth={3} />
                  : <ChevronRight size={14} color="#9CA3AF" strokeWidth={3} />}
              </button>
              {openSec === si && sec.lessons.map((lesson, li) => {
                const isActive = activeLesson.sec === si && activeLesson.lesson === li
                const isDone   = si < activeLesson.sec || (si === activeLesson.sec && li < activeLesson.lesson)
                return (
                  <button key={li}
                    onClick={() => setActiveLesson({ sec: si, lesson: li })}
                    className="w-full flex items-center gap-2.5 px-6 py-2 text-left transition-colors"
                    style={{ background: isActive ? 'rgba(72,208,140,0.1)' : 'transparent' }}>
                    {isDone
                      ? <CheckCircle2 size={13} color="#48D08C" strokeWidth={3} />
                      : isActive
                        ? <Play size={13} color="#002333" strokeWidth={3} />
                        : <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ borderColor: '#D1D5DB' }} />}
                    <span className="text-xs font-bold truncate"
                      style={{ color: isActive ? '#002333' : '#6B7280', fontFamily: 'Roboto, sans-serif' }}>
                      {lesson}
                    </span>
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-8 py-4 bg-white flex-shrink-0"
          style={{ borderBottom: '2px solid #EEF0F3' }}>
          <div>
            <p className="text-xs font-black text-[#9CA3AF] uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>
              {outline[activeLesson.sec]?.section}
            </p>
            <h2 className="text-lg font-black text-[#002333] mt-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>{currentTitle}</h2>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
            style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
            <Download size={14} strokeWidth={3} /> Download
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-8">
          <div className="w-full rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
            <img src={cardImages[res.id] || 'https://picsum.photos/seed/resource/800/200'}
              alt={res.title} className="w-full h-full object-cover" />
          </div>

          <div className="max-w-[680px]">
            <h3 className="text-xl font-black text-[#002333] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{currentTitle}</h3>
            {mockContent(res).split('\n\n').map((para, i) => (
              <p key={i} className="text-sm font-semibold text-[#374151] leading-relaxed mb-4"
                style={{ fontFamily: 'Roboto, sans-serif', whiteSpace: 'pre-line' }}>{para}</p>
            ))}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 max-w-[680px]"
            style={{ borderTop: '2px solid #EEF0F3' }}>
            <button onClick={goPrev}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black transition-colors"
              style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
              ← Previous
            </button>
            <span className="text-xs font-black text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Lesson {doneIdx + 1} of {totalLessons}
            </span>
            <button onClick={goNext}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
              style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResourceCard({ res, onRead }) {
  const cat  = categoryConfig[res.category] || categoryConfig.notes
  const subj = subjectColors[res.subject]   || { color: '#6B7280', bg: 'rgba(107,114,128,0.08)' }
  const Icon = cat.icon

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col"
      style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: 140 }}>
        <img src={cardImages[res.id] || 'https://picsum.photos/seed/default/400/200'}
          alt={res.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,35,51,0.65) 0%, transparent 55%)' }} />
        <div className="absolute bottom-2.5 left-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black text-white"
            style={{ background: 'rgba(0,35,51,0.75)', backdropFilter: 'blur(4px)', fontFamily: 'Roboto, sans-serif' }}>
            <Icon size={10} color="white" strokeWidth={3} />
            {cat.label}
          </span>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-black text-[#002333] leading-snug flex-1" style={{ fontFamily: 'Sora, sans-serif' }}>{res.title}</h4>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-black flex-shrink-0"
            style={{ background: subj.bg, color: subj.color, fontFamily: 'Roboto, sans-serif' }}>{res.subject}</span>
        </div>
        <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>by {res.uploadedBy}</p>

        <div className="flex gap-2 mt-auto pt-1">
          <button onClick={() => onRead(res)}
            className="flex-1 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-opacity hover:opacity-80"
            style={{ background: '#002333', color: '#fff', fontFamily: 'Roboto, sans-serif' }}>
            <Book size={12} strokeWidth={3} />
            {res.category === 'video' ? 'Watch' : 'Read'}
          </button>
          <button title="Download"
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:bg-[#EEF0F3]"
            style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3' }}>
            <Download size={15} color="#002333" strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function StudentResources() {
  const [reader, setReader] = useState(null)

  if (reader) return <ResourceReader res={reader} onClose={() => setReader(null)} />

  return (
    <div className="space-y-6 max-w-[960px]">
      <div>
        <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Learning Resources</h2>
        <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
          Shared materials for Grade 9A · Academic Year 2025–2026
        </p>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap">
        {Object.entries(categoryConfig).map(([key, cfg]) => {
          const Icon  = cfg.icon
          const count = resources.filter(r => r.category === key).length
          if (!count) return null
          return (
            <div key={key} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white"
              style={{ border: '1.5px solid #EEF0F3' }}>
              <Icon size={13} color="#002333" strokeWidth={3} />
              <span className="text-xs font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{cfg.label}</span>
              <span className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>({count})</span>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {resources.map(res => (
          <ResourceCard key={res.id} res={res} onRead={setReader} />
        ))}
      </div>
    </div>
  )
}
