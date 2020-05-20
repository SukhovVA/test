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
                if (e.target === el || e.key === "Escape" || e.target.className === "modal__close" || e.target.type === "submit") {
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
    new Product(1, "Товар-1", "Описание товара 1", 1, 100),
    new Product(2, "Товар 2", "Описание товара 2", 1, 200),
    new Product(3, "Товар 3", "Описание товара 3", 1, 300),
];

(function f() {
    arr.forEach(item => appendHtml(item));
})(window,document)

function myFunction() {
    let form = document.querySelector("form");
    let product = new Product();
    product.id = arr.length;
    console.log(form.elements);
    product.name = form.elements.name.value;
    product.desc = form.elements.desc.value;
    product.quantity = form.elements.quantity.value;
    product.price = form.elements.price.value;
    form.reset();
    appendHtml(product);
    console.log(arr)
}

function appendHtml(product) {
    let productList = document.querySelector('.product');
    let productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.id = product.id;
    productItem.innerHTML = '<div class="product-item__header">' + product.name + '</div><div class="product-item__info">' + product.desc + '</div><div class="product-item__price">' + product.price + '</div><div class="product-item__remove" onclick="removeItem(this)"></div>';
    productList.appendChild(productItem);
}

function removeItem(el) {
    el.parentNode.remove();
}

// (function () {
//     let products = document.querySelector('.product');
//     for (let i = 0; arr.length; i++) {
//         // let productItem = document.createElement('div');
//         //     productItem = products.appendChild(productItem);
//         //     productItem.classList.add("asdfaf");
//         // console.log(arr[0].name);
//     }
// })(window,document)