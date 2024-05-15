const darkBtn = document.querySelector(".dark-btn");

// elements
const body = document.querySelector("body");

darkBtn.addEventListener("click", () => {
  if (localStorage.getItem("mode") === null) {
    localStorage.setItem("mode", "dark-mode");
    body.classList.add("dark-mode");
  } else if (localStorage.getItem("mode") === "dark-mode") {
    body.classList.remove("dark-mode");
    localStorage.setItem("mode", "light");
  } else if (localStorage.getItem("mode") === "light") {
    body.classList.add("dark-mode");
    localStorage.setItem("mode", "dark-mode");
  }
});
body.classList.add(localStorage.getItem("mode"));
console.log(localStorage.getItem("mode"));

// body.classList.toggle(mode);
