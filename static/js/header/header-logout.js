// **스크롤 기능 구현
const header = document.querySelector(".header");
const headerHeight = header.offsetHeight;
const headerNav = document.querySelector(".header-nav");

console.log(header);
console.log(headerHeight);
console.log(headerNav);

window.onscroll = function () {
    let windowTop = window.scrollY;
    if (windowTop >= headerHeight) {
        headerNav.classList.add("sticky");
    } else {
        headerNav.classList.remove("sticky");
        console.log(header.classList.remove("sticky"));
    }
};

// **검색창 기능 구현
const searchBox = document.getElementById("search-box");
const searchFullModal = document.getElementById("search-full-modal");
const iconClose = document.getElementById("icon-close");
const backgroundOverlay = document.getElementById("background-overlay");
const searchInput = document.getElementById("search-input");

// 검색 아이콘 클릭했을 때
searchBox.addEventListener("click", () => {
    // 검색창 나옴.
    searchFullModal.style.display = "block";
    // 바로 커서 깜박임 기능
    searchInput.focus();
    window.scrollTo({ top: 0 });
});

// 닫기 아이콘 클릭했을 때
iconClose.addEventListener("click", () => {
    // 검색창 사라짐.
    searchFullModal.style.display = "none";
});

// 백그라운드 클릭했을 때
backgroundOverlay.addEventListener("click", () => {
    // 검색창 사라짐.
    searchFullModal.style.display = "none";
});
