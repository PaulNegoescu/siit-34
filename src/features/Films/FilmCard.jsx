import { Link } from 'react-router-dom';

export function FilmCard({ film }) {
  // We link all of the content to the current film's id doing this
  // will actually create an <a> with a href of /films/13 where 13 might be the id
  return (
    <p>
      <Link to={`${film.id}`}>
        <img width="100" src={film.poster} alt={`Poster for ${film.title}`} />
        {film.title}
      </Link>
    </p>
  );
}
