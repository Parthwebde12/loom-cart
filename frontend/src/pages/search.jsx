import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Stars from '../components/Stars.jsx'
import { products } from '../data/products.js'
import { useCart } from '../context/useCart.js'

export default function Search() {
  const [params] = useSearchParams()
  const q = params.get('q') || 'shirt'
  const [sort, setSort] = useState('Relevance')
  const { addItem } = useCart()

  const results = products.filter((p) =>
    p.name.toLowerCase().includes(q.toLowerCase()) || q.toLowerCase() === 'shirt'
  )

  function addToCart(product) {
    addItem({ id: product.id, name: product.name, price: product.price, size: 'M', color: product.specs?.colors?.[0] || 'Black', qty: 1, image: product.image })
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <form className="flex items-center border border-line bg-white rounded-sm overflow-hidden mb-2 max-w-md">
        <input defaultValue={q} className="px-3 py-2 text-sm flex-1 focus:outline-none" />
        <button className="px-4 text-sm border-l border-line hover:bg-paper">Search</button>
      </form>
      <div className="flex items-center justify-between mb-6 mt-4">
        <p className="text-sm text-stone">Showing results for "{q}" ({results.length})</p>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field !w-auto !py-1.5 text-sm">
          <option>Relevance</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
        </select>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {results.map((p) => (
          <div key={p.id} className="relative group">
            <Link to={`/product/${p.id}`}>
            <div className="aspect-[4/5] mb-3 overflow-hidden bg-paper border border-line">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <span className="absolute top-2 right-2 text-stone group-hover:text-clay">♡</span>
            <div className="text-sm leading-snug">{p.name}</div>
            <div className="text-sm font-medium mt-1">${p.price.toFixed(2)}</div>
            <Stars rating={p.rating} reviews={p.reviews} />
            </Link>
            <button onClick={() => addToCart(p)} className="btn-primary w-full mt-3 !py-2 text-xs">Add to cart</button>
          </div>
        ))}
      </div>
    </div>
  )
}