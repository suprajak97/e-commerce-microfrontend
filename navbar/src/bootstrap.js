import React from 'react';
import { createRoot } from 'react-dom/client';
import Navbar from './components/Navbar';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Navbar cartCount={3} />); // Mock value for standalone development
}
