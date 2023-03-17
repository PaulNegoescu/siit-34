import { Outlet, Route, Routes } from 'react-router-dom';
import { CustomNavLink } from '../../components';
import { AddFilmForm } from './AddFilmForm';
import { FilmCard } from './FilmCard';
import { FilmDetails } from './FilmDetails';
import { FilmList } from './FilmList';
import { UpdateFilm } from './UpdateFilm';

export { FilmCard, FilmDetails, FilmList, UpdateFilm };
export { AddFilmForm } from './AddFilmForm';

export function FilmsLayout() {
  return (
    <>
      <h1>Films</h1>
      <CustomNavLink to="add">Add a new film</CustomNavLink>
      {/* These are the child routes */}
      <Routes>
        <Route path="/" element={<FilmList />} />
        <Route path="add" element={<AddFilmForm />} />
        <Route path=":filmId" element={<FilmDetails />} />
        <Route path=":filmId/edit" element={<UpdateFilm />} />
      </Routes>
      {/* This is where the content of the child routes will be rendered */}
      <Outlet />
    </>
  );
}
