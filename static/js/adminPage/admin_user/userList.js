document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay); // 오버레이 추가

    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // 모달창이 열리면 스크롤 막기

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_date")
            .textContent.trim();
        document.getElementById("editEmail").value = row
            .querySelector(".user_email")
            .textContent.trim();
        document.getElementById("editNickname").value = row
            .querySelector(".user_nickname")
            .textContent.trim();
        document.getElementById("editAge").value = row
            .querySelector(".user_age")
            .textContent.trim();
        document.getElementById("editStatus").value = row
            .querySelector(".user_status")
            .textContent.trim();
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
        modalOverlay.style.display = "none"; // 오버레이 숨김
        document.body.style.overflow = "auto"; // 모달창이 닫히면 스크롤 다시 활성화
    }

    closeButton.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", closeModal); // 오버레이 클릭 시 모달 닫기

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
        if (currentEditRow) {
            currentEditRow.querySelector(".user_name").textContent =
                document.getElementById("editUserName").value;
            currentEditRow.querySelector(".Join_date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".user_email").textContent =
                document.getElementById("editEmail").value;
            currentEditRow.querySelector(".user_nickname").textContent =
                document.getElementById("editNickname").value;
            currentEditRow.querySelector(".user_age").textContent =
                document.getElementById("editAge").value;
            currentEditRow.querySelector(".user_status").textContent =
                document.getElementById("editStatus").value;

            closeModal(); // 수정 후 모달 닫기
        }
    });

    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");

    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // 기존의 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                ?.classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            option.classList.add("selected");
        });
    });
});
