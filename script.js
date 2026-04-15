let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", renderTasks);

// Add task
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") return alert("Enter a task!");

    tasks.push({ text: text, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    renderTasks();
}

// Render tasks
function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        if (
            (filter === "completed" && !task.completed) ||
            (filter === "pending" && task.completed)
        ) return;

        const li = document.createElement("li");

        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""}
                    onchange="toggleTask(${index})">
                <span>${task.text}</span>
            </div>

            <div class="actions">
                <button class="edit" onclick="editTask(${index})">✏️</button>
                <button class="delete" onclick="deleteTask(${index})">X</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Toggle complete
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Edit task
function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    }
}

// Filter
function filterTasks(type) {
    renderTasks(type);
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});