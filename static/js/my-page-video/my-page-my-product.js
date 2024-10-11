document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenu = document.querySelector(".sidebar-menu.scrapbook");
    const scrapbookListBox = document.querySelector(".scrapbook-list-box");
    const iconFold = document.querySelector(".icon-fold");

    sidebarMenu.addEventListener("click", function () {
        // `scrapbook-list-box`를 숨기거나 표시
        if (
            scrapbookListBox.style.display === "none" ||
            scrapbookListBox.style.display === ""
        ) {
            scrapbookListBox.style.display = "block";
        } else {
            scrapbookListBox.style.display = "none";
        }

        // 아이콘 방향 변경
        iconFold.classList.toggle("fold-on");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const btnPublic = document.querySelector(".btn-choice.btn-public");
    const btnSecret = document.querySelector(".btn-choice.btn-secret");

    // 클릭 이벤트 설정
    function toggleActiveClass(event) {
        // 두 버튼에 active 클래스를 교환
        btnPublic.classList.toggle("active");
        btnSecret.classList.toggle("active");
    }

    // 두 버튼에 이벤트 리스너 추가
    btnPublic.addEventListener("click", toggleActiveClass);
    btnSecret.addEventListener("click", toggleActiveClass);
});
