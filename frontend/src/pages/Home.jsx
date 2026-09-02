
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart.js'
import Stars from '../components/Stars.jsx'
import { products } from '../data/products.js'

const topCategories = ['Men', 'Women', 'Footwear', 'Bags', 'Watches']
const testimonials = [
  { name: 'Ravi Kulkarni', rating: 5, text: 'The cotton shirt held its shape after a dozen washes — first brand that has for me.' },
  { name: 'Ananya Deshmukh', rating: 4, text: 'Runner shoes are the first pair that actually fit my narrow heel. Ordering a second pair.' },
  { name: 'Sam Whitfield', rating: 5, text: 'Ordered Tuesday, wore it by the weekend. Fit guide was spot on.' },
]

export default function Home() {
  const bestSellers = products.slice(0, 5)
  const { addItem } = useCart()

  function addToCart(product) {
    addItem({ id: product.id, name: product.name, price: product.price, size: 'M', color: product.specs?.colors?.[0] || 'Black', qty: 1, image: product.image })
  }

  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-10 pb-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-olive-dark text-sm mb-3">Summer collection</p>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.05] mb-5">
            New season,<br />worn in.
          </h1>
          <p className="text-stone max-w-[38ch] mb-7">
            Everyday clothing cut for movement and built from fabric that gets better with age, not worse.
          </p>
          <Link to="/category/Men" className="btn-primary inline-block">Shop new arrivals</Link>
        </div>
        <div className="relative h-80 md:h-[420px] overflow-hidden bg-paper">
          <img src={products[8].image} alt="Summer floral dress" className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/65 to-transparent text-white pt-16">
            <p className="text-xs uppercase tracking-[0.16em]">New arrivals</p>
            <p className="font-display text-2xl">Summer, in full colour.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-x-10 gap-y-2 text-sm text-stone">
          <span>Free shipping</span>
          <span className="text-line">|</span>
          <span>Easy returns</span>
          <span className="text-line">|</span>
          <span>Secure payment</span>
          <span className="text-line">|</span>
          <span>24/7 support</span>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-display text-2xl mb-6">Top categories</h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
          {topCategories.map((c, index) => (
            <Link key={c} to={`/category/${c}`} className="text-center group">
              <div className="aspect-square rounded-full mb-2 overflow-hidden border border-line group-hover:border-olive transition-colors">
                <img src={products[index].image} alt={c} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <span className="text-sm">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-display text-2xl">Best selling products</h2>
          <Link to="/category/Men" className="text-sm text-olive-dark hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {bestSellers.map((p) => (
            <div key={p.id} className="group">
              <Link to={`/product/${p.id}`}>
              <div className="aspect-[4/5] mb-3 overflow-hidden bg-paper border border-line">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="text-sm leading-snug">{p.name}</div>
              <div className="text-sm font-medium mt-1">${p.price.toFixed(2)}</div>
              <Stars rating={p.rating} reviews={p.reviews} />
              </Link>
              <button onClick={() => addToCart(p)} className="btn-primary w-full mt-3 !py-2 text-xs">Add to cart</button>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-line">
        <h2 className="font-display text-2xl mb-8">What our customers say</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t) => (
            <div key={t.name}>
              <div className="font-display text-3xl text-line mb-1">"</div>
              <p className="text-sm text-ink/90 mb-3">{t.text}</p>
              <Stars rating={t.rating} />
              <div className="text-sm text-stone mt-1">{t.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}