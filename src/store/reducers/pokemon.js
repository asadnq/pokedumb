import {
  GET_POKEMONS_PENDING,
  GET_POKEMONS_FULFILLED,
  GET_POKEMONS_REJECTED,
  GET_POKEMON_PENDING,
  GET_POKEMON_FULFILLED,
  GET_POKEMON_REJECTED,
  ADD_POKEMON_REJECTED,
  ADD_POKEMON_FULFILLED,
  ADD_POKEMON_PENDING,
  DELETE_POKEMON_FULFILLED,
  DELETE_POKEMON_REJECTED,
  GET_MORE_POKEMONS_FULFILLED,
  GET_MORE_POKEMONS_REJECTED,
  UPDATE_POKEMON_FULFILLED,
  UPDATE_POKEMON_REJECTED
} from '../actions/types';

const initialState = {
  pokemons: [],
  pokemon: {},
  isLoading: false
};

const pokemon = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POKEMONS_FULFILLED:
      return {
        ...state,
        pokemons: action.payload.data.data,
        isLoading: false
      };
    case GET_POKEMONS_REJECTED:
      return {
        isLoading: false,
        pokemons: []
      };
    case GET_POKEMON_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_POKEMON_FULFILLED:
      return {
        ...state,
        pokemon: action.payload.data.data,
        isLoading: false
      };
    case GET_POKEMON_REJECTED:
      return {
        isLoading: false,
        pokemon: {}
      };
    case GET_MORE_POKEMONS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        pokemons: state.pokemons.concat(action.payload.data.data) 
      }
    case GET_MORE_POKEMONS_REJECTED:
    alert('error when fetching more data')
    return {
      ...state,
      isLoading: false
    }
    case ADD_POKEMON_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_POKEMON_FULFILLED:
      alert('add fulfilled');
      return {
        ...state,
        isLoading: false,
        pokemons: [action.payload.data.data].concat(state.pokemons)
      };
    case ADD_POKEMON_REJECTED:
      alert('add rejected');
      return {
        ...state,
        isLoading: false
      };
    case UPDATE_POKEMON_FULFILLED:
      return {
        ...state,
        isLoading: false
      }
    case UPDATE_POKEMON_REJECTED:
      return {
        ...state,
        isLoading: false
      }
    case DELETE_POKEMON_FULFILLED:
      return {
        ...state,
        pokemons: state.pokemons.filter(
          pokemon => action.payload.data.data.id !== pokemon.id
        ),
        isLoading: false
      };
    case DELETE_POKEMON_REJECTED:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default pokemon;
