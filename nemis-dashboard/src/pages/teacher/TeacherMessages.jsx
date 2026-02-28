import { useState } from 'react'
import { teacherMessages, teacherProfile, classStudents } from '../../data/teacherData'
import { Search, Plus, SendHorizonal, X, Star, Megaphone } from 'lucide-react'

const ALL_CONTACTS = [
  { name: 'Mr. Samuel Johnson', role: 'Principal',      gender: 'men',   photoId: 36 },
  { name: 'School Admin',       role: 'Administration', gender: 'men',   photoId: 20 },
  ...classStudents.G9A.map(s => ({ name: s.name, role: 'Student – Grade 9A', gender: s.gender, photoId: s.photoId })),
  ...classStudents.G9B.map(s => ({ name: s.name, role: 'Student – Grade 9B', gender: s.gender, photoId: s.photoId })),
]

function Avatar({ gender, photoId, name, size = 38, border = '2px solid #EEF0F3' }) {
  return (
    <img
      src={`https://randomuser.me/api/portraits/${gender}/${photoId}.jpg`}
      alt={name}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border }}
      onError={e => { e.target.style.display = 'none' }}
    />
  )
}

function ComposeModal({ onClose }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [text, setText] = useState('')

  const results = ALL_CONTACTS.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 8)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,35,51,0.45)', backdropFilter: 'blur(3px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl w-full max-w-[480px] overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,35,51,0.25)' }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: '2px solid #EEF0F3', background: '#002333' }}>
          <h3 className="text-base font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>New Message</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <X size={16} color="white" strokeWidth={3} />
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-black text-[#6B7280] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>To</label>
            {selected ? (
              <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
                style={{ border: '2px solid #002333', background: 'rgba(0,35,51,0.04)' }}>
                <Avatar gender={selected.gender} photoId={selected.photoId} name={selected.name} size={28} border="1.5px solid #EEF0F3" />
                <span className="text-sm font-black text-[#002333] flex-1" style={{ fontFamily: 'Sora, sans-serif' }}>{selected.name}</span>
                <button onClick={() => setSelected(null)}>
                  <X size={14} color="#9CA3AF" strokeWidth={3} />
                </button>
              </div>
            ) : (
              <div className="relative">
                <Search size={14} color="#9CA3AF" strokeWidth={3} className="absolute left-3 top-1/2 -translate-y-1/2" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search students, principal, admin…"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm font-bold text-[#002333] outline-none"
                  style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
                  onFocus={e => { e.target.style.borderColor = '#002333' }}
                  onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
              </div>
            )}
            {!selected && search && (
              <div className="mt-1 bg-white rounded-xl overflow-hidden" style={{ border: '1.5px solid #EEF0F3', maxHeight: 200, overflowY: 'auto' }}>
                {results.map((c, i) => (
                  <button key={i} onClick={() => { setSelected(c); setSearch('') }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-left hover:bg-[#F4F6F8] transition-colors">
                    <Avatar gender={c.gender} photoId={c.photoId} name={c.name} size={28} border="1.5px solid #EEF0F3" />
                    <div>
                      <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{c.name}</p>
                      <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{c.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-black text-[#6B7280] mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>Message</label>
            <textarea rows={4} value={text} onChange={e => setText(e.target.value)}
              placeholder="Type your message…"
              className="w-full px-4 py-3 rounded-xl text-sm font-semibold text-[#002333] outline-none resize-none"
              style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif' }}
              onFocus={e => { e.target.style.borderColor = '#002333' }}
              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-end gap-3" style={{ borderTop: '2px solid #EEF0F3' }}>
          <button onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-black hover:bg-[#F4F6F8]"
            style={{ color: '#6B7280', fontFamily: 'Roboto, sans-serif' }}>Cancel</button>
          <button onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-black text-white hover:opacity-80"
            style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default function TeacherMessages() {
  const [threads, setThreads]           = useState(teacherMessages)
  const [selected, setSelected]         = useState(teacherMessages[0])
  const [search, setSearch]             = useState('')
  const [inputText, setInputText]       = useState('')
  const [showCompose, setShowCompose]   = useState(false)
  const [starred, setStarred]           = useState(new Set())

  const filtered = threads.filter(t => t.sender.toLowerCase().includes(search.toLowerCase()))

  function sendMessage() {
    if (!inputText.trim()) return
    setThreads(prev => prev.map(t =>
      t.id === selected.id
        ? { ...t, thread: [...t.thread, { from: teacherProfile.name, text: inputText, time: 'Just now', isMe: true }], lastMessage: inputText }
        : t
    ))
    setSelected(prev => ({ ...prev, thread: [...prev.thread, { from: teacherProfile.name, text: inputText, time: 'Just now', isMe: true }], lastMessage: inputText }))
    setInputText('')
  }

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 68px - 40px)', minHeight: 500 }}>
      {showCompose && <ComposeModal onClose={() => setShowCompose(false)} />}

      {/* Left panel */}
      <div className="flex flex-col flex-shrink-0 bg-white rounded-2xl overflow-hidden mr-4"
        style={{ width: 300, border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
        <div className="px-4 py-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
          <h3 className="text-base font-black text-[#002333] mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Messages</h3>
          <div className="relative">
            <Search size={14} color="#9CA3AF" strokeWidth={3} className="absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations…"
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-bold text-[#002333] outline-none"
              style={{ border: '1.5px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: '#FAFBFC' }}
              onFocus={e => { e.target.style.borderColor = '#002333' }}
              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filtered.map(t => (
            <button key={t.id}
              onClick={() => setSelected(t)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
              style={{ background: selected?.id === t.id ? 'rgba(0,35,51,0.05)' : 'transparent', borderBottom: '1px solid #F4F6F8' }}>
              <div className="relative flex-shrink-0">
                <Avatar gender={t.gender} photoId={t.photoId} name={t.sender} size={38} />
                {t.unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                    style={{ background: '#A60003' }}>{t.unread}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-black text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{t.sender}</span>
                  <span className="text-[10px] font-bold text-[#9CA3AF] flex-shrink-0 ml-1" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.time}</span>
                </div>
                <p className="text-xs font-bold text-[#9CA3AF] truncate" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.role}</p>
                <p className="text-xs font-semibold text-[#6B7280] truncate mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>{t.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3" style={{ borderTop: '1px solid #F4F6F8' }}>
          <button onClick={() => setShowCompose(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black text-white transition-opacity hover:opacity-80"
            style={{ background: '#002333', fontFamily: 'Roboto, sans-serif' }}>
            <Plus size={14} strokeWidth={3} /> Compose
          </button>
        </div>
      </div>

      {/* Right panel */}
      {selected ? (
        <div className="flex-1 flex flex-col bg-white rounded-2xl overflow-hidden"
          style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 6px rgba(0,35,51,0.05)' }}>
          <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
            style={{ borderBottom: '2px solid #EEF0F3' }}>
            <div className="flex items-center gap-3">
              <Avatar gender={selected.gender} photoId={selected.photoId} name={selected.sender} />
              <div>
                <p className="text-sm font-black text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{selected.sender}</p>
                <p className="text-xs font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>{selected.role}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black transition-colors hover:bg-[#F4F6F8]"
              style={{ border: '1.5px solid #EEF0F3', color: '#002333', fontFamily: 'Roboto, sans-serif' }}>
              <Megaphone size={13} strokeWidth={3} /> Announce
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
            {selected.thread.map((msg, i) => (
              <div key={i} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} items-end gap-2`}>
                {!msg.isMe && <Avatar gender={selected.gender} photoId={selected.photoId} name={selected.sender} size={28} border="1.5px solid #EEF0F3" />}
                <div className="max-w-[68%]">
                  <div className="px-4 py-3 rounded-2xl"
                    style={{
                      background: msg.isMe ? '#002333' : '#fff',
                      border: msg.isMe ? 'none' : '1.5px solid #EEF0F3',
                    }}>
                    <p className="text-sm font-semibold leading-relaxed"
                      style={{ color: msg.isMe ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
                      {msg.text}
                    </p>
                  </div>
                  <p className="text-[10px] font-bold text-[#9CA3AF] mt-1 px-1"
                    style={{ textAlign: msg.isMe ? 'right' : 'left', fontFamily: 'Roboto, sans-serif' }}>
                    {msg.time}
                  </p>
                </div>
                {msg.isMe && (
                  <Avatar gender={teacherProfile.gender} photoId={teacherProfile.photoId} name={teacherProfile.name} size={28} border="1.5px solid #EEF0F3" />
                )}
              </div>
            ))}
          </div>

          <div className="px-5 py-4 flex items-center gap-3 flex-shrink-0" style={{ borderTop: '2px solid #EEF0F3' }}>
            <input value={inputText} onChange={e => setInputText(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder="Type a message…"
              className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-[#002333] outline-none"
              style={{ border: '2px solid #EEF0F3', fontFamily: 'Roboto, sans-serif', background: '#FAFBFC' }}
              onFocus={e => { e.target.style.borderColor = '#002333' }}
              onBlur={e => { e.target.style.borderColor = '#EEF0F3' }} />
            <button onClick={sendMessage}
              className="w-11 h-11 rounded-xl flex items-center justify-center transition-opacity hover:opacity-80 flex-shrink-0"
              style={{ background: '#002333' }}>
              <SendHorizonal size={18} color="white" strokeWidth={3} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-white rounded-2xl"
          style={{ border: '1px solid #EEF0F3' }}>
          <p className="text-sm font-bold text-[#9CA3AF]" style={{ fontFamily: 'Roboto, sans-serif' }}>Select a conversation</p>
        </div>
      )}
    </div>
  )
}
