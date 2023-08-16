const accordion = () => {
    const btns = document.querySelectorAll('.steps__title-btn'),
        blocks = document.querySelectorAll('.steps__descr');

    blocks.forEach(item => {
        item.classList.add('animate__animated', 'animate__flipInX');
    });

    btns.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('steps__title-btn--active');
        });
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter')
            this.classList.toggle('steps__title-btn--active');
        });
    });
};

export default accordion;