import { GET_CATEGORIES } from '../actions/types'

const initialState = {
    categories: []
}

const pokemon_category = (state = initialState, action) => {
    switch(action.type) {
        case `${GET_CATEGORIES}_FULFILLED`:
            return {
                ...state,
                categories: action.payload.data.data
            }
        case `${GET_CATEGORIES}_REJECTED`:
        alert('categories rejected')
        default:
            return state
    }
}

export default pokemon_category