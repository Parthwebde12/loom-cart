import { useState } from 'react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const juneDates = [
  [null, null, null, null, null, null, 1],
  [2, 3, 4, 5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20, 21, 22],
  [23, 24, 25, 26, 27, 28, 29],
  [30, null, null, null, null, null, null],
]
const slots = ['10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '4:00 PM', '5:00 PM']

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(12)
  const [selectedSlot, setSelectedSlot] = useState('1:00 PM')
  const [confirmed, setConfirmed] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  async function confirmBooking() {
    setIsSaving(true)
    setError('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://loom-cart-2.onrender.com'}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: `June ${selectedDate}, 2026`, time: selectedSlot }),
      })
      if (!response.ok) throw new Error('Could not save booking')
      setConfirmed(true)
    } catch (bookingError) {
      setError(bookingError.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (confirmed) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 rounded-full border-2 border-ink flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
        <h1 className="font-display text-3xl mb-2">Fitting booked</h1>
        <p className="text-stone">June {selectedDate}, {selectedSlot} — we'll email a reminder the day before.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="font-display text-2xl mb-1">Book a fitting</h1>
      <p className="text-stone text-sm mb-6">30 minutes with our in-store stylist — free with any purchase.</p>

      <div className="border border-line p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="text-stone hover:text-ink">‹</button>
          <span className="font-medium text-sm">June 2026</span>
          <button className="text-stone hover:text-ink">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-stone mb-2">
          {days.map((d) => <div key={d}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {juneDates.flat().map((d, i) => (
            <button
              key={i}
              disabled={!d}
              onClick={() => d && setSelectedDate(d)}
              className={`h-8 rounded-sm ${!d ? '' : d === selectedDate ? 'bg-ink text-paper' : 'hover:bg-paper'}`}
            >
              {d || ''}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm font-medium mt-6 mb-2">Available time slots</p>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSlot(s)}
            className={`border rounded-sm py-2 text-xs ${selectedSlot === s ? 'border-ink bg-ink text-paper' : 'border-line hover:border-ink'}`}
          >
            {s}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-clay mt-4" role="alert">{error}</p>}
      <button onClick={confirmBooking} disabled={isSaving} className="btn-primary w-full mt-8 disabled:opacity-60">
        {isSaving ? 'Saving booking...' : 'Confirm booking'}
      </button>
    </div>
  )
}