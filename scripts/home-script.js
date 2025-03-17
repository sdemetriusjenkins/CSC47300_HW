// Runs when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById('hero-video'); // Hero section video
    const menuToggle = document.querySelector('.menu-toggle'); // Hamburger menu toggle
    const navUl = document.querySelector('nav ul'); // Dropdown menu list
    const pageContent = document.querySelector('.page-content'); // Main content area

    // Adds a fade-out effect to the video near the end
    function handleFade() {
        video.classList.add('fade-out'); // Add fade-out class
        setTimeout(() => video.classList.remove('fade-out'), 1000); // Remove fade-out after 1 second
    }

    // Listens for video time updates to trigger the fade effect
    video.addEventListener('timeupdate', () => {
        if (video.currentTime >= video.duration - 1) handleFade(); // Trigger fade near the end of the video
    });

    // Toggles the mobile menu when the hamburger icon is clicked
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
            pageContent.style.marginTop = `${navUl.scrollHeight}px`; // Push content down by the dropdown height
        } else {
            pageContent.style.marginTop = '0'; // Reset margin when the dropdown is closed
        }
    });

    // Toggles video play/pause when clicked
    video.addEventListener('click', () => {
        video.paused ? video.play() : video.pause(); // Play if paused, pause if playing
    });
});