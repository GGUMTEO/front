const searchBox = document.getElementById("search-box");
const searchFullModal = document.getElementById("search-full-modal");
const closeIcon = document.getElementById("close-icon");
const backgroundOverlay = document.getElementById("background-overlay");

searchBox.addEventListener("click", () => {
    searchFullModal.style.display = "block";
});

closeIcon.addEventListener("click", () => {
    searchFullModal.style.display = "none";
});

backgroundOverlay.addEventListener("click", () => {
    searchFullModal.style.display = "none";
});
