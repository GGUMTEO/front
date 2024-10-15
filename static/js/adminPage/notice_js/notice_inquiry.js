// 상단 공지사항 목록으로 돌아가기에 마우스를 올렸을 때 밑줄이 추가 되는 이벤트
const underline = document.querySelector(".back > a > i");
console.log(underline);

underline.addEventListener("mouseover", (e) => {
    e.target.style.textDecoration = "underline";
});

// 추가로, 마우스가 떠났을 때 밑줄을 제거하려면 `mouseout` 이벤트도 추가
underline.addEventListener("mouseout", (e) => {
    e.target.style.textDecoration = "none";
});
