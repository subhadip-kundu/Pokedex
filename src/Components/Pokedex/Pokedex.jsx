import React, { useState } from "react";
import Search from "../Search/Search";
import "./Pokedex.css";
import PokemonList from "../PokemonList/PokemonList";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex() {
  const [searchTerm, setsearchTerm] = useState("");

  return (
    <div className="pokedex-wrapper">
      <Search updateSearchTerm={setsearchTerm} />
      {searchTerm.length == 0 ? (
        <PokemonList />
      ) : (
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      )}
    </div>
  );
}

export default Pokedex;
