import useState from 'react'
export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">
      <div>
        <h1 className="font-display text-3xl mb-4">Get in touch</h1>
        <p className="text-stone mb-8 max-w-[38ch]">
          Questions about an order, a return, or just want to say hello — we read every message.
        </p>
        <div className="text-sm space-y-3 text-ink/80">
          <p><span className="text-stone">Store</span><br />14 Deccan Gymkhana, Pune, MH 411004</p>
          <p><span className="text-stone">Hours</span><br />Mon–Sat, 10am–8pm</p>
          <p><span className="text-stone">Email</span><br />hello@loom-store.com</p>
        </div>
      </div>

      <div>
        {sent ? (
          <div className="border border-line p-8 text-center">
            <p className="font-display text-xl mb-1">Message sent</p>
            <p className="text-stone text-sm">We'll get back to you within a day.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true) }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm mb-1 block">Name</label>
              <input required placeholder="Enter your name" className="input-field" />
            </div>
            <div>
              <label className="text-sm mb-1 block">Email</label>
              <input required type="email" placeholder="Enter your email" className="input-field" />
            </div>
            <div>
              <label className="text-sm mb-1 block">Message</label>
              <textarea required rows={5} placeholder="Type your message here..." className="input-field resize-none" />
            </div>
            <button className="btn-primary w-full">Send message</button>
          </form>
        )}
      </div>
    </div>
  )
}