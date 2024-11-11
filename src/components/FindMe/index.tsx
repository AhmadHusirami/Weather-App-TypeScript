import React from "react";
import { Place } from "../../pages/HomePage";
import "./FindMe.css"; // Import the new CSS file

interface Props {
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

const FindMe: React.FC<Props> = (props) => {
  function successCallback(position: GeolocationPosition) {
    props.setPlace({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      name: "YOUR LOCATION",
    });
  }

  function errorCallback() {
    window.alert("The website has no access to your localization");
  }

  function findMeHandler() {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }

  return (
    <button className="find-me-button" onClick={findMeHandler}>
      <i className="bi bi-geo-alt"></i>
    </button>
  );
};

export default FindMe;
