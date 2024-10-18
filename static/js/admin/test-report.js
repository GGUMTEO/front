// **모달창 기능 구현
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
