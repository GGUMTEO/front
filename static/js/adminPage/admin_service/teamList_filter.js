document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";
    document.body.appendChild(modalOverlay); // 오버레이 추가
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    let currentEditRow = null;

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;

        // 모달창과 오버레이 표시
        editModal.style.display = "block";
        modalOverlay.style.display = "block";
        document.body.style.overflow = "hidden"; // 모달창이 열리면 스크롤 막기

        // 모달창에 현재 행의 데이터 채우기
        const teamLeader = row.querySelector(".TeamLeader_name");
        const joinDate = row.querySelector(".Join_Date");
        const teamName = row.querySelector(".Team_name");
        const teamDescription = row.querySelector(".Team_description");
        const activityLocation = row.querySelector(".Activity_location");
        const teamMembers = row.querySelector(".Team_member");
        const teamPurpose = row.querySelector(".Team_purpose");

        if (teamLeader) {
            document.getElementById("editTeamLeader").value =
                teamLeader.textContent.trim();
        }
        if (joinDate) {
            document.getElementById("editJoinDate").value =
                joinDate.textContent.trim();
        }
        if (teamName) {
            document.getElementById("editTeamName").value =
                teamName.textContent.trim();
        }
        if (teamDescription) {
            document.getElementById("editTeamDescription").value =
                teamDescription.textContent.trim();
        }
        if (activityLocation) {
            document.getElementById("editActivityLocation").value =
                activityLocation.textContent.trim();
        }
        if (teamMembers) {
            document.getElementById("editMembers").value =
                teamMembers.textContent.trim();
        }
        if (teamPurpose) {
            document.getElementById("editPurpose").value =
                teamPurpose.textContent.trim();
        }

        // 임의의 팀원 목록 설정
        const memberList = ["팀원1", "팀원2", "팀원3"]; // 임의의 팀원 배열
        renderMemberList(memberList); // 팀원 목록 렌더링
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
        if (currentEditRow) {
            const teamLeader = currentEditRow.querySelector(".TeamLeader_name");
            const joinDate = currentEditRow.querySelector(".Join_Date");
            const teamName = currentEditRow.querySelector(".Team_name");
            const teamDescription =
                currentEditRow.querySelector(".Team_description");
            const activityLocation =
                currentEditRow.querySelector(".Activity_location");
            const teamMembers = currentEditRow.querySelector(".Team_member");
            const teamPurpose = currentEditRow.querySelector(".Team_purpose");

            if (teamLeader) {
                teamLeader.textContent =
                    document.getElementById("editTeamLeader").value;
            }
            if (joinDate) {
                joinDate.textContent =
                    document.getElementById("editJoinDate").value;
            }
            if (teamName) {
                teamName.textContent =
                    document.getElementById("editTeamName").value;
            }
            if (teamDescription) {
                teamDescription.textContent = document.getElementById(
                    "editTeamDescription"
                ).value;
            }
            if (activityLocation) {
                activityLocation.textContent = document.getElementById(
                    "editActivityLocation"
                ).value;
            }
            if (teamMembers) {
                teamMembers.textContent =
                    document.getElementById("editMembers").value;
            }
            if (teamPurpose) {
                teamPurpose.textContent =
                    document.getElementById("editPurpose").value;
            }

            alert("저장되었습니다."); // 저장 완료 메시지
            closeModal(); // 수정 후 모달 닫기
        }
    });

    // 팀원 목록 렌더링 함수 (여기에서 수정된 코드 적용)
    function renderMemberList(memberList) {
        const memberContainer = document.getElementById("editMemberList");
        memberContainer.innerHTML = ""; // 기존 팀원 목록 초기화

        // 임시로 배열 형태로 팀원 데이터 처리 (나중에 서버에서 가져온 배열 데이터로 교체)
        const members = Array.isArray(memberList)
            ? memberList
            : memberList.split(",");

        members.forEach((member) => {
            const memberElement = document.createElement("div");
            memberElement.style.display = "flex";
            memberElement.style.justifyContent = "space-between";
            memberElement.style.marginBottom = "5px";
            memberElement.style.borderBottom = "1px solid #999";
            memberElement.style.paddingBottom = "5px";

            const nameElement = document.createElement("span");
            nameElement.textContent = member.trim();

            const removeButton = document.createElement("button");
            removeButton.textContent = "탈퇴하기";
            removeButton.style.backgroundColor = "#007bff";
            removeButton.style.color = "white";
            removeButton.style.border = "none";
            removeButton.style.borderRadius = "4px";
            removeButton.style.padding = "4px 8px";
            removeButton.style.cursor = "pointer";
            removeButton.addEventListener("click", () => {
                confirmRemoveMember(member);
            });

            memberElement.appendChild(nameElement);
            memberElement.appendChild(removeButton);
            memberContainer.appendChild(memberElement);
        });
    }

    // 팀원 탈퇴 확인 메시지
    function confirmRemoveMember(member) {
        const confirmMessage = confirm(`${member}을(를) 탈퇴시키겠습니까?`);
        if (confirmMessage) {
            alert(`${member}이(가) 탈퇴되었습니다.`);
            removeMember(member); // 팀원 목록에서 해당 팀원 삭제
        }
    }

    // 팀원 삭제 함수
    function removeMember(member) {
        const memberContainer = document.getElementById("editMemberList");
        const members = Array.from(memberContainer.children);
        members.forEach((memberElement) => {
            if (memberElement.querySelector("span").textContent === member) {
                memberContainer.removeChild(memberElement);
            }
        });
    }

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
