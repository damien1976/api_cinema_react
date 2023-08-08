import React, { useState } from "react";
import Card from "./Components/Card";
import Card_person from "./Components/Card_person";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([]);
  const radios = ["movie", "tv", "person"];
  const [selectedValue, setSelectedValue] = useState("tv");
  const [choiceText, setChoiceText] = useState("");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzBiYWI1ZDhjOTA4OGQ3NjVjZWFkZDUyMTQwYzBhNSIsInN1YiI6IjYxMDQ1NjFmMjNkMjc4MDA1ZGJkNGJmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zHQtnx3kpjRzTF-peoCKX-neR1QkLBjnc_HXJ6d0Bss"
    }
  };

  const handleRecent = () => {
    fetch("https://api.themoviedb.org/3/discover/movie", options)
      .then((response) => response.json())
      .then((response) => setData(response.results))
      .catch((err) => console.error(err));
    data
      .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
      .map((movie) => <Card key={movie.id} movie={movie} />);
  };

  const handleSelectedValue = (e) => {
    const selectedValue_after_change = e.target.id;
    setSelectedValue(selectedValue_after_change);
  };

  const handleChoiceText = (e) => {
    const choiceText_after_change = e.target.value;
    setChoiceText(choiceText_after_change);
  };

  const handleResults = (selectedValue, choiceText) => {
    const url = `https://api.themoviedb.org/3/search/${selectedValue}?query=${encodeURIComponent(
      choiceText
    )}&include_adult=false&language=en-US&page=1`;
    fetch(url, options)
      .then((response) => response.json())
      .then((response) => setData(response.results))
      .catch((err) => console.error(err));
    setChoiceText("");
  };

  return (
    <div className="App">
      <ul>
        {radios.map((choice, index) => (
          <li key={index}>
            <input
              type="radio"
              id={choice}
              name="choiceName"
              onChange={handleSelectedValue}
            />
            <label htmlFor={choice}>{choice}</label>
          </li>
        ))}
        <div className="search">
          <li>
            <input
              value={choiceText}
              type="text"
              id="search"
              name="search"
              placeholder="Entrer votre choix ..."
              onChange={handleChoiceText}
            />
          </li>
          <li>
            <button
              type="submit"
              onClick={() => handleResults(selectedValue, choiceText)}
            >
              Rechercher
            </button>
          </li>
        </div>
      </ul>
      {data.length
        ? data[0].hasOwnProperty("known_for")
          ? data.map((person) => (
              <Card_person key={person.id} person={person} />
            ))
          : data
              .sort((a, b) => (a.release_date > b.release_date ? -1 : 1))
              .map((movie) => <Card key={movie.id} movie={movie} />)
        : handleRecent()}
      <footer>Créée par Damien ETIENNE - Tous droits réservés</footer>
    </div>
  );
}
