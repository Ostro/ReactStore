import * as Redis from 'ioredis';

const client = new Redis({
  host: 'redis',
  port: 6379,
});

export const setSession = async (sessionId, userData, ttl = 28800) => {
  return await client.set(sessionId, JSON.stringify(userData), 'EX', ttl);
};

export const getSession = async sessionId => {
  const session = await client.get(sessionId);
  return JSON.parse(session);
};

export const deleteSession = async sessionId => {
  return await client.del(sessionId);
};
