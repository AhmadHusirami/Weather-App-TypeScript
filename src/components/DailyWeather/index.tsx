import React from "react";
import { WeatherData } from "../../query/useWeather";
import getDate from "../../utils/getDate";
import getWeatherDescr from "../../utils/getWeatherDescr";
import WeatherIcon from "../WeatherIcon";
import "./DailyWeather.css"; // Import the new CSS file

interface Props {
  weatherData: WeatherData;
}

const DailyWeather: React.FC<Props> = (props) => {
  const daily = props.weatherData.daily;
  const dailyUnits = props.weatherData.daily_units;

  function createCards() {
    let cards: React.ReactElement[] = [];
    for (let i = 1; i < daily.time.length; i++) {
      const card = (
        <article className="card" key={daily.time[i]}>
          <h2 className="date">{getDate(daily.time[i])}</h2>
          <p>
            <i className="bi bi-arrow-up-short"></i>{" "}
            {daily.temperature_2m_max[i]} {dailyUnits.temperature_2m_max} ({" "}
            apparent: {daily.apparent_temperature_max[i]}{" "}
            {dailyUnits.temperature_2m_max} )
          </p>
          <p>
            <i className="bi bi-arrow-down-short"></i>{" "}
            {daily.temperature_2m_min[i]} {dailyUnits.temperature_2m_min} ({" "}
            apparent: {daily.apparent_temperature_min[i]}{" "}
            {dailyUnits.temperature_2m_min} )
          </p>
          <p>
            <i className="bi bi-wind"></i>{" "}
            {`${daily.windspeed_10m_max[i]} ${dailyUnits.windspeed_10m_max} `}
          </p>
          <p>
            <i className="bi bi-moisture"></i>
            {` ${daily.precipitation_sum[i]} ${dailyUnits.precipitation_sum} `}
          </p>
          <p>
            <i className="bi bi-cloud-sun"></i> {getWeatherDescr(daily.weathercode[i])}
          </p>
          <WeatherIcon weatherCode={daily.weathercode[i]} className="image" />
        </article>
      );
      cards.push(card);
    }
    return cards;
  }

  return (
    <>
      <h1 className="title">Upcoming days:</h1>
      <section className="wrapper">{createCards()}</section>
    </>
  );
};

export default DailyWeather;
