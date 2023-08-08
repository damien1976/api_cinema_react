import React, { useState } from "react";
import Card from "./Card";

export default function Card_person({ person }) {
  const [movies, setMovies] = useState(person.known_for);
  
  return (
    <div className="Card_person" key={person.id}>
      <img
        alt=""
        src={"https://image.tmdb.org/t/p/original/" + person.profile_path}
      />
      <h2>{person.original_name}</h2>
      <p>{person.known_for_department}</p>
      <hr />

      {movies.map((movie) => (
        <Card key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
