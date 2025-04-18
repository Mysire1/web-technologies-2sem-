document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let tasks = [];

    const renderTasks = () => {
        todoList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.toggle('completed', task.completed);

            li.innerHTML = `
        <span contenteditable="true" class="task-text">${task.text}</span>
        <button onclick="deleteTask(${index})">Видалити</button>
      `;

            li.querySelector('span').addEventListener('blur', (e) => {
                task.text = e.target.innerText;
                task.lastUpdated = new Date();
            });

            li.addEventListener('click', () => toggleTaskCompletion(index));
            todoList.appendChild(li);
        });
    };

    const addTask = (taskText) => {
        const newTask = {
            text: taskText,
            completed: false,
            created: new Date(),
            updated: new Date(),
        };
        tasks.push(newTask);
        renderTasks();
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    const toggleTaskCompletion = (index) => {
        tasks[index].completed = !tasks[index].completed;
        tasks[index].updated = new Date();
        renderTasks();
    };

    const sortTasks = (criteria) => {
        tasks.sort((a, b) => {
            if (criteria === 'created') {
                return a.created - b.created;
            } else if (criteria === 'status') {
                return a.completed - b.completed;
            } else if (criteria === 'updated') {
                return a.updated - b.updated;
            }
        });
        renderTasks();
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            addTask(taskText);
            todoInput.value = '';
        }
    });

    window.sortTasks = sortTasks;
    window.deleteTask = deleteTask;
    window.toggleTaskCompletion = toggleTaskCompletion;
});
