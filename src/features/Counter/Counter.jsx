import clsx from 'clsx';
import { useState } from 'react';
import styles from './Counter.module.css';

export function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  let outputClassName = clsx({
    [styles['posi-tive']]: count > 0,
    [styles.negative]: count < 0,
  });

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
        <button type="button" onClick={() => handleButtonClick(-5)}>
          -5
        </button>
        <button type="button" onClick={() => handleButtonClick(-1)}>
          -
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
        <button type="button" onClick={() => handleButtonClick(1)}>
          +
        </button>
        <button type="button" onClick={() => handleButtonClick(5)}>
          +5
        </button>
      </p>
    </div>
  );
}
