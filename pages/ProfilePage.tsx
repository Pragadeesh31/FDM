import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import PageBanner from '../components/PageBanner';
import { User } from '../types';

const ProfilePage: React.FC = () => {
  const { currentUser, logout, updateSubscription, updateProfile, orders } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        phone: currentUser.phone,
        address: { ...currentUser.address },
      });
    }
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };
  
  if (!currentUser) {
    return (
      <>
        <PageBanner title="Profile" breadcrumb="Profile" />
        <div className="text-center py-20">
          <p>You are not logged in.</p>
        </div>
      </>
    )
  }

  const getSubscriptionBadge = (tier: string) => {
    switch(tier) {
        case 'prime': return <span className="ml-2 text-xs font-bold inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-blue-500 text-white rounded-full">PRIME</span>;
        case 'supreme': return <span className="ml-2 text-xs font-bold inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-purple-600 text-white rounded-full">SUPREME</span>;
        default: return <span className="ml-2 text-xs font-bold inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-gray-400 text-white rounded-full">NONE</span>;
    }
  }

  return (
    <>
      <PageBanner title="Your Profile" breadcrumb="Profile" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{currentUser.firstName} {currentUser.lastName}</h1>
                <p className="text-gray-500">{currentUser.email}</p>
                <div className="mt-2">
                    <span className="font-medium text-gray-600">Subscription:</span>
                    <span className="text-gray-800 font-semibold uppercase">{currentUser.subscription}{getSubscriptionBadge(currentUser.subscription)}</span>
                </div>
              </div>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">Edit Profile</button>
              )}
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSave} className="mt-6 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Edit Your Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleFormChange} placeholder="First Name" className="p-2 border rounded-md" />
                  <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleFormChange} placeholder="Last Name" className="p-2 border rounded-md" />
                  <input type="email" name="email" value={formData.email || ''} onChange={handleFormChange} placeholder="Email" className="p-2 border rounded-md" />
                  <input type="tel" name="phone" value={formData.phone || ''} onChange={handleFormChange} placeholder="Phone Number" className="p-2 border rounded-md" />
                  <input type="text" name="street" value={formData.address?.street || ''} onChange={handleAddressChange} placeholder="Street Address" className="p-2 border rounded-md md:col-span-2" />
                  <input type="text" name="city" value={formData.address?.city || ''} onChange={handleAddressChange} placeholder="City" className="p-2 border rounded-md" />
                  <input type="text" name="postalCode" value={formData.address?.postalCode || ''} onChange={handleAddressChange} placeholder="Postal Code" className="p-2 border rounded-md" />
                </div>
                <div className="mt-6 flex gap-4">
                  <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Save Changes</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="mt-6 border-t pt-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Information</h2>
                <div className="space-y-2">
                    <p><strong className="font-medium text-gray-600">Phone:</strong> {currentUser.phone || 'Not provided'}</p>
                    <p><strong className="font-medium text-gray-600">Address:</strong> {currentUser.address.street || currentUser.address.city || currentUser.address.postalCode ? `${currentUser.address.street}, ${currentUser.address.city}, ${currentUser.address.postalCode}` : 'Not provided'}</p>
                </div>
              </div>
            )}
             <div className="mt-8 text-center border-t pt-6">
               <button onClick={handleLogout} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Logout</button>
             </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Your Orders</h2>
            {orders.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                    {orders.map(order => (
                        <div key={order.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between font-semibold">
                                <span>Order ID: {order.id}</span>
                                <span>Total: ₹{order.total.toFixed(2)}</span>
                            </div>
                             <div className="text-sm text-gray-500">
                                <span>Date: {order.date}</span> | <span className={`font-bold ${order.status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>Status: {order.status}</span>
                            </div>
                            <ul className="mt-2 text-sm text-gray-600">
                                {order.items.map(item => (
                                    <li key={item.id}>- {item.name} (x{item.quantity})</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">You have no orders yet.</p>
            )}
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
             <h2 className="text-2xl font-bold text-center mb-6">Upgrade Your Subscription</h2>
             <div className="grid md:grid-cols-2 gap-8">
                <div className={`p-6 rounded-lg shadow-lg border-2 ${currentUser.subscription === 'prime' ? 'border-blue-500' : 'border-gray-200'}`}>
                    <h3 className="text-2xl font-bold text-blue-500">Prime Customer</h3>
                    <p className="font-bold text-xl my-2">₹250 <span className="font-normal text-sm">/ year</span></p>
                    <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
                        <li>Free & Quick Delivery</li>
                        <li>Early Access to Sales</li>
                    </ul>
                    <div className="mt-6">
                        {currentUser.subscription === 'prime' ? <p className="font-bold text-blue-500 text-center">Currently Subscribed</p> : (
                             <button onClick={() => updateSubscription('prime')} className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600">
                                {currentUser.subscription === 'supreme' ? 'Downgrade to Prime' : 'Subscribe for ₹250'}
                            </button>
                        )}
                    </div>
                </div>
                <div className={`p-6 rounded-lg shadow-lg border-2 ${currentUser.subscription === 'supreme' ? 'border-purple-600' : 'border-gray-200'}`}>
                    <h3 className="text-2xl font-bold text-purple-600">Supreme Customer</h3>
                    <p className="font-bold text-xl my-2">₹600 <span className="font-normal text-sm">/ year</span></p>
                    <ul className="mt-4 space-y-2 text-gray-600 list-disc list-inside">
                        <li>All features of Prime</li>
                        <li className="font-bold">Daily Morning 1 Litre of Milk</li>
                    </ul>
                    <div className="mt-6">
                        {currentUser.subscription === 'supreme' ? <p className="font-bold text-purple-600 text-center">Currently Subscribed</p> : (
                             <button onClick={() => updateSubscription('supreme')} className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700">Subscribe for ₹600</button>
                        )}
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;