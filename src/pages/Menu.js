import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MenuCard = ({ item, onAddToCart, onCardClick }) => {
    const [quantity, setQuantity] = React.useState(1);

    const handleQuantityChange = (e, delta) => {
        e.stopPropagation(); // Stop event from bubbling up
        const newQuantity = quantity + delta;
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = (e) => {
        e.stopPropagation(); // Stop event from bubbling up
        onAddToCart({
            ...item,
            quantity: quantity
        });
        setQuantity(1);
    };

    return (
        <div 
            className="menu-card" 
            data-image={`/images/gallery${item.id}.png`} 
            data-id={item.id}
            onClick={() => onCardClick(item)}
        >
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <span className="price">${item.price}</span>
            <div className="cart-controls" onClick={e => e.stopPropagation()}>
                <div className="quantity-counter">
                    <button 
                        className="quantity-btn minus" 
                        onClick={(e) => handleQuantityChange(e, -1)}
                    >-</button>
                    <span className="quantity-number">{quantity}</span>
                    <button 
                        className="quantity-btn plus" 
                        onClick={(e) => handleQuantityChange(e, 1)}
                    >+</button>
                </div>
                <button 
                    className="add-to-cart" 
                    onClick={handleAddToCart}
                >Add to Cart</button>
            </div>
        </div>
    );
};

const Menu = () => {
    const menuItems = [
        {
            id: 'lobster',
            name: 'Grilled Lobster Tail',
            description: 'Succulent lobster tail grilled to perfection, served with garlic butter and lemon.',
            price: 32.99,
            image: 'gallery1.png'
        },
        {
            id: 'shrimp-scampi',
            name: 'Shrimp Scampi',
            description: 'Juicy shrimp sautéed in a garlic butter sauce, served over linguine.',
            price: 18.99,
            image: 'gallery2.png'
        },
        {
            id: 'paella',
            name: 'Seafood Paella',
            description: 'Traditional Spanish paella with shrimp, mussels, clams, and saffron-infused rice.',
            price: 24.99,
            image: 'gallery3.png'
        },
        {
            id: 'crab-cakes',
            name: 'Crab Cakes',
            description: 'Golden-brown crab cakes made with lump crab meat, served with remoulade sauce.',
            price: 16.99,
            image: 'gallery4.png'
        },
        {
            id: 'salmon',
            name: 'Grilled Salmon',
            description: 'Fresh Atlantic salmon grilled to perfection, served with steamed asparagus.',
            price: 22.99,
            image: 'gallery5.png'
        },
        {
            id: 'clam-chowder',
            name: 'Clam Chowder',
            description: 'New England-style clam chowder with tender clams, potatoes, and cream.',
            price: 8.99,
            image: 'gallery6.png'
        },
        {
            id: 'calamari',
            name: 'Fried Calamari',
            description: 'Crispy fried calamari rings served with marinara sauce and lemon wedges.',
            price: 12.99,
            image: 'gallery7.png'
        },
        {
            id: 'lobster-roll',
            name: 'Lobster Roll',
            description: 'Buttery lobster meat served in a toasted brioche roll, with a side of fries.',
            price: 28.99,
            image: 'gallery8.png'
        }
    ];

    const [swiper, setSwiper] = React.useState(null);

    const handleAddToCart = (item) => {
        const existingItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItem = existingItems.find(i => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += item.quantity;
            localStorage.setItem('cartItems', JSON.stringify(existingItems));
        } else {
            localStorage.setItem('cartItems', JSON.stringify([...existingItems, item]));
        }

        // Make sure to dispatch the event
        window.dispatchEvent(new CustomEvent('cartUpdated'));

        // Create and show notification
        const overlay = document.createElement('div');
        overlay.className = 'notification-overlay';
        
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'notification-message';
        messageDiv.innerHTML = `<strong>${item.name}</strong> Added to Cart`;
        
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'notification-buttons';
        
        const viewCartBtn = document.createElement('button');
        viewCartBtn.className = 'notification-button view-cart-button';
        viewCartBtn.textContent = 'View Cart';
        
        const continueBtn = document.createElement('button');
        continueBtn.className = 'notification-button continue-shopping-button';
        continueBtn.textContent = 'Continue Shopping';
        
        buttonsDiv.appendChild(viewCartBtn);
        buttonsDiv.appendChild(continueBtn);
        notification.appendChild(messageDiv);
        notification.appendChild(buttonsDiv);
        overlay.appendChild(notification);
        document.body.appendChild(overlay);
        
        // Show notification with animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            notification.classList.add('show');
        });

        // Handle button clicks
        continueBtn.addEventListener('click', () => {
            // Close the cart panel if it's open
            const cartPanel = document.querySelector('.cart-panel');
            if (cartPanel && cartPanel.classList.contains('active')) {
                const cartBtn = document.querySelector('.cart-button');
                if (cartBtn) cartBtn.click();
            }
            
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });

        viewCartBtn.addEventListener('click', () => {
            const cartBtn = document.querySelector('.cart-button');
            const cartPanel = document.querySelector('.cart-panel');
            
            // Only toggle the cart if it's not already open
            if (cartBtn && !cartPanel.classList.contains('active')) {
                cartBtn.click();
            }
            
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });

        // Notify CartSidebar
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const handleCardClick = (item) => {
        // Find index of the clicked item
        const index = menuItems.findIndex(menuItem => menuItem.id === item.id);
        if (swiper && index !== -1) {
            swiper.slideToLoop(index);
        }
    };

    return (
        <div className="page-content">
            <section className="gallery">
                <h1>Gallery & Menu</h1>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ 
                        clickable: true,
                        el: '.swiper-pagination' // Specify pagination container
                    }}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="swiper-container"
                    onSwiper={setSwiper}
                >
                    {menuItems.map(item => (
                        <SwiperSlide key={item.id}>
                            <img src={`/images/${item.image}`} alt={item.name} />
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </section>

            <section className="menu">
                <div className="menu-grid">
                    {menuItems.map(item => (
                        <MenuCard 
                            key={item.id} 
                            item={item} 
                            onAddToCart={handleAddToCart}
                            onCardClick={handleCardClick}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Menu;