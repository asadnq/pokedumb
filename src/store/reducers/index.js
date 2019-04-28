import { combineReducers } from 'redux';
import pokemon from './pokemon';
import pokemon_type from './pokemon_type';
import user from './user';

const reducers = combineReducers({
    pokemon,
    pokemon_type,
    user
})

export default reducers;