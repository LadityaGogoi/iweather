import { useState } from "react";
// import UseFetch from './components/UseFetch';

function App() {
  const [name, setName] = useState('London');
  const [temp, setTemp] = useState(7);
  const [time, setTime] = useState('9:00 P.M');
  const [date, setDate] = useState('Monday 2/2023');
  const [condition, setCondition] = useState('sunny');
  const [cloud, setCloud] = useState(22);
  const [humidity, setHumidity] = useState(80);
  const [wind, setWind] = useState(13);

  function fetchData(e) {
    setName(e.target.innerHTML);

    fetch('http://api.weatherapi.com/v1/current.json?key=2187b62e323e464b9b9195238230602&q=' + name + '&aqi=no')
    .then(Response => Response.json())
    .then(data => {
        setTemp(data.current.temp_c);
        setCondition(data.current.condition.text);
        setCloud(data.current.cloud);
        setHumidity(data.current.humidity);
        setWind(data.current.wind_kph);
    })
    
  }

  return (
    <>
      <div className="weather-app">
        <div className="container">
          <h3 className="brand">iWeather</h3>
          <div>
            <h1 className="temp">{ temp }° Celcius</h1>
            <div className="city-time">
              <h1 className="name">{ name }</h1>
              <small>
                <span className="time">{ time }</span>
                <span className="date">{ date }</span>
              </small>
            </div>
            <div className="weather">
              <img src="" className="icon" alt="icon" />
              <span className="condition">{ condition }</span>
            </div>
          </div>
        </div>
        <div className="panel">
          <form id="form">
            <input type="text" className="search" placeholder="search location..." />
            <button type="submit" className="submit">
              <i className="fa-solid fa-magnifying-glass fa-2x"></i>
            </button>
          </form>

          <ul className="cities">
            <li className="city" onClick={(e) => fetchData(e)}>New York</li>
            <li className="city" onClick={(e) => fetchData(e)}>Brasília</li>
            <li className="city" onClick={(e) => fetchData(e)}>Pretoria</li>
            <li className="city" onClick={(e) => fetchData(e)}>tokyo</li>
          </ul>

          <ul className="details">
            <h4>Weather details</h4>
            <li>
              <span>Cloudy</span>
              <span className="cloud">{ cloud }%</span>
            </li>
            <li>
              <span>Humidity</span>
              <span className="humidity">{ humidity }%</span>
            </li>
            <li>
              <span>Wind</span>
              <span className="wind">{ wind }KM/hr</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
