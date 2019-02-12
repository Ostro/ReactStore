import { FETCH_PRODUCTS, CREATE_PRODUCT } from '../actions/types';

let defaultState = {
  items: [],
  item: {},
};

export default function(state = defaultState, action = {}) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}
