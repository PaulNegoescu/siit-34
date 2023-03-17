import clsx from 'clsx';
import { useAuthContext } from '../../features/Auth/Auth.context';
import { CustomNavLink } from './CustomNavLink';
import styles from './Nav.module.css';

export function Nav() {
  const { user, logout } = useAuthContext();
  return (
    <nav>
      <menu>
        <li>
          <CustomNavLink to="/">Home</CustomNavLink>
        </li>
        <li>
          <CustomNavLink to="/films">Films</CustomNavLink>
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
              <CustomNavLink to="/register">Register</CustomNavLink>
            </li>
            <li>
              <CustomNavLink to="/login">Login</CustomNavLink>
            </li>
          </>
        )}
      </menu>
    </nav>
  );
}
