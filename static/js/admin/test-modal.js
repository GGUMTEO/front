// **모달창 기능 구현
const editBtn = document.getElementById("edit-btn");
const editModal = document.getElementById("edit-modal");
const closeButton = document.getElementById("close-button");
const backgroundOverlay = document.getElementById("background-overlay");

// 수정 버튼 클릭했을 때
editBtn.addEventListener("click", () => {
    // 모달창 나옴.
    editModal.style.display = "block";
});

// 닫기 버튼 클릭했을 때
closeButton.addEventListener("click", () => {
    // 모달창 사라짐.
    editModal.style.display = "none";
});

// 백그라운드 클릭했을 때
backgroundOverlay.addEventListener("click", () => {
    // 모달창 사라짐.
    editModal.style.display = "none";
});
