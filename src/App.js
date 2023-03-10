import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [temp, setTemp] = useState(null);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [condition, setCondition] = useState("");
  const [iconSrc, setIconSrc] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);



  const [searchValue, setSeachValue] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [code, setCode] = useState(100);


  const [weatherApp, setWeatherApp] = useState("defaultWeather");
  const [submitBtn, setSubmitBtn] = useState("defaultBtn");



  function stylingFunc() {
    if (code === 1000)
    {
        if (timeOfDay === "day") {
          setWeatherApp("weatherApp1");
          setSubmitBtn("submit1");
        } else {
          setWeatherApp("weatherApp2");
          setSubmitBtn("submit2");
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
      if (timeOfDay === "day") {
        setWeatherApp("weatherApp3");
        setSubmitBtn("submit3");
      } else {
        setWeatherApp("weatherApp4");
        setSubmitBtn("submit4");
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
      if (timeOfDay === "day") {
        setWeatherApp("weatherApp5");
        setSubmitBtn("submit5");
      } else {
        setWeatherApp("weatherApp6");
        setSubmitBtn("submit6");
      }
    }
    else {
      if (timeOfDay === "day") {
        setWeatherApp("weatherApp7");
        setSubmitBtn("submit7");
      } else {
        setWeatherApp("weatherApp8");
        setSubmitBtn("submit8");
      }
    }
  }


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



        // determing weather it's a day or night
        if (!data.current.is_day) {
          setTimeOfDay("night");
        } else {
          setTimeOfDay("day");
        }

        // finding the weather code of that place to know weather it's a day or night
        setCode(data.current.condition.code);

        stylingFunc();
        
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
      <div className={ weatherApp }>
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
            <button className={ submitBtn }>
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
