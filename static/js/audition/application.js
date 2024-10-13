document.addEventListener("click", function (event) {
    // 모든 textarea__border에서 active 클래스 제거
    document.querySelectorAll(".textarea__border").forEach(function (border) {
        border.classList.remove("active");
    });

    // 클릭된 요소가 input 또는 textarea일 경우, 해당 요소의 부모 .textarea__border에 active 클래스 추가
    if (event.target.matches("input, textarea")) {
        const border = event.target.closest(".textarea__border");
        if (border) {
            border.classList.add("active");
        }
    }
});

document.addEventListener("focusout", function (event) {
    if (event.target.matches("input, textarea")) {
        const uiTextareaWishket = event.target.closest(".ui-textarea-wishket");
        if (uiTextareaWishket) {
            if (!event.target.value.trim()) {
                uiTextareaWishket.classList.add("error");
                uiTextareaWishket.querySelector(".error-text").style.display =
                    "block";
            } else {
                uiTextareaWishket.classList.remove("error");
                uiTextareaWishket.querySelector(".error-text").style.display =
                    "none";
            }
        }
    }
});

function validateAndSubmitForm() {
    let isValid = true;
    document.querySelectorAll(".wishket-textarea").forEach(function (input) {
        const uiTextareaWishket = input.closest(".ui-textarea-wishket");
        if (!input.value.trim()) {
            uiTextareaWishket.classList.add("error");
            uiTextareaWishket.querySelector(".error-text").style.display =
                "block";
            isValid = false;
        } else {
            uiTextareaWishket.classList.remove("error");
            uiTextareaWishket.querySelector(".error-text").style.display =
                "none";
        }
    });

    if (isValid) {
        document.querySelector("form").submit();
    }
}

document
    .getElementById("consulting_apply_button")
    .addEventListener("click", function (event) {
        event.preventDefault();
        validateAndSubmitForm();
    });
