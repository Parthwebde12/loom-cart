
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="font-display text-xl mb-3">LOOM</div>
          <p className="text-stone text-sm leading-relaxed max-w-[22ch]">
            Everyday clothing and goods, made to wear in, not out.
          </p>
        </div>
        <div>
          <div className="text-ink font-medium mb-3">Shop</div>
          <ul className="space-y-2 text-stone">
            <li><Link to="/category/Men" className="hover:text-ink">Men</Link></li>
            <li><Link to="/category/Women" className="hover:text-ink">Women</Link></li>
            <li><Link to="/category/Footwear" className="hover:text-ink">Footwear</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink font-medium mb-3">Help</div>
          <ul className="space-y-2 text-stone">
            <li><Link to="/contact" className="hover:text-ink">Contact us</Link></li>
            <li><Link to="/booking" className="hover:text-ink">Book a fitting</Link></li>
            <li><Link to="/account" className="hover:text-ink">My orders</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-ink font-medium mb-3">Stay in touch</div>
          <form className="flex border border-line bg-white rounded-sm overflow-hidden">
            <input placeholder="Email address" className="px-3 py-2 text-sm flex-1 focus:outline-none" />
            <button className="px-3 text-sm bg-ink text-paper">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-line py-4 text-center text-xs text-stone">
        © 2026 LOOM. All rights reserved.
      </div>
    </footer>
  )
}