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

document
    .getElementById("file_select_btn")
    .addEventListener("click", function () {
        const fileInput = document.querySelector(".temp-upload-resume");
        fileInput.click();

        fileInput.addEventListener("change", function () {
            const selectedFile = fileInput.files[0];
            if (selectedFile) {
                const fileName = selectedFile.name;

                // 파일명을 p 태그에 넣기
                const fileNameViewer = document.getElementById(
                    "selected_file_name_viewer"
                );
                fileNameViewer.textContent = fileName;

                // 파일명을 a 태그의 download 속성에 넣기
                const resumeDownloadLink =
                    document.getElementById("resume_download");
                resumeDownloadLink.setAttribute("download", fileName);

                // 파일명이 너무 길 경우 잘라서 표시 (예: 15자 이상일 때)
                if (fileName.length > 15) {
                    fileNameViewer.textContent =
                        fileName.substring(0, 12) + "...";
                }

                // tooltip-group을 block으로 변경
                const tooltipGroup = document.querySelector(".tooltip-group");
                tooltipGroup.style.display = "block";

                // placeholder-attachment를 none으로 변경
                const placeholderAttachment = document.querySelector(
                    ".placeholder-attachment"
                );
                placeholderAttachment.style.display = "none";
            }
        });
    });

// 삭제 버튼을 클릭했을 때 동작하는 함수
document
    .getElementById("btn_delete_resume")
    .addEventListener("click", function () {
        // 첨부 파일 삭제 (input 값 초기화)
        const fileInput = document.querySelector(".temp-upload-resume");
        fileInput.value = ""; // 파일 선택 초기화

        // tooltip-group을 none으로 변경
        const tooltipGroup = document.querySelector(".tooltip-group");
        tooltipGroup.style.display = "none";

        // placeholder-attachment를 block으로 변경
        const placeholderAttachment = document.querySelector(
            ".placeholder-attachment"
        );
        placeholderAttachment.style.display = "block";

        // 파일명 초기화
        const fileNameViewer = document.getElementById(
            "selected_file_name_viewer"
        );
        fileNameViewer.textContent = "";

        // 다운로드 링크 초기화
        const resumeDownloadLink = document.getElementById("resume_download");
        resumeDownloadLink.removeAttribute("download");
    });
