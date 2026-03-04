import { useState } from 'react'
import { Send, Megaphone, MessageSquare, CheckCircle } from 'lucide-react'
import { ministerMessages, ministerProfile } from '../../data/ministerData'

const ACCENT = '#4F46E5'

const ANNOUNCEMENTS = [
  { id: 'MA-001', title: 'Urgent: Infrastructure Inspection Mandate', target: 'All CEOs', priority: 'Critical', date: '2026-02-28', message: 'All CEOs must conduct immediate infrastructure safety inspections in schools rated Poor or Critical. Report to MOE by March 10.' },
  { id: 'MA-002', title: 'Q1 2026 Report Submission Deadline', target: 'All Schools', priority: 'High', date: '2026-02-20', message: 'Reminder: Q1 2026 academic reports are due March 15, 2026. Late submissions will be escalated to the District Education Officer.' },
  { id: 'MA-003', title: 'New Digital Attendance Policy Effective March 15', target: 'All Schools', priority: 'Medium', date: '2026-02-20', message: 'The Digital Attendance Reporting policy (POL-003) takes effect March 15. All schools must register on NEMIS digital portal before then.' },
]

const PRIORITY_CFG = {
  Critical: { color: '#DC2626', bg: 'rgba(220,38,38,0.10)' },
  High:     { color: '#D97706', bg: 'rgba(217,119,6,0.10)' },
  Medium:   { color: ACCENT,    bg: `${ACCENT}10`           },
  Low:      { color: '#059669', bg: 'rgba(5,150,105,0.10)' },
}

function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CFG[priority] || { color: '#64748B', bg: '#F1F5F9' }
  return <span className="text-[10px] font-black px-2.5 py-1 rounded-full" style={{ background: cfg.bg, color: cfg.color }}>{priority}</span>
}

function MessagesTab() {
  const [active, setActive] = useState(ministerMessages[0].id)
  const thread = ministerMessages.find(m => m.id === active)
  const totalUnread = ministerMessages.reduce((s, m) => s + m.unread, 0)

  return (
    <div className="rounded-2xl overflow-hidden flex" style={{ background: '#fff', border: '1px solid #E2E8F0', height: 560 }}>
      {/* Contact list */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 280, borderRight: '1px solid #E2E8F0' }}>
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #E2E8F0' }}>
          <span className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Messages</span>
          {totalUnread > 0 && (
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
              style={{ background: '#DC2626' }}>{totalUnread}</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#F3F4F6]">
          {ministerMessages.map(msg => (
            <button key={msg.id} onClick={() => setActive(msg.id)}
              className="w-full px-4 py-3.5 flex items-center gap-3 text-left transition-colors"
              style={{ background: active === msg.id ? `${ACCENT}08` : 'transparent' }}>
              <div className="relative flex-shrink-0">
                <img src={`https://randomuser.me/api/portraits/${msg.gender}/${msg.photoId}.jpg`}
                  alt={msg.contact} className="rounded-full object-cover"
                  style={{ width: 38, height: 38, border: active === msg.id ? `2px solid ${ACCENT}` : '2px solid #E2E8F0' }}
                  onError={e => { e.target.style.display = 'none' }} />
                {msg.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: '#DC2626' }}>{msg.unread}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[#0F172A] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{msg.contact}</p>
                <p className="text-[10px] font-semibold text-[#94A3B8] truncate mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{msg.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      {thread && (
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <img src={`https://randomuser.me/api/portraits/${thread.gender}/${thread.photoId}.jpg`}
              alt={thread.contact} className="rounded-full object-cover flex-shrink-0"
              style={{ width: 36, height: 36, border: '2px solid #E2E8F0' }}
              onError={e => { e.target.style.display = 'none' }} />
            <div>
              <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{thread.contact}</p>
              <p className="text-[10px] font-semibold text-[#94A3B8]" style={{ fontFamily: 'Roboto, sans-serif' }}>{thread.role}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {thread.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[75%] px-4 py-2.5 rounded-2xl"
                  style={{
                    background: msg.from === 'me' ? ACCENT : '#F4F6F8',
                    borderBottomRightRadius: msg.from === 'me' ? 4 : 16,
                    borderBottomLeftRadius:  msg.from === 'me' ? 16 : 4,
                  }}>
                  <p className="text-xs font-semibold leading-relaxed"
                    style={{ color: msg.from === 'me' ? '#fff' : '#0F172A', fontFamily: 'Roboto, sans-serif' }}>
                    {msg.text}
                  </p>
                  <p className="text-[10px] font-semibold mt-1"
                    style={{ color: msg.from === 'me' ? 'rgba(255,255,255,0.65)' : '#94A3B8', fontFamily: 'Roboto, sans-serif' }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 flex gap-3 flex-shrink-0" style={{ borderTop: '1px solid #E2E8F0' }}>
            <input type="text" placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: '#F4F6F8', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }} />
            <button className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: ACCENT }}>
              <Send size={16} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function AnnouncementsTab() {
  return (
    <div className="space-y-4">
      {/* Compose */}
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <h3 className="text-sm font-black text-[#0F172A] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Broadcast Announcement</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Target Audience</label>
              <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                <option>All CEOs</option>
                <option>All DEOs</option>
                <option>All Schools</option>
                <option>All Teachers</option>
                <option>Specific County</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Priority</label>
              <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }}>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Title</label>
            <input type="text" placeholder="Announcement title..."
              className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-[#94A3B8] mb-1 block">Message</label>
            <textarea rows={3} placeholder="Compose your announcement..."
              className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
              style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', fontFamily: 'Roboto, sans-serif', color: '#0F172A' }} />
          </div>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white"
              style={{ background: ACCENT }}>
              <Send size={14} strokeWidth={3} /> Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Sent announcements */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #E2E8F0' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <h3 className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>Sent Announcements</h3>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {ANNOUNCEMENTS.map(ann => (
            <div key={ann.id} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-sm font-black text-[#0F172A]" style={{ fontFamily: 'Sora, sans-serif' }}>{ann.title}</p>
                    <PriorityBadge priority={ann.priority} />
                  </div>
                  <p className="text-[10px] font-semibold text-[#94A3B8] mb-2">To: {ann.target} · {ann.date}</p>
                  <p className="text-xs font-semibold text-[#475569] leading-relaxed" style={{ fontFamily: 'Roboto, sans-serif' }}>{ann.message}</p>
                </div>
                <CheckCircle size={16} color="#059669" strokeWidth={2.5} className="flex-shrink-0 mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MinisterMessages() {
  const [tab, setTab] = useState('messages')

  return (
    <div className="space-y-5 max-w-[1000px]">
      <div className="flex gap-2">
        {[
          { id: 'messages',      label: 'Direct Messages',  icon: MessageSquare },
          { id: 'announcements', label: 'Announcements',    icon: Megaphone },
        ].map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold"
              style={{ background: tab === t.id ? ACCENT : '#fff', color: tab === t.id ? '#fff' : '#64748B', border: `1px solid ${tab === t.id ? ACCENT : '#E2E8F0'}`, fontFamily: 'Roboto, sans-serif' }}>
              <Icon size={14} strokeWidth={2.5} />{t.label}
            </button>
          )
        })}
      </div>

      {tab === 'messages'      && <MessagesTab />}
      {tab === 'announcements' && <AnnouncementsTab />}
    </div>
  )
}
