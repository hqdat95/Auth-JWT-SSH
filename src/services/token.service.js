import { getPrivateKey } from '../utils/rsa.util';
import { deleteToken, signToken } from '../utils/token.util';

class TokenSvc {
  static refreshToken = async (user, publicKey) => {
    await deleteToken(user._id, 'ACCESS_TOKEN');

    const privateKey = await getPrivateKey(user._id);

    const accessToken = await signToken(user, privateKey, publicKey, 'ACCESS_TOKEN');

    return { accessToken };
  };
}

export default TokenSvc;
