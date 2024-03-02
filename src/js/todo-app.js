const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList")
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {text: taskText};
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function editTask(index) {
    const newTaskText = prompt("Editar tarefa: ", tasks[index].text);

    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
    
        localStorage.setItem("tasks", JSON.stringify(tasks));

        displayTasks();
    }
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((tasks, index) => {
        const li = document.createElement("li")
        li.classList.add("list-item")
        li.innerHTML = 
        `
        <span>${tasks.text}</span>
        <hr>
        <button class="edit-button" onclick="editTask(${index})">Editar</button>
        <button class="delete-button" onclick="deleteTask(${index})">Excluir</button>
        `;

        taskList.appendChild(li)
    });
}

displayTasks();
