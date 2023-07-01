const tabs = () => {
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
        showTabs(tabIndex += 1);
    }, 6000);
};

export default tabs;