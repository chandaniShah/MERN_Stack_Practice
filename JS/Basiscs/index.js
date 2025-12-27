// Toggle Dark / Light Mode
const btn = document.getElementById("toggleBtn");

btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Counter
let count = 0;
const countEl = document.getElementById("count");

document.getElementById("inc").onclick = () => {
  count++;
  countEl.textContent = count;
};

document.getElementById("dec").onclick = () => {
  count--;
  countEl.textContent = count;
};

// Live Character Counter
const textarea = document.getElementById("text");
const info = document.getElementById("info");

textarea.addEventListener("input", () => {
  const remaining = 100 - textarea.value.length;
  info.textContent = `${remaining} characters left`;
});

// Simple Todo List
document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("taskInput");
  const li = document.createElement("li");

  li.textContent = input.value;
  document.getElementById("list").appendChild(li);

  input.value = "";
});
