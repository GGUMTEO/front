document.addEventListener("DOMContentLoaded", function () {
    // 첫 번째 기능: 사이드바 접기/펼치기
    const sidebarToggle = document.querySelector("#mypage-fold");
    const mypageListBox = document.querySelector("#mypage-list");
    const iconFold = document.querySelector(".icon-fold");

    if (sidebarToggle && mypageListBox && iconFold) {
        sidebarToggle.addEventListener("click", function () {
            // `mypage-list-box`를 숨기거나 표시 (사이드바의 나머지 항목들 접기/펼치기)
            mypageListBox.style.display =
                mypageListBox.style.display === "none" ? "block" : "none";

            // 아이콘 방향 변경
            iconFold.classList.toggle("fold-on");
        });
    }

    // 페이지가 처음 로드될 때 기본 콘텐츠 표시 (my-main)
    const defaultContent = document.getElementById("my-main");
    if (defaultContent) {
        defaultContent.classList.add("active");
    }

    // 사이드바 메뉴 클릭 이벤트 설정 (내 활동내역 이외의 메뉴들)
    document
        .querySelectorAll(".sidebar-menu.mypage:not(#mypage-fold)")
        .forEach((menu) => {
            menu.addEventListener("click", function () {
                // 모든 콘텐츠에서 active 클래스 제거 (콘텐츠 숨기기)
                document
                    .querySelectorAll(".main-content-container .content")
                    .forEach((content) => {
                        content.classList.remove("active");
                    });

                // 선택한 콘텐츠만 active 클래스 추가 (콘텐츠 표시)
                const contentId = this.getAttribute("name") + "-content";
                const selectedContent = document.getElementById(contentId);
                if (selectedContent) {
                    selectedContent.classList.add("active");
                }

                // 모든 사이드바 메뉴에서 active-menu 클래스 제거
                document.querySelectorAll(".sidebar-menu").forEach((item) => {
                    item.classList.remove("active-menu");
                });

                // 클릭된 메뉴에 active-menu 클래스 추가
                this.classList.add("active-menu");
            });
        });
});
