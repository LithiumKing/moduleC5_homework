// Создаем элементы DOM программно
const h1 = document.createElement('h1');
h1.textContent = 'Введите число от 1 до 10 и нажмите кнопку:';
document.body.appendChild(h1);

const input = document.createElement('input');
input.type = 'number';
input.min = '1';
input.max = '10';
document.body.appendChild(input);

const button = document.createElement('button');
button.textContent = 'Получить картинки';
document.body.appendChild(button);

const imageContainer = document.createElement('div');
imageContainer.id = 'imageContainer';
document.body.appendChild(imageContainer);

// Функция для выполнения запроса и отображения картинок
function fetchImages() {
    const number = parseInt(input.value, 10);

    // Проверяем, что число в диапазоне от 1 до 10
    if (number >= 1 && number <= 10) {
        const url = `https://picsum.photos/v2/list?limit=${number}`;

        // Выполняем запрос с использованием XHR (XMLHttpRequest)
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                // Очищаем контейнер с изображениями
                imageContainer.innerHTML = '';
                // Отображаем полученные изображения
                data.forEach(image => {
                    const imgElement = document.createElement('img');
                    imgElement.src = image.download_url;
                    imageContainer.appendChild(imgElement);
                });
            }
        };
        xhr.send();
    } else {
        // Если число вне диапазона, выводим сообщение
        imageContainer.innerHTML = 'Число вне диапазона от 1 до 10';
    }
}

// Назначаем обработчик события на кнопку
button.addEventListener('click', fetchImages);