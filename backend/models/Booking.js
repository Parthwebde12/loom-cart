import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: 'Confirmed', enum: ['Confirmed', 'Cancelled'] },
  },
  { timestamps: true }
)

export default mongoose.model('Booking', bookingSchema)
