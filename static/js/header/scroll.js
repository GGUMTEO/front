const header = document.querySelector(".header");
const headerHeight = header.offsetHeight;
const headerNav = document.querySelector(".header-nav");

window.onscroll = funtion () {
    let windowTop = window.scrollY;
    if(windowTop >= headerHeight) {
        headerNav.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}
