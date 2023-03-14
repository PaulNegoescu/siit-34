import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';

import { Auth } from './features/Auth/Auth';
import { Counter } from './features/Counter/Counter';
import { Todos } from './features/Todos/Todos';

export function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Counter initialCount={3} />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

// React.createElement(Counter, { initialCount: '7' });
