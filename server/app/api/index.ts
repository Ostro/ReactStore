import { Router } from 'express';
import authentication from './authentication';
import products from './products';
import users from './users';
import purchase from './purchase';

const router = Router();

router.use(authentication);
router.use('/users', users);
router.use('/products', products);
router.use('/purchase', purchase);

export default router;
