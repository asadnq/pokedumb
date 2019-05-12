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
import NavigationService from '../../navigations/NavigationService';
import store from '../store';

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
    payload: instance.get(`/pokemons?name_like=${q}&category=${q}`)
  };
};

export const addPokemon = pokemon => (dispatch, getState) => {
  const isAuthenticated = getState().user.isAuthenticated;
  if(!isAuthenticated) {
    NavigationService.navigate('Login')
  }
  return {
    type: ADD_POKEMON,
    payload: instance
      .post('/pokemons', pokemon)
      .then(res => {
        console.log(res)
        dispatch({
          type: ADD_POKEMON_FULFILLED,
          payload: res
        });
        NavigationService.navigate('Home')
      })
      .catch(err => {
        console.log(err)
        dispatch({
          type: ADD_POKEMON_REJECTED
        });
        alert('error occured.')
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
        NavigationService.navigate('PokemonDetail', { pokemon: res.data.data })
        alert('updated')
      })
      .catch(() => {
        dispatch({
          type: UPDATE_POKEMON_REJECTED
        })
        alert('update failed')
      })
  }
}

export const deletePokemon = pokemon => dispatch => {
  return {
    type: DELETE_POKEMON,
    payload: instance.delete('/pokemons/' + pokemon.id)
    .then(res => {
      dispatch({type: DELETE_POKEMON_FULFILLED, payload: res})
      NavigationService.navigate('Home')
    })
    .catch(() => dispatch({type:DELETE_POKEMON_REJECTED}))
  };
};

let getPokemonsUrl;

export const getMorePokemons = (page, limit) => {

  getPokemonsUrl = `/pokemons?page=${page}&limit=${limit}`;

  return {
    type: GET_MORE_POKEMONS,
    payload: instance.get(`/pokemons?page=${page}&limit=${limit}`)
  }
}

export const filterPokemon = (category, types) => {

  getPokemonsUrl = `${getPokemonsUrl}&category=${category}&types=${types}`;

  return {
    type: GET_POKEMONS,
    payload: instance.get(`/pokemons?category=${category}&type_in=${types}`)
  }
}