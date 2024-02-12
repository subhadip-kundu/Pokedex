import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import LoadingSpinner from "../LoadingSpinner";

function PokemonDetails() {
  const id = useParams().id;

  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  async function downloadPokemon() {
    try {
      setIsLoading(true);

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        abilities: response.data.abilities[0].ability.name,
        types: response.data.types.map((each) => each.type.name),
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="details-cover">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="pokemon-details-wrapper">
          <img className="pokemon-details-image" src={pokemon.image} />
          <div className="pokemon-details">
            <div className="top-area">
              <p className="pokemon-details-name">Name: {pokemon.name}</p>
              <p className="pokemon-details-types">
                Types:{" "}
                {pokemon.types &&
                  pokemon.types.map((each) => <span key={each}>{each}</span>)}
              </p>
              <p className="pokemon-details-abilities">
                Abilities: {pokemon.abilities && pokemon.abilities}
              </p>
            </div>
            <div className="bottom-area">
              <p className="pokemon-details-height">Height: {pokemon.height}</p>
              <p className="pokemon-details-waight">Weight: {pokemon.weight}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetails;
