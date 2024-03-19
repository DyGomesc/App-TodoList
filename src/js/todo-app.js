const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        status: "",
    };
    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";

    displayTasks();
}

function finishTask(index) {
    const updateStatus = tasks[index].status;

    if (updateStatus === "") {
        tasks[index].status = "done";        
    } else if (updateStatus === "done") {
        tasks[index].status = "";
    }

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

function deleteTask(index) {
    tasks.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((tasks, index) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.innerHTML = `
        <span>${tasks.text}</span>
        <hr>
        <button class="finish-button" onclick="finishTask(${index})"><i class="fa-solid fa-check"></i></i></button>
        <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-xmark"></i></button>
        `;

        taskList.appendChild(li);
    });
}



// Contador de tarefas criadas
const totalTasks = document.querySelector("#total-tasks");
const doneTaks = document.querySelector("#done-tasks");

function countAllTasks() {
    return tasks.length;       
}

function countDoneTasks() {
    return tasks.filter(task => task.status === "done").length;
}

totalTasks.textContent = countAllTasks();
doneTaks.textContent = countDoneTasks();

displayTasks();