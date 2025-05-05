document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('addItem');
  const itemList = document.getElementById('itemList');
  const itemInput = document.getElementById('itemInput');

  function createCheckbox() {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'mark-done';

    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        checkbox.nextElementSibling.classList.add('done');
        checkbox.parentElement.querySelector('.edit-btn').disabled = true;
      } else {
        checkbox.nextElementSibling.classList.remove('done');
        checkbox.parentElement.querySelector('.edit-btn').disabled = false;
      }
    });
    return checkbox;
  }

  function createItemText(value) {
    const itemText = document.createElement('span');
    itemText.textContent = value;
    return itemText;
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
    removeButton.addEventListener('click', function () {
      itemList.removeChild(removeButton.parentElement.parentElement);
    });
    return removeButton;
  }

  function handleEdit(event) {
    const listItem = event.target.parentElement.parentElement;
    const itemText = listItem.querySelector('span');
    const inputForEdit = document.createElement('input');
    inputForEdit.type = 'text';
    inputForEdit.value = itemText.textContent;
    inputForEdit.className = 'edit-input';
    listItem.insertBefore(inputForEdit, itemText);
    listItem.removeChild(itemText);
    inputForEdit.focus();

    inputForEdit.addEventListener('blur', function () {
      itemText.textContent = inputForEdit.value;
      listItem.insertBefore(itemText, inputForEdit);
      listItem.removeChild(inputForEdit);
    });

    inputForEdit.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        inputForEdit.blur();
      }
    });
  }

  function addItem() {
    const inputValue = itemInput.value.trim();

    if (!inputValue) return;

    const listItem = document.createElement('li');
    listItem.className = 'list-items';

    listItem.appendChild(createCheckbox());
    listItem.appendChild(createItemText(inputValue));

    const buttonsDiv = document.createElement('div');
    buttonsDiv.appendChild(createEditButton());
    buttonsDiv.appendChild(createRemoveButton());
    listItem.appendChild(buttonsDiv);

    itemList.appendChild(listItem);
    itemInput.value = '';
  }

  addButton.addEventListener('click', addItem);
  itemInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      addItem();
    }
  });
});
