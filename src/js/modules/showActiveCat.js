const showActiveCat = () => {
    let catCards = document.querySelectorAll('.cat__wrapper .cat__item');
    catCards.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('cat__item--active');
        });

        item.addEventListener('focus', () => {
            item.classList.add('cat__item--active');
        });

        item.addEventListener('click', () => {
            item.classList.add('cat__item--active');
        });

        item.addEventListener('mouseleave', () => {
            if (item.classList.contains('cat__item--active')) {
                item.classList.remove('cat__item--active');
            }
        });

        item.addEventListener('blur', () => {
            if (item.classList.contains('cat__item--active')) {
                item.classList.remove('cat__item--active');
            }
        });
    });
};

export default showActiveCat;