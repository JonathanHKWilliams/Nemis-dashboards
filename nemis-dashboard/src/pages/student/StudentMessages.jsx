import { useState } from 'react'
import { studentMessages, studentProfile, subjects, schoolInfo } from '../../data/studentData'
import { Send, Edit3, Search, X, Star, StarOff } from 'lucide-react'

// All contacts the student can message
const CONTACTS = [
  ...subjects.map(s => ({ id: `teacher-${s.id}`, name: s.teacher, role: s.name + ' Teacher', gender: s.teacherGender, photoId: s.teacherPhotoId })),
  { id: 'principal', name: schoolInfo.principal, role: 'Principal', gender: schoolInfo.principalGender, photoId: schoolInfo.principalPhotoId },
  { id: 'admin',     name: 'School Admin',       role: 'Administration', gender: 'men', photoId: 20 },
]

function Avatar({ gender, photoId, name, size = 40 }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <img
        src={`https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`}
        alt={name}
        className="rounded-full object-cover absolute inset-0"
        style={{ width: size, height: size }}
        onError={e => { e.target.style.display = 'none'; if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex' }}
      />
      <div className="rounded-full items-center justify-center font-black absolute inset-0"
        style={{ background: '#002333', color: '#fff', fontSize: size * 0.36, fontFamily: 'Sora, sans-serif', display: 'none' }}>
        {initials}
      </div>
    </div>
  )
}

// ── Compose Modal ─────────────────────────────────────────────────────────────
function ComposeModal({ onClose, onSend }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [text, setText] = useState('')

  const filtered = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )

  function handleSend() {
    if (!selected || !text.trim()) return
    onSend(selected, text.trim())
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,35,51,0.5)' }}>
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col"
        style={{ width: 500, maxHeight: '85vh', border: '2px solid #EEF0F3', boxShadow: '0 20px 60px rgba(0,35,51,0.2)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0"
          style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <h3 className="font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>New Message</h3>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={14} color="white" strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Search contacts */}
          <div>
            <p className="text-xs font-black text-[#6B7280] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>To</p>
            <div className="relative mb-3">
              <Search size={14} color="#9CA3AF" strokeWidth={3} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search teachers, admin..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', color: '#002333', fontWeight: 600 }}
              />
            </div>
            {selected && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl mb-2"
                style={{ background: 'rgba(72,208,140,0.1)', border: '1.5px solid rgba(72,208,140,0.3)' }}>
                <Avatar gender={selected.gender} photoId={selected.photoId} name={selected.name} size={28} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{selected.name}</p>
                  <p className="text-[10px] font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{selected.role}</p>
                </div>
                <button onClick={() => setSelected(null)}>
                  <X size={13} color="#9CA3AF" strokeWidth={3} />
                </button>
              </div>
            )}
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {filtered.map(c => (
                <button key={c.id}
                  onClick={() => setSelected(c)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left transition-colors"
                  style={{ background: selected?.id === c.id ? 'rgba(0,35,51,0.06)' : 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#F4F6F8' }}
                  onMouseLeave={e => { e.currentTarget.style.background = selected?.id === c.id ? 'rgba(0,35,51,0.06)' : 'transparent' }}>
                  <Avatar gender={c.gender} photoId={c.photoId} name={c.name} size={34} />
                  <div>
                    <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.name}</p>
                    <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <p className="text-xs font-black text-[#6B7280] mb-2 uppercase tracking-wide" style={{ fontFamily: 'Roboto, sans-serif' }}>Message</p>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write your message..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
              style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', color: '#002333', fontWeight: 600 }}
            />
          </div>
        </div>

        <div className="px-5 py-4 flex gap-3 flex-shrink-0" style={{ borderTop: '2px solid #EEF0F3' }}>
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-black transition-colors"
            style={{ background: '#F4F6F8', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
            Cancel
          </button>
          <button onClick={handleSend}
            disabled={!selected || !text.trim()}
            className="flex-1 py-2.5 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2 transition-opacity"
            style={{ background: selected && text.trim() ? '#002333' : '#9CA3AF', fontFamily: 'Roboto, sans-serif' }}>
            <Send size={14} strokeWidth={3} /> Send
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function StudentMessages() {
  const [convos, setConvos]       = useState(studentMessages)
  const [threads, setThreads]     = useState(
    Object.fromEntries(studentMessages.map(m => [m.id, m.thread]))
  )
  const [activeId, setActiveId]   = useState(studentMessages[0]?.id ?? null)
  const [draftText, setDraftText] = useState('')
  const [showCompose, setShowCompose] = useState(false)
  const [search, setSearch]       = useState('')
  const [starred, setStarred]     = useState(new Set())

  const filtered = convos.filter(m =>
    m.sender.toLowerCase().includes(search.toLowerCase()) ||
    m.lastMessage.toLowerCase().includes(search.toLowerCase())
  )

  const activeMsg    = convos.find(m => m.id === activeId)
  const activeThread = activeMsg ? (threads[activeId] || []) : []

  function sendMessage() {
    const text = draftText.trim()
    if (!text || !activeId) return
    setThreads(prev => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), { from: studentProfile.name, text, time: 'Just now', isMe: true }],
    }))
    setConvos(prev => prev.map(c => c.id === activeId ? { ...c, lastMessage: text } : c))
    setDraftText('')
  }

  function handleComposeSend(contact, text) {
    const newId = Date.now()
    const newConvo = {
      id: newId,
      sender: contact.name,
      role: contact.role,
      gender: contact.gender,
      photoId: contact.photoId,
      lastMessage: text,
      time: 'Just now',
      unread: 0,
      thread: [{ from: studentProfile.name, text, time: 'Just now', isMe: true }],
    }
    setConvos(prev => [newConvo, ...prev])
    setThreads(prev => ({ ...prev, [newId]: newConvo.thread }))
    setActiveId(newId)
  }

  function toggleStar(id) {
    setStarred(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })
  }

  return (
    <>
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} onSend={handleComposeSend} />}

      <div className="flex rounded-2xl overflow-hidden max-w-[960px]"
        style={{ border: '2px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)', height: 'calc(100vh - 180px)', minHeight: 520 }}>

        {/* ── Left panel ── */}
        <div className="flex-shrink-0 flex flex-col" style={{ width: 288, background: '#fff', borderRight: '2px solid #F4F6F8' }}>
          {/* Header */}
          <div className="px-4 py-4 flex items-center justify-between flex-shrink-0"
            style={{ borderBottom: '2px solid #F4F6F8' }}>
            <h2 className="font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>Messages</h2>
            <button onClick={() => setShowCompose(true)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:bg-[#F4F6F8]"
              title="Compose new message">
              <Edit3 size={16} color="#002333" strokeWidth={3} />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <div className="relative">
              <Search size={13} color="#9CA3AF" strokeWidth={3} className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search messages..."
                className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
                style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', color: '#002333', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto">
            {filtered.map(msg => (
              <button key={msg.id}
                onClick={() => setActiveId(msg.id)}
                className="w-full text-left px-4 py-3.5 flex items-center gap-3 transition-colors"
                style={{ background: activeId === msg.id ? '#F4F6F8' : 'transparent', borderBottom: '1px solid #F4F6F8' }}>
                <Avatar gender={msg.gender} photoId={msg.photoId} name={msg.sender} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{msg.sender}</span>
                    <span className="text-[10px] font-bold text-[#9CA3AF] flex-shrink-0 ml-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{msg.time}</span>
                  </div>
                  <p className="text-xs font-semibold text-[#6B7280] truncate mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{msg.lastMessage}</p>
                </div>
                {msg.unread > 0 && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white"
                    style={{ background: '#A60003' }}>{msg.unread}</span>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No conversations</p>
              </div>
            )}
          </div>

          {/* Compose button */}
          <div className="p-3 flex-shrink-0" style={{ borderTop: '2px solid #F4F6F8' }}>
            <button onClick={() => setShowCompose(true)}
              className="w-full py-2.5 rounded-xl text-sm font-black text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
              style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
              <Edit3 size={14} strokeWidth={3} /> New Message
            </button>
          </div>
        </div>

        {/* ── Right panel ── */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#FAFBFC' }}>
          {activeMsg ? (
            <>
              {/* Thread header */}
              <div className="px-6 py-4 flex items-center justify-between bg-white flex-shrink-0"
                style={{ borderBottom: '2px solid #F4F6F8' }}>
                <div className="flex items-center gap-3">
                  <Avatar gender={activeMsg.gender} photoId={activeMsg.photoId} name={activeMsg.sender} size={40} />
                  <div>
                    <p className="font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{activeMsg.sender}</p>
                    <p className="text-xs font-bold text-[#6B7280]" style={{ fontFamily: 'Roboto, sans-serif' }}>{activeMsg.role}</p>
                  </div>
                </div>
                <button onClick={() => toggleStar(activeId)} className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-[#F4F6F8] transition-colors">
                  {starred.has(activeId)
                    ? <Star size={16} color="#D97706" strokeWidth={3} fill="#D97706" />
                    : <StarOff size={16} color="#9CA3AF" strokeWidth={3} />}
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                {activeThread.map((msg, i) => (
                  <div key={i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[72%]">
                      <div className="px-4 py-2.5 text-sm font-semibold"
                        style={{
                          background: msg.isMe ? '#002333' : '#fff',
                          color: msg.isMe ? '#fff' : '#002333',
                          fontFamily: 'Roboto, sans-serif',
                          border: msg.isMe ? 'none' : '1.5px solid #EEF0F3',
                          borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        }}>
                        {msg.text}
                      </div>
                      <p className={`text-[10px] font-bold text-[#9CA3AF] mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}
                        style={{ fontFamily: 'Roboto, sans-serif' }}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="px-5 py-4 bg-white flex-shrink-0" style={{ borderTop: '2px solid #F4F6F8' }}>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={draftText}
                    onChange={e => setDraftText(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', color: '#002333', fontWeight: 700 }}
                  />
                  <button onClick={sendMessage}
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
                    style={{ background: '#002333' }}>
                    <Send size={16} color="#fff" strokeWidth={3} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3">
              <Edit3 size={36} color="#D1D5DB" strokeWidth={2} />
              <p className="text-sm font-black text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>No conversation selected</p>
              <button onClick={() => setShowCompose(true)}
                className="px-4 py-2 rounded-xl text-sm font-black text-white"
                style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
                Start a conversation
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
