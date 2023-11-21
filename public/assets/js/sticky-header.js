/*=====================
    Sticky Header Js
==========================*/
const header = document.querySelector(".js-header");
const section = document.querySelector(".js-section");

function onScroll() {
    if (window.pageYOffset) {
        header.classList.add("is-active");
        section.classList.add("is-active");
    } else {
        header.classList.remove("is-active");
        section.classList.remove("is-active");
    }
}


window.addEventListener('scroll', onScroll);