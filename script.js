
const tasks = [];

const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const priorityInput = document.querySelector("#priorityInput");
const filterSelect = document.querySelector("#filterSelect");
const taskList = document.querySelector("#taskList");
const taskCount = document.querySelector("#taskCount");

function renderTasks() {
    taskList.textContent = "";

    const filter = filterSelect.value;

    let visibleTasks = tasks.filter(function(task) {
        if (filter === "active") {
            return !task.completed;
        }

        if (filter === "completed") {
            return task.completed;
        }

        return true;
    });

    visibleTasks.sort(function(a, b) {
        return Number(b.priority === "high") -
               Number(a.priority === "high");
    });

    if (visibleTasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.textContent = "No tasks to display.";
        taskList.appendChild(emptyMessage);
    }

    visibleTasks.forEach(function(task) {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);
        li.classList.toggle("high", task.priority === "high");

        const name = document.createElement("span");
        name.textContent = task.name;

        const buttons = document.createElement("div");
        buttons.className = "task-buttons";

        const completeButton = document.createElement("button");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.type = "button";
        completeButton.dataset.action = "complete";
        completeButton.dataset.id = task.id;

        const priorityButton = document.createElement("button");
        priorityButton.textContent =
            task.priority === "high" ? "Normal Priority" : "Prioritize";
        priorityButton.type = "button";
        priorityButton.dataset.action = "priority";
        priorityButton.dataset.id = task.id;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.dataset.action = "remove";
        removeButton.dataset.id = task.id;

        buttons.appendChild(completeButton);
        buttons.appendChild(priorityButton);
        buttons.appendChild(removeButton);

        li.appendChild(name);
        li.appendChild(buttons);

        taskList.appendChild(li);
    });

    const completedCount = tasks.filter(function(task) {
        return task.completed;
    }).length;

    taskCount.textContent =
        "Total: " + tasks.length +
        " | Completed: " + completedCount;
}

// Handle adding tasks
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = taskInput.value.trim();

    if (name === "") {
        return;
    }

    tasks.push({
        id: Date.now(),
        name: name,
        priority: priorityInput.value,
        completed: false
    });

    taskInput.value = "";
    priorityInput.value = "normal";

    renderTasks();
});

// Handle task button clicks using event delegation
taskList.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button || !taskList.contains(button)) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    const task = tasks.find(function(task) {
        return task.id === id;
    });

    if (!task) {
        return;
    }

    if (action === "complete") {
        task.completed = !task.completed;
    }

    if (action === "priority") {
        task.priority =
            task.priority === "high" ? "normal" : "high";
    }

    if (action === "remove") {
        const index = tasks.findIndex(function(task) {
            return task.id === id;
        });

        tasks.splice(index, 1);
    }

    renderTasks();
});

// Handle filtering
filterSelect.addEventListener("change", renderTasks);

// Display the initial empty state
renderTasks();
