document.addEventListener("DOMContentLoaded", () => {
    const editModal = document.getElementById("editModal");
    const closeButton = document.querySelector(".close-button");
    const saveChangesBtn = document.getElementById("saveChanges");
    const sortFilterOptions = document.querySelectorAll(".sort-filter-option");
    let currentEditRow = null;

    let paymentMethodCycle = ["카드", "휴대폰소액", "무통장입금"];
    let paymentStatusCycle = ["완료", "실패"];
    let paymentMethodIndex = -1; // 첫 번째 클릭에서 '카드'가 나오도록 설정
    let paymentStatusIndex = -1; // 첫 번째 클릭에서 '완료'가 나오도록 설정

    // 상태에 따른 색상 적용
    function applyPaymentStatusColors() {
        document.querySelectorAll(".ServiceTable_row").forEach((row) => {
            const statusCell = row.querySelector(".payment_status");
            if (statusCell) {
                const statusText = statusCell.textContent.trim();

                switch (statusText) {
                    case "완료":
                        statusCell.style.color = "green";
                        break;
                    case "실패":
                        statusCell.style.color = "red";
                        break;
                    default:
                        statusCell.style.color = "black"; // 기본 색상
                        break;
                }
            }
        });
    }

    applyPaymentStatusColors(); // 페이지 로드 시 색상 적용

    // 모달 열기
    function openModal(row) {
        currentEditRow = row;
        editModal.style.display = "block";

        // 모달창에 현재 행의 데이터 채우기
        document.getElementById("editUserName").value = row
            .querySelector(".user_name")
            .textContent.trim();
        document.getElementById("editJoinDate").value = row
            .querySelector(".purchase_date")
            .textContent.trim();
        document.getElementById("editPaymentMethod").value = row
            .querySelector(".payment_method")
            .textContent.trim();
        document.getElementById("editPaymentStatus").value = row
            .querySelector(".payment_status")
            .textContent.trim();
    }

    // 모달 닫기
    function closeModal() {
        editModal.style.display = "none";
    }

    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === editModal) {
            closeModal();
        }
    });

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
            currentEditRow.querySelector(".user_name").textContent =
                document.getElementById("editUserName").value;
            currentEditRow.querySelector(".purchase_date").textContent =
                document.getElementById("editJoinDate").value;
            currentEditRow.querySelector(".payment_method").textContent =
                document.getElementById("editPaymentMethod").value;
            currentEditRow.querySelector(".payment_status").textContent =
                document.getElementById("editPaymentStatus").value;

            applyPaymentStatusColors(); // 수정 후 색상 적용
            closeModal(); // 수정 후 모달 닫기
        }
    });

    // 정렬 및 필터 기능 추가
    let sortDirection = {
        결제일: "desc",
    };

    function sortTableByDate(index, key) {
        const rows = Array.from(
            document.querySelectorAll(
                ".ServiceTable_row_wrapper .ServiceTable_row"
            )
        );
        rows.forEach((row) => (row.style.display = "")); // 모든 행을 다시 표시
        rows.sort((a, b) => {
            const dateA = new Date(
                a
                    .querySelector(`.ServiceTable_cell:nth-child(${index})`)
                    .textContent.trim()
            );
            const dateB = new Date(
                b
                    .querySelector(`.ServiceTable_cell:nth-child(${index})`)
                    .textContent.trim()
            );

            if (sortDirection[key] === "desc") {
                return dateB - dateA;
            } else {
                return dateA - dateB;
            }
        });

        const container = document.querySelector(".ServiceTable_row_wrapper");
        rows.forEach((row) => container.appendChild(row));

        // 방향 토글
        sortDirection[key] = sortDirection[key] === "desc" ? "asc" : "desc";

        applyPaymentStatusColors(); // 정렬 후 색상 적용
        addEditButtonListeners(); // 정렬 후 다시 이벤트 리스너 추가
    }

    function filterByPaymentMethod(method) {
        const rows = document.querySelectorAll(
            ".ServiceTable_row_wrapper .ServiceTable_row"
        );
        rows.forEach((row) => {
            const methodCell = row
                .querySelector(".payment_method")
                .textContent.trim();
            if (methodCell === method) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });

        applyPaymentStatusColors(); // 필터 후 색상 적용
        addEditButtonListeners(); // 필터 후 다시 이벤트 리스너 추가
    }

    function filterByPaymentStatus(status) {
        const rows = document.querySelectorAll(
            ".ServiceTable_row_wrapper .ServiceTable_row"
        );
        rows.forEach((row) => {
            const statusCell = row
                .querySelector(".payment_status")
                .textContent.trim();
            if (statusCell === status) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });

        applyPaymentStatusColors(); // 필터 후 색상 적용
        addEditButtonListeners(); // 필터 후 다시 이벤트 리스너 추가
    }

    sortFilterOptions.forEach((option) => {
        option.addEventListener("click", () => {
            // 클릭한 옵션에 따라 다른 필터 초기화
            if (option.textContent.includes("결제 수단")) {
                paymentMethodIndex =
                    (paymentMethodIndex + 1) % paymentMethodCycle.length;
                filterByPaymentMethod(paymentMethodCycle[paymentMethodIndex]);
                // 결제 상태 인덱스 초기화
                paymentStatusIndex = -1;
            } else if (option.textContent.includes("결제 상태")) {
                paymentStatusIndex =
                    (paymentStatusIndex + 1) % paymentStatusCycle.length;
                filterByPaymentStatus(paymentStatusCycle[paymentStatusIndex]);
                // 결제 수단 인덱스 초기화
                paymentMethodIndex = -1;
            } else if (option.textContent.includes("결제일")) {
                sortTableByDate(4, "결제일");
                // 결제 수단과 상태 인덱스 초기화
                paymentMethodIndex = -1;
                paymentStatusIndex = -1;
            }

            // selected 클래스 추가/제거
            document
                .querySelector(".sort-filter-option.selected")
                .classList.remove("selected");
            option.classList.add("selected");
        });
    });
});
