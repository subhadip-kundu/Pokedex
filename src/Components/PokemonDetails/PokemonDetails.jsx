import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import LoadingSpinner from "../LoadingSpinner";
import Page404 from "../../Page404/Page404";

function PokemonDetails({ pokemonName }) {
  const id = useParams().id;

  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [found, setFound] = useState(false);

  async function downloadPokemon() {
    try {
      setIsLoading(true);
      setFound(true);

      let response;

      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }

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
      setFound(false);
      console.log(`No pokemon found called → ${pokemonName}`);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="details-cover">
      {found ? (
        <>
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
                      pokemon.types.map((each) => (
                        <span key={each}>{each}</span>
                      ))}
                  </p>
                  <p className="pokemon-details-abilities">
                    Abilities: {pokemon.abilities && pokemon.abilities}
                  </p>
                </div>
                <div className="bottom-area">
                  <p className="pokemon-details-height">
                    Height: {pokemon.height}
                  </p>
                  <p className="pokemon-details-waight">
                    Weight: {pokemon.weight}
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <Page404  text={pokemonName ? pokemonName : ""} />
      )}
    </div>
  );
}


export default PokemonDetails;
