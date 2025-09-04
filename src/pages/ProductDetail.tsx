import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Heart, ShoppingBag, Share2, Truck, RotateCcw, Shield } from 'lucide-react';
import { allProducts } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({ ...product, selectedSize }, quantity);
    }
  };

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="aspect-square overflow-hidden rounded bg-neutral-100 cursor-pointer hover:opacity-80 transition-opacity">
                  <img
                    src={product.image}
                    alt={`${product.name} view ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-500 uppercase tracking-wide">
                  {product.category}
                </p>
                <button className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
              <h1 className="text-3xl font-light text-neutral-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-medium text-neutral-900 mt-4">
                ${product.price}
              </p>
            </div>

            <div>
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">Size</h3>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border rounded transition-colors ${
                      selectedSize === size
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-neutral-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-4 px-6 text-sm font-medium tracking-wide transition-all duration-300 ${
                  selectedSize
                    ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                    : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag className="inline h-4 w-4 mr-2" />
                ADD TO CART
              </button>
              <button className="w-full py-4 px-6 border border-neutral-900 text-neutral-900 text-sm font-medium tracking-wide hover:bg-neutral-900 hover:text-white transition-colors">
                <Share2 className="inline h-4 w-4 mr-2" />
                SHARE
              </button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-6 border-t border-neutral-200">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-neutral-400" />
                <span className="text-sm text-neutral-600">Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-neutral-400" />
                <span className="text-sm text-neutral-600">30-day return policy</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-neutral-400" />
                <span className="text-sm text-neutral-600">Authenticity guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;