import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';
import Categories from './components/Categories';

const Navbar = React.lazy(() => import('navbar/Navbar'));
const ProductList = React.lazy(() => import('products/ProductList'));
const CartDisplay = React.lazy(() => import('cart/CartDisplay'));

const About = () => (
  <div className="about-page">
    <div className="about-hero">
      <h1>Redefining the <span className="highlight-text">Future</span><br/>of Commerce.</h1>
      <p className="about-subtitle">
        Nexus was founded on a simple premise: e-commerce shouldn't be a monolith. We build modular, lightning-fast shopping experiences that adapt to the needs of modern consumers and developers alike.
      </p>
    </div>
    
    <div className="about-stats">
      <div className="stat-card">
        <h3>50K+</h3>
        <p>ACTIVE USERS</p>
      </div>
      <div className="stat-card">
        <h3>1.2M</h3>
        <p>PRODUCTS SOLD</p>
      </div>
      <div className="stat-card">
        <h3>200+</h3>
        <p>GLOBAL PARTNERS</p>
      </div>
      <div className="stat-card">
        <h3>45</h3>
        <p>TEAM MEMBERS</p>
      </div>
    </div>

    <div className="contact-section">
      <div className="contact-info">
        <h2>Get in Touch</h2>
        <p className="contact-desc">
          Have questions about our platform or interested in a partnership? Our team is ready to help you scale your business.
        </p>
        
        <div className="contact-methods">
          <div className="contact-method">
            <div className="method-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <p className="method-label">EMAIL US</p>
              <p className="method-value">hello@nexus-commerce.com</p>
            </div>
          </div>
          
          <div className="contact-method">
            <div className="method-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <p className="method-label">CALL US</p>
              <p className="method-value">+1 (555) 000-NEXUS</p>
            </div>
          </div>
          
          <div className="contact-method">
            <div className="method-icon">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <p className="method-label">VISIT US</p>
              <p className="method-value">101 Silicon Valley Way, CA</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <input type="text" placeholder="First Name" className="form-input" />
            <input type="text" placeholder="Last Name" className="form-input" />
          </div>
          <input type="email" placeholder="Email Address" className="form-input" />
          <textarea placeholder="Your Message" className="form-textarea" rows="5"></textarea>
          <button type="submit" className="form-submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  </div>
);

const AppContent = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="host-container">
      <React.Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar 
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
          onNavigate={handleNavigate}
        />
      </React.Suspense>
      
      <main className="main-content">
        <React.Suspense fallback={<div>Loading Page...</div>}>
          <Routes>
            <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
            <Route path="/categories" element={<Categories onNavigate={handleNavigate} />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartDisplay cartItems={cartItems} onRemove={handleRemoveItem} onNavigate={handleNavigate} />} />
          </Routes>
        </React.Suspense>
      </main>
    </div>
  );
};

const App = () => {
  const isGithubPages = window.location.hostname.includes('github.io');
  return (
    <BrowserRouter basename={isGithubPages ? '/e-commerce-microfrontend' : '/'}>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
