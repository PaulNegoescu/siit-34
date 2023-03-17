import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FilmCard } from './FilmCard';

export function FilmList() {
  // we need a state variable to store our movies in, we name it the same as the entity in the DB (despite Andrei's protests)
  // When this variable is updated the DOM needs to change
  const [films, setFilms] = useState(null);

  // We grab the films like we used to, just a simple fetch to the server inside a useEffect
  useEffect(() => {
    // To use async/await syntax we create a new function inside the effect callback, this function can be asyncronous
    // we define it inside the effect so that tooling can help us spot missing dependencies
    async function getFilms() {
      const data = await fetch('http://localhost:3000/films').then((res) =>
        res.json()
      );

      // when the data comes back we set it on the state
      setFilms(data);
    }
    // we call the function inside the effect for it to do its job.
    getFilms();
  }, []);

  //the first time the component loads films will be null we don't want to render anything unless we have films
  if (!films) {
    return null;
  }

  // if we have films we render our proper code
  return (
    <>
      {films.map((film) => (
        // We render a film card component, we specify the key prop so that react does not complain
        <FilmCard key={film.id} film={film} />
      ))}
    </>
  );
}
