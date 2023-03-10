import { useState } from "react";

function App() {
  const [name, setName] = useState('London');
  const [temp, setTemp] = useState(7);
  const [time, setTime] = useState('9:00 P.M');
  const [date, setDate] = useState('Monday 2/2023');
  const [condition, setCondition] = useState('sunny');
  const [iconSrc, setIconSrc] = useState(null);
  const [cloud, setCloud] = useState(22);
  const [humidity, setHumidity] = useState(80);
  const [wind, setWind] = useState(13);


  const [searchValue, setSeachValue] = useState("");


  function setData(cityInput) {
    fetch('http://api.weatherapi.com/v1/current.json?key=2187b62e323e464b9b9195238230602&q=' + cityInput + '&aqi=no')
      .then(Response => Response.json())
      .then(data => {
        setTemp(data.current.temp_c);
        setCondition(data.current.condition.text);
        setIconSrc(data.current.condition.icon);
        setCloud(data.current.cloud);
        setHumidity(data.current.humidity);
        setWind(data.current.wind);



        // get the date for that place
        const localDate = data.location.localtime;
        const y = parseInt(localDate.substr(0, 4));
        const m = parseInt(localDate.substr(5, 2));
        const d = parseInt(localDate.substr(8, 2));

        const weekday = ["sunday", "monday", "tuesday", "wednessday", "thrusday", "friday", "saturday"];
        const day = weekday[new Date(d / m / y).getDay()];

        setDate(day + ' ' + m + '/' + y);

        // get the time for that place
        const localTime = (localDate.substr(11));
        setTime(localTime);
      })
  }



  // function for click event
  function handleClick(e) {
    setName(e.target.innerHTML);

    setData(name);
  }

  // function for submit event
  function handleSubmit(e) {
    e.preventDefault();
    
    setName(searchValue);
    setSeachValue("");

    setData(name);
  }

  return (
    <>
      <div className="weather-app">
        <div className="container">
          <h3 className="brand">iWeather</h3>
          <div>
            <h1 className="temp">{temp}° Celcius</h1>
            <div className="city-time">
              <h1 className="name">{name}</h1>
              <small>
                <span className="time">{time} </span>
                <span className="date"> {date}</span>
              </small>
            </div>
            <div className="weather">
              <img src={iconSrc} className="icon" alt="icon" />
              <span className="condition">{condition}</span>
            </div>
          </div>
        </div>
        <div className="panel">
          <form id="form" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" className="search" placeholder="search location..." value={ searchValue } onChange={(e) => setSeachValue(e.target.value)} />
            <button className="submit">
              <i className="fa-solid fa-magnifying-glass fa-2x"></i>
            </button>
          </form>

          <ul className="cities">
            <li className="city" onClick={(e) => handleClick(e)}>New York</li>
            <li className="city" onClick={(e) => handleClick(e)}>Brasília</li>
            <li className="city" onClick={(e) => handleClick(e)}>Pretoria</li>
            <li className="city" onClick={(e) => handleClick(e)}>tokyo</li>
          </ul>

          <ul className="details">
            <h4>Weather details</h4>
            <li>
              <span>Cloudy</span>
              <span className="cloud">{cloud}%</span>
            </li>
            <li>
              <span>Humidity</span>
              <span className="humidity">{humidity}%</span>
            </li>
            <li>
              <span>Wind</span>
              <span className="wind">{wind}KM/hr</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
