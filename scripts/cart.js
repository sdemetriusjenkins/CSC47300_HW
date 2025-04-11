class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.total = 0;
        this.init();
    }

    // Add this new method to save cart state
    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    init() {
        // Initialize cart elements
        this.cartButton = document.querySelector('.cart-button');
        this.cartPanel = document.querySelector('.cart-panel');
        this.cartItems = document.querySelector('.cart-items');
        this.cartCount = document.querySelector('.cart-count');
        this.cartTotal = document.querySelector('.cart-total span');
        this.cartClose = document.querySelector('.cart-close');

        // Cart toggle handlers
        this.cartButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleCart();
        });

        // Close button handler
        this.cartClose.addEventListener('click', () => {
            this.cartPanel.classList.remove('active');
        });

        // Close cart panel when clicking outside
        document.addEventListener('click', (e) => {
            // Only close if clicking outside both cart panel and cart button
            if (!this.cartPanel.contains(e.target) && 
                !this.cartButton.contains(e.target) && 
                this.cartPanel.classList.contains('active')) {
                this.cartPanel.classList.remove('active');
            }
        });

        // Stop propagation of clicks inside cart panel
        this.cartPanel.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Initialize menu quantity controls
        const quantityCounters = document.querySelectorAll('.quantity-counter');
        quantityCounters.forEach(counter => {
            const minusBtn = counter.querySelector('.minus');
            const plusBtn = counter.querySelector('.plus');
            const numberDisplay = counter.querySelector('.quantity-number');

            minusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let value = parseInt(numberDisplay.textContent);
                if (value > 1) {
                    numberDisplay.textContent = value - 1;
                }
            });

            plusBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                let value = parseInt(numberDisplay.textContent);
                numberDisplay.textContent = value + 1;
            });
        });

        // Add to cart button handlers
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const menuCard = button.closest('.menu-card');
                const quantity = parseInt(menuCard.querySelector('.quantity-number').textContent);
                
                this.addItem({
                    id: menuCard.dataset.id,
                    name: menuCard.querySelector('h2').textContent,
                    price: parseFloat(menuCard.querySelector('.price').textContent.replace('$', '')),
                    quantity: quantity
                });
                
                // Reset quantity to 1 after adding to cart
                menuCard.querySelector('.quantity-number').textContent = '1';
            });
        });

        // Add click handler for continue shopping button in cart
        const continueShoppingBtn = document.querySelector('.continue-shopping');
        if (continueShoppingBtn) {
            continueShoppingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.cartPanel.classList.remove('active');
                
                const isMenuPage = document.querySelector('.menu');
                if (isMenuPage) {
                    // If on menu page, scroll to menu section
                    window.scrollTo({
                        top: isMenuPage.offsetTop - 50,
                        behavior: 'smooth'
                    });
                } else {
                    // If on other pages, redirect to menu page with scroll parameter
                    window.location.href = 'menu.html#scroll-to-menu';
                }
            });
        }

        // Add clear cart button handler
        const clearCartBtn = document.querySelector('.clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', () => {
                this.items = [];
                this.saveCart(); // Save after clearing cart
                this.updateCart();
            });
        }

        // Initialize cart display with saved items
        this.updateCart();
    }

    toggleCart() {
        // Force the cart panel to animate properly by removing and re-adding the active class
        this.cartPanel.classList.remove('active');
        
        // Force a reflow to ensure the animation runs
        void this.cartPanel.offsetWidth;
        
        // Add the active class to slide the cart panel in
        this.cartPanel.classList.add('active');
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push({ ...item });
        }
        
        this.saveCart(); // Save after adding item
        this.showNotification(`${item.name} Added to Cart`);
        this.updateCart();
    }

    showNotification(message) {
        // Remove existing notification if any
        const existingOverlay = document.querySelector('.notification-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'notification-overlay';

        // Create notification
        const notification = document.createElement('div');
        notification.className = 'cart-notification';

        // Create message with bold item name
        const messageDiv = document.createElement('div');
        messageDiv.className = 'notification-message';
        const itemName = message.split(' Added to Cart')[0];
        messageDiv.innerHTML = `<strong>${itemName}</strong> Added to Cart`;

        // Create buttons container
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'notification-buttons';

        // Create View Cart button
        const viewCartButton = document.createElement('button');
        viewCartButton.className = 'notification-button view-cart-button';
        viewCartButton.textContent = 'View Cart';

        // Create Continue Shopping button
        const continueButton = document.createElement('button');
        continueButton.className = 'notification-button continue-shopping-button';
        continueButton.textContent = 'Continue Shopping';

        // Add all elements to notification
        notification.appendChild(messageDiv);
        buttonsDiv.appendChild(viewCartButton);
        buttonsDiv.appendChild(continueButton);
        notification.appendChild(buttonsDiv);
        overlay.appendChild(notification);
        document.body.appendChild(overlay);

        // Add event listeners
        const closeNotification = () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        };

        continueButton.addEventListener('click', closeNotification);
        viewCartButton.addEventListener('click', (e) => {
            // Prevent event from bubbling up
            e.stopPropagation();

            // Check cart state first
            const isCartOpen = this.cartPanel.classList.contains('active');
            
            // If cart is not open, prepare to open it
            if (!isCartOpen) {
                const openCart = () => {
                    this.cartPanel.classList.add('active');
                };
                
                closeNotification();
                setTimeout(openCart, 300);
            } else {
                // If cart is open, just close the notification
                closeNotification();
            }
        });

        // Show notification with animation
        requestAnimationFrame(() => {
            overlay.classList.add('show');
            notification.classList.add('show');
        });
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart(); // Save after removing item
        this.updateCart();
    }

    updateQuantity(itemId, delta) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeItem(itemId);
            } else {
                this.saveCart(); // Save after updating quantity
                this.updateCart();
            }
        }
    }

    updateCart() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;

        // Show/hide empty cart message
        const cartEmpty = document.querySelector('.cart-empty');
        const cartItems = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');

        if (this.items.length === 0) {
            cartItems.innerHTML = '';
            cartEmpty.style.display = 'block';
            cartTotal.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartTotal.style.display = 'block';
            
            // Update cart items with images
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="images/gallery${item.id === 'lobster' ? '1' : 
                                              item.id === 'shrimp-scampi' ? '2' : 
                                              item.id === 'paella' ? '3' : 
                                              item.id === 'crab-cakes' ? '4' : 
                                              item.id === 'salmon' ? '5' : 
                                              item.id === 'clam-chowder' ? '6' : 
                                              item.id === 'calamari' ? '7' : '8'}.png" 
                             alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="cart.updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="cart.updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
            `).join('');

            // Calculate totals
            const subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const taxRate = 0.08875; // 8.875% tax rate
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            // Update total displays
            document.querySelector('.subtotal-amount').textContent = `$${subtotal.toFixed(2)}`;
            document.querySelector('.tax-amount').textContent = `$${tax.toFixed(2)}`;
            document.querySelector('.final-total').textContent = `$${total.toFixed(2)}`;
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new ShoppingCart();
});

// Add this at the end of cart.js
document.addEventListener('DOMContentLoaded', () => {
    // Wait a short moment to ensure cart sidebar is loaded
    setTimeout(() => {
        if (!window.cart) {
            window.cart = new ShoppingCart();
        }
    }, 100);
});

// Check for scroll parameter in URL
if (window.location.hash === '#scroll-to-menu') {
    // Remove the hash to prevent future scrolls
    window.location.hash = '';
    
    // Scroll to menu section after a short delay to ensure content is loaded
    setTimeout(() => {
        const menuSection = document.querySelector('.menu');
        if (menuSection) {
            window.scrollTo({
                top: menuSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }, 100);
}