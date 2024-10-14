const searchBox = document.getElementById("search-box");
const searchFullModal = document.getElementById("search-full-modal");
const iconClose = document.getElementById("icon-close");
const backgroundOverlay = document.getElementById("background-overlay");

searchBox.addEventListener("click", () => {
    searchFullModal.style.display = "block";
});

iconClose.addEventListener("click", () => {
    searchFullModal.style.display = "none";
});

backgroundOverlay.addEventListener("click", () => {
    searchFullModal.style.display = "none";
});

const searchInput = document.getElementById("search-input");

searchInput.focus;

console.log(searchInput.focus);
