window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("open");
    }, 300);

    setTimeout(() => {
        loader.classList.add("hide");
    }, 2800);

});