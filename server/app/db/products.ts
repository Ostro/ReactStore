import DB from './index';

export const getProductFromId = async productId => {
  const productCollection = await DB('products')
    .select('*')
    .where({ id: productId });

  if (productCollection[0]) return productCollection[0];
};

export const getProductsById = async productIds => {
  const products = await DB('products')
    .select('*')
    .whereIn('id', productIds);

  return products;
};

export const getAllProducts = async () => {
  return await DB('products').select('*');
};

export const insertProduct = async product => {
  const userCollection = await DB('products')
    .insert(product)
    .returning('*');

  return userCollection[0];
};
