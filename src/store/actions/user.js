import {LOGIN, LOGIN_FULFILLED, LOGIN_REJECTED} from './types';

import instance from './axios.config';

export const login = user => dispatch => {
  console.log(user);
  return {
    type: LOGIN,
    payload: instance
      .post('/auth/login', user)
      .then(res => {
        dispatch({type: LOGIN_FULFILLED, payload: res});
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOGIN_REJECTED,
        });
      }),
  };
};
