'use strict';
/**
 * Модальное окно
 */
(function (win, doc) {
    "use strict";
    const modalEl = doc.querySelectorAll("[data-modal]");
    [].forEach.call(modalEl, function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let el = document.getElementById(this.getAttribute("data-modal"));

            if (el === null) throw "DOM element isn't created!";

            const closeModal = e => {
                if (e.key === "Escape" || e.target.className === "modal__close" || e.target.type === "submit") {
                    el.classList.remove("modal_anim");
                    setTimeout(function () {
                        doc.body.classList.remove("modal_open");

                        el.classList.remove("modal_open");

                        el.removeEventListener("click", closeModal);
                        doc.removeEventListener("keydown", closeModal);
                    }, 200)
                }
            };

            const openModal = () => {
                doc.body.classList.add("modal_open");
                el.classList.add("modal_open");
                el.classList.add("modal_anim");
            };

            openModal();

            el.addEventListener("click", closeModal, true);
            doc.addEventListener("keydown", closeModal, false);
        }, false)
    })
})(window, document);

class Product {
    constructor(id, name, desc, quantity, price) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.quantity = quantity;
        this.price = price;
    }
}

var arr = [
    new Product(1,"Товар-1", "Описание товара 1", 1, 100),
    new Product(2, "Товар 2", "Описание товара 2", 1, 200),
    new Product(3, "Товар 3", "Описание товара 3", 1, 300),
];

arr.forEach(item => appendHtml(item));

function random() {
  return Math.round(3 + Math.random() * (10000 - 3));
}

function myFunction() {
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

function appendHtml(product) {
    let productList = document.querySelector('.product');
    let productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.id = product.id;
    productItem.innerHTML = '<div class="product-item__header">' + product.name + '</div><img src="https://via.placeholder.com/300x300"><div class="product-item__info">' + product.desc + '</div><div class="product-item__price">' + product.price + '</div><div class="product-item__remove" onclick="removeItem(this)"></div><input type="number" min="1" required value="1" oninput="quantityChange(this)">';
    productList.appendChild(productItem);
}

function removeItem(el) {
    arr.splice(findElementIndex(el),1);
    el.parentNode.remove();
}

function findElementIndex(el) {
    let id = el.parentNode.id;
    return arr.findIndex(function (el) {
        return el.id == id;
    });
}

function quantityChange(el) {
    let i = findElementIndex(el);
    arr[i].quantity = parseInt(el.value, 10);
}

function sendData() {
    let data = {
        TerminalKey : "TestB",
        Amount : getAmount(),
        OrderId : "SomeOrderId",
        Description : "Test Order",
        Receipt : {
            Email : "test@test.test",
            Taxation : "osn",
            Items : getItems()

        }
    }

    console.table(data);

    fetch("https://securepay.tinkoff.ru/v2/Init", {
        method : "POST",
        body : JSON.stringify(data),
        headers : {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        return response.json();
    }).then(data => console.log(data));
}

function getAmount() {
    let total = 0;
    arr.forEach(el => total += el.price*el.quantity*100);
    return total;
}

function getItems() {
    let items = [];
    arr.forEach(el => {
        items.push({
            "Name": el.name,
            "Price": el.price*100,
            "Quantity": el.quantity.toString(),
            "Amount": el.price*el.quantity*100,
            "Tax": "vat10",
        })
    });
    return items;
}