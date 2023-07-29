import showActiveCat from "./showActiveCat";

const loadMoreCats = () => {
    const btnLoadMore = document.querySelector('[data-btn="loadMore"]');

    const getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

    btnLoadMore.addEventListener('click', function () {
        getResource('http://localhost:3000/cats')
            .then(res => {
                createItem(res);
                this.remove();
            })
            .catch(error => console.log(error))
    });

    function createItem(response) {
        let sex;

        response.forEach(({ name, srcImg, srcSex, text }) => {
            let item = document.createElement('div');
            item.classList.add('cat__item');
            if ((/venus/ig).test(srcSex)) {
                sex = 'female';
            } else if ((/mars/ig).test(srcSex)) {
                sex = 'male';
            }
            item.setAttribute('data-filter-content', `${sex}`)
            item.innerHTML = `
                <div class="cat__item-front">
                    <picture>
                        <source srcset="${srcImg}.avif" type="image/avif">
                        <source srcset="${srcImg}.webp" type="image/webp">

                        <img src="${srcImg}.jpg" alt="cat" class="cat__item-img">
                    </picture>
                    <div class="cat__item-info">
                        <p class="cat__item-name">${name}</p>
                        <img src="${srcSex}" alt="${sex}" class="cat__item-sex">
                    </div>
                </div>
                <div class="cat__item-back text--17">
                    ${text}
                </div>
            `;
            document.querySelector('.cat__wrapper').appendChild(item);
        });
        showActiveCat();
    }
};

export default loadMoreCats;