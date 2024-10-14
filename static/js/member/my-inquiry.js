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
    // "구매한 사람들" 버튼을 선택합니다.
    const toggleButtons = document.querySelectorAll(
        '.btn-icon-edit-scrap[name="toggle_btn"]'
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
