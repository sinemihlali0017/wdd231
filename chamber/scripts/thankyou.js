// Display form data on thank you page
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);

    // Display all required fields
    document.getElementById('first').textContent = urlParams.get('first') || 'Not provided';
    document.getElementById('last').textContent = urlParams.get('last') || 'Not provided';
    document.getElementById('email').textContent = urlParams.get('email') || 'Not provided';
    document.getElementById('phone').textContent = urlParams.get('phone') || 'Not provided';
    document.getElementById('organization').textContent = urlParams.get('organization') || 'Not provided';

    // Format and display timestamp
    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        document.getElementById('timestamp').textContent = date.toLocaleString();
    } else {
        document.getElementById('timestamp').textContent = 'Not recorded';
    }
});