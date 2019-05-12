import { connect } from 'react-redux';

import PokemonList from './PokemonList.screen'
import {
  getPokemons,
  searchPokemon,
  getMorePokemons,
  getPokemon
} from '../../store/actions/pokemon';
import { getPokemonTypes } from '../../store/actions/pokemon_type';

const mapState = state => {
  return {
    pokemons: state.pokemon.pokemons,
    isLoading: state.pokemon.isLoading,
    isAuthenticated: state.user.isAuthenticated
  };
};

export default connect(
  mapState,
  { getPokemons, searchPokemon, getPokemonTypes, getMorePokemons, getPokemon }
)(PokemonList);