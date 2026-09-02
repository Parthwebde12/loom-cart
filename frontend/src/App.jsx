import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ChatWidget from './components/chatwidget.jsx'

import Home from './pages/Home.jsx'
import Category from './pages/category.jsx'
import Product from './pages/product.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Payment from './pages/payment.jsx'
import Confirmation from './pages/confirmation.jsx'
import Search from './pages/search.jsx'
import Booking from './pages/booking.jsx'
import Contact from './pages/Contact.jsx'
import Account from './pages/account.jsx'
import Login from './pages/login.jsx'

export default function App() {
  const location = useLocation()
  const bare = location.pathname === '/login'

  if (bare) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order-placed" element={<Confirmation />} />
          <Route path="/search" element={<Search />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}