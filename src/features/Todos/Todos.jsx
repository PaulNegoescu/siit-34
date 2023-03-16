import { useEffect, useRef, useState } from 'react';
import { useAuthContext } from '../Auth/Auth.context';
import { TodoItem } from './TodoItem';

import styles from './Todos.module.css';

export function Todos() {
  const [todos, setTodos] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [error, setError] = useState('');
  const titleInputRef = useRef();

  const { token, user } = useAuthContext();

  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  function handleInputChange(e) {
    setError('');
    setNewTodoTitle(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      setError('Please enter a title for the todo item.');
      return;
    }

    const newTodo = {
      title: newTodoTitle,
      userId: user.id,
      completed: false,
    };

    const newTodoItem = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const updatedTodos = [...todos, newTodoItem];
    setTodos(updatedTodos);
    setNewTodoTitle('');
    titleInputRef.current.focus();
  }

  async function handleDeleteTodo(todoId) {
    await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  }

  async function handleUpdateTodo(todoId, completed) {
    await fetch(`http://localhost:3000/todos/${todoId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        completed,
      }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.completed = completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newTodoTitle}
          onChange={handleInputChange}
          ref={titleInputRef}
        />
        <button type="submit">Add Todo Item</button>
        <p className={styles['has-error']}>{error}</p>
      </form>
      <ul>
        {todos &&
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              data={todo}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodoStatus={handleUpdateTodo}
            />
          ))}
      </ul>
    </>
  );
}
