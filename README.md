js

// Get all necessary elements for the DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp'); 
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');

const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');

const form = document.getElementById('form');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');



let cityInput = "london";
fetchWeatherData();



cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;

        console.log(cityInput);

        fetchWeatherData();
    })
});







// Submit event to the list
form.addEventListener('submit', (e) => {
    e.preventDefault();

    cityInput = search.value;

    if (cityInput === "") return;

    fetchWeatherData();

    search.value = "";
});











// function to find the day of the week
function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",        
        "Wednesday",
        "Thrusday",
        "Friday",
        "Saturday"
    ];
    return weekday[new Date(day/month/year).getDay()];
};


// fetching the data for the website
function fetchWeatherData() {
    fetch('http://api.weatherapi.com/v1/current.json?key=2187b62e323e464b9b9195238230602&q=' + cityInput + '&aqi=no')


    .then(response => response.json())
    .then(data => {
        // console.log(data);

        temp.innerHTML = data.current.temp_c + "&#176;" + " celcius"; 
        conditionOutput.innerHTML = data.current.condition.text;


        // Get the date and time for that place
        const date = data.location.localtime;
        const y = parseInt(date.substr(0, 4));
        const m = parseInt(date.substr(5, 2));
        const d = parseInt(date.substr(8, 2));
        const time = date.substr(11);
        // console.log(y, m, d);


        timeOutput.innerHTML = time;
        const dayWeek = dayOfTheWeek(d, m, y);
        dateOutput.innerHTML = dayWeek + " " + m + "/" + y;



        nameOutput.innerHTML = data.location.name;



        // getting icon 
        icon.src = data.current.condition.icon;



        // adding the weather details
        cloudOutput.innerHTML = data.current.cloud + "%";
        humidityOutput.innerHTML = data.current.humidity + "%";
        windOutput.innerHTML = data.current.wind_kph + "km/h";


        // set the default time of day
        let timeOfDay = "day";
        if (!data.current.is_day)
        {
            timeOfDay = "night";
        }

        // console.log(timeOfDay);
        const code = data.current.condition.code;
        if (code === 1000)
        {
            // Set the background to clear if the weather is clear
            app.style.backgroundImage = 'url(/images/' + timeOfDay + '/clear.jpg)';


            // change the button bg color depending on if its day or night
            btn.style.background = "#e5ba92";
            if (timeOfDay == "night")
            {
                btn.style.background = "#181e27";
            }
        }
        else if (
            code === 1003 ||
            code === 1006 ||
            code === 1009 ||
            code === 1030 ||
            code === 1069 ||
            code === 1087 ||
            code === 1135 ||
            code === 1273 ||
            code === 1276 || 
            code === 1279 ||
            code === 1282
        ) {
            // cloudy weather
            app.style.backgroundImage = 'url(/images/' + timeOfDay + '/cloudy.jpg)';

            btn.style.background = "#fa6d1b";
            if (timeOfDay == "night")
            {
                btn.style.background = "#181e27";
            }
        }
        else if (
            code === 1063 ||
            code === 1069 ||
            code === 1072 ||
            code === 1150 ||
            code === 1153 ||
            code === 1180 ||
            code === 1183 ||
            code === 1186 ||
            code === 1189 ||
            code === 1192 ||
            code === 1195 ||
            code === 1204 ||
            code === 1207 ||
            code === 1240 ||
            code === 1243 ||
            code === 1246 ||
            code === 1249 ||
            code === 1252
        ) {
            // rainy weather
            app.style.backgroundImage = 'url(/images/' + timeOfDay + '/cloudy.jpg)';

            btn.style.background = "#647d75";
            if (timeOfDay === "night") 
            {
                btn.style.background = "#325c80";
            }
        }
        else {
            // snowy weather
            app.style.backgroundImage = 'url(/images/' + timeOfDay + '/snowy.jpg)';

            btn.style.background = "#4d72aa";
            if (timeOfDay === "night")
            {
                btn.style.background = "#1b1b1b";
            }
        }
    })
};