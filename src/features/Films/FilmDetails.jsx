import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';

export function FilmDetails() {
  const [film, setFilm] = useState(null);
  const { filmId } = useParams();

  const { token } = useAuthContext();
  useEffect(() => {
    async function getFilm() {
      const data = await fetch(`http://localhost:3000/films/${filmId}`).then(
        (res) => res.json()
      );
      setFilm(data);
    }

    getFilm();
  }, [filmId]);

  function handleDelete() {
    const cont = confirm('Are you sure you want to delete this movie?');
    if (cont) {
      fetch('http://localhost:3000/films/' + filmId, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }

  if (!film) {
    return null;
  }

  return (
    <>
      <h1>{film.title}</h1>
      <Link to="edit">Edit this film</Link>
      <button onClick={handleDelete}>Delete this film</button>
    </>
  );
}
