'use strict';

let books = document.querySelector('.books');
let book = document.getElementsByClassName('book');

// Восстановление порядка книг
books.prepend(book[1]);
book[1].after(book[4]);         // book[4] - Книга 3
book[5].after(book[3]);

// Изменение фоновой картинки
document.body.style.background = 'url(./image/you-dont-know-js.jpg)';

// Изменение заголовка в книге 3
let h2 = document.getElementsByTagName('h2');
h2[2].innerHTML = '<a href="https://github.com/azat-io/you-dont-know-js-ru/blob/master/this%20%26%20object%20prototypes/README.md#you-dont-know-js-this--object-prototypes" target="_blank">Книга 3. this и Прототипы Объектов</a>';

// Удаление рекламы
document.querySelector('.adv').remove();

// Восстановление порядка глав во 2-ой книге
let liTwo = book[1].querySelectorAll('li');
liTwo[9].after(liTwo[2]);
liTwo[3].after(liTwo[6]);
liTwo[4].before(liTwo[8]);

// Восстановление порядка глав во 5-ой книге
let liFive = book[4].querySelectorAll('li');
liFive[4].after(liFive[2]);
liFive[7].after(liFive[5]);
liFive[1].after(liFive[9]);

// Добавление главы в 6 книгу
let liSix = book[5].querySelectorAll('li');
let innerChapter = document.createElement('li');
innerChapter.innerText = 'Глава 8: За пределами ES6';
liSix[8].after(innerChapter);