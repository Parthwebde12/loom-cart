import Booking from '../models/Booking.js'

export const createBooking = async (req, res) => {
  try {
    const { date, time } = req.body
    if (!date || !time) {
      return res.status(400).json({ error: 'Date and time are required' })
    }

    const booking = await Booking.create({
      userId: req.user?.id,
      date,
      time,
    })

    res.status(201).json(booking)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

