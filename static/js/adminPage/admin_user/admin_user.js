document.addEventListener("DOMContentLoaded", function () {
    const allSelectToggle = document.querySelector(
        ".SettingsToggle_toggle:first-child .SettingToggle_switch"
    );
    const toggles = document.querySelectorAll(
        ".SettingsToggle_toggle .SettingToggle_switch"
    );

    // 첫 번째 스위치 (전체 선택 스위치) 클릭 시
    allSelectToggle.addEventListener("click", function () {
        const isActive = allSelectToggle.classList.contains(
            "SettingToggle_active"
        );

        // 모든 하위 스위치 상태 변경
        toggles.forEach(function (toggle) {
            if (isActive) {
                toggle.classList.remove("SettingToggle_active");
            } else {
                toggle.classList.add("SettingToggle_active");
            }
        });
    });

    // 각 스위치 개별 클릭 시
    toggles.forEach(function (toggle, index) {
        if (index === 0) return; // 첫 번째 스위치는 이미 처리했으므로 제외

        toggle.addEventListener("click", function () {
            toggle.classList.toggle("SettingToggle_active");

            // 하위 스위치가 하나라도 비활성화되면 전체 스위치도 비활성화
            const allActive = Array.from(toggles)
                .slice(1)
                .every((t) => t.classList.contains("SettingToggle_active"));
            if (!allActive) {
                allSelectToggle.classList.remove("SettingToggle_active");
            } else {
                allSelectToggle.classList.add("SettingToggle_active"); // 모든 하위 스위치가 활성화된 경우 전체 스위치 활성화
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".UsersFilter_filterButton");

    // 기본적으로 첫 번째 버튼에 선택된 클래스를 추가
    buttons[0].classList.add("UsersFilter_selected");

    // 각 버튼 클릭 시
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            // 모든 버튼의 선택된 클래스와 배경색 초기화
            buttons.forEach((btn) => {
                btn.classList.remove("UsersFilter_selected");
                btn.style.backgroundColor = ""; // 기본 배경색으로 초기화
            });

            // 클릭된 버튼에 선택된 클래스와 배경색 적용
            button.classList.add("UsersFilter_selected");
            button.style.backgroundColor = "#00c4c4"; // 선택된 버튼의 배경색을 #00c4c4로 설정

            // 1초 후에 원래 색으로 돌아오게 설정
            setTimeout(function () {
                button.style.backgroundColor = ""; // 기본 배경색으로 돌아오기
            }, 500); // 1000 밀리초 = 1초
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const userStatusElements = document.querySelectorAll(".User_status");

    userStatusElements.forEach(function (element) {
        if (element.textContent.includes("활동")) {
            element.style.color = "#00c4c4";
        } else {
            element.style.color = "red";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".sort-filter-option");

    options.forEach(function (option) {
        option.addEventListener("click", function () {
            // 모든 옵션의 선택된 클래스 초기화
            options.forEach((opt) => {
                opt.classList.remove("selected");
            });

            // 클릭된 옵션에 선택된 클래스 추가
            option.classList.add("selected");
        });
    });
});

//---------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".sort-filter-option");
    const userListContainer = document.querySelector(".UserList_userList");
    let sortOrder = {}; // 각 옵션의 정렬 순서를 기억하기 위한 객체

    function sortUsers(criteria) {
        const users = Array.from(
            userListContainer.querySelectorAll(".UserItem_container")
        );

        // 모든 사용자 다시 표시
        users.forEach((user) => (user.style.display = "flex"));

        if (criteria === "가입일 순") {
            users.sort((a, b) => {
                const dateA = new Date(
                    a.querySelector(".User_joinDate b").textContent
                );
                const dateB = new Date(
                    b.querySelector(".User_joinDate b").textContent
                );
                return sortOrder[criteria] === "asc"
                    ? dateA - dateB
                    : dateB - dateA;
            });
        } else if (criteria === "이름 순") {
            users.sort((a, b) => {
                const nameA = a
                    .querySelector(".UserItem_name")
                    .textContent.trim();
                const nameB = b
                    .querySelector(".UserItem_name")
                    .textContent.trim();
                return sortOrder[criteria] === "asc"
                    ? nameA.localeCompare(nameB, "ko-KR", { numeric: true })
                    : nameB.localeCompare(nameA, "ko-KR", { numeric: true });
            });
        } else if (criteria === "활동 회원 순") {
            users.forEach((user) => {
                const status = user.querySelector(".User_status").textContent;
                if (!status.includes("활동")) {
                    user.style.display = "none";
                }
            });
        } else if (criteria === "탈퇴 회원 순") {
            users.forEach((user) => {
                const status = user.querySelector(".User_status").textContent;
                if (!status.includes("탈퇴")) {
                    user.style.display = "none";
                }
            });
        }

        // 정렬된 순서대로 다시 DOM에 추가
        userListContainer.innerHTML = "";
        users.forEach((user) => {
            userListContainer.appendChild(user);
        });
    }

    // 페이지 로드 시 기본적으로 '가입일 순'은 내림차순, '이름 순'은 오름차순으로 정렬
    sortOrder["가입일 순"] = "desc";
    sortOrder["이름 순"] = "asc";

    // 기본 정렬
    sortUsers("가입일 순");

    // 각 옵션 클릭 시 정렬 및 필터링 수행
    options.forEach(function (option) {
        option.addEventListener("click", function () {
            const criteria = option.textContent.trim();

            // 클릭 시마다 정렬 순서 변경
            sortOrder[criteria] =
                sortOrder[criteria] === "asc" ? "desc" : "asc";

            // 모든 옵션의 선택된 클래스 초기화
            options.forEach((opt) => opt.classList.remove("selected"));

            // 클릭된 옵션에 선택된 클래스 추가
            option.classList.add("selected");

            // 선택된 옵션에 따라 정렬 또는 필터링 수행
            sortUsers(criteria);
        });
    });
});

// ---------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".UserFilter_searchInput");
    const userListContainer = document.querySelector(".UserList_userList");

    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const searchTerm = searchInput.value.trim().toLowerCase();
            const users = userListContainer.querySelectorAll(
                ".UserItem_container"
            );

            users.forEach(function (user) {
                const userName = user
                    .querySelector(".UserItem_name")
                    .textContent.trim()
                    .toLowerCase();

                if (userName.includes(searchTerm)) {
                    user.style.display = "flex"; // 검색어가 포함된 회원은 표시
                } else {
                    user.style.display = "none"; // 검색어가 포함되지 않은 회원은 숨김
                }
            });
        }
    });
});
// -------------------------------------------------------
document.querySelectorAll(".pagination-page-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault(); // 기본 링크 동작을 막기

        // 모든 페이지에서 active 클래스를 제거
        document.querySelectorAll(".pagination-page").forEach(function (page) {
            page.classList.remove("active");
        });

        // 클릭한 페이지에 active 클래스를 추가
        this.parentElement.classList.add("active");
    });
});
