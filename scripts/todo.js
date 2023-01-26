(function () {
  const form = document.querySelector('[data-todo-form]');
  const list = document.querySelector('[data-todo-list]');

  form.addEventListener('submit', handleAddTodo);

  function handleAddTodo(e) {
    e.preventDefault();
    const inputElem = e.target.elements.title;
    const todoText = inputElem.value;

    list.innerHTML += `<li>${todoText}</li>`;
  }
})();
