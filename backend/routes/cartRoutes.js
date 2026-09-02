import express from 'express'
import { getCart, saveCart } from '../controllers/cartController.js'

const router = express.Router()

router.get('/:cartId', getCart)
router.put('/:cartId', saveCart)

export default router