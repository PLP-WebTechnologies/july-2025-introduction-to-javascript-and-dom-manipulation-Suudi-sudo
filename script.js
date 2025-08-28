// Part 1: Variables, Data Types, and Conditionals
let tasks = [];
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'all';

// Part 2: Functions
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    
    renderTasks();
    updateCounter();
}

function toggleTaskCompletion(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    renderTasks();
    updateCounter();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    updateCounter();
}

function filterTasks() {
    let filteredTasks = [];
    
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else {
        filteredTasks = tasks;
    }
    
    return filteredTasks;
}

function updateCounter() {
    const activeTasks = tasks.filter(task => !task.completed).length;
    taskCounter.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'} remaining`;
}

function renderTasks() {
    const filteredTasks = filterTasks();
    
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No tasks found</li>';
        return;
    }
    
    taskList.innerHTML = '';
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
        
        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });
}

function setFilter(filter) {
    currentFilter = filter;
    
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderTasks();
}

// Part 3: Loops
function initializeEventListeners() {
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            setFilter(btn.dataset.filter);
        });
    });
}

// Part 4: DOM Manipulation
function initializeApp() {
    initializeEventListeners();
    renderTasks();
    updateCounter();
}

// Initialize the application
initializeApp();