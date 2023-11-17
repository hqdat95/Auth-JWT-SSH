import TokenSvc from '../services/token.service';

class TokenCtrl {
  refreshToken = async (req, res) => {
    const user = req.user;
    const publicKey = req.publicKey;

    const result = await TokenSvc.refreshToken(user, publicKey);

    res.created(result);
  };
}

export default new TokenCtrl();
