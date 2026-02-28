import { useState } from 'react'
import { Send, Paperclip } from 'lucide-react'
import { parentProfile, parentMessages as THREADS_INIT } from '../../data/parentData'

const ACCENT = '#C084FC'

export default function ParentMessages() {
  const [threads, setThreads] = useState(THREADS_INIT)
  const [selectedId, setSelectedId] = useState(THREADS_INIT[0].id)
  const [input, setInput] = useState('')

  const thread = threads.find(t => t.id === selectedId)

  function sendMessage() {
    const text = input.trim()
    if (!text) return
    setThreads(prev => prev.map(t =>
      t.id === selectedId
        ? { ...t, messages: [...t.messages, { from: 'me', text, time: 'Now' }], lastMessage: text, unread: 0 }
        : t
    ))
    setInput('')
  }

  return (
    <div className="flex gap-5 h-[calc(100vh-140px)]">
      {/* Left: thread list */}
      <div className="flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
        style={{ width: 280, background: '#fff', border: '1px solid #EEF0F3' }}>
        <div className="px-4 py-3.5 flex-shrink-0" style={{ background: '#002333' }}>
          <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Messages</p>
          <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Roboto, sans-serif' }}>
            {threads.filter(t => t.unread > 0).length} unread
          </p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {threads.map(t => {
            const active = t.id === selectedId
            return (
              <button key={t.id} onClick={() => setSelectedId(t.id)}
                className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-all"
                style={{
                  background: active ? 'rgba(192,132,252,0.08)' : 'transparent',
                  borderLeft: active ? `3px solid ${ACCENT}` : '3px solid transparent',
                  borderBottom: '1px solid #F4F6F8',
                }}>
                <div className="relative flex-shrink-0">
                  <img src={`https://randomuser.me/api/portraits/${t.avatarGender}/${t.avatarId}.jpg`}
                    alt={t.contact} className="rounded-full"
                    style={{ width: 38, height: 38, border: '1.5px solid #EEF0F3' }}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                  {t.unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                      style={{ background: '#A60003' }}>{t.unread}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black truncate text-[#002333]" style={{ fontFamily: 'Sora, sans-serif' }}>{t.contact}</p>
                    <span className="text-[10px] text-[#9CA3AF] ml-2 flex-shrink-0">{t.time}</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#9CA3AF] truncate mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {t.role}
                  </p>
                  <p className="text-[11px] text-[#6B7280] truncate mt-0.5" style={{ fontFamily: 'Roboto, sans-serif' }}>
                    {t.lastMessage}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Right: message thread */}
      {thread ? (
        <div className="flex-1 rounded-2xl overflow-hidden flex flex-col"
          style={{ background: '#fff', border: '1px solid #EEF0F3' }}>
          {/* Header */}
          <div className="px-5 py-3.5 flex items-center gap-3 flex-shrink-0" style={{ background: '#002333' }}>
            <img src={`https://randomuser.me/api/portraits/${thread.avatarGender}/${thread.avatarId}.jpg`}
              alt={thread.contact} className="rounded-full"
              style={{ width: 36, height: 36, border: `2px solid ${ACCENT}` }}
              onError={e => { e.target.style.display = 'none' }}
            />
            <div>
              <p className="text-sm font-black text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{thread.contact}</p>
              <p className="text-[10px] font-semibold" style={{ color: 'rgba(255,255,255,0.50)', fontFamily: 'Roboto, sans-serif' }}>
                {thread.role}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {thread.messages.map((m, i) => {
              const isMe = m.from === 'me'
              return (
                <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[75%]">
                    <div className="px-4 py-3 rounded-2xl"
                      style={{
                        background: isMe ? '#002333' : '#F4F6F8',
                        borderBottomRightRadius: isMe ? 4 : undefined,
                        borderBottomLeftRadius:  isMe ? undefined : 4,
                      }}>
                      <p className="text-sm leading-relaxed" style={{ color: isMe ? '#fff' : '#002333', fontFamily: 'Roboto, sans-serif' }}>
                        {m.text}
                      </p>
                    </div>
                    <p className="text-[10px] text-[#9CA3AF] mt-1 px-1"
                      style={{ textAlign: isMe ? 'right' : 'left', fontFamily: 'Roboto, sans-serif' }}>
                      {m.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Compose */}
          <div className="px-5 py-4 flex items-end gap-3 flex-shrink-0" style={{ borderTop: '1px solid #EEF0F3' }}>
            <button className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors hover:bg-[#F4F6F8]">
              <Paperclip size={16} color="#9CA3AF" strokeWidth={2.5} />
            </button>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
              placeholder={`Reply to ${thread.contact}…`}
              rows={1}
              className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
              style={{ background: '#F4F6F8', border: '1.5px solid transparent', fontFamily: 'Roboto, sans-serif' }}
              onFocus={e => e.target.style.border = `1.5px solid ${ACCENT}`}
              onBlur={e => e.target.style.border = '1.5px solid transparent'}
            />
            <button onClick={sendMessage}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-80"
              style={{ background: ACCENT }}>
              <Send size={15} color="#fff" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
