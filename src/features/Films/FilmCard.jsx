import { Link } from 'react-router-dom';

export function FilmCard({ film }) {
  return (
    <p>
      <Link to={`${film.id}`}>
        <img width="100" src={film.poster} alt={`Poster for ${film.title}`} />
        {film.title}
      </Link>
    </p>
  );
}
