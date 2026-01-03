const showToastBtn = document.getElementById("showToastBtn");
const toast = document.getElementById("toast");

showToastBtn.addEventListener("click", () => {
  /* Show toast */
  toast.classList.add("show");

  /* Hide toast after 3 seconds */
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
});
