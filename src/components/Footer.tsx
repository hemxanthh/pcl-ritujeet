import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">VINTAGE</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Curated vintage and thrift fashion for the conscious style enthusiast. 
              Every piece tells a story.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium mb-4 text-sm tracking-wide">SHOP</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-neutral-400 hover:text-white transition-colors">All Items</Link></li>
              <li><Link to="/products?category=clothing" className="text-neutral-400 hover:text-white transition-colors">Clothing</Link></li>
              <li><Link to="/products?category=accessories" className="text-neutral-400 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/products?category=shoes" className="text-neutral-400 hover:text-white transition-colors">Shoes</Link></li>
              <li><Link to="/products?category=bags" className="text-neutral-400 hover:text-white transition-colors">Bags</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium mb-4 text-sm tracking-wide">HELP</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="text-neutral-400 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Shipping</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-4 text-sm tracking-wide">NEWSLETTER</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Subscribe for new arrivals and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-l text-sm focus:outline-none focus:border-white"
              />
              <button className="px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-r hover:bg-neutral-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 Vintage. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;