// '영상' 또는 '글' 클릭했을 때 해당 div 나옴.
const videoButton = document.getElementById("video-button");
const textButton = document.getElementById("text-button");

const videoWrapper = document.getElementById("video-wrapper");
const textWrapper = document.getElementById("text-wrapper");

videoButton.addEventListener("click", () => {
    videoButton.classList.add("active");
    textButton.classList.remove("active");
    textWrapper.style.display = "none";
    videoWrapper.style.display = "block";
});

textButton.addEventListener("click", () => {
    textButton.classList.add("active");
    videoButton.classList.remove("active");
    videoWrapper.style.display = "none";
    textWrapper.style.display = "block";
});

// 체크박스 전체 선택/해제 기능
const applyCheckboxes = document.querySelectorAll(
    "#video-wrapper .apply-checkbox"
);
const headerCheckbox = document.querySelector(
    "#video-wrapper input[id=select-all]"
);

headerCheckbox.addEventListener("change", function (e) {
    applyCheckboxes.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
    });
});

applyCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const checkedCount = Array.from(applyCheckboxes).filter(
            (checkbox) => checkbox.checked
        ).length;
        headerCheckbox.checked = checkedCount === applyCheckboxes.length;
    });
});

const sortFilterOptions = document.querySelectorAll(
    "#video-wrapper .sort-filter-option"
); //작성일, 조회수, 평점, 신고관리

// 필터링(눌렀을 때)
sortFilterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // selected 클래스 추가/제거
        document
            .querySelector("#video-wrapper .sort-filter-option.selected")
            .classList.remove("selected");
        option.classList.add("selected");
    });
});
