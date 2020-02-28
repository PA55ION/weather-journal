// Setup empty JS object to act as endpoint for all routes
projectData = {};

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//api key from .env file
const API_KEY = process.env.API_KEY



// Express to run server and routes
const express = require('express');
const cors = require('cors')



// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Middleware*/
app.use(cors());

// Initialize the main project folder

app.use(express.static('website'));
const port = 3000;

// Spin up the server

const server = app.listen(port, listening);

function listening() {
    console.log(`running on localhost: ${port}`)
}
// Callback to debug
// Initialize all route with a callback function
const data = [];
// Callback function to complete GET '/all'
app.get('/all', (request, response) => {
    // response.send(projectData)
    response.send(projectData)
});

app.get('/weather', (req, res) => {
    res.send(projectData)
})

// Post Router

app.post('/weather', (req, res) => {
    // projectData.temperature = req.body.temperature
    // projectData.date = req.body.date
    // projectData.feeling = req.body.feeling
    // data.push(req.body)
    projectData = req.body;
    console.log("post request: received");
    console.log(projectData);
    //res.send(body);
    res.send('post received');
});


