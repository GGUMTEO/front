document.addEventListener("DOMContentLoaded", function () {
    // 사이드바 메뉴 토글 기능
    const sidebarMenu = document.querySelector(".sidebar-menu.mypage");
    const mypageListBox = document.querySelector(".mypage-list-box");
    const iconFold = document.querySelector(".icon-fold");

    if (sidebarMenu) {
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
    }

    const toggleReplyBtns = document.querySelectorAll(".btn-wrapper");

    toggleReplyBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const replyId = this.getAttribute("data-reply"); // 각 버튼에 설정된 data-reply 값 가져오기
            const replySection = document.getElementById(
                `replySection${replyId}`
            ); // data-reply에 해당하는 replySection 찾기
            if (
                replySection.style.display === "none" ||
                replySection.style.display === ""
            ) {
                replySection.style.display = "block"; // 보이도록 변경
            } else {
                replySection.style.display = "none"; // 다시 숨김
            }
        });
    });

    const choiceGroups = document.querySelectorAll(".btn-group.choice-group");

    choiceGroups.forEach(function (group) {
        const btnPublic = group.querySelector(".btn-choice.btn-public");
        const btnSecret = group.querySelector(".btn-choice.btn-secret");

        function toggleActiveClass() {
            btnPublic.classList.toggle("active");
            btnSecret.classList.toggle("active");
        }

        btnPublic.addEventListener("click", toggleActiveClass);
        btnSecret.addEventListener("click", toggleActiveClass);
    });
});
