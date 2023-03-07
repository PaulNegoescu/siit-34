import clsx from 'clsx';
import { useState } from 'react';
import './Counter.css';

export function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  let outputClassName = clsx();

  if (count > 0) {
    outputClassName = 'positive';
  }

  if (count < 0) {
    outputClassName = 'negative';
  }

  function handleButtonClick(diff) {
    setCount(count + diff);
  }

  function handleReset() {
    setCount(initialCount);
  }

  return (
    <div className="counter">
      <h1>Counter</h1>
      <p>
        <output className={outputClassName}>{count}</output>
      </p>
      <p>
        <button onClick={() => handleButtonClick(-5)}>-5</button>
        <button onClick={() => handleButtonClick(-1)}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => handleButtonClick(1)}>+</button>
        <button onClick={() => handleButtonClick(5)}>+5</button>
      </p>
    </div>
  );
}
