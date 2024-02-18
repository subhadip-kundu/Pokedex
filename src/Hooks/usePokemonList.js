import axios from "axios";
import { useEffect, useState } from "react";



// Functional component to display a list of Pokemon
function usePokemonList() {
  /*
  ** WE CAN USE AN OBJECT INSTEAD OF MANY STATE **

  // State to store the list of Pokemon and loading status
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // URL for the Pokemon API
  const [pokedexUrl, setPokedexUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );

  // Setting up next and previous button url
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

*/

  //  ** OBJECT IMPLEMENTATION HERE  **

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
  });

  // Function to fetch Pokemon data from the API
  const fetchPokemonData = async () => {
    try {
      // Get the loading page
      // setIsLoading(true); --> the same implementation below
      setPokemonListState((tempState) => ({ ...tempState, isLoading: true }));

      // Fetching the list of Pokemon from the API
      const response = await axios.get(pokemonListState.pokedexUrl); // It download list of 20 pokemons
      const pokemonResults = response.data.results; // We get the array of pokemons from result

      // Access next and previous data
      /*
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      THE SAME IMPLEMENTATION BELOW
      */

      setPokemonListState((tempState) => ({
        ...tempState,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      // Fetching details for each Pokemon in parallel
      const pokemonResultPromises = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      const pokemonDataResponses = await axios.all(pokemonResultPromises); // Array of 20 pokemons detailed data

      // Mapping over the fetched data to structure the required information
      const formattedPokemonData = pokemonDataResponses.map((pokeData) => ({
        id: pokeData.data.id,
        name: pokeData.data.name,
        image:
          pokeData.data.sprites.other?.dream_world.front_default ||
          pokeData.data.sprites.front_shiny,
        types: pokeData.data.types,
      }));

      // Setting the state with the structured Pokemon data
      setPokemonListState((tempState) => ({
        ...tempState,
        pokemonList: formattedPokemonData,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
      setPokemonListState({ ...pokemonListState, isLoading: false });
      // Handle the error, e.g., display an error message to the user.
    }
  };

  // useEffect hook to trigger the fetchPokemonData function when the component mounts

  useEffect(() => {
    fetchPokemonData();
  }, [pokemonListState.pokedexUrl]);


  return {pokemonListState,setPokemonListState,}

}

export default usePokemonList;
