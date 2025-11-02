
import React from 'react';
import { Product } from '../types';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  product: Product;
  onGetRecipe: (productName: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onGetRecipe }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 group">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      <div className="p-4 flex flex-col h-52">
        <h3 className="text-lg font-bold text-gray-800 truncate">{product.name}</h3>
        <p className="text-lg font-montserrat font-bold text-green-600 mt-1">
          ₹{product.price.toFixed(2)}
          <span className="text-sm font-normal text-gray-500"> / {product.unit}</span>
        </p>
        <div className="mt-auto pt-4 space-y-2">
            <button
                onClick={() => onGetRecipe(product.name)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
            >
                Get Recipe Idea
            </button>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Add to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;