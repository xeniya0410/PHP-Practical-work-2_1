
const mainTitle = document.getElementById('main-title');
const firstParagraph = document.querySelector('.content-paragraph');
const allParagraphs = document.querySelectorAll('.content-paragraph');
const demoLink = document.getElementById('demo-link');
const container = document.getElementById('container');
const actionButton = document.getElementById('action-button');
const resetButton = document.getElementById('reset-button');
const projectAreaH2 = document.querySelector('#project-area h2');
const taskInput = document.getElementById('new-todo');
const addTaskButton = document.getElementById('add-todo');
const taskList = document.getElementById('todo-list');

mainTitle.textContent = 'Осваиваем DOM!';
demoLink.setAttribute('href', 'https://www.google.com');
allParagraphs[1].textContent = 'Это второй абзац (обновленный).';


const newParagraphEnd = document.createElement('p');
newParagraphEnd.textContent = 'Это совершенно новый абзац (в конце)!';
container.appendChild(newParagraphEnd);

const newParagraphStart = document.createElement('p');
newParagraphStart.textContent = 'Это совершенно новый абзац (в начале)!';
container.prepend(newParagraphStart);


firstParagraph.classList.add('highlight');
setTimeout(() => {
  firstParagraph.classList.remove('highlight');
}, 2000);


projectAreaH2.addEventListener('click', function () {
  this.classList.toggle('hidden');
});


actionButton.addEventListener('click', () => {
  document.body.style.backgroundColor = 'aliceblue';
});

resetButton.addEventListener('click', () => {
  location.reload();
});


let tasks = [];

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks'));
  if (savedTasks) {
    tasks = savedTasks;
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
  saveTasks();
}

addTaskButton.addEventListener('click', addTask);

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.textContent = task.text;
    taskItem.dataset.id = task.id;

    if (task.completed) {
      taskItem.classList.add('completed');
    }


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', function (event) {
      event.stopPropagation();
      deleteTask(task.id);
    });

    taskItem.appendChild(deleteButton);


    taskItem.addEventListener('click', function () {
      toggleTaskStatus(task.id);
    });

    taskList.appendChild(taskItem);
  });
}

function toggleTaskStatus(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    saveTasks();
  }
}

function deleteTask(taskId) {
  const confirmation = confirm('Вы уверены, что хотите удалить эту задачу?');
  if (confirmation) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
    saveTasks();
  }
}

loadTasks();
