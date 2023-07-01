const slides = () => {
    let slideIndex = 1;
    const items = document.querySelectorAll('.story__item');

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        items.forEach(item => {
            item.classList.add('animate__animated');
            item.classList.remove('story__item--active');
        })

        items[slideIndex - 1].classList.add('story__item--active');
    }

    showSlides(slideIndex);

    function plusSlide(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector('.story__btn--left'),
            nextBtn = document.querySelector('.story__btn--right');

        prevBtn.addEventListener('click', () => {
            plusSlide(-1);
            items[slideIndex - 1].classList.remove('animate__slideInLeft');
            items[slideIndex - 1].classList.add('animate__slideInRight');
        });
        nextBtn.addEventListener('click', () => {
            plusSlide(1);
            items[slideIndex - 1].classList.remove('animate__slideInRight');
            items[slideIndex - 1].classList.add('animate__slideInLeft');
        });
    } catch (e) { }
};

export default slides;