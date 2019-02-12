import { Router } from 'express';
import { setSession } from '../lib/redis';
import getUserData from './middlewares/getUserData';
import { getProductFromId } from '../db/products';
import { addProductToUser } from '../db/users';

const purchase = Router();

purchase.post('/:productId', getUserData, async (req, res) => {
  if (!req.userData.id || !req.params.productId) return res.sendStatus(401);

  const product = await getProductFromId(req.params.productId);
  if (!product) return res.sendStatus(401);

  //payement

  const userUpadated = await addProductToUser(req.userData, product.id);
  if (!userUpadated) return res.sendStatus(500);
  await setSession(userUpadated.id, userUpadated);

  return res.sendStatus(200);
});

export default purchase;
