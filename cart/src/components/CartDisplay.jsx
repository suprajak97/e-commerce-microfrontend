import React from 'react';
import './CartDisplay.css';

const CartDisplay = ({ cartItems = [], onRemove, onNavigate }) => {
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <a 
          href="/" 
          onClick={(e) => { 
            if (onNavigate) { 
              e.preventDefault(); 
              onNavigate('/'); 
            } 
          }} 
          className="continue-shopping"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>
      
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} × {item.quantity}</p>
                <p className="cart-item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <button 
                className="remove-btn"
                onClick={() => onRemove && onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default CartDisplay;
