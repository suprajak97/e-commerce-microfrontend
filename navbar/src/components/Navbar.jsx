import React, { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = ({ cartCount = 0, onNavigate }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark')) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleNavigation = (e, path) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" onClick={(e) => handleNavigation(e, '/')} className="navbar-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <rect width="24" height="24" rx="6" />
            <path d="M12 4.5l-7 5.5v9h5v-5h4v5h5v-9l-7-5.5z" fill="var(--bg-card)"/>
          </svg>
          NEXUS
        </a>
        <div className="navbar-right-section">
          <div className="navbar-links">
            <a href="/" onClick={(e) => handleNavigation(e, '/')} className="nav-link">Products</a>
            <a href="/categories" onClick={(e) => handleNavigation(e, '/categories')} className="nav-link">Categories</a>
            <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="nav-link">About</a>
          </div>
          
          <div className="navbar-actions">
            <button className="icon-btn" onClick={toggleDarkMode} title="Toggle Dark Mode">
              {isDarkMode ? (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              )}
            </button>
            <a href="/cart" onClick={(e) => handleNavigation(e, '/cart')} className="icon-btn cart-icon-btn" title="View Cart">
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              {cartCount > 0 && <span className="cart-badge-dot">{cartCount > 9 ? '9+' : cartCount}</span>}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
