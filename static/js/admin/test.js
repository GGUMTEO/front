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

// 체크박스 클릭했을 때 기능 구현(수정 필요!)
// const headerCheckbox = document.getElementById("select-all"); // 헤더 체크박스
// const applyCheckboxes = document.querySelectorAll(".apply-checkbox");

// document.addEventListener("DOMContentLoaded", function () {
//     // 모든 체크박스를 제어하는 함수
//     function toggleAllCheckboxes(isChecked) {
//         applyCheckboxes.forEach((checkbox) => {
//             checkbox.checked = isChecked;
//         });
//     }

//     // 헤더 체크박스를 클릭하면 모든 체크박스의 상태를 변경
//     headerCheckbox.addEventListener("change", function () {
//         toggleAllCheckboxes(this.checked);
//     });

//     // 각 목록의 체크박스를 클릭하면, 하나라도 체크가 해제되면 헤더 체크박스를 해제
//     applyCheckboxes.forEach((checkbox) => {
//         checkbox.addEventListener("change", function () {
//             if (!this.checked) {
//                 headerCheckbox.checked = false;
//             } else {
//                 // 모든 목록의 체크박스가 체크되었는지 확인
//                 const allChecked = Array.from(applyCheckboxes).every(
//                     (cb) => cb.checked
//                 );
//                 headerCheckbox.checked = allChecked;
//             }
//         });
//     });
// });

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
