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

// common.js - Common functionality for all pages

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('show');
            this.setAttribute('aria-expanded',
                mainNav.classList.contains('show') ? 'true' : 'false'
            );
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!menuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                mainNav.classList.remove('show');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Set current year in footer
    const yearElements = document.querySelectorAll('#current-year, #year');
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Set last modified date
    const lastModifiedElements = document.querySelectorAll('#last-modified');
    lastModifiedElements.forEach(element => {
        const lastModified = new Date(document.lastModified);
        element.textContent = lastModified.toLocaleDateString();
    });

    // Form validation helper
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';

                    // Add error message
                    if (!field.nextElementSibling ||
                        !field.nextElementSibling.classList.contains('error-message')) {
                        const errorMsg = document.createElement('small');
                        errorMsg.className = 'error-message';
                        errorMsg.style.color = '#e74c3c';
                        errorMsg.style.display = 'block';
                        errorMsg.style.marginTop = '4px';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = this.querySelector('[required]:invalid');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });

        // Clear error on input
        form.addEventListener('input', function (e) {
            if (e.target.hasAttribute('required')) {
                e.target.style.borderColor = '';
                const errorMsg = e.target.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            }
        });
    });

    // Handle responsive images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});