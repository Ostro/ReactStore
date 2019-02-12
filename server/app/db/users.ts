import DB from './index';
import { getProductsById } from './products';

export const getUserFromId = async userId => {
  const userCollection = await DB('users')
    .select('id', 'firstName', 'lastName', 'email', 'role', 'products')
    .where({ id: userId });

  if (userCollection[0]) return userCollection[0];
};

export const getUserFromIdWithProducts = async userId => {
  const userCollection = await DB('users')
    .select('id', 'firstName', 'lastName', 'email', 'role', 'products')
    .where({ id: userId });

  if (userCollection[0] && userCollection[0].products) {
    const productIds = JSON.parse(userCollection[0].products);
    const products = await getProductsById(productIds);

    return {
      ...userCollection[0],
      products,
    };
  }

  return userCollection[0];
};

export const checkUserPassword = async (email, password) => {
  const userCollection = await DB('users')
    .where({ password: password, email: email })
    .select('id', 'firstName', 'lastName', 'email', 'role', 'products');

  if (userCollection[0]) return userCollection[0];
};

export const getUsers = async () => {
  return await DB('users').select(
    'id',
    'firstName',
    'lastName',
    'email',
    'role',
    'products'
  );
};

export const updateUser = async (userId, user) => {
  const status = await DB('users')
    .where({ id: userId })
    .update(user);

  if (status === 1) return getUserFromId(userId);
};
export const addProductToUser = async (rawUser, productId) => {
  const productList = [...JSON.parse(rawUser.products), productId];

  return await updateUser(rawUser.id, {
    products: JSON.stringify(productList),
  });
};

export const insertUser = async user => {
  const userCollection = await DB('users')
    .insert(user)
    .returning(['id', 'firstName', 'lastName', 'email', 'role', 'products']);

  return userCollection[0];
};
