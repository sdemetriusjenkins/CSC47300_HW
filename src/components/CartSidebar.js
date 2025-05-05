import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const CartSidebar = () => {
    const [isActive, setIsActive] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleCart = () => setIsActive(!isActive);

    const updateCart = () => {
        const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(savedItems);
        setCartCount(savedItems.reduce((sum, item) => sum + item.quantity, 0));
    };

    const updateQuantity = (itemId, delta) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + delta;
                return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(Boolean);

        setCartItems(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        updateCart();
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.setItem('cartItems', JSON.stringify([]));
        updateCart();
    };

    useEffect(() => {
        updateCart();
        const handleCartUpdate = () => updateCart();
        window.addEventListener('cartUpdated', handleCartUpdate);
        return () => window.removeEventListener('cartUpdated', handleCartUpdate);
    }, []);

    const calculateTotals = () => {
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.08875;
        return {
            subtotal: subtotal.toFixed(2),
            tax: tax.toFixed(2),
            total: (subtotal + tax).toFixed(2)
        };
    };

    const totals = calculateTotals();

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setIsActive(false); // Close the sidebar

        // Get current path
        const currentPath = window.location.pathname;
        const menuSection = document.querySelector('.menu');

        if (currentPath === '/menu' && menuSection) {
            // If on menu page, scroll to menu section
            setTimeout(() => {
                menuSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300); // Wait for sidebar animation to complete
        } else {
            // If on other pages, navigate to menu page and set scroll flag
            navigate('/menu');
            localStorage.setItem('scrollToMenu', 'true');
        }
    };

    // Add effect to handle scroll after navigation
    useEffect(() => {
        const shouldScroll = localStorage.getItem('scrollToMenu');
        if (shouldScroll && location.pathname === '/menu') {
            const menuSection = document.querySelector('.menu');
            if (menuSection) {
                setTimeout(() => {
                    menuSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    localStorage.removeItem('scrollToMenu');
                }, 300); // Increased delay to ensure page loads
            }
        }
    }, [location]);

    return (
        <li className="cart-container">
            <button className="cart-button" onClick={toggleCart}>
                <div className="cart-icon"></div>
                <span className="cart-count">{cartCount}</span>
            </button>
            <div className={`cart-panel ${isActive ? 'active' : ''}`}>
                <div className="cart-header">
                    <h3>Shopping Cart</h3>
                    <button className="cart-close" onClick={toggleCart}>&times;</button>
                </div>
                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <img 
                            src={`${process.env.PUBLIC_URL}/images/shopping-cart-empty.svg`} 
                            alt="Empty Cart" 
                        />
                        <p>Your cart is currently empty</p>
                        <Link 
                            to="/menu" 
                            className="continue-shopping"
                            onClick={handleContinueShopping}
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image">
                                        <img src={`${process.env.PUBLIC_URL}/images/${item.image}`} alt={item.name} />
                                    </div>
                                    <div className="cart-item-info">
                                        <div className="cart-item-title">{item.name}</div>
                                        <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                    <div className="cart-item-quantity">
                                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-total">
                            <div className="cart-totals-breakdown">
                                <div className="subtotal-row">
                                    <span>Subtotal:</span>
                                    <span className="subtotal-amount">${totals.subtotal}</span>
                                </div>
                                <div className="tax-row">
                                    <span>Tax (8.875%):</span>
                                    <span className="tax-amount">${totals.tax}</span>
                                </div>
                                <div className="total-row">
                                    <strong>Total:</strong>
                                    <span className="final-total">${totals.total}</span>
                                </div>
                            </div>
                            <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                        </div>
                    </>
                )}
            </div>
        </li>
    );
};

export default CartSidebar;