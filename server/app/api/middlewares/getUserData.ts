import { getSession } from '../../lib/redis';

export default async (req, res, next) => {
  req.userData = {};
  const sessionId = req.get('sessionId');
  if (!sessionId) return next();

  const session = await getSession(sessionId);
  if (!session) return next();

  req.userData = session;
  next();
};
