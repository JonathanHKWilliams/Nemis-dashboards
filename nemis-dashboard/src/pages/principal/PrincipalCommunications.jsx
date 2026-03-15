import { useState } from 'react'
import { Send, MessageSquare, Megaphone } from 'lucide-react'
import { principalMessages, principalProfile } from '../../data/principalData'

const ACCENT = '#0367A0'

function MessagesTab() {
  const [active, setActive] = useState(principalMessages[0].id)
  const [text, setText] = useState('')
  const [threads, setThreads] = useState(principalMessages)

  const thread = threads.find(m => m.id === active)
  const totalUnread = threads.reduce((s, m) => s + m.unread, 0)

  const send = () => {
    if (!text.trim()) return
    setThreads(prev => prev.map(m => m.id !== active ? m : {
      ...m,
      messages: [...m.messages, { from: 'me', text: text.trim(), time: 'Just now' }],
    }))
    setText('')
  }

  return (
    <div className="rounded-2xl overflow-hidden flex"
      style={{ background: '#fff', border: '1px solid #EEF0F3', height: 560 }}>

      {/* Contact List */}
      <div className="flex flex-col flex-shrink-0" style={{ width: 280, borderRight: '1px solid #EEF0F3' }}>
        <div className="px-5 py-4 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: '1px solid #EEF0F3' }}>
          <span className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Messages</span>
          {totalUnread > 0 && (
            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
              style={{ background: '#A60003' }}>{totalUnread}</span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-[#F3F4F6]">
          {threads.map(msg => (
            <button key={msg.id} onClick={() => setActive(msg.id)}
              className="w-full px-4 py-3.5 flex items-center gap-3 text-left transition-colors"
              style={{ background: active === msg.id ? `rgba(3,103,160,0.07)` : 'transparent' }}>
              <div className="relative flex-shrink-0">
                <img
                  src={`https://randomuser.me/api/portraits/${msg.gender}/${msg.photoId % 100}.jpg`}
                  alt={msg.contact}
                  className="rounded-full object-cover"
                  style={{ width: 38, height: 38, border: active === msg.id ? `2px solid ${ACCENT}` : '2px solid #EEF0F3' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
                {msg.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: '#A60003' }}>{msg.unread}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{msg.contact}</p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] truncate mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>{msg.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {thread && (
        <div className="flex-1 flex flex-col">
          <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0"
            style={{ borderBottom: '1px solid #EEF0F3' }}>
            <img
              src={`https://randomuser.me/api/portraits/${thread.gender}/${thread.photoId % 100}.jpg`}
              alt={thread.contact}
              className="rounded-full object-cover flex-shrink-0"
              style={{ width: 36, height: 36, border: '2px solid #EEF0F3' }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{thread.contact}</p>
              <p className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{thread.role}</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {thread.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[75%] px-4 py-2.5 rounded-2xl"
                  style={{
                    background: msg.from === 'me' ? ACCENT : '#F4F6F8',
                    borderBottomRightRadius: msg.from === 'me' ? 4 : 16,
                    borderBottomLeftRadius: msg.from === 'me' ? 16 : 4,
                  }}>
                  <p className="text-xs font-semibold leading-relaxed"
                    style={{ color: msg.from === 'me' ? '#fff' : '#002333', fontFamily: 'Lato, sans-serif' }}>
                    {msg.text}
                  </p>
                  <p className="text-[10px] font-semibold mt-1"
                    style={{ color: msg.from === 'me' ? 'rgba(255,255,255,0.60)' : '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 flex gap-3 flex-shrink-0" style={{ borderTop: '1px solid #EEF0F3' }}>
            <input
              type="text"
              placeholder="Type a message…"
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send() }}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}
            />
            <button onClick={send}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
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
      <div className="rounded-2xl p-5" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <h3 className="text-sm font-black text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Send Announcement</h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Target Audience</label>
              <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                <option>All Teachers</option>
                <option>All Students</option>
                <option>All Parents</option>
                <option>Grade Teachers</option>
                <option>School Staff</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Priority</label>
              <select className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
                style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }}>
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Title</label>
            <input type="text" placeholder="Announcement title…"
              className="w-full px-3 py-2.5 rounded-xl text-xs outline-none"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-[#9CA3AF] mb-1 block" style={{ fontFamily: 'Lato, sans-serif' }}>Message</label>
            <textarea rows={3} placeholder="Compose your announcement…"
              className="w-full px-3 py-2.5 rounded-xl text-xs outline-none resize-none"
              style={{ background: '#F4F6F8', border: '1px solid #EEF0F3', fontFamily: 'Lato, sans-serif', color: '#002333' }} />
          </div>
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-white"
              style={{ background: ACCENT, fontFamily: 'Lato, sans-serif' }}>
              <Send size={14} strokeWidth={2.5} /> Send Announcement
            </button>
          </div>
        </div>
      </div>

      {/* Sample sent announcements */}
      <div className="rounded-2xl overflow-hidden" style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Sent Announcements</h3>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {[
            { title: 'Midterm Exam Schedule Released', target: 'All Students & Parents', date: 'Mar 10, 2026', msg: 'Midterm examinations are scheduled for March 18–22. All students should review their subject schedules posted on the notice board.' },
            { title: 'PTA Meeting Reminder', target: 'All Parents', date: 'Mar 8, 2026', msg: 'Please be reminded of the upcoming PTA General Meeting on March 28, 2026 at 9:00 AM in the school assembly hall.' },
            { title: 'Teacher Professional Development Day', target: 'All Teachers', date: 'Mar 5, 2026', msg: 'A professional development session is scheduled for Saturday, March 14. Attendance is mandatory for all teaching staff.' },
          ].map((ann, i) => (
            <div key={i} className="px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{ann.title}</p>
                  <p className="text-[10px] font-semibold text-[#9CA3AF] mb-2 mt-0.5" style={{ fontFamily: 'Lato, sans-serif' }}>
                    To: {ann.target} · {ann.date}
                  </p>
                  <p className="text-xs font-semibold text-[#6B7280] leading-relaxed" style={{ fontFamily: 'Lato, sans-serif' }}>
                    {ann.msg}
                  </p>
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                  Sent
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PrincipalCommunications() {
  const [tab, setTab] = useState('messages')

  return (
    <div className="space-y-5 max-w-[1000px]">
      <div className="flex gap-2">
        {[
          { id: 'messages',      label: 'Direct Messages', icon: MessageSquare },
          { id: 'announcements', label: 'Announcements',   icon: Megaphone },
        ].map(t => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all"
              style={{
                background: tab === t.id ? ACCENT : '#fff',
                color: tab === t.id ? '#fff' : '#6B7280',
                border: `1px solid ${tab === t.id ? ACCENT : '#EEF0F3'}`,
                fontFamily: 'Lato, sans-serif',
              }}>
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
