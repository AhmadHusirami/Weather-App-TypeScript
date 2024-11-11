import React from "react";
import { Place } from "../../pages/HomePage";
import { WeatherData } from "../../query/useWeather";
import getWeatherDescr from "../../utils/getWeatherDescr";
import getTime from "../../utils/getTime";
import WeatherIcon from "../WeatherIcon";
import "./CurrentWeather.css"; // Import the new CSS file

type CurrentWeather = WeatherData["current_weather"];

interface Props {
  weatherData: WeatherData;
  place: Place;
}

const CurrentWeather: React.FC<Props> = (props) => {
  const currentWeather = props.weatherData.current_weather;
  const daily = props.weatherData.daily;
  const dailyUnits = props.weatherData.daily_units;

  const currentTimeFormatter = new Intl.DateTimeFormat("en-us", {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  function getCurrentTime(isoDate: string) {
    const date = new Date(isoDate);
    date.setMinutes(new Date().getMinutes());
    return currentTimeFormatter.format(date);
  }
  function checkNight(isoDate: string, isoSunrise: string, isoSunset: string) {
    const now = new Date(isoDate);
    now.setMinutes(new Date().getMinutes());
    const sunrise = new Date(isoSunrise);
    const sunset = new Date(isoSunset);
    return now < sunrise || now > sunset;
  }

  return (
    <section className="wrapper">
      <div className="column">
        <div className="location">
          <div className="coords">
            <p>latitude: {props.place.latitude}</p>
            <p>longitude: {props.place.longitude}</p>
          </div>
          <h1 className="place">{props.place.name}</h1>
          <h2 className="time">{getCurrentTime(currentWeather.time)}</h2>
        </div>
        <div className="parameters">
          <p> 
            <i className="bi bi-arrow-up-short"></i> high:
            {` ${daily.temperature_2m_max[0]} ${dailyUnits.temperature_2m_max} `}
            ( apparent:
            {` ${daily.apparent_temperature_max[0]} ${dailyUnits.apparent_temperature_max} `}
            )
          </p>
          <p>
            <i className="bi bi-arrow-down-short"></i> low:
            {` ${daily.temperature_2m_min[0]} ${dailyUnits.temperature_2m_min} `}
            ( apparent:
            {` ${daily.apparent_temperature_min[0]} ${dailyUnits.apparent_temperature_min} `}
            )
          </p>
          <p>
            <i className="bi bi-wind"></i> max wind speed:{" "}
            {`${daily.windspeed_10m_max[0]} ${dailyUnits.windspeed_10m_max} `}
          </p>
          <p>
            <i className="bi bi-moisture"></i> precipitation:{" "}
            {` ${daily.precipitation_sum[0]} ${dailyUnits.precipitation_sum} `}
          </p>
          <p>
            <i className="bi bi-cloud-sun"></i> outside:{" "}
            {getWeatherDescr(daily.weathercode[0])}
          </p>
          <p className="sunTime">
            <span>
              <i className="bi bi-sunrise"></i> {getTime(daily.sunrise[0])}
            </span>
            <span>
              <i className="bi bi-sunset"></i> {getTime(daily.sunset[0])}
            </span>
          </p>
        </div>
      </div>


      <div className="column right">
        <div className="parameters">
          <p className="rightNow">right now:</p>
          <p>
            <i className="bi bi-cloud-sun"></i> outside:{" "}
            {getWeatherDescr(currentWeather.weathercode)}
          </p>
          <p>
            <i className="bi bi-thermometer-half"></i> temperature:{" "}
            {`${currentWeather.temperature} ${dailyUnits.temperature_2m_max} `}
          </p>
          <p>
            <i className="bi bi-wind"></i> wind speed:{" "}
            {`${currentWeather.windspeed} ${dailyUnits.windspeed_10m_max} `}
          </p>
        </div>
        <WeatherIcon
          weatherCode={currentWeather.weathercode}
          night={checkNight(
            currentWeather.time,
            daily.sunrise[0],
            daily.sunset[0]
          )}
          className="image"
        />
      </div>
    </section>
  );
};

export default CurrentWeather;
