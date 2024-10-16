// 모달과 버튼 요소
var modal = document.getElementById("report-modal");
var btn = document.querySelector(".report");
var span = document.getElementsByClassName("close")[0];

// 버튼을 클릭하면 모달을 보여줌
btn.addEventListener("click", () => {
    modal.style.display = "block";
});

// x  클릭하면 모달을 닫기
span.addEventListener("click", () => {
    modal.style.display = "none";
});

// 모달 바깥을 클릭하면 모달을 닫습니다
window.addEventListener("click", (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
