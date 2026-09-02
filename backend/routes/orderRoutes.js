import express from 'express'
import { createOrder, getOrders, getOrderById, updateOrder } from '../controllers/orderController.js'
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post('/', createOrder)
router.get('/', getOrders)
router.get('/:id', getOrderById)
router.put('/:id', updateOrder)

export default router
