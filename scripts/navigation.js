const navbottom = document.querySelector('#nav-hbr');

const navlinks = document.querySelector('#nav-links');

navbottom.addEventListener('click', () => {
    navbottom.classList.toggle('show');
    navlinks.classList.toggle('show');
});
