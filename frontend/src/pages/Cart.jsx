
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

export default function Cart() {
  const { items, updateQty, removeItem, subtotal, shipping, tax, total } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl mb-3">Your cart is empty</h1>
        <p className="text-stone mb-6">Nothing here yet — go find something worth carrying home.</p>
        <Link to="/category/Men" className="btn-primary inline-block">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="font-display text-3xl mb-8">Your cart ({items.length} item{items.length > 1 ? 's' : ''})</h1>
      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <div className="divide-y divide-line border-y border-line">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-4 py-5 sm:gap-5">
              <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 bg-paper border border-line overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(event) => {
                      event.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-stone">No image</div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm sm:text-base font-medium pr-3">{item.name}</p>
                  <button aria-label={`Remove ${item.name}`} onClick={() => removeItem(idx)} className="text-stone hover:text-clay text-sm">✕</button>
                </div>
                <p className="text-xs text-stone mt-1">Size: {item.size} &nbsp; Color: <span className="inline-block w-2.5 h-2.5 rounded-full align-middle" style={{ backgroundColor: item.color }} /></p>
                <p className="text-sm font-medium mt-3">${item.price.toFixed(2)}</p>
                <div className="flex items-center border border-line w-fit rounded-sm mt-3">
                  <button onClick={() => updateQty(idx, item.qty - 1)} className="w-8 h-8 hover:bg-paper text-sm">−</button>
                  <span className="w-8 text-center text-sm">{item.qty}</span>
                  <button onClick={() => updateQty(idx, item.qty + 1)} className="w-8 h-8 hover:bg-paper text-sm">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-medium mb-4">Price details</h2>
          <div className="text-sm space-y-2 text-ink/80">
            <div className="flex justify-between"><span>Subtotal ({items.length} items)</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className={shipping === 0 ? 'text-olive-dark' : ''}>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span>Tax (6%)</span><span>${tax.toFixed(2)}</span></div>
          </div>
          <div className="flex justify-between font-medium text-base border-t border-line mt-3 pt-3">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="btn-primary w-full mt-6">Proceed to checkout</button>
          <Link to="/category/Men" className="btn-outline w-full mt-3 block text-center">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}