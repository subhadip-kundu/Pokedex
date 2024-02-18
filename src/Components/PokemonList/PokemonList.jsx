import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import LoadingSpinner from "../LoadingSpinner";
import usePokemonList from "../../Hooks/usePokemonList";

const PokemonList = () => {
  const { pokemonListState, setPokemonListState } = usePokemonList();

  return (
    <div className="pokemon-list-wrapper">
      <h1>List of Pokemon</h1>
      <div className="pokimon-wrapper">
        {pokemonListState.isLoading ? (
          <LoadingSpinner />
        ) : (
          pokemonListState.pokemonList.map((pokemon) => (
            <Pokemon
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              id={pokemon.id}
            />
          ))
        )}
      </div>
      <div className="controls-btn">
        <button
          disabled={pokemonListState.prevUrl == null}
          onClick={() => {
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.prevUrl,
            });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextUrl == null}
          onClick={() => {
            setPokemonListState({
              ...pokemonListState,
              pokedexUrl: pokemonListState.nextUrl,
            });
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
