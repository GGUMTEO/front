document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay); // 오버레이 추가
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    const fileInput = document.getElementById("editFiles");
    const filePreviewContainer = document.getElementById(
        "filePreviewContainer"
    );
    let currentEditRow = null;

    // 임시 게시글 데이터
    const postData = {
        content: "이것은 게시글 내용입니다.",
        files: [
            { type: "image", url: "https://via.placeholder.com/150" },
            { type: "image", url: "https://via.placeholder.com/100" },
            {
                type: "video",
                url: "https://www.w3schools.com/html/mov_bbb.mp4",
            },
        ],
        comments: ["댓글1", "댓글2", "댓글3"],
    };

    // 첨부파일을 렌더링하는 함수 (가로 정렬 및 크기 조정 포함)
    function renderFiles(files) {
        filePreviewContainer.innerHTML = ""; // 기존 파일 미리보기 초기화

        files.forEach((file, index) => {
            const fileDiv = document.createElement("div");
            fileDiv.classList.add("fileWrapper");
            fileDiv.style.width = "20%"; // 각 파일의 크기 설정 (20% 가로 크기)
            fileDiv.style.boxSizing = "border-box"; // 테두리를 포함한 박스 크기 설정
            fileDiv.style.marginBottom = "10px"; // 아래 여백 추가

            if (file.type === "image") {
                const img = document.createElement("img");
                img.src = file.url;
                img.style.width = "100%"; // 이미지의 가로 크기 100%로 설정
                fileDiv.appendChild(img);
            } else if (file.type === "video") {
                const video = document.createElement("video");
                video.src = file.url;
                video.controls = true;
                video.style.width = "100%"; // 동영상의 가로 크기 100%로 설정
                fileDiv.appendChild(video);
            }

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "파일 삭제";
            deleteButton.classList.add("deleteFileBtn");
            deleteButton.addEventListener("click", () => deleteFile(index));

            fileDiv.appendChild(deleteButton);
            filePreviewContainer.appendChild(fileDiv);
        });
    }

    // 파일 삭제 함수
    function deleteFile(index) {
        if (confirm("이 파일을 삭제하시겠습니까?")) {
            postData.files.splice(index, 1);
            renderFiles(postData.files);
        }
    }

    // 댓글을 렌더링하는 함수
    function renderComments(comments) {
        const commentList = document.getElementById("commentList");
        commentList.innerHTML = ""; // 기존 댓글 초기화

        comments.forEach((comment, index) => {
            const commentItem = document.createElement("li");
            commentItem.style.display = "flex";
            commentItem.style.justifyContent = "space-between";
            commentItem.style.alignItems = "center";
            commentItem.style.padding = "10px 0";
            commentItem.style.borderBottom = "1px solid #ccc";

            const commentText = document.createElement("span");
            commentText.textContent = comment;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "삭제";
            deleteButton.classList.add("deleteCommentBtn");
            deleteButton.style.marginLeft = "20px";
            deleteButton.addEventListener("click", () => deleteComment(index));

            commentItem.appendChild(commentText);
            commentItem.appendChild(deleteButton);

            commentList.appendChild(commentItem);
        });
    }

    // 댓글 삭제 함수
    function deleteComment(index) {
        if (confirm("이 댓글을 삭제하시겠습니까?")) {
            postData.comments.splice(index, 1);
            renderComments(postData.comments);
        }
    }

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // HTML의 게시글 제목을 가져와 모달에 표시
        const postTitle = row.querySelector(".post_title").textContent.trim();
        document.getElementById("editPostTitle").value = postTitle;

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editPostContent").value = postData.content;

        renderFiles(postData.files);
        renderComments(postData.comments);

        // 모달창과 오버레이 표시
        editModal.style.display = "block";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // 모달창이 열리면 스크롤 막기
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

    // 첨부파일 미리보기
    fileInput.addEventListener("change", function () {
        const files = Array.from(fileInput.files);

        files.forEach((file, index) => {
            const fileDiv = document.createElement("div");
            fileDiv.style.width = "20%"; // 각 파일의 크기 설정 (20% 가로 크기)
            fileDiv.style.boxSizing = "border-box"; // 테두리를 포함한 박스 크기 설정
            fileDiv.style.marginBottom = "10px"; // 여백 추가

            if (file.type.startsWith("image/")) {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                img.style.width = "100%"; // 이미지의 가로 크기 100%로 설정
                fileDiv.appendChild(img);
            } else if (file.type.startsWith("video/")) {
                const video = document.createElement("video");
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.style.width = "100%"; // 동영상의 가로 크기 100%로 설정
                fileDiv.appendChild(video);
            }

            filePreviewContainer.appendChild(fileDiv); // 파일을 미리보기 컨테이너에 추가
        });
    });

    // 변경 사항 저장
    saveChangesBtn.addEventListener("click", function () {
        postData.content = document.getElementById("editPostContent").value;

        // 실제로는 서버에 저장하는 코드가 여기 들어가야 합니다.

        alert("변경 사항이 저장되었습니다.");
        closeModal();
    });

    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");

    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // 기존의 'selected' 클래스 제거
            document
                .querySelector(".sort-filter-option.selected")
                ?.classList.remove("selected");

            // 클릭된 옵션에 'selected' 클래스 추가
            option.classList.add("selected");
        });
    });
});
