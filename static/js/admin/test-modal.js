// **모달창 기능 구현
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
