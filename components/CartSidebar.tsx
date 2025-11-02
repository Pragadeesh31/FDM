
import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

const CartSidebar: React.FC = () => {
    const { isCartOpen, toggleCart, cartItems, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        toggleCart(); // Close the cart sidebar
        navigate('/checkout');
    };

    return (
        <>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={toggleCart}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-5 border-b">
                        <h2 className="text-2xl font-bold font-montserrat text-gray-800">Shopping Cart</h2>
                        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-5">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">
                                <p>Your cart is empty.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                                        <div className="flex-grow">
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                            <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 border rounded-l">-</button>
                                                <span className="w-8 text-center border-t border-b">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 border rounded-r">+</button>
                                            </div>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {cartItems.length > 0 && (
                        <div className="p-5 border-t">
                             <div className="flex justify-between font-bold text-lg mb-4">
                                <span>Subtotal:</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">Check Out</button>
                            <button onClick={toggleCart} className="w-full mt-2 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">Close</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartSidebar;
