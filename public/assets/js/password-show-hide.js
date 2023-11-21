/*=====================
    Password Show Hide Js
==========================*/
var password = document.getElementById("pass");
var toggler = document.getElementById("toggler");

showHidePassword = () => {
    if (password.type == "password") {
        password.setAttribute("type", "text");
        toggler.classList.add("ri-eye-line");
    } else {
        toggler.classList.remove("ri-eye-off-line");
        password.setAttribute("type", "password");
    }
};

toggler.addEventListener("click", showHidePassword);