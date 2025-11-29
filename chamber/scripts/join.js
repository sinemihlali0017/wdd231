// Set timestamp when page loads
document.addEventListener('DOMContentLoaded', function () {
    // Set current timestamp in hidden field
    const now = new Date();
    document.getElementById('timestamp').value = now.toISOString();

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const openModalButtons = document.querySelectorAll('.openModal');
    const closeButtons = document.querySelectorAll('.close');

    // Open modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            document.getElementById(target).style.display = 'block';
        });
    });

    // Last updated with custom date format
    document.addEventListener('DOMContentLoaded', function () {
        // Set current year
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Set last modified date with custom format
        const lastModifiedElement = document.getElementById('last-modified');
        if (lastModifiedElement) {
            const lastModified = new Date(document.lastModified);
            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            };
            lastModifiedElement.textContent = lastModified.toLocaleDateString('en-US', options);
        }
    });


    // Close modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });


});