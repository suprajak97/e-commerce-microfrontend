import React from 'react';
import './Categories.css';

const categoryData = [
  {
    id: 'electronics',
    title: 'Electronics',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=800',
    description: 'High-performance gadgets, professional gear, and the latest tech innovations.'
  },
  {
    id: 'jewelery',
    title: 'Jewelery',
    icon: '💎',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800',
    description: 'Elegant accessories, fine metals, and timeless pieces for every occasion.'
  },
  {
    id: "men's clothing",
    title: "Men's Clothing",
    icon: '👔',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=800',
    description: 'Premium apparel designed for the modern gentleman. Comfort meets style.'
  },
  {
    id: "women's clothing",
    title: "Women's Clothing",
    icon: '👗',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    description: 'Chic, trendy, and sophisticated fashion to elevate your wardrobe effortlessly.'
  }
];

const Categories = ({ onNavigate }) => {
  return (
    <div className="categories-page">
      <div className="categories-header">
        <h1>Explore Our <span className="highlight-text">Collections</span></h1>
        <p>
          Discover a curated selection of products across our diverse categories. From cutting-edge electronics to timeless jewelry, we have everything you need.
        </p>
      </div>
      
      <div className="categories-grid">
        {categoryData.map(category => (
          <div key={category.id} className="category-card" onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate(`/?category=${encodeURIComponent(category.id)}`);
            }
          }}>
            <div className="category-image-wrapper">
              <img src={category.image} alt={category.title} className="category-image" />
              <div className="category-overlay"></div>
              <div className="category-badge">
                <span className="badge-icon">
                  {category.icon === '💻' && <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>}
                  {category.icon === '💎' && <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 22 22 7 12 2"></polygon><polyline points="2 7 12 7 22 7"></polyline><polyline points="12 22 12 7"></polyline><polyline points="12 2 7 7"></polyline><polyline points="12 2 17 7"></polyline></svg>}
                  {category.icon === '👔' && <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v12zm0 0v7"></path></svg>}
                  {category.icon === '👗' && <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a8 8 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z"></path></svg>}
                </span>
                <span className="badge-title">{category.title}</span>
              </div>
            </div>
            <div className="category-info">
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
