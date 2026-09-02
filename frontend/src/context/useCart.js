import { useContext } from 'react'
import { CartContext } from './CartContextProvider.jsx'

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
