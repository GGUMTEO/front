// *******************'영상' 또는 '글' 클릭했을 때 해당 div 나옴.
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

// ********************체크박스 전체 선택/해제 기능
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

// *********************수정 모달창
const editBtns = document.querySelectorAll("#edit-btn");
const editFullModal = document.getElementById("edit-full-modal");
const closeButton = document.getElementById("close-button");
const backgroundOverlay = document.querySelector(
    "#edit-full-modal .background-overlay"
);

// 수정 버튼 클릭했을 때
editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
        // 모달창 나옴.
        editFullModal.style.display = "block";
    });
});

// 닫기 버튼 클릭했을 때
closeButton.addEventListener("click", () => {
    // 모달창 사라짐.
    editFullModal.style.display = "none";
});

// 백그라운드 클릭했을 때
backgroundOverlay.addEventListener("click", () => {
    // 모달창 사라짐.
    editFullModal.style.display = "none";
});

// ****************신고 관리 모달창
const reportManagements = document.querySelectorAll("#report-management");
const reportManagementModal = document.getElementById(
    "report-management-modal"
);
const btnComplete = document.getElementById("btn-complete");
const reportBackgroundOverlay = document.querySelector(
    "#report-management-modal .background-overlay"
);

// 신고관리 버튼 클릭했을 때
reportManagements.forEach((reportManagement) => {
    reportManagement.addEventListener("click", () => {
        // 모달창 나옴.
        reportManagementModal.style.display = "flex";
    });
});

// 백그라운드 클릭했을 때
reportBackgroundOverlay.addEventListener("click", () => {
    // 모달창 사라짐.
    reportManagementModal.style.display = "none";
});

const choiceButtons = document.querySelectorAll(
    ".choice-container > input[type=button]"
);

choiceButtons.forEach((choiceButton, i) => {
    choiceButton.addEventListener("click", (e) => {
        const clickedIndex = i;

        choiceButtons.forEach((choice, index) => {
            if (index !== clickedIndex) {
                choice.classList.remove("on");
            }
        });

        choiceButtons[clickedIndex].classList.toggle("on");

        console.log(choiceButtons[clickedIndex].classList.contains("on"));
    });
});

btnComplete.addEventListener("click", () => {
    // 버튼 클릭 시 상태 확인
    updateCodeState();
});

function updateCodeState() {
    let anyChoiseSelected = false;

    // choiceButtons "on" 클래스를 가진 항목이 있는지 확인
    choiceButtons.forEach((choice) => {
        if (choice.classList.contains("on")) {
            anyChoiseSelected = true;
        }
    });

    // 선택된 항목이 있으면 모달창이 닫힌다.
    if (anyChoiseSelected) {
        alert("저장합니다.");
        reportManagementModal.style.display = "none";
    } else {
        alert("선택해주세요.");
    }
}
