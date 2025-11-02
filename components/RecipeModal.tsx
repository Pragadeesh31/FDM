
import React from 'react';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: string | null;
  productName: string;
  isLoading: boolean;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose, recipe, productName, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Recipe for {productName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
            </div>
          ) : (
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: recipe ? recipe.replace(/\n/g, '<br />') : '' }} />
          )}
        </div>
        <div className="p-4 border-t bg-gray-50 text-right">
            <button onClick={onClose} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
