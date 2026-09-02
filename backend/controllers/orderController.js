import Order from '../models/Order.js'

export const createOrder = async (req, res) => {
  try {
    const order = new Order({
      userId: req.user?.id,
      ...req.body,
    })
    await order.save()
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user?.id })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
