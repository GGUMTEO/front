const notiContainer1 = document.getElementById("noti-bell-container-1");
const notiContainer2 = document.getElementById("noti-bell-container-2");

const notiModal1 = document.getElementById("noti-modal-1");
const notiModal2 = document.getElementById("noti-modal-2");

const headerNav = document.getElementById("header-nav");

notiContainer1.addEventListener("mouseenter", (e) => {
    notiModal1.style.display = "block";
});

notiModal1.addEventListener("mouseleave", (e) => {
    notiModal1.style.display = "none";
});

notiContainer2.addEventListener("mouseenter", (e) => {
    notiModal2.style.display = "block";
});

notiModal2.addEventListener("mouseleave", (e) => {
    notiModal2.style.display = "none";
});

headerNav.addEventListener("mouseleave", (e) => {
    notiModal1.style.display = "none";
    notiModal2.style.display = "none";
});
