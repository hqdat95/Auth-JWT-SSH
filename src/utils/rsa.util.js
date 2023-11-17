import crypto from 'crypto';
import { promisify } from 'util';
import { RSA } from '../constants';
import redis from '../redis/connect.redis';
import expiresIn from '../configs/expires.config';
import { Unauthorized } from '../core/error.response';

export const generateKeyPair = async () => {
  const generate = promisify(crypto.generateKeyPair);

  const { privateKey, publicKey } = await generate('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'pkcs1', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs1', format: 'pem' },
  });

  return { privateKey, publicKey };
};

export const setKeyPair = async (userId, privateKey, publicKey) => {
  await redis.hmset(`${RSA.HASH}:${userId}`, RSA.PRIVATE_KEY, privateKey, RSA.PUBLIC_KEY, publicKey);
  await redis.expire(`${RSA.HASH}:${userId}`, expiresIn.RSA);
};

export const getPublicKey = async (userId) => {
  const publicKey = await redis.hget(`${RSA.HASH}:${userId}`, RSA.PUBLIC_KEY);

  if (!publicKey) throw new Unauthorized('Invalid Public Key !');

  return publicKey;
};

export const getPrivateKey = async (userId) => {
  const privateKey = await redis.hget(`${RSA.HASH}:${userId}`, RSA.PRIVATE_KEY);

  if (!privateKey) throw new Unauthorized('Invalid Private Key!');

  return privateKey;
};

export const delKeyPair = async (userId) => {
  await redis.del(`${RSA.HASH}:${userId}`);
};
