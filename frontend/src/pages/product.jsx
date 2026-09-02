import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Stars from '../components/Stars.jsx'
import { findProduct } from '../data/products.js'
import { useCart } from '../context/useCart.js'

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL']
const tabs = ['Description', 'Reviews', 'Shipping & Returns']

export default function Product() {
  const { id } = useParams()
  const product = findProduct(id)
  const { addItem } = useCart()
  const navigate = useNavigate()

  const colors = product.specs?.colors || ['Black']
  const [color, setColor] = useState(colors[0])
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('Description')

  function handleAdd(goToCart) {
    addItem({ id: product.id, name: product.name, price: product.price, size, color, qty, image: product.image })
    if (goToCart) navigate('/cart')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <p className="text-sm text-stone mb-6">
        Home / {product.category} / {product.name}
      </p>
      <div className="grid md:grid-cols-[100px_1fr_1fr] gap-6">
        <div className="hidden md:flex md:flex-col gap-3 order-2 md:order-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-square overflow-hidden border border-line bg-paper">
              <img src={product.image} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <div className="order-1 md:order-2">
          <div className="aspect-square overflow-hidden border border-line bg-paper">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="order-3">
          <h1 className="font-display text-3xl mb-2">{product.name}</h1>
          <Stars rating={product.rating} reviews={product.reviews} />
          <p className="text-2xl font-medium mt-4">${product.price.toFixed(2)}</p>
          <p className="text-xs text-stone mb-4">Inclusive of all taxes</p>
          <p className="text-sm text-ink/80 max-w-[46ch] mb-6">
            A wardrobe staple made from breathable, pre-washed fabric — comfortable, durable, and easy to style for everyday wear.
          </p>

          <div className="mb-5">
            <p className="text-sm font-medium mb-2">Color</p>
            <div className="flex gap-2">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-7 h-7 rounded-full border-2 ${color === c ? 'border-ink' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>

          <div className="mb-5">
            <p className="text-sm font-medium mb-2">Size</p>
            <div className="flex gap-2">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-9 h-9 text-sm border rounded-sm ${size === s ? 'bg-ink text-paper border-ink' : 'border-line hover:border-ink'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Quantity</p>
            <div className="flex items-center border border-line w-fit rounded-sm">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-9 hover:bg-paper">−</button>
              <span className="w-9 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-9 hover:bg-paper">+</button>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={() => handleAdd(false)} className="btn-primary flex-1">Add to cart</button>
            <button onClick={() => handleAdd(true)} className="btn-outline flex-1">Buy now</button>
          </div>

          <div className="flex gap-6 text-xs text-stone border-t border-line pt-4">
            <span>Free shipping</span>
            <span>Easy returns</span>
            <span>Secure payment</span>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-line pt-6 max-w-3xl">
        <div className="flex gap-6 text-sm mb-5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-2 border-b-2 ${tab === t ? 'border-ink text-ink' : 'border-transparent text-stone hover:text-ink'}`}
            >
              {t === 'Reviews' ? `Reviews (${product.reviews})` : t}
            </button>
          ))}
        </div>
        {tab === 'Description' && (
          <div className="text-sm text-ink/80 space-y-3">
            <p>
              This piece is made from premium cotton fabric — soft, breathable, and ideal for everyday wear.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Regular fit</li>
              <li>Button-down collar</li>
              <li>Full sleeves</li>
              <li>Available in multiple colors and sizes</li>
            </ul>
          </div>
        )}
        {tab === 'Reviews' && (
          <p className="text-sm text-stone">{product.reviews} customers have reviewed this product.</p>
        )}
        {tab === 'Shipping & Returns' && (
          <p className="text-sm text-stone">Free standard shipping on orders over $75. Returns accepted within 30 days, unworn and tagged.</p>
        )}
      </div>
    </div>
  )
}