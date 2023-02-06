// Get all necessary elements for the DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');

const cloudOutput = document.querySelector('cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');

const form = document.querySelector('#locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



let cityInput = "london";

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        console.log(cityInput);

    // app.style.opacity = "0";
        fetchWeatherData();
    });
});



// Function that fatches and displays the data from the weather API

function fetchWeatherData() {
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} 7040acf1b2ae3a14b95a946862a11d1b
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&appid=7040acf1b2ae3a14b95a946862a11d1b')
    

    // Fetch the data (which is in JSON format) adn convert it to a regular JS object
    .then(response => response.json())
    .then(data => {
        console.log(data);

        temp.innerHTML = data.main.temp + "° Celcius";
        conditionOutput.innerHTML = data.weather[0].main;

        // Get the date and time from the citya and extract the day, month, year and time into individual






        // add the name of the city into the page
        nameOutput.innerHTML = cityInput;


        // get the corresponding icon url for the weather and extract a part of it
        const iconId = data.weather[0].icon;
        icon.src = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";

        const ID = data.weather[0].id;
        if (
            ID === 200 ||
            ID === 201 ||
            ID === 202 ||
            ID === 210 ||
            ID === 211 ||
            ID === 212 ||
            ID === 221 ||
            ID === 230 ||
            ID === 231 ||
            ID === 232
        ) {
            app.style.backgroundImage = 'url(/images/day/rainy.jpg';
        }
        else if (
            ID === 801 ||
            ID === 801 ||
            ID === 803 ||
            ID === 804
        ) {
            app.style.backgroundImage = 'url(/images/day/rainy.jpg';
        } 


    })
}





