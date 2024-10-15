const titles = document.querySelectorAll(".news-center-table-body-title > a");
console.log(titles);

titles.forEach((title) => {
    title.addEventListener("mouseover", (e) => {
        e.target.style.textDecoration = "underline";
    });

    // 추가로, 마우스가 떠났을 때 밑줄을 제거하려면 `mouseout` 이벤트도 추가
    title.addEventListener("mouseout", (e) => {
        e.target.style.textDecoration = "none";
    });
});

// const pageNumbers = document.querySelectorAll(".pagination >li> a");
// console.log(pageNumbers);

// // 페이지 번호 눌렀을 때 번호에 색깔 들어가고, 왼쪽 화살표 눌렀을때 스타일 안풀리게하는 이벤트
// pageNumbers.forEach((pageNumber, i, pageNumbers) => {
//     // 왼쪽 화살표, 오른쪽 화살표가 아니면
//     if (pageNumber != pageNumbers[0] && pageNumber != pageNumbers[7]) {
//         // 1~6번 페이지 번호가 클릭 됐을때
//         pageNumber.addEventListener("click", (e) => {
//             // console.log(pageNumber);
//             pageNumbers.forEach((p) => {
//                 // 각 값의 부모 태그에 active가 포함되어있으면 active를 삭제해준다.
//                 if (p.parentElement.classList.contains("active")) {
//                     p.parentElement.classList.remove("active");
//                 }
//                 // console.log(p);
//             });
//             e.target.parentElement.classList.add("active");
//             // console.log(e.target);
//         });
//     }
// });

// // const Arrows = document.querySelectorAll(".fa");
// // console.log(Arrows);

// // 페이지 버튼 중 왼쪽 화살표가 페이지 1일때 안보이게하는 이벤트 리스너
// pageNumbers.forEach((pageNumber, i, pageNumbers) => {
//     pageNumber.addEventListener("click", (e) => {
//         console.log(pageNumber);
//         if (e.target === pageNumbers[1]) {
//             pageNumbers[0].firstElementChild.style.visibility = "hidden";
//             // console.log(pageNumbers[0].firstElementChild.style.visibility);
//         } else {
//             pageNumbers[0].firstElementChild.style.visibility = "visible";
//         }
//     });
// });
