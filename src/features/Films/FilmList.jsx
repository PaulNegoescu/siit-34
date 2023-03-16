import { useEffect, useState } from 'react';
import { FilmCard } from './FilmCard';

export function FilmList() {
  const [films, setFilms] = useState(null);

  useEffect(() => {
    async function getFilms() {
      const data = await fetch('http://localhost:3000/films').then((res) =>
        res.json()
      );
      setFilms(data);
    }

    getFilms();
  }, []);

  if (!films) {
    return null;
  }

  return (
    <>
      <h1>Films</h1>
      {films.map((film) => (
        <FilmCard key={film.id} film={film} />
      ))}
    </>
  );
}
