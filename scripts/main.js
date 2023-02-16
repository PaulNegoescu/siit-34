(function () {
  const form = document.querySelector('[data-form]');
  const list = document.querySelector('[data-todo-list]');
  const baseUrl = 'http://localhost:3000';

  form.addEventListener('submit', handleAddTodo);
  list.addEventListener('click', handleDeleteTodo);
  list.addEventListener('change', handleTodoUpdate);

  async function handleAddTodo(e) {
    e.preventDefault();
    const title = getTitleFromForm();
    const todo = await saveTodoItem(title);

    const listItem = buildHtmlItem(todo);
    renderHtml(listItem);
  }

  async function handleDeleteTodo(e) {
    const todoId = e.target.dataset.deleteTodo;
    if (!todoId) {
      return;
    }

    await fetch(`${baseUrl}/todos/${todoId}`, {
      method: 'DELETE',
    }).then((res) => res.json());

    e.target.parentNode.remove();
  }

  function getTitleFromForm() {
    return form.children.title.value;
  }

  function buildHtmlItem(todo) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const check = document.createElement('input');
    const deleteBtn = document.createElement('button');

    item.append(check, label, deleteBtn);
    // label.append(check, todo.title);
    label.textContent = todo.title;
    label.htmlFor = 'completed' + todo.id;
    check.id = 'completed' + todo.id;
    check.type = 'checkbox';
    check.checked = todo.completed;
    check.dataset.todoId = todo.id;

    deleteBtn.innerHTML = '&times;';
    deleteBtn.dataset.deleteTodo = todo.id;
    deleteBtn.classList.add('btn', 'btn-delete');

    return item;
  }

  function handleTodoUpdate(e) {
    const todoId = e.target.dataset.todoId;

    if (!todoId) {
      return;
    }

    // console.log(e.target.checked);

    fetch(`${baseUrl}/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed: e.target.checked,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  function renderHtml(item) {
    list.append(item);
  }

  function saveTodoItem(title) {
    return fetch(`${baseUrl}/todos`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  (async function init() {
    const todos = await getDataFromServer();
    displayTodoList(todos);
  })();

  function getDataFromServer() {
    return fetch(`${baseUrl}/todos`).then((res) => res.json());
  }

  function displayTodoList(todos) {
    const fragment = document.createDocumentFragment();
    for (const todo of todos) {
      const item = buildHtmlItem(todo);
      fragment.append(item);
    }
    renderHtml(fragment);
  }
})();
