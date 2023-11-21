var selector = ".size-list li";

document.querySelectorAll(selector).forEach(function (element) {
    element.addEventListener("click", function () {
        document.querySelectorAll(selector).forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
    });
});