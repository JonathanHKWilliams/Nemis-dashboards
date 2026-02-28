import { useState } from 'react'
import { teacherResources } from '../../data/teacherData'
import { BookOpen, FileText, Video, HelpCircle, Download, Plus, X, UploadCloud, Eye, Pencil, Trash2 } from 'lucide-react'

const categoryConfig = {
  ebook:    { icon: BookOpen,   label: 'E-book',         color: '#2563EB', bg: 'rgba(37,99,235,0.08)'  },
  notes:    { icon: FileText,   label: 'Notes',          color: '#7C3AED', bg: 'rgba(124,58,237,0.08)' },
  video:    { icon: Video,      label: 'Video',          color: '#A60003', bg: 'rgba(166,0,3,0.07)'    },
  past:     { icon: HelpCircle, label: 'Past Questions', color: '#D97706', bg: 'rgba(217,119,6,0.08)'  },
  download: { icon: Download,   label: 'Worksheet',      color: '#16A34A', bg: 'rgba(22,163,74,0.08)'  },
}

const classLabel = { G9A: 'Grade 9A', G9B: 'Grade 9B', both: 'All Classes' }

function UploadModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,35,51,0.45)', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl w-full max-w-[520px] overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,35,51,0.25)' }}>
        <div className="px-7 py-5 flex items-center justify-between" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <h3 className="text-lg font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Upload Resource</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={16} color="white" strokeWidth={3} />
          </button>
        </div>
        <div className="px-7 py-6 space-y-4">
          {[
            { label: 'Title', type: 'text', placeholder: 'Resource title' },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{f.label}</label>
              <input type="text" placeholder={f.placeholder}
                className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                onFocus={e => { e.target.style.borderColor = '#002333' }}
                onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Class</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: '#fff' }}>
                <option value="G9A">Grade 9A</option>
                <option value="G9B">Grade 9B</option>
                <option value="both">Both Classes</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Type</label>
              <select className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: '#fff' }}>
                {Object.entries(categoryConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-black text-[#002333] mb-1.5" style={{ fontFamily: 'Roboto, sans-serif' }}>Description</label>
            <textarea rows={2} placeholder="Brief description of the resource…"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none resize-none"
              style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
              onFocus={e => { e.target.style.borderColor = '#002333' }}
              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
          </div>
          {/* File upload area */}
          <div className="flex flex-col items-center justify-center py-8 rounded-2xl cursor-pointer transition-colors"
            style={{ border: '2px dashed #D1D5DB', background: '#FAFBFC' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#002333'; e.currentTarget.style.background = '#F4F6F8' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#D1D5DB'; e.currentTarget.style.background = '#FAFBFC' }}>
            <UploadCloud size={28} color="#9CA3AF" strokeWidth={2} />
            <p className="text-sm font-black text-[#9CA3AF] mt-2" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Drag & drop or click to browse
            </p>
            <p className="text-xs font-bold text-[#D1D5DB] mt-1" style={{ fontFamily: 'Roboto, sans-serif' }}>
              PDF, DOCX, PPTX, MP4, up to 50MB
            </p>
          </div>
        </div>
        <div className="px-7 py-4 flex items-center justify-end gap-3" style={{ borderTop: '2px solid #EEF0F3' }}>
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-black transition-colors hover:bg-[#EEF0F3]"
            style={{ color: '#6B7280', fontFamily: 'Roboto, sans-serif' }}>Cancel</button>
          <button onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
            style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>Upload</button>
        </div>
      </div>
    </div>
  )
}

export default function TeacherResources() {
  const [showUpload, setShowUpload]     = useState(false)
  const [filterCat, setFilterCat]       = useState('all')
  const [filterClass, setFilterClass]   = useState('all')

  const filtered = teacherResources.filter(r =>
    (filterCat === 'all' || r.category === filterCat) &&
    (filterClass === 'all' || r.classId === filterClass || r.classId === 'both')
  )

  return (
    <div className="space-y-6 max-w-[960px]">
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}

      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Learning Resources</h2>
          <p className="text-sm font-bold text-[#6B7280] mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Materials shared with your classes · Students see these instantly
          </p>
        </div>
        <button onClick={() => setShowUpload(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
          style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
          <Plus size={16} strokeWidth={3} /> Upload Resource
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EEF0F3' }}>
          {[{ key: 'all', label: 'All' }, ...Object.entries(categoryConfig).map(([k, v]) => ({ key: k, label: v.label }))].map(f => (
            <button key={f.key}
              onClick={() => setFilterCat(f.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-black transition-all"
              style={{
                background: filterCat === f.key ? '#002333' : 'transparent',
                color: filterCat === f.key ? '#fff' : '#6B7280',
                fontFamily: 'Roboto, sans-serif',
              }}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border: '1px solid #EEF0F3' }}>
          {[{ key: 'all', label: 'All Classes' }, { key: 'G9A', label: 'Grade 9A' }, { key: 'G9B', label: 'Grade 9B' }].map(f => (
            <button key={f.key}
              onClick={() => setFilterClass(f.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-black transition-all"
              style={{
                background: filterClass === f.key ? '#002333' : 'transparent',
                color: filterClass === f.key ? '#fff' : '#6B7280',
                fontFamily: 'Roboto, sans-serif',
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl overflow-hidden"
        style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: '#002333' }}>
                {['Title', 'Class', 'Type', 'Uploaded', 'Views', 'Actions'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-[11px] font-black uppercase tracking-wider text-white"
                    style={{ fontFamily: 'Roboto, sans-serif' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-sm font-bold text-[#9CA3AF]"
                  style={{ fontFamily: 'Roboto, sans-serif' }}>No resources found.</td></tr>
              ) : filtered.map(r => {
                const cat = categoryConfig[r.category] || categoryConfig.notes
                const Icon = cat.icon
                return (
                  <tr key={r.id} style={{ borderTop: '2px solid #EEF0F3' }}
                    className="transition-colors"
                    onMouseEnter={e => { e.currentTarget.style.background = '#FAFBFC' }}
                    onMouseLeave={e => { e.currentTarget.style.background = '' }}>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{r.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-black px-2.5 py-1 rounded-lg"
                        style={{ background: 'rgba(0,35,51,0.07)', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        {classLabel[r.classId] || r.classId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
                        style={{ background: cat.bg }}>
                        <Icon size={11} color="#002333" strokeWidth={3} />
                        <span className="text-[11px] font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{cat.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-[#4B5563]"
                      style={{ fontFamily: 'Roboto, sans-serif' }}>{r.uploaded}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.views}</span>
                      <span className="text-xs font-bold text-[#9CA3AF] ml-1" style={{ fontFamily: 'Roboto, sans-serif' }}>views</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#F4F6F8]">
                          <Eye size={14} color="#002333" strokeWidth={3} />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#F4F6F8]">
                          <Pencil size={14} color="#002333" strokeWidth={3} />
                        </button>
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[rgba(166,0,3,0.08)]">
                          <Trash2 size={14} color="#9CA3AF" strokeWidth={3} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
