/* Global Variables */

// Create a new date instance dynamically with JS
const API_KEY = "c42b9f6e3be8fbe7746a5296640df4ec";
const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getWeatherData = async (zipCode) => {
  const url = `${OPEN_WEATHER_BASE_URL}?zip=${zipCode}&appid=${API_KEY}`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
        'Content-Type': 'application/json',
      },
  });
  return response.json();
};

const postWeatherData = async (postData) => {
  const url = `/weather`;
  console.log("the postData is ", postData)
  const response = await fetch(url, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify(postData),
  });
  return response.json();
};


const updateUI = (weatherData) => {
    console.log("Now i will update UI with", weatherData);
    const dateElement = document.getElementById("date");
    const tempElement = document.getElementById("temp");
    const content = document.getElementById("content");
    tempElement.innerText = `Temprature: ${weatherData.temprature}`;
    dateElement.innerText = `Date: ${weatherData.date}`;
    content.innerText = `User Input: ${weatherData.userInput}`;
}

const generateWeatherReport = () => {
  try {
    const zipCode = document.getElementById("zip").value;
    const userInput =  document.getElementById("feelings").value;
    console.log("the zip and user input is ", zipCode, userInput)
    if (zipCode) {
      getWeatherData(zipCode).then((weatherData) => {
        console.log("the weatherData is ", weatherData);
        const postData = {
          temprature: weatherData.main.temp,
          date: newDate,
          zipCode,
          userInput
        };

        postWeatherData(postData).then(response => {
            console.log("the response is ", response);
        });
        updateUI(postData);
      });
    }
    else {
        console.log("The zip code cannot be empty")
    }
  } catch (error) {
    console.log("Cannot Proceed", error);
  }
};


window.onload = () => {
    document.getElementById("generate").addEventListener("click", () => {
        console.log("the button is clicked");
        generateWeatherReport();
    });
};