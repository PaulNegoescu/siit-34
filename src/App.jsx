import { Counter } from './features/Counter/Counter';
import { Todos } from './features/Todos/Todos';

export function App() {
  return (
    <>
      <Todos />
      <Counter initialCount={5} />
    </>
  );
}

// React.createElement(Counter, { initialCount: '7' });
