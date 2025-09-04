import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import { featuredProducts } from '../data/products';

const Home = () => {
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              }
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg aspect-square mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <h3 className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid products={featuredProducts} title="Featured Items" />

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