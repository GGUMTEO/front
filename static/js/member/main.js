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
        .querySelectorAll(".sidebar-menu.mypage, .highlight-memo, .read-news")
        .forEach((menu) => {
            menu.addEventListener("click", function () {
                if (this.id === "mypage-fold") {
                    // "나의 활동내역"을 클릭했을 때 현재 콘텐츠 유지
                    return;
                }

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

                // "나의 활동내역" 아이콘 상태 업데이트 (접힌 상태일 때 아이콘이 올바르게 표시되도록)
                if (mypageListBox.style.display === "none") {
                    iconFold.classList.add("fold-on");
                } else {
                    iconFold.classList.remove("fold-on");
                }
            });
        });
});
document.addEventListener("DOMContentLoaded", function () {
    const choiceGroups = document.querySelectorAll(".btn-group.choice-group");

    choiceGroups.forEach(function (group) {
        const btnPublic = group.querySelector(".btn-choice.btn-public");
        const btnSecret = group.querySelector(".btn-choice.btn-secret");

        // 클릭 이벤트 설정
        function toggleActiveClass(event) {
            // 두 버튼에 active 클래스를 교환
            btnPublic.classList.toggle("active");
            btnSecret.classList.toggle("active");
        }

        // 각 버튼에 이벤트 리스너 추가
        btnPublic.addEventListener("click", toggleActiveClass);
        btnSecret.addEventListener("click", toggleActiveClass);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // "구매한 사람들" 버튼을 선택합니다.
    const toggleButtons = document.querySelectorAll(
        '.btn-icon-edit-my[name="toggle_btn"]'
    );

    // 모든 setting-table을 숨깁니다.
    const settingTables = document.querySelectorAll(".setting-table");
    settingTables.forEach(function (table) {
        table.style.display = "none"; // 처음엔 숨김
    });

    // 버튼 클릭 시 설정 테이블을 표시/숨김 처리하는 이벤트 리스너
    toggleButtons.forEach(function (button, index) {
        button.addEventListener("click", function () {
            const settingTable = settingTables[index];
            if (
                settingTable.style.display === "none" ||
                settingTable.style.display === ""
            ) {
                settingTable.style.display = "block"; // 보여줍니다.
            } else {
                settingTable.style.display = "none"; // 숨깁니다.
            }
        });
    });
    const toggleReplyBtns = document.querySelectorAll(".btn-wrapper");

    toggleReplyBtns.forEach(function (btn) {
        // 나의모집에서 씁니다 여기부터
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
});
