// Form and input fields 
const form = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Password UI elements 
// const passwordHint = document.querySelector(".hint");
const passwordHelper = document.getElementById("passwordHelper");
const togglePassword = document.getElementById("togglePassword");

// Password checklist and strength meter 
const checklistItems = document.querySelectorAll(".checklist li");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

// Buttons 
const submitBtn = document.querySelector(".primary-btn");
const fetchBtn = document.getElementById("fetchBtn");
const hideBtn = document.getElementById("hideBtn");

// Error and status messages 
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const formMessage = document.getElementById("formMessage");
const apiStatus = document.getElementById("apiStatus");

//Layout and API output 
const page = document.querySelector(".page");
const userList = document.getElementById("userList");

const confirmPasswordInput = document.getElementById("confirmPassword");
const confirmPasswordMessage = document.getElementById("confirmPasswordMessage");

const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/* FORM SUBMISSION LOGIC */

form.addEventListener("submit", function (e) {
  // Prevent default page reload
  e.preventDefault();

  // Reset previous messages 
  emailError.textContent = "";
  passwordError.textContent = "";
  formMessage.textContent = "";

  let isValid = true;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  /* Password validation */
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

  /* If all validations pass */
  if (isValid) {
    // formMessage.textContent = "Account created successfully!";
    // formMessage.className = "success";
    showToast("Account created successfully!");
    confirmPasswordMessage.textContent = "";
    form.reset();

    passwordHelper.classList.remove("show");
    // passwordHint.classList.remove("show");
    strengthText.textContent = "";
    strengthBar.style.width = "0";
  }
});

function updateSubmitState() {
  const passwordsMatch =
    passwordInput.value &&
    confirmPasswordInput.value &&
    passwordInput.value === confirmPasswordInput.value;

  submitBtn.disabled = !(
    emailInput.value &&
    strengthText.textContent === "Strong" &&
    passwordsMatch
  );
}

/* Password visibility toggle */

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";

  // Toggle password visibility 
  passwordInput.type = isHidden ? "text" : "password";

  // Update icon state 
  togglePassword.classList.toggle("hidden", !isHidden);
});


/* PASSWORD INPUT HANDLING */

passwordInput.addEventListener("input", () => {

  // Show or hide hint and helper based on typing 
  if (passwordInput.value.length > 0) {
    // passwordHint.classList.add("show");
    passwordHelper.classList.add("show");
  } else {
    // passwordHint.classList.remove("show");
    passwordHelper.classList.remove("show");
  }

  const value = passwordInput.value;

  // Password validation rules
  const rules = {
    length: value.length >= 8,
    upper: /[A-Z]/.test(value),
    lower: /[a-z]/.test(value),
    special: /[\W_]/.test(value)
  };

  let passed = 0;

  // Update checklist UI
  checklistItems.forEach(item => {
    const rule = item.dataset.rule;
    if (rules[rule]) {
      item.textContent = "✔ " + item.textContent.slice(2);
      item.classList.add("valid");
      passed++;
    } else {
      item.textContent = "❌ " + item.textContent.slice(2);
      item.classList.remove("valid");
    }
  });

  // Update strength meter
  const strength = (passed / 4) * 100;
  strengthBar.style.width = strength + "%";

  if (passed <= 1) {
    strengthBar.style.background = "red";
    strengthText.style.fontSize = "0.9rem";
    strengthText.style.color = "red";
    strengthText.textContent = "Weak";
  } else if (passed <= 3) {
    strengthBar.style.background = "orange";
    strengthText.style.fontSize = "0.9rem";
    strengthText.style.color = "orange";
    strengthText.textContent = "Medium";
  } else {
    strengthBar.style.background = "green";
    strengthText.style.fontSize = "0.9rem";
    strengthText.style.color = "green";
    strengthText.textContent = "Strong";
  }

  if (confirmPasswordInput.value) {
    confirmPasswordInput.dispatchEvent(new Event("input"));
  }

  updateSubmitState();
  // Enable submit button only when password and email are valid
  submitBtn.disabled = !(passed === 4 && emailInput.value);
});


// Email input handling 

emailInput.addEventListener("input", () => {
  submitBtn.disabled = !(
    emailInput.value &&
    strengthText.textContent === "Strong"
  );
});

confirmPasswordInput.addEventListener("input", () => {
  if (!confirmPasswordInput.value) {
    confirmPasswordMessage.textContent = "";
    return;
  }

  if (confirmPasswordInput.value === passwordInput.value) {
    confirmPasswordMessage.textContent = "Passwords match";
    confirmPasswordMessage.className = "match";
  } else {
    confirmPasswordMessage.textContent = "Passwords do not match";
    confirmPasswordMessage.className = "error";
  }

  updateSubmitState();
});

/* API FETCH LOGIC */

fetchBtn.addEventListener("click", async () => {
  // Show loading state 
  apiStatus.textContent = "Loading...";
  apiStatus.className = "api-status loading";
  userList.innerHTML = "";

  try {
    // Fetch users from API 
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    // Success state 
    apiStatus.textContent = "Users loaded successfully";
    apiStatus.className = "api-status success";

    // Render users
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = user.name;
      userList.appendChild(li);
    });

    // Switch layout to side-by-side 
    page.classList.add("side-layout");

  } catch {
    // Error state
    apiStatus.textContent = "Failed to load users";
    apiStatus.className = "api-status error";
  }
});


// Hide users and reset layout

hideBtn.addEventListener("click", () => {
  userList.innerHTML = "";
  apiStatus.textContent = "";
  apiStatus.className = "api-status";

  // Move API card back below the form
  page.classList.remove("side-layout");
});
