// Common functionality for all pages
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Set last modified date
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // Mobile menu functionality
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('show');
            // Change button text based on state
            this.textContent = mainNav.classList.contains('show') ? '✕' : '☰';
        });

        // Close menu when clicking on a link (for mobile)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                if (mainNav.classList.contains('show')) {
                    mainNav.classList.remove('show');
                    menuBtn.textContent = '☰';
                }
            });
        });
    }
    // Last updated functionality
    document.addEventListener('DOMContentLoaded', function () {
        // Set current year
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Set last modified date
        const lastModifiedElement = document.getElementById('last-modified');
        if (lastModifiedElement) {
            lastModifiedElement.textContent = document.lastModified;
        }
    });

});