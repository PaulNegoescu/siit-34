import { useState } from 'react';

export function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  function handleButtonClick(diff) {
    setCount(count + diff);
  }

  function handleReset() {
    setCount(initialCount);
  }

  return (
    <>
      <h1>Counter</h1>
      <p>
        <output>{count}</output>
      </p>
      <p>
        <button onClick={() => handleButtonClick(-5)}>-5</button>
        <button onClick={() => handleButtonClick(-1)}>-</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={() => handleButtonClick(1)}>+</button>
        <button onClick={() => handleButtonClick(5)}>+5</button>
      </p>
    </>
  );
}
