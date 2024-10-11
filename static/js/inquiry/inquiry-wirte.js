document.addEventListener("DOMContentLoaded", () => {
    const labelInputs = document.querySelectorAll(".label-input-partner input");
    const textareas = document.querySelectorAll(".textarea__border textarea");

    labelInputs.forEach((input) => {
        input.addEventListener("focus", (event) => {
            // 부모 요소에 'label-effect' 클래스 추가
            const parent = event.target.closest(".label-input-partner");
            if (parent) {
                parent.classList.add("label-effect");
            }
            // 기본 focus outline 제거
            input.style.outline = "none";
            // 기존 border 효과 제거
            input.style.border = "none";
        });

        input.addEventListener("blur", (event) => {
            // 포커스가 해제되면 'label-effect' 클래스 제거
            const parent = event.target.closest(".label-input-partner");
            if (parent) {
                parent.classList.remove("label-effect");
            }
            // border 효과 복원
            input.style.border = "";
        });
    });

    textareas.forEach((textarea) => {
        textarea.addEventListener("focus", (event) => {
            // 부모 요소에 'active' 클래스 추가
            const parent = event.target.closest(".textarea__border");
            if (parent) {
                parent.classList.add("active");
            }
            // 기본 focus outline 제거
            textarea.style.outline = "none";
        });

        textarea.addEventListener("blur", (event) => {
            // 포커스가 해제되면 'active' 클래스 제거
            const parent = event.target.closest(".textarea__border");
            if (parent) {
                parent.classList.remove("active");
            }
        });
    });
});
