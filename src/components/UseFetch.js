import { useState } from "react";

function UseFetch(name) {
    const [temp, setTemp] = useState(7);
    const [condition, setCondition] = useState('sunny');
    const [cloud, setCloud] = useState(22);
    const [humidity, setHumidity] = useState(80);
    const [wind, setWind] = useState(13);

    fetch('http://api.weatherapi.com/v1/current.json?key=2187b62e323e464b9b9195238230602&q=' + name + '&aqi=no')
    .then(Response => Response.json())
    .then(data => {
        setTemp(data.current.temp_c);
        setCondition(data.current.condition.text);
        setCloud(data.current.cloud);
        setHumidity(data.current.humidity);
        setWind(data.current.wind_kph);
    })
    console.log(name);


    return {temp, condition, cloud, humidity, wind};
}

export default UseFetch;