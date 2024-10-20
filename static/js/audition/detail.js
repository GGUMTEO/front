window.onload = function () {
    var modal = document.getElementById("report-modal");
    var btn = document.querySelectorAll(".btn-white")[0];
    var closeBtn = document.querySelector(".close");

    // 버튼 클릭 시 모달을 보여주는 함수
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // 모달 닫기
    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // 모달 외부 클릭 시 모달 닫기
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
};
