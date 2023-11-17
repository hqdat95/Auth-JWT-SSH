import User from '../models/users.model';
import jwt from 'jsonwebtoken';
import { getToken } from '../utils/token.util';
import { getPublicKey } from '../utils/rsa.util';
import { Unauthorized, NotFound } from '../core/error.response';

const decodeToken = async (token, convertType) => {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      throw new Unauthorized('Decoding failed');
    }

    return decoded;
  } catch (error) {
    throw new Unauthorized(`No ${convertType} token provided`);
  }
};

const verifyToken = async (token, publicKey) => {
  try {
    await jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  } catch (error) {
    throw new Unauthorized('Invalid token signature');
  }
};

export default (type) => {
  return async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const convertType = type.toLowerCase().replace(/_/g, ' ');

    if (!token) {
      return next(new Unauthorized(`No ${convertType} token provided`));
    }

    try {
      const decoded = await decodeToken(token, convertType);
      const publicKey = await getPublicKey(decoded.id);
      const redisToken = await getToken(decoded.id, type);

      if (decoded.publicKey !== publicKey || redisToken !== token) {
        return next(new Unauthorized(`Invalid or expired ${convertType}`));
      }

      const user = await User.findById(decoded.id).exec();

      if (!user) {
        return next(new NotFound('User not found'));
      }

      verifyToken(token, publicKey);

      req.publicKey = publicKey;
      req.user = user;

      next();
    } catch (err) {
      return next(err);
    }
  };
};
