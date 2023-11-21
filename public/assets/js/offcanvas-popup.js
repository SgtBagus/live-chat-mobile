/*=====================
    Offcanvas Popup Js
==========================*/
window.addEventListener("load", (event) => {
    var myOffcanvas = document.getElementById("offcanvas");
    var bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
    bsOffcanvas.show();
});