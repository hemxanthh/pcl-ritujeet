import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { fetchProducts } from '../lib/supabaseProducts';
import { supabase } from '../lib/supabase';
import { Product } from '../types/Product';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, Shield } from 'lucide-react';

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

      {/* Marquee Promo Strip */}
      <section className="marquee bg-neutral-900 text-white text-xs sm:text-sm py-3 border-y border-black/20">
        <div className="marquee-track">
          <span className="mx-6">NEW DROPS EVERY WEEK</span>
          <span className="mx-6">VINTAGE • MEN • WOMEN • ETHNIC • ACCESSORIES</span>
          <span className="mx-6">FREE SHIPPING OVER ₹999</span>
          <span className="mx-6">INDIA-WIDE DELIVERY</span>
        </div>
        <div className="marquee-track" aria-hidden="true">
          <span className="mx-6">NEW DROPS EVERY WEEK</span>
          <span className="mx-6">VINTAGE • MEN • WOMEN • ETHNIC • ACCESSORIES</span>
          <span className="mx-6">FREE SHIPPING OVER ₹999</span>
          <span className="mx-6">INDIA-WIDE DELIVERY</span>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid products={featured} title={loading ? 'Loading Featured...' : 'Featured Items'} />

      {/* View All CTA */}
      <div className="-mt-8 mb-10 text-center">
        <Link to="/products" className="inline-block px-6 py-3 bg-neutral-900 text-white text-sm rounded shadow-[3px_3px_0_0_#000] border border-black/20 hover:translate-y-[1px] hover:translate-x-[1px] transition-transform">
          VIEW ALL PRODUCTS
        </Link>
      </div>

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

          {/* Trust Bar */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 bg-neutral-800 rounded px-4 py-3">
              <Truck className="h-5 w-5 text-white" />
              <span className="text-sm text-neutral-200">Free shipping over $75</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-neutral-800 rounded px-4 py-3">
              <RotateCcw className="h-5 w-5 text-white" />
              <span className="text-sm text-neutral-200">30-day easy returns</span>
            </div>
            <div className="flex items-center justify-center gap-3 bg-neutral-800 rounded px-4 py-3">
              <Shield className="h-5 w-5 text-white" />
              <span className="text-sm text-neutral-200">Secure checkout</span>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;