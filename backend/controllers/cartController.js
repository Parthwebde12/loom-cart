import Cart from '../models/Cart.js'

export const saveCart = async (req, res) => {
  try {
    const { items } = req.body
    if (!Array.isArray(items)) {
      return res.status(400).json({ error: 'Items must be an array' })
    }

    const cart = await Cart.findOneAndUpdate(
      { cartId: req.params.cartId },
      { cartId: req.params.cartId, userId: req.user?.id, items },
      { new: true, upsert: true, runValidators: true }
    )

    res.json(cart)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ cartId: req.params.cartId })
    res.json(cart || { items: [] })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
