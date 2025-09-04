import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="pt-16 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-light text-neutral-900 tracking-tight mb-4">
              Your cart is empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Discover our curated collection of vintage fashion
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-8">
          <Link
            to="/products"
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-light text-neutral-900 tracking-tight">
            Shopping Cart ({items.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex items-center space-x-4 bg-neutral-50 p-6 rounded-lg">
                <div className="flex-shrink-0 w-24 h-24 bg-neutral-200 rounded overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-neutral-900 truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-neutral-500 uppercase tracking-wide">
                    {item.category} • Size: {item.selectedSize}
                  </p>
                  <p className="text-lg font-medium text-neutral-900 mt-1">
                    ${item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize || '', Math.max(0, item.quantity - 1))}
                    className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.selectedSize || '', item.quantity + 1)}
                    className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center hover:bg-neutral-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id, item.selectedSize || '')}
                  className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-neutral-50 p-6 rounded-lg h-fit">
            <h3 className="text-lg font-medium text-neutral-900 mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium">${(total * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-neutral-200 pt-3 flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full mt-6 py-4 px-6 bg-neutral-900 text-white text-sm font-medium tracking-wide hover:bg-neutral-800 transition-colors">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;