const alarmContainer1 = document.getElementById("alarm-container-1");
const alarmContainer2 = document.getElementById("alarm-container-2");

const alarmModal1 = document.getElementById("alarm-modal-1");
const alarmModal2 = document.getElementById("alarm-modal-2");

const headerNav = document.getElementById("header-nav");

alarmContainer1.addEventListener("mouseenter", (e) => {
    alarmModal1.style.display = "block";
});

alarmModal1.addEventListener("mouseleave", (e) => {
    alarmModal1.style.display = "none";
});

alarmContainer2.addEventListener("mouseenter", (e) => {
    alarmModal2.style.display = "block";
});

alarmModal2.addEventListener("mouseleave", (e) => {
    alarmModal2.style.display = "none";
});

headerNav.addEventListener("mouseleave", (e) => {
    alarmModal1.style.display = "none";
    alarmModal2.style.display = "none";
});
