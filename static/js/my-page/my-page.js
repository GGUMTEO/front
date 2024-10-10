document.addEventListener("DOMContentLoaded", function () {
    const iconFold = document.querySelector(".icon-fold");
    const scrapbookListBox = document.querySelector(".scrapbook-list-box");

    iconFold.addEventListener("click", function () {
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
