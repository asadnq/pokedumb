import {LOGIN_PENDING, LOGIN_FULFILLED, LOGIN_REJECTED} from '../actions/types';

const initialState = {
  user: {},
  access_token: {},
  isAuthenticated: false,
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_FULFILLED:
      return {
        ...state,
        user: action.payload.data.user,
        access_token: action.payload.data.access_token,
      };
    case LOGIN_REJECTED:
      return {
        ...state,
        user: {},
        access_token: {},
      };
    default:
      return state;
  }
};

export default user;
