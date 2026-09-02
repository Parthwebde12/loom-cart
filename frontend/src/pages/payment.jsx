import { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart.js'

const methods = [
  { id: 'card', label: 'Credit / Debit card', detail: ['VISA', 'Mastercard', 'AMEX', 'RuPay'] },
  { id: 'upi', label: 'UPI' },
  { id: 'netbanking', label: 'Net banking' },
  { id: 'wallets', label: 'Wallets' },
]

export default function Payment() {
  const [method, setMethod] = useState('card')
  const [details, setDetails] = useState({ cardNumber: '', expiry: '', cvv: '', upiId: '', bank: '', wallet: '' })
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const { items, subtotal, shipping, tax, total } = useCart()
  const navigate = useNavigate()

  function updateDetail(event) {
    setDetails((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function handlePayment(event) {
    event.preventDefault()
    setIsProcessing(true)
    setError('')

    window.setTimeout(async () => {
      const orderId = `DC-${Math.floor(100000 + Math.random() * 900000)}`
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://loom-cart-2.onrender.com'}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map(({ id, name, price, qty }) => ({ productId: id, name, price, quantity: qty })),
            total,
            shippingAddress: 'Provided at checkout',
          }),
        })
        if (!response.ok) throw new Error('Could not save order')
        navigate('/order-placed', {
          state: {
            receipt: {
              orderId,
              date: new Date().toLocaleDateString(),
              method: methods.find((item) => item.id === method).label,
              items,
              subtotal,
              shipping,
              tax,
              total,
            },
          },
        })
      } catch (paymentError) {
        setError(paymentError.message)
        setIsProcessing(false)
      }
    }, 900)
  }

  function renderPaymentFields() {
    if (method === 'card') {
      return (
        <div className="grid gap-4 sm:grid-cols-2 mt-5">
          <label className="sm:col-span-2 text-sm">Card number<input name="cardNumber" value={details.cardNumber} onChange={updateDetail} required inputMode="numeric" maxLength="19" placeholder="1234 5678 9012 3456" className="input-field mt-1" /></label>
          <label className="text-sm">Expiry date<input name="expiry" value={details.expiry} onChange={updateDetail} required placeholder="MM / YY" className="input-field mt-1" /></label>
          <label className="text-sm">CVV<input name="cvv" value={details.cvv} onChange={updateDetail} required inputMode="numeric" maxLength="4" placeholder="123" className="input-field mt-1" /></label>
        </div>
      )
    }

    if (method === 'upi') {
      return <label className="block text-sm mt-5">UPI ID<input name="upiId" value={details.upiId} onChange={updateDetail} required placeholder="name@bank" className="input-field mt-1" /></label>
    }

    if (method === 'netbanking') {
      return <label className="block text-sm mt-5">Select bank<select name="bank" value={details.bank} onChange={updateDetail} required className="input-field mt-1"><option value="">Choose your bank</option><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option></select></label>
    }

    return <label className="block text-sm mt-5">Wallet<select name="wallet" value={details.wallet} onChange={updateDetail} required className="input-field mt-1"><option value="">Choose wallet</option><option>Paytm</option><option>PhonePe</option><option>Amazon Pay</option></select></label>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-center gap-4 mb-10 text-sm">
        {['Shipping', 'Payment', 'Review'].map((step, i) => (
          <Fragment key={step}>
            <div className={`flex items-center gap-2 ${i <= 1 ? 'text-ink' : 'text-stone'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${i <= 1 ? 'bg-ink text-paper' : 'border border-line'}`}>{i + 1}</span>
              {step}
            </div>
            {i < 2 && <span className="w-8 h-px bg-line" />}
          </Fragment>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="font-display text-2xl mb-6">Select payment method</h1>
        <div className="space-y-3">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`w-full text-left border rounded-sm p-4 flex items-center justify-between ${method === m.id ? 'border-olive bg-olive-light/40' : 'border-line hover:border-ink'}`}
            >
              <span className="flex items-center gap-3 text-sm">
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === m.id ? 'border-ink' : 'border-line'}`}>
                  {method === m.id && <span className="w-2 h-2 rounded-full bg-ink" />}
                </span>
                {m.label}
              </span>
              {m.detail && (
                <span className="flex gap-1 text-[10px] text-stone">
                  {m.detail.map((d) => <span key={d} className="border border-line px-1.5 py-0.5 rounded-sm">{d}</span>)}
                </span>
              )}
            </button>
          ))}
        </div>

        <form onSubmit={handlePayment}>
          {renderPaymentFields()}
          {error && <p className="text-sm text-clay mt-4" role="alert">{error}</p>}
          <p className="text-xs text-stone mt-5">Demo gateway: no real payment will be charged.</p>
          <button disabled={isProcessing} className="btn-primary w-full mt-5 disabled:opacity-60">
            {isProcessing ? 'Processing payment...' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>
    </div>
  )
}