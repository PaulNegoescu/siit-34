import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav, NotFound } from './components';

import {
  AddFilmForm,
  Auth,
  Counter,
  FilmDetails,
  FilmList,
  Todos,
  UpdateFilm,
} from './features';
import { AuthContextProvider } from './features/Auth/Auth.context';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Counter initialCount={3} />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/films" element={<FilmList />} />
          <Route path="/films/add" element={<AddFilmForm />} />
          <Route path="/films/:filmId" element={<FilmDetails />} />
          <Route path="/films/:filmId/edit" element={<UpdateFilm />} />

          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
