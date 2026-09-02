import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

const categories = ['Men', 'Women', 'Footwear', 'Bags', 'Watches', 'Beauty', 'Deals']

export default function Header() {
  const { count } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query || 'shirt')}`)
  }

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="hidden sm:flex justify-between items-center max-w-6xl mx-auto px-6 py-1.5 text-[11px] text-stone border-b border-line/70">
        <span>Free shipping on orders over $75</span>
        <div className="flex gap-4">
          <Link to="/booking" className="hover:text-ink">Book a fitting</Link>
          <Link to="/contact" className="hover:text-ink">Contact</Link>
          <Link to="/login" className="hover:text-ink">Login</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
        <Link to="/" className="font-display text-2xl tracking-tight shrink-0" onClick={() => setMenuOpen(false)}>VYRA</Link>
        <nav className="hidden md:flex items-center gap-5 text-sm flex-1">
          {categories.map((c) => (
            <Link key={c} to={`/category/${c}`} className="text-ink/80 hover:text-ink">
              {c}
            </Link>
          ))}
        </nav>
        <form onSubmit={handleSearch} className="hidden sm:flex items-center border border-line bg-white rounded-sm overflow-hidden">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products"
            className="px-3 py-1.5 text-sm w-40 focus:outline-none"
          />
          <button className="px-3 py-1.5 text-sm border-l border-line hover:bg-paper">⌕</button>
        </form>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/account" aria-label="Account" className="hover:text-olive">Account</Link>
          <Link to="/cart" aria-label="Cart" className="relative hover:text-olive">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-3 bg-clay text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="md:hidden border border-line px-2 py-1 text-xs hover:border-ink"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-paper px-6 py-4 grid grid-cols-2 gap-3 text-sm">
          {categories.map((c) => (
            <Link key={c} to={`/category/${c}`} onClick={() => setMenuOpen(false)} className="py-1 text-ink/80 hover:text-ink">
              {c}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}