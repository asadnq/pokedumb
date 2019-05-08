import {LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED, REGISTER_PENDING, REGISTER_FULFILLED, REGISTER_REJECTED} from '../actions/types';
import NavigationService from '../../navigations/NavigationService';

const initialState = {
  user: {},
  access_token: {},
  isAuthenticated: false,
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PENDING:
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_FULFILLED:
    case LOGIN_FULFILLED:
      return {
        ...state,
        user: action.payload.data.user,
        access_token: action.payload.data.access_token,
        isAuthenticated: true
      };
    case REGISTER_REJECTED:
    case LOGIN_REJECTED:
      return {
        ...state,
        user: {},
        access_token: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default user;
