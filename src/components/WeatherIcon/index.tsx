import React from "react";
import getIconSrc from "../../utils/getIconSrc";
import "./WeatherIcon.css"; // Import the new CSS file

interface Props {
  weatherCode: number;
  night?: boolean;
  className?: string;
}

const WeatherIcon: React.FC<Props> = (props) => {
  return (
    <div className={`icon-wrapper ${props.className}`}>
      <img src={getIconSrc(props.weatherCode, props.night)} alt="" />
    </div>
  );
};

export default WeatherIcon;
