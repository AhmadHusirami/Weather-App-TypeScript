import React, { useEffect, useRef, useState } from "react";
import useWeather from "../../query/useWeather";
import CurrentWeather from "../../components/CurrentWeather";
import DailyWeather from "../../components/DailyWeather";
import Options from "../../components/Options";
import "./HomePage.css"; // Import the new CSS file

export interface Place {
  latitude: number;
  longitude: number;
  name: string;
}

const HomePage = () => {
  const [metric, setMetric] = useState(true);
  const [place, setPlace] = useState<Place>({
    latitude: 33.5577,  // Sidon latitude
    longitude: 35.3715, // Sidon longitude
    name: "Sidon, Lebanon",
  });

  const { data, isLoading, isError, error } = useWeather(
    place.latitude,
    place.longitude,
    metric
  );

  return (
    <>
      <Options setMetric={setMetric} setPlace={setPlace} />
      {isLoading && (
        <div className="msg">
          <h2>Loading...</h2>
        </div>
      )}
      {isError && (
        <div className="msg">
          <h2>Something went wrong...</h2>
          <p>
            Error:{" "}
            {error instanceof Error
              ? error.message
              : " the app could not fetch the data from the server"}
          </p>
        </div>
      )}
      {data?.data && (
        <>
          <CurrentWeather weatherData={data.data} place={place} />
          <DailyWeather weatherData={data.data} />
        </>
      )}
    </>
  );
};

export default HomePage;
