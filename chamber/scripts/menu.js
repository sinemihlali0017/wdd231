
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (menuBtn && mainNav) {
        menuBtn.addEventListener('click', function () {
            if (mainNav.style.display === 'flex') {
                mainNav.style.display = 'none';
            } else {
                mainNav.style.display = 'flex';
            }
        });

        // Handle window resize
        window.addEventListener('resize', function () {
            if (window.innerWidth > 640) {
                mainNav.style.display = 'flex';
            } else {
                mainNav.style.display = 'none';
            }
        });
    }
});