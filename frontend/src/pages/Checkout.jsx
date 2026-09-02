import React from 'react'
import { useNavigate } from 'react-router-dom'
import Placeholder from '../components/placeholder.jsx'
import { useCart } from '../context/useCart.js';

const fields = [
  { name: 'fullName', label: 'Full name', placeholder: 'Enter full name', span: 2 },
  { name: 'phone', label: 'Phone number', placeholder: 'Enter phone number', span: 2 },
  { name: 'address', label: 'Address', placeholder: 'House no., Street name', span: 2 },
  { name: 'apartment', label: 'Apartment / Suite', placeholder: 'Apartment, suite, unit (optional)', span: 2 },
  { name: 'city', label: 'City', placeholder: 'Enter city', span: 1 },
  { name: 'state', label: 'State', placeholder: 'State', span: 1 },
  { name: 'zip', label: 'ZIP / Postal code', placeholder: 'Enter zip code', span: 2 },
]

export default function Checkout() {
  const { items, subtotal, shipping, tax, total } = useCart()
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/payment')
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-center gap-4 mb-10 text-sm">
        {['Shipping', 'Payment', 'Review'].map((step, i) => (
          <React.Fragment key={step}>
            <div className={`flex items-center gap-2 ${i === 0 ? 'text-ink' : 'text-stone'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i === 0 ? 'bg-ink text-paper' : 'border border-line'}`}>{i + 1}</span>
              {step}
            </div>
            {i < 2 && <span className="w-8 h-px bg-line" />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid md:grid-cols-[1fr_320px] gap-10">
        <form onSubmit={handleSubmit}>
          <h1 className="font-display text-2xl mb-6">Shipping information</h1>
          <div className="grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.name} className={f.span === 2 ? 'col-span-2' : 'col-span-1'}>
                <label className="text-sm mb-1 block">{f.label}</label>
                <input required={f.name !== 'apartment'} placeholder={f.placeholder} className="input-field" />
              </div>
            ))}
          </div>
          <button className="btn-primary w-full mt-8">Continue to payment</button>
        </form>

        <div>
          <h2 className="font-medium mb-4">Order summary</h2>
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-3 text-sm">
                <Placeholder className="w-14 h-14 shrink-0" />
                <div className="flex-1">
                  <p>{item.name}</p>
                  <p className="text-xs text-stone">Size {item.size} • Qty {item.qty}</p>
                </div>
                <p className="font-medium">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="text-sm space-y-2 border-t border-line mt-4 pt-4 text-ink/80">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
          </div>
          <div className="flex justify-between font-medium text-base border-t border-line mt-3 pt-3">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}