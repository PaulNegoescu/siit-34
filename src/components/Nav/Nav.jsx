import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../features/Auth/Auth.context';
import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav>
      <menu>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/todos"
          >
            Todos
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => clsx({ [styles.active]: isActive })}
            to="/films"
          >
            Films
          </NavLink>
        </li>

        {user && (
          <li>
            Hello {user.fName}!{' '}
            <a href="#" onClick={() => logout()}>
              Logout
            </a>
          </li>
        )}
        {!user && (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx({ [styles.active]: isActive })
                }
                to="/register"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  clsx({ [styles.active]: isActive })
                }
                to="/login"
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
