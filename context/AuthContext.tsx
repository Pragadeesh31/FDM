import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { User, Order } from '../types';

type SubscriptionTier = 'none' | 'prime' | 'supreme';

interface AuthContextType {
  currentUser: User | null;
  orders: Order[];
  login: (username: string) => void;
  logout: () => void;
  register: (username: string, email: string, firstName: string, lastName: string) => void;
  updateSubscription: (tier: SubscriptionTier) => void;
  updateProfile: (updatedDetails: Partial<User>) => void;
  addOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// FIX: Explicitly type MOCK_USER_DEFAULTS as User to prevent type widening for the 'subscription' property.
const MOCK_USER_DEFAULTS: User = {
    id: '123',
    username: 'DemoUser',
    email: 'demo@fdmarket.com',
    subscription: 'none',
    firstName: 'Demo',
    lastName: 'User',
    phone: '',
    address: { street: '', city: '', postalCode: '' },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const user = localStorage.getItem('FDM_USER');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('FDM_USER', JSON.stringify(currentUser));
      try {
        const storedOrders = localStorage.getItem(`FDM_ORDERS_${currentUser.id}`);
        setOrders(storedOrders ? JSON.parse(storedOrders) : []);
      } catch (error) {
        console.error("Failed to parse orders from localStorage", error);
        setOrders([]);
      }
    } else {
      localStorage.removeItem('FDM_USER');
      setOrders([]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`FDM_ORDERS_${currentUser.id}`, JSON.stringify(orders));
    }
  }, [orders, currentUser]);

  const login = (username: string) => {
    // In a real app, you'd fetch user data. Here we mock it.
    // We check if a user with this username exists in localStorage to preserve details.
    const storedUsers = Object.keys(localStorage)
        .filter(key => key.startsWith('FDM_USER_'))
        .map(key => JSON.parse(localStorage.getItem(key) as string));
    
    const existingUser = storedUsers.find(u => u.username === username);

    if (existingUser) {
        setCurrentUser(existingUser);
    } else {
        // Fallback for the original demo user or new logins
        setCurrentUser({ ...MOCK_USER_DEFAULTS, username });
    }
  };

  const register = (username: string, email: string, firstName: string, lastName: string) => {
    const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        firstName,
        lastName,
        phone: '',
        address: { street: '', city: '', postalCode: '' },
        subscription: 'none'
    };
    // In a real app, you'd check for existing username/email.
    // Here we store the new user separately to be found by login later.
    localStorage.setItem(`FDM_USER_${newUser.id}`, JSON.stringify(newUser));
    setCurrentUser(newUser);
    setOrders([]);
  };
  
  const updateSubscription = (tier: SubscriptionTier) => {
    if (currentUser) {
        setCurrentUser(prevUser => ({ ...prevUser!, subscription: tier }));
    }
  };
  
  const updateProfile = (updatedDetails: Partial<User>) => {
    if (currentUser) {
      setCurrentUser(prevUser => ({ ...prevUser!, ...updatedDetails }));
    }
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const randomStatus = ['Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)] as Order['status'];
    const newOrder: Order = {
      ...orderData,
      id: `#${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      status: randomStatus,
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const logout = () => {
    // We don't remove the user from localStorage so they can log back in
    // with their saved details.
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, orders, login, logout, register, updateSubscription, updateProfile, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};