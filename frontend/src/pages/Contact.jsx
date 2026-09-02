export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-4xl mb-6">Contact Us</h1>
      <p className="text-stone mb-8">Have questions? We'd love to hear from you.</p>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold text-ink mb-4">Get in Touch</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Your Name" className="input-field" />
            <input type="email" placeholder="Your Email" className="input-field" />
            <textarea placeholder="Message" className="input-field h-32" />
            <button type="submit" className="btn-primary">Send Message</button>
          </form>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold text-ink mb-4">Contact Info</h2>
          <p className="text-stone mb-3">📍 123 Main Street, City, State 12345</p>
          <p className="text-stone mb-3">📞 1-800-SHOP-NOW</p>
          <p className="text-stone mb-6">✉️ support@ecommerce.com</p>
          
          <h3 className="text-lg font-semibold text-ink mb-3">Business Hours</h3>
          <p className="text-stone">Monday - Friday: 9am - 6pm</p>
          <p className="text-stone">Saturday: 10am - 4pm</p>
          <p className="text-stone">Sunday: Closed</p>
        </div>
      </div>
    </div>
  )
}
