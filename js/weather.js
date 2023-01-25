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
const form = document.querySelector('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "london";


cities.forEach((city)=>{
    city.addEventListener('click', (e)=>{
        // change from the default city to the click one
        // console.log(e.target.innerHTML);
        cityInput = e.target.innerHTML;

        fetchWeatherData();

        app.style.opacity = "0";
    });
});


// Add submit event to the form
form.addEventListener('submit', (e)=>{

    if (search.value.length == 0)
    {
        alert("Please! type a city name.");
    }
    else 
    {
        cityInput = search.value;

        fetchWeatherData();

        search.value = "";

        app.style.opacity = "0"
    }
    // Prevent default behaviour of the form 
    e.preventDefault();
});

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
    return weekday[new Date('${day}/${month}/${year}').getDay()];
};


function fetchWeatherData() {
    fetch('http://api.weatherapi.com/v1/current.json?key=c5c4660114d2479890a111029232501&q=${cityInput}')

    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}