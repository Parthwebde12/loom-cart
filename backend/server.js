import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { connectDB } from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import contactRoutes from './routes/contactRoutes.js'

dotenv.config({ path: '.env.local' })
connectDB()

const app = express()
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/contact', contactRoutes)

app.get('/api/health', (req, res) => res.send('VYRA API running'))

const frontendDistPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../frontend/dist')
const frontendEntryPath = path.join(frontendDistPath, 'index.html')

app.use(express.static(frontendDistPath))
app.get('*', (req, res, next) => {
  if (!existsSync(frontendEntryPath)) return next()
  res.sendFile(frontendEntryPath)
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});