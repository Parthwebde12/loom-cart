import { useState, useMemo, useEffect } from 'react'
import { CartContext } from './CartContextProvider.jsx'

const initialItems = []
const apiUrl = import.meta.env.VITE_API_URL || 'https://loom-cart-2.onrender.com'

function getCartId() {
  const existingId = window.localStorage.getItem('vyra-cart-id')
  if (existingId) return existingId
  const newId = crypto.randomUUID()
  window.localStorage.setItem('vyra-cart-id', newId)
  return newId
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialItems)
  const [cartId] = useState(getCartId)

  useEffect(() => {
    fetch(`${apiUrl}/api/carts/${cartId}`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Could not load cart')))
      .then((cart) => setItems(cart.items || []))
      .catch((error) => console.error('Could not load cart:', error))
  }, [cartId])

  function persistCart(nextItems) {
    fetch(`${apiUrl}/api/carts/${cartId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: nextItems }),
    }).catch((error) => console.error('Could not save cart:', error))
  }

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === product.size && i.color === product.color
      )
      const nextItems = existing
        ? prev.map((i) => i === existing ? { ...i, qty: i.qty + product.qty } : i)
        : [...prev, product]
      persistCart(nextItems)
      return nextItems
    })
  }

  function updateQty(index, qty) {
    setItems((prev) => {
      const nextItems = prev.map((i, idx) => (idx === index ? { ...i, qty: Math.max(1, qty) } : i))
      persistCart(nextItems)
      return nextItems
    })
  }

  function removeItem(index) {
    setItems((prev) => {
      const nextItems = prev.filter((_, idx) => idx !== index)
      persistCart(nextItems)
      return nextItems
    })
  }

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  )
  const shipping = subtotal > 0 && subtotal < 75 ? 5.4 : 0
  const tax = +(subtotal * 0.06).toFixed(2)
  const total = +(subtotal + shipping + tax).toFixed(2)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  const value = {
    items,
    addItem,
    updateQty,
    removeItem,
    subtotal,
    shipping,
    tax,
    total,
    count,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}