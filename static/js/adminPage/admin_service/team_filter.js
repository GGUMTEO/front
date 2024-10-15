document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay); // 오버레이 요소 추가
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 모집상태에 따른 색상 적용
    function applyRecruitStatusColors() {
        document.querySelectorAll(".ServiceTable_row").forEach((row) => {
            const statusCell = row.querySelector(".recruit_status");
            if (statusCell) {
                const statusText = statusCell.textContent.trim();

                switch (statusText) {
                    case "모집중":
                        statusCell.style.color = "green";
                        break;
                    case "모집완료":
                        statusCell.style.color = "gray";
                        break;
                    default:
                        statusCell.style.color = "black"; // 기본 색상
                        break;
                }
            }
        });
    }

    applyRecruitStatusColors(); // 페이지 로드 시 색상 적용

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // 모달창과 오버레이 표시
        editModal.style.display = "block";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // 모달창이 열리면 스크롤 막기

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();
        document.getElementById("editDeadline").value = row
            .querySelector(".recruit_deadline")
            .textContent.trim();
        document.getElementById("editDescription").value = row
            .querySelector(".recruit_description")
            .textContent.trim();
        document.getElementById("editRecruitStatus").value = row
            .querySelector(".recruit_status")
            .textContent.trim();
        document.getElementById("editRecruitTarget").value = row
            .querySelector(".recruit_target")
            .textContent.trim();
        document.getElementById("editSportKind").value = row
            .querySelector(".sport_kind")
            .textContent.trim();

        // 지원자 목록 표시 (예시)
        const applicantList = row
            .querySelector(".applicant_list")
            .textContent.trim();
        renderApplicantList(applicantList);
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
        modalOverlay.style.display = "none"; // 오버레이 숨김
        document.body.style.overflow = "auto"; // 모달창이 닫히면 스크롤 다시 활성화
    }

    closeButton.addEventListener("click", closeModal);

    // 수정 버튼 클릭 시 모달 열기
    function addEditButtonListeners() {
        document.querySelectorAll(".editBtn button").forEach((button) => {
            button.addEventListener("click", function () {
                const row = this.closest(".ServiceTable_row");
                openModal(row);
            });
        });
    }
    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        // 임시로 저장 (서버와 연결 후, 이 부분에 실제 저장 로직 추가)
        alert("변경 사항이 저장되었습니다.");
        closeModal();
    });

    addEditButtonListeners(); // 초기 로드 시 이벤트 리스너 추가

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        if (currentEditRow) {
            currentEditRow.querySelector(".user_name").textContent =
                document.getElementById("editUserName").value;
            currentEditRow.querySelector(".Join_Date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".recruit_deadline").textContent =
                document.getElementById("editDeadline").value;
            currentEditRow.querySelector(".recruit_description").textContent =
                document.getElementById("editDescription").value;
            currentEditRow.querySelector(".recruit_status").textContent =
                document.getElementById("editRecruitStatus").value;
            currentEditRow.querySelector(".recruit_target").textContent =
                document.getElementById("editRecruitTarget").value;
            currentEditRow.querySelector(".sport_kind").textContent =
                document.getElementById("editSportKind").value;

            // applyRecruitStatusColors(); // 수정 후 색상 적용
            // alert("저장되었습니다."); // 저장 완료 메시지
            // closeModal(); // 수정 후 모달 닫기
        }
    });

    // 지원자 목록 렌더링 함수
    function renderApplicantList(applicantList) {
        const applicantContainer = document.getElementById("editApplicantList");
        applicantContainer.innerHTML = ""; // 기존 지원자 목록 초기화

        // 예시 지원자 데이터 처리
        const applicants = applicantList.split(","); // 쉼표로 구분된 지원자 목록
        applicants.forEach((applicant) => {
            const applicantElement = document.createElement("div");
            applicantElement.style.display = "flex";
            applicantElement.style.justifyContent = "space-between";
            applicantElement.style.marginBottom = "5px";
            applicantElement.style.borderBottom = "1px solid #999";
            applicantElement.style.paddingBottom = "5px";

            const nameElement = document.createElement("span");
            nameElement.textContent = applicant.trim();

            const buttonContainer = document.createElement("div");
            const acceptButton = document.createElement("button");
            acceptButton.textContent = "수락";
            acceptButton.style.marginRight = "5px";
            acceptButton.style.backgroundColor = "#007bff";
            acceptButton.style.color = "white";
            acceptButton.style.border = "none";
            acceptButton.style.borderRadius = "4px";
            acceptButton.style.padding = "4px 8px";
            acceptButton.style.cursor = "pointer";
            acceptButton.addEventListener("mouseenter", () => {
                acceptButton.style.opacity = "0.8";
            });
            acceptButton.addEventListener("mouseleave", () => {
                acceptButton.style.opacity = "1";
            });

            const rejectButton = document.createElement("button");
            rejectButton.textContent = "거절";
            rejectButton.style.backgroundColor = "#007bff";
            rejectButton.style.color = "white";
            rejectButton.style.border = "none";
            rejectButton.style.borderRadius = "4px";
            rejectButton.style.padding = "4px 8px";
            rejectButton.style.cursor = "pointer";
            rejectButton.addEventListener("mouseenter", () => {
                rejectButton.style.opacity = "0.8";
            });
            rejectButton.addEventListener("mouseleave", () => {
                rejectButton.style.opacity = "1";
            });

            buttonContainer.appendChild(acceptButton);
            buttonContainer.appendChild(rejectButton);

            applicantElement.appendChild(nameElement);
            applicantElement.appendChild(buttonContainer);

            applicantContainer.appendChild(applicantElement);
        });
    }

    // 필터 옵션 관련 기능
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");

    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // 기존의 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                ?.classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            option.classList.add("selected");

            // 정렬 및 필터링 작업
            if (option.textContent.includes("등록일")) {
                sortDirection["모집대상"] = null;
                sortDirection["모집상태"] = null;
                sortTableByDate(4, "등록일");
            } else if (option.textContent.includes("팀원 모집")) {
                sortDirection["등록일"] = null;
                sortDirection["모집상태"] = null;
                filterByRecruitTarget("팀원");
            } else if (option.textContent.includes("팀 모집")) {
                sortDirection["등록일"] = null;
                sortDirection["모집상태"] = null;
                filterByRecruitTarget("팀");
            } else if (option.textContent.includes("모집상태")) {
                if (sortDirection["모집상태"] === "모집중") {
                    filterByRecruitStatus("모집완료");
                    sortDirection["모집상태"] = "모집완료";
                } else {
                    filterByRecruitStatus("모집중");
                    sortDirection["모집상태"] = "모집중";
                }
            }
        });
    });
});
