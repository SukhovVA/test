/**
 * Модальное окно
 */
(function (win, doc) {
    "use strict";
    const modalEl = doc.querySelectorAll("[data-modal]");
console.log(modalEl);
    [].forEach.call(modalEl, function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let el = document.getElementById(this.getAttribute("data-modal"));

            if (el === null) throw "DOM element isn't created!";

            const closeModal = e => {
                if (e.target === el || e.key === "Escape" || e.target.className === "modal__close" || e.target.className === "bt bt_center") {
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