const alarmContainer1 = document.getElementById("alarm-container-1");
const alarmContainer2 = document.getElementById("alarm-container-2");

const alarmBox1 = document.getElementById("alarm-box-1");
const alarmBox2 = document.getElementById("alarm-box-2");

const header = document.getElementById("header");

alarmContainer1.addEventListener("mouseenter", (e) => {
    alarmBox1.style.display = "block";
});

alarmBox1.addEventListener("mouseleave", (e) => {
    alarmBox1.style.display = "none";
});

alarmContainer2.addEventListener("mouseenter", (e) => {
    alarmBox2.style.display = "block";
});

alarmBox2.addEventListener("mouseleave", (e) => {
    alarmBox2.style.display = "none";
});

header.addEventListener("mouseleave", (e) => {
    alarmBox1.style.display = "none";
    alarmBox2.style.display = "none";
});
