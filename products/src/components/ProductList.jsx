import React, { useEffect, useState, useMemo } from 'react';
import './ProductList.css';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'All';
  });
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromURL = params.get('category');
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      
      const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product);
      window.dispatchEvent(new CustomEvent('ADD_TO_CART', { detail: product }));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong.</h2>
        <p>{error}</p>
        <button onClick={fetchProducts} className="retry-btn">Try Again</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="products-container skeleton">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <div key={i} className="product-card skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-price"></div>
            <div className="skeleton-button"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-list-wrapper">
      <div className="products-hero">
        <h1 className="hero-title">Discover <span className="highlight-gradient">Excellence</span></h1>
        <p className="hero-subtitle">Explore our exclusive collection of premium products tailored just for you. Find exactly what you need.</p>
      </div>

      <div className="filters-container glass-effect">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="category-wrapper">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
          <svg className="select-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="products-container">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="product-image-container">
                <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
                <div className="product-category-badge">{product.category}</div>
              </div>
              <div className="product-details">
                <h3 className="product-title" title={product.title}>{product.title}</h3>
                <div className="product-price-row">
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  <span>Add to Cart</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
