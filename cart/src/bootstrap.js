import React from 'react';
import { createRoot } from 'react-dom/client';
import CartDisplay from './components/CartDisplay';

const mockCart = [
  { id: 1, title: 'Fjallraven - Foldsack No. 1 Backpack', price: 109.95, image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg', quantity: 2 }
];

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<CartDisplay cartItems={mockCart} onRemove={(id) => console.log('Removed', id)} />);
}
