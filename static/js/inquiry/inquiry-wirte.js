document.addEventListener("DOMContentLoaded", function () {
    const inputElement = document.querySelector(".label-input-partner input");
    const labelInputPartner = document.querySelector(".label-input-partner");
    const textareaElement = document.querySelector(
        ".textarea__border textarea"
    );
    const textareaBorder = document.querySelector(".textarea__border");

    if (inputElement) {
        inputElement.style.outline = "none"; // Remove default focus outline
        inputElement.style.border = "none"; // Remove default border

        inputElement.addEventListener("focus", function () {
            labelInputPartner.classList.add("label-effect");
            if (!inputElement.classList.contains("error")) {
                inputElement.style.borderColor = "#00a878";
                inputElement.style.borderWidth = "1px";
                inputElement.style.borderStyle = "solid";
            }
        });

        inputElement.addEventListener("blur", function () {
            if (!inputElement.value) {
                labelInputPartner.classList.remove("label-effect");
                inputElement.classList.add("error");
                inputElement.style.borderColor = "#e52929";
                inputElement.style.borderWidth = "1px";
                inputElement.style.borderStyle = "solid";
            } else {
                inputElement.classList.remove("error");
                inputElement.style.border = "1px solid #e0e0e0";
            }
        });

        inputElement.addEventListener("input", function () {
            if (inputElement.classList.contains("error")) {
                inputElement.classList.remove("error");
                inputElement.style.borderColor = "#00a878";
                inputElement.style.borderWidth = "1px";
                inputElement.style.borderStyle = "solid";
            }
            labelInputPartner.classList.add("label-effect");
        });

        inputElement.addEventListener("mouseover", function () {
            if (!inputElement.classList.contains("error")) {
                inputElement.style.borderColor = "#00a878";
                inputElement.style.borderWidth = "1px";
                inputElement.style.borderStyle = "solid";
            }
        });

        inputElement.addEventListener("mouseout", function () {
            if (
                !inputElement.value &&
                !inputElement.classList.contains("error")
            ) {
                inputElement.style.border = "1px solid #e0e0e0";
            }
        });

        inputElement.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault(); // Prevent any action when Enter key is pressed
            }
        });
    }

    if (textareaElement) {
        textareaElement.style.outline = "none"; // Remove default focus outline
        textareaElement.style.border = "none"; // Remove default border

        textareaElement.addEventListener("focus", function () {
            textareaBorder.classList.add("active");
            if (textareaBorder.classList.contains("error")) {
                textareaBorder.style.borderColor = "#e52929";
            } else {
                textareaBorder.style.borderColor = "#00a878";
            }
        });

        textareaElement.addEventListener("blur", function () {
            if (!textareaElement.value) {
                textareaBorder.classList.add("error");
                textareaBorder.style.borderColor = "#e52929";
            } else {
                textareaBorder.classList.remove("error");
                textareaBorder.style.border = "1px solid #e0e0e0";
            }
            textareaBorder.classList.remove("active");
        });

        textareaElement.addEventListener("input", function () {
            if (textareaBorder.classList.contains("error")) {
                textareaBorder.classList.remove("error");
                textareaBorder.style.borderColor = "#00a878";
            }
        });

        textareaElement.addEventListener("mouseover", function () {
            if (textareaBorder.classList.contains("error")) {
                textareaBorder.style.borderColor = "#e52929";
            }
        });
    }
});
