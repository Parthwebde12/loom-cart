import { useState } from 'react'

const initialMessages = [
  { from: 'them', text: 'Hi! How can we help you?', time: '10:30 AM' },
]

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [draft, setDraft] = useState('')

  function send(e) {
    e.preventDefault()
    if (!draft.trim()) return
    setMessages((m) => [...m, { from: 'me', text: draft, time: 'Now' }])
    setDraft('')
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: 'them', text: 'Thanks — someone from our team will reply shortly.', time: 'Now' },
      ])
    }, 700)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="w-80 bg-white border border-line rounded-sm shadow-lg flex flex-col mb-3 overflow-hidden">
          <div className="bg-ink text-paper px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-medium">Chat with us</span>
            <button onClick={() => setOpen(false)} className="text-paper/70 hover:text-paper text-sm">✕</button>
          </div>
          <div className="p-3 flex flex-col gap-2 h-64 overflow-y-auto">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[80%] ${m.from === 'me' ? 'self-end text-right' : 'self-start'}`}>
                <div className={`px-3 py-2 text-sm rounded-sm ${m.from === 'me' ? 'bg-ink text-paper' : 'bg-paper text-ink'}`}>
                  {m.text}
                </div>
                <div className="text-[10px] text-stone mt-0.5">{m.time}</div>
              </div>
            ))}
          </div>
          <form onSubmit={send} className="border-t border-line flex">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button className="px-3 text-olive-dark">➤</button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full bg-ink text-paper flex items-center justify-center shadow-lg hover:bg-olive-dark"
        aria-label="Toggle chat"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}