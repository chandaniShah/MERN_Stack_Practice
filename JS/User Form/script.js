const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordHint = document.querySelector(".hint");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailError.textContent = "";
    passwordError.textContent = "";
    formMessage.textContent = "";

    let isValid = true;

    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
    }

    // Password regex
    /*
    /^(?=.*[a-z])      // at least one lowercase
    (?=.*[A-Z])      // at least one uppercase
    (?=.*[\W_])      // at least one special character
    .{8,}$           // minimum 8 characters
    */
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(passwordInput.value)) {
        passwordError.textContent =
            "Password must contain at least 8 characters, one uppercase, one lowercase, and one special character.";
        isValid = false;
    }

    if (isValid) {
        formMessage.textContent = "Account created successfully!";
        formMessage.className = "success";
        form.reset();
    }
});

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length > 0) {
    passwordHint.classList.add("show");
  } else {
    passwordHint.classList.remove("show");
  }
});

/* ================= API FETCH ================= */

const page = document.querySelector(".page");
const fetchBtn = document.getElementById("fetchBtn");
const hideBtn = document.getElementById("hideBtn");
const apiStatus = document.getElementById("apiStatus");
const userList = document.getElementById("userList");

/* LOAD USERS */
fetchBtn.addEventListener("click", async () => {
  apiStatus.textContent = "Loading...";
  apiStatus.className = "api-status loading";
  userList.innerHTML = "";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    apiStatus.textContent = "Users loaded successfully";
    apiStatus.className = "api-status success";

    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.name;
      userList.appendChild(li);
    });

    /* MOVE CARD TO RIGHT */
    page.classList.add("side-layout");

  } catch {
    apiStatus.textContent = "Failed to load users";
    apiStatus.className = "api-status error";
  }
});

/* HIDE USERS */
hideBtn.addEventListener("click", () => {
  userList.innerHTML = "";
  apiStatus.textContent = " ";
  apiStatus.className = "api-status";

  /* MOVE CARD BACK BELOW */
  page.classList.remove("side-layout");
});
