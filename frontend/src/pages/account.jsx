import { useState } from 'react'
import Placeholder from '../components/placeholder.jsx'

const navItems = ['My orders', 'Wishlist', 'Addresses', 'Account settings', 'Logout']

const orders = [
  { id: 'LM-482913', date: 'Aug 21, 2026', status: 'Delivered', total: 95.38, items: 2 },
  { id: 'LM-471205', date: 'Jul 3, 2026', status: 'Delivered', total: 42.0, items: 1 },
]

export default function Account() {
  const [active, setActive] = useState('My orders')

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="grid md:grid-cols-[240px_1fr] gap-10">
        <aside className="border border-line">
          <div className="flex items-center gap-3 p-4 border-b border-line">
            <div className="w-10 h-10 rounded-full bg-olive-light flex items-center justify-center text-olive-dark text-sm">PW</div>
            <div>
              <p className="text-sm font-medium">Parth Wakodikar</p>
              <p className="text-xs text-stone">parthwakodikar4@gmail.com</p>
            </div>
          </div>
          <ul className="text-sm">
            {navItems.map((n) => (
              <li key={n}>
                <button
                  onClick={() => setActive(n)}
                  className={`w-full text-left px-4 py-3 border-b border-line last:border-0 ${active === n ? 'text-ink font-medium bg-paper' : 'text-stone hover:text-ink'}`}
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          {active === 'My orders' && (
            <div>
              <h1 className="font-display text-2xl mb-6">My orders</h1>
              <div className="space-y-4">
                {orders.map((o) => (
                  <div key={o.id} className="border border-line p-4 flex items-center gap-4">
                    <Placeholder className="w-14 h-14 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order #{o.id}</p>
                      <p className="text-xs text-stone">{o.date} • {o.items} item{o.items > 1 ? 's' : ''}</p>
                    </div>
                    <span className="text-xs text-olive-dark border border-olive px-2 py-1 rounded-sm">{o.status}</span>
                    <p className="text-sm font-medium w-16 text-right">${o.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {active !== 'My orders' && (
            <div className="border border-line p-10 text-center text-stone text-sm">
              {active} — nothing to show yet.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}