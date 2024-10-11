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

    // 유효성 검사 추가
    const inputFields = document.querySelectorAll(".required");

    inputFields.forEach(function (input) {
        input.addEventListener("input", function () {
            if (input.value.trim() !== "") {
                input.classList.remove("input-invalid");
                input.classList.add("input-valid");
            } else {
                input.classList.remove("input-valid");
                input.classList.add("input-invalid");
            }
        });
    });

    // 폼 제출 시 유효성 검사
    const submitButton = document.querySelector(".btn-submit");
    submitButton.addEventListener("click", function (event) {
        let isValid = true;

        inputFields.forEach(function (input) {
            if (input.value.trim() === "") {
                input.classList.add("input-invalid");
                isValid = false;
            }
        });

        if (!isValid) {
            event.preventDefault();
            alert("필수 항목을 모두 작성해 주세요.");
        }
    });
});
function resizeTextarea(textarea) {
    textarea.style.height = "auto"; // 높이를 초기화하여 스크롤이 생기지 않게 함
    textarea.style.height = textarea.scrollHeight + 2 + "px"; // 내용을 포함할 만큼 높이 조절
}

// 페이지 로딩 후 초기화
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("textarea[name='description']");
    resizeTextarea(textarea);
});
