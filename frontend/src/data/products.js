export const products = [
  {
    id: 1,
    name: "Premium Cotton Shirt",
    price: 29.99,
    category: "men",
    image: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 120,
    description: "High-quality cotton shirt perfect for casual wear",
    specs: { material: "100% Cotton", size: "XS-XXL", colors: ["Blue", "White", "Black"] }
  },
  {
    id: 2,
    name: "Classic Blue Jeans",
    price: 49.99,
    category: "men",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 4,
    reviews: 95,
    description: "Comfortable denim jeans for everyday wear",
    specs: { material: "100% Denim", size: "28-40", colors: ["Light Blue", "Dark Blue", "Black"] }
  },
  {
    id: 3,
    name: "Leather Watch",
    price: 89.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 200,
    description: "Elegant leather strap watch with classic design",
    specs: { material: "Leather & Stainless Steel", waterproof: "Yes", color: ["Brown", "Black"] }
  },
  {
    id: 4,
    name: "Sports Running Shoes",
    price: 59.99,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 4,
    reviews: 150,
    description: "Comfortable sports shoes for running and training",
    specs: { material: "Mesh & Rubber", size: "5-13", colors: ["Red", "Blue", "Black"] }
  },
  {
    id: 5,
    name: "Canvas Messenger Bag",
    price: 39.99,
    category: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 80,
    description: "Durable canvas bag perfect for work and travel",
    specs: { material: "Canvas", capacity: "15L", colors: ["Khaki", "Navy", "Black"] }
  },
  {
    id: 6,
    name: "UV Protection Sunglasses",
    price: 79.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 110,
    description: "Stylish sunglasses with 100% UV protection",
    specs: { material: "Plastic Frame", lens: "Polarized", colors: ["Black", "Brown"] }
  },
  {
    id: 7,
    name: "Baseball Cap",
    price: 19.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 4,
    reviews: 65,
    description: "Classic baseball cap for outdoor activities",
    specs: { material: "Cotton", size: "One Size", colors: ["Black", "Navy", "White"] }
  },
  {
    id: 8,
    name: "Winter Wool Jacket",
    price: 129.99,
    category: "men",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 140,
    description: "Warm and stylish wool jacket for cold weather",
    specs: { material: "Wool Blend", size: "XS-XXL", colors: ["Black", "Grey", "Navy"] }
  },
  {
    id: 9,
    name: "Summer Floral Dress",
    price: 49.99,
    category: "women",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 4,
    reviews: 75,
    description: "Light and colorful dress perfect for summer",
    specs: { material: "Cotton Blend", size: "XS-L", colors: ["Floral", "Blue", "Pink"] }
  },
  {
    id: 10,
    name: "Women's Leather Heels",
    price: 69.99,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 120,
    description: "Elegant leather heels for formal occasions",
    specs: { material: "Leather", heel: "3 inch", colors: ["Black", "Red", "Nude"] }
  },
  {
    id: 11,
    name: "Casual Sneakers",
    price: 54.99,
    category: "footwear",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 4,
    reviews: 88,
    description: "Comfortable everyday sneakers",
    specs: { material: "Canvas & Rubber", size: "5-13", colors: ["White", "Grey", "Black"] }
  },
  {
    id: 12,
    name: "Formal Business Tie",
    price: 24.99,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1589756823695-278bc923f962?auto=format&fm=webp&fit=crop&w=700&q=85",
    rating: 5,
    reviews: 45,
    description: "Silk tie perfect for business meetings",
    specs: { material: "100% Silk", pattern: "Solid", colors: ["Navy", "Black", "Burgundy"] }
  }
]

export function findProduct(id) {
  return products.find(p => p.id === parseInt(id))
}

export function getProductsByCategory(category) {
  return products.filter(p => p.category === category.toLowerCase())
}

export function searchProducts(query) {
  return products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  )
}
