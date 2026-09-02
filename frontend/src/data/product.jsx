export const products = [
  { id: 'p1', name: 'Casual Cotton Shirt', price: 29.99, rating: 4, reviews: 100, category: 'Men', colors: ['#8C8A7E', '#1F2420', '#6B7A4F'], image: 'shirt' },
  { id: 'p2', name: 'Everyday Oxford Shirt', price: 34.5, rating: 5, reviews: 82, category: 'Men', colors: ['#1F2420', '#EFEBE2'], image: 'shirt' },
  { id: 'p3', name: 'Relaxed Linen Shirt', price: 42, rating: 4, reviews: 61, category: 'Men', colors: ['#B5533C', '#8C8A7E'], image: 'shirt' },
  { id: 'p4', name: 'Running Shoes', price: 59.99, rating: 4, reviews: 143, category: 'Footwear', colors: ['#1F2420', '#8C8A7E'], image: 'shoe' },
  { id: 'p5', name: 'Trail Runner Sneaker', price: 74, rating: 5, reviews: 97, category: 'Footwear', colors: ['#6B7A4F'], image: 'shoe' },
  { id: 'p6', name: 'Canvas Weekend Tote', price: 38, rating: 4, reviews: 55, category: 'Bags', colors: ['#8C8A7E', '#1F2420'], image: 'bag' },
  { id: 'p7', name: 'Field Jacket', price: 89, rating: 5, reviews: 120, category: 'Men', colors: ['#54613C'], image: 'jacket' },
  { id: 'p8', name: 'Wool Blend Trousers', price: 54, rating: 4, reviews: 70, category: 'Men', colors: ['#1F2420'], image: 'pants' },
  { id: 'p9', name: 'Cotton Poplin Dress', price: 48, rating: 4, reviews: 88, category: 'Women', colors: ['#B5533C', '#EFEBE2'], image: 'dress' },
]

export function findProduct(id) {
  return products.find((p) => p.id === id) || products[0]
}