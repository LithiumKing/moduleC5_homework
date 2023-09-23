// Функция для выполнения запроса и отображения картинки
function fetchImage() {
    const widthInput = document.querySelector('#numberInput1');
    const heightInput = document.querySelector('#numberInput2');

    const width = parseInt(widthInput.value, 10);
    const height = parseInt(heightInput.value, 10);

    // Проверяем, что оба числа в диапазоне от 100 до 300 и что они числовые
    if (!isNaN(width) && !isNaN(height) && width >= 100 && width <= 300 && height >= 100 && height <= 300) {
        const url = `https://picsum.photos/${width}/${height}`;

        // Выполняем запрос с использованием fetch
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Ошибка загрузки изображения');
                }
            })
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                // Отображаем полученное изображение
                document.write(`<img src="${imageUrl}" alt="Изображение">`);
            })
            .catch(error => {
                document.write(`Ошибка: ${error.message}`);
            });
    } else {
        // Если числа вне диапазона или не являются числами, выводим сообщение
        document.write('Одно из чисел вне диапазона от 100 до 300 или введено не число');
    }
}

// Вызываем функцию при загрузке страницы
fetchImage();