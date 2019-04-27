import {
  GET_POKEMONS,
  ADD_POKEMON,
  ADD_POKEMON_FULFILLED,
  ADD_POKEMON_REJECTED
} from './types';
import instance from './axios.config';

export const getPokemons = () => {
  return {
    type: GET_POKEMONS,
    payload: instance.get('/pokemons')
  };
};

export const searchPokemon = q => {
  return {
    type: GET_POKEMONS,
    payload: instance.get('/pokemons/search/' + q)
  };
};

export const addPokemon = data => dispatch => {
  return {
    type: ADD_POKEMON,
    payload: instance
      .post('/pokemons', data)
      .then(res => dispatch({ payload: res, type: ADD_POKEMON_FULFILLED }))
      .catch(err => dispatch({ type: ADD_POKEMON_REJECTED }))
  };
};
