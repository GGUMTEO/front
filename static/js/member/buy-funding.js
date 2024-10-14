document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenu = document.querySelector(".sidebar-menu.mypage");
    const mypageListBox = document.querySelector(".mypage-list-box");
    const iconFold = document.querySelector(".icon-fold");

    sidebarMenu.addEventListener("click", function () {
        // `mypage-list-box`를 숨기거나 표시
        if (
            mypageListBox.style.display === "none" ||
            mypageListBox.style.display === ""
        ) {
            mypageListBox.style.display = "block";
        } else {
            mypageListBox.style.display = "none";
        }

        // 아이콘 방향 변경
        iconFold.classList.toggle("fold-on");
    });
});
