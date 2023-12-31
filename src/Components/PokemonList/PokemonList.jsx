import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonList.css';
import Pokemon from '../Pokemon/Pokemon';


// Functional component to display a list of Pokemon
const PokemonList = () => {
    // State to store the list of Pokemon and loading status
    const [pokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // URL for the Pokemon API
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

    // Setting up next and previous button url
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    // Function to fetch Pokemon data from the API
    const fetchPokemonData = async () => {
        try {
            // Get the loading page
            setIsLoading(true);

            // Fetching the list of Pokemon from the API
            const response = await axios.get(pokedexUrl);  // It download list of 20 pokemons
            const pokemonResults = response.data.results;  // We get the array of pokemons from result


            // Access next and previous data
            setNextUrl(response.data.next);
            setPrevUrl(response.data.previous);


            // Fetching details for each Pokemon in parallel
            const pokemonResultPromises = pokemonResults.map(pokemon => axios.get(pokemon.url));
            const pokemonDataResponses = await axios.all(pokemonResultPromises); // Array of 20 pokemons detailed data

            // Mapping over the fetched data to structure the required information
            const formattedPokemonData = pokemonDataResponses.map(pokeData => ({
                id: pokeData.data.id,
                name: pokeData.data.name,
                image: pokeData.data.sprites.other?.dream_world.front_default || pokeData.data.sprites.front_shiny,
                types: pokeData.data.types,
            }));

            console.log(formattedPokemonData);

            // Setting the state with the structured Pokemon data
            setPokemonList(formattedPokemonData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching Pokemon data:', error);
            setIsLoading(false);
            // Handle the error, e.g., display an error message to the user.
        }
    };

    // useEffect hook to trigger the fetchPokemonData function when the component mounts
    useEffect(() => {
        fetchPokemonData();
    }, [pokedexUrl]);

    // Render the component
    return (
        <div className='pokemon-list-wrapper'>
            <h1>List of Pokemon</h1>
            <div className="pokimon-wrapper">
                {/* Display loading message if data is still loading, else render Pokemon components */}
                {isLoading ? 'Loading.....' : (
                    pokemonList.map(pokemon => (
                        <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} />
                    ))
                )}
            </div>
            <div className="controls-btn">
                <button disabled={prevUrl == null} onClick={() => { setPokedexUrl(prevUrl) }}>Prev</button>
                <button disabled={nextUrl == null} onClick={() => { setPokedexUrl(nextUrl) }}>Next</button>
            </div>
        </div>
    );
};

export default PokemonList;
