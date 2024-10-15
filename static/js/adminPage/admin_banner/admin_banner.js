document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("baseImage");
    const maxFiles = 6;
    const maxSize = 10 * 1024 * 1024; // 10MB
    const minResolution = { width: 1200, height: 675 };
    const imageListContainer = document.querySelector(
        ".UploadedImageList_container"
    );
    const imageEditModal = document.getElementById("imageEditModal");
    const imageToEdit = document.getElementById("imageToEdit");
    const saveChangesButton = document.getElementById("saveChanges");
    const cancelEditButton = document.getElementById("cancelEdit");
    const rotateButton = document.querySelector(".ImageEditor_crop_2");
    const cropButton = document.querySelector(".ImageEditor_crop_1");
    let validFiles = []; // 유효한 파일들을 저장할 배열
    let currentRotation = 0; // 현재 회전 각도
    let cropping = false; // 자르기 활성화 여부
    let cropStartX, cropStartY, cropEndX, cropEndY; // 자르기 영역 좌표
    let currentEditingFileId = null; // 현재 편집 중인 파일 ID
    const modalWidth = 1160;
    const modalHeight = 655;

    // 오버레이 캔버스 생성 및 스타일 설정
    const overlayCanvas = document.createElement("canvas");
    overlayCanvas.style.position = "absolute";
    overlayCanvas.style.top = 0;
    overlayCanvas.style.left = 0;
    overlayCanvas.style.zIndex = 10;
    imageEditModal.appendChild(overlayCanvas);

    const overlayCtx = overlayCanvas.getContext("2d");

    fileInput.addEventListener("change", function (event) {
        const files = Array.from(event.target.files);
        let errorMessages = [];

        if (files.length + validFiles.length > maxFiles) {
            errorMessages.push("최대 6개의 이미지만 업로드할 수 있습니다.");
        } else {
            files.forEach((file, index) => {
                if (file.size > maxSize) {
                    errorMessages.push(
                        `${file.name} 파일은 10MB를 초과할 수 없습니다.`
                    );
                } else {
                    const img = new Image();
                    img.src = URL.createObjectURL(file);
                    img.onload = function () {
                        if (
                            img.width < minResolution.width ||
                            img.height < minResolution.height
                        ) {
                            errorMessages.push(
                                `${file.name} 파일은 해상도가 1200x675픽셀 이상이어야 합니다.`
                            );
                        } else {
                            file.id = Date.now() + Math.random();
                            validFiles.push(file); // 유효한 파일들을 배열에 저장
                            renderImages(); // 이미지를 다시 렌더링
                        }

                        if (
                            index === files.length - 1 &&
                            errorMessages.length > 0
                        ) {
                            alert(errorMessages.join("\n"));
                        }
                    };
                }
            });
        }
    });

    function renderImages() {
        imageListContainer.innerHTML = ""; // 이전의 이미지를 모두 제거
        validFiles.forEach((file, index) => {
            const imgSrc = URL.createObjectURL(file);
            addImageToList(imgSrc, index, file.id);
        });
    }

    function addImageToList(imageSrc, index, fileId) {
        const listItem = document.createElement("li");
        listItem.className = "UploadedImageList_listItem";
        listItem.tabIndex = 0;
        listItem.role = "button";
        listItem.draggable = true; // 드래그 가능하게 설정
        listItem.dataset.index = index;

        const imageContainer = document.createElement("div");
        imageContainer.className = "UploadedImage_container";
        imageContainer.style.backgroundImage = `url('${imageSrc}')`;

        const editButton = document.createElement("button");
        editButton.className = "UploadedImage_editButton";
        editButton.type = "button";
        editButton.ariaLabel = "이미지 편집하기";
        editButton.textContent = "편집";

        const removeButton = document.createElement("button");
        removeButton.className = "UploadedImage_removeButton";
        removeButton.type = "button";
        removeButton.ariaLabel = "이미지 제거하기";
        removeButton.innerHTML = `
            <svg viewBox="0 0 40 40" focusable="false" role="presentation" class="withIcon_icon" aria-hidden="true" style="width: 18px; height: 18px;">
                <path d="M33.4 8L32 6.6l-12 12-12-12L6.6 8l12 12-12 12L8 33.4l12-12 12 12 1.4-1.4-12-12 12-12z"></path>
            </svg>
        `;

        imageContainer.appendChild(editButton);
        imageContainer.appendChild(removeButton);
        listItem.appendChild(imageContainer);
        imageListContainer.appendChild(listItem);

        removeButton.addEventListener("click", function () {
            validFiles = validFiles.filter((file) => file.id !== fileId);
            renderImages(); // 이미지를 다시 렌더링
        });

        editButton.addEventListener("click", function () {
            currentLi = listItem; // 현재 편집 중인 li 요소 저장
            originalImageSrc = imageSrc; // 원래 이미지 소스를 저장
            imageToEdit.src = imageSrc;
            currentEditingFileId = fileId; // 현재 편집 중인 파일 ID 저장
            imageEditModal.style.display = "block";
            currentRotation = 0; // 회전 각도 초기화
            imageToEdit.style.transform = `rotate(${currentRotation}deg) scale(1)`; // 초기화
            imageToEdit.style.maxWidth = `${modalWidth}px`;
            imageToEdit.style.maxHeight = `${modalHeight}px`;
            resetCropArea(); // 자르기 영역 초기화
            adjustOverlayCanvas(); // 오버레이 캔버스 초기화
        });

        // 드래그 앤 드롭 이벤트 처리
        listItem.addEventListener("dragstart", handleDragStart);
        listItem.addEventListener("dragover", handleDragOver);
        listItem.addEventListener("drop", handleDrop);
        listItem.addEventListener("dragend", handleDragEnd);
    }

    let dragSrcEl = null;

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", this.innerHTML);
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault(); // 드롭을 허용하기 위해 필요
        }
        e.dataTransfer.dropEffect = "move";
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation(); // 브라우저에서 처리되지 않도록 중단
        }

        if (dragSrcEl !== this) {
            const fromIndex = dragSrcEl.dataset.index;
            const toIndex = this.dataset.index;

            // 배열에서 요소 이동
            validFiles.splice(toIndex, 0, validFiles.splice(fromIndex, 1)[0]);

            // 다시 렌더링
            renderImages();
        }

        return false;
    }

    function handleDragEnd(e) {
        dragSrcEl = null;
    }

    // 회전 버튼 클릭 이벤트
    rotateButton.addEventListener("click", function () {
        if (currentEditingFileId === null) return; // 현재 편집 중인 이미지가 없으면 중단
        if (cropping) return; // 자르기 중일 때는 회전하지 않음
        currentRotation = (currentRotation + 90) % 360; // 90도씩 회전, 360도 넘으면 0도로 초기화
        applyRotation(); // 이미지 회전 적용
    });

    function applyRotation() {
        const angle = currentRotation;
        const imageRect = imageToEdit.getBoundingClientRect();

        // 회전 후 이미지 크기 계산
        const radian = angle * (Math.PI / 180);
        const rotatedWidth =
            Math.abs(imageRect.width * Math.cos(radian)) +
            Math.abs(imageRect.height * Math.sin(radian));
        const rotatedHeight =
            Math.abs(imageRect.width * Math.sin(radian)) +
            Math.abs(imageRect.height * Math.cos(radian));

        // 이미지가 모달 크기를 넘지 않도록 스케일 조정
        const scale = Math.min(
            modalWidth / rotatedWidth,
            modalHeight / rotatedHeight
        );

        imageToEdit.style.transform = `rotate(${angle}deg) scale(${scale})`;
        adjustOverlayCanvas(); // 회전 후 오버레이 캔버스 조정
    }

    // 자르기 버튼 클릭 이벤트
    cropButton.addEventListener("click", function () {
        if (currentEditingFileId === null) return; // 현재 편집 중인 이미지가 없으면 중단
        cropping = true; // 자르기 모드 활성화
        overlayCanvas.style.display = "block"; // 자르기 활성화 시 오버레이 캔버스 표시
    });

    overlayCanvas.addEventListener("mousedown", function (event) {
        if (cropping) {
            const rect = imageToEdit.getBoundingClientRect();
            cropStartX = event.clientX - rect.left;
            cropStartY = event.clientY - rect.top;
        }
    });

    overlayCanvas.addEventListener("mousemove", function (event) {
        if (cropping && cropStartX !== undefined && cropStartY !== undefined) {
            const rect = imageToEdit.getBoundingClientRect();
            cropEndX = event.clientX - rect.left;
            cropEndY = event.clientY - rect.top;
            drawOverlay();
        }
    });

    overlayCanvas.addEventListener("mouseup", function () {
        if (cropping) {
            cropImage();
            cropping = false; // 자르기 모드 종료
            overlayCanvas.style.display = "none"; // 오버레이 캔버스 숨기기
            drawOverlay(true); // 최종 크롭 후 오버레이 지우기
        }
    });

    function cropImage() {
        const rect = imageToEdit.getBoundingClientRect();
        const cropWidth = Math.abs(cropEndX - cropStartX);
        const cropHeight = Math.abs(cropEndY - cropStartY);

        // 크롭 영역을 원본 이미지의 스케일로 변환
        const scaleX = imageToEdit.naturalWidth / rect.width;
        const scaleY = imageToEdit.naturalHeight / rect.height;

        const actualCropX = Math.min(cropStartX, cropEndX) * scaleX;
        const actualCropY = Math.min(cropStartY, cropEndY) * scaleY;
        const actualCropWidth = cropWidth * scaleX;
        const actualCropHeight = cropHeight * scaleY;

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = actualCropWidth;
        tempCanvas.height = actualCropHeight;

        tempCtx.drawImage(
            imageToEdit,
            actualCropX,
            actualCropY,
            actualCropWidth,
            actualCropHeight,
            0,
            0,
            actualCropWidth,
            actualCropHeight
        );

        imageToEdit.src = tempCanvas.toDataURL();
        adjustOverlayCanvas(); // 캔버스 조정
        overlayCanvas.style.display = "none"; // 자른 후 오버레이 캔버스 숨기기
    }

    function drawOverlay(clear = false) {
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

        if (!clear) {
            overlayCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
            overlayCtx.fillRect(
                0,
                0,
                overlayCanvas.width,
                overlayCanvas.height
            );

            const cropWidth = cropEndX - cropStartX;
            const cropHeight = cropEndY - cropStartY;

            overlayCtx.clearRect(cropStartX, cropStartY, cropWidth, cropHeight);
            overlayCtx.strokeStyle = "red";
            overlayCtx.lineWidth = 2;
            overlayCtx.strokeRect(
                cropStartX,
                cropStartY,
                cropWidth,
                cropHeight
            );
        }
    }

    function adjustOverlayCanvas() {
        const rect = imageToEdit.getBoundingClientRect();
        overlayCanvas.width = rect.width;
        overlayCanvas.height = rect.height;
        overlayCanvas.style.left = `${rect.left + window.scrollX}px`;
        overlayCanvas.style.top = `${rect.top + window.scrollY}px`;
        drawOverlay(true); // 초기화 시 오버레이 지우기
    }
});
