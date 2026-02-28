import { useState } from 'react'
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile } from 'lucide-react'
import { messages as initialMessages } from '../data/mockData'

const CEO_PHOTO  = 'https://randomuser.me/api/portraits/men/42.jpg'
const CEO_NAME   = 'Mr. Jefferson Vobah'
const CEO_INIT   = 'JV'

function Avatar({ name, gender, photoId, initials, size = 36, meStyle = false, imgErrors, onError, id }) {
  const url = gender ? `https://randomuser.me/api/portraits/${gender}/${photoId}.jpg` : null
  const init = initials || name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const bg   = meStyle ? '#48D08C' : '#002333'
  const fg   = meStyle ? '#002333' : '#fff'

  if (!url || imgErrors?.[id]) {
    return (
      <div className="rounded-full flex items-center justify-center flex-shrink-0"
        style={{ width: size, height: size, background: bg }}>
        <span style={{ color: fg, fontSize: size * 0.28, fontFamily: 'Sora, sans-serif', fontWeight: 800 }}>{init}</span>
      </div>
    )
  }
  return (
    <img src={url} alt={name}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: '2px solid #EEF0F3' }}
      onError={() => onError?.(id)} />
  )
}

export default function Messages() {
  const [conversations, setConversations] = useState(initialMessages)
  const [selectedId, setSelectedId]       = useState(initialMessages[0].id)
  const [newMessage, setNewMessage]       = useState('')
  const [imgErrors, setImgErrors]         = useState({})
  const [ceoPhotoErr, setCeoPhotoErr]     = useState(false)

  const onImgError = (id) => setImgErrors((p) => ({ ...p, [id]: true }))

  const selectedConv = conversations.find((c) => c.id === selectedId)

  const handleSend = () => {
    if (!newMessage.trim()) return
    setConversations((prev) => prev.map((conv) => conv.id === selectedId ? {
      ...conv, unread: 0, lastMessage: newMessage, time: 'Just now',
      thread: [...conv.thread, { from: CEO_NAME, text: newMessage, time: 'Now', isMe: true }],
    } : conv))
    setNewMessage('')
  }

  const handleSelect = (id) => {
    setSelectedId(id)
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)))
  }

  const CeoAvatar = ({ size = 32 }) => ceoPhotoErr ? (
    <div className="rounded-full flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size, background: '#48D08C' }}>
      <span style={{ color: '#002333', fontSize: size * 0.28, fontFamily: 'Sora, sans-serif', fontWeight: 800 }}>{CEO_INIT}</span>
    </div>
  ) : (
    <img src={CEO_PHOTO} alt={CEO_NAME}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size, border: '2px solid rgba(72,208,140,0.4)' }}
      onError={() => setCeoPhotoErr(true)} />
  )

  return (
    <div className="max-w-[1180px]" style={{ height: 'calc(100vh - 144px)' }}>
      <div className="bg-white rounded-2xl overflow-hidden flex h-full"
        style={{ border: '1px solid #EEF0F3', boxShadow: '0 1px 4px rgba(0,35,51,0.05)' }}>

        {/* ── Conversation List ── */}
        <div className="w-[300px] flex flex-col flex-shrink-0" style={{ borderRight: '1px solid #EEF0F3' }}>
          <div className="px-5 pt-5 pb-4" style={{ borderBottom: '1px solid #F4F6F8' }}>
            <h3 className="font-bold text-[#002333] text-base mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Messages</h3>
            <div className="relative">
              <Search size={13} strokeWidth={2.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
              <input placeholder="Search conversations…"
                className="w-full pl-8 pr-3 py-2 bg-[#F4F6F8] rounded-lg text-xs outline-none text-[#374151] placeholder:text-[#9CA3AF]"
                style={{ fontFamily: 'Lato, sans-serif' }} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => {
              const isSelected = conv.id === selectedId
              return (
                <button key={conv.id} onClick={() => handleSelect(conv.id)}
                  className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
                  style={{ borderBottom: '1px solid #F4F6F8', background: isSelected ? 'rgba(0,35,51,0.04)' : 'transparent' }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#FAFBFC' }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}>
                  <div className="relative flex-shrink-0">
                    <Avatar name={conv.sender} gender={conv.gender} photoId={conv.photoId}
                      initials={conv.avatar} size={40} id={`list-${conv.id}`} imgErrors={imgErrors} onError={onImgError} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white"
                      style={{ background: '#48D08C' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-bold text-[#002333] truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {conv.sender}
                      </span>
                      <span className="text-[10px] text-[#6B7280] flex-shrink-0 ml-1 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] truncate mt-0.5 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 mt-0.5"
                      style={{ background: '#48D08C', fontSize: 10, fontFamily: 'Lato, sans-serif' }}>
                      {conv.unread}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── Thread ── */}
        {selectedConv && (
          <div className="flex-1 flex flex-col min-w-0">
            {/* Thread Header */}
            <div className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid #EEF0F3' }}>
              <div className="flex items-center gap-3">
                <Avatar name={selectedConv.sender} gender={selectedConv.gender} photoId={selectedConv.photoId}
                  initials={selectedConv.avatar} size={40} id={`hdr-${selectedConv.id}`} imgErrors={imgErrors} onError={onImgError} />
                <div>
                  <p className="text-sm font-bold text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{selectedConv.sender}</p>
                  <p className="text-xs text-[#6B7280] font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{selectedConv.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[Phone, Video, MoreVertical].map((Icon, i) => (
                  <button key={i}
                    className="w-9 h-9 flex items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F4F6F8] hover:text-[#002333] transition-colors">
                    <Icon size={17} strokeWidth={2.5} />
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ background: '#FAFBFC' }}>
              {selectedConv.thread.map((msg, idx) => (
                <div key={idx} className={`flex items-end gap-2.5 ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  {!msg.isMe && (
                    <Avatar name={selectedConv.sender} gender={selectedConv.gender} photoId={selectedConv.photoId}
                      initials={selectedConv.avatar} size={32} id={`msg-${selectedConv.id}`} imgErrors={imgErrors} onError={onImgError} />
                  )}
                  <div className={`max-w-[60%] flex flex-col gap-1 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                    <div className="px-4 py-2.5 text-sm leading-relaxed"
                      style={{
                        fontFamily: 'Lato, sans-serif',
                        background: msg.isMe ? '#002333' : '#fff',
                        color: msg.isMe ? '#fff' : '#1F2937',
                        borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                        boxShadow: msg.isMe ? 'none' : '0 1px 4px rgba(0,35,51,0.07)',
                        fontWeight: 500,
                      }}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] px-1 font-medium" style={{ fontFamily: 'Lato, sans-serif' }}>{msg.time}</span>
                  </div>
                  {msg.isMe && <CeoAvatar size={32} />}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-4 bg-white flex-shrink-0" style={{ borderTop: '1px solid #EEF0F3' }}>
              <div className="flex items-center gap-3 px-4 py-2 rounded-2xl"
                style={{ background: '#F4F6F8', border: '1.5px solid #EEF0F3' }}>
                <button className="text-[#6B7280] hover:text-[#002333] transition-colors flex-shrink-0">
                  <Paperclip size={16} strokeWidth={2.5} />
                </button>
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Type a message…"
                  className="flex-1 bg-transparent text-sm text-[#374151] placeholder:text-[#9CA3AF] outline-none font-medium"
                  style={{ fontFamily: 'Lato, sans-serif' }} />
                <button className="text-[#6B7280] hover:text-[#002333] transition-colors flex-shrink-0">
                  <Smile size={16} strokeWidth={2.5} />
                </button>
                <button onClick={handleSend}
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all hover:opacity-90 active:scale-95 flex-shrink-0"
                  style={{ background: newMessage.trim() ? '#48D08C' : '#CBD5E1' }}>
                  <Send size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
