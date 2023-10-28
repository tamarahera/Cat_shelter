const cookie = () => {
    const modal = document.querySelector('.cookie');
    const modalBtn = modal.querySelector('button');

    if (!localStorage.getItem('cats_storage')) {
        modal.classList.add('cookie--active');

        modalBtn.addEventListener('click', () => {
            localStorage.setItem('cats_storage', 'true');
            modal.classList.remove('cookie--active');
        });
    } else {
        modal.classList.remove('cookie--active');
    }
}

export default cookie;