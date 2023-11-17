import jwt from 'jsonwebtoken';
import { Token } from '../constants';
import redis from '../redis/connect.redis';
import payload from '../helpers/payload.helper';
import expiresIn from '../configs/expires.config';
import { BadRequest } from '../core/error.response';

const tokenPrefix = (type) => {
  const prefix = Token[type];

  if (!prefix) throw new BadRequest('Invalid token type');

  return prefix;
};

export const signToken = async (user, privateKey, publicKey, type) => {
  const token = jwt.sign(payload(user, publicKey), privateKey, {
    algorithm: 'RS256',
    expiresIn: parseInt(expiresIn[type]),
  });

  await redis.set(`${tokenPrefix(type)}:${user.id}`, token, 'EX', parseInt(expiresIn[type]));

  return token;
};

export const getToken = async (userId, type) => {
  return await redis.get(`${tokenPrefix(type)}:${userId}`);
};

export const deleteToken = async (userId, type) => {
  return await redis.del(`${tokenPrefix(type)}:${userId}`);
};
