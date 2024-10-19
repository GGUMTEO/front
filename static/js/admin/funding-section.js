// ####펀딩 관리####

///////////////////////////////////////////////////////////////////
// !!!!!!!!!!!!!!!! 1.영상 !!!!!!!!!!!!!!!!!!!

// *********** 체크박스 전체 선택/해제 기능
const applyCheckboxes1 = document.querySelectorAll(
    "#funding-section .video-wrapper .apply-checkbox"
);
const headerCheckbox1 = document.querySelector(
    "#funding-section .video-wrapper input[class=select-all]"
);

headerCheckbox1.addEventListener("change", function (e) {
    applyCheckboxes1.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
    });
});
applyCheckboxes1.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const checkedCount = Array.from(applyCheckboxes1).filter(
            (checkbox) => checkbox.checked
        ).length;
        headerCheckbox1.checked = checkedCount === applyCheckboxes1.length;
    });
});

const sortFilterOptions1 = document.querySelectorAll(
    "#funding-section .video-wrapper .sort-filter-option"
); //작성일, 조회수, 평점, 신고관리

// 필터링(눌렀을 때)
sortFilterOptions1.forEach((option) => {
    option.addEventListener("click", () => {
        // selected 클래스 추가/제거
        document
            .querySelector(
                "#funding-section .video-wrapper .sort-filter-option.selected"
            )
            .classList.remove("selected");
        option.classList.add("selected");
    });
});

// ****************신고 관리 모달창
const reportManagements1 = document.querySelectorAll(
    "#funding-section .video-wrapper .report-management-btn"
);
const reportManagementModal1 = document.querySelector(
    "#funding-section .video.report-management-modal"
);
const btnComplete1 = document.querySelector(
    "#funding-section .video.report-management-modal .btn-complete"
);
const reportBackgroundOverlay1 = document.querySelector(
    "#funding-section .video.report-management-modal .background-overlay"
);

// 신고관리 버튼 클릭했을 때
reportManagements1.forEach((reportManagement) => {
    reportManagement.addEventListener("click", () => {
        // 모달창 나옴.
        reportManagementModal1.style.display = "flex";
    });
});
// 백그라운드 클릭했을 때
reportBackgroundOverlay1.addEventListener("click", () => {
    // 모달창 사라짐.
    reportManagementModal1.style.display = "none";
});

const choiceButtons1 = document.querySelectorAll(
    "#funding-section .video.report-management-modal .choice-container > input[type=button]"
);

choiceButtons1.forEach((choiceButton, i) => {
    choiceButton.addEventListener("click", (e) => {
        const clickedIndex = i;
        choiceButtons1.forEach((choice, index) => {
            if (index !== clickedIndex) {
                choice.classList.remove("on");
            }
        });
        choiceButtons1[clickedIndex].classList.toggle("on");
        console.log(choiceButtons1[clickedIndex].classList.contains("on"));
    });
});

btnComplete1.addEventListener("click", () => {
    let anyChoiseSelected = false;
    // choiceButtons "on" 클래스를 가진 항목이 있는지 확인
    choiceButtons1.forEach((choice) => {
        if (choice.classList.contains("on")) {
            anyChoiseSelected = true;
        }
    });
    // 선택된 항목이 있으면 모달창이 닫힌다.
    if (anyChoiseSelected) {
        alert("저장합니다.");
        reportManagementModal1.style.display = "none";
    } else {
        alert("선택해주세요.");
    }
});

// *********************신고 내역 모달창
const reasonsReportBtns1 = document.querySelectorAll(
    "#funding-section .video-wrapper .reasons-report-btn"
);
const reasonsReportModal1 = document.querySelector(
    "#funding-section .video.reasons-report-modal"
);
const closeButton1 = document.querySelector(
    "#funding-section .video.reasons-report-modal .close-btn"
);
const backgroundOverlay1 = document.querySelector(
    "#funding-section .video.reasons-report-modal .background-overlay"
);

// 신고 사유 버튼 클릭했을 때
reasonsReportBtns1.forEach((reasonsReportBtn) => {
    reasonsReportBtn.addEventListener("click", () => {
        // 모달창 나옴.
        reasonsReportModal1.style.display = "flex";
    });
});
// 닫기 버튼 클릭했을 때
closeButton1.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal1.style.display = "none";
});
// 백그라운드 클릭했을 때
backgroundOverlay1.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal1.style.display = "none";
});

///////////////////////////////////////////////////////////////////
// !!!!!!!!!!!!!!!! 2.글 !!!!!!!!!!!!!!!!!!!

// *********** 체크박스 전체 선택/해제 기능
const applyCheckboxes2 = document.querySelectorAll(
    "#funding-section .text-wrapper .apply-checkbox"
);
const headerCheckbox2 = document.querySelector(
    "#funding-section .text-wrapper input[class=select-all]"
);

headerCheckbox2.addEventListener("change", function (e) {
    applyCheckboxes2.forEach((checkbox) => {
        checkbox.checked = e.target.checked;
    });
});
applyCheckboxes2.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
        const checkedCount = Array.from(applyCheckboxes2).filter(
            (checkbox) => checkbox.checked
        ).length;
        headerCheckbox2.checked = checkedCount === applyCheckboxes2.length;
    });
});

const sortFilterOptions2 = document.querySelectorAll(
    "#funding-section .text-wrapper .sort-filter-option"
); //작성일, 조회수, 평점, 신고관리

// 필터링(눌렀을 때)
sortFilterOptions2.forEach((option) => {
    option.addEventListener("click", () => {
        // selected 클래스 추가/제거
        document
            .querySelector(
                "#funding-section .text-wrapper .sort-filter-option.selected"
            )
            .classList.remove("selected");
        option.classList.add("selected");
    });
});

// ****************신고 관리 모달창
const reportManagements2 = document.querySelectorAll(
    "#funding-section .text-wrapper .report-management-btn"
);
const reportManagementModal2 = document.querySelector(
    "#funding-section .text.report-management-modal"
);
const btnComplete2 = document.querySelector(
    "#funding-section .text.report-management-modal .btn-complete"
);
const reportBackgroundOverlay2 = document.querySelector(
    "#funding-section .text.report-management-modal .background-overlay"
);

// 신고관리 버튼 클릭했을 때
reportManagements2.forEach((reportManagement) => {
    reportManagement.addEventListener("click", () => {
        // 모달창 나옴.
        reportManagementModal2.style.display = "flex";
    });
});
// 백그라운드 클릭했을 때
reportBackgroundOverlay2.addEventListener("click", () => {
    // 모달창 사라짐.
    reportManagementModal2.style.display = "none";
});

const choiceButtons2 = document.querySelectorAll(
    "#funding-section .text.report-management-modal .choice-container > input[type=button]"
);

choiceButtons2.forEach((choiceButton, i) => {
    choiceButton.addEventListener("click", (e) => {
        const clickedIndex = i;
        choiceButtons2.forEach((choice, index) => {
            if (index !== clickedIndex) {
                choice.classList.remove("on");
            }
        });
        choiceButtons2[clickedIndex].classList.toggle("on");
        console.log(choiceButtons2[clickedIndex].classList.contains("on"));
    });
});

btnComplete2.addEventListener("click", () => {
    let anyChoiseSelected = false;
    // choiceButtons "on" 클래스를 가진 항목이 있는지 확인
    choiceButtons2.forEach((choice) => {
        if (choice.classList.contains("on")) {
            anyChoiseSelected = true;
        }
    });
    // 선택된 항목이 있으면 모달창이 닫힌다.
    if (anyChoiseSelected) {
        alert("저장합니다.");
        reportManagementModal2.style.display = "none";
    } else {
        alert("선택해주세요.");
    }
});

// *********************신고 내역 모달창
const reasonsReportBtns2 = document.querySelectorAll(
    "#funding-section .text-wrapper .reasons-report-btn"
);
const reasonsReportModal2 = document.querySelector(
    "#funding-section .text.reasons-report-modal"
);
const closeButton2 = document.querySelector(
    "#funding-section .text.reasons-report-modal .close-btn"
);
const backgroundOverlay2 = document.querySelector(
    "#funding-section .text.reasons-report-modal .background-overlay"
);

// 신고 사유 버튼 클릭했을 때
reasonsReportBtns2.forEach((reasonsReportBtn) => {
    reasonsReportBtn.addEventListener("click", () => {
        // 모달창 나옴.
        reasonsReportModal2.style.display = "flex";
    });
});
// 닫기 버튼 클릭했을 때
closeButton2.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal2.style.display = "none";
});
// 백그라운드 클릭했을 때
backgroundOverlay2.addEventListener("click", () => {
    // 모달창 사라짐.
    reasonsReportModal2.style.display = "none";
});
