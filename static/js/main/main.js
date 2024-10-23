const videoButton = document.getElementById("video-button");
const writingButton = document.getElementById("writing-button");

const videoIntrodution = document.getElementById("video-introdution");
const writingIntrodution = document.getElementById("writing-introdution");

const serviceBackground = document.querySelector(".service-introdution-group");
const titles = document.querySelectorAll(
    ".service-introdution-group .service-introdution-box .introdution-info-layer .title"
);

videoButton.addEventListener("click", () => {
    videoButton.classList.add("active");
    writingButton.classList.remove("active");
    writingIntrodution.style.display = "none";
    videoIntrodution.style.display = "block";
    serviceBackground.style.backgroundColor = "#f2faff";
    titles.forEach((e) => {
        e.style.color = "#3ba3c7";
    });
});

writingButton.addEventListener("click", () => {
    writingButton.classList.add("active");
    videoButton.classList.remove("active");
    videoIntrodution.style.display = "none";
    writingIntrodution.style.display = "block";
    serviceBackground.style.backgroundColor = "rgb(232 255 248)";
    titles.forEach((e) => {
        e.style.color = "#00a878";
    });
});
