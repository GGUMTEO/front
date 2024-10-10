const subNavigations = document.querySelectorAll(".sub-navigation");

subNavigations.forEach((sub) => {
    sub.addEventListener("mouseover", (e) => {
        e.target.style.color = "#002fff";
    });

    sub.addEventListener("mouseout", (e) => {
        e.target.style.color = "#212121";
    });
});

const searchBox = document.querySelector(".search-box");

searchBox.addEventListener("mouseover", (e) => {
    e.target.style.backgroundColor = "#fafafa;";
});

searchBox.addEventListener("mouseout", (e) => {
    e.target.style.backgroundColor = "none";
});
