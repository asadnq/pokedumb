import {
  GET_POKEMONS_PENDING,
  GET_POKEMONS_FULFILLED,
  GET_POKEMONS_REJECTED,
  ADD_POKEMON_REJECTED,
  ADD_POKEMON_FULFILLED,
  ADD_POKEMON_PENDING,
} from '../actions/types';

const initialState = {
  pokemons: [],
  isLoading: false,
};

const pokemon = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_POKEMONS_FULFILLED:
      return {
        ...state,
        pokemons: action.payload.data.data,
        isLoading: false,
      };
    case GET_POKEMONS_REJECTED:
      return {
        isLoading: false,
        pokemons: [],
      };
    case ADD_POKEMON_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_POKEMON_FULFILLED:
      alert('add fulfilled')
      return {
        ...state,
        isLoading: false,
        pokemons: state.pokemons.concat(action.payload.data.data),
      };
    case ADD_POKEMON_REJECTED:
      alert('add rejected')
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default pokemon;
