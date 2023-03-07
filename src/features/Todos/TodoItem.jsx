export function TodoItem({ data }) {
  return (
    <li>
      <label>
        <input type="checkbox" defaultChecked={data.completed} />
        {data.title}
      </label>
      <button type="button">&times;</button>
    </li>
  );
}
