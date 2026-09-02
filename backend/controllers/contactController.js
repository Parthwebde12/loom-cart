export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    
    // In a real app, save to database or send email
    console.log('Contact form:', { name, email, message })
    
    res.json({ message: 'Thank you for contacting us!' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
