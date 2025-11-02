export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
  };
  subscription: 'none' | 'prime' | 'supreme';
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'vegetable' | 'fruit' | 'dairy';
  unit: 'kg' | 'litre';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}