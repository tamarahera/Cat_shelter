document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.header__nav');

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.toggle('header__nav--active');
    });

    nav.addEventListener('click', (e) => {
        console.log(e.target);
        console.log(e.currentTarget);

        if (e.target.classList.contains('header__list-link') && nav.classList.contains('header__nav--active')) {
            nav.classList.remove('header__nav--active');
        }
    });
})