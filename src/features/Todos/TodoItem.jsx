import { useState } from 'react';

export function TodoItem({ data, onDeleteTodo, onUpdateTodoStatus }) {
  return (
    <li>
      <label>
        <input
          type="checkbox"
          defaultChecked={data.completed}
          onChange={(e) =>
            onUpdateTodoStatus(data.id, Boolean(e.target.checked))
          }
        />
        {data.title}
      </label>
      <button type="button" onClick={() => onDeleteTodo(data.id)}>
        &times;
      </button>
    </li>
  );
}
