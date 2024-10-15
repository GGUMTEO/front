document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenu = document.querySelector(".sidebar-menu.mypage");
    const mypageListBox = document.querySelector(".mypage-list-box");
    const iconFold = document.querySelector(".icon-fold");

    // 사이드바 메뉴 접기/펼치기 기능
    sidebarMenu.addEventListener("click", function () {
        if (
            mypageListBox.style.display === "none" ||
            mypageListBox.style.display === ""
        ) {
            mypageListBox.style.display = "block";
        } else {
            mypageListBox.style.display = "none";
        }
        iconFold.classList.toggle("fold-on");
    });

    // 각 입력 필드의 유효성 검사를 위한 정규식 패턴 정의
    const validationPatterns = {
        name: /^[가-힣]{2,4}$/, // 한글 2~4자만 허용 예) 홍길동
        age: /^[0-9]{1,2}$/, // 숫자만 1~2자 허용 예) 21
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 일반 이메일 형식 예) ggumteo@naver.com
        phonenumber: /^010\d{7,8}$/, // 010으로 시작하고 숫자가 10~11자 예) 01099999999
        // 추가사항 작성은 패턴 검사가 필요 없으므로 제외
    };

    // 모든 필수 입력 필드 선택
    const inputFields = document.querySelectorAll(".required");

    // 입력 필드 변화 시 유효성 검사 적용
    inputFields.forEach(function (input) {
        input.addEventListener("input", function () {
            validateInput(input);
        });
    });

    // 유효성 검사 함수
    function validateInput(input) {
        const fieldId = input.id;
        const pattern = validationPatterns[fieldId];

        // 각 필드의 id에 해당하는 패턴이 있을 때만 검사
        if (pattern) {
            if (!pattern.test(input.value.trim())) {
                input.classList.remove("input-valid");
                input.classList.add("input-invalid");
            } else {
                input.classList.remove("input-invalid");
                input.classList.add("input-valid");
            }
        } else {
            // 추가사항 작성은 비어 있어도 valid 처리
            if (fieldId === "addwrite") {
                if (input.value.trim() === "") {
                    input.classList.remove("input-valid");
                    input.classList.remove("input-invalid");
                } else {
                    input.classList.remove("input-invalid");
                    input.classList.add("input-valid");
                }
            }
        }
    }

    // 폼 제출 시 모든 필수 항목이 유효한지 확인
    const submitButton = document.querySelector(".btn-submit");
    submitButton.addEventListener("click", function (event) {
        let isValid = true;

        // 제출 시 모든 필드 재검사
        inputFields.forEach(function (input) {
            validateInput(input);

            // 유효성 검사를 통과하지 못하면 isValid를 false로 설정
            if (
                input.classList.contains("input-invalid") ||
                !input.classList.contains("input-valid")
            ) {
                isValid = false;
            }
        });

        // 유효하지 않은 경우 경고 메시지 표시 및 제출 막기
        if (!isValid) {
            event.preventDefault();
            alert("예시 형식에 맞게 필수 항목을 모두 작성해 주세요.");
        } else {
            alert("성공적으로 제출되었습니다.");
        }
    });
});

// textarea 크기 조절 함수
function resizeTextarea(textarea) {
    textarea.style.height = "auto"; // 높이를 초기화하여 스크롤이 생기지 않게 함
    textarea.style.height = textarea.scrollHeight + 2 + "px"; // 내용을 포함할 만큼 높이 조절
}

// 페이지 로딩 후 초기화
document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.querySelector("textarea[name='description']");
    resizeTextarea(textarea);
});
