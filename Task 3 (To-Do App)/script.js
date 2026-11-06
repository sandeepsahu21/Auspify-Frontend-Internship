
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");
const emptyState = document.getElementById("empty-state");

const totalCount = document.getElementById("total-count");
const pendingCount = document.getElementById("pending-count");
const completedCount = document.getElementById("completed-count");

const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.getElementById("clear-completed");

const STORAGE_KEY = "taskflow-tasks";

let tasks = [];
let currentFilter = "all";

// Load saved tasks from Local Storage
try {
    const savedTasks = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (Array.isArray(savedTasks)) {
        tasks = savedTasks.filter(task =>
            task &&
            typeof task.id === "string" &&
            typeof task.text === "string" &&
            typeof task.completed === "boolean"
        );
    }
} catch (error) {
    tasks = [];
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        errorMessage.textContent = "Unable to save tasks in this browser.";
        return false;
    }
}

function updateStats() {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;

    totalCount.textContent = tasks.length;
    pendingCount.textContent = pending;
    completedCount.textContent = completed;
}

function renderTasks() {
    taskList.replaceChildren();

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task-item";

        if (task.completed) {
            item.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Mark task as completed");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            updateStats();
            renderTasks();
        });

        const text = document.createElement("span");
        text.className = "task-text";
        text.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("aria-label", `Delete ${task.text}`);

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            saveTasks();
            updateStats();
            renderTasks();
        });

        item.append(checkbox, text, deleteButton);
        taskList.appendChild(item);
    });

    emptyState.hidden = filteredTasks.length > 0;

    if (tasks.length === 0) {
        emptyState.querySelector("h3").textContent = "No tasks yet";
        emptyState.querySelector("p").textContent =
            "Add your first task and start making progress!";
    } else if (filteredTasks.length === 0) {
        emptyState.querySelector("h3").textContent = "Nothing to show";
        emptyState.querySelector("p").textContent =
            "There are no tasks in this filter.";
    }

    updateStats();
}

// Add a new task
taskForm.addEventListener("submit", event => {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        errorMessage.textContent = "Please enter a task first.";
        taskInput.focus();
        return;
    }

    const newTask = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random()}`,
        text: text,
        completed: false
    };

    tasks.unshift(newTask);

    if (!saveTasks()) {
        tasks.shift();
        return;
    }

    currentFilter = "all";
    filterButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === "all");
    });

    taskInput.value = "";
    errorMessage.textContent = "";

    renderTasks();
    taskInput.focus();
});

// Filter tasks
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;

        filterButtons.forEach(filterButton => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("active", isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        renderTasks();
    });
});

// Remove all completed tasks
clearCompletedBtn.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

taskInput.addEventListener("input", () => {
    errorMessage.textContent = "";
});

// Initial display
renderTasks();
