import { delKeyPair } from '../utils/rsa.util';
import { deleteToken } from '../utils/token.util';

class LogoutSvc {
  static logout = async (user) => {
    await deleteToken(user._id, 'ACCESS_TOKEN');
    await deleteToken(user._id, 'REFRESH_TOKEN');

    await delKeyPair(user._id);
  };
}

export default LogoutSvc;
