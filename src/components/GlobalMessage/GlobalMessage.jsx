import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoWarning, IoCheckmarkSharp } from 'react-icons/io5';
import styles from './GlobalMessage.module.css';

export function GlobalMessage({ children, type = 'success', onMessageClosed }) {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    // Nu vrem sa ruleze setTimout decat daca are continut mesajul
    if (children) {
      // Daca continutul s-a schimbat vrem sa setam isShown pe true instantaneu
      setIsShown(true);
      // Dupa 5 secunde vrem sa setam isShown pe false
      setTimeout(() => {
        setIsShown(false);
        onMessageClosed();
      }, 5000);
    }
    // Dependenta din array-ul de mai jos de children inseamna ca daca
    // se schimba children vrem sa ruleze din nou functia din useEffect.
  }, [children]);

  if (!children || !isShown) {
    return null;
  }

  return (
    <div className={styles['message-container']}>
      <div className={clsx(styles.dialog, styles[type])}>
        {/* https://react-icons.github.io/react-icons */}
        {type === 'error' && <IoWarning />}
        {type === 'success' && <IoCheckmarkSharp />}
        {children}
      </div>
    </div>
  );
}
