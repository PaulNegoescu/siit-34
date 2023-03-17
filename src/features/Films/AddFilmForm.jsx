import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../Auth/Auth.context';
import { AdditionalEntitiesInput } from './AdditionalEntitiesInput';
import styles from './Films.module.css';

// these are the default values for our fields, we will use this in two places this is why we define it up here
const initialFilmValues = {
  // all values are named the same as in the DB, this will make things easier when saving
  title: '',
  opening_crawl: '',
  director: '',
  poster: '',
  producer: '',
  release_date: '',
  // these will be arrays of values in the DB but we create a Set here
  // Sets store only **unique** values automatically, no need for us to check, but are like arrays otherwise in that they only store related values
  // they are also more performant during lookups (when checking if a value exists in the Set)
  characters: new Set(),
  species: new Set(),
  planets: new Set(),
  starships: new Set(),
};

export function AddFilmForm() {
  // this state is used for all inputs, it's named film because it will represent a film object to be saved in the DB
  const [film, setFilm] = useState(initialFilmValues);
  // this state will be used to build the checkboxes for the user to select the apropriate stuff
  // this is not the input's state but the actual data used to know how many inputs we have, what values and labels they have, etc.
  const [additionalEntities, setAdditionalEntities] = useState({
    planets: [],
    characters: [],
    species: [],
    starships: [],
  });

  useEffect(() => {
    const baseUrl = 'http://localhost:3000/';
    const urls = ['planets', 'characters', 'species', 'starships'];

    // we transform the endpoint array to an array of fetch promises, we need all the other resources so we handle them together
    const promises = urls.map((url) =>
      fetch(baseUrl + url).then((res) => res.json())
    );

    // we wait for all fetches to finish then we take each of the arrays and set them as the value for the additional entities state
    Promise.all(promises).then(([planets, characters, species, starships]) => {
      setAdditionalEntities({ planets, characters, species, starships });
    });
  }, []);

  const { user, token } = useAuthContext();

  // This works the same as the one on register/login, with the exception of the checkbox
  // inputs which we have to treat in a special way
  // Also we notice that the actual handleInputCHange function is wrapped in a useCallback hook.
  // We do this to ensure that after a re-render the reference of the callback stays unchanged, normally
  // when the component function runs again, this callback below would be re-created.
  // useCallback ensures we get the exact same function back, not a different reference.
  // DOn't always use this technique, this makes sense in the current context because there are hundreds
  // of checkboxes, if it were only one input, we wouldn't event think of doing this.
  // Also this only works with React.memo on the AdditionalEntitiesInput component
  const handleInputChange = useCallback((e) => {
    // We use a different form of the setState function here, in this form, instead of a value we pass it
    // a function that returns the new value, that function will receive the old state as an argument.
    // We do this to prevent using the state variable inside of useCallback, as this would force us to have
    // it as a dependency in the dependency array, and the function would be recreated each time the state changes
    // which is exactly what we aim to avoid.
    // Otherwise this works just like we learned together.
    setFilm((oldFilm) => {
      const newFilm = { ...oldFilm };
      if (e.target.type !== 'checkbox') {
        //if this is not one of the checkboxes we do the same thing we did in Auth
        newFilm[e.target.name] = e.target.value;
      } else {
        // if this is one of the checkboxes
        // we first clone the original set (we don't want to mutate the current one)
        newFilm[e.target.name] = new Set(newFilm[e.target.name]);

        if (e.target.checked) {
          // if the checkbox was checked we "push" a new value into the new set"
          newFilm[e.target.name].add(Number(e.target.value));
        } else {
          // if the checkbox was unchecked we remove ("pop") the value
          newFilm[e.target.name].delete(Number(e.target.value));
        }
      }
      return newFilm;
    });
  }, []);
  // This works the same as the one on register/login
  async function handleSubmit(e) {
    e.preventDefault();

    //Do some validation here

    //We add the userId to the film
    const filmObj = { ...film, userId: user.id };

    // We convert the Sets to arrays (we need to save an array in the DB),
    // we do it in a for loop to not type that line 4 times
    const sets = ['planets', 'characters', 'species', 'starships'];
    for (const set of sets) {
      filmObj[set] = Array.from(filmObj[set]);
    }

    // We wait for the fetch to finish and empty all fields,
    // we should treat potential errors and only empty fields if the response is successful
    // for now this is enough to keep things simple
    await fetch('http://localhost:3000/films', {
      method: 'POST',
      body: JSON.stringify(filmObj),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    //we reset the form once the response has arrived
    setFilm(initialFilmValues);
  }

  return (
    <>
      <h1>Add a film</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputChange}
            value={film.title}
          />
        </p>
        <p>
          <label htmlFor="opening_crawl">Opening Crawl</label>
          <textarea
            name="opening_crawl"
            id="opening_crawl"
            onChange={handleInputChange}
            value={film.opening_crawl}
          />
        </p>
        <p>
          <label htmlFor="director">Director</label>
          <input
            type="text"
            name="director"
            id="director"
            onChange={handleInputChange}
            value={film.director}
          />
        </p>
        <p>
          <label htmlFor="poster">Poster</label>
          <input
            type="url"
            name="poster"
            id="poster"
            onChange={handleInputChange}
            value={film.poster}
          />
        </p>
        <p>
          <label htmlFor="producer">Producer</label>
          <input
            type="text"
            name="producer"
            id="producer"
            onChange={handleInputChange}
            value={film.producer}
          />
        </p>
        <p>
          <label htmlFor="release_date">Release Date</label>
          <input
            type="date"
            name="release_date"
            id="release_date"
            onChange={handleInputChange}
            value={film.release_date}
          />
        </p>
        <div>
          <fieldset className={styles.fieldset}>
            <legend>Characters</legend>

            {additionalEntities.characters.map((character) => (
              <AdditionalEntitiesInput
                key={character.id}
                label={character.name}
                id={character.id}
                isChecked={film.characters.has(character.id)}
                name="characters"
                onInputChange={handleInputChange}
              />
            ))}
          </fieldset>
        </div>
        <div>
          <fieldset className={styles.fieldset}>
            <legend>Planets</legend>

            {additionalEntities.planets.map((planet) => (
              <AdditionalEntitiesInput
                key={planet.id}
                label={planet.name}
                id={planet.id}
                isChecked={film.planets.has(planet.id)}
                name="planets"
                onInputChange={handleInputChange}
              />
            ))}
          </fieldset>
        </div>
        <div>
          <fieldset className={styles.fieldset}>
            <legend>Starships</legend>

            {additionalEntities.starships.map((starship) => (
              <AdditionalEntitiesInput
                key={starship.id}
                label={starship.name}
                id={starship.id}
                isChecked={film.starships.has(starship.id)}
                name="starships"
                onInputChange={handleInputChange}
              />
            ))}
          </fieldset>
        </div>
        <div>
          <fieldset className={styles.fieldset}>
            <legend>Species</legend>

            {additionalEntities.species.map((species) => (
              <AdditionalEntitiesInput
                key={species.id}
                label={species.name}
                id={species.id}
                isChecked={film.species.has(species.id)}
                name="species"
                onInputChange={handleInputChange}
              />
            ))}
          </fieldset>
        </div>
        <p>
          <button type="submit">Create New Film</button>
        </p>
      </form>
    </>
  );
}
