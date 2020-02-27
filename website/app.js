//Global Variable
const submitBtn = document.getElementById('generate');
let feelings = document.getElementById('feelings');
const zipCode = document.getElementById('zip');
// const city = document.getElementById('country-code');
// Personal API Key for OpenWeatherMap API
const API_KEY = '050fe05f4b6fa9f366de526cee98af35';
const api = `http://api.openweathermap.org/data/2.5/weather?zip=`;


//get date, month and year
function getDate() {
    const month = new Array();
        month[0] = "January";
        month[1] = "February";
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
getDate()
// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
submitBtn.addEventListener('click', getWeather);

submitBtn.addEventListener('click', () => {
    if(zipCode !== 'value') 
    zipCode.placeholder = 'Your zip is empty'
})

/* Function to GET Web API Data*/
function getWeather(e) {
    const zipCode = document.getElementById('zip').value;
    console.log(zipCode)
    const feelings = document.getElementById('feelings').value;
    console.log(feelings)

    weather(api, zipCode, feelings, API_KEY);
}

//GET request 
const weather = async(api, zipCode, country, API_KEY) => {
    const request = await fetch(`${api}${zipCode}&units=imperial&appid=${API_KEY}`);
    
    try {
        const data = await request.json();
        const newData = {
            description: data.weather[0].description,
            temp: Math.floor(data.main.temp),
            weather_code: data.weather[0].id,
            feels_like: Math.floor(data.main.feels_like),
            temp_min: Math.floor(data.main.temp_min),
            temp_max: Math.floor(data.main.temp_max),
            humidity: Math.round(data.main.humidity),
            wind: Math.round(data.wind.speed),
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            country: data.sys.country,
            name: data.name,
        }
        console.log(data)
        console.log(newData)
        return data;
    }

    catch(error) {
        console.log('error', error)
    }
};

/* Function to POST data */
const postWeather = async(url = `${api}${zipCode}&units=imperial&appid=${API_KEY}`, data={}) => {
    console.log(data);

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        header: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const responseData = await response.json();
        console.log(responseData)
        return responseData;
    }

    catch(error) {
        console.log('error', error)
    }
}




/* Function to GET Project Data */


