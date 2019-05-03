import {
  GET_POKEMONS,
  ADD_POKEMON,
  ADD_POKEMON_FULFILLED,
  ADD_POKEMON_REJECTED,
  DELETE_POKEMON,
  DELETE_POKEMON_FULFILLED,
  DELETE_POKEMON_REJECTED,
  GET_MORE_POKEMONS,
  UPDATE_POKEMON_FULFILLED,
  UPDATE_POKEMON,
  UPDATE_POKEMON_REJECTED,
  GET_POKEMON
} from './types';
import instance from './axios.config';

export const getPokemons = () => {
  return {
    type: GET_POKEMONS,
    payload: instance.get('/pokemons')
  };
};

export const getPokemon = id => {
  return {
    type: GET_POKEMON,
    payload: instance.get('/pokemons/' + id)
  }
}

export const searchPokemon = q => {
  return {
    type: GET_POKEMONS,
    payload: instance.get('/pokemons/search/' + q)
  };
};

export const addPokemon = pokemon => dispatch => {
  return {
    type: ADD_POKEMON,
    payload: instance
      .post('/pokemons', pokemon)
      .then(res => {
        dispatch({
          type: ADD_POKEMON_FULFILLED,
          payload: res
        });
      })
      .catch(() => {
        dispatch({
          type: ADD_POKEMON_REJECTED
        });
      })
  };
};

export const updatePokemon = (id, data) => dispatch => {
  return {
    type: UPDATE_POKEMON,
    paylod: instance
      .patch('/pokemons/' + id, data)
      .then(res => {
        dispatch({
        type: UPDATE_POKEMON_FULFILLED,
        payload: res
        });
      })
      .catch(() => {
        dispatch({
          type: UPDATE_POKEMON_REJECTED
        })
      })
  }
}

export const deletePokemon = pokemon => dispatch => {
  return {
    type: DELETE_POKEMON,
    payload: instance.delete('/pokemons/' + pokemon.id)
    .then(res => {
      dispatch({type: DELETE_POKEMON_FULFILLED, payload: res})
    })
    .catch(() => dispatch({type:DELETE_POKEMON_REJECTED}))
  };
};

export const getMorePokemons = (page, limit) => {
  return {
    type: GET_MORE_POKEMONS,
    payload: instance.get(`/pokemons?page=${page}&limit=${limit}`)
  }
}
