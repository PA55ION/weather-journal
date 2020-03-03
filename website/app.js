//Global Variable
const submitBtn = document.getElementById("generate");
let temp = document.getElementById("temp");
let city = document.getElementById("city");
let description = document.getElementById("content");
let feels = document.getElementById("feels");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
const minMaxTemp = document.getElementById("min-max-temp");
let sunrise = document.getElementById("sunrise");
let sunset = document.getElementById("sunset");
let weatherIcon = document.getElementById("weather-icons");
let gridContainer = document.getElementsByClassName("grid");
const zipCode = document.getElementById("zip");
const feelings = document.getElementById("feelings");
let date = document.getElementById('date');

// Personal API Key for OpenWeatherMap API
const API_KEY = "050fe05f4b6fa9f366de526cee98af35";
const api = `https://api.openweathermap.org/data/2.5/weather?zip=`;

//get date, month and year
function getDate() {
  const month = new Array();
  month[0] = "January";
  month[1] = "02";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  const day = new Date();
  const date =
    month[day.getMonth()] + " / " + day.getDate() + " / " + day.getFullYear();

  return date;
}
getDate();

/* Function to GET Web API Data*/
function getWeather(e) {
  const zipCode = document.getElementById("zip").value;
  console.log(zipCode);
  const feelings = document.getElementById("feelings").value;
  console.log(feelings);

  weather(`${api}${zipCode}&units=imperial&appid=${API_KEY}`)
    .then(function(data) {
      postWeather("/weather", {
        zipCode: zipCode,
        feelings: feelings,
        weather_code: data.weather[0].id,
        description: data.weather[0].description,
        temp: Math.floor(data.main.temp),
        feels_like: Math.floor(data.main.feels_like),
        temp_min: Math.floor(data.main.temp_min),
        temp_max: Math.floor(data.main.temp_max),
        humidity: Math.floor(data.main.humidity),
        wind: Math.round(data.wind.speed),
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        country: data.sys.country,
        city: data.name
      });
    })
    .then(function(data) {
      weather("/all");
    });
}

//GET request
const weather = async (url = "") => {
  const request = await fetch(url);

  try {
    const data = await request.json();
    console.log("Get Response:", data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postWeather = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    console.log("post response:", response);
    console.log(response);
    updateUI(data);
  } catch (error) {
    console.log("error", error);
  }
};

//convert unix time 
//solution https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript

function convertTime(unix_time) {
  let date = new Date(unix_time * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let ampm = hours >= 12 ? " PM" : " AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  let time = hours + ":" + minutes.substr(-2) + ampm;

return time
}

function updateUI(data) {
  let weatherClass = `<i class="wi wi-owm-${data.weather_code}" ></i>`;

  date.innerHTML = getDate();
  temp.innerHTML = `<div id="temp"> 
        ${data.temp} <i class="wi wi-fahrenheit"></i></div>`;
  city.innerHTML = `${data.city}, ${data.country}`;
  description.innerHTML = data.description;
  wind.innerHTML = `<div id="wind" class="background">
        <i class="wi wi-strong-wind"></i>
        <br /><p>Wind<br />${data.wind}</p>
        </div>`;
  feels.innerHTML = `<div id="feels" class="background">
        <i class="wi wi-thermometer"></i>
        <br /><p>Feel Like<br />${data.feels_like}</p>
        </div>`;
  weatherIcon.innerHTML = `${weatherClass}`;
  humidity.innerHTML = `<div id='humidity' class="background">
        <i class="wi wi-humidity"></i>
        <br /><p>Humidity<br />${data.humidity}</p>
        </div>`;
  minMaxTemp.innerHTML = `<div id="min-max-temp" class="background">
        <i class="wi wi-barometer"></i>
        <br /><p>Min | Max <br /> 
        ${data.temp_min} | ${data.temp_max}</p>
        </div>`;
  sunrise.innerHTML = `<div id="sunrise" class="background">
        <i class="wi wi-sunrise"></i>
        <br /><p>Sunrise<br />${convertTime(data.sunrise)}</p>
        </div>`;
  sunset.innerHTML = `<div id="sunset" class="background">
        <i class="wi wi-sunset"></i>
        <br /><p>Sunset <br />${convertTime(data.sunset)}</p>
        </div>`;
}

/* Function called by event listener */
submitBtn.addEventListener("click", getWeather);

submitBtn.addEventListener("click", () => {
  zipCode.placeholder = "Your zip is empty";
  
});

function myFunction() {
        document.getElementsByClassName("weather")[0].style.backgroundImage = "url('assets/Moon.png')";

  }

