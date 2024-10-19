// ####작품 관리####

// ***********'영상' 또는 '글' 클릭했을 때 해당 div 나옴.
const videoButton = document.querySelector("#work-section .video-button");
const textButton = document.querySelector("#work-section .text-button");

const videoWrapper = document.querySelector("#work-section .video-wrapper");
const textWrapper = document.querySelector("#work-section .text-wrapper");

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

// !!!!!!!!!!!!!!!! 영상 !!!!!!!!!!!!!!!!!!!

// ***********영상 >> 체크박스 전체 선택/해제 기능
const applyCheckboxes = document.querySelectorAll(
    "#work-section .video-wrapper .apply-checkbox"
);
const headerCheckbox = document.querySelector(
    "#work-section .video-wrapper input[class=select-all]"
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
    "#work-section .video-wrapper .sort-filter-option"
); //작성일, 조회수, 평점, 신고관리

// 필터링(눌렀을 때)
sortFilterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // selected 클래스 추가/제거
        document
            .querySelector(
                "#work-section .video-wrapper .sort-filter-option.selected"
            )
            .classList.remove("selected");
        option.classList.add("selected");
    });
});

// ****************신고 관리 모달창
const reportManagements = document.querySelectorAll(
    "#work-section .video-wrapper .report-management-btn"
);
const reportManagementModal = document.querySelector(
    "#work-section .video.report-management-modal"
);
const btnComplete = document.querySelector(
    "#work-section .video.report-management-modal .btn-complete"
);
const reportBackgroundOverlay = document.querySelector(
    "#work-section .video.report-management-modal .background-overlay"
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
    "#work-section .video.report-management-modal .choice-container > input[type=button]"
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
});

// *********************신고 내역 모달창
const reasonsReportBtns = document.querySelectorAll(
    "#work-section .video-wrapper .reasons-report-btn"
);
const reasonsReportModal = document.querySelector(
    "#work-section .video.reasons-report-modal"
);
const closeButton = document.querySelector(
    "#work-section .video.reasons-report-modal .close-btn"
);
const backgroundOverlay = document.querySelector(
    "#work-section .video.reasons-report-moda .background-overlay"
);

// 신고 사유 버튼 클릭했을 때
reasonsReportBtns.forEach((reasonsReportBtn) => {
    reasonsReportBtn.addEventListener("click", () => {
        // 모달창 나옴.
        reasonsReportModal.style.display = "flex";
    });
});
// 닫기 버튼 클릭했을 때
closeButton.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal.style.display = "none";
});
// 백그라운드 클릭했을 때
backgroundOverlay.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal.style.display = "none";
});

// !!!!!!!!!!!!!!!! 글 !!!!!!!!!!!!!!!!!!!

// 체크박스 전체 선택/해제 기능
const applyCheckboxes = document.querySelectorAll(
    "#work-section .video-wrapper .apply-checkbox"
);
const headerCheckbox = document.querySelector(
    "#work-section .video-wrapper input[class=select-all]"
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
    "#work-section .video-wrapper .sort-filter-option"
); //작성일, 조회수, 평점, 신고관리

// 필터링(눌렀을 때)
sortFilterOptions.forEach((option) => {
    option.addEventListener("click", () => {
        // selected 클래스 추가/제거
        document
            .querySelector(
                "#work-section .video-wrapper .sort-filter-option.selected"
            )
            .classList.remove("selected");
        option.classList.add("selected");
    });
});

// ****************신고 관리 모달창
const reportManagements = document.querySelectorAll(
    "#work-section .video-wrapper .report-management-btn"
);
const reportManagementModal = document.querySelector(
    "#work-section .video.report-management-modal"
);
const btnComplete = document.querySelector(
    "#work-section .video.report-management-modal .btn-complete"
);
const reportBackgroundOverlay = document.querySelector(
    "#work-section .video.report-management-modal .background-overlay"
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
    "#work-section .video.report-management-modal .choice-container > input[type=button]"
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
});

// *********************신고 내역 모달창
const reasonsReportBtns = document.querySelectorAll(
    "#work-section .video-wrapper .reasons-report-btn"
);
const reasonsReportModal = document.querySelector(
    "#work-section .video.reasons-report-modal"
);
const closeButton = document.querySelector(
    "#work-section .video.reasons-report-modal .close-btn"
);
const backgroundOverlay = document.querySelector(
    "#work-section .video.reasons-report-moda .background-overlay"
);

// 신고 사유 버튼 클릭했을 때
reasonsReportBtns.forEach((reasonsReportBtn) => {
    reasonsReportBtn.addEventListener("click", () => {
        // 모달창 나옴.
        reasonsReportModal.style.display = "flex";
    });
});
// 닫기 버튼 클릭했을 때
closeButton.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal.style.display = "none";
});
// 백그라운드 클릭했을 때
backgroundOverlay.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal.style.display = "none";
});
