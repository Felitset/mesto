# Проект: Место (c использованием JavaScript, сборка с помощью Webpack, Api Client)

### Цели:
* Верстка сайта по макету
* Работа с макетом в программе Figma
* Адаптивная верстка под распространенные разрешения экранов с помощью директивы @media
* Верстка модальных окон, в т.ч. с формой ввода данных
* Подключение JavaScript и программирования интерактивности сайта
* Рефакторинг кода по ООП
* Сборка Webpack

**Итоги работы**
В данной работе были использованы знания, полученные на теории этого спринта, а так же двух предыдущих. Применялись основы html и css (Flex, Grid, @media, @import), а так же расширенные их возможности для создания модальных окон и форм ввода данных. Реализовано плавное открытие и закрытие модальных окон. Так же применялись знания дерективы @media для создания адаптива. JavaScript был использован для создания интерактивности сайта(открытие и закрытие модальных окон, загрузка новых данных, валидация форм ввода данных).  Реализовано открытие и закрытие модального окна по нажатию кнопки. Так же добавлены функции закрытия модальных окон по заднему фону и по клавише ESC. Данные из формы переносятся на основную страницу по нажатию кнопки submit. В программировании через JavaScript были использованы: работа с DOM (поиск объектов), объявление переменных, функций, .querySelector(), textContent, addEventListener, enableValidation и др.
Рефакторинг кода по ООП. Внедрение класса карточек галлереи и валидации форм ввода данных в модальных окнах.
Проект выгружен на сервер. Все изменения в проекте делаются через запросы к серверу. Так же с помощью элементов класса ApiWorker редактируется информация на сервере.

**Реализованный функционал**
 * Загрузка карточек через JavaScript из массива данных.
 * Возможность добавления новых карточек в галлерею.
 * Возможность удаления карточек из галлереи.
 * Возможность ставить-убирать лайк на карточку в галлерее.
 * Возможность редактирования данных профиля.
 * Возможность просмотра увеличенной фотографии из карточки по нажатию.
 * Валидация формы ввода данных пользователем.
 * Проект собран с использованием Webpack
 * Добавлен класс ApiWorker, с помощью элементов которого отправляются запросы на сервер
 * Добавлен счетчик лайков. 
 * Удаление картинки подтверждается новым модальным окном. Удаление реализовано только для карточки, загруженной пользователем

### Сcылки:
* [Ссылка на макет в Figma](https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1)
* [Ccылка на проект GitHub](https://felitset.github.io/mesto/)


