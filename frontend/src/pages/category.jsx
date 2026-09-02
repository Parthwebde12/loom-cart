import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Stars from '../components/Stars.jsx'
import { products } from '../data/products.js'
import { useCart } from '../context/useCart.js'

const sidebarCategories = ['Men', 'Women', 'Footwear', 'Bags', 'Watches', 'Electronics', 'Home & Living', 'Beauty', 'Deals']
const brands = ['Nike', 'Adidas', 'Puma', "Levi's", 'U.S. Polo']
const sizes = ['S', 'M', 'L', 'XL']

export default function Category() {
  const { name } = useParams()
  const [sort, setSort] = useState('Popularity')
  const { addItem } = useCart()
  const list = products.filter((p) => p.category === name).length ? products.filter((p) => p.category === name) : products

  function addToCart(product) {
    addItem({ id: product.id, name: product.name, price: product.price, size: 'M', color: product.specs?.colors?.[0] || 'Black', qty: 1, image: product.image })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <p className="text-sm text-stone mb-6">Home / {name}</p>
      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        <aside className="space-y-8">
          <div>
            <h3 className="font-medium mb-3 text-sm">Categories</h3>
            <ul className="space-y-2 text-sm text-stone">
              {sidebarCategories.map((c) => (
                <li key={c}>
                  <Link to={`/category/${c}`} className={c === name ? 'text-ink font-medium' : 'hover:text-ink'}>
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3 text-sm">Price</h3>
            <div className="flex items-center gap-2 text-sm">
              <input className="input-field !py-1.5 !px-2 w-16" defaultValue="0" />
              <span className="text-stone">–</span>
              <input className="input-field !py-1.5 !px-2 w-16" defaultValue="200" />
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-3 text-sm">Brand</h3>
            <ul className="space-y-2 text-sm text-stone">
              {brands.map((b) => (
                <li key={b} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-olive" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3 text-sm">Size</h3>
            <div className="flex gap-2">
              {sizes.map((s) => (
                <button key={s} className="w-8 h-8 border border-line text-xs hover:border-ink rounded-sm">{s}</button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-stone">Showing 1–{list.length} of {list.length} products</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field !w-auto !py-1.5 text-sm"
            >
              <option>Popularity</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
              <option>Newest</option>
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {list.map((p) => (
              <div key={p.id}>
                <Link to={`/product/${p.id}`}>
                <div className="aspect-[4/5] mb-3 overflow-hidden bg-paper border border-line group">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-sm leading-snug">{p.name}</div>
                <div className="text-sm font-medium mt-1">${p.price.toFixed(2)}</div>
                <Stars rating={p.rating} reviews={p.reviews} />
                </Link>
                <button onClick={() => addToCart(p)} className="btn-primary w-full mt-3 !py-2 text-xs">Add to cart</button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-10 text-sm">
            {[1, 2, 3].map((n) => (
              <button key={n} className={`w-8 h-8 border rounded-sm ${n === 1 ? 'bg-ink text-paper border-ink' : 'border-line hover:border-ink'}`}>
                {n}
              </button>
            ))}
            <span className="text-stone px-1">…</span>
            <button className="w-8 h-8 border border-line rounded-sm hover:border-ink">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}