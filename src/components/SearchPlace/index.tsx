import React, { useState, useRef, useEffect } from "react";
import useGeocoding from "../../query/useGeocoding";
import { Place } from "../../pages/HomePage";
import "./SearchPlace.css"; // Import the CSS file

interface Props {
  setPlace: React.Dispatch<React.SetStateAction<Place>>;
}

const SearchPlace: React.FC<Props> = (props) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data, isLoading, isError, status, refetch, error } = useGeocoding(inputValue);

  useEffect(() => {
    setSelectedIndex(0);
    const timeout = setTimeout(refetch, 250);
    return () => {
      clearTimeout(timeout);
    };
  }, [inputValue]);

  function clickOutsideHandler(e: MouseEvent) {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setShowSuggestions(false);
    }
  }

  useEffect(() => {
    window.addEventListener("click", clickOutsideHandler);
    return () => {
      window.removeEventListener("click", clickOutsideHandler);
    };
  });

  function returnFullName(
    name: string,
    admin1: string | undefined,
    countryCode: string
  ) {
    return admin1
      ? `${name.toUpperCase()}, ${admin1}, ${countryCode}`
      : `${name.toUpperCase()}, ${countryCode}`;
  }

  function confirmPlace(index: number) {
    if (!data?.data.results || !data.data.results[index]) return;
    setSelectedIndex(index);
    setShowSuggestions(false);
    inputRef.current && inputRef.current.blur();
    const result = data.data.results[index];

    const place: Place = {
      latitude: result.latitude,
      longitude: result.longitude,
      name: returnFullName(result.name, result.admin1, result.country_code),
    };
    props.setPlace(place);
  }

  function keydownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.code) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((index) =>
          data?.data.results && data.data.results.length > index + 1
            ? index + 1
            : index
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((index) => (index > 0 ? index - 1 : index));
        break;
      case "Enter":
        confirmPlace(selectedIndex);
        break;

      default:
        break;
    }
  }

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      <input
        ref={inputRef}
        placeholder="search place"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => {
          setShowSuggestions(true);
        }}
        onKeyDown={keydownHandler}
      />
      <ul>
        {showSuggestions &&
          data &&
          data.data.results?.map((geocoding, index) => (
            <li
              key={geocoding.id}
              onClick={() => {
                confirmPlace(index);
              }}
              className={index === selectedIndex ? "selected" : ""}
            >
              <p>
                {returnFullName(
                  geocoding.name,
                  geocoding.admin1,
                  geocoding.country_code
                )}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchPlace;
