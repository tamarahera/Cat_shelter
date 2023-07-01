const filter = () => {
    const menuBtns = document.querySelector('.cat__filter'),
        buttons = document.querySelectorAll('.cat__filter-btn');
    let contentAll;

    const typeFilter = (contentType) => {
        contentAll.forEach(item => {
            item.style.display = 'none';
        });

        if (contentType) {
            contentType.forEach(item => {
                item.style.display = 'block';
            });
        };
    };

    function showFiltredItems(attribute) {
        let items;

        if (attribute === 'all') {
            items = contentAll;
        } else {
            items = document.querySelectorAll(`[data-filter-content="${attribute}"]`);
        }

        typeFilter(items);
    }

    menuBtns.addEventListener('click', (e) => {
        if (!contentAll) {
            contentAll = document.querySelectorAll('.cat__item');
        }
        let target = e.target;
        if (target && target.tagName == 'BUTTON') {
            buttons.forEach(item => item.classList.remove('cat__filter-btn--active'));
            target.classList.add('cat__filter-btn--active');

            let attribute = target.getAttribute('data-filter-btn');

            showFiltredItems(attribute);
        }
    });

    try {
        const loadBtn = document.querySelector('[data-btn="loadMore"]');

        loadBtn.addEventListener('click', () => {
            let attributeActiveBtn = Array.from(buttons).find(item => item.classList.contains('cat__filter-btn--active')).getAttribute('data-filter-btn');

            setTimeout(() => {
                contentAll = document.querySelectorAll('.cat__item');
                showFiltredItems(attributeActiveBtn);
            }, 600);
        })
    } catch { }
};

export default filter;