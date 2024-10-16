// 모든 메뉴 아이템과 서브메뉴 컨테이너를 선택합니다.
const menuItems = document.querySelectorAll(
    ".MenuItems_menu.MenuItems_hasSubmenu"
);

menuItems.forEach((menuToggle) => {
    menuToggle.addEventListener("click", function () {
        const submenuContainer = menuToggle.nextElementSibling;
        const downIcon = menuToggle.querySelector(
            ".withIcon_icon.MenuItems_downIcon"
        );

        // 서브메뉴의 표시/숨김을 토글합니다.
        submenuContainer.classList.toggle("MenuItems_show");
        downIcon.classList.toggle("MenuItems_open");
    });
});
const subMenus = document.querySelectorAll(
    ".MenuItems_section .MenuItems_submenuContainer .MenuItems_submenu"
);
const sections = document.querySelectorAll(".layout-sections  > section");

// 초기 상태 첫 번째 섹션만 보이기
sections.forEach((section, index) => {
    //section[0]만 block 나머지는 none
    section.style.display = index === 0 ? "block" : "none";
});

subMenus.forEach((subMenu, index) => {
    subMenu.addEventListener("click", () => {
        sections.forEach((section) => {
            section.style.display = "none";
        });
        sections[index].style.display = "block"; // 해당 인덱스의 섹션만 보이기
    });
});

// 정보 버튼 클릭 시 정보 박스 표시/숨김
const infoButton = document.querySelector(".admin-info-button");

infoButton.addEventListener("click", () => {
    const isExpanded = infoButton.getAttribute("aria-expanded") === "true";
    infoButton.setAttribute("aria-expanded", !isExpanded);

    const container = document.querySelector(".ProjectInfo_container");
    const existingInfoBox = document.querySelector(".ProjectInfo_infoBox");

    if (isExpanded && existingInfoBox) {
        container.removeChild(existingInfoBox);
    } else if (!isExpanded) {
        const infoBox = document.createElement("div");
        infoBox.className = "ProjectInfo_infoBox";
        infoBox.setAttribute("role", "region");
        infoBox.setAttribute("aria-labelledby", "project-info");

        infoBox.innerHTML = `
            <dl>
                <dt class="BlindText_textHidden">메이커 명</dt>
                <dd class="ProjectInfo_content">
                    <span class="Avatar_avatar Avatar_sm ProjectInfo_profileImage">
                        <span class="Avatar_inner">
                            <img src="https://static.wadiz.kr/studio/funding/static/media/default-zingugi.de76a099.svg" />
                        </span>
                    </span>
                    <span class="ProjectInfo_makerName">하민지</span>
                </dd>
                <dt class="BlindText_textHidden">상태</dt>
                <dd class="ProjectInfo_content ProjectInfo_stateBox">
                    <span class="ProjectInfo_state">작성 중</span>
                </dd>
            </dl>
            <button class="Button_button Button_primary Button_contained Button_sm Button_startIcon Button_block" type="button">
                <span>
                    <svg viewBox="0 0 40 40" focusable="false" role="presentation" class="withIcon_icon Button_icon" aria-hidden="true">
                        <path d="M33.6 5.2a9 9 0 0 1 0 12.7L29 22.5l-.6.5a11 11 0 0 0-.4-2.4l4.1-4.1a7 7 0 0 0-9.9-9.9l-4.6 4.6a7 7 0 0 0 4.7 11.9 5 5 0 0 1-.2 2 8.9 8.9 0 0 1-7.8-5.4 9.1 9.1 0 0 1-.3-6.5 8.9 8.9 0 0 1 2.1-3.4l4.6-4.6a9 9 0 0 1 12.9 0zm-15.7 9.5a5 5 0 0 0-.2 2 6.9 6.9 0 0 1 6.3 4.2 7 7 0 0 1-1.5 7.7l-5.7 5.7a7 7 0 0 1-9.9-9.9l5.2-5.2a11 11 0 0 1-.4-2.4l-.6.5-5.6 5.6a9 9 0 1 0 12.7 12.8l5.7-5.7a8.9 8.9 0 0 0 2.1-3.4 9.1 9.1 0 0 0-.3-6.5 8.9 8.9 0 0 0-7.8-5.4z"></path>
                    </svg>
                    <span class="Button_children">URL 복사</span>
                </span>
            </button>
        `;
        container.appendChild(infoBox);
    }
});

// 사이드바 사라짐
document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".AppLayout_expandNavButton");
    const nav = document.getElementById("AppNavbarLayout_Nav");
    const mainDiv = document.querySelector("div.AppLayout_main");
    const layoutSections = document.querySelector(".layout-sections");
    let dividerAdded = false;

    button.addEventListener("click", () => {
        button.classList.toggle("AppLayout_expand");
        nav.classList.toggle("AppNavbarLayout_expand");

        if (!dividerAdded) {
            const newDivider = document.createElement("div");
            newDivider.className = "AppNavbarLayout_divider";
            layoutSections.style.marginLeft = "-20px";
            mainDiv.insertBefore(newDivider, nav);
            dividerAdded = true;
        } else {
            const existingDivider = mainDiv.querySelector(
                ".AppNavbarLayout_divider"
            );
            if (existingDivider) {
                mainDiv.removeChild(existingDivider);
                dividerAdded = false;
            }
        }
    });
});

// 체크박스 전체 선택/해제 기능
function updateCheckboxes() {
    const checkboxes = document.querySelectorAll(".userCheckbox");
    const selectAll = document.getElementById("selectAll");

    selectAll.addEventListener("change", function (e) {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = e.target.checked;
        });
    });

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const checkedCount = Array.from(checkboxes).filter(
                (checkbox) => checkbox.checked
            ).length;
            selectAll.checked = checkedCount === checkboxes.length;
        });
    });
}

// 페이지 로드 시 초기화 및 이벤트 리스너 추가
document.addEventListener("DOMContentLoaded", () => {
    updateCheckboxes();
    const addServiceBtn = document.getElementById("addServiceBtn"); //결제 취소 버튼
    const editButtons = document.querySelectorAll(".editBtn"); //수정 버튼
    const authModal = document.getElementById("authModal"); // 확인용 모달
    const editModal = document.getElementById("editModal"); // 수정하기 모달
    const modalWraps = document.querySelectorAll(".modal-wrap");
    const verifyBtn = document.getElementById("verifyBtn"); //모달 확인 버튼
    const cancelBtns = document.querySelectorAll(".cancel-btn"); //모달 취소 버튼
    const deleteSelectedBtn = document.getElementById("deleteSelectedBtn"); // 내역 삭제 버튼
    const saveBtn = document.querySelector(".verify-btn.save"); //수정하기 저장 버튼
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option"); //결제일 순/ 결제 수단 선택

    let actionToPerform = null; // 전역 변수로 초기화

    // 활동중, 탈퇴함 글자 색
    document.querySelectorAll(".UserTable_row").forEach((row) => {
        const statusCell = row.querySelector(".UserTable_cell:nth-child(8)");
        if (statusCell) {
            const statusText = statusCell.textContent.trim();

            switch (statusText) {
                case "활동중":
                    statusCell.style.color = "var(--blue90)";
                    break;
                case "탈퇴함":
                    statusCell.style.color = "var(--gray50)";
                    break;
                default:
                    statusCell.style.color = "black"; // 기본 색상
                    break;
            }
        }
    });
    // 지원 완료, 지원 취소 글자 색
    document.querySelectorAll(".ApplyTable_row").forEach((row) => {
        const statusCell = row.querySelector(".ApplyTable_cell:nth-child(8)");
        if (statusCell) {
            const statusText = statusCell.textContent.trim();

            switch (statusText) {
                case "지원 합격":
                case "면접 합격":
                case "인턴십 수료":
                case "작성 완료":
                case "신고 접수":
                    statusCell.style.color = "var(--blue90)";
                    break;
                case "지원 취소":
                case "면접 취소":
                case "인턴십 미수료":
                case "작성 예정":
                    statusCell.style.color = "var(--gray50)";
                    break;
                case "지원 불합격":
                case "면접 불합격":
                case "처리 완료":
                    statusCell.style.color = "red";
                    break;
                default:
                    statusCell.style.color = "black"; // 기본 색상
                    break;
            }
        }
    });
    // 채용중, 채용 마감 글자 색
    document.querySelectorAll(".announcementTable_row").forEach((row) => {
        const statusCell = row.querySelector(
            ".announcementTable_cell:nth-child(8)"
        );
        if (statusCell) {
            const statusText = statusCell.textContent.trim();

            switch (statusText) {
                case "채용중":
                    statusCell.style.color = "var(--blue90)";
                    break;
                case "채용 마감":
                    statusCell.style.color = "var(--gray50)";
                    break;

                default:
                    statusCell.style.color = "black"; // 기본 색상
                    break;
            }
        }
    });
    // 결제 완료, 결제 취소 글자 색
    document.querySelectorAll(".paymentTable_row").forEach((row) => {
        const statusCell = row.querySelector(".paymentTable_cell:nth-child(8)");
        if (statusCell) {
            const statusText = statusCell.textContent.trim();

            switch (statusText) {
                case "결제 완료":
                    statusCell.style.color = "var(--blue90)";
                    break;
                case "결제 취소":
                    statusCell.style.color = "var(--gray50)";
                    break;

                default:
                    statusCell.style.color = "black"; // 기본 색상
                    break;
            }
        }
    });
    // 답변 예정, 답변 완료 취소 글자 색
    document.querySelectorAll(".inquiryTable_row").forEach((row) => {
        const statusCell = row.querySelector(".inquiryTable_cell:nth-child(8)");
        if (statusCell) {
            const statusText = statusCell.textContent.trim();

            switch (statusText) {
                case "답변 예정":
                    statusCell.style.color = "var(--blue90)";
                    break;
                case "답변 완료":
                    statusCell.style.color = "var(--gray50)";
                    break;

                default:
                    statusCell.style.color = "black"; // 기본 색상
                    break;
            }
        }
    });
    // 페이지네이션 기능
    document.querySelectorAll(".pagination-page-link").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 링크 동작을 막기

            // 모든 페이지에서 active 클래스를 제거
            document
                .querySelectorAll(".pagination-page")
                .forEach(function (page) {
                    page.classList.remove("active");
                });

            // 클릭한 페이지에 active 클래스를 추가
            this.parentElement.classList.add("active");
        });
    });

    // 모달을 여는 함수
    const openModal = (type) => {
        modalWraps.forEach((wrap) => {
            const modal = wrap.closest(".modal");
            if (type === "auth" && authModal === modal) {
                modal.style.display = "flex";
                wrap.style.animation = "popUp 0.5s";
            } else if (type === "edit" && editModal === modal) {
                modal.style.display = "flex";
                wrap.style.animation = "popUp 0.5s";
            }
        });
    };

    // 모달을 닫는 함수
    const closeModal = (type) => {
        console.log(type);
        modalWraps.forEach((wrap) => {
            wrap.style.animation = "popDown 0.5s";
            setTimeout(() => {
                if (type === "auth" && authModal.style.display === "flex") {
                    authModal.style.display = "none";
                } else if (
                    type === "edit" &&
                    editModal.style.display === "flex"
                ) {
                    editModal.style.display = "none";
                }
            }, 450); // 애니메이션 시간과 맞추기
        });
    };

    // 메일 전송 버튼
    // addServiceBtn.addEventListener("click", function () {
    //     openModal("edit");
    // });

    // 수정 버튼
    editButtons.forEach((button) => {
        modalMessage.textContent = "상태를 변경 하시겠습니까?";
        button.addEventListener("click", () => {
            openModal("auth");
        });
    });

    // 문자 전송 버튼 클릭 시 모달창 열기
    // deleteSelectedBtn.addEventListener("click", () => {
    //     modalMessage.textContent = "삭제하시겠습니까?";
    //     actionToPerform = () => {
    //         const selectedCheckboxes = document.querySelectorAll(
    //             ".userCheckbox:checked"
    //         );
    //         selectedCheckboxes.forEach((checkbox) => {
    //             const row = checkbox.closest(".UserTable_row__1Qg9b");
    //             row.parentNode.removeChild(row);
    //         });
    //     };

    //     openModal("auth");
    // });

    // 확인 버튼 클릭 시 모달 닫기
    verifyBtn.addEventListener("click", () => {
        closeModal("auth");
    });

    // 닫기 버튼 클릭 시 모달 닫기
    cancelBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            const modalType =
                btn.closest(".modal").id === "editModal" ? "edit" : "auth";
            closeModal(modalType);
        });
    });

    // 수정-저장버튼 클릭시 모달 닫기
    // saveBtn.addEventListener("click", () => {
    //     closeModal("edit");
    // });

    // 결제일 수, 결제 수단, 결제 상태 눌렀을 때
    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // selected 클래스 추가/제거
            document
                .querySelector(".sort-filter-option.selected")
                .classList.remove("selected");
            option.classList.add("selected");
        });
    });
});

// Enter Modal 창
document.addEventListener("DOMContentLoaded", () => {
    const correctCode = "123456"; // 올바른 인증번호
    const enterModal = document.getElementById("enterModal"); // 모달 창 요소
    const enterVerifyBtn = document.getElementById("enterVerify_btn"); // 인증번호 확인 버튼
    const inputs = document.querySelectorAll(".enter-input"); // 인증번호 입력 필드들
    const enterModalContent = document.querySelector(".enterModal_content");
    const modalWrap = document.querySelector(".modal-wrap");
    // 모달을 여는 함수
    const openEnterModal = () => {
        enterModal.style.display = "flex"; // 모달을 화면에 보이도록 설정
        modalWrap.style.animation = "popUp 0.5s"; // 애니메이션을 적용하여 모달을 열기
        inputs[0].focus(); // 첫 번째 입력 필드에 포커스를 맞춤
    };

    // 모달을 닫는 함수
    const closeEnterModal = () => {
        modalWrap.style.animation = "popDown 0.5s"; // 애니메이션을 적용하여 모달을 닫기
        setTimeout(() => {
            enterModal.style.display = "none"; // 애니메이션이 끝난 후 모달을 화면에서 숨김
        }, 450); // 애니메이션의 지속 시간과 맞추기
    };

    // 페이지 로드 시 모달을 자동으로 열기
    openEnterModal();

    // 입력 필드 처리
    inputs.forEach((input, index) => {
        // 입력이 발생할 때
        input.addEventListener("input", () => {
            // 입력 필드에 한 글자가 입력되면 다음 입력 필드로 포커스를 이동
            if (input.value.length === 1 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // 키다운 이벤트 처리
        input.addEventListener("keydown", (e) => {
            if (
                e.key === "Backspace" &&
                input.value.length === 0 &&
                index > 0
            ) {
                // 백스페이스 키가 눌렸을 때 이전 입력 필드로 포커스를 이동
                inputs[index - 1].focus();
            } else if (e.key === "Enter") {
                // 엔터 키가 눌렸을 때 확인 버튼 클릭
                enterVerifyBtn.click();
            }
        });
    });

    // 확인 버튼 클릭 시 인증번호 확인
    enterVerifyBtn.addEventListener("click", () => {
        // 모든 입력 필드의 값을 합쳐서 인증번호 생성
        const enteredCode = Array.from(inputs)
            .map((input) => input.value)
            .join("");

        // 입력된 인증번호의 길이가 올바른 인증번호의 길이와 같을 때
        if (enteredCode.length === correctCode.length) {
            if (enteredCode === correctCode) {
                // 인증번호가 올바를 때
                closeEnterModal(); // 모달 닫기
            } else {
                // 인증번호가 틀릴 때
                enterModalContent.classList.add("vibration");

                // 모든 입력 필드에 'vibration' 클래스 추가
                inputs.forEach((input) => {
                    input.value = ""; // 모든 입력 필드 초기화
                    input.classList.add("vibration"); // 진동 클래스 추가
                });

                // 첫 번째 입력 필드에 포커스 맞춤
                inputs[0].focus();

                // 일정 시간 후에 'vibration' 클래스 제거
                setTimeout(() => {
                    inputs.forEach((input) => {
                        input.classList.remove("vibration");
                        enterModalContent.classList.remove("vibration");
                    });
                }, 400);
            }
        }
    });
});
