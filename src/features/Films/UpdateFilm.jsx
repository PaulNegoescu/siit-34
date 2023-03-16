import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';

export function UpdateFilm() {
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

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:3000/films/' + filmId, {
      method: 'PATCH',
      body: JSON.stringify({ title: film.title }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (!film) {
    return null;
  }

  return (
    <>
      <h1>{film.title}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={film.title}
          onChange={(e) => setFilm({ ...film, title: e.target.value })}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
