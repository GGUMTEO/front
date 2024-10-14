// 드롭다운 토글 함수
function toggleDropdown(element) {
    const container = element.querySelector(".dropdown-customize-container");
    container.style.display =
        container.style.display === "block" ? "none" : "block";
}

// 드롭다운에서 선택한 값을 표시하고 자동으로 닫는 함수
function selectDropdownOption(dropdown, value, unit) {
    const selected = dropdown.querySelector(".dropdown-customize-selected");
    selected.innerHTML = value + unit; // 선택한 값과 단위(년, 월, 일)를 함께 표시
    dropdown.querySelector(".dropdown-customize-container").style.display =
        "none"; // 드롭다운 닫기
}

// 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", function () {
    // 연도 드롭다운 이벤트 리스너
    const yearDropdown = document.getElementById("dropdown_year");
    yearDropdown.addEventListener("click", function (event) {
        event.stopPropagation(); // 이벤트 전파 중지
        toggleDropdown(yearDropdown);
    });
    yearDropdown
        .querySelectorAll(".dropdown-customize-list-content")
        .forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.stopPropagation(); // 이벤트 전파 중지
                selectDropdownOption(yearDropdown, this.textContent, "년"); // 선택 후 바로 닫기
            });
        });

    // 월 드롭다운 이벤트 리스너
    const monthDropdown = document.getElementById("dropdown_month");
    monthDropdown.addEventListener("click", function (event) {
        event.stopPropagation(); // 이벤트 전파 중지
        toggleDropdown(monthDropdown);
    });
    monthDropdown
        .querySelectorAll(".dropdown-customize-list-content")
        .forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.stopPropagation(); // 이벤트 전파 중지
                selectDropdownOption(monthDropdown, this.textContent, "월"); // 선택 후 바로 닫기
            });
        });

    // 일 드롭다운 이벤트 리스너
    const dayDropdown = document.getElementById("dropdown_day");
    dayDropdown.addEventListener("click", function (event) {
        event.stopPropagation(); // 이벤트 전파 중지
        toggleDropdown(dayDropdown);
    });
    dayDropdown
        .querySelectorAll(".dropdown-customize-list-content")
        .forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.stopPropagation(); // 이벤트 전파 중지
                selectDropdownOption(dayDropdown, this.textContent, "일"); // 선택 후 바로 닫기
            });
        });

    // 드롭다운 외부 클릭 시 닫기
    document.addEventListener("click", function () {
        document
            .querySelectorAll(".dropdown-customize-container")
            .forEach(function (container) {
                container.style.display = "none";
            });
    });
});
