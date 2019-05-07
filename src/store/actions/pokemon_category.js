import instance from './axios.config';
import { GET_CATEGORIES } from './types'

export const getCategories = () => {
    return {
        type: GET_CATEGORIES,
        payload: instance.get('/categories')
    }
}