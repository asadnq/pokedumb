import { LOGIN, LOGIN_FULFILLED, LOGIN_REJECTED } from './types';

import instance from './axios.config';

export const login = user => dispatch => {
    return {
        type: LOGIN,
        payload: instance.post('/auth/login', user)
                    .then(res => dispatch({type: LOGIN_FULFILLED, payload: res}))
                    .catch(err => {
                        console.log(err)
                        dispatch({
                            type: LOGIN_REJECTED
                        })
                    })
    }
} 
