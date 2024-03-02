const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function lerListaTarefas(){
  let tasks = localStorage.getItem("tasks")

  // essas !! validam se o valor é diferente de null e undefined
  if(!!tasks){
    return JSON.parse(tasks)
  }

  return []
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {        
        text: taskText,
        finish: false
    };
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

// Função para alternar o valor de 'finish'
function toggleFinish(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  task.finish = !task.finish;
  // Atualize o JSON no localStorage ou no servidor, conforme necessário
  displayTasks();
}

// Função para renderizar as tarefas na lista
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // Limpa a lista antes de renderizar novamente

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.name;

    const toggleButton = document.createElement("button");
    toggleButton.textContent = task.finish ? "Desmarcar" : "Marcar";
    toggleButton.addEventListener("click", () => toggleFinish(task.id));

    li.appendChild(toggleButton);
    taskList.appendChild(li);
  });
}

// Chame a função para renderizar as tarefas inicialmente
displayTasks();


function finishTask() {
    const doneListItem = document.querySelector(".list-item");
    doneListItem.classList.toggle("done");
}

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((tasks, index) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        li.innerHTML = `
        <span>${tasks.text}</span>
        <hr>
        <button id="done-btn" class="finish-button" onclick="finishTask()"><i class="fa-solid fa-check"></i></i></button>
        <button class="edit-button" onclick="editTask(${index})"><i class="fa-solid fa-pen"></i></button>
        <button class="delete-button" onclick="deleteTask(${index})"><i class="fa-solid fa-xmark"></i></button>
        `;

        taskList.appendChild(li);
    });
}

displayTasks();

// Contador de tarefas criadas

const contadorTarefas = document.querySelector("#contador-tarefas");
const contadorFinish = document.querySelector("#contador-finish");
// Contador inicial
contadorTarefas.textContent = taskList.children.length;

// Observador de mudanças de divs
const observerTodoCreated = new MutationObserver(function (mutations) {
    // Atualizar o contador sempre que houver uma mudança
    contadorTarefas.textContent = taskList.children.length;
});

// Configurar opções para o observador de mutação
const configTodoCreated = { childList: true };

// Observar mudanças no contêiner de divs com as opções configuradas
observerTodoCreated.observe(taskList, configTodoCreated);
