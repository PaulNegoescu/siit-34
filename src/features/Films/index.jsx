import { Outlet, Route, Routes } from 'react-router-dom';
import { CustomNavLink } from '../../components';
import { useAuthContext } from '../Auth';
import { AuthRequiredRoute } from '../Auth/AuthRequiredRoute';
import { AddFilmForm } from './AddFilmForm';
import { FilmCard } from './FilmCard';
import { FilmDetails } from './FilmDetails';
import { FilmList } from './FilmList';
import { UpdateFilm } from './UpdateFilm';

export { FilmCard, FilmDetails, FilmList, UpdateFilm };
export { AddFilmForm } from './AddFilmForm';

export function FilmsLayout() {
  const { user } = useAuthContext();
  return (
    <>
      <h1>Films</h1>
      {user && <CustomNavLink to="add">Add a new film</CustomNavLink>}
      {/* These are the child routes */}
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path=":filmId" element={<FilmDetails />} />
        {/* Note that the following route does not add a segment (no path prop), it's a layout route, its purpose is 
        to validate that the user has access to the child routes. */}
        <Route element={<AuthRequiredRoute />}>
          <Route path="add" element={<AddFilmForm />} />
          <Route path=":filmId/edit" element={<UpdateFilm />} />
        </Route>
      </Routes>
      {/* This is where the content of the child routes will be rendered */}
      <Outlet />
    </>
  );
}
