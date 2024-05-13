const darkBtn = document.querySelector(".dark-btn");

// elements
const body = document.querySelector("body");

darkBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
