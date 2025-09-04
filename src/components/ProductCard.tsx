import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types/Product';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  return (
    <div className="group cursor-pointer">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-neutral-100 rounded-lg aspect-square mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors"
              >
                <ShoppingBag className="h-5 w-5 text-neutral-900" />
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg hover:bg-neutral-100 transition-colors">
                <Heart className="h-5 w-5 text-neutral-900" />
              </button>
            </div>
          </div>

          {/* Badge */}
          {product.isVintage && (
            <div className="absolute top-3 left-3 bg-neutral-900 text-white text-xs font-medium px-2 py-1 rounded">
              VINTAGE
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-1">
        <h3 className="text-sm font-medium text-neutral-900 truncate group-hover:text-neutral-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-neutral-500 uppercase tracking-wide">
          {product.category}
        </p>
        <p className="text-lg font-medium text-neutral-900">
          ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;