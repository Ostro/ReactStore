import { FETCH_USER, FETCH_MY_PRODUCTS, USER_LOGOUT } from '../actions/types';

let defaultState = {
  currentUser: {},
  me: {},
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };
    case FETCH_MY_PRODUCTS: {
      return {
        ...state,
        me: action.payload,
      };
    }
    case USER_LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
