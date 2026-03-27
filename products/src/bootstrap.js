import React from 'react';
import { createRoot } from 'react-dom/client';
import ProductList from './components/ProductList';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<ProductList onAddToCart={(product) => console.log('Added via standalone', product)} />);
}
