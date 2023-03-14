import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

export function Nav() {
  return (
    <nav>
      <menu>
        <li>
          <NavLink
            className={({ isActive }) => isActive && styles.active}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive && styles.active}
            to="/todos"
          >
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive && styles.active}
            to="/register"
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => isActive && styles.active}
            to="/login"
          >
            Login
          </NavLink>
        </li>
      </menu>
    </nav>
  );
}
