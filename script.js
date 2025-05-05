document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addTodo');
    const todoList = document.getElementById('todoList');
    const todoInput = document.getElementById('todoInput');

    function createCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mark-done';
        
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                checkbox.nextElementSibling.classList.add('done'); // assuming taskText is next sibling
                checkbox.parentElement.querySelector('.edit-btn').disabled = true;
            } else {
                checkbox.nextElementSibling.classList.remove('done');
                checkbox.parentElement.querySelector('.edit-btn').disabled = false;
            }
        });
        return checkbox;
    }

    function createTaskText(value) {
        const taskText = document.createElement('span');
        taskText.textContent = value;
        return taskText;
    }

    function createEditButton() {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.addEventListener('click', handleEdit);
        return editButton;
    }

    function createRemoveButton() {
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        removeButton.addEventListener('click', function() {
            todoList.removeChild(removeButton.parentElement.parentElement);
        });
        return removeButton;
    }

    function handleEdit(event) {
        const listItem = event.target.parentElement.parentElement;
        const taskText = listItem.querySelector('span');
        const inputForEdit = document.createElement('input');
        inputForEdit.type = 'text';
        inputForEdit.value = taskText.textContent;
        inputForEdit.className = 'edit-input'; 
        listItem.insertBefore(inputForEdit, taskText);
        listItem.removeChild(taskText);
        inputForEdit.focus();

        inputForEdit.addEventListener('blur', function() {
            taskText.textContent = inputForEdit.value;
            listItem.insertBefore(taskText, inputForEdit);
            listItem.removeChild(inputForEdit);
        });

        inputForEdit.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                inputForEdit.blur();
            }
        });
    }

    function addTask() {
        const inputValue = todoInput.value.trim();
        
        if (!inputValue) return;

        const listItem = document.createElement('li');
        listItem.className = 'list-items';

        listItem.appendChild(createCheckbox());
        listItem.appendChild(createTaskText(inputValue));

        const buttonsDiv = document.createElement('div');
        buttonsDiv.appendChild(createEditButton());
        buttonsDiv.appendChild(createRemoveButton());
        listItem.appendChild(buttonsDiv);

        todoList.appendChild(listItem);
        todoInput.value = '';
    }

    addButton.addEventListener('click', addTask);
    todoInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});