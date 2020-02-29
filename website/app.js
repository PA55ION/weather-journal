//Global Variable
const submitBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
// const weatherContainer = document.getElementsByClassName('weather');
// const gridContainer = document.getElementsByClassName('grid-container')
// Personal API Key for OpenWeatherMap API
const API_KEY = '050fe05f4b6fa9f366de526cee98af35';
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
    const date = month[day.getMonth()] + ' /' + day.getDate() + ' / ' + day.getFullYear();

    document.getElementById('date').innerHTML = date;
};
getDate();

/* Function called by event listener */
submitBtn.addEventListener('click', getWeather);

submitBtn.addEventListener('click', () => {
    zipCode.placeholder = 'Your zip is empty'
})

/* Function to GET Web API Data*/
function getWeather(e) {
    const zipCode = document.getElementById('zip').value;
    console.log(zipCode)
    const feelings = document.getElementById('feelings').value;
    console.log(feelings)
   
    weather(`${api}${zipCode}&units=imperial&appid=${API_KEY}`)
    .then(function(data) {
        postWeather('/weather', {
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
    }).then(function(data) {
        weather('/all')
})
}

//GET request 
const weather = async( url = '')  => {
    const request = await fetch(url);
    
    try {
        const data = await request.json();
        console.log('Get Response:', data)
        return data;
    }
    catch(error) {
        console.log('error', error)
    }
};

/* Function to POST data */
const postWeather = async(url = '', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        console.log("post response:", response);
        console.log(response);
        updateUI(data)
    } 
    catch(error) {
        console.log('error', error)
    }
}

/* Function to GET Project Data */

function updateUI(data) {
        let temp = document.getElementById('temp');
        let city = document.getElementById('city');
        let description = document.getElementById('content');
        let feels = document.getElementById('feels');
        let wind = document.getElementById('wind');
        let humidity = document.getElementById('humidity');
        const minMaxTemp = document.getElementById('min-max-temp');
        const sunrise = document.getElementById('sunrise');
        const sunset = document.getElementById('sunset')
        let weatherIcon = document.getElementById('weather-icons')
        let weatherClass = `<i class="wi wi-owm-${data.weather_code}" ></i>`;
        let weatherContainer = document.getElementsByClassName('weather-container');
        

        //convert unix time stamp for sunrise and sunset
        
        let unix_time = data.sunset && data.sunrise
        let date = new Date(unix_time * 1000)
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let formattedTime = hours + ':' + minutes.substr(-2)  + ampm;

        
        temp.innerHTML = `<div id="temp"> ${data.temp} <i class="wi wi-fahrenheit"></i></div>`;
        city.innerHTML = `${data.city}, ${data.country}`
        description.innerHTML = data.description;
        wind.innerHTML =  `<i class="wi wi-strong-wind"></i>;
        <br /><p>Wind<br />${data.wind}</p>`;
        feels.innerHTML = `<i class="wi wi-thermometer"></i>;
        <br /><p>Feel Like<br />${data.feels_like}</p>`;
        weatherIcon.innerHTML = `${weatherClass}`
        humidity.innerHTML = ` <i class="wi wi-humidity"></i>;
        <br /><p>Humidity<br />${data.humidity}</p>`
        minMaxTemp.innerHTML = `<i class="wi wi-barometer"></i>;
        <br /><p>Min | Max <br /> ${data.temp_min} | ${data.temp_max}</p>`;
        sunrise.innerHTML = `<i class="wi wi-sunrise"></i>
        <br /><p>Sunrise<br />${formattedTime}</p>`
        sunset.innerHTML = ` <i class="wi wi-sunset"></i>
        <br /><p>Sunset<br /></p>`;

        

      
}
