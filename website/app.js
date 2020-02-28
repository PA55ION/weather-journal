//Global Variable
const submitBtn = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
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
    if (zipCode !== 'value') 
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
            temp: Math.floor(data.main.temp),
            feels_like: Math.floor(data.main.feels_like),
            temp_min: Math.floor(data.main.temp_min),
            temp_max: Math.floor(data.main.temp_max),
            humidity: Math.floor(data.main.humidity),
            wind: Math.round(data.wind.speed),
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
        updateUI(data)
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
        let feels = document.getElementById('feel');
        let wind = document.getElementById('wind');
        let humidity = document.getElementById('humidity');
        const minMaxTemp = document.getElementById('min-max-temp');
        const sunrise = document.getElementById('sunrise');
        const sunset = document.getElementById('sunset')

        document.getElementById('temp').innerHTML = data.temp
}
