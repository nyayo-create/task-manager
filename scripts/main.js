import { TaskManager } from './taskManager.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();
    const taskForm = document.getElementById('taskForm');
    const showFormBtn = document.getElementById('show-form-btn');

    
    showFormBtn.addEventListener('click', () => {
        taskForm.style.display = 'flex';
    });

 
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;

        if (title && dueDate) {
            taskManager.addTask(title, dueDate);
            updateTaskList(taskManager);
            taskForm.reset();
            taskForm.style.display = 'none';
        }
    });

    
    updateTaskList(taskManager);
});


function updateTaskList(taskManager) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = taskManager.getTasks().map(task => `
        <li class="${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
            <div class="task-info">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion('${task.id}')">
                <span>${task.title}</span>
                <small>${task.dueDate}</small>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="editTask('${task.id}')"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" onclick="deleteTask('${task.id}')"><i class="fas fa-trash"></i></button>
            </div>
        </li>
    `).join('');
}


window.toggleTaskCompletion = function(taskId) {
    const taskManager = new TaskManager();
    taskManager.toggleTaskCompletion(taskId);
    updateTaskList(taskManager);
};


window.deleteTask = function(taskId) {
    const taskManager = new TaskManager();
    taskManager.deleteTask(taskId);
    updateTaskList(taskManager);
};


window.editTask = function(taskId) {
    const taskManager = new TaskManager();
    const task = taskManager.getTask(taskId);

    const title = prompt('Edit Title:', task.title);
    const dueDate = prompt('Edit Due Date:', task.dueDate);

    if (title && dueDate) {
        taskManager.editTask(taskId, { title, dueDate });
        updateTaskList(taskManager);
    }
};