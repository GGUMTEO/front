function setupEventListeners(imgBox) {
    const defaultImg = imgBox.querySelector(".default-img");
    const fileUpload = imgBox.querySelector('input[type="file"]');
    const preview = imgBox.querySelector("img");
    const videoPreview = imgBox.querySelector("video"); // 비디오 미리보기 요소 추가

    defaultImg.addEventListener("click", function () {
        fileUpload.click();
    });

    fileUpload.addEventListener("change", function () {
        previewFile(fileUpload, `#${preview.id}`, `#${videoPreview.id}`); // 비디오 미리보기 추가
    });

    const btnChangeImage = imgBox.querySelector(".btn-edit-item:nth-child(1)");
    btnChangeImage.addEventListener("click", function () {
        fileUpload.click();
    });

    const btnDeleteImage = imgBox.querySelector(".btn-edit-item:nth-child(2)");
    btnDeleteImage.addEventListener("click", function () {
        // 미리보기 이미지 및 관련 요소 초기화
        preview.src =
            "https://www.wishket.com/static/renewal/img/partner/profile/icon_btn_add_portfolio_image.png"; // 기본 이미지
        videoPreview.src = ""; // 비디오 미리보기 초기화
        videoPreview.style.display = "none"; // 비디오 미리보기 숨기기
        const imgCaptionBox = imgBox.querySelector(".img-caption-box");
        const title = imgBox.querySelector(".img-box-title");
        const text = imgBox.querySelector(".img-box-text");
        const help = imgBox.querySelector(".img-box-help");
        const imgEditBox = imgBox.querySelector(".img-edit-box"); // img-edit-box에 대한 참조 추가

        imgCaptionBox.style.display = "none"; // 캡션 입력 박스 숨기기
        title.style.display = "block"; // 제목 다시 보이기
        text.style.display = "block"; // 설명 다시 보이기
        help.style.display = "block"; // 도움말 다시 보이기

        // 삭제버튼 누를 시 div 전체 삭제
        imgBox.style.display = "none";

        // 파일 입력 필드 초기화
        fileUpload.value = ""; // 파일 입력 필드 초기화
    });
}

// 기존 img-box-list에 대한 이벤트 리스너 설정
document.querySelectorAll(".img-box-list").forEach(setupEventListeners);

// 파일 추가 버튼 클릭 시 새로운 img-box-list 추가
document.querySelector(".img-add").addEventListener("click", function () {
    const imgBoxContainer = document.getElementById("img-box-container");
    const timestamp = Date.now(); // 고유 ID를 위한 타임스탬프 생성

    // 새로운 img-box-list 생성
    const newImgBox = document.createElement("div");
    newImgBox.classList.add("img-box-list");
    newImgBox.innerHTML = `
        <div class="img-content-box">
            <div class="img-edit-box" style="margin-left: 510px; margin-top: 28px;">
                <div class="btn-edit-item" id="btn-change-image-${timestamp}">
                    이미지 변경
                </div>
                <div class="btn-edit-item" id="btn-delete-image-${timestamp}">
                    이미지 삭제
                </div>
            </div>
            <div class="center-text img-box">
                <div class="default-img" id="default-img-${timestamp}">
                    <img id="preview-${timestamp}" src="https://www.wishket.com/static/renewal/img/partner/profile/icon_btn_add_portfolio_image.png" class="img-tag" />
                    <video id="video-preview-${timestamp}" class="video-tag" style="display: none;" controls></video> <!-- 비디오 미리보기 추가 -->
                    <div class="img-box-title">작품 영상, 이미지 등록</div>
                    <div class="img-box-text">작품 결과물 혹은 설명을 돕는 이미지를 선택해 주세요.</div>
                    <div class="img-box-help"><span>· 이미지 최적 사이즈: 가로 720px</span></div>
                    <input id="file-upload-${timestamp}" type="file" accept="image/*,video/*" style="display: none;" />
                </div>
            </div>
            <div class="img-caption-box" style="display: none;">
                <div class="default-input-partner">
                    <input type="text" class="img-caption-box-content" placeholder="올린 파일에 대한 설명을 입력해주세요." />
                </div>
            </div>
        </div>
    `;

    // 추가된 img-box-list를 img-box-container 안의 마지막에 추가
    imgBoxContainer.append(newImgBox);

    // 새로 추가된 img-box-list에도 이벤트 리스너 설정
    setupEventListeners(newImgBox);
});

// 파일 미리보기 함수 (파일 선택 시 이미지 및 비디오 미리보기)
function previewFile(fileInput, previewSelector, videoPreviewSelector) {
    const file = fileInput.files[0];
    const preview = document.querySelector(previewSelector);
    const videoPreview = document.querySelector(videoPreviewSelector); // 비디오 미리보기 요소
    const imgBox = preview.closest(".img-box-list");
    const title = imgBox.querySelector(".img-box-title");
    const text = imgBox.querySelector(".img-box-text");
    const help = imgBox.querySelector(".img-box-help");
    const imgCaptionBox = imgBox.querySelector(".img-caption-box");
    const imgEditBox = imgBox.querySelector(".img-edit-box");

    const reader = new FileReader();

    reader.addEventListener("load", function () {
        if (file) {
            if (file.type.startsWith("image/")) {
                // 이미지 파일일 때
                preview.src = reader.result;
                preview.style.display = "block"; // 이미지 미리보기 표시
                videoPreview.style.display = "none"; // 비디오 미리보기 숨기기
                title.style.display = "none";
                text.style.display = "none";
                help.style.display = "none";
                imgCaptionBox.style.display = "block";
                imgEditBox.style.display = "block"; // img-edit-box를 block으로 설정
            } else if (file.type.startsWith("video/")) {
                // 비디오 파일일 때
                videoPreview.src = reader.result;
                videoPreview.style.display = "block"; // 비디오 미리보기 표시
                videoPreview.style.width = "100%";
                preview.style.display = "none"; // 이미지 미리보기 숨기기
                title.style.display = "none";
                text.style.display = "none";
                help.style.display = "none";
                imgCaptionBox.style.display = "block";
                imgEditBox.style.display = "block"; // img-edit-box를 block으로 설정
            }
        }
    });

    if (file) {
        reader.readAsDataURL(file);
    }
}

function previewImage(event) {
    const previewContainer = document.getElementById("preview-container");
    const file = event.target.files[0];

    // 이전 이미지를 지웁니다 (존재하는 경우)
    previewContainer.innerHTML = "";

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            // 새 이미지 요소를 생성합니다
            const img = document.createElement("img");
            img.src = e.target.result; // 업로드된 파일의 소스를 설정합니다
            img.alt = "Uploaded Preview"; // 대체 텍스트 설정
            img.style.width = "100%"; // 필요에 따라 크기 조정
            img.style.borderRadius = "10px";

            // 새 이미지를 미리보기 컨테이너에 추가합니다
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file); // 업로드된 파일을 데이터 URL로 읽습니다
    }
}
