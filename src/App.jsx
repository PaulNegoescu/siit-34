import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { VisitorLayout } from './components';

import {
  AddFilmForm,
  Auth,
  FilmDetails,
  FilmList,
  UpdateFilm,
  NotFound,
  AuthContextProvider,
  FilmsLayout,
} from './features';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          {/* We say that the / route should be a layout, the layout will wap all other child routes */}
          <Route path="/" element={<VisitorLayout />}>
            {/* The index route is special, it refers to / in this case. index as a props tells the route 
            to not add any segment to the current path */}
            <Route index element={<h1>There is no homepage</h1>} />
            {/* Routes created like this have child routes, look at the FilmsLayout component to see how those are implemented */}
            <Route path="films/*" element={<FilmsLayout />} />
            <Route path="register" element={<Auth />} />
            <Route path="login" element={<Auth />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
