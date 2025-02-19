export function updateDOM(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => `
        <li class="${task.completed ? 'completed' : ''}">
            <div>
                <strong>${task.title}</strong>
                <p>${task.description}</p>
                <small>Due: ${task.dueDate}</small>
            </div>
            <div class="task-actions">
                <button class="complete-btn" data-id="${task.id}">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit-btn" data-id="${task.id}">Edit</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </div>
        </li>
    `).join('');
}