import { Router } from 'express';
import getUserData from './middlewares/getUserData';
import {
  getUsers,
  getUserFromIdWithProducts,
  updateUser,
  insertUser,
} from '../db/users';
import { setSession } from '../lib/redis';

const users = Router();

users.get('/', getUserData, async (req, res) => {
  // is connected ?
  if (!req.userData.id) return res.sendStatus(403);

  return res.send(await getUsers());
});

users.get('/:userId', getUserData, async (req, res) => {
  // is connected ?
  if (
    req.userData.id !== parseInt(req.params.userId, 10) &&
    req.userData.role !== 'admin'
  ) {
    return res.sendStatus(403);
  }

  const user = await getUserFromIdWithProducts(req.params.userId);
  if (!user) return res.sendStatus(404);

  return res.send(user);
});

users.put('/:userId', getUserData, async (req, res) => {
  // you can update only your own profile
  // admin can update every profile
  if (
    req.userData.id !== parseInt(req.params.userId, 10) &&
    req.userData.role !== 'admin'
  ) {
    return res.sendStatus(403);
  }

  const updatedUser = await updateUser(req.params.userId, req.body);

  if (!updatedUser) return res.sendStatus(500);

  setSession(updatedUser.id, updatedUser);
  return res.status(200).send(updatedUser);
});

users.post('/', async (req, res) => {
  const user = {
    ...req.body,
    role: 'client',
    products: '[]',
  };

  try {
    const insertedUser = await insertUser(user);
    setSession(insertedUser.id, insertedUser);

    return res.status(200).send(insertedUser);
  } catch (e) {
    return res.sendStatus(500);
  }
});

export default users;
