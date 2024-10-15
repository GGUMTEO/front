document.addEventListener("DOMContentLoaded", () => {
    const filterOptions = document.querySelectorAll(".sort-filter-option");

    filterOptions.forEach((option) => {
        option.addEventListener("click", function () {
            // 이전에 선택된 필터 옵션에서 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                ?.classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            this.classList.add("selected");
        });
    });

    // 모달 관련 변수
    const editModal = document.getElementById("editModal");
    let modalOverlay = document.getElementById("modalOverlay");

    // 모달 오버레이가 없으면 생성
    if (!modalOverlay) {
        modalOverlay = document.createElement("div");
        modalOverlay.id = "modalOverlay";
        modalOverlay.classList.add("modal-overlay");
        document.body.appendChild(modalOverlay);
    }

    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 모달 열기 함수
    function openModal(row) {
        currentEditRow = row;

        // 모달창과 오버레이 표시
        editModal.style.display = "block";
        modalOverlay.style.display = "block";

        // 페이지 스크롤 막기
        document.body.style.overflow = "hidden";
    }

    // 모달 닫기 함수
    function closeModal() {
        editModal.style.display = "none";
        modalOverlay.style.display = "none";

        // 페이지 스크롤 다시 활성화
        document.body.style.overflow = "auto";
    }

    // 닫기 버튼 클릭 시 모달 닫기
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
        // 실제로는 서버에 저장하는 코드가 필요합니다.
        alert("변경 사항이 저장되었습니다.");
        closeModal();
    });
});
