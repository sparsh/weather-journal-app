/* Global Variables */

// Create a new date instance dynamically with JS
const API_KEY = "c42b9f6e3be8fbe7746a5296640df4ec&units=imperial";
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let d = new Date();
let newDate = d.getMonth()+1 + "." + d.getDate() + "." + d.getFullYear();

/**
 * Get weather Data using open wether map api
 * @param {*} zipCode 
 * @returns Promise having response json object
 */
const getWeatherData = async (zipCode) => {
  const url = `${OPEN_WEATHER_BASE_URL}?zip=${zipCode}&appid=${API_KEY}`;
  const response = await fetch(url, {
    method: "GET",
  });
  return response.json();
};

/**
 * Posts the weather data to the server
 * @param {*} postData : Data to be posted in Server
 * @returns Promise with message
 */
const postWeatherData = async (postData) => {
  const url = `/weather`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
  });
  return response.json();
};

/**
 * After successful API response update the UI
 * @param {*} weatherData 
 */
const updateUI = (weatherData) => {
  const dateElement = document.getElementById("date");
  const tempElement = document.getElementById("temp");
  const content = document.getElementById("content");
  tempElement.innerText = `Temprature: ${weatherData.temprature}`;
  dateElement.innerText = `Date: ${weatherData.date}`;
  content.innerText = `User Input: ${weatherData.userInput}`;
};

/**
 * Generating the wether report on click of Gerate Fuction.
 */
const generateWeatherReport = () => {
  try {
    const zipCode = document.getElementById("zip").value;
    const userInput = document.getElementById("feelings").innerText;

    if (zipCode) {
      getWeatherData(zipCode).then((weatherData) => {
        const postData = {
          temprature: weatherData.main.temp,
          date: newDate,
          zipCode,
          userInput,
        };

        postWeatherData(postData).then((response) => {});
        updateUI(postData);
      });
    } else {
    }
  } catch (error) {}
};

window.onload = () => {
  document.getElementById("generate").addEventListener("click", () => {
    generateWeatherReport();
  });
};
