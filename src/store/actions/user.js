import {
  LOGIN,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  REGISTER,
  REGISTER_FULFILLED
} from './types';

import instance from './axios.config';
import NavigationService from '../../navigations/NavigationService';

export const login = user => dispatch => {
  return {
    type: LOGIN,
    payload: instance
      .post('/auth/login', user)
      .then(res => {
        dispatch({ type: LOGIN_FULFILLED, payload: res });
        console.log(res);
        NavigationService.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOGIN_REJECTED
        });
      })
  };
};

export const register = user => dispatch => {
  return {
    type: REGISTER,
    payload: instance
      .post('/auth/register', user)
      .then(res => {
        dispatch({ type: REGISTER_FULFILLED, payload: res });
        console.log(res);
        NavigationService.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: LOGIN_REJECTED
        });
      })
  };
};
