import { Router } from 'express';
import getUserData from './middlewares/getUserData';
import { setSession, deleteSession } from '../lib/redis';
import { checkUserPassword } from '../db/users';

const authentication = Router();

authentication.post('/sign-in', async (req, res) => {
  if (!req.body.password || !req.body.email) return res.status(401).send();

  const user = await checkUserPassword(req.body.email, req.body.password);

  if (!user) return res.sendStatus(401);

  await setSession(user.id, user);
  return res.status(200).send(user);
});

authentication.get('/sign-out', getUserData, async (req, res) => {
  if (req.userData) await deleteSession(req.userData.id);

  return res.send('OK');
});

export default authentication;
