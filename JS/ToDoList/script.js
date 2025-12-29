const input = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("todoList");
const filterBtns = document.querySelectorAll(".filters button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

/* ---------- Helpers ---------- */

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  const filteredTodos = todos.filter(todo => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  filteredTodos.forEach(todo => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;
    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <span>${todo.text}</span>
      <span class="delete">✖</span>
    `;

    list.appendChild(li);
  });
}

/* ---------- Add Todo ---------- */

addBtn.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: Date.now(),
    text,
    completed: false
  });

  input.value = "";
  saveTodos();
  renderTodos();
});

/* ---------- Event Delegation ---------- */

list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const id = Number(li.dataset.id);

  if (e.target.classList.contains("delete")) {
    todos = todos.filter(todo => todo.id !== id);
  } else {
    todos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
  }

  saveTodos();
  renderTodos();
});

/* ---------- Filters ---------- */

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

/* ---------- Initial Render ---------- */

renderTodos();
// State management (todos array)
// Event delegation (single listener on <ul>)
// map, filter, find
// localStorage persistence
// Separation of concerns
// Clean DOM updates