document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("userModal");
    const profileIcons = document.querySelectorAll(".UserItem_avatarWrapper a");
    const closeBtn = modal.querySelector(".modal-close");

    // 프로필 아이콘 클릭 시 모달 창 열기
    profileIcons.forEach((icon) => {
        icon.addEventListener("click", function (e) {
            e.preventDefault();
            modal.style.display = "flex"; // 모달을 보이도록 설정
        });
    });

    // 닫기 버튼 클릭 시 모달 창 닫기
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // 모달 바깥을 클릭하면 모달 창 닫기
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
