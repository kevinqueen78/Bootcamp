// Task Manager Application with Improvements

class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.taskForm = document.getElementById('task-form');
        this.taskInput = document.getElementById('task-input');
        this.taskList = document.getElementById('task-list');
        this.init();
    }

    init() {
        this.renderTasks();
        this.taskForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        this.taskList.addEventListener('click', this.handleTaskClick.bind(this));
        this.taskList.addEventListener('dblclick', this.handleTaskDblClick.bind(this));
        this.taskList.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.taskList.addEventListener('blur', this.handleBlur.bind(this), true);
    }

    loadTasks() {
        try {
            const stored = localStorage.getItem('tasks');
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.error('Error loading tasks:', e);
            return [];
        }
    }

    saveTasks() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } catch (e) {
            console.error('Error saving tasks:', e);
            alert('Failed to save tasks. Storage may be full.');
        }
    }

    addTask(text) {
        const trimmed = text.trim();
        if (!trimmed || trimmed.length > 100) {
            alert('Task must be 1-100 characters.');
            return;
        }
        const newTask = {
            id: Date.now(),
            text: trimmed,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
        this.renderTasks();
        this.taskInput.value = '';
        this.taskInput.focus();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    editTask(id, newText) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            const trimmed = newText.trim();
            if (!trimmed || trimmed.length > 100) {
                alert('Task must be 1-100 characters.');
                this.renderTasks(); // Revert
                return;
            }
            task.text = trimmed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    renderTasks() {
        // Clear list efficiently
        while (this.taskList.firstChild) {
            this.taskList.removeChild(this.taskList.firstChild);
        }

        const fragment = document.createDocumentFragment();
        this.tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.setAttribute('data-id', task.id);
            if (task.completed) {
                li.classList.add('completed');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-checkbox';
            checkbox.checked = task.completed;
            checkbox.setAttribute('aria-label', `Mark task "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
            checkbox.setAttribute('data-id', task.id);

            const span = document.createElement('span');
            span.className = 'task-text';
            span.textContent = task.text;
            span.setAttribute('data-id', task.id);
            span.tabIndex = 0; // Make focusable

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'task-delete';
            deleteBtn.textContent = 'Delete';
            deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);
            deleteBtn.setAttribute('data-id', task.id);

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            fragment.appendChild(li);
        });
        this.taskList.appendChild(fragment);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const text = this.taskInput.value;
        this.addTask(text);
    }

    handleTaskClick(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        if (e.target.classList.contains('task-checkbox')) {
            this.toggleTask(id);
        } else if (e.target.classList.contains('task-delete')) {
            this.deleteTask(id);
        }
    }

    handleTaskDblClick(e) {
        if (e.target.classList.contains('task-text')) {
            this.startEdit(e.target);
        }
    }

    handleKeyDown(e) {
        const id = parseInt(e.target.getAttribute('data-id'));
        if (e.target.classList.contains('task-text')) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.finishEdit(e.target);
            } else if (e.key === 'Escape') {
                this.renderTasks(); // Cancel edit
            }
        } else if (e.key === 'Delete' && id) {
            this.deleteTask(id);
        }
    }

    handleBlur(e) {
        if (e.target.classList.contains('task-text') && e.target.tagName === 'INPUT') {
            this.finishEdit(e.target);
        }
    }

    startEdit(span) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.className = 'task-text';
        input.setAttribute('data-id', span.getAttribute('data-id'));
        span.parentNode.replaceChild(input, span);
        input.focus();
        input.select();
    }

    finishEdit(input) {
        const id = parseInt(input.getAttribute('data-id'));
        const newText = input.value;
        this.editTask(id, newText);
    }
}

// Initialize the app
new TaskManager();