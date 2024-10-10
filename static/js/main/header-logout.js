const subNavigations = document.querySelectorAll(".sub-navigation");

// 각 메뉴 아이템에 대해 이벤트 리스너를 추가
subNavigations.forEach((sub) => {
    sub.addEventListener("mouseenter", (e) => {
        // 마우스가 올라갔을 때 다른 메뉴들 색상이 변경 된다
        subNavigations.forEach((sub) => {
            if (sub !== font) {
                menu.classList.add("main_heder_menu_bar__zwZYy");
            }
        });
    });

    // 마우스가 떠났을 때 색상
    font.addEventListener("mouseleave", (e) => {
        subNavigations.forEach((sub) => {
            sub.classList.remove("main_heder_menu_bar__zwZYy"); // 글씨 색 변경 클래스 제거
        });
    });
});
