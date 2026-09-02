import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Confirmation() {
  const { state } = useLocation()
  const [fallbackOrderId] = useState(() => `DC-${Math.floor(100000 + Math.random() * 900000)}`)
  const receipt = state?.receipt || {
    orderId: fallbackOrderId,
    date: new Date().toLocaleDateString(),
    method: 'Payment gateway',
    items: [],
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  }

  function receiptText() {
    const lines = receipt.items.map((item) => `${item.name} x${item.qty}  $${(item.price * item.qty).toFixed(2)}`)
    return [
      'DRIVECODE RECEIPT',
      `Order: ${receipt.orderId}`,
      `Date: ${receipt.date}`,
      `Payment: ${receipt.method}`,
      '',
      ...lines,
      '',
      `Subtotal: $${receipt.subtotal.toFixed(2)}`,
      `Shipping: $${receipt.shipping.toFixed(2)}`,
      `Tax: $${receipt.tax.toFixed(2)}`,
      `Total: $${receipt.total.toFixed(2)}`,
    ].join('\n')
  }

  function downloadReceipt() {
    const blob = new Blob([receiptText()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${receipt.orderId}-receipt.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center">
      <div className="w-16 h-16 rounded-full border-2 border-ink flex items-center justify-center mx-auto mb-6 text-2xl">
        ✓
      </div>
      <h1 className="font-display text-3xl mb-2">Thank you!</h1>
      <p className="text-stone mb-1">Your order has been placed successfully.</p>
      <p className="text-sm text-stone mb-8">Order #{receipt.orderId}</p>
      </div>
      <div className="border border-line rounded-sm p-6 text-left mb-6">
        <div className="flex justify-between border-b border-line pb-4 mb-4">
          <div><p className="font-medium">Drivecode receipt</p><p className="text-xs text-stone">{receipt.date}</p></div>
          <p className="text-sm">{receipt.method}</p>
        </div>
        <div className="space-y-3 text-sm">
          {receipt.items.map((item, index) => <div key={`${item.name}-${index}`} className="flex justify-between gap-4"><span>{item.name} <span className="text-stone">x{item.qty}</span></span><span>${(item.price * item.qty).toFixed(2)}</span></div>)}
        </div>
        <div className="border-t border-line mt-5 pt-4 space-y-2 text-sm text-stone">
          <div className="flex justify-between"><span>Subtotal</span><span>${receipt.subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Shipping</span><span>${receipt.shipping.toFixed(2)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>${receipt.tax.toFixed(2)}</span></div>
          <div className="flex justify-between text-ink font-medium text-base pt-2"><span>Total paid</span><span>${receipt.total.toFixed(2)}</span></div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <button onClick={() => window.print()} className="btn-primary flex-1">Print receipt</button>
        <button onClick={downloadReceipt} className="btn-outline flex-1">Download receipt</button>
      </div>
      <div className="flex flex-col gap-3">
        <Link to="/account" className="btn-outline">View order</Link>
        <Link to="/" className="text-sm text-olive-dark hover:underline">Continue shopping</Link>
      </div>
    </div>
  )
}