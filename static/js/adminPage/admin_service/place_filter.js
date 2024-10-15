document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay); // 오버레이 요소 추가
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 임시 데이터 (서버 연결 전)
    const mediaData = [
        {
            type: "image",
            src: "https://via.placeholder.com/150",
            name: "example-image-1.jpg",
        },
        {
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            name: "example-video.mp4",
        },
    ];

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // 모달창과 오버레이 표시
        editModal.style.display = "block";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // 모달창이 열리면 스크롤 막기

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".Join_Date")
            .textContent.trim();
        document.getElementById("editPlaceName").value = row
            .querySelector(".PlaceRantalDetail")
            .textContent.trim();
        document.getElementById("editDescription").value =
            "이곳은 소개란 입니다."; // 소개글 기본값 설정
        document.getElementById("editPlaceAddress").value = row
            .querySelector(".placeAddres")
            .textContent.trim();
        document.getElementById("editSportKind").value = row
            .querySelector(".sport_kind")
            .textContent.trim();

        // 미디어 파일 렌더링
        renderMedia(mediaData);
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
        modalOverlay.style.display = "none"; // 오버레이 숨김
        document.body.style.overflow = "auto"; // 모달창이 닫히면 스크롤 다시 활성화
    }

    closeButton.addEventListener("click", closeModal);

    // 수정 버튼 클릭 시 모달 열기
    function addEditButtonListeners() {
        document.querySelectorAll(".editBtn button").forEach((button) => {
            button.addEventListener("click", function () {
                const row = this.closest(".ServiceTable_row");
                openModal(row);
            });
        });
    }

    addEditButtonListeners(); // 초기 로드 시 이벤트 리스너 추가

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        // 임시로 저장 (서버와 연결 후, 이 부분에 실제 저장 로직 추가)
        alert("변경 사항이 저장되었습니다.");
        closeModal();
    });

    // 필터 옵션 관련 기능
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");

    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // 기존의 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                ?.classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            option.classList.add("selected");

            // 정렬 및 필터링 작업
            if (option.textContent.includes("등록일 순")) {
                // 등록일 순 정렬 로직 추가 가능
            } else if (option.textContent.includes("작성자 순")) {
                // 작성자 순 정렬 로직 추가 가능
            } else if (option.textContent.includes("이용자 순")) {
                // 이용자 순 정렬 로직 추가 가능
            }
        });
    });

    // 미디어 파일 렌더링 함수
    function renderMedia(media) {
        const mediaContainer = document.getElementById("editMedia");
        mediaContainer.innerHTML = ""; // 기존 미디어 초기화
        mediaContainer.style.display = "flex";
        mediaContainer.style.flexWrap = "wrap";
        mediaContainer.style.gap = "10px";

        media.forEach((item) => {
            const mediaElement = document.createElement("div");
            mediaElement.style.flexBasis = "20%"; // 이미지와 비디오의 너비를 20%로 설정
            mediaElement.style.boxSizing = "border-box";

            if (item.type === "image") {
                const img = document.createElement("img");
                img.src = item.src;
                img.alt = item.name;
                img.style.width = "100%";
                mediaElement.appendChild(img);
            } else if (item.type === "video") {
                const video = document.createElement("video");
                video.src = item.src;
                video.controls = true;
                video.style.width = "100%";
                mediaElement.appendChild(video);
            }

            mediaContainer.appendChild(mediaElement);
        });
    }
});
