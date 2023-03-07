import { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';

export function Todos() {
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  return (
    <>
      <h1>Todos</h1>
      <ul>
        {todos && todos.map((todo) => <TodoItem key={todo.id} data={todo} />)}
      </ul>
    </>
  );
}
