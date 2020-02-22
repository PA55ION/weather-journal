// Setup empty JS object to act as endpoint for all routes

projectData = {};

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

// Callback function to complete GET '/all'

// Post Route
  
