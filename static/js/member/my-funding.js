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
});
