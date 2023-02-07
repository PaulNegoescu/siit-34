const promise = fetch(
  'https://api.openweathermap.org/data/2.5/weather?q=Brasov,RO&appid=c7da641777760054e5ca6164eb47580a&units=metric'
);

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

const tempDisplay = document.querySelector('[data-temp]');
const weatherIcon = document.querySelector('[data-icon]');
function handleResults(data) {
  console.log(data);

  tempDisplay.textContent = data.main.temp;
  const iconId = data.weather[0].icon;
  const iconName = data.weather[0].main;
  const imgSrc = `http://openweathermap.org/img/wn/${iconId}@2x.png`;
  weatherIcon.src = imgSrc;
  weatherIcon.alt = `${iconName} icon`;
}

// const pro = new Promise((resolve, reject) => {
//   //se intampla multe lucruri aici, woow

//   setTimeout(() => resolve({ body: 'ceva date' }), 1000);
// });

// pro
//   .then((data) => console.log(data.body), console.warn)
//   .then(console.log)
//   .then(console.log);
