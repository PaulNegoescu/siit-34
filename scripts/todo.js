(function () {
  const form = document.querySelector('[data-todo-form]');
  const list = document.querySelector('[data-todo-list]');

  form.addEventListener('submit', handleAddTodo);

  // Event delegation
  list.addEventListener('click', handleDelete);

  const storageKey = 'todoList';
  const savedList = JSON.parse(localStorage.getItem(storageKey));

  let todoList = [];
  if (savedList) {
    todoList = savedList;
    renderList(todoList);
  }

  function handleAddTodo(e) {
    e.preventDefault();

    const inputElem = e.target.elements.title;
    const todoText = inputElem.value;

    todoList.push(todoText);
    localStorage.setItem(storageKey, JSON.stringify(todoList));

    inputElem.value = inputElem.defaultValue;
    inputElem.focus();

    renderList(todoList);
  }

  function handleDelete(e) {
    const itemPos = e.target.dataset.deleteTodo;
    // verificam daca click-ul s-a dat pe elementul pe care doream noi
    if (!itemPos) {
      return;
    }

    todoList.splice(itemPos, 1);
    localStorage.setItem(storageKey, JSON.stringify(todoList));

    // e.target.parentNode.remove();
    renderList(todoList);
  }

  // todoList: ['Buy milk', 'Learn to program', ...]
  function renderList(todoList) {
    list.innerHTML = '';

    for (let i = 0; i < todoList.length; i++) {
      const item = todoList[i];
      const listItem = document.createElement('li');
      listItem.textContent = item;

      const deleteBtn = document.createElement('button');
      deleteBtn.innerHTML = '&times;';
      deleteBtn.classList.add('btn');
      deleteBtn.dataset.deleteTodo = i;
      // deleteBtn.addEventListener('click', handleDelete);

      listItem.append(deleteBtn);

      list.append(listItem);
    }
  }
})();
