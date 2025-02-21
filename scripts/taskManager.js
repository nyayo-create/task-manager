export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(title, dueDate) {
        const newTask = {
            id: Date.now().toString(),
            title,
            dueDate,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
        }
    }

    editTask(taskId, updatedTask) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            Object.assign(task, updatedTask);
            this.saveTasks();
        }
    }

    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    getTasks() {
        return this.tasks;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}