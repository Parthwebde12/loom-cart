import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
  {
    cartId: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: { type: Array, default: [] },
  },
  { timestamps: true }
)

export default mongoose.model('Cart', cartSchema)
