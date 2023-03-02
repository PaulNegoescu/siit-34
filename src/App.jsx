import { Counter } from './features/Counter/Counter';

export function App() {
  return (
    <>
      <Counter initialCount={5} />
    </>
  );
}

// React.createElement(Counter, { initialCount: '7' });
