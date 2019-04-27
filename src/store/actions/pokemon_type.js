import { GET_TYPES }  from './types';
import instance from './axios.config';


export const getPokemonTypes = () => {
    return {
        type: GET_TYPES,
        payload: instance.get('/types')
    }
}