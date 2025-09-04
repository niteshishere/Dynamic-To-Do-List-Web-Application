let taskFormEl = document.getElementById('task-form');
let taskInputEl = document.getElementById('task-ele');
let taskContainer = document.getElementById('task-container');

// Fetch tasks from localStorage
let taskList = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// Function to display tasks dynamically
function displayTasks(tasks) {
    taskContainer.innerHTML = ""; // clear old tasks
    tasks.forEach((task, index) => {
        let taskCard = document.createElement("div");
        taskCard.className = "card mb-2 shadow-sm";

        taskCard.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <span id="task-text-${index}">${task}</span>
                <div>
                    <button class="btn btn-sm bg-body-secondary me-2" onclick="editTask(${index})">🖋️</button>
                    <button class="btn btn-sm btn-warning" onclick="deleteTask(${index})">❌</button>
                </div>
            </div>
        `;
        taskContainer.appendChild(taskCard);
    });
}

// Handle form submit
taskFormEl.addEventListener('submit', function(e) {
    e.preventDefault();
    let task = taskInputEl.value.trim();
    if (task === "") return;

    taskList.unshift(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
    taskInputEl.value = "";
});

// Delete task
function deleteTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Edit task
function editTask(index) {
    let taskTextEl = document.getElementById(`task-text-${index}`);
    let oldValue = taskList[index];

    // Replace span with input + save button
    taskTextEl.outerHTML = `
        <input type="text" id="edit-input-${index}" class="form-control d-inline w-75" value="${oldValue}">
        <button class="btn btn-sm btn-success ms-2" onclick="saveTask(${index})">💾</button>
    `;
}

// Save edited task
function saveTask(index) {
    let editInput = document.getElementById(`edit-input-${index}`);
    let newValue = editInput.value.trim();

    if (newValue === "") return; // ignore empty updates

    taskList[index] = newValue;
    localStorage.setItem('tasks', JSON.stringify(taskList));
    displayTasks(taskList);
}

// Display tasks when page loads
displayTasks(taskList);
