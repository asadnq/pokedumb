import { combineReducers } from 'redux';
import pokemon from './pokemon';
import pokemon_type from './pokemon_type'

const reducers = combineReducers({
    pokemon,
    pokemon_type
})

export default reducers;