// Функция для создания элементов DOM
function createElements() {
    const body = document.body;

    const h2Page = document.createElement('h2');
    h2Page.textContent = 'Введите номер страницы (от 1 до 10):';
    body.appendChild(h2Page);

    const pageInput = document.createElement('input');
    pageInput.type = 'number';
    pageInput.min = '1';
    pageInput.max = '10';
    body.appendChild(pageInput);

    const h2Limit = document.createElement('h2');
    h2Limit.textContent = 'Введите лимит (от 1 до 10):';
    body.appendChild(h2Limit);

    const limitInput = document.createElement('input');
    limitInput.type = 'number';
    limitInput.min = '1';
    limitInput.max = '10';
    body.appendChild(limitInput);

    const fetchButton = document.createElement('button');
    fetchButton.textContent = 'Запрос';
    body.appendChild(fetchButton);

    const imageContainer = document.createElement('div');
    imageContainer.id = 'imageContainer';
    body.appendChild(imageContainer);

    // Назначаем обработчик события на кнопку
    fetchButton.addEventListener('click', function () {
        fetchImages(pageInput.value, limitInput.value);
    });

    // Проверяем наличие данных в localStorage при загрузке страницы
    const lastImagesData = localStorage.getItem('lastImages');
    if (lastImagesData) {
        const lastImages = JSON.parse(lastImagesData);
        // Отображаем последние успешно полученные изображения
        imageContainer.innerHTML = '';
        lastImages.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = image.download_url;
            imageContainer.appendChild(imgElement);
        });
    }
}

// Функция для выполнения запроса и отображения картинок
function fetchImages(page, limit) {
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    // Проверяем, что оба числа в диапазоне от 1 до 10 и что они числовые
    if (!isNaN(page) && !isNaN(limit) && page >= 1 && page <= 10 && limit >= 1 && limit <= 10) {
        const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;

        // Выполняем запрос с использованием fetch
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Ошибка загрузки данных');
                }
            })
            .then(data => {
                // Очищаем контейнер с изображениями
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';
                // Отображаем полученные изображения
                data.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.download_url;
                    imageContainer.appendChild(imgElement);
                });

                // Сохраняем данные в localStorage
                localStorage.setItem('lastImages', JSON.stringify(data));
            })
            .catch(error => {
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = `Ошибка: ${error.message}`;
            });
    } else {
        // Если числа вне диапазона или не являются числами, выводим соответствующее сообщение
        const imageContainer = document.getElementById('imageContainer');
        if ((isNaN(page) || page < 1 || page > 10) && (isNaN(limit) || limit < 1 || limit > 10)) {
            imageContainer.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10';
        } else if (isNaN(page) || page < 1 || page > 10) {
            imageContainer.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
        } else {
            imageContainer.innerHTML = 'Лимит вне диапазона от 1 до 10';
        }
    }
}

// Вызываем функцию для создания элементов DOM
createElements();