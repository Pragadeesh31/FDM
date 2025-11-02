
import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccessPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-20 px-4">
            <div className="bg-green-100 p-6 rounded-full mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h1>
            <p className="text-lg text-gray-600 mb-8">Your order has been placed successfully. We'll process it shortly.</p>
            <Link to="/shop" className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
                Continue Shopping
            </Link>
        </div>
    );
};

export default OrderSuccessPage;
