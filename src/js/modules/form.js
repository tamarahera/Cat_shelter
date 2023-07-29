const form = () => {
    const form = document.querySelector('form'),
        inputs = document.querySelectorAll('input'),
        textareas = document.querySelectorAll('textarea'),
        checkbox = document.querySelector('.contact__policy-checkbox');

    if (localStorage.getItem('isChecked')) {
        checkbox.checked = true;
    }

    checkbox.addEventListener('change', () => {
        localStorage.setItem('isChecked', true);
    });
        
    const message = {
        loading: 'Loading...',
        success: 'Thanks! We will answer as soon as possible.',
        error: 'Something goes wrong.'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let result = await fetch(url, {
            method: 'POST',
            body: data
        });
        return await result.text();
    };

    const resetInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
        textareas.forEach(item => {
            item.value = '';
        });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div'); // ств блок, а який вставимо повідомлення для корист
        statusMessage.classList.add('status');
        form.appendChild(statusMessage);

        const formData = new FormData(form); // або JSON

        postData('server.php', formData)
            .then(result => {
                console.log(result)
                statusMessage.textContent = message.success;
            })
            .catch(() => {
                statusMessage.textContent = message.error;
            })
            .finally(() => {
                resetInputs();
                setTimeout(() => {
                    statusMessage.remove();
                }, 4000);
            })
    });
};

export default form;