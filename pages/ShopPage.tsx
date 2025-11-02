
import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import PageBanner from '../components/PageBanner';
import RecipeModal from '../components/RecipeModal';
import { generateRecipe } from '../services/geminiService';
import { Product } from '../types';

type Category = 'all' | 'vegetable' | 'fruit' | 'dairy';
type SortOption = 'default' | 'price-asc' | 'price-desc';

const ShopPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<Category>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const handleGetRecipe = async (productName: string) => {
    setCurrentProduct(productName);
    setIsModalOpen(true);
    setIsLoading(true);
    const recipe = await generateRecipe(productName);
    setCurrentRecipe(recipe);
    setIsLoading(false);
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setCurrentRecipe(null);
      setCurrentProduct('');
  }
  
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    if (filterCategory !== 'all') {
      filtered = products.filter(p => p.category === filterCategory);
    }

    let sorted = [...filtered];
    if (sortOption === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  }, [filterCategory, sortOption]);

  const categoryButtonClasses = "px-4 py-2 rounded-full text-sm font-medium transition-colors";
  const activeCategoryButtonClasses = "bg-green-600 text-white";
  const inactiveCategoryButtonClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

  return (
    <>
      <PageBanner title="Products" breadcrumb="Products" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-2 flex-wrap justify-center">
                <button onClick={() => setFilterCategory('all')} className={`${categoryButtonClasses} ${filterCategory === 'all' ? activeCategoryButtonClasses : inactiveCategoryButtonClasses}`}>All</button>
                <button onClick={() => setFilterCategory('vegetable')} className={`${categoryButtonClasses} ${filterCategory === 'vegetable' ? activeCategoryButtonClasses : inactiveCategoryButtonClasses}`}>Vegetables</button>
                <button onClick={() => setFilterCategory('fruit')} className={`${categoryButtonClasses} ${filterCategory === 'fruit' ? activeCategoryButtonClasses : inactiveCategoryButtonClasses}`}>Fruits</button>
                <button onClick={() => setFilterCategory('dairy')} className={`${categoryButtonClasses} ${filterCategory === 'dairy' ? activeCategoryButtonClasses : inactiveCategoryButtonClasses}`}>Dairy</button>
            </div>
            <div>
                 <select 
                    value={sortOption} 
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="border border-gray-300 rounded-md p-2 focus:ring-green-500 focus:border-green-500"
                >
                    <option value="default">Sort by</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} onGetRecipe={handleGetRecipe} />
          ))}
        </div>
      </div>
      <RecipeModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        recipe={currentRecipe}
        productName={currentProduct}
        isLoading={isLoading}
      />
    </>
  );
};

export default ShopPage;