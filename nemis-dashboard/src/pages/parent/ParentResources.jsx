import { useState } from 'react'
import { Download, FileText, Calendar, DollarSign, BookOpen } from 'lucide-react'
import { children, parentResources } from '../../data/parentData'

const ACCENT = '#C084FC'

const CAT_ICONS = {
  Guidelines: BookOpen,
  Calendar:   Calendar,
  Finance:    DollarSign,
}

export default function ParentResources({ selectedChild, setSelectedChild }) {
  const [filter, setFilter] = useState('all')
  const child = children.find(c => c.id === selectedChild) || children[0]
  const isUL = child.type === 'university'

  const filtered = parentResources.filter(r => {
    if (isUL) return true
    if (r.forUniversity) return false
    if (filter === 'all') return true
    return r.category === filter
  }).filter(r => {
    if (!isUL && filter !== 'all') return r.category === filter
    return true
  })

  const categories = ['all', 'Guidelines', 'Calendar', 'Finance']

  return (
    <div className="space-y-5">
      {/* Child tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {children.map(c => (
          <button key={c.id} onClick={() => setSelectedChild(c.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0 transition-all"
            style={{
              background: selectedChild === c.id ? '#002333' : '#fff',
              border: `1.5px solid ${selectedChild === c.id ? ACCENT : '#EEF0F3'}`,
            }}>
            <img src={`https://randomuser.me/api/portraits/${c.gender}/${c.photoId}.jpg`}
              alt={c.name} className="rounded-full" style={{ width: 22, height: 22 }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <span className="text-xs font-bold whitespace-nowrap"
              style={{ color: selectedChild === c.id ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
              {c.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Context note */}
      <div className="px-4 py-3 rounded-xl flex items-center gap-2"
        style={{ background: 'rgba(192,132,252,0.07)', border: '1px solid rgba(192,132,252,0.18)' }}>
        <FileText size={14} color={ACCENT} strokeWidth={2.5} />
        <p className="text-xs font-bold text-[#002333]" style={{ fontFamily: 'Roboto, sans-serif' }}>
          {isUL
            ? `Showing university resources for ${child.name} (${child.program})`
            : `Showing school resources for ${child.name} · ${child.school}`}
        </p>
      </div>

      {/* Category filter */}
      {!isUL && (
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className="px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0 transition-all capitalize"
              style={{
                background: filter === cat ? '#002333' : '#fff',
                color: filter === cat ? '#fff' : '#6B7280',
                border: `1.5px solid ${filter === cat ? ACCENT : '#EEF0F3'}`,
                fontFamily: 'Roboto, sans-serif',
              }}>
              {cat === 'all' ? 'All Resources' : cat}
            </button>
          ))}
        </div>
      )}

      {/* Resource cards */}
      <div className="space-y-3">
        {filtered.map(r => {
          const Icon = CAT_ICONS[r.category] || FileText
          return (
            <div key={r.id} className="flex items-center gap-4 p-4 rounded-2xl"
              style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(192,132,252,0.10)' }}>
                <Icon size={18} color={ACCENT} strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#002333] truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{r.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(0,35,51,0.06)', color: '#6B7280', fontFamily: 'Roboto, sans-serif' }}>
                    {r.category}
                  </span>
                  <span className="text-[10px] text-[#9CA3AF]">{r.type} · {r.size}</span>
                </div>
              </div>
              <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:opacity-80"
                style={{ background: '#002333' }}>
                <Download size={14} color="#fff" strokeWidth={2.5} />
              </button>
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-xs text-[#9CA3AF]">No resources available for this selection.</div>
        )}
      </div>
    </div>
  )
}
