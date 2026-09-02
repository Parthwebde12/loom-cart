import { useState, useMemo } from 'react'
import { CartContext } from './CartContextProvider.jsx'

const initialItems = []

export function CartProvider({ children }) {
  const [items, setItems] = useState(initialItems)

  function addItem(product) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id && i.size === product.size && i.color === product.color
      )
      if (existing) {
        return prev.map((i) =>
          i === existing ? { ...i, qty: i.qty + product.qty } : i
        )
      }
      return [...prev, product]
    })
  }

  function updateQty(index, qty) {
    setItems((prev) =>
      prev.map((i, idx) => (idx === index ? { ...i, qty: Math.max(1, qty) } : i))
    )
  }

  function removeItem(index) {
    setItems((prev) => prev.filter((_, idx) => idx !== index))
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