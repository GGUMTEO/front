document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay); // 오버레이 요소 추가
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 임시 데이터 (서버 연결 전)
    const inquiryData = {
        content: `시작 예정일: \n매칭 종목: \n매칭 가능시간: \n경기 위치: \n경기 시간: \n경기 시간 조율: `,
    };

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // 모달창과 오버레이 표시
        editModal.style.display = "block";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // 모달창이 열리면 스크롤 막기

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editHomeTeamName").value = row
            .querySelector(".homeTeam_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();
        document.getElementById("editDueDate").value = row
            .querySelector(".Due_date")
            .textContent.trim();
        document.getElementById("editAwayTeam").value = row
            .querySelector(".awayTeam")
            .textContent.trim();

        // 매칭 상태 및 종목 선택
        const matchStatus = row
            .querySelector(".match_status")
            .textContent.trim();
        const sportKind = row.querySelector(".sport_kind").textContent.trim();
        document.getElementById("editMatchStatus").value = matchStatus;
        document.getElementById("editSportKind").value = sportKind;

        // 경기 주요사항 (디폴트값 적용)
        document.getElementById("gameDetails").value = inquiryData.content;
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

    addEditButtonListeners(); // 초기 로드 시 이벤트 리스너 추가

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        // 임시로 저장 (서버와 연결 후, 이 부분에 실제 저장 로직 추가)
        alert("변경 사항이 저장되었습니다.");
        closeModal();
    });

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
                // 등록일 정렬 로직 추가 가능
            } else if (option.textContent.includes("예정일")) {
                // 예정일 정렬 로직 추가 가능
            } else if (option.textContent.includes("매칭상태")) {
                // 매칭상태 필터링 로직 추가 가능
            } else if (option.textContent.includes("종료상태")) {
                // 종료상태 필터링 로직 추가 가능
            }
        });
    });
});
