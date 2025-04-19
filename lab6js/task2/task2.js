document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    let tasks = [];

    const createTaskElement = (task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);

        const text = document.createElement('span');
        text.className = 'editable';
        text.textContent = task.text;
        text.contentEditable = true;
        text.addEventListener('blur', () => {
            if (text.textContent.trim() === '') {
                alert('Завдання не може бути порожнім');
                text.textContent = task.text;
                return;
            }
            task.text = text.textContent.trim();
            task.updated = new Date();
        });
        text.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                text.blur();
            }
        });

        const info = document.createElement('small');
        info.innerHTML = `
      Статус: ${task.completed ? 'Виконано' : 'Не виконано'} <br>
      Додано: ${task.created.toLocaleString()}
    `;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Видалити';
        delBtn.onclick = () => {
            tasks.splice(index, 1);
            renderTasks();
        };

        li.onclick = (e) => {
            if (e.target === text || e.target === delBtn) return;
            task.completed = !task.completed;
            task.updated = new Date();
            renderTasks();
        };

        li.appendChild(text);
        li.appendChild(info);
        li.appendChild(delBtn);

        return li;
    };

    const renderTasks = () => {
        list.innerHTML = '';
        tasks.forEach((task, index) => {
            list.appendChild(createTaskElement(task, index));
        });
    };

    const addTask = (text) => {
        tasks.push({
            text,
            completed: false,
            created: new Date(),
            updated: new Date()
        });
        renderTasks();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = input.value.trim();
        if (val) {
            addTask(val);
            input.value = '';
        }
    });

    window.sortTasks = (type) => {
        if (type === 'created') {
            tasks.sort((a, b) => a.created - b.created);
        } else if (type === 'status') {
            tasks.sort((a, b) => a.completed - b.completed);
        } else if (type === 'updated') {
            tasks.sort((a, b) => a.updated - b.updated);
        }
        renderTasks();
    };
});
