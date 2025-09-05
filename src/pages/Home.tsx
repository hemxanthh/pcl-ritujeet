import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/supabaseProducts';
import { supabase } from '../lib/supabase';
import { Product } from '../types/Product';

const Home = () => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const all = await fetchProducts();
        // Pick latest 8 as featured
        if (mounted) setFeatured(all.slice(0, 8) as any);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();

    const channel = supabase
      .channel('home-products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, load)
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      <Hero />
      
      {/* Categories Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-900 tracking-tight mb-4">
              Shop by Category
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Explore our carefully curated collections of vintage and thrift fashion
            </p>
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 place-items-center">
            {[
              {
                name: 'Vintage Clothing',
                image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'clothing'
              },
              {
                name: 'Accessories',
                image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'accessories'
              },
              {
                name: 'Vintage Shoes',
                image: 'https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'shoes'
              },
              {
                name: 'Bags & Purses',
                image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'bags'
              },
              {
                name: 'Men Wears',
                image: 'https://images.pexels.com/photos/2985260/pexels-photo-2985260.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'men'
              },
              {
                name: 'Women',
                image: 'https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'women'
              },
              {
                name: 'Ethnic Wears',
                image: 'https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
                category: 'ethnic'
              }
            ].map((category) => (
              <Link key={category.name} to={`/products?category=${category.category}`} className="group cursor-pointer w-full flex flex-col items-center">
                <div className="relative overflow-hidden rounded-full w-24 h-24 sm:w-36 sm:h-36 mb-2 shadow-sm ring-1 ring-black/5">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
                </div>
                <h3 className="text-sm sm:text-base font-medium text-neutral-800 text-center">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid products={featured} title={loading ? 'Loading Featured...' : 'Featured Items'} />

      {/* Values Section */}
      <section className="py-16 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight mb-4">
              Our Values
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              More than just fashion - we're committed to sustainable style
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♻️</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Sustainable</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Giving pre-loved fashion a second life reduces waste and environmental impact
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Curated</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Every piece is hand-selected for quality, style, and timeless appeal
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Unique</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Find one-of-a-kind pieces that express your individual style
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;