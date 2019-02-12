import { Router } from 'express';
import {
  getAllProducts,
  getProductFromId,
  insertProduct,
} from '../db/products';
import getUserData from './middlewares/getUserData';

const products = Router();

products.get('/', async (req, res) => {
  const products = await getAllProducts();
  return res.send(products);
});

products.get('/:productId', async (req, res) => {
  const product = await getProductFromId(req.params.productId);
  if (!product) return res.sendStatus(404);

  return res.send(product);
});

products.post('/', getUserData, async (req, res) => {
  if (req.userData.role !== 'admin') {
    return res.sendStatus(403);
  }

  const user = {
    name: req.body.name,
    description: req.body.description,
    price: parseInt(req.body.price, 10),
  };

  try {
    const insertedProduct = await insertProduct(user);
    return res.status(200).send(insertedProduct);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default products;
