import React from "react";
import { Place } from "../../pages/HomePage";
import SearchPlace from "../../components/SearchPlace";
import FindMe from "../../components/FindMe";
import "./Options.css"; // Import the new CSS file

interface Props {
  setMetric: React.Dispatch<React.SetStateAction<boolean>>;
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

const Options: React.FC<Props> = (props) => {
  return (
    <nav className="bar">
      <div className="row">
        <SearchPlace setPlace={props.setPlace} />
        <FindMe setPlace={props.setPlace} />
      </div>
      <div className="row">
        <div className="buttons">
          <button
            onClick={() => {
              props.setMetric(true);
            }}
          >
            &deg;C
          </button>
          |
          <button
            onClick={() => {
              props.setMetric(false);
            }}
          >
            &deg;F
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Options;
