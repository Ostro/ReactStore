import {
  FETCH_USER,
  FETCH_PRODUCTS,
  CREATE_PRODUCT,
  FETCH_MY_PRODUCTS,
  USER_LOGOUT,
} from './types';

export const logIn = userInfo => dispatch => {
  fetch('http://localhost:3001/sign-in', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  })
    .then(response => response.json())
    .then(currentUser => {
      dispatch({
        type: FETCH_USER,
        currentUser,
      });
    })
    .catch(error => {
      // Handle authenticate errors
    });
};

export const submitUser = user => dispatch => {
  fetch('http://localhost:3001/users', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then(response => response.json())
    .then(currentUser => {
      dispatch({
        type: FETCH_USER,
        currentUser,
      });
    })
    .catch(error => {
      // Handle authenticate errors
    });
};

export const getMyProduct = userId => dispatch => {
  fetch(`http://localhost:3001/users/${userId}`, {
    method: 'get',
    headers: { SessionId: userId },
  })
    .then(response => response.json())
    .then(meAndMyProducts => {
      dispatch({
        type: FETCH_MY_PRODUCTS,
        payload: meAndMyProducts,
      });
    });
};

export const fetchProducts = () => dispatch => {
  fetch('http://localhost:3001/products')
    .then(response => response.json())
    .then(products => {
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products,
      });
    });
};

export const createProducts = (currentUserId, product) => dispatch => {
  fetch('http://localhost:3001/products', {
    method: 'post',
    headers: { 'Content-Type': 'application/json', sessionId: currentUserId },
    body: JSON.stringify(product),
  })
    .then(response => response.json())
    .then(product => {
      dispatch({
        type: CREATE_PRODUCT,
        payload: product,
      });
    })
    .catch(error => {
      // Handle authenticate errors
    });
};

export const buyProduct = (userId, productId) => dispatch => {
  fetch(`http://localhost:3001/purchase/${productId}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json', sessionId: userId },
  })
    .then(response => response.json())
    .then(currentUser => {
      dispatch({
        type: FETCH_USER,
        currentUser,
      });
    })
    .catch(error => {
      // Handle authenticate errors
    });
};

export const userLogOut = () => dispatch => {
  dispatch({
    type: USER_LOGOUT,
  });
};
