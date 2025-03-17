// Handles the hamburger menu toggle for mobile view on about and contact pages
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle'); // Hamburger menu toggle button
    const navUl = document.querySelector('nav ul'); // Dropdown menu list
    const pageContent = document.querySelector('.page-content'); // Main content area

    // Toggle the menu and adjust page content when the hamburger icon is clicked
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active'); // Toggle active state for the menu icon
        navUl.classList.toggle('unfolded'); // Toggle the dropdown menu visibility

        // Switch between hamburger icon and "X" icon
        if (menuToggle.classList.contains('active')) {
            menuToggle.innerHTML = '&#10005;'; // Display "X" icon when menu is open
        } else {
            menuToggle.innerHTML = '&#9776;'; // Display hamburger icon when menu is closed
        }

        // Push the page content down when the dropdown menu is open
        if (navUl.classList.contains('unfolded')) {
            pageContent.style.marginTop = `${navUl.scrollHeight}px`; // Adjust margin to fit the dropdown height
        } else {
            pageContent.style.marginTop = '0'; // Reset margin when the dropdown is closed
        }
    });
});