import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import PageBanner from '../components/PageBanner';

const CheckoutPage: React.FC = () => {
    const { cartItems, clearCart } = useCart();
    const { currentUser, addOrder } = useAuth();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = (currentUser?.subscription === 'prime' || currentUser?.subscription === 'supreme') ? 0 : 40;
    const total = subtotal + deliveryFee;

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate payment processing
        console.log("Processing payment...");

        // Add order to history
        addOrder({ items: cartItems, total });

        setTimeout(() => {
            clearCart();
            navigate('/order-success');
        }, 1500);
    };

    if (cartItems.length === 0) {
        return (
            <>
                <PageBanner title="Checkout" breadcrumb="Checkout" />
                <div className="text-center py-20">
                    <p className="text-xl">Your cart is empty. Nothing to check out.</p>
                </div>
            </>
        )
    }

    return (
        <>
            <PageBanner title="Checkout" breadcrumb="Checkout" />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <form onSubmit={handlePlaceOrder} className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                        <div className="space-y-4">
                             <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg" defaultValue={currentUser ? `${currentUser.firstName} ${currentUser.lastName}`: ''} required />
                             <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg" defaultValue={currentUser?.email} required />
                             <input type="text" placeholder="Address" className="w-full p-3 border rounded-lg" defaultValue={currentUser?.address?.street} required />
                             <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="City" className="w-full p-3 border rounded-lg" defaultValue={currentUser?.address?.city} required />
                                <input type="text" placeholder="Postal Code" className="w-full p-3 border rounded-lg" defaultValue={currentUser?.address?.postalCode} required />
                             </div>
                        </div>
                        <h2 className="text-2xl font-bold mt-8 mb-6">Payment Details</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-lg" required />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg" required />
                                <input type="text" placeholder="CVC" className="w-full p-3 border rounded-lg" required />
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-8 rounded-lg">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t my-6"></div>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                {deliveryFee === 0 ? (
                                    <span className="text-green-600 font-bold">FREE</span>
                                ) : (
                                    <span>₹{deliveryFee.toFixed(2)}</span>
                                )}
                            </div>
                             <div className="flex justify-between font-bold text-xl border-t pt-2 mt-2">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                         <button type="submit" className="w-full mt-8 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors">
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CheckoutPage;