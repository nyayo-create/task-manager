export class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(title, description, dueDate) {
        const newTask = {
            id: Date.now().toString(),
            title,
            description,
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

    getTask(taskId) {
        return this.tasks.find(task => task.id === taskId);
    }

    getTasks(filter = 'all', sortBy = 'dueDate') {
        let tasks = this.tasks;
        if (filter === 'completed') {
            tasks = tasks.filter(task => task.completed);
        } else if (filter === 'incomplete') {
            tasks = tasks.filter(task => !task.completed);
        }
        if (sortBy === 'title') {
            tasks.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        }
        return tasks;
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}