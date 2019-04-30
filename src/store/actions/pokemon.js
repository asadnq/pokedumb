import {
  GET_POKEMONS,
  ADD_POKEMON,
  ADD_POKEMON_FULFILLED,
  ADD_POKEMON_REJECTED,
} from './types';
import instance from './axios.config';

export const getPokemons = () => {
  return {
    type: GET_POKEMONS,
    payload: instance.get('/pokemons'),
  };
};

export const searchPokemon = q => {
  return {
    type: GET_POKEMONS,
    payload: instance.get('/pokemons/search/' + q),
  };
};

export const addPokemon = pokemon => dispatch => {
  instance.post('/pokemons', pokemon)
    .then(res => {
      dispatch({
        type: ADD_POKEMON_FULFILLED,
        payload: res
      })
    }).catch(err => {
      dispatch({
        type: ADD_POKEMON_REJECTED
      })
      console.log(err)
    })
};
