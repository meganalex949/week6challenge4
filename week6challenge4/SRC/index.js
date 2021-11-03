let now = new Date();
let time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${time}`;

let today = document.querySelector("#card-title");
today.innerHTML = `${currentDay}`;

////

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-search");

  let location = document.querySelector("#main-location");
  if (input.value) {
    location.innerHTML = `${input.value}`;
  } else {
    location.innerHTML = null;
    alert("Please type in a city");
  }
  let city = document.querySelector("#city-search").value;
  console.log(city);
  let apiKey = "3bc4c7ec3f401f2d634aee8e7ebb937d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let lookUp = document.querySelector("#search-form");
lookUp.addEventListener("submit", search);

////

function showTemperature(response) {
  console.log(response.data.main.temp);
  let newTemp = document.querySelector("#main-card");
  newTemp.innerHTML = `${response.data.main.temp}°C`;
  document.querySelector("#weather-info").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#main-location").innerHTML = response.data.name;
}

////

function yourPosition(position) {
  let apiKey = "3bc4c7ec3f401f2d634aee8e7ebb937d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(yourPosition);
}

let button = document.querySelector("#your");
button.addEventListener("click", currentLocation);
