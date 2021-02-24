////Setting date, time
let now = new Date();
formatDate(now);
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let currDay = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let currMonth = months[date.getMonth()];
  let currDate = date.getDate();
  let currYear = date.getFullYear();
  let currHours = date.getHours();
  if (currHours < 10) {
    currHours = `0${currHours}`;
  }
  let currMinutes = date.getMinutes();
  if (currMinutes < 10) {
    currMinutes = `0${currMinutes}`;
  }

  let dateInput = document.querySelector("#time-date-content");
  let today = `${currDay}, ${currMonth} ${currDate}, ${currHours}:${currMinutes}, ${currYear}`;
  dateInput.innerHTML = today;

  return today;
}

////Minor actions with Celsius and Fahrenheit
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", setUppCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", setUppFahrenheit);

function setUppCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 0;
  //console.log(typeof temperature);
}
function setUppFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = 2;
}

////Actions to search for weather according to the user's city. Search for weather by current position

let searchCity = document.querySelector("#btn-submit");
searchCity.addEventListener("click", showCity);

let searchLocation = document.querySelector("#btn-search-location");
searchLocation.addEventListener("click", showLocation);


function findCity(city) {
    let apiKey = '41b994c32cd18a931e3e8c1b0b2c94c9';
    let units = 'metric';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let userCityInput = document.querySelector('#userCityInput').value;
  findCity(userCityInput);
}

function showLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
} 

function getCurrentLocation(position){
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = '41b994c32cd18a931e3e8c1b0b2c94c9';
    let units = 'metric';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
    document.querySelector('#user-city').innerHTML = response.data.name;
    document.querySelector('#temperature').innerHTML = Math.round(response.data.main.temp);
    document.querySelector('#feels-like-temperature').innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
    document.querySelector('#humidity-data').innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector('#wind-data').innerHTML = `Wind speed: ${response.data.wind.speed}km/h`;
    document.querySelector('#weather-description').innerHTML = response.data.weather[0].description;

    console.log(response);
}
