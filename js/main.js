'use strict';

/**
 * Класс для единицы товара
 */
class Product {
    constructor(id, name, desc, quantity, price) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.quantity = quantity;
        this.price = price;
    }
}

/**
 * Массив с заранее созданными товарами
 */
var arr = [
    new Product(1, "Товар-1", "Описание товара 1", 1, 100),
    new Product(2, "Товар 2", "Описание товара 2", 1, 200),
    new Product(3, "Товар 3", "Описание товара 3", 1, 300),
];
/**
 * Наполнение страницы
 */
arr.forEach(item => appendHtml(item));

/**
 * Генерация id
 * @returns {number}
 */
function random() {
    return Math.round(3 + Math.random() * (10000 - 3));
}

/**
 * Добавление товара из формы
 */
function formSubmit() {
    let form = document.querySelector("form");
    let product = new Product();
    product.id = random();
    product.name = form.elements.name.value;
    product.desc = form.elements.desc.value;
    product.quantity = form.elements.quantity.value;
    product.price = form.elements.price.value;
    form.reset();
    appendHtml(product, arr.length);
    arr.push(product);
}

/**
 * Хэлпер для создания DOM элементов
 * @param product
 */
function appendHtml(product) {
    let productList = document.querySelector('.product');
    let productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = '<div class="product-item__header">' + product.name + '</div><img src="https://via.placeholder.com/300x300"><div class="product-item__info">' + product.desc + '</div><div class="product-item__price">' + product.price + ' &#8381;</div><div class="product-item__remove" onclick="removeItem(this, ' + product.id + ')"></div><input type="number" min="1" required value="1" oninput="quantityChange(this, ' + product.id + ')">';
    productList.appendChild(productItem);
}

/**
 * Удаление элементов из массива товаров и удаление DOM
 * @param el - товар с фронта
 * @param id - ижентификатор товара
 */
function removeItem(el, id) {
    arr.splice(findElementIndex(id), 1);
    el.parentNode.remove();
}

/**
 * Хэлпер для поиска по массиву товаров
 * @returns {number} - индекс товара в массиве товаров
 * @param id - идентификатор товара
 */
function findElementIndex(id) {
    return arr.findIndex(function (el) {
        return el.id == id;
    });
}

/**
 * Функционал изменения количества товаров
 * @param el - элемент передаваемый с фронта
 * @param id - идентификатор товара
 */
function quantityChange(el, id) {
    let i = findElementIndex(id);
    arr[i].quantity = parseInt(el.value, 10);
}

/**
 * Формирование запроса
 * POST запрос на сервер
 */
function sendData() {
    let data = {
        TerminalKey: "TinkoffBankTest",
        Amount: getAmount(), // тут строка, в Receipt - число
        OrderId: "12354", // по неведомой причине - только числа
        Description: "Test Order",
        Receipt: {
            Email: "test@test.test",
            Taxation: "osn",
            Items: getItems()

        }
    }

    fetch("https://securepay.tinkoff.ru/v2/Init", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(data => {
                if (data.hasOwnProperty("PaymentURL")) {
                    window.location.href = data.PaymentURL;
                } else {
                    alert('Нет товаров!');
                }
            }
        )
}

/**
 * Подсчёт суммы для всего чека
 * @returns {string} - строковое значение суммы товаров в корзине
 */
function getAmount() {
    let total = 0;
    arr.forEach(el => total += el.price * el.quantity * 100);
    return total.toString();
}

/**
 * Формирование массива товаров
 * @returns {[]} - массив товаров в виде объектов
 */
function getItems() {
    let items = [];
    arr.forEach(el => {
        items.push({
            "Name": el.name,
            "Price": el.price * 100,
            "Quantity": el.quantity.toString(),
            "Amount": el.price * el.quantity * 100,
            "Tax": "vat10",
        })
    });
    return items;
}