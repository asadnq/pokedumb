import { combineReducers } from 'redux';
import pokemon from './pokemon';
import pokemon_type from './pokemon_type';
import pokemon_category from './pokemon_category';
import user from './user';

const reducers = combineReducers({
    pokemon,
    pokemon_type,
    pokemon_category,
    user,
})

export default reducers;