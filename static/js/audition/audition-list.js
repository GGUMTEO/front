document.addEventListener("DOMContentLoaded", () => {
    const searchInputs = document.querySelectorAll(
        ".default-input-wishket input"
    );

    searchInputs.forEach((input) => {
        input.addEventListener("focus", () => {
            // 기본 focus outline 제거
            input.style.outline = "none";
        });
    });
});
