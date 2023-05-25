window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    //hamburger
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.header__nav');

    hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        nav.classList.toggle('header__nav--active');
    });

    nav.addEventListener('click', (e) => {
        if (e.target.classList.contains('header__list-link') && nav.classList.contains('header__nav--active')) {
            nav.classList.remove('header__nav--active');
        }
    });


    //slides
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


    //tabs
    const tabsWrapper = document.querySelector('.about__tabs-btns'),
        tab = document.querySelectorAll('.about__tabs-btn'),
        content = document.querySelectorAll('.about__tabs-item');

    function hideTabContent() {
        content.forEach(item => {
            item.classList.remove('about__tabs-item--active', 'animate__fadeIn');
        });

        tab.forEach(item => {
            item.classList.remove('about__tabs-btn--active');
        })
    }

    function showTabContent(index = 0) {
        content[index].classList.add('about__tabs-item--active', 'animate__animated', 'animate__fadeIn');
        tab[index].classList.add('about__tabs-btn--active');
    }

    hideTabContent();
    showTabContent();

    tabsWrapper.addEventListener('click', (e) => {
        const target = e.target;
        console.log(target);
        if (target.classList.contains('about__tabs-btn') ||
            target.parentNode.classList.contains('about__tabs-btn')) {
            tab.forEach((item, index) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(index);
                    tabIndex = index;
                }
            });
        }
    });
    let tabIndex = 0;
    function showTabs(n) {
        if (n > tab.length - 1) {
            tabIndex = 0;
        }

        hideTabContent();
        showTabContent(tabIndex);
    }
    setInterval(function () {
        console.log(tabIndex)
        showTabs(tabIndex += 1);
    }, 6000);

    
    //accordion

    const btns = document.querySelectorAll('.steps__title-btn'),
    blocks = document.querySelectorAll('.steps__descr');

    blocks.forEach(item => {;
        item.classList.add('animate__animated', 'animate__flipInX');
    });

    btns.forEach(item => {
        item.addEventListener('click', function()  {
            this.classList.toggle('steps__title-btn--active');
        });
    });
});