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





// const TASKS_STORAGE_KEY = "tasks";

// export const getTasks = () => JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)) || [];

// export const saveTasks = (tasks) => localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));

// export const addTask = (title, dueDate) => {
//     const tasks = getTasks();
//     const newTask = { id: Date.now(), title, dueDate, completed: false };
//     tasks.push(newTask);
//     saveTasks(tasks);
// };

// export const deleteTask = (taskId) => {
//     let tasks = getTasks().filter(task => task.id !== taskId);
//     saveTasks(tasks);
// };

// export const updateTask = (taskId, updatedProps) => {
//     let tasks = getTasks().map(task =>
//         task.id === taskId ? { ...task, ...updatedProps } : task
//     );
//     saveTasks(tasks);
// };

// export const filterTasks = (filter) => {
//     let tasks = getTasks();
//     if (filter === "completed") return tasks.filter(task => task.completed);
//     if (filter === "incomplete") return tasks.filter(task => !task.completed);
//     return tasks;
// };

// export const sortTasks = (sortBy) => {
//     let tasks = getTasks();
//     return tasks.sort((a, b) => 
//         sortBy === "title" ? a.title.localeCompare(b.title) : new Date(a.dueDate) - new Date(b.dueDate)
//     );
// };
