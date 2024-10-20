// 체크박스 기능구현
function setupCheckboxes(sectionId) {
    const applyCheckboxesMember = document.querySelectorAll(
        `${sectionId} .apply-checkbox`
    );
    const headerCheckboxMember = document.querySelector(
        `${sectionId} input[class=select-all]`
    );

    headerCheckboxMember.addEventListener("change", function (e) {
        applyCheckboxesMember.forEach((checkbox) => {
            checkbox.checked = e.target.checked;
        });
    });

    applyCheckboxesMember.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const checkedCount = Array.from(applyCheckboxesMember).filter(
                (checkbox) => checkbox.checked
            ).length;
            headerCheckboxMember.checked =
                checkedCount === applyCheckboxesMember.length;
        });
    });
}
setupCheckboxes("#member-section");
setupCheckboxes("#notice-section");
setupCheckboxes("#inquiry-section");
setupCheckboxes("#payment-section");

// ####공통 로직: 필터링 기능을 수행하는 함수
function setupFilterOptions(sectionId) {
    const sortFilterOptionsVideo = document.querySelectorAll(
        `${sectionId} .sort-filter-option`
    );

    // 필터링(눌렀을 때)
    sortFilterOptionsVideo.forEach((option) => {
        option.addEventListener("click", () => {
            // selected 클래스 추가/제거
            document
                .querySelector(`${sectionId} .sort-filter-option.selected`)
                .classList.remove("selected");
            option.classList.add("selected");
        });
    });
}
setupFilterOptions("#member-section");
setupFilterOptions("#notice-section");
setupFilterOptions("#inquiry-section");
setupFilterOptions("#payment-section");

// 회원 상태 모달창을 수행하는 함수
function showStatusEditModal(sectionId) {
    const editbtns = document.querySelectorAll(`${sectionId} .edit-btn`);
    const modal = document.querySelector(`${sectionId} .status-edit-modal`);
    const btnComplete = document.querySelector(
        `${sectionId} .status-edit-modal .btn-complete`
    );
    const backgroundOverlay = document.querySelector(
        `${sectionId} .status-edit-modal .background-overlay`
    );
    // 버튼 클릭했을 때
    editbtns.forEach((btns) => {
        btns.addEventListener("click", () => {
            // 모달창 나옴.
            modal.style.display = "flex";
        });
    });
    // 백그라운드 클릭했을 때
    backgroundOverlay.addEventListener("click", () => {
        // 모달창 사라짐.
        modal.style.display = "none";
    });
    // 선택 및 저장
    const choiceBtns = document.querySelectorAll(
        `${sectionId} .status-edit-modal .choice-container > input[type=button]`
    );
    choiceBtns.forEach((choiceBtn, i) => {
        choiceBtn.addEventListener("click", (e) => {
            const clickedIndex = i;
            choiceBtns.forEach((choice, index) => {
                if (index !== clickedIndex) {
                    choice.classList.remove("on");
                }
            });
            choiceBtns[clickedIndex].classList.toggle("on");
            console.log(choiceBtns[clickedIndex].classList.contains("on"));
        });
    });
    btnComplete.addEventListener("click", () => {
        let anyChoiseSelected = false;
        // choiceBtns "on" 클래스를 가진 항목이 있는지 확인
        choiceBtns.forEach((choice) => {
            if (choice.classList.contains("on")) {
                anyChoiseSelected = true;
            }
        });
        // 선택된 항목이 있으면 모달창이 닫힌다.
        if (anyChoiseSelected) {
            alert("저장합니다.");
            modal.style.display = "none";
        } else {
            alert("선택해주세요.");
        }
    });
}
showStatusEditModal("#member-section");

// **공지사항 작성/수정 모달창**
function showNoticeModal(type) {
    const modal = document.querySelector(`.notice-full-modal.${type}`);
    const openBtns = document.querySelectorAll(
        type === "write"
            ? ".notice-write.selected-btn"
            : ".edit-btn.notice-edit"
    );
    const closeBtn = modal.querySelector(".close-button");
    const backgroundOverlay = modal.querySelector(".background-overlay");

    // 열기 버튼 클릭 시 모달창 표시
    openBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    });

    // 닫기 버튼 클릭 시 모달창 닫기
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 배경 클릭 시 모달창 닫기
    backgroundOverlay.addEventListener("click", () => {
        modal.style.display = "none";
    });
}
showNoticeModal("write"); // 공지사항 작성 모달
showNoticeModal("edit"); // 공지사항 수정 모달

// ####공통 로직: '영상' 또는 '글' 클릭 시 처리####
function toggleContent(sectionId) {
    const section = document.querySelector(`#${sectionId}`);
    const videoButton = section.querySelector(".video-button");
    const textButton = section.querySelector(".text-button");

    const videoWrapper = section.querySelector(".video-wrapper");
    const textWrapper = section.querySelector(".text-wrapper");

    videoButton.addEventListener("click", () => {
        activate(videoButton, textButton, videoWrapper, textWrapper);
    });

    textButton.addEventListener("click", () => {
        activate(textButton, videoButton, textWrapper, videoWrapper);
    });
}

// 활성화된 버튼과 콘텐츠를 전환하는 함수
function activate(activeButton, inactiveButton, showWrapper, hideWrapper) {
    activeButton.classList.add("active");
    inactiveButton.classList.remove("active");
    showWrapper.style.display = "block";
    hideWrapper.style.display = "none";
}
// ####각 섹션에 적용####
toggleContent("work-section");
toggleContent("funding-section");
toggleContent("audition-section");
toggleContent("review-section");

// ####공통 로직: 체크박스 전체 선택/해제 기능을 수행하는 함수
function setupServiceCheckboxes(sectionId) {
    const applyCheckboxesVideo = document.querySelectorAll(
        `${sectionId} .video-wrapper .apply-checkbox`
    );
    const headerCheckboxVideo = document.querySelector(
        `${sectionId} .video-wrapper input[class=select-all]`
    );

    headerCheckboxVideo.addEventListener("change", function (e) {
        applyCheckboxesVideo.forEach((checkbox) => {
            checkbox.checked = e.target.checked;
        });
    });

    applyCheckboxesVideo.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const checkedCount = Array.from(applyCheckboxesVideo).filter(
                (checkbox) => checkbox.checked
            ).length;
            headerCheckboxVideo.checked =
                checkedCount === applyCheckboxesVideo.length;
        });
    });

    // 글 체크박스 설정
    const applyCheckboxesText = document.querySelectorAll(
        `${sectionId} .text-wrapper .apply-checkbox`
    );
    const headerCheckboxText = document.querySelector(
        `${sectionId} .text-wrapper input[class=select-all]`
    );

    headerCheckboxText.addEventListener("change", function (e) {
        applyCheckboxesText.forEach((checkbox) => {
            checkbox.checked = e.target.checked;
        });
    });

    applyCheckboxesText.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const checkedCount = Array.from(applyCheckboxesText).filter(
                (checkbox) => checkbox.checked
            ).length;
            headerCheckboxText.checked =
                checkedCount === applyCheckboxesText.length;
        });
    });
}
// 각 섹션에 대해 setupCheckboxes 함수 호출
setupServiceCheckboxes("#work-section");
setupServiceCheckboxes("#funding-section");
setupServiceCheckboxes("#audition-section");
setupServiceCheckboxes("#review-section");

// ####공통 로직: 필터링 기능을 수행하는 함수
function setupServiceFilterOptions(sectionId) {
    const sortFilterOptionsVideo = document.querySelectorAll(
        `${sectionId} .video-wrapper .sort-filter-option`
    );

    // 영상 필터링 설정
    // 필터링(눌렀을 때)
    sortFilterOptionsVideo.forEach((option) => {
        option.addEventListener("click", () => {
            // selected 클래스 추가/제거
            document
                .querySelector(
                    `${sectionId} .video-wrapper .sort-filter-option.selected`
                )
                .classList.remove("selected");
            option.classList.add("selected");
        });
    });

    const sortFilterOptionsText = document.querySelectorAll(
        `${sectionId} .text-wrapper .sort-filter-option`
    );

    // 영상 필터링 설정
    // 필터링(눌렀을 때)
    sortFilterOptionsText.forEach((option) => {
        option.addEventListener("click", () => {
            // selected 클래스 추가/제거
            document
                .querySelector(
                    `${sectionId} .text-wrapper .sort-filter-option.selected`
                )
                .classList.remove("selected");
            option.classList.add("selected");
        });
    });
}
// 각 섹션에 대해 setupFilterOptions 함수 호출
setupServiceFilterOptions("#work-section");
setupServiceFilterOptions("#funding-section");
setupServiceFilterOptions("#audition-section");
setupServiceFilterOptions("#review-section");

// ####공통 로직: 신고 처리 모달창을 수행하는 함수
function showReporProcessingtModal(sectionId) {
    const btnsVideo = document.querySelectorAll(
        `${sectionId} .video-wrapper .report-management-btn.status`
    );
    const modalVideo = document.querySelector(
        `${sectionId} .video.report-management-modal`
    );
    const btnCompleteVideo = document.querySelector(
        `${sectionId} .video.report-management-modal .btn-complete`
    );
    const backgroundOverlayVideo = document.querySelector(
        `${sectionId} .video.report-management-modal .background-overlay`
    );
    // 신고 버튼 클릭했을 때
    btnsVideo.forEach((btns) => {
        btns.addEventListener("click", () => {
            // 모달창 나옴.
            modalVideo.style.display = "flex";
        });
    });
    // 백그라운드 클릭했을 때
    backgroundOverlayVideo.addEventListener("click", () => {
        // 모달창 사라짐.
        modalVideo.style.display = "none";
    });
    // 신고 처리 선택 및 저장
    const choiceBtnsVideo = document.querySelectorAll(
        `${sectionId} .video.report-management-modal .choice-container > input[type=button]`
    );
    choiceBtnsVideo.forEach((choiceBtn, i) => {
        choiceBtn.addEventListener("click", (e) => {
            const clickedIndex = i;
            choiceBtnsVideo.forEach((choice, index) => {
                if (index !== clickedIndex) {
                    choice.classList.remove("on");
                }
            });
            choiceBtnsVideo[clickedIndex].classList.toggle("on");
            console.log(choiceBtnsVideo[clickedIndex].classList.contains("on"));
        });
    });
    btnCompleteVideo.addEventListener("click", () => {
        let anyChoiseSelected = false;
        // choiceBtnsVideo "on" 클래스를 가진 항목이 있는지 확인
        choiceBtnsVideo.forEach((choice) => {
            if (choice.classList.contains("on")) {
                anyChoiseSelected = true;
            }
        });
        // 선택된 항목이 있으면 모달창이 닫힌다.
        if (anyChoiseSelected) {
            alert("저장합니다.");
            modalVideo.style.display = "none";
        } else {
            alert("선택해주세요.");
        }
    });

    const btnsText = document.querySelectorAll(
        `${sectionId} .text-wrapper .report-management-btn.status`
    );
    const modalText = document.querySelector(
        `${sectionId} .text.report-management-modal`
    );
    const btnCompleteText = document.querySelector(
        `${sectionId} .text.report-management-modal .btn-complete`
    );
    const backgroundOverlayText = document.querySelector(
        `${sectionId} .text.report-management-modal .background-overlay`
    );
    // 신고관리 버튼 클릭했을 때
    btnsText.forEach((btns) => {
        btns.addEventListener("click", () => {
            // 모달창 나옴.
            modalText.style.display = "flex";
        });
    });
    // 백그라운드 클릭했을 때
    backgroundOverlayText.addEventListener("click", () => {
        // 모달창 사라짐.
        modalText.style.display = "none";
    });
    // 신고 처리 선택 및 저장
    const choiceBtnsText = document.querySelectorAll(
        `${sectionId} .text.report-management-modal .choice-container > input[type=button]`
    );
    choiceBtnsText.forEach((choiceBtn, i) => {
        choiceBtn.addEventListener("click", (e) => {
            const clickedIndex = i;
            choiceBtnsText.forEach((choice, index) => {
                if (index !== clickedIndex) {
                    choice.classList.remove("on");
                }
            });
            choiceBtnsText[clickedIndex].classList.toggle("on");
            console.log(choiceBtnsText[clickedIndex].classList.contains("on"));
        });
    });
    btnCompleteText.addEventListener("click", () => {
        let anyChoiseSelected = false;
        // choiceBtnsText "on" 클래스를 가진 항목이 있는지 확인
        choiceBtnsText.forEach((choice) => {
            if (choice.classList.contains("on")) {
                anyChoiseSelected = true;
            }
        });
        // 선택된 항목이 있으면 모달창이 닫힌다.
        if (anyChoiseSelected) {
            alert("저장합니다.");
            modalText.style.display = "none";
        } else {
            alert("선택해주세요.");
        }
    });
}
// 각 섹션에 대해 showReporProcessingtModal 함수 호출
showReporProcessingtModal("#work-section");
showReporProcessingtModal("#funding-section");
showReporProcessingtModal("#audition-section");
showReporProcessingtModal("#review-section");

// ####공통 로직: 신고 내역 모달창을 수행하는 함수
function showReportDetailsModal(sectionId) {
    const btnsVideo = document.querySelectorAll(
        `${sectionId} .video-wrapper .reasons-report-btn`
    );
    const modalVideo = document.querySelector(
        `${sectionId} .video.reasons-report-modal`
    );
    const closeBtnsVideo = document.querySelector(
        `${sectionId} .video.reasons-report-modal .close-btn`
    );
    const backgroundOverlayVideo = document.querySelector(
        `${sectionId} .video.reasons-report-modal .background-overlay`
    );

    // 신고 사유 버튼 클릭했을 때
    btnsVideo.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 모달창 나옴.
            modalVideo.style.display = "flex";
        });
    });
    // 닫기 버튼 클릭했을 때
    closeBtnsVideo.addEventListener("click", () => {
        // 모달창 사라짐.
        modalVideo.style.display = "none";
    });
    // 백그라운드 클릭했을 때
    backgroundOverlayVideo.addEventListener("click", () => {
        // 모달창 사라짐.
        modalVideo.style.display = "none";
    });

    const btnsText = document.querySelectorAll(
        `${sectionId} .text-wrapper .reasons-report-btn`
    );
    const modalText = document.querySelector(
        `${sectionId} .text.reasons-report-modal`
    );
    const closeBtnsText = document.querySelector(
        `${sectionId} .text.reasons-report-modal .close-btn`
    );
    const backgroundOverlayText = document.querySelector(
        `${sectionId} .text.reasons-report-modal .background-overlay`
    );

    // 신고 사유 버튼 클릭했을 때
    btnsText.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 모달창 나옴.
            modalText.style.display = "flex";
        });
    });
    // 닫기 버튼 클릭했을 때
    closeBtnsText.addEventListener("click", () => {
        // 모달창 사라짐.
        modalText.style.display = "none";
    });
    // 백그라운드 클릭했을 때
    backgroundOverlayText.addEventListener("click", () => {
        // 모달창 사라짐.
        modalText.style.display = "none";
    });
}
// 각 섹션에 대해 showReportDetailsModal 함수 호출
showReportDetailsModal("#work-section");
showReportDetailsModal("#funding-section");
showReportDetailsModal("#audition-section");
showReportDetailsModal("#review-section");

// ####공통 로직: 리뷰 상세 모달창을 수행하는 함수
function showReviewDetailModal(sectionId) {
    const btnsVideo = document.querySelectorAll(
        `${sectionId} .video-wrapper .apply-table-cell.detail`
    );
    const modalVideo = document.querySelector(
        `${sectionId} .video.review-detail-modal`
    );
    const backgroundOverlayVideo = document.querySelector(
        `${sectionId} .video.review-detail-modal .background-overlay`
    );

    // 신고 사유 버튼 클릭했을 때
    btnsVideo.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 모달창 나옴.
            modalVideo.style.display = "flex";
        });
    });
    // 백그라운드 클릭했을 때
    backgroundOverlayVideo.addEventListener("click", () => {
        // 모달창 사라짐.
        modalVideo.style.display = "none";
    });

    const btnsText = document.querySelectorAll(
        `${sectionId} .text-wrapper .apply-table-cell.detail`
    );
    const modalText = document.querySelector(
        `${sectionId} .text.review-detail-modal`
    );
    const backgroundOverlayText = document.querySelector(
        `${sectionId} .text.review-detail-modal .background-overlay`
    );

    // 신고 사유 버튼 클릭했을 때
    btnsText.forEach((btn) => {
        btn.addEventListener("click", () => {
            // 모달창 나옴.
            modalText.style.display = "flex";
        });
    });
    // 백그라운드 클릭했을 때
    backgroundOverlayText.addEventListener("click", () => {
        // 모달창 사라짐.
        modalText.style.display = "none";
    });
}
showReviewDetailModal("#review-section");

// **문의사항 답변 모달창**
function showAnsweredModal(sectionId, type) {
    const btns = document.querySelectorAll(`.answered-btn.${type}`);
    const modal = document.querySelector(`.answered-modal.${type}`);
    const closeBtn = modal.querySelector(".close-button");
    const backgroundOverlay = modal.querySelector(".background-overlay");

    // 수정 버튼 클릭 시 모달창 표시
    btns.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    });

    // 닫기 버튼 클릭 시 모달창 닫기
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 배경 클릭 시 모달창 닫기
    backgroundOverlay.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

// **함수 호출**
showAnsweredModal("#inquiry-section", "unanswered");
showAnsweredModal("#inquiry-section", "completed");

// 환불 상태 모달창을 수행하는 함수
function showStatusRefund(sectionId) {
    const editbtns = document.querySelectorAll(`${sectionId} .edit-btn`);
    const modal = document.querySelector(`${sectionId} .refund-status-modal`);
    const btnComplete = document.querySelector(
        `${sectionId} .refund-status-modal .btn-complete`
    );
    const backgroundOverlay = document.querySelector(
        `${sectionId} .refund-status-modal .background-overlay`
    );
    // 버튼 클릭했을 때
    editbtns.forEach((btns) => {
        btns.addEventListener("click", () => {
            // 모달창 나옴.
            modal.style.display = "flex";
        });
    });
    // 백그라운드 클릭했을 때
    backgroundOverlay.addEventListener("click", () => {
        // 모달창 사라짐.
        modal.style.display = "none";
    });
    // 선택 및 저장
    const choiceBtns = document.querySelectorAll(
        `${sectionId} .refund-status-modal .choice-container > input[type=button]`
    );
    choiceBtns.forEach((choiceBtn, i) => {
        choiceBtn.addEventListener("click", (e) => {
            const clickedIndex = i;
            choiceBtns.forEach((choice, index) => {
                if (index !== clickedIndex) {
                    choice.classList.remove("on");
                }
            });
            choiceBtns[clickedIndex].classList.toggle("on");
            console.log(choiceBtns[clickedIndex].classList.contains("on"));
        });
    });
    btnComplete.addEventListener("click", () => {
        let anyChoiseSelected = false;
        // choiceBtns "on" 클래스를 가진 항목이 있는지 확인
        choiceBtns.forEach((choice) => {
            if (choice.classList.contains("on")) {
                anyChoiseSelected = true;
            }
        });
        // 선택된 항목이 있으면 모달창이 닫힌다.
        if (anyChoiseSelected) {
            alert("변경합니다.");
            modal.style.display = "none";
        } else {
            alert("선택해주세요.");
        }
    });
}
showStatusRefund("#payment-section");
