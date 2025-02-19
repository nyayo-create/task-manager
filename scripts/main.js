import { TaskManager } from './taskManager.js';
import { updateDOM } from './domUpdates.js';

const taskManager = new TaskManager();

document.getElementById('taskForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const taskTitle = document.getElementById('taskTitle').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();
    const taskDueDate = document.getElementById('taskDueDate').value;
    if (taskTitle && taskDueDate) {
        taskManager.addTask(taskTitle, taskDescription, taskDueDate);
        updateDOM(taskManager.getTasks());
    } else {
        alert('Please fill in all required fields.');
    }
});

document.getElementById('taskList').addEventListener('click', (event) => {
    const taskId = event.target.dataset.id;
    if (event.target.classList.contains('delete-btn')) {
        taskManager.deleteTask(taskId);
    } else if (event.target.classList.contains('complete-btn')) {
        taskManager.toggleTaskCompletion(taskId);
    } else if (event.target.classList.contains('edit-btn')) {
        const task = taskManager.getTask(taskId);
        document.getElementById('taskTitle').value = task.title;
        document.getElementById('taskDescription').value = task.description;
        document.getElementById('taskDueDate').value = task.dueDate;
        taskManager.deleteTask(taskId);
    }
    updateDOM(taskManager.getTasks());
});

document.getElementById('filterTasks').addEventListener('change', (event) => {
    const filter = event.target.value;
    updateDOM(taskManager.getTasks(filter));
});

document.getElementById('sortTasks').addEventListener('change', (event) => {
    const sortBy = event.target.value;
    updateDOM(taskManager.getTasks('all', sortBy));
});

// Simulate fetching tasks asynchronously
const fetchTasks = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: '1', title: 'Sample Task', description: 'This is a sample task', dueDate: '2023-12-31', completed: false }
            ]);
        }, 1000);
    });
};

const initialize = async () => {
    const tasks = await fetchTasks();
    tasks.forEach(task => taskManager.addTask(task.title, task.description, task.dueDate));
    updateDOM(taskManager.getTasks());
};

initialize();