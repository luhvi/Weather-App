let selectedCity = 'Copenhagen';

let city = document.querySelector('#cityName');

let date = document.querySelector('#cityDate');

let temp = document.querySelector('#cityTemp');

let minTemp = document.querySelector('#cityTempMin');

let maxTemp = document.querySelector('#cityTempMax');

let weatherIcon = document.querySelector('#weatherIcon');

let feelsLike = document.querySelector('#feelsLike');

let humidity = document.querySelector('#humidity');

let wind = document.querySelector('#wind');

let pressure = document.querySelector('#pressure');

let searchedCity = document.querySelector('#searchCity');

let searchButton = document.querySelector('#searchCityButton');

function selectCity() {
  if (searchedCity.value !== '') {
    selectedCity = searchedCity.value;
    getWeather();
  }
}

searchButton.addEventListener('click', selectCity);

searchedCity.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    selectCity();
  }
});

function convertTimeStamp(timestamp, timezone) {
  const convertTimezone = timezone / 3600;
  const date = new Date(timestamp * 1000);
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(
      convertTimezone
    )}`,
    hour12: true,
  };
  return date.toLocaleString('en-US', options);
}

function convertCountryCode(country) {
  let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
  return regionNames.of(country);
}

function getWeather() {
  const apiKey = '1a63951585f4a3d3cc9b1201eafc0b69';

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data),
        (city.innerHTML = `${data.name}, ${convertCountryCode(
          data.sys.country
        )}`),
        (date.innerHTML = convertTimeStamp(data.dt, data.timezone)),
        (temp.innerHTML = `${data.main.temp.toFixed()}°`),
        (minTemp.innerHTML = `Min: ${data.main.temp_min.toFixed()}°`),
        (maxTemp.innerHTML = `Max: ${data.main.temp_max.toFixed()}°`),
        (weatherIcon.innerHTML = `<img
          src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
        />`),
        (feelsLike.innerHTML = `Feels Like <br /> ${data.main.feels_like.toFixed()}°`),
        (humidity.innerHTML = `Humidity <br /> ${data.main.humidity}%`),
        (wind.innerHTML = `Wind <br /> ${data.wind.speed} m/s`),
        (pressure.innerHTML = `Pressure <br /> ${data.main.pressure} hPa`);
    });
}

document.body.addEventListener('load', getWeather());
