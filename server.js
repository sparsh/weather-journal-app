// Setup empty JS object to act as endpoint for all routes
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
projectData = {};
const PORT = 8000;
// Require Express to run server and routes

// Start up an instance of app
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static("website"));
const getWeather = (request, response) => {
  response.send(projectData);
};

const postWeather = (request, response) => {
  const requestBody = request.body;
  projectData = {
    ...requestBody,
  };
  response.send({ status: "Success", message: "Data Added Sucessfully" });
  console.log("Post API Success...");
};
app.get("/weather", getWeather);

app.post("/weather", postWeather);

// Setup Server
app.listen(PORT, () => {
  console.log("Successfully Listening to Port", PORT)
});
