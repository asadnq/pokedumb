import { GET_TYPES_PENDING, GET_TYPES_FULFILLED,GET_TYPES_REJECTED } from '../actions/types';

const initialState = {
    pokemon_types: [],
    isLoading: false
}

const pokemon_type = (state = initialState, action) => {
    switch(action.type) {
        case GET_TYPES_FULFILLED:
            return {
                pokemon_types: action.payload.data.data,
                isLoading: false
            }
        default:
            return state
    }
}

export default pokemon_type