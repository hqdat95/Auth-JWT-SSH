import bcrypt from 'bcryptjs';
import User from '../models/users.model';
import { signToken } from '../utils/token.util';
import { BadRequest } from '../core/error.response';
import { generateKeyPair, setKeyPair } from '../utils/rsa.util';

class LoginSvc {
  static login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new BadRequest('Invalid Email or Password');
    }

    const { privateKey, publicKey } = await generateKeyPair();

    await setKeyPair(user._id, privateKey, publicKey);

    const accessToken = await signToken(user, privateKey, publicKey, 'ACCESS_TOKEN');
    const refreshToken = await signToken(user, privateKey, publicKey, 'REFRESH_TOKEN');

    return { user, accessToken, refreshToken };
  };
}

export default LoginSvc;
