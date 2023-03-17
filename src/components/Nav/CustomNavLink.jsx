import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './Nav.module.css';

export function CustomNavLink({ children, className, ...props }) {
  if (className) {
    throw new Error(
      'CustomNavLink does not handle classNames sent to it as props! This functionality needs to be implemented!'
    );
  }
  return (
    <NavLink
      className={({ isActive }) => clsx({ [styles.active]: isActive })}
      {...props}
    >
      {children}
    </NavLink>
  );
}
