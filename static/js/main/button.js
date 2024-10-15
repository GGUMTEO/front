const videoButton = document.getElementById("video-button");
const writingButton = document.getElementById("writing-button");

const videoIntrodution = document.getElementById("video-introdution");
const writingIntrodution = document.getElementById("writing-introdution");

videoButton.addEventListener("click", () => {
    videoButton.classList.add("active");
    writingButton.classList.remove("active");
    writingIntrodution.style.display = "none";
    videoIntrodution.style.display = "block";
});

writingButton.addEventListener("click", () => {
    writingButton.classList.add("active");
    videoButton.classList.remove("active");
    videoIntrodution.style.display = "none";
    writingIntrodution.style.display = "block";
});
