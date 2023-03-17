import { Outlet } from 'react-router-dom';
import { Nav } from '../Nav';

export function VisitorLayout() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}
