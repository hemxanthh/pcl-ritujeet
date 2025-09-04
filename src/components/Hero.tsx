import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight mb-6 leading-tight">
          Vintage Style
          <br />
          <span className="font-normal">Collection '24</span>
        </h1>
        <p className="text-lg sm:text-xl font-light mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover unique, pre-loved fashion pieces that tell a story. Sustainable style that doesn't compromise on quality or aesthetics.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center px-8 py-4 bg-white text-neutral-900 font-medium text-sm tracking-wide hover:bg-neutral-100 transition-all duration-300 group"
        >
          SHOP NOW
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;