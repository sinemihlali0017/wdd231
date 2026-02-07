// join.js - Join page functionality


const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
});


// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    setCurrentYear();

    // Set last modified date
    setLastModifiedDate();

    // Set form timestamp (Requirement #12)
    setFormTimestamp();

    // Initialize modals (Requirement #11)
    initializeModals();

    // Initialize card animations (Requirement #14)
    initializeCardAnimations();

    // Form validation
    initializeFormValidation();

    // Initialize mobile menu
    initializeMobileMenu();
});

// Set current year in footer
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Set last modified date
function setLastModifiedDate() {
    const lastModifiedElement = document.getElementById('last-modified');
    if (lastModifiedElement) {
        const lastModified = new Date(document.lastModified);
        const formattedDate = lastModified.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        lastModifiedElement.textContent = formattedDate;
    }
}

// Set form timestamp (Requirement #12)
function setFormTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }
}

// Initialize modals (Requirement #11)
function initializeModals() {
    const modalLinks = document.querySelectorAll('.view-benefits-link');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open modal when clicking View Benefits link
    modalLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    // Close modal when clicking X
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            closeModal(this.closest('.modal'));
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    closeModal(modal);
                }
            });
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent scrolling

        // Trap focus inside modal
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }

        // Store reference to modal for focus trap
        modal.currentFocus = 0;

        // Add focus trap
        modal.addEventListener('keydown', trapTabKey);
    }
}

function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore scrolling

        // Remove focus trap
        modal.removeEventListener('keydown', trapTabKey);

        // Return focus to the button that opened the modal
        const activeLink = document.querySelector('.view-benefits-link.active');
        if (activeLink) {
            activeLink.classList.remove('active');
            activeLink.focus();
        }
    }
}

// Trap tab key inside modal for accessibility
function trapTabKey(e) {
    const modal = e.currentTarget;
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');

    if (e.key === 'Tab') {
        if (e.shiftKey) { // shift + tab
            if (modal.currentFocus === 0) {
                modal.currentFocus = focusableElements.length - 1;
                focusableElements[modal.currentFocus].focus();
                e.preventDefault();
            } else {
                modal.currentFocus--;
            }
        } else { // tab
            if (modal.currentFocus === focusableElements.length - 1) {
                modal.currentFocus = 0;
                focusableElements[modal.currentFocus].focus();
                e.preventDefault();
            } else {
                modal.currentFocus++;
            }
        }
    }
}

// Initialize card animations (Requirement #14)
function initializeCardAnimations() {
    const cards = document.querySelectorAll('.membership-card');

    // Add intersection observer for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animation is handled by CSS, just add a class for tracking
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize form validation
function initializeFormValidation() {
    const form = document.getElementById('membership-form');
    if (form) {
        // Title pattern validation (Requirement #8)
        const titleInput = document.getElementById('org-title');
        if (titleInput) {
            titleInput.addEventListener('input', function () {
                validateTitlePattern(this);
            });
        }

        // Form submission
        form.addEventListener('submit', function (e) {
            if (!validateForm()) {
                e.preventDefault();
                showFormErrors();
            } else {
                // Form is valid, allow submission
                console.log('Form submitted successfully');
            }
        });
    }
}

// Validate title pattern (Requirement #8)
function validateTitlePattern(input) {
    const pattern = /^[A-Za-z\s\-]{7,}$/;
    const isValid = pattern.test(input.value);

    if (input.value && !isValid) {
        input.setCustomValidity('Title must be at least 7 characters and contain only letters, spaces, and hyphens');
    } else {
        input.setCustomValidity('');
    }

    return isValid;
}

// Validate entire form
function validateForm() {
    const form = document.getElementById('membership-form');
    if (!form) return true;

    return form.checkValidity();
}

// Show form errors
function showFormErrors() {
    const invalidFields = document.querySelectorAll(':invalid');

    invalidFields.forEach(field => {
        field.style.borderColor = '#e74c3c';

        // Add error message if not present
        if (!field.nextElementSibling || !field.nextElementSibling.classList.contains('error-message')) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = field.validationMessage;
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
    });
}

// Remove error styling on input
document.addEventListener('input', function (e) {
    if (e.target.matches('input, select, textarea')) {
        e.target.style.borderColor = '';

        // Remove error message
        const errorMessage = e.target.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
    }
});

// Mobile menu functionality
function initializeMobileMenu() {
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            mainNav.classList.toggle('show');
            menuBtn.setAttribute('aria-label',
                mainNav.classList.contains('show') ? 'Close menu' : 'Open menu');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!menuBtn.contains(e.target) && !mainNav.contains(e.target)) {
                mainNav.classList.remove('show');
                menuBtn.setAttribute('aria-label', 'Open menu');
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mainNav.classList.contains('show')) {
                mainNav.classList.remove('show');
                menuBtn.setAttribute('aria-label', 'Open menu');
                menuBtn.focus();
            }
        });
    }
}