const searchForm = document.querySelector('[data-search-form]');
const tempDisplay = document.querySelector('[data-temp]');
const weatherIcon = document.querySelector('[data-icon]');
const cityNameDisplay = document.querySelector('[data-city-name]');
const weatherContainer = document.querySelector('[data-weather-container]');

// Luam din input valoarea si o punem intr-o variabila, la submit
searchForm.addEventListener('submit', handleSearch);

function handleSearch(e) {
  e.preventDefault();
  // searchForm === e.target
  const city = searchForm.children.search.value;
  getWeatherByCity(city);
}

navigator.geolocation.getCurrentPosition(handleGeoSuccess, console.warn);

function handleGeoSuccess(geoPosition) {
  //Object destructuring
  const { latitude: lat, longitude: lon } = geoPosition.coords;

  /*
    const o = {
      prop1: 'Paul',
      test: 2,
    };

    const {prop1: name, test: num} = o;
  */

  getWeatherByCoords(lat, lon);
}

function getWeatherByCoords(lat, lon) {
  const promise = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c7da641777760054e5ca6164eb47580a&units=metric`
  );

  handelServerResponse(promise);
}

function getWeatherByCity(city = 'Brasov') {
  const promise = fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},RO&appid=c7da641777760054e5ca6164eb47580a&units=metric`
  );

  handelServerResponse(promise);
}

function handelServerResponse(promise) {
  promise
    .then((resp) => {
      if (resp.ok === false) {
        console.warn(resp.status);
        throw new Error('Response from server was not ok.');
      }
      return resp.json();
    }, console.warn)
    .then(handleResults)
    .catch(console.warn);
  // .addEventListener((e) => e.preventDefault())

  function handleResults(data) {
    weatherContainer.classList.remove('hidden');

    tempDisplay.textContent = data.main.temp;
    const iconId = data.weather[0].icon;
    const iconName = data.weather[0].main;
    const imgSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
    weatherIcon.src = imgSrc;
    weatherIcon.alt = `${iconName} icon`;
    cityNameDisplay.textContent = data.name;
  }
}

// const pro = new Promise((resolve, reject) => {
//   //se intampla multe lucruri aici, woow

//   setTimeout(() => resolve({ body: 'ceva date' }), 1000);
// });

// pro
//   .then((data) => console.log(data.body), console.warn)
//   .then(console.log)
//   .then(console.log);
