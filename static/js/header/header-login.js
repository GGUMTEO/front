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

// **알람 모달 기능구현
const notiContainer1 = document.getElementById("noti-bell-container-1");
const notiContainer2 = document.getElementById("noti-bell-container-2");

const notiModal1 = document.getElementById("noti-modal-1");
const notiModal2 = document.getElementById("noti-modal-2");

// header는 스크롤 기능 구현(맨 위)에서 선언해둠.
// const header = document.getElementById("header");

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

header.addEventListener("mouseleave", (e) => {
    notiModal1.style.display = "none";
    notiModal2.style.display = "none";
});
