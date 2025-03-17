// Runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const menuCards = document.querySelectorAll('.menu-card'); // All menu cards
    const swiperWrapper = document.querySelector('.swiper-wrapper'); // Swiper slider container
    const menuToggle = document.querySelector('.menu-toggle'); // Hamburger menu toggle
    const navUl = document.querySelector('nav ul'); // Dropdown menu list
    const pageContent = document.querySelector('.page-content'); // Main content area

    // Preload menu images into the Swiper slider
    menuCards.forEach(card => {
        const imageSrc = card.getAttribute('data-image'); // Get image source from data attribute
        const slide = document.createElement('div'); // Create a new slide element
        slide.classList.add('swiper-slide'); // Add Swiper slide class
        slide.innerHTML = `<img src="${imageSrc}" alt="Menu Item">`; // Add image to the slide
        swiperWrapper.appendChild(slide); // Append slide to the Swiper wrapper
    });

    // Initialize Swiper slider
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Enable infinite looping
        slidesPerView: 1, // Show one slide at a time
        pagination: {
            el: '.swiper-pagination', // Pagination dots container
            clickable: true, // Allow clicking on pagination dots
        },
        navigation: {
            nextEl: '.swiper-button-next', // Next slide button
            prevEl: '.swiper-button-prev', // Previous slide button
        },
        autoplay: {
            delay: 3000, // Auto-play with a 3-second delay
        },
    });

    // Add click event listeners to menu cards
    menuCards.forEach((card, index) => {
        card.addEventListener('click', () => swiper.slideToLoop(index)); // Slide to corresponding image on card click
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active'); // Toggle active state for the menu icon
        navUl.classList.toggle('unfolded'); // Toggle the dropdown menu visibility

        // Switch between hamburger icon and "X" icon
        if (menuToggle.classList.contains('active')) {
            menuToggle.innerHTML = '&#10005;'; // Display "X" icon when menu is open
        } else {
            menuToggle.innerHTML = '&#9776;'; // Display hamburger icon when menu is closed
        }

        // Adjust the page content margin to accommodate the dropdown menu
        if (navUl.classList.contains('unfolded')) {
            pageContent.style.marginTop = '190px'; // Push content down by the dropdown height
        } else {
            pageContent.style.marginTop = '0'; // Reset margin when the dropdown is closed
        }
    });
});