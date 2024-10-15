//---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const allSelectToggle = document.querySelector(
        ".SettingsToggle_toggle:first-child .SettingToggle_switch"
    );
    const toggles = document.querySelectorAll(
        ".SettingsToggle_toggle .SettingToggle_switch"
    );
    console.log("e");

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

// ---------------------------------------------------------------
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
// ----------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".PostsFilter_filterButton");

    // 기본적으로 첫 번째 버튼에 선택된 클래스를 추가
    buttons[0].classList.add("PostsFilter_selected");

    // 각 버튼 클릭 시
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            // 모든 버튼의 선택된 클래스와 배경색 초기화
            buttons.forEach((btn) => {
                btn.classList.remove("PostsFilter_selected");
                btn.style.backgroundColor = ""; // 기본 배경색으로 초기화
            });

            // 클릭된 버튼에 선택된 클래스와 배경색 적용
            button.classList.add("PostsFilter_selected");
            button.style.backgroundColor = "#00c4c4"; // 선택된 버튼의 배경색을 #00c4c4로 설정

            // 1초 후에 원래 색으로 돌아오게 설정
            setTimeout(function () {
                button.style.backgroundColor = ""; // 기본 배경색으로 돌아오기
            }, 500); // 1000 밀리초 = 1초
        });
    });
});
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.querySelector(".section_container");
    let currentSort = "date"; // 기본 정렬 기준
    let isAscending = false; // 기본값: 내림차순

    function parseDate(dateString) {
        const now = new Date();

        if (dateString.includes("분 전")) {
            const minutes = parseInt(dateString.split("분 전")[0]);
            return new Date(now.getTime() - minutes * 60000);
        } else if (dateString.includes("시간 전")) {
            const hours = parseInt(dateString.split("시간 전")[0]);
            return new Date(now.getTime() - hours * 3600000);
        } else if (dateString.includes("개월 전")) {
            const months = parseInt(dateString.split("개월 전")[0]);
            return new Date(now.setMonth(now.getMonth() - months));
        } else {
            // YYYY.MM.DD 형식일 경우
            return new Date(dateString);
        }
    }

    function sortPosts(criteria) {
        const posts = Array.from(
            postsContainer.querySelectorAll(".section_document")
        );
        let sortedPosts;

        if (criteria === "date") {
            sortedPosts = posts.sort((a, b) => {
                const dateA = parseDate(
                    a.querySelector(".Post_joinDate").textContent.trim()
                );
                const dateB = parseDate(
                    b.querySelector(".Post_joinDate").textContent.trim()
                );
                return isAscending ? dateA - dateB : dateB - dateA;
            });
        } else if (criteria === "views") {
            sortedPosts = posts.sort((a, b) => {
                const viewsA = parseInt(
                    a.querySelector(".views-ctn").textContent.trim(),
                    10
                );
                const viewsB = parseInt(
                    b.querySelector(".views-ctn").textContent.trim(),
                    10
                );
                return isAscending ? viewsA - viewsB : viewsB - viewsA;
            });
        } else if (criteria === "replies") {
            sortedPosts = posts.sort((a, b) => {
                const repliesA = parseInt(
                    a.querySelector(".reply").textContent.trim(),
                    10
                );
                const repliesB = parseInt(
                    b.querySelector(".reply").textContent.trim(),
                    10
                );
                return isAscending ? repliesA - repliesB : repliesB - repliesA;
            });
        }

        postsContainer.innerHTML = "";
        sortedPosts.forEach((post) => postsContainer.appendChild(post));
    }

    function handleSortClick(criteria) {
        if (currentSort === criteria) {
            isAscending = !isAscending; // 같은 버튼을 클릭하면 정렬 방향을 반대로
        } else {
            currentSort = criteria;
            isAscending = false; // 다른 버튼을 클릭하면 기본값은 내림차순
        }
        sortPosts(criteria);
    }

    // 초기 정렬
    sortPosts("date");

    // 필터 버튼 클릭 이벤트 추가
    document
        .getElementById("sort-by-date")
        .addEventListener("click", function () {
            handleSortClick("date");
        });

    document
        .getElementById("sort-by-views")
        .addEventListener("click", function () {
            handleSortClick("views");
        });

    document
        .getElementById("sort-by-replies")
        .addEventListener("click", function () {
            handleSortClick("replies");
        });
});
// ------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.querySelector(".section_container");
    let currentSort = "date"; // 기본 정렬 기준
    let isAscending = false; // 기본값: 내림차순
    let allPosts = Array.from(
        postsContainer.querySelectorAll(".section_document")
    );

    function parseDate(dateString) {
        const now = new Date();

        if (dateString.includes("분 전")) {
            const minutes = parseInt(dateString.split("분 전")[0]);
            return new Date(now.getTime() - minutes * 60000);
        } else if (dateString.includes("시간 전")) {
            const hours = parseInt(dateString.split("시간 전")[0]);
            return new Date(now.getTime() - hours * 3600000);
        } else if (dateString.includes("개월 전")) {
            const months = parseInt(dateString.split("개월 전")[0]);
            return new Date(now.setMonth(now.getMonth() - months));
        } else {
            // YYYY.MM.DD 형식일 경우
            return new Date(dateString);
        }
    }

    function sortPosts(criteria) {
        let posts = allPosts;
        let sortedPosts;

        if (criteria === "date") {
            sortedPosts = posts.sort((a, b) => {
                const dateA = parseDate(
                    a.querySelector(".Post_joinDate").textContent.trim()
                );
                const dateB = parseDate(
                    b.querySelector(".Post_joinDate").textContent.trim()
                );
                return isAscending ? dateA - dateB : dateB - dateA;
            });
        } else if (criteria === "views") {
            sortedPosts = posts.sort((a, b) => {
                const viewsA = parseInt(
                    a.querySelector(".views-ctn").textContent.trim(),
                    10
                );
                const viewsB = parseInt(
                    b.querySelector(".views-ctn").textContent.trim(),
                    10
                );
                return isAscending ? viewsA - viewsB : viewsB - viewsA;
            });
        } else if (criteria === "replies") {
            sortedPosts = posts.sort((a, b) => {
                const repliesA = parseInt(
                    a.querySelector(".reply").textContent.trim(),
                    10
                );
                const repliesB = parseInt(
                    b.querySelector(".reply").textContent.trim(),
                    10
                );
                return isAscending ? repliesA - repliesB : repliesB - repliesA;
            });
        }

        postsContainer.innerHTML = "";
        sortedPosts.forEach((post) => postsContainer.appendChild(post));
    }

    function handleSortClick(criteria) {
        if (currentSort === criteria) {
            isAscending = !isAscending; // 같은 버튼을 클릭하면 정렬 방향을 반대로
        } else {
            currentSort = criteria;
            isAscending = false; // 다른 버튼을 클릭하면 기본값은 내림차순
        }
        sortPosts(criteria);
    }

    function filterPostsByKeyword(keyword) {
        const filteredPosts = allPosts.filter((post) => {
            const title = post
                .querySelector(".writetitle")
                .textContent.toLowerCase();
            const content = post
                .querySelector(".writecontent")
                .textContent.toLowerCase();
            return (
                title.includes(keyword.toLowerCase()) ||
                content.includes(keyword.toLowerCase())
            );
        });

        postsContainer.innerHTML = "";
        filteredPosts.forEach((post) => postsContainer.appendChild(post));
    }

    // 초기 정렬
    sortPosts("date");

    // 필터 버튼 클릭 이벤트 추가
    document
        .getElementById("sort-by-date")
        .addEventListener("click", function () {
            handleSortClick("date");
        });

    document
        .getElementById("sort-by-views")
        .addEventListener("click", function () {
            handleSortClick("views");
        });

    document
        .getElementById("sort-by-replies")
        .addEventListener("click", function () {
            handleSortClick("replies");
        });

    // 검색 기능 추가 (엔터 키를 눌렀을 때)
    const searchInput = document.querySelector(".PostFilter_searchInput");
    searchInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            const keyword = searchInput.value.trim();
            if (keyword) {
                filterPostsByKeyword(keyword);
            } else {
                // 검색어가 없을 때는 모든 게시글을 다시 표시
                postsContainer.innerHTML = "";
                allPosts.forEach((post) => postsContainer.appendChild(post));
            }
        }
    });
});
