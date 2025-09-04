import { Product } from '../types/Product';

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Leather Jacket',
    price: 89,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Classic vintage leather jacket from the 1980s. Genuine leather with original hardware. Perfect for adding an edge to any outfit.',
    isVintage: true
  },
  {
    id: '2',
    name: 'Vintage Silk Scarf',
    price: 25,
    image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'accessories',
    description: 'Beautiful vintage silk scarf with geometric pattern. Hand-rolled edges and vibrant colors that remain vivid.',
    isVintage: true
  },
  {
    id: '3',
    name: 'Retro Denim Jacket',
    price: 45,
    image: 'https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Authentic 90s denim jacket with perfect fade and wear. Oversized fit that\'s perfect for layering.',
    isVintage: true
  },
  {
    id: '4',
    name: 'Vintage Handbag',
    price: 65,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'bags',
    description: 'Elegant vintage leather handbag with gold hardware. Spacious interior with multiple compartments.',
    isVintage: true
  },
  {
    id: '5',
    name: 'Bohemian Maxi Dress',
    price: 55,
    image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Flowing vintage maxi dress with intricate print. Perfect for festivals or summer events.',
    isVintage: true
  },
  {
    id: '6',
    name: 'Classic Trench Coat',
    price: 120,
    image: 'https://images.pexels.com/photos/1631181/pexels-photo-1631181.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Timeless vintage trench coat in excellent condition. Water-resistant with original belt.',
    isVintage: true
  },
  {
    id: '7',
    name: 'Vintage Sunglasses',
    price: 35,
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'accessories',
    description: 'Round vintage sunglasses with UV protection. Classic style that never goes out of fashion.',
    isVintage: true
  },
  {
    id: '8',
    name: 'Retro Sneakers',
    price: 75,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'shoes',
    description: 'Rare vintage sneakers from the 80s. Excellent condition with minimal wear on soles.',
    isVintage: true
  },
  {
    id: '9',
    name: 'Vintage Band Tee',
    price: 40,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'Authentic vintage band t-shirt with original graphics. Soft cotton with perfect vintage fade.',
    isVintage: true
  },
  {
    id: '10',
    name: 'Vintage Pearl Necklace',
    price: 95,
    image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'accessories',
    description: 'Elegant vintage pearl necklace with silver clasp. Lustrous pearls in graduated sizes.',
    isVintage: true
  },
  {
    id: '11',
    name: 'Retro High-Waist Jeans',
    price: 50,
    image: 'https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'clothing',
    description: 'High-waisted vintage jeans with straight leg cut. Classic blue denim with authentic vintage wash.',
    isVintage: true
  },
  {
    id: '12',
    name: 'Vintage Evening Clutch',
    price: 45,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    category: 'bags',
    description: 'Glamorous vintage evening clutch with beaded detail. Perfect for special occasions.',
    isVintage: true
  }
];

export const featuredProducts = allProducts.slice(0, 8);