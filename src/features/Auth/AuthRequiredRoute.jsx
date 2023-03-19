import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from './Auth.context';

export function AuthRequiredRoute() {
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  // If the user is not logged in we redirect them to the login page
  // We also set the current pathname as the state of the location e.g: {from: '/films/add'}
  // We can take this state on the login page and redirect the user back to the page they were initially trying to visit
  if (!user) {
    return <Navigate to="/login" state={{ from: pathname }} />;
  }

  // If the user is logged in we render the child routes of this one
  return <Outlet />;
}
