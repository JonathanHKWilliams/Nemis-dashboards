import { useState, useRef, useEffect } from 'react'
import {
  Send, MessageSquare, Megaphone, Search, Plus, X, Check, CheckCheck,
  Phone, ChevronDown, ChevronUp, AlertCircle, Info, Bell, Users, Filter,
  Paperclip, Smile,
} from 'lucide-react'
import { principalMessages } from '../../data/principalData'

const ACCENT = '#0367A0'
const NAVY   = '#002333'

const ALL_CONTACTS = [
  { name: 'Mary A. Johnson',          role: 'Math Teacher',               gender: 'women', photoId: 44 },
  { name: 'David K. Cooper',          role: 'English Teacher',            gender: 'men',   photoId: 32 },
  { name: 'Agnes T. Sumo',            role: 'Science Teacher',            gender: 'women', photoId: 55 },
  { name: 'Robert G. Yarkpah',        role: 'Social Studies Teacher',     gender: 'men',   photoId: 61 },
  { name: 'Thomas J. Flomo',          role: 'Biology Teacher',            gender: 'men',   photoId: 48 },
  { name: 'Cecelia M. Tarr',          role: 'Chemistry Teacher',          gender: 'women', photoId: 71 },
  { name: 'Hawa N. Gbessay',          role: 'French Teacher',             gender: 'women', photoId: 52 },
  { name: 'Sarah K. Doe',             role: 'Parent – Emmanuel Doe',      gender: 'women', photoId: 56 },
  { name: 'Mark T. Mulbah',           role: 'Parent – Lorpu Mulbah',      gender: 'men',   photoId: 53 },
  { name: 'DEO Office – Grand Bassa', role: 'District Education Office',  gender: 'men',   photoId: 71 },
]

const INIT_SENT = [
  { id: 1, title: 'Midterm Exam Schedule Released',    target: 'All Students & Parents', date: 'Mar 10, 2026', priority: 'High',   recipients: 642, msg: 'Midterm examinations are scheduled for March 18–22. All students should review their subject schedules posted on the notice board and come prepared.' },
  { id: 2, title: 'PTA Meeting Reminder',              target: 'All Parents',            date: 'Mar 8, 2026',  priority: 'Normal', recipients: 480, msg: 'Please be reminded of the upcoming PTA General Meeting on March 28, 2026 at 9:00 AM in the school assembly hall. Light refreshments will be served.' },
  { id: 3, title: 'Teacher Professional Development Day', target: 'All Teachers',        date: 'Mar 5, 2026',  priority: 'Urgent', recipients: 28,  msg: 'A professional development session is scheduled for Saturday, March 14. Attendance is mandatory for all teaching staff. Topic: NEMIS Digital Assessment Tools.' },
  { id: 4, title: 'School Fees Deadline – March 31',   target: 'All Parents',            date: 'Mar 1, 2026',  priority: 'High',   recipients: 480, msg: 'This is a reminder that all outstanding school fees must be settled by March 31, 2026 to avoid suspension. Contact the bursary for payment plans.' },
]

const PRIORITY_META = {
  Normal: { bg: '#EFF6FF', color: ACCENT,    icon: Info        },
  High:   { bg: '#FFF7ED', color: '#EA580C', icon: Bell        },
  Urgent: { bg: '#FFF1F2', color: '#DC2626', icon: AlertCircle },
}

/* ─── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ gender, photoId, name, size = 38, online = false }) {
  const [err, setErr] = useState(false)
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(n => n[0]).join('')
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {!err ? (
        <img src={`https://randomuser.me/api/portraits/${gender}/${photoId % 100}.jpg`}
          alt={name} className="rounded-full object-cover w-full h-full"
          style={{ border: '2px solid #EEF0F3' }}
          onError={() => setErr(true)} />
      ) : (
        <div className="w-full h-full rounded-full flex items-center justify-center text-white font-black"
          style={{ background: ACCENT, fontSize: size * 0.32, fontFamily: 'Sora, sans-serif' }}>
          {initials}
        </div>
      )}
      {online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: '#16A34A' }} />}
    </div>
  )
}

/* ─── New Message Modal ──────────────────────────────────────────────────── */
function NewMessageModal({ onStart, onClose }) {
  const [search, setSearch] = useState('')
  const filtered = ALL_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,14,33,0.45)' }} onClick={onClose}>
      <div className="rounded-2xl w-full max-w-sm mx-4 overflow-hidden"
        style={{ background: '#fff', boxShadow: '0 20px 60px rgba(0,14,33,0.25)' }}
        onClick={e => e.stopPropagation()}>
        <div className="px-5 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid #EEF0F3' }}>
          <h3 className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>New Message</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: '#F4F6F8' }}>
            <X size={13} strokeWidth={2.5} color="#6B7280" />
          </button>
        </div>
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #EEF0F3' }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: '#F4F6F8', border: '1.5px solid #E2E8F0' }}>
            <Search size={13} strokeWidth={2.5} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search staff or parents…" autoFocus
              className="flex-1 text-xs outline-none bg-transparent font-semibold"
              style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }} />
          </div>
        </div>
        <div style={{ maxHeight: 300, overflowY: 'auto' }} className="divide-y divide-[#F3F4F6]">
          {filtered.map((c, i) => (
            <button key={i} onClick={() => onStart(c)}
              className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#F8FAFC] transition-colors">
              <Avatar gender={c.gender} photoId={c.photoId} name={c.name} size={36} />
              <div className="min-w-0">
                <p className="text-xs font-black truncate" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>{c.name}</p>
                <p className="text-[10px] font-semibold text-[#9CA3AF] truncate" style={{ fontFamily: 'Lato, sans-serif' }}>{c.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Messages Tab ───────────────────────────────────────────────────────── */
function MessagesTab() {
  const [threads, setThreads] = useState(principalMessages)
  const [active,  setActive]  = useState(principalMessages[0].id)
  const [text,    setText]    = useState('')
  const [search,  setSearch]  = useState('')
  const [newMsg,  setNewMsg]  = useState(false)
  const bottomRef             = useRef(null)
  const textRef               = useRef(null)

  const thread      = threads.find(m => m.id === active)
  const totalUnread = threads.reduce((s, m) => s + m.unread, 0)
  const filtered    = threads.filter(t =>
    t.contact.toLowerCase().includes(search.toLowerCase()) ||
    t.role.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active, threads])

  function selectThread(id) {
    setActive(id)
    setThreads(prev => prev.map(m => m.id === id ? { ...m, unread: 0 } : m))
  }

  function send() {
    if (!text.trim()) return
    setThreads(prev => prev.map(m => m.id !== active ? m : {
      ...m, messages: [...m.messages, { from: 'me', text: text.trim(), time: 'Just now' }],
    }))
    setText('')
    if (textRef.current) textRef.current.style.height = 'auto'
  }

  function startNewThread(contact) {
    const existing = threads.find(t => t.contact === contact.name)
    if (existing) { selectThread(existing.id); setNewMsg(false); return }
    const newId = Math.max(...threads.map(t => t.id)) + 1
    setThreads(prev => [{
      id: newId, contact: contact.name, role: contact.role,
      gender: contact.gender, photoId: contact.photoId, unread: 0, messages: [],
    }, ...prev])
    setActive(newId)
    setNewMsg(false)
  }

  // Group messages by day label
  const grouped = []
  let lastLabel = null
  ;(thread?.messages ?? []).forEach(msg => {
    const label = (msg.time.includes('AM') || msg.time.includes('PM')) ? 'Today'
      : msg.time.startsWith('Mon') ? 'Monday' : msg.time.startsWith('Tue') ? 'Tuesday'
      : msg.time.startsWith('Wed') ? 'Wednesday' : msg.time.startsWith('Thu') ? 'Thursday'
      : msg.time.startsWith('Fri') ? 'Friday' : msg.time
    if (label !== lastLabel) { grouped.push({ type: 'divider', label }); lastLabel = label }
    grouped.push({ type: 'msg', ...msg })
  })

  return (
    <>
      <div className="rounded-2xl overflow-hidden flex"
        style={{ background: '#fff', border: '1px solid #EEF0F3', height: 600, boxShadow: '0 2px 12px rgba(0,14,33,0.06)' }}>

        {/* Sidebar */}
        <div className="flex flex-col flex-shrink-0" style={{ width: 290, borderRight: '1px solid #EEF0F3' }}>
          <div className="px-4 pt-4 pb-3 flex-shrink-0 space-y-3" style={{ borderBottom: '1px solid #EEF0F3' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>Messages</span>
                {totalUnread > 0 && (
                  <span className="h-5 min-w-5 px-1.5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: '#A60003' }}>{totalUnread}</span>
                )}
              </div>
              <button onClick={() => setNewMsg(true)}
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: ACCENT }} title="New message">
                <Plus size={13} color="#fff" strokeWidth={3} />
              </button>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: '#F4F6F8', border: '1.5px solid #E2E8F0' }}>
              <Search size={12} strokeWidth={2.5} color="#9CA3AF" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search conversations…"
                className="flex-1 text-[11px] outline-none bg-transparent font-semibold"
                style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-center text-[11px] font-bold text-[#9CA3AF] py-8" style={{ fontFamily: 'Lato, sans-serif' }}>
                No conversations found
              </p>
            )}
            {filtered.map(msg => {
              const last = msg.messages[msg.messages.length - 1]
              const isActive = active === msg.id
              const isOnline = msg.id === 1 || msg.id === 5
              return (
                <button key={msg.id} onClick={() => selectThread(msg.id)}
                  className="w-full px-4 py-3.5 flex items-start gap-3 text-left transition-colors"
                  style={{
                    background: isActive ? 'rgba(3,103,160,0.07)' : 'transparent',
                    borderLeft: `3px solid ${isActive ? ACCENT : 'transparent'}`,
                    borderBottom: '1px solid #F3F4F6',
                  }}>
                  <Avatar gender={msg.gender} photoId={msg.photoId} name={msg.contact} size={40} online={isOnline} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <p className="text-xs font-black truncate" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>{msg.contact}</p>
                      {msg.unread > 0 && (
                        <span className="h-4 min-w-4 px-1 rounded-full flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
                          style={{ background: '#A60003' }}>{msg.unread}</span>
                      )}
                    </div>
                    <p className="text-[10px] font-semibold text-[#9CA3AF] truncate" style={{ fontFamily: 'Lato, sans-serif' }}>{msg.role}</p>
                    {last && (
                      <p className="text-[10px] font-semibold truncate mt-0.5"
                        style={{ color: msg.unread > 0 ? '#374151' : '#B0B7C3', fontFamily: 'Lato, sans-serif' }}>
                        {last.from === 'me' ? '✓ You: ' : ''}{last.text}
                      </p>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Chat area */}
        {thread ? (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="px-5 py-3.5 flex items-center justify-between gap-3 flex-shrink-0"
              style={{ borderBottom: '1px solid #EEF0F3', background: '#FAFBFC' }}>
              <div className="flex items-center gap-3 min-w-0">
                <Avatar gender={thread.gender} photoId={thread.photoId} name={thread.contact}
                  size={38} online={thread.id === 1 || thread.id === 5} />
                <div className="min-w-0">
                  <p className="text-sm font-black truncate" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>{thread.contact}</p>
                  <p className="text-[10px] font-semibold flex items-center gap-1" style={{ color: '#9CA3AF', fontFamily: 'Lato, sans-serif' }}>
                    {(thread.id === 1 || thread.id === 5)
                      ? <><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#16A34A' }} /> Online</>
                      : thread.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#EEF0F3] transition-colors"
                  title="Call" style={{ color: '#6B7280' }}>
                  <Phone size={15} strokeWidth={2.5} />
                </button>
                <div className="px-3 py-1 rounded-full text-[10px] font-black"
                  style={{ background: 'rgba(3,103,160,0.08)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                  {thread.role}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4" style={{ background: '#F8FAFC' }}>
              {thread.messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(3,103,160,0.08)' }}>
                    <MessageSquare size={22} color={ACCENT} strokeWidth={2} />
                  </div>
                  <p className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>Start the conversation</p>
                  <p className="text-xs font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Send a message to {thread.contact.split(' ')[0]}
                  </p>
                </div>
              )}
              {grouped.map((item, idx) => {
                if (item.type === 'divider') return (
                  <div key={idx} className="flex items-center gap-3 py-3">
                    <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
                    <span className="text-[10px] font-black text-[#C4CAD4] px-2" style={{ fontFamily: 'Lato, sans-serif' }}>{item.label}</span>
                    <div className="flex-1 h-px" style={{ background: '#E2E8F0' }} />
                  </div>
                )
                const isMe = item.from === 'me'
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-3`}>
                    {!isMe && (
                      <div className="flex-shrink-0 mr-2 self-end mb-4">
                        <Avatar gender={thread.gender} photoId={thread.photoId} name={thread.contact} size={26} />
                      </div>
                    )}
                    <div style={{ maxWidth: '70%' }}>
                      <div className="px-4 py-2.5 rounded-2xl"
                        style={{
                          background: isMe ? `linear-gradient(135deg, ${ACCENT} 0%, #025590 100%)` : '#fff',
                          borderBottomRightRadius: isMe ? 4 : 16,
                          borderBottomLeftRadius: isMe ? 16 : 4,
                          boxShadow: isMe ? '0 2px 8px rgba(3,103,160,0.20)' : '0 1px 3px rgba(0,0,0,0.06)',
                          border: isMe ? 'none' : '1px solid #E2E8F0',
                        }}>
                        <p className="text-xs font-semibold leading-relaxed"
                          style={{ color: isMe ? '#fff' : NAVY, fontFamily: 'Lato, sans-serif' }}>
                          {item.text}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 mt-1 ${isMe ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] font-semibold text-[#C4CAD4]"
                          style={{ fontFamily: 'Lato, sans-serif' }}>{item.time}</span>
                        {isMe && <CheckCheck size={11} color="#C4CAD4" strokeWidth={2.5} />}
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>

            {/* Compose */}
            <div className="px-4 py-3 flex items-end gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid #EEF0F3', background: '#fff' }}>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-[#F4F6F8] transition-colors"
                title="Attach" style={{ color: '#9CA3AF' }}>
                <Paperclip size={15} strokeWidth={2.5} />
              </button>
              <div className="flex-1 flex items-end rounded-2xl px-4 py-2 gap-2"
                style={{ background: '#F4F6F8', border: '1.5px solid #E2E8F0' }}>
                <textarea ref={textRef} rows={1}
                  placeholder="Type a message… (Enter to send)"
                  value={text}
                  onChange={e => {
                    setText(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px'
                  }}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                  className="flex-1 text-sm outline-none bg-transparent resize-none"
                  style={{ color: NAVY, fontFamily: 'Lato, sans-serif', fontWeight: 600, lineHeight: 1.5, maxHeight: 96 }}
                />
                <button className="flex-shrink-0 pb-0.5" title="Emoji" style={{ color: '#C4CAD4' }}>
                  <Smile size={16} strokeWidth={2} />
                </button>
              </div>
              <button onClick={send}
                className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{ background: text.trim() ? ACCENT : '#E2E8F0' }}>
                <Send size={15} color={text.trim() ? '#fff' : '#9CA3AF'} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(3,103,160,0.08)' }}>
              <MessageSquare size={26} color={ACCENT} strokeWidth={2} />
            </div>
            <p className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>Select a conversation</p>
          </div>
        )}
      </div>

      {newMsg && <NewMessageModal onStart={startNewThread} onClose={() => setNewMsg(false)} />}
    </>
  )
}

/* ─── Announcements Tab ──────────────────────────────────────────────────── */
function AnnouncementsTab() {
  const [title,    setTitle]    = useState('')
  const [audience, setAudience] = useState('All Staff & Students')
  const [priority, setPriority] = useState('Normal')
  const [body,     setBody]     = useState('')
  const [sent,     setSent]     = useState(INIT_SENT)
  const [expanded, setExpanded] = useState(null)
  const [sending,  setSending]  = useState(false)
  const [flash,    setFlash]    = useState(false)

  const AUDIENCES = [
    'All Staff & Students', 'All Teachers', 'All Students', 'All Parents',
    'Grade Teachers', 'School Staff', 'Senior School (9–12)', 'Junior School (6–8)',
  ]

  function handleSend() {
    if (!title.trim() || !body.trim()) return
    setSending(true)
    setTimeout(() => {
      setSent(prev => [{ id: Date.now(), title: title.trim(), target: audience, date: 'Mar 16, 2026', priority, recipients: 320, msg: body.trim() }, ...prev])
      setTitle(''); setBody('')
      setSending(false); setFlash(true)
      setTimeout(() => setFlash(false), 2500)
    }, 900)
  }

  const pm = PRIORITY_META[priority]
  const PIcon = pm.icon

  return (
    <div className="space-y-5">

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Sent This Month',  value: sent.length,                                             color: ACCENT,    bg: 'rgba(3,103,160,0.06)' },
          { label: 'Total Recipients', value: sent.reduce((s, a) => s + a.recipients, 0).toLocaleString(), color: '#16A34A', bg: '#F0FDF4' },
          { label: 'Urgent Notices',   value: sent.filter(a => a.priority === 'Urgent').length,        color: '#DC2626', bg: '#FFF1F2' },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl px-5 py-4" style={{ background: c.bg, border: `1px solid ${c.color}22` }}>
            <p className="text-2xl font-black" style={{ color: c.color, fontFamily: 'Sora, sans-serif' }}>{c.value}</p>
            <p className="text-xs font-bold text-[#6B7280] mt-1" style={{ fontFamily: 'Lato, sans-serif' }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Compose */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 2px 12px rgba(0,14,33,0.06)' }}>
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid #EEF0F3', background: '#FAFBFC' }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(3,103,160,0.10)' }}>
              <Megaphone size={14} color={ACCENT} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>New Announcement</span>
          </div>
          {flash && (
            <span className="flex items-center gap-1 text-[11px] font-black px-3 py-1 rounded-full"
              style={{ background: '#DCFCE7', color: '#15803D', fontFamily: 'Lato, sans-serif' }}>
              <Check size={11} strokeWidth={3} /> Sent successfully
            </span>
          )}
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mb-1.5 flex items-center gap-1"
                style={{ fontFamily: 'Lato, sans-serif' }}>
                <Users size={10} strokeWidth={2.5} /> Target Audience
              </label>
              <select value={audience} onChange={e => setAudience(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl text-xs font-bold outline-none"
                style={{ background: '#F4F6F8', border: '1.5px solid #E2E8F0', fontFamily: 'Lato, sans-serif', color: NAVY }}>
                {AUDIENCES.map(a => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mb-1.5 flex items-center gap-1"
                style={{ fontFamily: 'Lato, sans-serif' }}>
                <Filter size={10} strokeWidth={2.5} /> Priority
              </label>
              <div className="flex gap-2">
                {Object.entries(PRIORITY_META).map(([key, meta]) => (
                  <button key={key} onClick={() => setPriority(key)}
                    className="flex-1 py-2.5 rounded-xl text-[10px] font-black transition-all"
                    style={{
                      background: priority === key ? meta.bg : '#F4F6F8',
                      color: priority === key ? meta.color : '#9CA3AF',
                      border: `1.5px solid ${priority === key ? meta.color + '66' : '#E2E8F0'}`,
                      fontFamily: 'Lato, sans-serif',
                    }}>
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mb-1.5 block"
              style={{ fontFamily: 'Lato, sans-serif' }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text"
              placeholder="Enter announcement title…"
              className="w-full px-4 py-2.5 rounded-xl text-sm font-bold outline-none"
              style={{ background: '#F4F6F8', border: '1.5px solid #E2E8F0', fontFamily: 'Lato, sans-serif', color: NAVY }} />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-[#9CA3AF] mb-1.5 block"
              style={{ fontFamily: 'Lato, sans-serif' }}>Message</label>
            <textarea rows={4} value={body} onChange={e => setBody(e.target.value)}
              placeholder="Compose your announcement message…"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{ background: '#F4F6F8', border: '1.5px solid #E2E8F0', fontFamily: 'Lato, sans-serif', color: NAVY, fontWeight: 600, lineHeight: 1.6 }} />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black"
                style={{ background: pm.bg, color: pm.color, fontFamily: 'Lato, sans-serif', border: `1px solid ${pm.color}33` }}>
                <PIcon size={11} strokeWidth={2.5} /> {priority}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black"
                style={{ background: 'rgba(3,103,160,0.07)', color: ACCENT, fontFamily: 'Lato, sans-serif' }}>
                <Users size={11} strokeWidth={2.5} /> {audience}
              </div>
            </div>
            <button onClick={handleSend} disabled={!title.trim() || !body.trim() || sending}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black transition-all"
              style={{
                background: (!title.trim() || !body.trim()) ? '#E2E8F0' : ACCENT,
                color: (!title.trim() || !body.trim()) ? '#9CA3AF' : '#fff',
                fontFamily: 'Lato, sans-serif',
                cursor: (!title.trim() || !body.trim()) ? 'not-allowed' : 'pointer',
              }}>
              {sending
                ? <><span className="w-3 h-3 rounded-full border-2 border-white/40 border-t-white animate-spin" /> Sending…</>
                : <><Send size={13} strokeWidth={2.5} /> Send Announcement</>}
            </button>
          </div>
        </div>
      </div>

      {/* Sent list */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: '#fff', border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,14,33,0.04)' }}>
        <div className="px-6 py-4 flex items-center justify-between"
          style={{ borderBottom: '1px solid #EEF0F3', background: '#FAFBFC' }}>
          <span className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Sora, sans-serif' }}>Sent Announcements</span>
          <span className="text-[11px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{sent.length} total</span>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {sent.map(ann => {
            const meta = PRIORITY_META[ann.priority] ?? PRIORITY_META.Normal
            const AIcon = meta.icon
            const isOpen = expanded === ann.id
            return (
              <div key={ann.id}>
                <button onClick={() => setExpanded(isOpen ? null : ann.id)}
                  className="w-full px-6 py-4 flex items-start gap-4 text-left transition-colors hover:bg-[#FAFBFC]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: meta.bg }}>
                    <AIcon size={16} color={meta.color} strokeWidth={2.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-black" style={{ color: NAVY, fontFamily: 'Lato, sans-serif' }}>{ann.title}</p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: meta.bg, color: meta.color, fontFamily: 'Lato, sans-serif' }}>{ann.priority}</span>
                        <span className="text-[10px] font-black px-2 py-0.5 rounded-full"
                          style={{ background: '#F0FDF4', color: '#15803D', fontFamily: 'Lato, sans-serif' }}>Sent</span>
                        {isOpen ? <ChevronUp size={14} color="#9CA3AF" strokeWidth={2.5} /> : <ChevronDown size={14} color="#9CA3AF" strokeWidth={2.5} />}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>To: {ann.target}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                      <span className="text-[10px] font-semibold text-[#9CA3AF]" style={{ fontFamily: 'Lato, sans-serif' }}>{ann.date}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D1D5DB]" />
                      <span className="text-[10px] font-bold" style={{ color: ACCENT, fontFamily: 'Lato, sans-serif' }}>{ann.recipients.toLocaleString()} recipients</span>
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-3" style={{ borderTop: '1px dashed #EEF0F3', background: '#FAFBFC' }}>
                    <p className="text-sm font-semibold leading-relaxed" style={{ color: '#374151', fontFamily: 'Lato, sans-serif' }}>
                      {ann.msg}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function PrincipalCommunications() {
  const [tab, setTab] = useState('messages')
  const totalUnread = principalMessages.reduce((s, m) => s + m.unread, 0)

  return (
    <div className="space-y-5 max-w-[1080px]">
      <div className="flex items-center gap-2">
        {[
          { id: 'messages',      label: 'Direct Messages', icon: MessageSquare, badge: totalUnread },
          { id: 'announcements', label: 'Announcements',   icon: Megaphone },
        ].map(t => {
          const Icon = t.icon
          const isActive = tab === t.id
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all"
              style={{
                background: isActive ? ACCENT : '#fff',
                color: isActive ? '#fff' : '#6B7280',
                border: `1.5px solid ${isActive ? ACCENT : '#EEF0F3'}`,
                fontFamily: 'Lato, sans-serif',
                boxShadow: isActive ? '0 2px 8px rgba(3,103,160,0.25)' : 'none',
              }}>
              <Icon size={14} strokeWidth={2.5} />
              {t.label}
              {t.badge > 0 && (
                <span className="h-4 min-w-4 px-1 rounded-full flex items-center justify-center text-[9px] font-black"
                  style={{ background: isActive ? 'rgba(255,255,255,0.3)' : '#A60003', color: '#fff' }}>
                  {t.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {tab === 'messages'      && <MessagesTab />}
      {tab === 'announcements' && <AnnouncementsTab />}
    </div>
  )
}
